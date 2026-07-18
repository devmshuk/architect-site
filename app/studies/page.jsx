import { getAllStudies } from '../../lib/studies';

export const metadata = { title: 'Architecture Studies — Dev Mani Shukla' };

export default function StudiesIndex() {
  const studies = getAllStudies();
  return (
    <section>
      <p className="eyebrow">ARCHITECTURE STUDIES</p>
      <h1>Design studies in commerce-at-scale.</h1>
      <p className="sub">
        Self-directed design studies and proofs of concept — not client
        deliverables. Each works through the context, the options, and the
        trade-offs behind the call.
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
