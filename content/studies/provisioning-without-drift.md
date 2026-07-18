---
title: "Provisioning a storefront estate without drift"
theme: "Drift"
competency: "Idempotency as an architectural property"
summary: "When an estate grows by hand, no two sites end up alike. Making
          configuration the single source of truth — and the pipeline that
          applies it idempotent — collapses per-site setup from weeks to days
          and stops drift at the source."
date: 2026-07-18
depth: deep
adrRefs: ["ADR-011", "ADR-014"]
draft: false
---

*A self-directed design study drawn from commerce-at-scale. It walks through a problem I've lived, the options I weighed, and the trade-offs behind the call. It is not a client deliverable — the reasoning is the point, not any one company's numbers.*

**The one line:** *An estate that is stood up by hand drifts apart; an estate that is stood up from declarative config, by an idempotent pipeline, converges. The second one launches new markets in days instead of weeks — and gets cheaper to run as it grows, not more expensive.*

---

## Context — why this problem compounds

Imagine a commerce estate that has grown to roughly a hundred regional storefronts on a shared, layered platform. Each new site was stood up by hand from a reference build that everyone *mostly* followed. Onboarding one takes weeks of specialist time.

The cost people see is the launch time. The cost that actually hurts is **drift**: because every site is assembled by hand, no two end up configured quite the same way. A setting is tweaked here, a step skipped there, a hotfix applied to one market and not the others. Six months later there is no such thing as "the platform" — there are a hundred slightly-different platforms wearing the same logo.

Drift is expensive in ways that don't show up on a launch dashboard:

- **Every incident becomes a bespoke investigation** — you can't reason about "the checkout config" because each site's is subtly different.
- **Every change is risky** — you can't confidently roll a fix across the estate, because you don't know what each site will do.
- **The team scales with the estate** — more sites means more hand-holding, so headcount grows in lockstep with the site count. That is the line a director actually wants broken.

So the real design target is not "launch a single site faster." It is **"stop the estate from fragmenting as it grows"** — because the compounding cost of a hundred divergent sites dwarfs the cost of any one launch.

## The constraint that shapes the design

The forcing question is: *what is the source of truth for what a site should be?*

Today the answer is "whatever is currently running, plus tribal knowledge." That is the disease. The whole design follows from changing the answer to: **a versioned configuration file is the source of truth, and the running site is merely its current projection.**

Everything else — the pipeline, the templating, the verification — exists to make that one sentence true and keep it true.

## The design, at a high level

Four moving parts:

1. **Config repository** — one declarative spec per site, version-controlled. It describes *desired state*: which features are on, which integrations are wired, which regional and brand overrides apply. Humans edit this, and only this.
2. **Provisioning pipeline** — reads a site's spec and makes the live site match it. Crucially, it is **idempotent**: running it once or ten times produces the same result. It *converges* the site toward the spec rather than layering change on change.
3. **Layered storefront template** — a shared base, with overrides resolved in a predictable order (global → brand → market → site). Most of a site *is* the base; the spec only captures where it legitimately differs.
4. **Verification gate** — after provisioning, the live site is checked back against its spec. If they disagree, that is drift, and it is surfaced immediately rather than discovered during an outage.

The property that makes all of this work is **idempotency**. A non-idempotent script *does* things ("create X, set Y"); re-running it double-applies or fails. An idempotent pipeline *asserts* things ("X exists and looks like this; make it so"); re-running it simply re-confirms the site is already correct, or quietly corrects it if something has drifted. That single property is what turns provisioning from a risky one-shot event into a safe, repeatable reconciliation you can run any time.

## Trade-offs considered

| Option | Decision | Reasoning |
| --- | --- | --- |
| **Idempotent, config-driven pipeline** | **Chosen** | Highest upfront build cost, and it asks the team to think in terms of desired state rather than steps. In return it removes drift *permanently* and makes platform effort scale sub-linearly with the estate. The cost is paid once; the payoff compounds with every new site. |
| Documented manual runbook | Rejected | Cheapest to introduce and comforting to write. But it optimises the *single* launch, not the hundred that follow — drift returns the moment a human skips or reinterprets a step. It treats a systemic problem as a discipline problem. |
| Full multi-tenant re-platform | Rejected (deferred) | Architecturally the cleanest end state — one platform, not a hundred instances. But it is a multi-quarter migration carrying heavy delivery risk across live revenue. Deferred, not dismissed: the config-driven approach is a step *toward* it, not away from it. |
| Third-party site-builder SaaS | Rejected | Fast to start. But it could not express the estate's real integration and compliance rules without a thicket of escape hatches — which recreates the drift problem in someone else's tool, where you have less control and no source of truth. |

The rejections matter as much as the choice. Two of them (runbook, SaaS) are the *tempting cheap options* — and naming exactly why they fail is the judgment a senior reviewer is looking for. The third (re-platform) is the *architecturally purest* option, and the discipline is knowing when the cleaner end state isn't worth the delivery risk *yet*.

## What I'd watch in production

A design study that doesn't survive contact with production isn't finished. The honest risks here:

- **Secrets and per-environment values** don't belong in the config repo. The spec references them; a secret manager holds them. Getting this seam wrong is the most common way "config as source of truth" quietly leaks credentials into git.
- **Partial failure.** An idempotent pipeline makes *retries* safe, but a run that dies halfway must leave the site in a knowable state. Convergence has to be resumable, not all-or-nothing.
- **Genuine divergence.** Sometimes a market really does need something the base can't express. The template needs a deliberate, visible escape hatch for that — otherwise people fork silently and you are back to drift. The rule: divergence is allowed, but it must be *declared in the spec*, never improvised in the running site.
- **Drift detection has to run on a schedule, not just at deploy.** Config is only the source of truth if reality is continuously reconciled against it. A weekly convergence run that reports (or corrects) drift is what keeps the guarantee real six months in.
- **The human workflow is the hard part.** The technology is straightforward; getting a team to stop hand-editing live sites and start editing specs is the actual adoption problem. The pipeline has to make the right way the *easy* way, or people route around it.

## What it buys

Where I've applied this shape, the effects are consistent:

- **New-site onboarding collapses from weeks to days** — and most of what's left is review, not build.
- **Platform effort scales sub-linearly with the estate.** The hundredth site is nearly free; the team stops growing in lockstep with the site count. This is the outcome a director cares about, expressed as a curve rather than a number.
- **Drift approaches zero.** The same config produces the same site every time, so incident triage stops being archaeology and changes can roll across the estate with confidence.

None of that comes from a clever framework. It comes from one architectural decision — *make config the source of truth and the pipeline idempotent* — held consistently against every temptation to take the cheaper, hand-crafted path.

---

**Related decisions:** ADR-011 (standardising order events on a shared bus) and ADR-014 (headless PWA over hybrid storefront) sit alongside this one — different problems, same instinct: make the seams explicit, and prefer designs a team can reason about under pressure.
