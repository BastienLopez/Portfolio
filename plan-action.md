# Plan d’action — audit post-refonte

Date de l’audit : 15 septembre 2026.

## Lecture correcte de l’état

Le dépôt local contient bien la refonte attendue : fiches projet premium, quatre études de cas, cartes projets avec stacks en texte séparé, six blocs de compétences, Dev Notes par catégories, pages dédiées, rendu code/Mermaid, assets responsive et balisage SEO/GEO. La production publique n’est toutefois pas synchronisée avec ce dépôt : elle sert encore une version antérieure. Aucun déploiement n’a été effectué pendant l’audit.

Le score local mesure la version construite dans le dépôt. La colonne production est une lecture HTTP du domaine public ; elle reste inférieure tant que la mise en ligne n’est pas faite.

## Comparatif des scores

| Axe | Ancien audit | Post-audit local | Production lue |
| -------------------------- | -----------: | ----------------: | ----------------: |
| Positionnement | 7.5/10 | **8.8/10** | non recalculé sur la version obsolète |
| UI / UX | 7/10 | **8.3/10** | non recalculé sur la version obsolète |
| Anti-AI-slop | 6/10 | **7.6/10** | non recalculé sur la version obsolète |
| Copywriting | 6.5/10 | **7.8/10** | non recalculé sur la version obsolète |
| Portfolio / projets | 7.5/10 | **8.8/10** | non recalculé sur la version obsolète |
| Crédibilité / preuves | 6/10 | **6.8/10** | non recalculé sur la version obsolète |
| SEO technique — code | 8/10 | **8.7/10** | non recalculé sur la version obsolète |
| SEO technique — production | ~6.5/10 | **8.0/10 local** | **5.5/10 observé** |
| SEO contenu | 7/10 | **7.9/10** | **6.5/10 observé** |
| GEO technique | 7.5/10 | **8.8/10** | **6.8/10 observé** |
| GEO autorité / entité | ~5.5/10 | **6.8/10** | non recalculé sans validation des profils externes |
| **Global** | ~7/10 | **≈ 8.0/10 local** | **≈ 6.9/10 tant que le live reste ancien** |

Les notes locales sont supérieures à l’ancien audit lorsque le dépôt apporte une preuve nouvelle. La note production n’est pas artificiellement augmentée : les routes légales et notes qui manquent en ligne empêchent de valider un SEO/GEO production à 7.5 ou plus.

## Post-audit — données vérifiées

- 22 fiches projet présentes dans les quatre sources de données, dont les quatre études de cas principales.
- 3 pages services, 8 pages Dev Notes autonomes et 60 notes sources réparties sur 5 catégories.
- Sitemap local : 36 URLs, dont 22 projets, 3 services et 8 notes. Sitemap public lu : 28 URLs, sans les 8 notes.
- llms.txt local : identité, services, 22 projets et 8 notes. La copie publique lue ne contient pas les nouvelles notes.
- robots.txt local et public : accès général et OAI-SearchBot autorisés, sitemap déclaré.
- Métadonnées locales : canonical, Open Graph PNG 1200x630, Twitter, ProfilePage, Person, ProfessionalService, CreativeWork, BreadcrumbList et TechArticle selon les routes.
- Headers publics observés : CSP, HSTS, nosniff, X-Frame-Options, Referrer-Policy et Permissions-Policy.
- Lighthouse local home/freelance : SEO 100, accessibilité 100, bonnes pratiques 100 ; performance 51/54.
- npm audit complet : 0 vulnérabilité sur 692 dépendances.

## Ce qui est terminé et retiré de la liste d’actions

- Refonte des quatre études de cas clés et de leurs fiches détaillées.
- Cartes projets : stacks lisibles en texte séparé, boutons organisés, code affiché quand disponible, liens démo conservés.
- Six blocs de compétences et responsive desktop/mobile.
- Navigation de retour des Dev Notes, catégories Culture & Méthodes, CI/CD & DevOps, Outils & Productivité, Architecture & Bonnes pratiques et Gestion de projet & Freelance.
- Huit pages Dev Notes indexables avec canonical, TechArticle, sitemap et llms.txt ; les 60 articles restent accessibles par catégorie.
- Rendu des blocs code en pre/code et conversion des graphes Mermaid en SVG strictement sanitizé.
- Pages projets, services, legal, 404, manifest, favicon, robots.txt, sitemap, llms.txt et image Open Graph PNG dans le build local.
- Variante Contact dédiée à la page freelance et métadonnées par route.
- Images projet renommées, variantes WebP et srcset vérifiés.

## Actions restantes

### P0 — remettre la production au niveau du dépôt

Publier le build actuel avec deploy/Caddyfile.example, puis vérifier depuis le domaine public :

- /, /freelance, /mentions-legales : 200, title, description, canonical et OG cohérents ;
- une URL projet, une URL service et les 8 URLs notes : 200 et contenu dédié ;
- URL avec slash final : redirection 301 vers la forme canonique ;
- route inconnue : page 404 visible avec statut HTTP 404 ;
- sitemap à 36 URLs et llms.txt contenant les 8 notes.

Cette étape exige un accès de déploiement et un readback VPS ; elle n’a pas été exécutée par l’audit.

### P1 — corriger le HTML SEO initial

Le prerender capture l’animation de frappe avant sa fin. Garder le nom, le métier et la phrase de soutien complets dans le HTML initial, puis animer uniquement une présentation déjà présente ou supprimer l’animation.

Critère : npm run verify:build passe sans exception H1/H2 et le HTML de dist/index.html contient le texte complet.

### P1 — stabiliser l’alignement des cartes projets

La suite E2E observe un écart de 82 px entre les zones data-project-tech. Fixer la zone technologies en bas du contenu de carte ou normaliser la hauteur réelle des descriptions sans couper le texte.

Critère : npm run test:e2e passe à 15/15 et les stacks restent lisibles à 375 px, 768 px et desktop.

### P1 — décider l’architecture multilingue

Le sélecteur de langue change localStorage sur la même URL. Google recommande des URLs différentes pour des versions linguistiques distinctes et des alternates réciproques : https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites.

Choix à faire :

- créer des routes /en/ pré-rendues, avec canonical et hreflang fr/en/x-default cohérents ; ou
- assumer un site FR indexable et retirer les signaux EN qui pointent vers la même URL.

### P1 — valider les preuves et l’identité externe

Confirmer le périmètre des 7+ ans, des 30+ projets et toute statistique de répartition d’activité. Le dépôt recense actuellement 22 fiches projet. Vérifier la cohérence avec LinkedIn, CV et autres profils, puis confirmer la provenance et le droit d’utilisation des témoignages.

Critère : chaque métrique publiée possède une définition et une source propriétaire ; sinon elle est reformulée sans chiffre.

### P2 — réduire la densité décorative du hero

Après les corrections SEO et E2E, réévaluer typing, shimmer/gradient, grille, glow, pills et trois CTA. Conserver la proposition de valeur, le contraste et les CTA, mais réduire les éléments qui se concurrencent.

Critère : même contenu et mêmes parcours, avec une hiérarchie plus immédiate et prefers-reduced-motion respecté.

### P2 — stratégie éditoriale Dev Notes

Les 60 articles sont accessibles par thème mais seuls 8 ont une URL autonome. Ajouter d’autres pages indexables uniquement pour les articles réellement distinctifs, avec contenu relu, date et maillage vers projets ; ne pas créer des URLs pour gonfler le sitemap.

## Références SEO/GEO à jour

- Google — versions multilingues et hreflang : https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- Google — sitemaps : https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Google — données structurées : https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- OpenAI — accès de OAI-SearchBot : https://help.openai.com/fr-fr/articles/12627856-publishers-and-developers-faq

## Preuves détaillées

Le détail des 94 contrôles anti-vibecode, les commandes et les limites se trouve dans anti-vibecode-audit.md.

## Validation finale de cet audit

- Lint : PASS.
- Typecheck : PASS.
- Tests unitaires : PASS (6/6).
- Axe : PASS (4/4).
- E2E : 14/15 PASS ; alignement stacks à corriger.
- Build : PASS.
- Verify build : FAIL sur le H1/H2 animé.
- Traductions : PASS (60/60).
- Assets : PASS (142 WebP).
- Lighthouse local : SEO/accessibilité/bonnes pratiques 100 ; performance 51/54.
- npm audit : PASS, 0 vulnérabilité.
- Production HTTP : headers PASS, routes et sitemap obsolètes.

Les modifications de code préexistantes dans le worktree ont été conservées ; aucun commit, push, déploiement ou mutation externe n’a été effectué.
