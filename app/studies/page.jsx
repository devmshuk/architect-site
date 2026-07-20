import { getAllStudies } from '../../lib/studies';

import { pageMeta } from '../../lib/seo';
export const metadata = pageMeta({
  title: 'Studies — Commerce at Scale',
  description: 'Design studies in commerce at scale: one problem each, the options, and the reasoning behind the choice.',
  path: '/studies',
  locale: 'en',
});

export default function StudiesIndex() {
  const studies = getAllStudies();
  return (
    <section>
      <p className="eyebrow">DESIGN STUDIES</p>
      <h1>Working through hard problems in commerce at scale.</h1>
      <p className="sub">
        Each study takes one problem, sets out the options, and explains the
        reasoning behind the choice — including what the choice costs.
      </p>
      <p className="muted">
        Every study opens with a short, plain summary of what the decision gives
        you and what it puts at risk. The detail below it is for people who build
        these systems. These are self-directed studies, not client work, and they
        contain no client names or numbers.
      </p>
      <div style={{ marginTop: 32 }}>
        {studies.map((s) => (
          <a className="card" key={s.slug} href={`/studies/${s.slug}`}>
            <span className="tag">{s.frontmatter.competency}</span>
            <div className="theme">{s.frontmatter.theme}</div>
            <strong>{s.frontmatter.title}</strong>
            <p style={{ color: 'var(--muted)' }}>{s.frontmatter.summary}</p>
            <span style={{ color: 'var(--accent)', fontSize: 14 }}>Read the study &rarr;</span>
          </a>
        ))}
      </div>
    </section>
  );
}
