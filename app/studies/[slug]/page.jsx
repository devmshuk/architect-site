import StudyMarkdown from '../../../components/StudyMarkdown';
import { getAllStudies, getStudy } from '../../../lib/studies';
import { pageMeta } from '../../../lib/seo';
import { getDiagrams } from '../../../lib/diagrams';

// Tells Next which study pages to pre-build (one per Markdown file).
export function generateStaticParams() {
  return getAllStudies().map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const { frontmatter } = getStudy(params.slug);
  return pageMeta({
    title: `${frontmatter.title} — Commerce at Scale`,
    description: frontmatter.summary,
    path: `/studies/${params.slug}`,
    locale: 'en',
  });
}

export default function StudyPage({ params }) {
  const { frontmatter, content } = getStudy(params.slug);
  return (
    <article>
      <p><a href="/studies" style={{ fontSize: 13, color: 'var(--muted)' }}>&larr; All studies</a></p>
      <p className="eyebrow" style={{ marginTop: 24 }}>ARCHITECTURE STUDY · {frontmatter.theme}</p>
      <h1>{frontmatter.title}</h1>
      <StudyMarkdown content={content} diagrams={getDiagrams()} />
    </article>
  );
}
