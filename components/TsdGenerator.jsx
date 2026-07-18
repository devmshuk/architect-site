'use client';
// A working version of the Technical Solution Design template described on this page.
// It runs entirely in the browser: type a requirement, get a complete TSD outline.
// The point is not the text it writes. The point is that the structure cannot be
// skipped — every section a design must answer is always present, including the
// non-functional ones people forget. The judgment stays with the architect.
import { useMemo, useState } from 'react';

const NFR_SECTIONS = [
  ['Performance', 'Response-time targets, written as P95 or P99 (95% or 99% of requests at or under the target). State the page types separately — a category page and a checkout step are not the same problem.'],
  ['Scale and volume', 'Peak concurrent sessions, orders per minute, catalog size, and expected data growth. Name the peak event (a sale, a launch), not the average day.'],
  ['Availability and recovery', 'Uptime target, maintenance windows, and what happens after a failure — how long recovery may take, and how much data may be lost.'],
  ['Security and compliance', 'Card-payment scope, authentication, and privacy rules. Include data residency: where customer data is legally allowed to live.'],
  ['Localization', 'Languages, currencies, and markets. Include country-specific tax and legal text.'],
  ['Accessibility', 'The conformance level this must meet. This is usually a launch requirement, not an improvement.'],
  ['Operability', 'Release frequency, monitoring, logging, and who supports this once it is live.'],
  ['Data retention', 'How long order and customer data is kept. This is often a legal answer, not a technical one.'],
];

function buildTsd({ title, goal, systems, markets }) {
  const name = title.trim() || 'Untitled requirement';
  const businessGoal = goal.trim() || 'TODO: confirm with the business what outcome this is meant to produce.';
  const systemList = systems
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const marketNote = markets.trim() || 'TODO: confirm which markets and locales are in scope.';

  const integrationRows = systemList.length
    ? systemList
        .map((s) => `| ${s} | TODO: real-time, batch, or queued? | TODO: what happens when it is unavailable? | TODO: link the integration spec |`)
        .join('\n')
    : '| TODO: list each system this touches | TODO: real-time, batch, or queued? | TODO: what happens when it is unavailable? | TODO: link the integration spec |';

  const nfrBlock = NFR_SECTIONS.map(
    ([heading, prompt]) => `### ${heading}\n\n${prompt}\n\n**Target:** TODO: agree a number with the business. If they cannot give one, propose one and have them confirm it.\n`
  ).join('\n');

  return `# Technical Solution Design — ${name}

## 1. Business requirement

${businessGoal}

**In scope:** TODO: list what this covers.
**Out of scope:** TODO: list what it deliberately does not cover. This section prevents most scope disputes.

## 2. Functional requirements

What the system must do. Each one should be demonstrable.

- TODO: list each behaviour.
- For each, write the acceptance criterion that proves it is done.

## 3. Non-functional requirements

How well it must do it. These are the requirements nobody volunteers and everybody
regrets missing. A design cannot be sized or tested without numbers here.

${nfrBlock}
## 4. System landscape

Which systems are involved and how the work flows between them.

TODO: describe or draw the flow. Mark clearly which steps happen while the customer
is waiting, and which happen afterwards.

## 5. Integrations

| System | Pattern | Failure behaviour | Spec |
| --- | --- | --- | --- |
${integrationRows}

For each integration, state what happens when it is slow or down. A call made while
the customer waits must have a timeout and a fallback. Anything that must not be lost
needs to be queued and retried, not sent and forgotten.

## 6. Data

TODO: what data is created, read, or changed. Where does it live, and which system is
the source of truth? Name anything that is shared across sites, because a shared object
changes every site that uses it.

## 7. Code and configuration

TODO: which layer does this belong in — shared, brand, or market? Confirm that nothing
here requires editing platform or vendor code. If it does, that is a design problem to
solve now, not later.

## 8. Markets and rollout

${marketNote}

TODO: is this the same everywhere, or does it differ by market? If it differs, is the
difference configuration or code?

## 9. Failure modes

TODO: list the ways this can fail, and what the customer sees in each case. Include the
case where a dependency is unavailable at peak.

## 10. Traceability

| Requirement | Where the design meets it | How it is proven |
| --- | --- | --- |
| TODO | TODO | TODO |

Every requirement should map to a design decision and to a test. A requirement with no
test is a gap. A design element with no requirement is usually gold-plating.

## 11. Decisions and trade-offs

TODO: record each significant choice, what was rejected, and why. The rejected options
carry most of the reasoning.

## 12. Open questions

TODO: list what is still unknown and who needs to answer it, with a date. Unanswered
questions are the most common cause of late change.

---

*Generated from a standard template so that no design silently skips a section.
Every TODO is a decision a person still has to make.*
`;
}

export default function TsdGenerator() {
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [systems, setSystems] = useState('');
  const [markets, setMarkets] = useState('');
  const [copied, setCopied] = useState(false);

  const output = useMemo(
    () => buildTsd({ title, goal, systems, markets }),
    [title, goal, systems, markets]
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="tsd">
      <div className="tsd-form">
        <label>
          <span>Requirement</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a loyalty programme to a new market"
          />
        </label>
        <label>
          <span>What the business wants</span>
          <textarea
            rows={3}
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Shoppers in this market should earn and spend points, using the same rules as existing markets."
          />
        </label>
        <label>
          <span>Systems it touches <em>(comma separated)</em></span>
          <input
            type="text"
            value={systems}
            onChange={(e) => setSystems(e.target.value)}
            placeholder="Loyalty service, CRM, Marketing platform"
          />
        </label>
        <label>
          <span>Markets and locales</span>
          <input
            type="text"
            value={markets}
            onChange={(e) => setMarkets(e.target.value)}
            placeholder="France (fr_FR, EUR)"
          />
        </label>
      </div>

      <div className="tsd-head">
        <span className="tag">GENERATED OUTLINE</span>
        <button type="button" onClick={copy}>{copied ? 'Copied' : 'Copy Markdown'}</button>
      </div>
      <pre className="tsd-out">{output}</pre>
    </div>
  );
}
