import { pageMeta } from '../../lib/seo';

export const metadata = pageMeta({
  title: 'Contact — Dev Mani Shukla',
  description: 'Get in touch about a design decision or how a commerce platform should grow.',
  path: '/contact',
  locale: 'en',
});

const channels = [
  ['EMAIL', 'devmanis.757@gmail.com', 'mailto:devmanis.757@gmail.com'],
  ['LINKEDIN', 'linkedin.com/in/dev-mani-shukla-5a1a9714a', 'https://www.linkedin.com/in/dev-mani-shukla-5a1a9714a/'],
  ['PHONE', '+91 98992 10128', 'tel:+919899210128'],
];

export default function Contact() {
  return (
    <section>
      <p className="eyebrow">CONTACT</p>
      <h1>Happy to talk through a hard architecture problem.</h1>
      <p className="sub">If you are weighing a design decision, or working out how a commerce platform should grow, I am glad to think it through with you. No pitch, no agenda.</p>
      <div className="grid" style={{ marginTop: 24 }}>
        {channels.map(([label, value, href]) => {
          const inner = (
            <>
              <span className="tag">{label}</span>
              <div style={{ fontWeight: 600, marginTop: 8 }}>{value}</div>
            </>
          );
          return href
            ? <a className="card" key={label} href={href} target="_blank" rel="noopener">{inner}</a>
            : <div className="card" key={label}>{inner}</div>;
        })}
      </div>
    </section>
  );
}
