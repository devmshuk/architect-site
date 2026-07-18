---
title: "An order event bus, and its honest limits"
theme: "Events"
competency: "Consistency & coupling trade-offs"
summary: "Coupling every downstream system directly to checkout makes checkout
          fragile. Letting each system consume the order event independently and
          asynchronously decouples them — as long as you are honest about the one
          thing that must stay synchronous."
date: 2026-07-18
depth: deep
adrRefs: ["ADR-011"]
draft: false
---

*A self-directed design study grounded in real commerce order integration — the Salesforce Commerce Cloud (SFCC) order lifecycle and the middleware-mediated integrations around it. It works through a coupling problem, the options I weighed, and — the part that matters most — where I would refuse to apply the pattern. Not a client deliverable. The event-bus framing is the portable principle; in SFCC the concrete tools are checkout hooks, the Service Framework, jobs, and an API gateway / middleware layer.*

**The one line:** *An order is one fact that many systems need. Publish it once and let each system consume it independently and asynchronously, instead of making checkout personally responsible for every consumer — but keep payment authorisation synchronous, because "probably paid" is not a thing.*

---

## Context — checkout becomes everyone's dependency

When a customer places an order, a lot of systems care: order management and fulfilment, tax, CRM, analytics, loyalty, email. The naive design wires each of them directly into the checkout flow — a synchronous call to each, inline, before the confirmation page. It works with two consumers. By the tenth, checkout has become the most fragile, most-changed service you own — because *every* new downstream need is now a change to the one flow you least want to touch.

Two costs stack up:

- **Fragility** — a slow or failing downstream system can drag down, or break, the checkout the customer is standing in front of. In SFCC terms, a slow synchronous call inside an order hook runs *in the request*, holds an application-server thread, and counts against the storefront timeout budget — so one struggling downstream service can brown out checkout for everyone.
- **Ossification** — adding a consumer means modifying checkout, so the team that owns checkout becomes a bottleneck for work that has nothing to do with checkout.

The problem is structural: checkout has been made *responsible for* every system that cares about orders. It shouldn't be. It should be responsible for one thing — producing a correct, paid order — and announcing that fact.

## The design: record the fact, deliver it reliably, consume independently

Publish the order as an **event** and let consumers take it on their own time:

- Checkout **records** the order event (in SFCC, off the after-order hook) and is done with the downstream world. It does not make a blocking call to fulfilment, CRM, or analytics.
- The event is **enqueued and delivered reliably** to each consumer — order management (SOM) for fulfilment, CRM, tax, analytics — via the Service Framework and a queued, idempotent flow, commonly through an API gateway / middleware layer rather than point-to-point from the storefront.
- Adding a new consumer is a new subscription to that event — **zero changes to checkout**.

```
                 ┌─────────────┐
   checkout ───▶ │ order event │ ──▶ order management / fulfilment (system of record)
   (record +     │  (queued,   │ ──▶ tax
    enqueue)     │ idempotent) │ ──▶ CRM
                 └─────────────┘ ──▶ analytics
                        (each consumes independently, asynchronously)
```

This inverts the dependency. Consumers now depend on the *event contract*, not on checkout's internals, and checkout depends on nobody downstream. The team that owns checkout stops being everyone's bottleneck. It also matches how the platform actually splits responsibility: **commerce captures the order; the order management system fulfils it and becomes the post-purchase system of record**, with status flowing back for the storefront to display. Checkout's job ends at "correct, paid order, announced."

## The honest limit — and this is the whole point of the study

Async is not free, and the senior move is knowing exactly where it *doesn't* belong.

**Payment authorisation must stay synchronous, in the request path.** The customer is entitled to a definite answer — accepted or declined — before the confirmation page. "We'll let you know eventually whether your payment worked" is not an acceptable user experience, and "probably paid" is not a state a commerce system can carry. So authorisation is a blocking call inside checkout; the order is only *placed* — and only then announced — once payment is authorised. (Payment *capture/settlement* can happen later, asynchronously, as items ship — but the authorisation decision the customer waits on cannot.)

Everything downstream of a confirmed, paid order — fulfilment orchestration, tax reporting, CRM sync, the receipt email — can tolerate **eventual consistency**. A few seconds or minutes of lag is fine. Everything the customer is *waiting on* in real time cannot. The design's job is to draw that line correctly and not let the elegance of "everything is an event" push authorisation off the request path where it doesn't belong.

That single distinction — *what the customer is waiting for vs. what merely needs to happen* — is the reasoning that separates a robust event architecture from a fashionable one.

## Trade-offs considered

| Option | Decision | Reasoning |
| --- | --- | --- |
| **Record the event; deliver async via queue; consume independently** | **Chosen** | Decouples consumers from checkout, so new consumers cost nothing to checkout and downstream failures can't take checkout down. Accepts eventual consistency downstream and the operational cost of a reliable queued delivery mechanism. |
| Direct synchronous calls to each consumer (inline in the order hook) | Rejected | Simple for two consumers, brittle for ten. Couples checkout's uptime to every downstream system, runs slow I/O on the request thread, and makes checkout the bottleneck for unrelated work. This is the "slow hook that browns out checkout" failure. |
| Everything async, including payment auth | Rejected | The seductive "pure" version — and wrong. It trades a real user guarantee (a definite payment result) for architectural neatness. Some things must block; authorisation is one. |
| Shared database, consumers poll for orders | Rejected | Removes the direct call but creates hidden coupling on the schema — now no one can change the order data without breaking a consumer. Trades visible coupling for invisible coupling, which is worse. |

## What I'd watch in production

- **Duplicate and out-of-order delivery.** Reliable delivery gives you at-least-once, not exactly-once — retries happen. Consumers must be **idempotent**: processing the same order event twice, or handing the same order to fulfilment twice on a retry, must be safe. (Same property as the Drift study, different context; and the same reason an order handoff to the OMS must never create a duplicate order on retry.)
- **The event contract is now an API.** Version it. A careless change to the event shape breaks every consumer silently.
- **Poison messages and retries.** One consumer choking on a malformed event shouldn't stall the queue for everyone — dead-letter it and move on.
- **Observability across the seam.** With async, "did the order reach CRM?" is no longer a stack trace — it's a correlation across systems. Trace/correlation IDs on every event are not optional.
- **The synchronous core stays sacred.** Guard the boundary: payment authorisation, and anything else the customer is truly waiting on, must never quietly migrate off the request path for consistency's sake — and no downstream call belongs inline in the order hook.

## What it buys

- **Checkout stops being everyone's dependency** — it produces paid orders and announces them, nothing more.
- **New consumers cost nothing** to the critical path — loyalty, a new analytics sink, a new market's tax system all subscribe without a checkout change.
- **Downstream failures stay downstream** — a struggling CRM or fulfilment system can't take down the buy button.
- **And the customer still gets a straight answer on payment**, because the design knew which promise it was not allowed to make eventually.

---

**Related decision:** ADR-011 (consume order events asynchronously, off the request path) records this call in short form — including the explicit carve-out that keeps payment authorisation synchronous.
