// The content layer. This is the whole "CMS": read Markdown files from disk,
// split frontmatter (the card data) from the body (the deep-dive), return objects.
// Adding a study later = drop a .md file in content/studies/. No code change here.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const DIR = path.join(process.cwd(), 'content', 'studies');

export function getAllStudies() {
  return fs.readdirSync(DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const { data, content } = matter(fs.readFileSync(path.join(DIR, file), 'utf8'));
      return { slug, frontmatter: data, content };
    })
    .filter((s) => !s.frontmatter.draft)              // draft:true hides a piece
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
}

export function getStudy(slug) {
  const { data, content } = matter(
    fs.readFileSync(path.join(DIR, `${slug}.md`), 'utf8')
  );
  return { slug, frontmatter: data, content };
}
