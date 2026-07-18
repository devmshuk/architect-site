# Handoff to Claude Code — deploy this site

## Context
This is my personal portfolio site (positioning me as an enterprise commerce / solution architect). It's already built and runs fine locally. I now want to deploy it to a free public URL. I'm also learning Next.js, so please explain each step briefly as you go rather than just running everything silently.

## Stack
- Next.js 14, App Router
- Plain JavaScript/JSX (not TypeScript)
- Content: Markdown files rendered with `react-markdown` + `remark-gfm`, frontmatter parsed with `gray-matter`
- `next.config.mjs` has `output: 'export'` → builds to a fully static site in `./out`
- One client component: `components/ThemeToggle.jsx` (light/dark toggle)

## Folder layout
```
app/               routes + layout (Home, studies, studies/[slug], about, ai, library, contact)
  layout.jsx       nav + footer + theme toggle
  globals.css      design tokens (light/dark)
lib/studies.js     reads content/studies/*.md at build time
content/studies/   3 Markdown studies (the content; add more here later)
components/         ThemeToggle
public/resume.pdf   my CV, linked from nav
next.config.mjs     output:'export'
.gitignore          already excludes node_modules, .next, out
```

## Current state
- `npm install` + `npm run dev` works; site loads at localhost:3000 with all sections.
- `npm run build` succeeds (verified) and prerenders all pages as static HTML.
- Not yet a git repo, not deployed.

## Goal
Deploy to a free public URL I can put on my CV and LinkedIn.

## What I'd like you to do (step by step, teaching as you go)
1. Initialize git in this folder and make the first commit.
2. Help me create a new GitHub repo and push to it (walk me through auth if needed).
3. Connect the repo to **Vercel** (my preferred host) and deploy. Note: because of `output: 'export'` it's a static build — confirm Vercel's settings are right, or advise if I should drop `output: 'export'` and let Vercel handle it.
4. Give me the live URL and confirm auto-deploy on future `git push`.
5. Briefly explain how I'd later add a **custom domain**.

## Constraints
- Don't rewrite my content or restructure the project — I just want it deployed.
- Keep `node_modules` out of git (already gitignored).
- Explain any command before running it; I want to actually learn the workflow.
