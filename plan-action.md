# Plan d’action — état après audit de production

Date de mise à jour : **21 septembre 2026**
Source : audit local, Lighthouse local et readback HTTP de `https://bastienlopez.fr` après publication et mise à jour Caddy.

## État général

La refonte locale et la production sont cohérentes sur **38 URLs canoniques** : accueil, page freelance, page locale complète de création de sites internet à Reims, mentions légales, 22 projets, 2 services et 10 Dev Notes. L’ancienne URL `/services/sites-vitrines` est conservée comme redirection 301 de compatibilité vers la page Reims. La page légale a la même composition éditoriale que les pages services et expose son propre JSON-LD dans le HTML initial. Les Dev Notes utilisent le fond exact `#14191f`, l’ouverture inline revient au début de la note et l’index expose `CollectionPage`/`ItemList`. Le chargement anticipé de toutes les images projet a été supprimé ; les images restent lazy-loadées.

Les contrôles locaux donnent **SEO 100, accessibilité 100 et bonnes pratiques 100**. Le dernier passage Lighthouse mesure **82/100** sur `/`, **87/100** sur `/freelance` et **89/100** sur la page locale. Les scores varient selon l’exécution ; quelques chunks vendor dépassent encore 500 KiB et restent une piste d’optimisation.

Le build local et le déploiement public incluent cette page et ses métadonnées dédiées. Le readback public du 21 septembre confirme 38/38 routes finales en 200, 0 redirection initiale, la redirection legacy attendue et le HTML légal correct sans slash. Les derniers correctifs locaux (hero 1080p et reset du scroll Freelance) restent à publier.

## Travaux terminés et vérifiés dans le dépôt

| Sujet | État | Preuve |
| --- | --- | --- |
| Refonte UI des projets, stacks et fiches | **FAIT** | Tests E2E et 22 projets conservés. |
| Dev Notes et catégories | **FAIT** | 10 routes notes dans le sitemap et le prerender. |
| Fond et navigation des Dev Notes | **FAIT LOCALEMENT** | Fonds `#14191f` sur la section et les pages dédiées ; les notes inline s’ouvrent au début de leur contenu. |
| Page mentions légales — UI | **FAIT LOCALEMENT** | `src/pages/Legal.tsx` utilise la Navbar/Footer, la grille éditoriale et trois sections sans cartes arrondies. |
| HTML initial des mentions légales | **FAIT LOCALEMENT** | `dist/mentions-legales/index.html` contient titre, description, canonical, h1 et JSON-LD légaux. |
| Prerender et routes publiques | **FAIT LOCALEMENT** | Build + `verify:build` ; 38 sorties HTML canoniques et canonical contrôlés. |
| Convention canonical sans slash | **FAIT** | Prerender, sitemap, metadata et Caddy public alignés ; 38/38 routes répondent directement en 200. |
| SEO de base | **FAIT** | Lighthouse local SEO 100 ; JSON-LD et robots vérifiés. |
| Signaux SEO/GEO des Dev Notes | **FAIT LOCALEMENT** | `CollectionPage`, `ItemList`, `article:section`, mots-clés, temps de lecture et thèmes documentés dans `llms.txt`. |
| Accessibilité et bonnes pratiques | **FAIT** | Lighthouse local 100/100 ; E2E et axe sans régression. |
| Allègement du chargement projet | **FAIT LOCALEMENT** | Suppression du prefetch global des images ; dernier passage Lighthouse 82/87/89. |
| Hero desktop et navigation Freelance | **FAIT LOCALEMENT** | Titre métier sur une ligne aux largeurs desktop contrôlées ; clic Freelance réinitialisé avant montage lazy et couvert par E2E. |
| Sitemap source | **FAIT** | 38 URLs canoniques uniques, `lastmod`, robots et vérification build. |
| Ancienne URL du portfolio GitHub Pages | **FAIT** | Référence obsolète supprimée du build ; les pages de production GitHub Pages des projets restent accessibles. |
| `llms.txt` / `llms-full.txt` source | **FAIT** | Identité, Reims, page locale, services, 22 projets et 10 notes. |
| Contenu SEO/GEO français | **FAIT LOCALEMENT** | Une page unique d’intention « création de sites internet à Reims » regroupant périmètre, livrables, méthode, résultats, FAQ et réalisations ; notes d’intention et traductions alignées. |
| Témoignages | **FAIT — confirmé par le propriétaire** | L’utilisateur confirme qu’ils sont réels et publiés avec accord. |
| Audit reproductible | **FAIT** | `npm run audit:production` : 38 routes, 38/38 finales en 200, 0 redirection initiale et GEO cohérent. |
| Installation reproductible | **FAIT** | `npm ci` terminé après arrêt du serveur local, 651 paquets installés, 0 vulnérabilité signalée. |
| Dépendances à haut risque | **FAIT** | `npm audit --audit-level=high` : 0 vulnérabilité. |

## Reste à faire après la publication

### P0 — aucun blocage technique identifié

| Action | Critère de validation | État |
| --- | --- | --- |
| Vérifier le déploiement public après chaque publication | 38 routes du sitemap en 200, fichiers `llms*`, sitemap et robots à jour | **FAIT — dernier audit PASS** |
| Maintenir la convention d’URL sans slash | Chaque `<loc>` du sitemap répond directement en 200, sans 308 intermédiaire | **FAIT — 0 redirection initiale** |
| Relire `/mentions-legales` sans JavaScript | Titre, description, canonical, h1 et JSON-LD légaux dans le premier HTML public | **FAIT — HTML légal correct** |
| Relancer `npm run audit:production` | 38/38 finales en 200, 0 redirection, redirection legacy validée et 0 metadata incohérente | **FAIT — PASS** |

### P1 — mesure externe et autorité

| Action | Critère de validation | État |
| --- | --- | --- |
| Relire Google Search Console | Sitemap traité, couverture et exclusions comprises, requêtes/impressions suivies à 7–28 jours | **À faire dans le compte** |
| Vérifier Bing Webmaster Tools | Sitemap et pages prioritaires découverts | **À faire dans le compte** |
| Mesurer la performance publique | Lighthouse après publication et comparaison du LCP avec le local | **À relancer après publication** — le passage local est 82/87/89 ; le readback public actuel est structurel |
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
- [x] Performance locale améliorée : Lighthouse 82/87/89 au dernier passage ; SEO/a11y/bonnes pratiques à 100.
- [x] Témoignages conservés avec accord confirmé par le propriétaire.
- [ ] Publier le build local courant et vérifier les routes publiques principales.
- [x] Corriger la convention d’URL côté serveur et le fallback de `/mentions-legales`.
- [x] Relancer `npm run audit:production` avec 0 écart.
- [ ] Relire le sitemap et la couverture dans Search Console/Bing.
- [ ] Alimenter un journal de citations et de tests LLM.

## Ce qui ne peut pas être garanti par le code seul

Un sitemap, `llms.txt`, du JSON-LD et des pages bien rédigées facilitent l’interprétation. Ils ne forcent pas Google ou un LLM à indexer, citer ou recommander le site. L’autorité externe, les citations indépendantes, la qualité des réponses et le temps restent nécessaires.
