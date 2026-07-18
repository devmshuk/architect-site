export const metadata = { title: 'About — Dev Mani Shukla' };

const strengths = [
  ['Enterprise solution design', 'Decomposing a 100+ site commerce estate into reusable, layered patterns teams can own and scale cleanly across brands and markets.'],
  ['Integration architecture', 'Contracts, events and abstraction layers — REST/OCAPI/SCAPI, middleware and gateways — that let systems evolve independently.'],
  ['Platform governance & trade-offs', 'Framing options explicitly, protecting platform integrity, and recording the why behind each decision.'],
  ['Technical leadership', 'Aligning engineers, product owners and architects around a design and carrying it through delivery with near-zero critical defects.'],
];

const timeline = [
  ['2021 — now', 'SFCC Technical Lead → Solution Architecture', 'Lead the largest engineering delivery stream on an enterprise B2C Commerce program — solution design, feasibility, estimation and delivery governance across a 100+ site estate spanning brands and markets in EMEA.'],
  ['2020 — 2021', 'SFCC Developer, Commerce Platform', 'Headless-commerce R&D (GraphQL, LWC) and PWA performance work on high-traffic international storefronts.'],
  ['2019 — 2020', 'SFCC Developer', 'Full-stack storefront delivery and CRM integration; grew into technical ownership.'],
];

export default function About() {
  return (
    <section>
      <p className="eyebrow">ABOUT</p>
      <h1>Seven-plus years of engineering, now spent designing the systems teams build within.</h1>
      <p>I&rsquo;m an SFCC Technical Lead moving into solution architecture. For the last five years I&rsquo;ve led the largest engineering delivery stream on an enterprise B2C Commerce program — owning solution design input, technical feasibility, estimation and delivery governance across an estate of ~100 commerce sites spanning multiple brands and markets across EMEA.</p>
      <p className="muted">I moved toward architecture because the hardest problems were rarely in the code — they lived in the seams between systems, teams and constraints. My job is to make those seams explicit: to frame the trade-off, choose deliberately, and leave a record of why.</p>
      <p className="muted">I&rsquo;ve taken part in a standing weekly SFCC architecture forum for ~18 months alongside platform architects, and have been recognised as a top performer on a major EMEA commerce programme for platform-level contributions. I&rsquo;m Salesforce-certified in B2C Commerce and AI, and pursuing the B2C Commerce Architect certification.</p>

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
        <li>Recognised as a top performer on a major EMEA commerce programme. Salesforce Certified B2C Commerce Developer and AI Associate; B2C Commerce Architect in progress.</li>
      </ul>
    </section>
  );
}
