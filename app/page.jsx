const sections = [
  ['Studies', 'Deep design studies in commerce-at-scale — the reasoning, not just the result.', '/studies'],
  ['AI for Architects', 'Using GenAI as a consistency engine for architecture work.', '/ai'],
  ['Library', 'Reusable patterns and architecture decision records.', '/library'],
  ['About', 'Seven-plus years designing the systems teams build within.', '/about'],
];

export default function Home() {
  return (
    <section>
      <p className="eyebrow">ENTERPRISE COMMERCE · ARCHITECTURE AT SCALE</p>
      <h1>I make large commerce platforms faster to launch on, cheaper to run, and steadier under pressure.</h1>
      <p className="sub">The hardest problems are rarely in the code — they live in the seams between systems, teams, and constraints. That&rsquo;s what I design for.</p>
      <p>Across a 100+ site, multi-brand Salesforce Commerce Cloud estate, I turn tangled integrations into systems teams can reason about — and turn work that used to take weeks per site into a repeatable rollout measured in days. My depth is SFCC; the way I think — boundaries, contracts, trade-offs — carries across commerce platforms.</p>
      <div className="grid" style={{ marginTop: 40 }}>
        {sections.map(([t, d, href]) => (
          <a className="card" key={t} href={href}>
            <strong>{t}</strong>
            <p className="muted" style={{ marginTop: 8 }}>{d}</p>
            <span style={{ color: 'var(--accent)', fontSize: 14 }}>Explore &rarr;</span>
          </a>
        ))}
      </div>
    </section>
  );
}
