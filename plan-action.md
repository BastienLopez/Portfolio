# Plan d’action — état après audit local et préparation de publication

Date de mise à jour : **15 septembre 2026**  
Source : audit local du build courant, Lighthouse local et dernier contrôle HTTP de `https://bastienlopez.fr`.

## État général

La refonte locale est cohérente et prérendue sur **38 URLs** : accueil, page freelance, mentions légales, 22 projets, 3 services et 10 Dev Notes. La page légale a maintenant la même composition éditoriale que les pages services et expose son propre JSON-LD dans le HTML initial. Les Dev Notes utilisent le fond exact `#14191f`, l’ouverture inline revient au début de la note et l’index expose `CollectionPage`/`ItemList`. Le chargement anticipé de toutes les images projet a été supprimé ; les images restent lazy-loadées.

Les contrôles locaux donnent **SEO 100, accessibilité 100 et bonnes pratiques 100**, avec une performance Lighthouse de **88/100** sur `/` et `/freelance` lors du dernier passage. Le LCP local est à **3,2–3,3 s** contre environ 6,5 s avant la correction.

La publication n’a pas pu être exécutée : le probe SSH autorisé sur l’alias `ovh-vps` atteint bien le VPS mais est refusé par l’authentification (`Permission denied (publickey,password)`). Aucun contournement par IP ou clé non identifiée n’a été utilisé. La production publique reste donc à relire après rétablissement de cet accès.

## Travaux terminés et vérifiés dans le dépôt

| Sujet | État | Preuve |
| --- | --- | --- |
| Refonte UI des projets, stacks et fiches | **FAIT** | Tests E2E et 22 projets conservés. |
| Dev Notes et catégories | **FAIT** | 10 routes notes dans le sitemap et le prerender. |
| Fond et navigation des Dev Notes | **FAIT LOCALEMENT** | Fonds `#14191f` sur la section et les pages dédiées ; les notes inline s’ouvrent au début de leur contenu. |
| Page mentions légales — UI | **FAIT LOCALEMENT** | `src/pages/Legal.tsx` utilise la Navbar/Footer, la grille éditoriale et trois sections sans cartes arrondies. |
| HTML initial des mentions légales | **FAIT LOCALEMENT** | `dist/mentions-legales/index.html` contient titre, description, canonical, h1 et JSON-LD légaux. |
| Prerender et routes publiques | **FAIT LOCALEMENT** | Build + `verify:build` ; 38 sorties HTML et canonical contrôlés. |
| Convention canonical sans slash | **FAIT DANS LE CODE** | Prerender, sitemap, metadata et Caddy de référence alignés ; serveur public non encore relu. |
| SEO de base | **FAIT** | Lighthouse local SEO 100 ; JSON-LD et robots vérifiés. |
| Signaux SEO/GEO des Dev Notes | **FAIT LOCALEMENT** | `CollectionPage`, `ItemList`, `article:section`, mots-clés, temps de lecture et thèmes documentés dans `llms.txt`. |
| Accessibilité et bonnes pratiques | **FAIT** | Lighthouse local 100/100 ; E2E et axe sans régression. |
| Allègement du chargement projet | **FAIT LOCALEMENT** | Suppression du prefetch global des images ; performance 88/88 au dernier passage, LCP 3,2–3,3 s. |
| Sitemap source | **FAIT** | 38 URLs uniques, `lastmod`, robots et vérification build. |
| `llms.txt` / `llms-full.txt` source | **FAIT** | Identité, Reims, services, 22 projets et 10 notes. |
| Contenu SEO/GEO français | **FAIT** | Notes d’intention, traductions alignées et liens internes vers les services. |
| Témoignages | **FAIT — confirmé par le propriétaire** | L’utilisateur confirme qu’ils sont réels et publiés avec accord. |
| Audit reproductible | **FAIT** | `npm run audit:production` vérifie routes, metadata, JSON-LD, robots et GEO. |
| Installation reproductible | **FAIT** | `npm ci` terminé après arrêt du serveur local, 651 paquets installés, 0 vulnérabilité signalée. |
| Dépendances à haut risque | **FAIT** | `npm audit --audit-level=high` : 0 vulnérabilité. |

## Reste à faire avant de déclarer la production conforme

### P0 — publication et routage

| Action | Critère de validation | État |
| --- | --- | --- |
| Rétablir l’accès SSH de déploiement | `ssh -o BatchMode=yes ovh-vps 'printf READY'` renvoie `READY` avec la clé prévue | **BLOQUÉ — authentification VPS** |
| Publier le build local sur l’hôte actif | Le serveur sert les 38 dossiers prerender et les fichiers `llms*`, sitemap et robots à jour | **À déployer après accès SSH** |
| Appliquer la convention d’URL sans slash | Chaque `<loc>` du sitemap répond directement en 200, sans 308 intermédiaire | **À déployer / non prouvé** |
| Relire `/mentions-legales` sans JavaScript | Titre, description, canonical, h1 et JSON-LD légaux dans le premier HTML public | **À déployer / non prouvé** |
| Relancer `npm run audit:production` | 38/38 finales en 200, 0 redirection et 0 metadata incohérente | **Bloqué par la publication** |

### P1 — mesure externe et autorité

| Action | Critère de validation | État |
| --- | --- | --- |
| Relire Google Search Console | Sitemap traité, couverture et exclusions comprises, requêtes/impressions suivies à 7–28 jours | **À faire dans le compte** |
| Vérifier Bing Webmaster Tools | Sitemap et pages prioritaires découverts | **À faire dans le compte** |
| Mesurer la performance publique | Lighthouse après publication et comparaison du LCP avec le local 3,2–3,3 s | **À mesurer** |
| Obtenir des citations externes réelles | Profils ou pages tierces cohérents, publiés avec accord et reliés à l’identité | **À faire éditorialement** |

### P2 — GEO continu

| Action | Critère de validation | État |
| --- | --- | --- |
| Tester la découvrabilité LLM | Journal daté des requêtes, sources citées, URL renvoyées et évolution observée | **À faire périodiquement** |
| Publier de nouvelles notes à intention française | Chaque note répond à une question, cite une preuve interne et renvoie vers un service ou une étude de cas | **Prêt à continuer** |
| Maintenir les index GEO | Toute nouvelle fiche est ajoutée au sitemap, `llms.txt`, `llms-full.txt`, prerender et vérifications | **Automatisé par contrôles, à maintenir** |

## Checklist de clôture

- [x] Build, lint, typecheck, unités, E2E, assets, traductions et audit npm relancés.
- [x] Sitemap source, canonical et prerender utilisent la convention sans slash.
- [x] `/mentions-legales` est correct dans le HTML local sans dépendre de l’hydratation.
- [x] Performance locale améliorée : Lighthouse 89/89, LCP 3,1–3,2 s.
- [x] Témoignages conservés avec accord confirmé par le propriétaire.
- [ ] Rétablir l’authentification SSH puis publier le build et la configuration de routage.
- [ ] Relancer `npm run audit:production` avec 0 écart.
- [ ] Relire le sitemap et la couverture dans Search Console/Bing.
- [ ] Alimenter un journal de citations et de tests LLM.

## Ce qui ne peut pas être garanti par le code seul

Un sitemap, `llms.txt`, du JSON-LD et des pages bien rédigées facilitent l’interprétation. Ils ne forcent pas Google ou un LLM à indexer, citer ou recommander le site. L’autorité externe, les citations indépendantes, la qualité des réponses et le temps restent nécessaires.
