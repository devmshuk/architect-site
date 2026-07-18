export const metadata = { title: 'Library — Dev Mani Shukla' };

const patterns = [
  ['P-01', 'integration', 'Event-driven order orchestration', 'Downstream systems each need order events, but coupling them directly to checkout makes checkout fragile.', 'Consumers tolerate eventual consistency and you need to add or remove them without touching the producer.', 'A step is strictly synchronous to the customer outcome — take payment authorisation in the request path, not off a bus.'],
  ['P-02', 'platform', 'Multi-brand storefront templating', 'Many regional storefronts share most behaviour but each needs local overrides, and hand-built sites drift apart.', 'Sites are genuinely variations on a shared base and overrides can be expressed as configuration.', 'A market’s requirements diverge so far that overrides outnumber shared behaviour — that is a separate product.'],
  ['P-03', 'integration', 'Payment gateway abstraction', 'Multiple regional providers expose different APIs and failure semantics, leaking provider detail into checkout.', 'You operate across regions/providers and want to add a market as configuration rather than a code fork.', 'A single provider covers the whole estate — the abstraction is cost without payoff.'],
  ['P-04', 'performance', 'CDN-first content delivery', 'Dynamic rendering under seasonal peak drives latency and cost up exactly when traffic is most valuable.', 'Most content is cacheable and personalisation can be layered at the edge or client.', 'Pages are deeply personalised per request — invest in the origin path instead of fighting cache invalidation.'],
];

const adrs = [
  ['ADR-014', '2026 · 05', 'Adopt headless PWA over hybrid storefront', 'Move to a headless PWA with a CDN-first path. Accepts higher initial build and a steeper skills bar in exchange for flat peak latency and clean team boundaries.'],
  ['ADR-011', '2026 · 03', 'Standardise order events on a shared event bus', 'Publish order events to a shared bus; consumers subscribe independently. Accepts eventual consistency downstream, with payment authorisation kept synchronous in the request path.'],
  ['ADR-009', '2026 · 01', 'Reject shared-DB integration for API contracts', 'Rejected direct database sharing in favour of explicit versioned API contracts. Accepts more upfront interface work to avoid a hidden coupling that would freeze both schemas.'],
];

export default function Library() {
  return (
    <section>
      <p className="eyebrow">SYSTEM DESIGN LIBRARY</p>
      <h1>Patterns I reach for, and the context that makes each one the right call.</h1>
      <p className="sub">Reusable building blocks from commerce-at-scale work. Each states the problem it solves and — just as importantly — when not to use it.</p>

      <div className="grid" style={{ marginTop: 24 }}>
        {patterns.map(([no, kind, name, problem, useWhen, avoidWhen]) => (
          <div className="card" key={no}>
            <span className="tag">{no} · {kind}</span>
            <h3 style={{ margin: '8px 0' }}>{name}</h3>
            <p className="muted" style={{ marginTop: 0 }}>{problem}</p>
            <p style={{ margin: '10px 0 2px', fontSize: 13 }}><strong>Use when</strong> — <span className="muted">{useWhen}</span></p>
            <p style={{ margin: '2px 0', fontSize: 13 }}><strong>Avoid when</strong> — <span className="muted">{avoidWhen}</span></p>
          </div>
        ))}
      </div>

      <h2>Architecture decision records</h2>
      <p className="muted" style={{ marginTop: 0 }}>Short, dated records of the trade-offs behind each significant decision — what was chosen, and what was deliberately not.</p>
      {adrs.map(([id, date, title, decision]) => (
        <div className="row" key={id}>
          <div className="period">{id}<br /><span className="muted" style={{ fontSize: 12 }}>{date}</span></div>
          <div>
            <strong>{title}</strong>
            <p className="muted" style={{ marginTop: 6 }}>{decision}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
