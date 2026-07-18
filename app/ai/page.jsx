export const metadata = { title: 'AI for Architects — Dev Mani Shukla' };

export default function AI() {
  return (
    <section>
      <p className="eyebrow">AI FOR ARCHITECTS</p>
      <h1>Using GenAI as a consistency engine for architecture work — not a novelty.</h1>
      <p className="sub">Most &ldquo;AI in engineering&rdquo; stories are about writing code faster. The more interesting question for an architect is different: can AI make the <em>thinking</em> more consistent, without outsourcing the judgment?</p>

      <h2>The Technical Solution Design framework</h2>
      <p>Technical Solution Designs (TSDs) are how an architecture decision gets written down so a team can build to it. Done by hand across many people, they drift: different structure, different depth, sections quietly missing. That inconsistency is a governance problem, not a writing problem.</p>
      <p>So I designed a reusable TSD framework in Markdown that encodes every standard section a design must cover. A single business-requirement input can then generate a complete, consistent first-draft TSD via GitHub Copilot — same shape, same rigour, every time. I contributed to the initial Copilot proof-of-concept that guided how the wider team adopted GenAI in delivery.</p>

      <h2>The principle behind it</h2>
      <p>AI here is a <strong>consistency and completeness engine</strong>, not a decision-maker. It guarantees the design considered payments, consent, failure modes, and integration contracts — because the framework forces those sections. It does not decide the trade-offs; the architect still owns every call, and reviews every line. The value is that no design silently skips the section that would have caught the problem.</p>
      <ul>
        <li><strong>Structure is enforced, judgment stays human.</strong> The template can&rsquo;t be argued out of asking the hard questions.</li>
        <li><strong>Speed compounds at the boundary.</strong> A consistent first draft turns a blank page into a review — the expensive part becomes the cheap part.</li>
        <li><strong>Governed adoption.</strong> A shared framework is how a team uses GenAI without every output looking different.</li>
      </ul>

      <p className="muted">Salesforce Certified AI Associate. A live, interactive version of the TSD generator is the next thing I&rsquo;m building into this site — the reason it runs on a real application framework rather than static pages.</p>
    </section>
  );
}
