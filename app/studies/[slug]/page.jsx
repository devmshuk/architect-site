import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';           // enables Markdown tables
import { getAllStudies, getStudy } from '../../../lib/studies';

// Tells Next which study pages to pre-build (one per Markdown file).
export function generateStaticParams() {
  return getAllStudies().map((s) => ({ slug: s.slug }));
}

export default function StudyPage({ params }) {
  const { frontmatter, content } = getStudy(params.slug);
  return (
    <article>
      <p><a href="/studies" style={{ fontSize: 13, color: 'var(--muted)' }}>&larr; All studies</a></p>
      <p className="eyebrow" style={{ marginTop: 24 }}>ARCHITECTURE STUDY · {frontmatter.theme}</p>
      <h1>{frontmatter.title}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}
