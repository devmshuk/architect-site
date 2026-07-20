import StudyMarkdown from '../../../../components/StudyMarkdown';
import TranslationNotice from '../../../../components/TranslationNotice';
import { getAllStudies, getStudy } from '../../../../lib/studies';
import { pageMeta } from '../../../../lib/seo';
import { getDiagrams } from '../../../../lib/diagrams';

// Tells Next which French study pages to pre-build (one per Markdown file).
export function generateStaticParams() {
  return getAllStudies('fr').map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const { frontmatter } = getStudy(params.slug, 'fr');
  return pageMeta({
    title: `${frontmatter.title} — Commerce at Scale`,
    description: frontmatter.summary,
    path: `/studies/${params.slug}`,
    locale: 'fr',
  });
}

export default function StudyPageFr({ params }) {
  const { frontmatter, content } = getStudy(params.slug, 'fr');
  return (
    <article>
      <TranslationNotice />
      <p><a href="/fr/studies" style={{ fontSize: 13, color: 'var(--muted)' }}>&larr; Toutes les études</a></p>
      <p className="eyebrow" style={{ marginTop: 24 }}>ÉTUDE D&rsquo;ARCHITECTURE · {frontmatter.theme}</p>
      <h1>{frontmatter.title}</h1>
      <StudyMarkdown content={content} diagrams={getDiagrams()} />
    </article>
  );
}
