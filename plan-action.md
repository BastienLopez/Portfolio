# Plan d’action — état après audit de production

Date de mise à jour : **16 septembre 2026**
Source : audit local courant, Lighthouse public et dernier readback HTTP de `https://bastienlopez.fr` ; la publication de ce build reste à faire.

## État général

La refonte locale est cohérente et prérendue sur **38 URLs canoniques** : accueil, page freelance, page locale complète de création de sites internet à Reims, mentions légales, 22 projets, 2 services et 10 Dev Notes. L’ancienne URL `/services/sites-vitrines` est conservée comme redirection de compatibilité vers la page Reims. La page légale a maintenant la même composition éditoriale que les pages services et expose son propre JSON-LD dans le HTML initial. Les Dev Notes utilisent le fond exact `#14191f`, l’ouverture inline revient au début de la note et l’index expose `CollectionPage`/`ItemList`. Le chargement anticipé de toutes les images projet a été supprimé ; les images restent lazy-loadées.

Les contrôles locaux donnent **SEO 100, accessibilité 100 et bonnes pratiques 100**. Le dernier passage Lighthouse mesure **88/100** sur `/`, **88/100** sur `/freelance` et **91/100** sur la page locale ; le LCP observé est de **3,0–3,2 s**, contre environ 6,5 s avant la correction.

Le build local inclut cette nouvelle page et ses métadonnées dédiées. Il n’est pas encore publié dans cette étape : la mise en production et la correction Caddy seront traitées séparément. Le dernier readback public connu répondait correctement sur les routes avec slash, mais conservait une redirection 308 pour 36 URLs sans slash ; `/mentions-legales` sans slash servait encore le shell accueil. Ces points restent des contrôles de publication.

## Travaux terminés et vérifiés dans le dépôt

| Sujet | État | Preuve |
| --- | --- | --- |
| Refonte UI des projets, stacks et fiches | **FAIT** | Tests E2E et 22 projets conservés. |
| Dev Notes et catégories | **FAIT** | 10 routes notes dans le sitemap et le prerender. |
| Fond et navigation des Dev Notes | **FAIT LOCALEMENT** | Fonds `#14191f` sur la section et les pages dédiées ; les notes inline s’ouvrent au début de leur contenu. |
| Page mentions légales — UI | **FAIT LOCALEMENT** | `src/pages/Legal.tsx` utilise la Navbar/Footer, la grille éditoriale et trois sections sans cartes arrondies. |
| HTML initial des mentions légales | **FAIT LOCALEMENT** | `dist/mentions-legales/index.html` contient titre, description, canonical, h1 et JSON-LD légaux. |
| Prerender et routes publiques | **FAIT LOCALEMENT** | Build + `verify:build` ; 38 sorties HTML canoniques et canonical contrôlés. |
| Convention canonical sans slash | **PARTIEL** | Prerender, sitemap, metadata et Caddy de référence alignés ; le serveur public redirige encore 36 URLs. |
| SEO de base | **FAIT** | Lighthouse local SEO 100 ; JSON-LD et robots vérifiés. |
| Signaux SEO/GEO des Dev Notes | **FAIT LOCALEMENT** | `CollectionPage`, `ItemList`, `article:section`, mots-clés, temps de lecture et thèmes documentés dans `llms.txt`. |
| Accessibilité et bonnes pratiques | **FAIT** | Lighthouse local 100/100 ; E2E et axe sans régression. |
| Allègement du chargement projet | **FAIT LOCALEMENT** | Suppression du prefetch global des images ; dernier passage Lighthouse 88/88/91, LCP 3,0–3,2 s. |
| Sitemap source | **FAIT** | 38 URLs canoniques uniques, `lastmod`, robots et vérification build. |
| Ancienne URL du portfolio GitHub Pages | **FAIT** | Référence obsolète supprimée du build ; les pages de production GitHub Pages des projets restent accessibles. |
| `llms.txt` / `llms-full.txt` source | **FAIT** | Identité, Reims, page locale, services, 22 projets et 10 notes. |
| Contenu SEO/GEO français | **FAIT LOCALEMENT** | Une page unique d’intention « création de sites internet à Reims » regroupant périmètre, livrables, méthode, résultats, FAQ et réalisations ; notes d’intention et traductions alignées. |
| Témoignages | **FAIT — confirmé par le propriétaire** | L’utilisateur confirme qu’ils sont réels et publiés avec accord. |
| Audit reproductible | **PARTIEL** | `npm run audit:production` vérifie routes, metadata, JSON-LD, robots et GEO ; readback public actuel : 44 écarts (sitemap ancien, page locale absente, alias legacy, redirections et légal). |
| Installation reproductible | **FAIT** | `npm ci` terminé après arrêt du serveur local, 651 paquets installés, 0 vulnérabilité signalée. |
| Dépendances à haut risque | **FAIT** | `npm audit --audit-level=high` : 0 vulnérabilité. |

## Reste à faire avant de déclarer la production conforme

### P0 — publication et routage

| Action | Critère de validation | État |
| --- | --- | --- |
| Publier le build local sur l’hôte actif | Le serveur sert les 38 dossiers prerender et les fichiers `llms*`, sitemap et robots à jour | **À faire — publication différée** |
| Appliquer la convention d’URL sans slash | Chaque `<loc>` du sitemap répond directement en 200, sans 308 intermédiaire | **À corriger — 36 redirections observées** |
| Relire `/mentions-legales` sans JavaScript | Titre, description, canonical, h1 et JSON-LD légaux dans le premier HTML public | **PARTIEL — `/mentions-legales/` OK, sans slash KO** |
| Relancer `npm run audit:production` | 38/38 finales en 200, 0 redirection, redirection legacy validée et 0 metadata incohérente | **À faire après publication** |

### P1 — mesure externe et autorité

| Action | Critère de validation | État |
| --- | --- | --- |
| Relire Google Search Console | Sitemap traité, couverture et exclusions comprises, requêtes/impressions suivies à 7–28 jours | **À faire dans le compte** |
| Vérifier Bing Webmaster Tools | Sitemap et pages prioritaires découverts | **À faire dans le compte** |
| Mesurer la performance publique | Lighthouse après publication et comparaison du LCP avec le local 3,2–3,3 s | **FAIT — 93/95, LCP 2,6 s** |
| Consolider les citations externes réelles | Profils ou pages tierces cohérents, liens vers le domaine actuel et identité alignée | **PARTIEL — GitHub, Malt et Société.com présents ; liens tiers à harmoniser** |

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
- [x] Performance locale améliorée : Lighthouse 88/88/91 au dernier passage, LCP 3,0–3,2 s.
- [x] Témoignages conservés avec accord confirmé par le propriétaire.
- [ ] Publier le build et vérifier les routes publiques principales.
- [ ] Corriger la convention d’URL côté serveur et le fallback de `/mentions-legales`.
- [ ] Relancer `npm run audit:production` avec 0 écart.
- [ ] Relire le sitemap et la couverture dans Search Console/Bing.
- [ ] Alimenter un journal de citations et de tests LLM.

## Ce qui ne peut pas être garanti par le code seul

Un sitemap, `llms.txt`, du JSON-LD et des pages bien rédigées facilitent l’interprétation. Ils ne forcent pas Google ou un LLM à indexer, citer ou recommander le site. L’autorité externe, les citations indépendantes, la qualité des réponses et le temps restent nécessaires.
