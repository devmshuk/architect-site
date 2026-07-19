---
title: "Where the boundaries go in a multi-brand platform"
theme: "Seams"
competency: "Decomposition & boundary design"
summary: "One platform serving many brands and markets depends on where you draw
          the boundaries. Put the boundary where ownership and speed of change
          differ. Shared, stable behaviour on one side. Brand and market
          differences on the other, written as configuration and not as copies."
date: 2026-07-18
depth: deep
adrRefs: ["ADR-009", "ADR-011"]
draft: false
---

*This is a self-directed design study. It is not work delivered for a client, and it contains no client names or client numbers. It is grounded in the kind of platform I work on every day: Salesforce Commerce Cloud, running around a hundred storefronts for many brands and markets. The examples use Commerce Cloud mechanics. The reasoning applies to any large commerce platform.*

> **Why this matters**
>
> A group with many brands and many countries usually wants one platform, not twenty. The question is how much each brand is allowed to differ. Get that wrong and you either cannot serve a local need, or you end up with a hundred separate sites that only look like one platform.
>
> **The decision** — Build every brand and market on one shared base. Let each one change only what it truly needs, as a thin layer on top. Never edit the shared code itself.
>
> **What it gives you** — A new brand or market launches as configuration instead of a rebuild. One shared fix reaches every storefront. The platform can keep taking updates.
>
> **The risk it removes** — The estate slowly splitting into a hundred custom sites that cannot share a fix or a feature.

**In one sentence:** a multi-brand platform is a bet about where change happens. Put the things that rarely change and are shared on one side of the boundary. Put the things that vary by brand or market on the other side. Then a new brand is a configuration job, not a copy of the whole codebase.

---

## The problem

When one platform serves many brands across many countries, the hard part is not any single feature. The hard part is the **boundaries**: which behaviour is shared and owned by one central team, and which behaviour each brand or market is allowed to change.

There are two common ways to get this wrong.

- **Too strict.** The shared core cannot express what a market genuinely needs. So teams copy the shared code and change the copy, or they add small exceptions. Soon there are many hidden versions.
- **Too loose.** Everything can be overridden, so nothing is really shared. The platform is a thin layer over a hundred custom sites. No central improvement is safe.

The work is placing the boundary so you land between these two.

## The question that decides everything

For any piece of behaviour, ask one question: **does this vary by brand or market, and who owns that difference?**

That question decides which side of the boundary it belongs on.

In Commerce Cloud this is made concrete by the **cartridge path**. A *cartridge* is a folder of code. The *cartridge path* is an ordered list of those folders for one site. When the platform needs a file, it walks the list in order and uses the first match it finds. So a folder earlier in the list can replace a file from a folder later in the list. This is called an **override**: you change behaviour without editing the original file.

Here are the layers. The shared base is the widest because most behaviour lives there. Each layer above it should hold less.

```svg
layer-pyramid
```

*The width of each tier is the point: the shared base carries most of the behaviour, and each layer above it holds only what genuinely differs.*

The estate I work on has more layers than this — global, zone, brand, country, then site — but the idea is the same at any depth. A site *is* the shared base, unless a brand layer changes something, unless a market layer changes that, unless the site itself does. Most of any site comes from the shared base. The higher up you go, the less should live there.

## The design: share the base, override it, never edit it

Two rules do most of the work.

**First, keep the shared code untouched.** The platform's own base code, and any code bought from a partner, is never edited in place. If you edit it, you cannot take the next update without losing your changes. Over a few years this is how a platform becomes impossible to upgrade.

**Second, put differences in thin layers above it.** A brand or market layer sits earlier in the cartridge path and replaces only the specific files that differ. Commerce Cloud gives safe ways to do this: you can call the original version of a file from your own version and add to it, rather than copying it wholesale.

The same boundary runs through the data, not just the code:

- A **master catalog** holds the product records once. This is the single source of product truth.
- Each site has its own **storefront catalog** — its own menu structure, its own selection of products, its own merchandising.
- **Price books** (lists of prices) and **customer lists** (the pool of shopper accounts) get the same decision: share them where markets should move together, keep them separate where a market needs to control its own prices or where two brands must not share shopper accounts.

The pattern is the same in both cases. Name what is stable and share it. Keep what varies on the other side of the boundary, where it cannot break anyone else.

**The judgement this really needs:** knowing when a brand has stopped being a variation and has become its own product. If a brand's changes start to outnumber the shared behaviour they sit on, or if brand-specific logic starts appearing in the shared core, the honest answer is not one more exception. It is to give that brand its own boundary. Forcing two very different things to share one base is how a platform becomes slow to change.

## Options considered

| Option | Decision | Reasoning |
| --- | --- | --- |
| **Shared base with thin brand and market layers** | **Chosen** | This costs the most in design effort. You have to decide what is shared and hold that line. In return, brands move independently, a new market is mostly configuration, and one fix reaches everyone. The shared base stays updatable. |
| Copy the base for each brand | Rejected | Quickest for the second brand. Very expensive by the twentieth. Every shared fix has to be applied many times, and the copies drift apart. |
| Edit the shared base for each brand's needs | Rejected | The tempting shortcut. It works until the next platform update, which it quietly blocks. Hand edits to shared code are the main reason platforms get stuck on old versions. |
| One strict template with no real overrides | Rejected | Looks consistent, but the first market with a genuine legal or commercial need forces an exception. Being strict does not prevent differences. It only pushes them out of sight. |
| A separate front end for each brand | Rejected in this context | Gives each team the most freedom. You pay for it by rebuilding shared concerns such as login, payment, and consent for every brand. Right when brands are genuinely different products. Wrong when they are variations of one. |

The rejected options fail for the same underlying reason. They avoid deciding where difference is allowed, so difference appears anyway, in places nobody planned.

## What I would watch in production

- **Brand logic appearing in the shared core.** If the shared code starts checking "if this is brand X", the boundary has failed. Treat that as a design problem, not a feature.
- **The ratio of overridden to shared behaviour.** Track it per brand. When it climbs, that brand is telling you it wants its own boundary.
- **Edits to shared or partner code.** One hand edit removes the ability to take updates. This is worth blocking in code review and in the build.
- **Shared data with a wide blast radius.** A price list or content library shared by many sites means one edit changes every one of them. Decide that deliberately rather than discovering it in production.
- **Team boundaries that do not match code boundaries.** If one team owns behaviour on both sides of a boundary, the boundary will not hold. Organisation and architecture are the same shape, whether you plan it or not.

## What it gives you

- A new brand or market is configuration and a thin layer, not a copy of everything. This is the largest single effect on how fast a group can enter a new market.
- Brands can move at their own speed without breaking each other, because the only thing they share changes slowly and on purpose.
- The shared base stays updatable, so security and platform improvements can be adopted.
- The central team owns a small, stable surface instead of a hundred separate sites.
- Each team can see what it owns and what it can rely on.

The mechanism is not the interesting part. The interesting part is where you put the line, and the discipline to keep genuinely different things on different sides of it.

---

**Related decisions:** ADR-009 (use versioned API contracts instead of sharing a database) applies the same idea to system integration: refuse the hidden dependency and pay the cost of a clear interface. ADR-011 (handle order events after checkout, not during it) draws another boundary, this time in time rather than in structure.
