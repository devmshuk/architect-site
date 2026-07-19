// Loads hand-drawn SVG diagrams from public/diagrams at build time so they can be
// inlined into a study. They are inlined rather than used as <img> because the SVGs
// reference the site's CSS variables (--accent, --text, --surface-2), which only
// resolve when the SVG is part of the document — that is what makes them follow the
// light/dark toggle.
import fs from 'node:fs';
import path from 'node:path';

const DIR = path.join(process.cwd(), 'public', 'diagrams');

export function getDiagrams() {
  if (!fs.existsSync(DIR)) return {};
  return Object.fromEntries(
    fs.readdirSync(DIR)
      .filter((f) => f.endsWith('.svg'))
      .map((f) => [f.replace(/\.svg$/, ''), fs.readFileSync(path.join(DIR, f), 'utf8')])
  );
}
