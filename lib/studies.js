// The content layer. This is the whole "CMS": read Markdown files from disk,
// split frontmatter (the card data) from the body (the deep-dive), return objects.
// Adding a study later = drop a .md file in content/studies/. No code change here.
// French translations live in content/studies/fr/ using the same file names, so a
// study keeps one slug across both languages.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = path.join(process.cwd(), 'content', 'studies');

function dirFor(locale) {
  return locale === 'fr' ? path.join(ROOT, 'fr') : ROOT;
}

export function getAllStudies(locale = 'en') {
  const dir = dirFor(locale);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.md'))                 // ignores the fr/ subfolder
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
      return { slug, frontmatter: data, content };
    })
    .filter((s) => !s.frontmatter.draft)              // draft:true hides a piece
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
}

export function getStudy(slug, locale = 'en') {
  const file = path.join(dirFor(locale), `${slug}.md`);
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  return { slug, frontmatter: data, content };
}
