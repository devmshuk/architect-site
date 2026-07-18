---
title: "An order event bus, and its honest limits"
theme: "Events"
competency: "Consistency & coupling trade-offs"
summary: "Coupling every downstream system directly to checkout makes checkout
          fragile. Moving order events onto a shared bus lets consumers subscribe
          independently — as long as you are honest about the one thing that must
          stay synchronous."
date: 2026-07-18
depth: deep
adrRefs: ["ADR-011"]
draft: false
---

*A self-directed design study drawn from commerce-at-scale. It works through a coupling problem, the options I weighed, and — the part that matters most — where I would refuse to apply the pattern. Not a client deliverable.*

**The one line:** *An order is one fact that many systems need. Publish it once to a bus and let each system take what it needs, instead of making checkout personally responsible for every consumer — but keep payment authorisation synchronous, because "probably paid" is not a thing.*

---

## Context — checkout becomes everyone's dependency

When a customer places an order, a lot of systems care: fulfilment, tax, CRM, analytics, loyalty, email. The naive design wires each of them directly into the checkout flow. It works with two consumers. By the tenth, checkout has become the most fragile, most-changed service you own — because *every* new downstream need is now a change to the one flow you least want to touch.

Two costs stack up:

- **Fragility** — a slow or failing downstream system can drag down, or break, the checkout the customer is standing in front of.
- **Ossification** — adding a consumer means modifying checkout, so the team that owns checkout becomes a bottleneck for work that has nothing to do with checkout.

The problem is structural: checkout has been made *responsible for* every system that cares about orders. It shouldn't be. It should be responsible for one thing — producing a correct order — and announcing that fact.

## The design: publish the fact, subscribe independently

Move order events onto a **shared event bus**:

- Checkout **publishes** an `order.placed` event and is done. It does not know or care who consumes it.
- Fulfilment, tax, CRM, analytics each **subscribe** independently and react on their own time.
- Adding a new consumer is a new subscription — **zero changes to checkout**.

```
                 ┌─────────────┐
   checkout ───▶ │  order bus  │ ──▶ fulfilment
   (publish)     └─────────────┘ ──▶ tax
                                 ──▶ CRM
                                 ──▶ analytics
                        (subscribe independently)
```

This inverts the dependency. Consumers now depend on the *event contract*, not on checkout's internals, and checkout depends on nobody. The team that owns checkout stops being everyone's bottleneck.

## The honest limit — and this is the whole point of the study

Async is not free, and the senior move is knowing exactly where it *doesn't* belong.

**Payment authorisation must stay synchronous, in the request path.** The customer is entitled to a definite answer — accepted or declined — before the confirmation page. "We'll let you know eventually whether your payment worked" is not an acceptable user experience, and "probably paid" is not a state a commerce system can carry. So authorisation is a blocking call; the order is only *placed* — and only then published to the bus — once payment is authorised.

Everything downstream of a confirmed order (fulfilment, tax reporting, CRM sync, the receipt email) can tolerate **eventual consistency** — a few seconds or minutes of lag is fine. Everything the customer is *waiting on* in real time cannot. The design's job is to draw that line correctly and not let the elegance of "everything is an event" push authorisation off the bus where it doesn't belong.

That single distinction — *what the customer is waiting for vs. what merely needs to happen* — is the reasoning that separates a robust event architecture from a fashionable one.

## Trade-offs considered

| Option | Decision | Reasoning |
| --- | --- | --- |
| **Shared event bus for order events** | **Chosen** | Decouples consumers from checkout, so new consumers cost nothing to checkout and downstream failures can't take checkout down. Accepts eventual consistency downstream and the operational cost of running a bus. |
| Direct synchronous calls to each consumer | Rejected | Simple for two consumers, brittle for ten. Couples checkout's uptime to every downstream system and makes checkout the bottleneck for unrelated work. |
| Everything async, including payment auth | Rejected | The seductive "pure" version — and wrong. It trades a real user guarantee (a definite payment result) for architectural neatness. Some things must block; authorisation is one. |
| Shared database, consumers poll for orders | Rejected | Removes the direct call but creates hidden coupling on the schema — now no one can change the orders table without breaking a consumer. Trades visible coupling for invisible coupling, which is worse. |

## What I'd watch in production

- **Duplicate and out-of-order delivery.** A bus gives you at-least-once delivery, not exactly-once. Consumers must be **idempotent** — processing the same `order.placed` twice must be safe. (Same property as the Drift study, different context.)
- **The event contract is now an API.** Version it. A careless change to the event shape breaks every subscriber silently.
- **Poison messages and retries.** One consumer choking on a malformed event shouldn't stall the queue for everyone — dead-letter it and move on.
- **Observability across the seam.** With async, "did the order reach CRM?" is no longer a stack trace — it's a correlation across systems. Trace IDs on every event are not optional.
- **The synchronous core stays sacred.** Guard the boundary: payment authorisation, and anything else the customer is truly waiting on, must never quietly migrate onto the bus for consistency's sake.

## What it buys

- **Checkout stops being everyone's dependency** — it produces orders and announces them, nothing more.
- **New consumers cost nothing** to the critical path — loyalty, a new analytics sink, a new market's tax system all subscribe without a checkout change.
- **Downstream failures stay downstream** — a struggling CRM can't take down the buy button.
- **And the customer still gets a straight answer on payment**, because the design knew which promise it was not allowed to make eventually.

---

**Related decision:** ADR-011 (standardise order events on a shared bus) records this call in short form — including the explicit carve-out that keeps payment authorisation synchronous.
