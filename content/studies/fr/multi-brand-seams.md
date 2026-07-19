---
title: "Où placer les frontières dans une plateforme multi-marques"
theme: "Jointures"
competency: "Découpage et conception des frontières"
summary: "Une plateforme unique au service de plusieurs marques et marchés dépend
          de l'endroit où l'on trace les frontières. Placez la frontière là où
          changent la responsabilité et le rythme d'évolution. D'un côté le
          comportement partagé et stable. De l'autre les différences de marque et
          de marché, en configuration plutôt qu'en copies."
date: 2026-07-18
depth: deep
adrRefs: ["ADR-009", "ADR-011"]
draft: false
---

*Ceci est une étude de conception personnelle. Ce n'est pas un travail livré à un client, et elle ne contient aucun nom ni chiffre de client. Elle s'appuie sur le type de plateforme sur lequel je travaille chaque jour : Salesforce Commerce Cloud, avec environ une centaine de sites pour plusieurs marques et marchés. Les exemples utilisent les mécanismes de Commerce Cloud. Le raisonnement vaut pour toute grande plateforme de commerce.*

> **Pourquoi c'est important**
>
> Un groupe avec plusieurs marques et plusieurs pays veut en général une seule plateforme, pas vingt. La question est de savoir jusqu'où chaque marque peut différer. Si l'on se trompe, soit on ne peut pas répondre à un besoin local, soit on se retrouve avec une centaine de sites séparés qui ressemblent seulement à une plateforme.
>
> **La décision** — Construire chaque marque et chaque marché sur une base partagée. Ne laisser changer que le strict nécessaire, dans une fine couche au-dessus. Ne jamais modifier le code partagé lui-même.
>
> **Ce que cela apporte** — Une nouvelle marque ou un nouveau marché se lance en configuration plutôt qu'en reconstruction. Un correctif partagé atteint tous les sites. La plateforme peut continuer à recevoir les mises à jour.
>
> **Le risque évité** — Le parc qui se divise peu à peu en une centaine de sites sur mesure, incapables de partager un correctif ou une fonctionnalité.

**En une phrase :** une plateforme multi-marques est un pari sur l'endroit où le changement se produit. Placez d'un côté ce qui change rarement et se partage. Placez de l'autre ce qui varie par marque ou par marché. Une nouvelle marque devient alors un travail de configuration, et non une copie de tout le code.

---

## Le problème

Quand une plateforme sert plusieurs marques dans plusieurs pays, le point difficile n'est pas une fonctionnalité précise. Ce sont les **frontières** : quel comportement est partagé et détenu par une équipe centrale, et quel comportement chaque marque ou marché a le droit de changer.

Il y a deux manières courantes de se tromper.

- **Trop strict.** Le socle partagé ne peut pas exprimer un besoin réel d'un marché. Les équipes copient alors le code partagé et modifient la copie, ou ajoutent de petites exceptions. Il existe bientôt de nombreuses versions cachées.
- **Trop souple.** Tout peut être surchargé, donc plus rien n'est vraiment partagé. La plateforme n'est qu'une fine couche au-dessus d'une centaine de sites sur mesure. Aucune amélioration centrale n'est sûre.

Le travail consiste à placer la frontière entre ces deux extrêmes.

## La question qui décide de tout

Pour chaque comportement, posez une seule question : **est-ce que cela varie par marque ou par marché, et qui est responsable de cette différence ?**

Cette question décide de quel côté de la frontière il appartient.

Dans Commerce Cloud, cela prend la forme du **chemin de cartouches**. Une *cartouche* est un dossier de code. Le *chemin de cartouches* est une liste ordonnée de ces dossiers pour un site. Quand la plateforme a besoin d'un fichier, elle parcourt la liste dans l'ordre et utilise la première correspondance trouvée. Un dossier placé plus tôt peut donc remplacer un fichier d'un dossier placé plus tard. C'est ce qu'on appelle une **surcharge** : vous changez le comportement sans modifier le fichier d'origine.

Voici les couches. La base partagée est la plus large, car c'est là que vit l'essentiel du comportement. Chaque couche au-dessus devrait en contenir moins.

```svg
layer-pyramid-fr
```

*La largeur de chaque niveau est l'essentiel : la base partagée porte la plus grande part du comportement, et chaque couche au-dessus ne contient que ce qui diffère réellement.*

Le parc sur lequel je travaille comporte plus de couches que cela — global, zone, marque, pays, puis site — mais l'idée reste la même quelle que soit la profondeur. Un site *est* la base partagée, sauf si une couche marque change quelque chose, sauf si une couche marché change cela, sauf si le site lui-même le fait. L'essentiel d'un site vient de la base partagée. Plus on monte, moins il devrait y avoir de choses.

## La conception : partager la base, la surcharger, ne jamais la modifier

Deux règles font l'essentiel du travail.

**Premièrement, ne pas toucher au code partagé.** Le code de base de la plateforme, et tout code acheté à un partenaire, n'est jamais modifié directement. Si vous le modifiez, vous ne pourrez pas prendre la mise à jour suivante sans perdre vos changements. En quelques années, c'est ainsi qu'une plateforme devient impossible à mettre à jour.

**Deuxièmement, placer les différences dans de fines couches au-dessus.** Une couche marque ou marché se place plus tôt dans le chemin de cartouches et ne remplace que les fichiers qui diffèrent réellement. Commerce Cloud offre des moyens sûrs de le faire : vous pouvez appeler la version d'origine d'un fichier depuis votre propre version et l'enrichir, au lieu de la copier entièrement.

La même frontière traverse les données, pas seulement le code :

- Un **catalogue maître** contient les fiches produit une seule fois. C'est la source de vérité produit.
- Chaque site possède son propre **catalogue de vitrine** — sa structure de menu, sa sélection de produits, son merchandising.
- Les **listes de prix** et les **listes de clients** relèvent de la même décision : partagez-les là où les marchés doivent évoluer ensemble, séparez-les là où un marché doit piloter ses prix, ou là où deux marques ne doivent pas partager les comptes clients.

Le principe est identique dans les deux cas. Nommez ce qui est stable et partagez-le. Gardez ce qui varie de l'autre côté de la frontière, où cela ne peut casser personne.

**Le jugement réellement nécessaire :** savoir quand une marque a cessé d'être une variante et est devenue un produit à part. Si les changements d'une marque dépassent le comportement partagé sur lequel ils reposent, ou si de la logique propre à une marque apparaît dans le socle partagé, la réponse honnête n'est pas une exception de plus. C'est de donner à cette marque sa propre frontière. Forcer deux choses très différentes à partager une base, c'est ce qui rend une plateforme lente à faire évoluer.

## Options envisagées

| Option | Décision | Raisonnement |
| --- | --- | --- |
| **Base partagée avec de fines couches marque et marché** | **Retenue** | C'est l'option la plus coûteuse en effort de conception. Il faut décider ce qui est partagé et tenir cette ligne. En retour, les marques avancent indépendamment, un nouveau marché relève surtout de la configuration, et un correctif atteint tout le monde. La base partagée reste à jour. |
| Copier la base pour chaque marque | Rejetée | La plus rapide pour la deuxième marque. Très coûteuse à la vingtième. Chaque correctif partagé doit être appliqué plusieurs fois, et les copies divergent. |
| Modifier la base partagée selon les besoins de chaque marque | Rejetée | Le raccourci tentant. Cela fonctionne jusqu'à la mise à jour suivante, qu'il bloque discrètement. Les modifications manuelles du code partagé sont la principale raison pour laquelle des plateformes restent bloquées sur d'anciennes versions. |
| Un modèle strict sans vraie surcharge | Rejetée | Cela paraît cohérent, mais le premier marché avec un besoin légal ou commercial réel impose une exception. La rigidité n'empêche pas les différences. Elle les rend seulement invisibles. |
| Une interface distincte par marque | Rejetée dans ce contexte | Donne le plus de liberté à chaque équipe. On le paie en reconstruisant pour chaque marque les sujets communs : connexion, paiement, consentement. Pertinent quand les marques sont réellement des produits différents. Inadapté quand ce sont des variantes d'un même produit. |

Les options rejetées échouent pour la même raison de fond. Elles évitent de décider où la différence est permise, donc la différence apparaît quand même, à des endroits que personne n'avait prévus.

## Ce que je surveillerais en production

- **De la logique de marque dans le socle partagé.** Si le code partagé se met à tester « si c'est la marque X », la frontière a échoué. Traitez cela comme un problème de conception, pas comme une fonctionnalité.
- **Le rapport entre comportement surchargé et comportement partagé.** Suivez-le par marque. Quand il augmente, cette marque demande sa propre frontière.
- **Les modifications du code partagé ou du code partenaire.** Une seule modification manuelle supprime la capacité à recevoir les mises à jour. Cela mérite d'être bloqué en revue de code et dans la chaîne de construction.
- **Les données partagées à large portée.** Une liste de prix ou une bibliothèque de contenu partagée par plusieurs sites signifie qu'une modification les change tous. Décidez-le volontairement plutôt que de le découvrir en production.
- **Des frontières d'équipe qui ne suivent pas les frontières de code.** Si une équipe détient du comportement des deux côtés d'une frontière, cette frontière ne tiendra pas. L'organisation et l'architecture ont la même forme, que ce soit voulu ou non.

## Ce que cela apporte

- Une nouvelle marque ou un nouveau marché relève de la configuration et d'une fine couche, pas d'une copie de tout. C'est le principal levier sur la vitesse d'entrée sur un nouveau marché.
- Les marques avancent à leur rythme sans se gêner, car la seule chose qu'elles partagent change lentement et volontairement.
- La base partagée reste à jour, donc les améliorations de sécurité et de plateforme peuvent être adoptées.
- L'équipe centrale gère une surface petite et stable au lieu d'une centaine de sites distincts.
- Chaque équipe voit ce qu'elle détient et ce sur quoi elle peut s'appuyer.

Le mécanisme n'est pas le point intéressant. Le point intéressant est l'endroit où l'on trace la ligne, et la discipline de garder des choses réellement différentes de part et d'autre.

---

**Décisions liées :** ADR-009 (utiliser des contrats d'API versionnés plutôt qu'une base de données partagée) applique la même idée à l'intégration des systèmes : refuser la dépendance cachée et payer le coût d'une interface claire. ADR-011 (traiter les événements de commande après le paiement) trace une autre frontière, cette fois dans le temps plutôt que dans la structure.
