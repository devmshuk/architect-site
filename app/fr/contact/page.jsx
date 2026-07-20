import TranslationNotice from '../../../components/TranslationNotice';

import { pageMeta } from '../../../lib/seo';
export const metadata = pageMeta({
  title: 'Contact — Commerce at Scale',
  description: 'Me contacter au sujet d’une décision de conception ou de l’évolution d’une plateforme de commerce.',
  path: '/contact',
  locale: 'fr',
});

const channels = [
  ['E-MAIL', 'devmanis.757@gmail.com', 'mailto:devmanis.757@gmail.com'],
  ['LINKEDIN', 'Dev Mani Shukla', 'https://www.linkedin.com/in/dev-mani-shukla-5a1a9714a/'],
  ['TÉLÉPHONE', '+91 98992 10128', 'tel:+919899210128'],
];

export default function ContactFr() {
  return (
    <section>
      <TranslationNotice />
      <p className="eyebrow">CONTACT</p>
      <h1>Toujours prêt à discuter d’un problème d’architecture difficile.</h1>
      <p className="sub">Si vous pesez une décision de conception, ou si vous réfléchissez à la façon dont une plateforme de commerce doit évoluer, j’en discute volontiers avec vous. Sans argumentaire commercial.</p>
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
