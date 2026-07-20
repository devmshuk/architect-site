import TranslationNotice from '../../../components/TranslationNotice';

import { pageMeta } from '../../../lib/seo';
export const metadata = pageMeta({
  title: 'À propos — Commerce at Scale',
  description: 'Ma façon d’aborder la conception de plateformes de commerce qui restent simples en grandissant.',
  path: '/about',
  locale: 'fr',
});

export default function AboutFr() {
  return (
    <section>
      <TranslationNotice />
      <p className="eyebrow">À PROPOS</p>
      <h1>Je conçois des plateformes de commerce qui restent simples en grandissant.</h1>
      <p className="sub">Mon travail se situe dans les jointures — entre les systèmes, les équipes et les contraintes qu’une entreprise ne peut pas changer.</p>
      <p>Je tiens aux conceptions qu’une équipe peut comprendre sous pression : claires plutôt qu’ingénieuses, et honnêtes sur leurs compromis. Quand une conception est difficile à expliquer, c’est en général le signe que les frontières sont mal placées.</p>
      <p className="muted">Je travaille sur de grands parcs de commerce multi-marques — environ une centaine de sites, pour plusieurs marques et marchés. Ma spécialité est Salesforce Commerce Cloud ; ma façon de travailler vaut pour les autres plateformes de commerce.</p>
      <p className="muted">L’essentiel de ma pensée se trouve dans les <a href="/fr/studies" style={{ color: 'var(--accent)' }}>études</a>.</p>
    </section>
  );
}
