import { pageMeta } from '../../lib/seo';

export const metadata = pageMeta({
  title: 'Library — Commerce at Scale',
  description: 'Patterns for commerce at scale: what each one solves, when to use it, and when not to.',
  path: '/library',
  locale: 'en',
});

const patterns = [
  ['P-01', 'integration', 'Handle order events after checkout',
    'Calling every downstream system during checkout makes checkout fragile. A slow partner system can use up the server threads and stop shoppers buying.',
    'The other systems can accept a short delay. Record the order once, deliver it with retries, and let each system pick it up on its own time.',
    'A step is part of the answer the shopper is waiting for. The payment decision belongs inside checkout, not on the queue.'],
  ['P-02', 'platform', 'Shared base with thin override layers',
    'Many storefronts share most behaviour but each needs some local difference. Sites built by hand, or built by editing shared code, drift apart and become impossible to update.',
    'Sites are genuinely variations of one base. Keep the shared code untouched, put differences in thin layers above it, and express them as configuration.',
    'A brand needs to change more than it shares. At that point it is a separate product, not a set of overrides.'],
  ['P-03', 'platform', 'Decide what is shared and what is separate',
    'Copying product, price and customer data per market wastes effort and guarantees differences. Sharing too much means one edit silently changes a market that did not want it.',
    'You can separate the single source of truth from local presentation: one product catalog shared, each site with its own menu and selection, and separate price lists where a market controls its own pricing.',
    'Markets genuinely need to be isolated — separate brands, or a legal requirement to keep data apart. Then separate them deliberately.'],
  ['P-04', 'integration', 'Wrap partner code, do not edit it',
    'Payment, tax and fraud providers each work differently. Editing the code a vendor supplied, to make it fit, means you can never take their next version.',
    'You work across several providers or regions. Put your own thin layer around the vendor code and change behaviour there, so adding a market is configuration rather than a code change.',
    'One provider covers everything and will not change. The extra layer is then cost without benefit.'],
  ['P-05', 'performance', 'Cache the shared part, keep the personal part separate',
    'A page that shows anything personal — a basket, a name, a member price — cannot safely be stored and reused. If it is, one shopper can be shown another shopper’s data.',
    'Most of the page is the same for everyone. Store and reuse that shared part, and load the personal pieces separately so they are never mixed into the stored copy.',
    'A page is genuinely personal all the way through, such as basket or checkout. Those pages are simply not cached.'],
  ['P-06', 'performance', 'Keep the cache key clean',
    'A stored page is usually found again by its web address. Marketing tags and parameters in a different order make the same page look like many different pages, so almost nothing is reused.',
    'Traffic arrives with tracking parameters. Ignore the parts of the address that do not change the content, so the same page is always found under one address.',
    'A parameter genuinely changes what the page shows. Remove the noise, keep the meaning.'],
  ['P-07', 'integration', 'Match the connection to how badly it can fail',
    'Connecting every system the same way is what causes outages. Each system has a different tolerance for delay and for loss.',
    'You can sort each connection into one of four shapes: wait for it, send and forget, send in batches overnight, or queue it and retry until it succeeds.',
    'Never: this is the decision itself. But be explicit — an order that must reach finance is queued and retried, not sent and forgotten.'],
  ['P-08', 'governance', 'Configuration as the source of truth',
    'When sites are set up by hand, the running site becomes the only record of how it should be configured. Differences are then invisible and every change is risky.',
    'You can describe the intended state in version control and apply it with a step that is safe to repeat, so reality is checked against the description regularly.',
    'A one-off build with no estate behind it. The machinery costs more than the problem it prevents.'],
];

const adrs = [
  ['ADR-01', 'Keep shared and vendor code untouched',
    'Never edit the platform base or vendor-supplied code. Change behaviour from your own layer above it. This costs discipline and buys an estate that can keep taking updates, and fixes that only have to be made once.'],
  ['ADR-02', 'Headless storefront over a combined one',
    'Separate the shopper-facing front end from the commerce back end. Accepts a larger initial build and a higher skills requirement, in exchange for front-end flexibility and clearer boundaries between teams.'],
  ['ADR-03', 'Handle order events after checkout',
    'Record the order and deliver it to other systems with retries, instead of calling each one during checkout. Accepts a short delay downstream, with the payment decision kept inside checkout.'],
  ['ADR-04', 'Use API contracts instead of a shared database',
    'Rejected letting systems read each other’s database in favour of clear, versioned interfaces. Accepts more design work up front to avoid a hidden dependency that would freeze both sides.'],
  ['ADR-05', 'One shared product catalog, separate storefront catalogs',
    'Product records live once and are shared. Each site controls its own menu, selection and price list. Accepts more setup to get one source of product truth with local control of merchandising and pricing.'],
];

// Order the categories deliberately, rather than by how many entries each has.
const CATEGORIES = [
  ['integration', 'Integration', 'How systems talk to each other, and what happens when one of them fails.'],
  ['platform', 'Platform', 'How one platform serves many brands and markets without splitting apart.'],
  ['performance', 'Performance', 'Serving many shoppers at once without recomputing the same answer every time.'],
  ['governance', 'Governance', 'Keeping a large estate consistent as it grows.'],
];

export default function Library() {
  return (
    <section>
      <p className="eyebrow">LIBRARY</p>
      <h1>Patterns, and the situations that make each one the right choice.</h1>
      <p className="sub">Short entries. Each one says what problem it solves, when to use it, and — just as important — when not to.</p>
      <p className="muted">A pattern is a design that has worked before in a known situation. None of them are always right. The value is in the conditions, so each entry states them plainly.</p>

      {CATEGORIES.map(([key, heading, blurb]) => {
        const group = patterns.filter((p) => p[1] === key);
        if (!group.length) return null;
        return (
          <div key={key}>
            <h2>{heading}</h2>
            <p className="muted" style={{ marginTop: 0 }}>{blurb}</p>
            <div className="grid" style={{ marginTop: 18 }}>
              {group.map(([no, kind, name, problem, useWhen, avoidWhen]) => (
                <div className="card" key={no}>
                  <span className="tag">{no} · {kind}</span>
                  <h3 style={{ margin: '8px 0' }}>{name}</h3>
                  <p className="muted" style={{ marginTop: 0 }}>{problem}</p>
                  <p style={{ margin: '10px 0 2px', fontSize: 13 }}><strong>Use when</strong> — <span className="muted">{useWhen}</span></p>
                  <p style={{ margin: '2px 0', fontSize: 13 }}><strong>Avoid when</strong> — <span className="muted">{avoidWhen}</span></p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <h2>Decision records</h2>
      <p className="muted" style={{ marginTop: 0 }}>A decision record is a short note of a choice: what was decided, and what was given up. These come from the design studies, so they record reasoning rather than client projects.</p>
      {adrs.map(([id, title, decision]) => (
        <div className="row" key={id}>
          <div className="period">{id}</div>
          <div>
            <strong>{title}</strong>
            <p className="muted" style={{ marginTop: 6 }}>{decision}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
