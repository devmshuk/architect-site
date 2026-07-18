export const metadata = { title: 'About — Dev Mani Shukla' };

const strengths = [
  ['Enterprise solution design', 'Decomposing a 100+ site commerce estate into a layered, shared-base architecture teams can own and scale cleanly across brands and markets — shared behaviour above the seam, brand and market variation below it as thin overrides.'],
  ['Integration architecture & governance', 'Delivering and safeguarding the integrations around commerce — loyalty, consent/GDPR, fraud, marketing, returns, and CRM feeds — over middleware and gateways, keeping platform integrity and data consistency intact.'],
  ['Platform governance & trade-offs', 'Framing options explicitly, keeping the shared base pristine and upgradable, owning code-merge governance across delivery streams, and recording the why behind each decision.'],
  ['Technical leadership', 'Aligning engineers, product owners and architects around a design and carrying it through delivery — the primary technical escalation point on the stream, with near-zero critical production defects.'],
];

const timeline = [
  ['2021 — now', 'SFCC Technical Lead → Solution Architecture', 'Lead the largest engineering delivery stream on an enterprise B2C Commerce program — solution design input, technical feasibility, estimation and delivery governance across a 100+ site estate spanning brands and markets in EMEA. Work natively in a global → zone → brand → country → site layered cartridge architecture.'],
  ['2020 — 2021', 'SFCC Developer, Commerce Platform', 'Headless-commerce R&D (GraphQL, Lightning Web Components) on an internal commerce accelerator, and PWA integration plus site-wide performance work on a high-traffic international storefront.'],
  ['2019 — 2020', 'SFCC Developer', 'Full-stack SFCC storefront delivery and CRM integration on a global retail brand; grew into technical ownership.'],
];

export default function About() {
  return (
    <section>
      <p className="eyebrow">ABOUT</p>
      <h1>Seven-plus years of engineering, now spent designing the systems teams build within.</h1>
      <p>I&rsquo;m a technical lead in enterprise commerce, working at the architecture level — solution design, platform governance, and the trade-offs behind them. For the last five years I&rsquo;ve led the largest engineering delivery stream on a program of ~100 commerce sites, spanning many brands and markets across EMEA — owning solution-design input, technical feasibility, estimation, and delivery governance.</p>
      <p className="muted">I moved toward architecture because the hardest problems were rarely in the code — they lived in the seams between systems, teams and constraints. My job is to make those seams explicit: to frame the trade-off, choose deliberately, and leave a record of why. A design I&rsquo;m proud of took a capability that used to be built site-by-site over weeks and turned it into a standardised, repeatable rollout measured in days.</p>
      <p className="muted">My depth is in Salesforce Commerce Cloud — SFRA and headless/PWA Kit, cartridge-based layered architecture, and the integration and data model around it — but the way I work (boundaries, contracts, and trade-offs) carries across commerce platforms. I&rsquo;ve taken part in a standing weekly SFCC architecture forum for ~18 months alongside platform architects, and I&rsquo;ve been recognised as a top performer on a major EMEA commerce programme. I&rsquo;m Salesforce-certified in B2C Commerce and AI, with the B2C Commerce Architect certification in progress.</p>

      <h2>What I do</h2>
      <div className="grid">
        {strengths.map(([t, d]) => (
          <div className="card" key={t}>
            <strong>{t}</strong>
            <p className="muted" style={{ marginTop: 8 }}>{d}</p>
          </div>
        ))}
      </div>

      <h2>Trajectory</h2>
      {timeline.map(([period, role, note]) => (
        <div className="row" key={period}>
          <div className="period">{period}</div>
          <div>
            <strong>{role}</strong>
            <p className="muted" style={{ marginTop: 6 }}>{note}</p>
          </div>
        </div>
      ))}

      <h2>Leadership &amp; recognition</h2>
      <ul>
        <li>Designed and independently lead a month-long induction that has brought 50+ engineers into productive delivery; trusted with the practice&rsquo;s hardest mentoring turnarounds.</li>
        <li>SFCC subject-matter expert and Commerce Cloud Center of Excellence member — setting standards and leading knowledge-sharing; contributes to technical hiring.</li>
        <li>Recognised as a top performer on a major EMEA commerce programme. Salesforce Certified B2C Commerce Developer and AI Associate; B2C Commerce Architect in progress; Salesforce B2C Commerce Implementation Expert.</li>
      </ul>
    </section>
  );
}
