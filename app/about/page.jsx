import { pageMeta } from '../../lib/seo';

export const metadata = pageMeta({
  title: 'About — Commerce at Scale',
  description: 'How I think about designing commerce platforms that stay simple as they grow.',
  path: '/about',
  locale: 'en',
});

export default function About() {
  return (
    <section>
      <p className="eyebrow">ABOUT</p>
      <h1>I design commerce platforms that stay simple as they grow.</h1>
      <p className="sub">My work lives in the seams — between systems, teams, and the constraints a business cannot change.</p>
      <p>I care about designs a team can reason about under pressure: clear over clever, and honest about their trade-offs. When a design is hard to explain, that is usually a sign the boundaries are in the wrong place.</p>
      <p className="muted">I work on large, multi-brand commerce estates — around a hundred storefronts across many brands and markets. My depth is Salesforce Commerce Cloud; the way I work carries across commerce platforms.</p>
      <p className="muted">Most of what I think is in the <a href="/studies" style={{ color: 'var(--accent)' }}>studies</a>.</p>
    </section>
  );
}
