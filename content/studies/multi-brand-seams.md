---
title: "Where the seams go in a multi-brand platform"
theme: "Seams"
competency: "Decomposition & boundary design"
summary: "One platform serving many brands and markets lives or dies on where
          you draw the boundaries. Put the seam where ownership and rate-of-change
          differ — stable, shared behaviour above it; brand and market variation
          below it, expressed as configuration, not forks."
date: 2026-07-18
depth: deep
adrRefs: ["ADR-009", "ADR-011"]
draft: false
---

*A self-directed design study drawn from commerce-at-scale. It works through a boundary-design problem I've lived from the inside, the options I weighed, and the reasoning behind where I'd draw the lines. Not a client deliverable — the judgment is the point.*

**The one line:** *A multi-brand platform is a bet about where change happens. Draw the seam so that the things that rarely change and are shared sit on one side, and the things that vary per brand or market sit on the other — and a new brand becomes a configuration exercise instead of a fork.*

---

## Context — the boundary is the architecture

When one platform serves many brands across many markets, the hard part isn't any single feature. It's the **boundaries**: which behaviour is shared and owned centrally, and which is allowed to vary per brand or market — and, critically, *how* it's allowed to vary.

Get the boundaries right and the platform compounds: shared improvements reach every brand at once, and a new market ships as configuration. Get them wrong and you get one of two failure modes, both common:

- **Too rigid** — the shared core can't express what a market genuinely needs, so teams fork it or bolt on escape hatches. Now you have a hundred quiet variations and you're back to drift.
- **Too loose** — everything is overridable, so nothing is truly shared. The "platform" is a thin veneer over a hundred bespoke sites, and no central improvement is safe.

The whole game is placing the seam so you land between those two.

## The forcing question

For any given piece of behaviour, the question is: **does this vary by brand or market, and who owns that variation?**

That single question decides which side of the seam it belongs on. A useful way to make the layering concrete is a resolution order — most-shared at the top, most-specific at the bottom:

```
global   →  the contract + shared behaviour, owned centrally, changes rarely
  brand  →  brand-level identity and rules
  market →  country/regulatory/commercial differences
    site →  the thin, genuinely site-specific tail
```

Behaviour resolves top-down: a site *is* the global base, unless a brand overrides it, unless a market overrides that, unless the site itself does. Most of any given site is the top layer. The lower you go, the less should live there.

## The design: an abstraction with a reference implementation

The mechanism that makes the seam hold is a **provider abstraction**:

- The central layer defines an **abstract contract** — *what* a capability does (its inputs, outputs, and guarantees), not *how* any particular brand fulfils it.
- Lower layers supply **concrete implementations** — the how, for a given brand or market — behind that contract.
- A **reference (demo) implementation** ships alongside the contract. It does two priceless jobs: it documents the contract by example, and it gives everyone a working baseline to test against so the abstraction can't silently rot.
- The rendering/composition layer consumes the contract and knows nothing about which concrete implementation is behind it.

The reason this works is that it names *what is stable* (the contract) and quarantines *what varies* (the implementations) on the far side of it. The central team owns a small, stable surface. Brand teams move fast behind the contract without being able to break each other — because they can't reach across the seam.

**The judgment call that separates good from bad here:** knowing when an override set has stopped being configuration and become its own product. If a brand's overrides start to outnumber the shared behaviour they sit on, the honest move is not another exception — it's to recognise that this "brand" is really a separate product and give it its own boundary. Forcing genuinely divergent things to share a seam is how platforms calcify.

## Trade-offs considered

| Option | Decision | Reasoning |
| --- | --- | --- |
| **Shared core + abstract contract + overrides** | **Chosen** | Highest design cost — you have to actually decide what's shared and hold the line. In return, brands evolve independently, a new brand/market ships as configuration, and central improvements reach everyone at once. The seam does the work. |
| Fork per brand | Rejected | Fastest for brand #2, ruinous by brand #20. Every shared fix must be re-applied N times; the platform stops existing. Optimises the second brand, punishes the twentieth. |
| One rigid template, no real overrides | Rejected | Superficially "consistent," but the first market with a genuine local requirement forces an escape hatch — and escape hatches breed. Rigidity doesn't prevent divergence, it just makes divergence dishonest. |
| Fully independent micro-frontends per brand | Rejected (context-dependent) | Maximum team autonomy, but you pay for it in duplicated cross-cutting concerns (auth, payments, consent) and a fragmented customer experience. Right for genuinely different products; wrong for variations on a shared one. |

As always, the rejections carry the reasoning. Fork-per-brand is the *tempting fast* option; rigid-template is the *tempting tidy* option; both fail for the same underlying reason — they refuse to decide where variation is allowed, so it leaks in uncontrolled.

## What I'd watch in production

- **Leaky abstractions.** The moment the composition layer starts special-casing "if brand X," the seam has failed — brand detail has leaked above the contract. That's the canary; treat it as a design bug, not a feature.
- **Override explosion.** Track the ratio of overridden to shared behaviour per brand. When it creeps up, that brand is telling you it wants to be its own product. Listen before it forces the issue.
- **Contract versioning.** The abstract contract *will* need to change. Version it deliberately, with a migration path, or every change becomes a synchronised big-bang across all implementations.
- **The reference implementation drifting from reality.** If the demo provider stops being maintained, the contract loses its executable documentation and abstractions start to rot. Keep it a first-class citizen in CI.
- **Conway's law.** The team boundaries have to match the code seams. If one team owns behaviour that spans the seam, the seam won't hold — organisational and architectural boundaries are the same boundary, and pretending otherwise is how good designs erode.

## What it buys

- **A new brand or market ships as configuration, not a fork** — the single biggest lever on time-to-market for a multi-brand estate.
- **Brands evolve in parallel without breaking each other**, because the contract is the only thing they share and it changes slowly and deliberately.
- **The central team owns a small, stable surface** instead of a hundred bespoke sites — which is what lets the platform improve without the team growing to match the brand count.
- **Everyone can reason about their own layer**, because the seam tells them exactly what they own and what they can rely on.

The abstraction isn't the clever part. The clever part is *where you put the line* — and the discipline to keep genuinely different things on different sides of it.

---

**Related decisions:** ADR-009 (explicit versioned API contracts over shared-database integration) is the same principle applied to system integration — refuse the hidden coupling, pay the interface cost on purpose. ADR-011 (order events on a shared bus) draws another seam, this time in time rather than structure.
