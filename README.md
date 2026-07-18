# Architect Site — Next.js Starter

A minimal, **working** Next.js site that renders your architecture studies from
Markdown. Built to *learn from*: every file is small and commented. Run it, read
it, then extend it.

Verified: `next build` prerenders `/`, `/studies`, and one page per study as
static HTML.

---

## Run it

Prerequisite: Node.js 18+ installed.

```bash
npm install
npm run dev        # → open http://localhost:3000
```

To produce the static site for hosting:

```bash
npm run build      # outputs a static site into ./out
```

Deploy `./out` free on **Netlify**, **Vercel**, or **GitHub Pages**. On Vercel
you can also just connect the git repo and every push auto-deploys.

---

## What's where

```
app/                     ← routes + layout (the "presentation", touched rarely)
  layout.jsx             ← page shell: full nav + footer + theme toggle
  globals.css            ← your design tokens (light/dark + manual toggle)
  page.jsx               ← Home (hero + section cards)
  studies/page.jsx       ← Studies index (lists every study automatically)
  studies/[slug]/page.jsx← one study, rendered from Markdown
  about/page.jsx         ← About (story, strengths, trajectory, recognition)
  ai/page.jsx            ← AI for Architects (TSD framework)
  library/page.jsx       ← patterns + ADRs
  contact/page.jsx       ← contact channels
components/ThemeToggle.jsx← client component: light/dark toggle (localStorage)
lib/studies.js           ← the "CMS": reads content/studies/*.md, splits frontmatter
content/studies/*.md     ← YOUR CONTENT. Add files here.
public/resume.pdf        ← your CV, linked from the nav
next.config.mjs          ← output:'export' → fully static build
```

The rule from the architecture doc holds: you touch `content/` constantly,
`app/` and `lib/` almost never.

---

## Add a new study (the payoff)

1. Create `content/studies/my-new-study.md`.
2. Give it frontmatter + body:

```md
---
title: "An order event bus, and its honest limits"
theme: "Events"
competency: "Consistency & coupling trade-offs"
summary: "Async orchestration for fulfilment, tax and CRM — and why payment
          authorisation stays synchronous."
date: 2026-08-01
depth: deep
draft: false
---

## Context
...
```

3. Save. It appears on `/studies` and gets its own page automatically. **No code change.**

Set `draft: true` to keep a piece hidden until it's ready — this is what
enforces your "no half-empty rooms" rule.

---

## The Next.js ideas worth learning here

- **App Router** — folders under `app/` are routes; `[slug]` is a dynamic route.
- **Server Components** — `lib/studies.js` reads the filesystem at build time.
  That's only possible because these components run on the server, not the browser.
- **`generateStaticParams`** (in `studies/[slug]/page.jsx`) — tells Next which
  study pages to pre-build. This is "SSG": one static HTML file per study.
- **`output: 'export'`** — no server needed; the whole site is static files.

---

## Suggested next steps (good learning exercises)

1. Add the **Events** and **Peak** studies (just Markdown files).
2. Build the remaining sections: `app/about/page.jsx`, `app/library/page.jsx`,
   an `app/ai/` section, and a `/resume` link to `public/resume.pdf`.
3. Port the full nav + dark-mode toggle button from the old site into `layout.jsx`.
4. When you want interactive demos in **AI for Architects**, switch a page to
   **MDX** so you can embed React components inline — that's the moment Next.js
   earns its place over a plain static generator.
