import TranslationNotice from '../../components/TranslationNotice';
import { pageMeta } from '../../lib/seo';

export const metadata = pageMeta({
  title: 'Commerce at Scale — Notes de conception sur les plateformes de commerce',
  description:
    'Notes de conception sur les plateformes de commerce qui restent simples en grandissant : où placer les frontières, ce que chaque choix apporte et ce qu’il coûte.',
  path: '/',
  locale: 'fr',
});

const sections = [
  ['Études', 'Études de conception détaillées. Chacune traite un problème réel, les options et les compromis.', '/fr/studies'],
  ['Bibliothèque', 'Modèles de conception et décisions, en bref. Ce que chacun résout, et quand ne pas l’utiliser.', '/fr/library'],
  ['IA pour architectes', 'Utiliser l’IA pour rendre les documents d’architecture cohérents, sans lui céder le jugement.', '/fr/ai'],
  ['À propos', 'Ma façon d’aborder ce travail.', '/fr/about'],
];

export default function HomeFr() {
  return (
    <section>
      <TranslationNotice />
      <p className="eyebrow">ARCHITECTURE COMMERCE À GRANDE ÉCHELLE</p>
      <h1>Notes de conception sur les plateformes de commerce qui restent simples en grandissant.</h1>
      <p className="sub">Les grandes plateformes de commerce deviennent plus difficiles à faire évoluer avec le temps. La cause est rarement le code. Ce sont le plus souvent les frontières : entre les systèmes, entre les équipes, et autour des règles qu’une entreprise ne peut pas changer.</p>
      <p>Ces notes traitent ces problèmes : où placer les frontières, ce que chaque choix apporte et ce qu’il coûte. Les exemples viennent de Salesforce Commerce Cloud, la plateforme sur laquelle je travaille au quotidien. Le raisonnement s’applique à toute plateforme de commerce de cette taille.</p>
      <p className="muted">Écrit pour deux lecteurs. Si vous construisez ces systèmes, chaque étude entre dans le détail technique et les compromis. Si vous les pilotez, chaque étude commence par un résumé court et simple : ce que la décision apporte et ce qu’elle met en risque.</p>
      <div className="grid" style={{ marginTop: 40 }}>
        {sections.map(([t, d, href]) => (
          <a className="card" key={t} href={href}>
            <strong>{t}</strong>
            <p className="muted" style={{ marginTop: 8 }}>{d}</p>
            <span style={{ color: 'var(--accent)', fontSize: 14 }}>Lire &rarr;</span>
          </a>
        ))}
      </div>
    </section>
  );
}
