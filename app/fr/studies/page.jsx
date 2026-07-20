import { getAllStudies } from '../../../lib/studies';
import TranslationNotice from '../../../components/TranslationNotice';

import { pageMeta } from '../../../lib/seo';
export const metadata = pageMeta({
  title: 'Études — Commerce at Scale',
  description: 'Études de conception sur le commerce à grande échelle : un problème, les options, et le raisonnement derrière le choix.',
  path: '/studies',
  locale: 'fr',
});

export default function StudiesIndexFr() {
  const studies = getAllStudies('fr');
  return (
    <section>
      <TranslationNotice />
      <p className="eyebrow">ÉTUDES DE CONCEPTION</p>
      <h1>Travailler des problèmes difficiles du commerce à grande échelle.</h1>
      <p className="sub">
        Chaque étude prend un problème, expose les options et explique le
        raisonnement derrière le choix — y compris ce que ce choix coûte.
      </p>
      <p className="muted">
        Chaque étude commence par un résumé court et simple : ce que la décision
        apporte et ce qu’elle met en risque. Le détail en dessous s’adresse à
        ceux qui construisent ces systèmes. Ce sont des études personnelles, pas
        des travaux livrés à un client, et elles ne contiennent aucun nom ni
        chiffre de client.
      </p>
      <div style={{ marginTop: 32 }}>
        {studies.map((s) => (
          <a className="card" key={s.slug} href={`/fr/studies/${s.slug}`}>
            <span className="tag">{s.frontmatter.competency}</span>
            <div className="theme">{s.frontmatter.theme}</div>
            <strong>{s.frontmatter.title}</strong>
            <p style={{ color: 'var(--muted)' }}>{s.frontmatter.summary}</p>
            <span style={{ color: 'var(--accent)', fontSize: 14 }}>Lire l&rsquo;étude &rarr;</span>
          </a>
        ))}
      </div>
    </section>
  );
}
