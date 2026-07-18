const sections = [
  ['Studies', 'Long-form design studies. Each one works through a real problem, the options, and the trade-offs.', '/studies'],
  ['Library', 'Short patterns and decisions. What each one solves, and when not to use it.', '/library'],
  ['AI for Architects', 'Using AI to make architecture writing consistent, without handing over the judgment.', '/ai'],
  ['About', 'How I think about this work.', '/about'],
];

export default function Home() {
  return (
    <section>
      <p className="eyebrow">COMMERCE ARCHITECTURE AT SCALE</p>
      <h1>Design notes on commerce platforms that stay simple as they grow.</h1>
      <p className="sub">Large commerce platforms get harder to change as they grow. The reason is rarely the code. It is usually the boundaries — between systems, between teams, and around the rules a business cannot change.</p>
      <p>These notes work through those problems: how to place the boundaries, what each choice buys you, and what it costs. The examples come from Salesforce Commerce Cloud, where I work day to day. The thinking applies to any commerce platform of this size.</p>
      <p className="muted">Written for two readers. If you build these systems, each study goes into the mechanics and the trade-offs. If you plan or run them, each study opens with a short, plain summary of what the decision gives you and what it puts at risk.</p>
      <div className="grid" style={{ marginTop: 40 }}>
        {sections.map(([t, d, href]) => (
          <a className="card" key={t} href={href}>
            <strong>{t}</strong>
            <p className="muted" style={{ marginTop: 8 }}>{d}</p>
            <span style={{ color: 'var(--accent)', fontSize: 14 }}>Read &rarr;</span>
          </a>
        ))}
      </div>
    </section>
  );
}
