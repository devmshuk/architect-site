export const metadata = { title: 'AI for Architects — Dev Mani Shukla' };

export default function AI() {
  return (
    <section>
      <p className="eyebrow">AI FOR ARCHITECTS</p>
      <h1>Using AI to make architecture writing consistent, without handing over the judgment.</h1>
      <p className="sub">Most stories about AI in engineering are about writing code faster. For an architect the more useful question is different: can AI make the thinking more consistent, without taking over the decisions?</p>

      <p className="muted">Why this matters: architecture decisions get written down so a team can build to them. When many people write those documents by hand, they come out different every time, and sections quietly go missing. A missing section is not a writing problem. It is how a risk reaches production without anyone noticing.</p>

      <h2>The problem with writing designs by hand</h2>
      <p>A technical solution design is the document that records how something will be built, and why. Written by many people over time, these documents drift apart. Different structure, different depth, and sometimes an important section — payments, consent, what happens when a system fails — is simply absent.</p>
      <p>The inconsistency is the real issue. If one design considers failure cases and the next one does not, the second team is not being careless. They just had no prompt to think about it.</p>

      <h2>The approach</h2>
      <p>I built a reusable template in Markdown that sets out every section a design must cover. A single business requirement can then produce a complete first draft in that shape, using GitHub Copilot. The result is the same structure and the same level of rigour every time. I also worked on the early proof of concept that shaped how the wider team adopted these tools.</p>

      <h2>The principle</h2>
      <p>AI here is used for <strong>consistency and completeness</strong>, not for deciding. The template guarantees that the design considered payments, consent, failure cases, and integration contracts, because those sections are always there. It does not decide the trade-offs. The architect still owns every decision and reviews every line.</p>
      <ul>
        <li><strong>The structure is fixed; the judgment stays human.</strong> A template cannot be talked out of asking the difficult question.</li>
        <li><strong>The saving is at the start.</strong> A consistent first draft turns a blank page into something to review. The slow part becomes the quick part.</li>
        <li><strong>Shared tools need a shared shape.</strong> A common template is how a team can use these tools without every output looking different.</li>
      </ul>

      <p className="muted">A working, interactive version of this generator is something I would like to build into this site. It is the reason the site runs on a real application framework rather than as fixed pages.</p>
    </section>
  );
}
