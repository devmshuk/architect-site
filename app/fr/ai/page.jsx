import TranslationNotice from '../../../components/TranslationNotice';

export const metadata = { title: 'IA pour architectes — Dev Mani Shukla' };

export default function AIFr() {
  return (
    <section>
      <TranslationNotice />
      <p className="eyebrow">IA POUR ARCHITECTES</p>
      <h1>Utiliser l’IA pour rendre les documents d’architecture cohérents, sans lui céder le jugement.</h1>
      <p className="sub">La plupart des récits sur l’IA en ingénierie parlent d’écrire du code plus vite. Pour un architecte, la question utile est différente : l’IA peut-elle rendre le raisonnement plus cohérent, sans prendre les décisions ?</p>

      <p className="muted">Pourquoi c’est important : les décisions d’architecture sont écrites pour qu’une équipe puisse construire à partir d’elles. Quand plusieurs personnes rédigent ces documents à la main, ils sortent différents à chaque fois, et des sections disparaissent discrètement. Une section manquante n’est pas un problème de rédaction. C’est ainsi qu’un risque arrive en production sans que personne ne le remarque.</p>

      <h2>Le problème des documents rédigés à la main</h2>
      <p>Un document de conception technique décrit comment une chose sera construite, et pourquoi. Rédigés par plusieurs personnes au fil du temps, ces documents divergent. Structure différente, niveau de détail différent, et parfois une section importante — paiements, consentement, comportement en cas de panne — est simplement absente.</p>
      <p>Le vrai problème est l’incohérence. Si une conception traite les cas de panne et que la suivante ne le fait pas, la deuxième équipe n’est pas négligente. Rien ne l’a invitée à y penser.</p>

      <h2>L’approche</h2>
      <p>J’ai créé un modèle réutilisable en Markdown qui définit chaque section qu’une conception doit couvrir. Une seule exigence métier peut alors produire un premier brouillon complet dans cette forme, avec GitHub Copilot. Le résultat a la même structure et la même rigueur à chaque fois. J’ai aussi participé à la première preuve de concept qui a orienté l’adoption de ces outils dans l’équipe.</p>

      <h2>Le principe</h2>
      <p>L’IA sert ici à la <strong>cohérence et à l’exhaustivité</strong>, pas à la décision. Le modèle garantit que la conception a examiné les paiements, le consentement, les cas de panne et les contrats d’intégration, parce que ces sections sont toujours présentes. Il ne tranche pas les compromis. L’architecte reste responsable de chaque décision et relit chaque ligne.</p>
      <ul>
        <li><strong>La structure est imposée ; le jugement reste humain.</strong> On ne peut pas convaincre un modèle de ne pas poser la question difficile.</li>
        <li><strong>Le gain est au démarrage.</strong> Un premier brouillon cohérent transforme une page blanche en quelque chose à relire. La partie lente devient la partie rapide.</li>
        <li><strong>Des outils partagés demandent une forme partagée.</strong> Un modèle commun permet à une équipe d’utiliser ces outils sans que chaque résultat soit différent.</li>
      </ul>

    </section>
  );
}
