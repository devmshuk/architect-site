import TranslationNotice from '../../../components/TranslationNotice';

import { pageMeta } from '../../../lib/seo';
export const metadata = pageMeta({
  title: 'Bibliothèque — Dev Mani Shukla',
  description: 'Modèles de conception pour le commerce à grande échelle : ce que chacun résout, quand l’utiliser et quand l’éviter.',
  path: '/library',
  locale: 'fr',
});

const patterns = [
  ['P-01', 'intégration', 'Traiter les événements de commande après le paiement',
    'Appeler tous les systèmes en aval pendant le tunnel de commande le rend fragile. Un système partenaire lent peut épuiser les fils d’exécution du serveur et empêcher les clients d’acheter.',
    'Les autres systèmes peuvent accepter un léger délai. Enregistrez la commande une fois, livrez-la avec des tentatives répétées, et laissez chaque système la reprendre à son rythme.',
    'Une étape fait partie de la réponse que le client attend. La décision de paiement appartient au tunnel de commande, pas à la file d’attente.'],
  ['P-02', 'plateforme', 'Une base partagée avec de fines couches de surcharge',
    'Beaucoup de sites partagent l’essentiel de leur comportement mais chacun a besoin de différences locales. Les sites construits à la main, ou en modifiant le code partagé, finissent par diverger et deviennent impossibles à mettre à jour.',
    'Les sites sont vraiment des variantes d’une même base. Laissez le code partagé intact, placez les différences dans de fines couches au-dessus, et exprimez-les en configuration.',
    'Une marque doit changer plus de choses qu’elle n’en partage. C’est alors un produit distinct, et non un ensemble de surcharges.'],
  ['P-03', 'plateforme', 'Décider ce qui est partagé et ce qui est séparé',
    'Copier les données produit, prix et client pour chaque marché gaspille des efforts et garantit des écarts. Trop partager signifie qu’une seule modification change un marché qui ne le voulait pas.',
    'Vous pouvez séparer la source de vérité unique de la présentation locale : un catalogue produit partagé, chaque site avec son propre menu et sa sélection, et des listes de prix distinctes là où un marché pilote ses prix.',
    'Des marchés doivent réellement être isolés — marques distinctes, ou obligation légale de séparer les données. Isolez-les alors délibérément.'],
  ['P-04', 'intégration', 'Encapsuler le code d’un partenaire plutôt que le modifier',
    'Les prestataires de paiement, de taxe et de lutte contre la fraude fonctionnent différemment. Modifier le code fourni par un éditeur pour l’adapter empêche d’adopter sa version suivante.',
    'Vous travaillez avec plusieurs prestataires ou régions. Placez votre propre couche fine autour du code de l’éditeur et modifiez le comportement à cet endroit, pour qu’ajouter un marché soit de la configuration.',
    'Un seul prestataire couvre tout et ne changera pas. La couche supplémentaire est alors un coût sans bénéfice.'],
  ['P-05', 'performance', 'Mettre en cache la partie commune, isoler la partie personnelle',
    'Une page qui affiche quelque chose de personnel — un panier, un nom, un prix membre — ne peut pas être stockée et réutilisée sans risque. Sinon, un client peut voir les données d’un autre.',
    'L’essentiel de la page est identique pour tout le monde. Stockez et réutilisez cette partie commune, et chargez les éléments personnels séparément pour qu’ils n’entrent jamais dans la copie stockée.',
    'Une page est réellement personnelle de bout en bout, comme le panier ou le paiement. Ces pages ne sont tout simplement pas mises en cache.'],
  ['P-06', 'performance', 'Garder une clé de cache propre',
    'Une page stockée est en général retrouvée par son adresse web. Les paramètres marketing, ou un ordre de paramètres différent, font passer la même page pour plusieurs pages différentes, et presque rien n’est réutilisé.',
    'Le trafic arrive avec des paramètres de suivi. Ignorez les parties de l’adresse qui ne changent pas le contenu, pour que la même page soit toujours retrouvée sous une seule adresse.',
    'Un paramètre change réellement ce que la page affiche. Retirez le bruit, gardez le sens.'],
  ['P-07', 'intégration', 'Adapter la connexion à la gravité de sa panne',
    'Connecter tous les systèmes de la même manière est ce qui provoque les pannes. Chaque système tolère différemment le délai et la perte.',
    'Vous pouvez classer chaque connexion en quatre formes : attendre la réponse, envoyer sans attendre, envoyer par lots la nuit, ou mettre en file d’attente et réessayer jusqu’au succès.',
    'Jamais : c’est la décision elle-même. Mais soyez explicite — une commande qui doit parvenir à la comptabilité est mise en file d’attente, pas envoyée sans contrôle.'],
  ['P-08', 'gouvernance', 'La configuration comme source de vérité',
    'Quand les sites sont configurés à la main, le site en production devient le seul enregistrement de sa configuration attendue. Les écarts sont alors invisibles et chaque changement devient risqué.',
    'Vous pouvez décrire l’état attendu dans un dépôt versionné et l’appliquer par une étape que l’on peut relancer sans risque, pour comparer régulièrement la réalité à la description.',
    'Une construction unique sans parc derrière elle. La mécanique coûte alors plus cher que le problème qu’elle évite.'],
];

const adrs = [
  ['ADR-016', '2026 · 07', 'Ne pas modifier le code partagé ni celui des éditeurs',
    'Ne jamais modifier la base de la plateforme ni le code fourni par un éditeur. Changez le comportement depuis votre propre couche au-dessus. Cela demande de la discipline et permet de continuer à recevoir les mises à jour, avec des correctifs à faire une seule fois.'],
  ['ADR-014', '2026 · 05', 'Vitrine découplée plutôt qu’intégrée',
    'Séparer l’interface client du back-end commerce. Accepte une construction initiale plus lourde et un niveau de compétence plus élevé, en échange de plus de souplesse côté interface et de frontières plus nettes entre équipes.'],
  ['ADR-011', '2026 · 03', 'Traiter les événements de commande après le paiement',
    'Enregistrer la commande et la livrer aux autres systèmes avec des tentatives répétées, au lieu de les appeler pendant le tunnel de commande. Accepte un léger délai en aval, la décision de paiement restant dans le tunnel.'],
  ['ADR-009', '2026 · 01', 'Des contrats d’API plutôt qu’une base de données partagée',
    'Refus de laisser les systèmes lire la base de données des autres, au profit d’interfaces claires et versionnées. Accepte plus de travail de conception en amont pour éviter une dépendance cachée qui figerait les deux côtés.'],
  ['ADR-006', '2025 · 11', 'Un catalogue produit partagé, des catalogues de vitrine distincts',
    'Les fiches produit existent une seule fois et sont partagées. Chaque site pilote son menu, sa sélection et sa liste de prix. Accepte plus de paramétrage pour obtenir une source de vérité produit unique avec un contrôle local du merchandising et des prix.'],
];

// Les catégories sont ordonnées volontairement, et non par nombre de fiches.
const CATEGORIES = [
  ['intégration', 'Intégration', 'Comment les systèmes communiquent, et ce qui se passe quand l’un d’eux tombe.'],
  ['plateforme', 'Plateforme', 'Comment une seule plateforme sert plusieurs marques et marchés sans se fragmenter.'],
  ['performance', 'Performance', 'Servir beaucoup de clients à la fois sans recalculer chaque fois la même réponse.'],
  ['gouvernance', 'Gouvernance', 'Garder un grand parc cohérent au fur et à mesure qu’il grandit.'],
];

export default function LibraryFr() {
  return (
    <section>
      <TranslationNotice />
      <p className="eyebrow">BIBLIOTHÈQUE</p>
      <h1>Des modèles de conception, et les situations qui rendent chacun pertinent.</h1>
      <p className="sub">Des fiches courtes. Chacune indique le problème résolu, quand l’utiliser et — tout aussi important — quand ne pas l’utiliser.</p>
      <p className="muted">Un modèle de conception est une solution qui a déjà fonctionné dans une situation connue. Aucun n’est toujours juste. La valeur est dans les conditions, donc chaque fiche les énonce clairement.</p>

      {CATEGORIES.map(([key, heading, blurb]) => {
        const group = patterns.filter((p) => p[1] === key);
        if (!group.length) return null;
        return (
          <div key={key}>
            <h2>{heading}</h2>
            <p className="muted" style={{ marginTop: 0 }}>{blurb}</p>
            <div className="grid" style={{ marginTop: 18 }}>
              {group.map(([no, kind, name, problem, useWhen, avoidWhen]) => (
                <div className="card" key={no}>
                  <span className="tag">{no} · {kind}</span>
                  <h3 style={{ margin: '8px 0' }}>{name}</h3>
                  <p className="muted" style={{ marginTop: 0 }}>{problem}</p>
                  <p style={{ margin: '10px 0 2px', fontSize: 13 }}><strong>À utiliser quand</strong> — <span className="muted">{useWhen}</span></p>
                  <p style={{ margin: '2px 0', fontSize: 13 }}><strong>À éviter quand</strong> — <span className="muted">{avoidWhen}</span></p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <h2>Registre des décisions</h2>
      <p className="muted" style={{ marginTop: 0 }}>Un registre de décision est une note courte : ce qui a été décidé, et ce qui a été abandonné. Ces décisions viennent des études de conception ; elles consignent un raisonnement, pas des projets clients.</p>
      {adrs.map(([id, date, title, decision]) => (
        <div className="row" key={id}>
          <div className="period">{id}<br /><span className="muted" style={{ fontSize: 12 }}>{date}</span></div>
          <div>
            <strong>{title}</strong>
            <p className="muted" style={{ marginTop: 6 }}>{decision}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
