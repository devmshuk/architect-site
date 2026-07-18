export const metadata = { title: 'Library — Dev Mani Shukla' };

const patterns = [
  ['P-01', 'integration', 'Reliable async order integration', 'Coupling every downstream system directly into checkout makes checkout fragile — a slow or failing consumer, called inline, can brown out the buy button.', 'Downstream systems (fulfilment/OMS, tax, CRM, analytics) can tolerate seconds of lag: record the order event, deliver it via a queued, idempotent flow, and let each consume independently.', 'A step is strictly synchronous to the customer outcome — take payment authorisation in the request path, never off the queue.'],
  ['P-02', 'platform', 'Shared base + thin override layers', 'Many storefronts share most behaviour but each needs local overrides, and hand-built or base-edited sites drift apart and become un-upgradable.', 'Sites are genuinely variations on a shared base: keep the base pristine, layer thin brand/market overrides earlier in the cartridge path, and express difference as configuration.', 'A brand’s overrides outnumber the shared behaviour they sit on — that is a separate product, not an override set.'],
  ['P-03', 'platform', 'Contained vs shared data model', 'Duplicating product, price, and customer data per market wastes effort and guarantees drift; over-sharing means one edit silently changes a market that didn’t want it.', 'You can separate canonical truth from local presentation — a shared master catalog for products, per-site storefront catalogs for navigation and assortment, per-market price books where pricing autonomy matters.', 'Markets genuinely need isolated data (separate brands, or a data-residency constraint) — then isolate deliberately, don’t share.'],
  ['P-04', 'integration', 'Partner-cartridge abstraction', 'Multiple regional providers (payment, tax, fraud) expose different APIs and failure semantics, and editing a partner/LINK cartridge to fit leaks provider detail in and blocks upgrades.', 'You operate across regions/providers and want to add a market as configuration: wrap the partner cartridge behind your own integration layer and override from above, never in place.', 'A single provider covers the whole estate and will not change — the abstraction is cost without payoff.'],
  ['P-05', 'performance', 'Correctly partitioned edge caching', 'Dynamic rendering under seasonal peak drives latency and cost up exactly when traffic is most valuable — but a careless cache key serves the wrong language or currency.', 'Most content is cacheable and personalisation can be layered at the edge or client: cache aggressively at the CDN, partitioning the key correctly by locale and currency.', 'Pages are deeply personalised per request — invest in the origin path instead of fighting cache correctness.'],
  ['P-06', 'governance', 'Config as the source of truth', 'When sites are stood up by hand, no two end up alike, and the running site becomes the only record of what it should be — so drift is undetectable and every change is risky.', 'You can express desired state declaratively and apply it repeatably/idempotently, so a new site or capability is a configuration exercise and reality is continuously reconciled against the spec.', 'A one-off, single-site build with no estate behind it — the machinery costs more than the drift it prevents.'],
];

const adrs = [
  ['ADR-016', '2026 · 07', 'Keep the shared base pristine; customise by override', 'Never edit the platform base, plugin, or partner (LINK) cartridges. Customise from your own cartridges earlier in the path (cartridge-path resolution, module.superModule, controller middleware). Accepts override discipline in exchange for an estate that stays upgradable and fixes-once.'],
  ['ADR-014', '2026 · 05', 'Adopt headless PWA (PWA Kit) over hybrid storefront', 'Move to a headless composable storefront on a managed runtime with a CDN-first path. Accepts higher initial build and a steeper skills bar in exchange for front-end flexibility, edge rendering, and clean team boundaries.'],
  ['ADR-011', '2026 · 03', 'Consume order events asynchronously, off the request path', 'Record the order event and deliver it to downstream consumers via a queued, idempotent flow rather than inline synchronous calls. Accepts eventual consistency downstream, with payment authorisation kept strictly synchronous in checkout.'],
  ['ADR-009', '2026 · 01', 'Reject shared-DB integration for versioned API contracts', 'Rejected direct database sharing in favour of explicit versioned API contracts. Accepts more upfront interface work to avoid a hidden coupling that would freeze both schemas.'],
  ['ADR-006', '2025 · 11', 'Shared master catalog, per-site storefront catalogs', 'One master catalog holds canonical product records; each site owns its storefront catalog and per-market price books. Accepts more assignment wiring to get shared product truth with local merchandising and pricing autonomy.'],
];

export default function Library() {
  return (
    <section>
      <p className="eyebrow">SYSTEM DESIGN LIBRARY</p>
      <h1>Patterns I reach for, and the context that makes each one the right call.</h1>
      <p className="sub">Reusable building blocks from commerce-at-scale work — grounded in Salesforce Commerce Cloud, stated as portable principles. Each says the problem it solves and — just as importantly — when not to use it.</p>

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
      <p className="muted" style={{ marginTop: 0 }}>Short, dated records of the trade-offs behind each significant decision — what was chosen, and what was deliberately not. Illustrative records from the design studies and real practice.</p>
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
