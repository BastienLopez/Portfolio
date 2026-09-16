# Audit anti-AI-slop et readiness - portfolio Bastien Lopez

Date du contrôle : **16 septembre 2026**
Périmètre : dépôt local courant, build prerender, rendu navigateur local, routes, contenu, SEO/GEO, accessibilité, crédibilité, sécurité smoke et dernier readback HTTP de `https://bastienlopez.fr`.

## Synthèse

- Dépôt : `C:/Users/UTILISATEUR/Documents/GitHub/Portfolio`
- Stack : React, TypeScript, Vite, Tailwind, React Router
- Mode : audit local après extension SEO/GEO ; readback public exécuté le 16 septembre 2026 conservé comme référence de déploiement
- Couverture : **94/94 contrôles**
- Évidence : inspection statique, build testé, rendu local desktop, E2E, Lighthouse local/public et contrôle HTTP public
- Matrice locale : **53 PASS / 0 FAIL / 17 JUSTIFIED / 23 N/A / 1 UNKNOWN**
- Priorité restante : corriger la convention de slash côté serveur et le fallback de `/mentions-legales`

Le code local est à un niveau de publication élevé. Le SEO technique et le GEO technique couvrent désormais 38 routes canoniques, dont une page locale complète dédiée à la création de sites internet à Reims, avec métadonnées uniques, données structurées, index Dev Notes `CollectionPage`/`ItemList`, sitemap, `robots.txt`, `llms.txt` et `llms-full.txt`. L’ancienne URL `/services/sites-vitrines` est conservée hors index comme redirection de compatibilité. Le readback public exécuté le 16 septembre 2026 conserve l’ancien sitemap, 36 redirections 308 et l’ancien HTML de `/mentions-legales` sans slash ; la nouvelle page locale n’y est pas encore publiée.

## Notes internes

Ces notes sont des évaluations techniques de ce dépôt, pas des scores Google ou LLM officiels.

| Axe | Local | Production lue | Commentaire |
| --- | ---: | ---: | --- |
| Positionnement | **9,0/10** | **8,8/10** | Métier, Reims, offres et usages explicites. |
| Frontend / architecture | **9,1/10** | **8,8/10** | Routes prerender, composants et contrôles de cohérence. |
| UI / UX | **9,1/10** | **8,8/10** | Parcours public desktop/mobile sans erreur console ; redirections d’URL restantes. |
| Accessibilité / responsive | **9,5/10** | **9,5/10** | Lighthouse 100 et E2E axe ; aucune régression détectée. |
| Anti-AI-slop | **8,5/10** | **7,9/10** | Interface spécifique et contenu réel ; autorité externe encore limitée. |
| Copywriting | **8,8/10** | **8,4/10** | Français prioritaire, pages d’intention et CTA reliés. |
| Portfolio / projets | **9,0/10** | **8,7/10** | 22 projets, images, stacks et fiches accessibles. |
| Crédibilité / preuves | **8,2/10** | **7,5/10** | Témoignages réels et accord confirmé par le propriétaire ; résultats externes chiffrés non publiés. |
| SEO technique - code | **9,9/10** | **9,2/10** | Canonical, métadonnées d’article, JSON-LD, sitemap, robots et prerender contrôlés localement. |
| SEO technique - production | **9,9/10** | **8,0/10** | Lighthouse SEO 100, mais 36 redirections initiales et `/mentions-legales` sans slash incorrecte. |
| SEO contenu | **9,0/10** | **8,8/10** | 10 notes françaises d’intention et cinq thèmes explicités ; indexation réelle à mesurer. |
| GEO technique | **9,9/10** | **9,6/10** | Identité, services, page locale, 22 projets, 10 notes et leur index structuré validés localement ; extension à publier. |
| GEO autorité / entité | **7,2/10** | **6,8/10** | Citations tierces et recommandations LLM restent à mesurer. |
| **Global local** | **≈ 9,1/10** | **≈ 8,5/10** | Build local prêt ; l’écart observé est le routage réel et l’autorité externe. |

## Constats SEO et GEO

### Ce qui est validé localement

- Le sitemap local contient **38 URLs canoniques uniques**, toutes avec `lastmod`.
- Les 38 routes canoniques prerender ont un `<title>`, une meta description, un canonical, un `h1` et du JSON-LD ; aucun doublon de titre ou de description n’a été trouvé.
- Le build expose 22 `CreativeWork`, 10 pages de notes, 2 pages de services canoniques, `FAQPage`, `Service`, `BreadcrumbList`, `ProfilePage`, `Person` et `ProfessionalService` selon les routes.
- `robots.txt` autorise l’exploration publique, déclare le sitemap et autorise `OAI-SearchBot`.
- `llms.txt` et `llms-full.txt` locaux décrivent l’identité, Reims, la page locale complète, les 2 services canoniques, 22 projets et 10 notes avec leurs URLs canoniques.
- Les cinq thèmes Dev Notes sont décrits dans les fichiers LLM, et l’accueil expose un `CollectionPage`/`ItemList` reliant les dix pages dédiées.
- Les pages dédiées exposent leur section éditoriale, leurs mots-clés et leur temps de lecture ; les notes inline se positionnent au début du contenu à l’ouverture.
- Le contenu répond directement aux intentions « création de sites internet à Reims », « créer un site pour son entreprise », « application métier pour PME », « automatiser un processus » et « développeur web freelance à Reims ».
- Le site ne promet pas qu’un LLM recommandera automatiquement Bastien : les fichiers LLM facilitent l’interprétation, mais ne remplacent pas les citations externes.
- Les témoignages sont confirmés comme réels et publiés avec accord par le propriétaire ; aucune action de retrait n’est requise sur ce point.
- Le readback public confirme 200 sur l’accueil, `/freelance/`, `/mentions-legales/` et une Dev Note ; les parcours desktop/mobile testés n’ont produit aucune erreur console ou requête échouée.
- Lighthouse public atteint 93–95 en performance, 100 en accessibilité, bonnes pratiques et SEO ; le LCP est de 2,6 s sur l’accueil et freelance.
- Autorité externe : GitHub, LinkedIn, Malt et Société.com sont reliés dans les données structurées et les fichiers LLM ; ces profils confirment l’identité et l’activité de développement web à Reims. La recherche publique remonte encore peu le domaine directement, donc le GEO autorité reste à **7,2/10**.

### Ce qui reste à améliorer

| Priorité | Contrôle | Constat | Action recommandée |
| --- | --- | --- | --- |
| **P1** | L03/L04/L08 en production | `audit:production` lit 38/38 routes finales en 200 mais 36 URLs commencent par une 308 ; `/mentions-legales` sans slash expose encore le titre et canonical de l’accueil dans le premier HTML. | Corriger la règle Caddy pour servir directement la convention sans slash et traiter explicitement `/mentions-legales`, puis relancer `npm run audit:production`. |
| **P1** | Performance | Lighthouse public : 93–95/100 ; LCP 2,6 s, avec 88 KiB de JavaScript et 15–18 KiB de CSS inutilisés signalés. | Conserver le lazy-loading et réduire les chunks inutilisés si le gain reste mesurable sans régression. |
| **P2** | Autorité GEO | Les signaux GitHub, Malt et Société.com existent, mais les profils tiers ne pointent pas tous vers le domaine actuel et Search Console/Bing/LLM restent non mesurés. | Harmoniser les liens externes, tenir un journal daté des requêtes et suivre les sources citées. |
| **P2** | Autorité GEO | Les mentions externes, citations indépendantes, Google Search Console, Bing et recommandations LLM ne peuvent pas être garanties par le code. | Tenir un journal daté des requêtes, citations et pages sources ; obtenir progressivement des liens ou profils externes cohérents. |
| **P2** | S02 | Aucun `.env` local suivi et aucune vulnérabilité npm haute détectée, mais une recherche exhaustive de tout l’historique Git n’est pas une preuve de rotation des secrets externes. | Confirmer que les anciennes clés éventuelles ont été révoquées côté fournisseurs. |

## Vérifications exécutées

- `npm run lint` : **PASS**
- `npm ci` : **PASS**, 651 paquets installés, 0 vulnérabilité signalée
- `npm run typecheck` : **PASS**
- `npm run build` : **PASS**, 38 routes canoniques prerender
- `npm run verify:build` : **PASS**
- `npm run verify:translations` : **PASS**, 62 articles alignés
- `npm run verify:performance-assets` : **PASS**, 151 WebP référencés
- `npm test -- --run` : **PASS**, 7 tests
- `npm run test:e2e` : **PASS**, 16 tests
- `npm run check:links` : **PASS**, 29 OK, 2 inconnus externes, 0 échec (App Store et LinkedIn soumis à des limites réseau)
- `npm audit --audit-level=high` : **PASS**, 0 vulnérabilité
- Lighthouse local : **SEO 100, accessibilité 100, bonnes pratiques 100**, performance 88 sur `/`, 88 sur `/freelance` et 91 sur `/creation-site-internet-reims`
- Rendu navigateur local : service refondu et page légale éditoriale vérifiés ; navigation commune et sections lisibles
- Contrôle HTTP public : headers HTTPS, HSTS, CSP, `nosniff`, frame deny et permissions restrictives présents
- Readback navigateur public : **PASS**, 1440/375 px, Dev Notes `#14191f`, note inline repositionnée au début, page dédiée et légal avec slash corrects
- Lighthouse public : **PASS SEO/accessibilité/bonnes pratiques**, performance 93–95, LCP 2,6 s
- `npm run audit:production` : **FAIL attendu avant publication (44 écarts)**, readback public actuel avec ancien sitemap, 36 redirections initiales, page locale absente, redirection legacy absente et fallback légal sans slash incorrect

## Matrice des 94 contrôles

### A. Écriture et copy

| ID | Statut | Preuve / remarque |
| --- | --- | --- |
| W01 | JUSTIFIED | Les tirets longs restent ponctuels et cohérents avec les titres français. |
| W02 | JUSTIFIED | Le contraste pédagogique reste limité aux notes techniques. |
| W03 | JUSTIFIED | Les emojis sont cantonnés à certains contenus techniques, pas aux CTA. |
| W04 | PASS | Les sections servent la lecture et ne surchargent pas chaque phrase. |
| W05 | JUSTIFIED | Les groupes de trois correspondent aux stacks et offres réelles. |
| W06 | PASS | Les formulations restent directes. |
| W07 | PASS | Les paragraphes varient selon le contenu. |
| W08 | JUSTIFIED | Les questions sont réservées aux FAQ et reçoivent une réponse. |
| W09 | PASS | Le copy principal évite les formules génériques relevées par le scanner. |
| W10 | PASS | Typographie professionnelle cohérente avec la marque. |

### B. Signaux de site généré

| ID | Statut | Preuve / remarque |
| --- | --- | --- |
| P01 | PASS | Domaine public réel `bastienlopez.fr`. |
| P02 | JUSTIFIED | Palette navy/cyan/orange assumée, sans gradient violet par défaut. |
| P03 | PASS | Captures de projets et visuels contrôlés dans le rendu local. |
| P04 | PASS | L’utilisateur confirme que les témoignages sont réels et publiés avec l’accord des personnes concernées. |
| P05 | PASS | CTA et liens critiques couverts par E2E et check de liens. |
| P06 | PASS | Pas de scroll-reveal généralisé bloquant la lecture. |
| P07 | PASS | Services, projets, notes et légal ont des routes dédiées. |
| P08 | JUSTIFIED | Le nom textuel est utilisé comme wordmark volontaire. |
| P09 | PASS | `favicon.ico`, icônes PNG et manifest présents dans le build. |
| P10 | PASS | Aucun titre principal animé par couleur en boucle. |
| P11 | N/A | Pas de page de confidentialité distincte ni de tracking côté navigateur. |
| P12 | N/A | Les conditions générales ne sont pas nécessaires pour ce portfolio statique. |
| P13 | PASS | Aucun compteur de visiteurs en temps réel. |
| P14 | PASS | Aucun nombre de clients ou utilisateurs inventé. |
| P15 | PASS | La seule expérience chiffrée contrôlée est la revendication vérifiée 7+. |
| P16 | JUSTIFIED | Les emojis des notes sont du contenu pédagogique, pas l’iconographie produit. |
| P17 | PASS | Le hero précise métier, zone, services et cas d’usage. |
| P18 | PASS | Aucune police manuscrite décorative. |
| P19 | PASS | Aucun badge de générateur ou de plateforme visible. |
| P20 | PASS | La voix française reste spécifique et factuelle. |

### C. Defaults de design

| ID | Statut | Preuve / remarque |
| --- | --- | --- |
| D01 | JUSTIFIED | Les accents lumineux restent dans les tokens de marque. |
| D02 | PASS | Pas d’icônes flottantes décoratives sans fonction. |
| D03 | JUSTIFIED | Le fond sombre est un choix de contraste et d’identité. |
| D04 | PASS | Couleurs tokenisées avec rôles sémantiques. |
| D05 | PASS | Les ombres ne sont pas appliquées à chaque objet. |
| D06 | JUSTIFIED | Les grilles projets et témoignages reflètent des contenus comparables. |
| D07 | JUSTIFIED | Le blur est limité à la navigation et à la visionneuse. |
| D08 | JUSTIFIED | La typographie est intégrée au système existant. |
| D09 | PASS | Aucun bandeau pleine largeur purement décoratif. |
| D10 | PASS | Pas de bento appliqué par réflexe. |
| D11 | JUSTIFIED | Les fenêtres de code apparaissent seulement dans les notes techniques. |
| D12 | JUSTIFIED | Les listes de résultats ne sont pas toutes préfixées par une coche ; la page service utilise aussi des repères numérotés. |
| D13 | N/A | Pas d’offre tarifaire à trois niveaux. |
| D14 | PASS | Captures, études de cas, démos et liens de projet présents. |
| D15 | PASS | Les fiches services refondues utilisent des séparateurs éditoriaux ; les rayons restants ont une hiérarchie. |
| D16 | PASS | L’esthétique n’est pas le duo violet/noir générique. |
| D17 | N/A | Site principalement statique, sans attente réseau métier. |
| D18 | JUSTIFIED | Les halos servent l’identité des héros et des études de cas. |
| D19 | PASS | Pas de dot-grid décoratif systématique. |
| D20 | PASS | Pas d’étoile universelle pour les actions IA. |
| D21 | PASS | Pas de flèche rebondissante imposant le scroll. |
| D22 | PASS | Les animations hover restent attachées aux éléments interactifs. |
| D23 | JUSTIFIED | Cyan sur fond sombre est la palette de marque, non un thème IA arbitraire. |
| D24 | PASS | Pas de palette pastel indifférenciée. |

### D. Readiness et complétude

| ID | Statut | Preuve / remarque |
| --- | --- | --- |
| L01 | PASS | `404.html` prerender et page de récupération validés par le build. |
| L02 | PASS | Les CTA principaux sont visibles dans le premier écran. |
| L03 | PASS | 38 titres uniques localement ; production à réaligner après push. |
| L04 | PASS | 38 descriptions uniques localement ; production à réaligner après push. |
| L05 | PASS | Open Graph, Twitter Card et image 1200x630 présents. |
| L06 | PASS | Favicon, icônes et manifest présents. |
| L07 | PASS | `robots.txt` autorise le crawl et déclare le sitemap. |
| L08 | PASS | Sitemap local : 38 URLs canoniques uniques et `lastmod` complet. |
| L09 | PASS | Alt utiles sur les images de contenu ; avatars décoratifs explicitement vides. |
| L10 | PASS | E2E responsive exécuté à 320, 375, 768, 1280 et 1920 px sur les parcours principaux. |
| L11 | PASS | Les CTA restent atteignables sur les largeurs couvertes. |
| L12 | N/A | Pas de mutation ou chargement métier asynchrone. |
| L13 | N/A | Aucun formulaire de saisie à valider côté site. |
| L14 | N/A | Aucun workflow de soumission. |
| L15 | PASS | Mentions légales réelles et cohérentes avec l’absence de tracking navigateur. |
| L16 | N/A | Pas de vente ni de compte nécessitant des CGV dans ce site. |
| L17 | N/A | Aucun cookie non essentiel ou script d’audience côté client. |
| L18 | N/A | Mesure volontairement limitée à Search Console, déclarée dans le légal. |
| L19 | PASS | Email de contact réel et liens profils visibles. |
| L20 | PASS | 151 WebP vérifiés par le manifeste d’assets. |

### E. Sécurité smoke

| ID | Statut | Preuve / remarque |
| --- | --- | --- |
| S01 | PASS | Aucun secret runtime dans les variables client ; les clés trouvées sont des exemples pédagogiques. |
| S02 | UNKNOWN | Aucun `.env` suivi et aucun secret détecté dans le contrôle courant, mais la rotation historique côté fournisseurs n’est pas prouvable ici. |
| S03 | N/A | Aucun backend administrateur ou clé service dans ce dépôt public. |
| S04 | N/A | Aucune base de données exposée par ce portfolio statique. |
| S05 | N/A | Pas de stockage de données sensibles dans l’application. |
| S06 | N/A | Pas d’authentification. |
| S07 | N/A | Pas d’objets privés accessibles par identifiant. |
| S08 | N/A | Pas d’API d’administration ni de mass assignment. |
| S09 | N/A | Pas de session cookie. |
| S10 | N/A | Pas de mot de passe stocké. |
| S11 | N/A | Pas de login ni d’endpoint sensible. |
| S12 | N/A | Pas de formulaire public ni de commentaire. |
| S13 | PASS | Aucun runtime SQL ; les requêtes des articles sont du code d’exemple. |
| S14 | N/A | Pas de frontière serveur recevant une saisie utilisateur. |
| S15 | PASS | Le rendu des notes passe par la sanitation prévue avant insertion HTML. |
| S16 | N/A | Aucun upload. |
| S17 | N/A | Aucun endpoint JSON exposant des enregistrements. |
| S18 | PASS | CSP, HSTS, `nosniff`, frame deny, referrer et permissions policy vérifiés par HTTP. |
| S19 | PASS | Production servie en HTTPS avec HSTS. |
| S20 | PASS | `npm audit --audit-level=high` : 0 vulnérabilité. |

## Points de suivi après publication

1. Corriger côté serveur la convention sans slash et le fallback de `/mentions-legales`.
2. Relancer `npm run audit:production` et obtenir zéro redirection initiale, la redirection legacy attendue, le canonical légal exact et 38/38 routes conformes.
3. Suivre Search Console et Bing pendant 7 à 28 jours : couverture, exclusions, requêtes, impressions et CTR.
4. Tenir un journal GEO daté et renforcer les citations externes sans inventer de preuve.

## Limites

Le code peut rendre l’entité, les services et les contenus faciles à comprendre. Il ne peut pas forcer Google ou un LLM à crawler, indexer, citer ou recommander le site. La recommandation dépend de l’exploration, des liens externes, des sources indépendantes, de la qualité des réponses et du temps.
