# Audit complet du portfolio Bastien Lopez

Date de l’audit : 14 septembre 2026  
Périmètre : dépôt local C:\Users\UTILISATEUR\Documents\GitHub\Portfolio et production https://bastienlopez.fr/.  
Nature : audit et planification uniquement. Aucun composant, style, texte, dépendance, asset ou configuration applicative n’a été modifié. Les seuls livrables autorisés sont ce fichier et plan-action.md.

## Résumé exécutif

La base est exploitable et la production fraîche observée correspond au checkout actuel : 22 fiches projets, des pages d’études de cas et de services, un contact réel, des métadonnées, des images optimisées, une sanitation HTML et une couverture E2E utile. Les contrôles de lint, types, build, traductions, assets, tests unitaires, Playwright et audit npm passent.

Six bloqueurs de lancement ou de confiance doivent cependant être traités avant une refonte visuelle :

1. /mentions-legales sans slash renvoie 200 avec le titre et le corps de la homepage au lieu de la page légale.
2. Une URL inconnue renvoie 404 mais le corps HTML est celui de la homepage, sans message NotFound.
3. Le prerender initial de la homepage omet #skills, #devnotes et #contact ; une partie importante du contenu et du contact dépend donc du JavaScript et du scroll.
4. Les chiffres publics (7+, 30+, 10+, 90 %, +60 %, +15 %, 5/4/8) et les témoignages n’ont pas de preuve, date, méthode, provenance ou consentement dans le dépôt.
5. La page légale contient des affirmations de responsable, hébergeur et mesure d’audience qui exigent une validation du propriétaire et, si nécessaire, un avis juridique.
6. La hiérarchie visuelle accumule hero centré, grille décorative, dégradés, glow, shimmer, pastilles, cartes imbriquées et CTA concurrents ; cela réduit la singularité et la lisibilité malgré une palette cohérente.

### Comptage et scores

- 24 constats distincts : 0 CRITICAL, 6 HIGH, 9 MEDIUM, 9 LOW.
- Contrôles anti-vibecode : voir la matrice complète des 94 IDs plus bas. Répartition : 47 PASS, 16 FAIL, 6 JUSTIFIED, 19 N/A, 6 UNKNOWN. Score indicatif **76,8/100**, calculé avec la formule 100 × (PASS + JUSTIFIED) / (94 − N/A − UNKNOWN). Un FAIL objectif pèse comme un FAIL esthétique ; le score ne remplace pas la priorité des bloqueurs.
- Design Taste : 56/100, estimation d’audit (hiérarchie 12/20, typographie 12/15, palette 10/15, composition 8/15, densité 5/10, responsive 7/10, motion 3/5, accessibilité visuelle 5/10). La note mesure le besoin de refonte, pas la conformité fonctionnelle.

## Méthode, preuves et limites

Les preuves sont classées ainsi :

- CONFIRMÉ : observation reproductible dans le checkout ou par requête HTTP passive du 14/09/2026.
- PROBABLE/POTENTIEL : signal statique ou risque qui demande une reproduction dédiée.
- INCONNU : information propriétaire, juridique, consentement, historique ou environnement non accessible.
- JUSTIFIÉ : choix commun mais cohérent avec une intention identifiable.
- N/D : contrôle non applicable au produit ou non mesurable dans le périmètre.

Outils utilisés : Codebase Memory pour l’architecture et les dépendances, lecture ciblée des composants/pages/data/configuration, Node/npm, npm run lint, npm run typecheck, npm test -- --run, npm run build, npm run verify:build, npm run verify:performance-assets, npm run verify:translations, Playwright ciblé (14 tests), npm audit --omit=dev --audit-level=high --json, node scripts/check-critical-links.mjs, CUA In-app Browser et curl/Node en lecture seule.

Limites explicites : le contrôle CUA ne permettait pas de piloter directement plusieurs viewports ; les viewports 320/375/768/1280/1920 ont été couverts par Playwright local. Lighthouse n’a pas été lancé car son script écrit un artefact et le périmètre de sortie était limité à ces deux documents. Les scripts Python anti-vibecode et sécurité n’ont pas été lancés : runtime Python absent (TOOL_MISSING) et ils écrivent des artefacts .security-audit/. Les preuves légales, témoignages, chiffres et consentements ne sont pas disponibles dans le dépôt.

## Périmètre du dépôt et architecture

L’inventaire ciblé compte 276 fichiers hors node_modules, dist, build, coverage et caches. La cartographie Codebase Memory du projet compte 353 nœuds et 518 arêtes. Les zones examinées couvrent App/Router, pages, composants de navigation/hero/projets/services/contact, i18n et métadonnées, data projets/articles/témoignages, CSS/Tailwind/Vite, scripts de build/deploy/validation, public SEO/assets, tests unitaires/E2E, CI et Caddy. Les 22 projets et 60 articles bilingues ont été comptés sans modification.

## Constats détaillés

Chaque constat comporte une sévérité, un statut de preuve, une confiance, une localisation, l’impact, une recommandation et le lien avec la refonte. Les recommandations sont planifiées dans plan-action.md.

### Bloqueurs HIGH

**F-ROUTE-001 — HIGH — CONFIRMÉ, confiance haute — route légale sans slash.**  
Localisation : production GET /mentions-legales, deploy/Caddyfile.example, src/App.tsx, src/pages/Legal.tsx.  
Preuve : le 14/09/2026 https://bastienlopez.fr/mentions-legales répond 200, titre homepage et corps de 83 547 octets ; /mentions-legales/ répond 200 avec le titre légal et le contenu attendu.  
Impact : confusion utilisateur, signal légal incorrect et risque de duplication SEO.  
Recommandation : décider une politique slash unique, faire rediriger ou servir explicitement la route légale, puis effectuer un readback HTTP public. Refonte : oui, fondation technique avant toute refonte visuelle. Contrôles : L01, L03, L15, L16.

**F-ROUTE-002 — HIGH — CONFIRMÉ, confiance haute — corps 404 incorrect.**  
Localisation : production GET /__audit_unknown__, src/App.tsx, src/pages/NotFound.tsx, deploy/Caddyfile.example, dist/404.html.  
Preuve : réponse HTTP 404, mais corps et titre de homepage, sans marqueur « Page introuvable ». La page locale NotFound existe mais n’est pas le corps livré par le fallback observé.  
Impact : les visiteurs et robots reçoivent un document trompeur ; la récupération d’erreur et l’indexation sont fragilisées.  
Recommandation : garantir un document 404 réellement distinct, tester route inconnue avec et sans slash et vérifier le contenu après déploiement. Refonte : non, correction de livraison prioritaire. Contrôles : P05, L01, L03.

**F-SEO-001 — HIGH — CONFIRMÉ, confiance haute — contenu bas de page absent du prerender.**  
Localisation : src/components/DeferredSection.tsx, src/pages/Index.tsx, dist/index.html, HTML live /.  
Preuve : l’HTML initial contient hero, about, projects, mais pas skills, devnotes ni contact ; ces sections apparaissent après JavaScript et intersection/scroll.  
Impact : contenu métier et contact moins accessibles sans JS, indexabilité et partage affaiblis, risque de vide/CLS lors du chargement.  
Recommandation : prerender les contenus essentiels, ou fournir un fallback HTML visible et mesuré ; conserver le lazy loading pour les blocs réellement secondaires. Refonte : oui, structure SEO/performance. Contrôles : P06, P07, L02, L04, D17.

**F-TRUST-001 — HIGH — INCONNU, confiance haute sur l’absence de preuve — chiffres non sourcés.**  
Localisation : src/components/Hero.tsx (7+, 30+), src/components/About.tsx (7+, 30+, 10+), src/components/Freelance.tsx (90 %), src/data/projects/freelance.ts (5/4/8), src/data/projects/freelance.ts et src/data/projects/englishDetails.ts (+60 %, +15 %).  
Preuve : les valeurs sont visibles dans le contenu public mais aucune source, date, méthode ou pièce justificative n’est attachée aux champs.  
Impact : risque de preuve publicitaire non vérifiable et perte de confiance.  
Recommandation : faire valider chaque valeur par le propriétaire, ajouter une note de méthode/date lorsque publiable, sinon reformuler en qualitatif ou retirer. Refonte : oui, contenu et modèle de preuve. Contrôles : P14, P15, W06.

**F-TRUST-002 — HIGH — INCONNU, confiance moyenne — témoignages non traçables.**  
Localisation : src/components/Testimonials.tsx, src/data/testimonials.ts.  
Preuve : trois témoignages sont sélectionnés parmi cinq avec nom/rôle/quote/avatar et liens projet, mais le type de donnée ne porte ni source, ni date, ni consentement, ni statut d’anonymisation ; les avatars ont alt vide.  
Impact : impossibilité d’établir l’authenticité et le droit de publication à partir du dépôt.  
Recommandation : obtenir consentement et source documentée, ou rendre les témoignages explicitement anonymisés et validés ; retirer tout élément non prouvable. Refonte : oui, confiance éditoriale. Contrôles : P04, P15, L09.

**F-LEGAL-001 — HIGH — INCONNU, confiance moyenne — mentions légales à valider.**  
Localisation : src/pages/Legal.tsx, index.html JSON-LD ProfessionalService, public/robots.txt, public/sitemap.xml.  
Preuve : la page affirme identité, activité, Reims, email, hébergement OVH et mesure Search Console ; les informations d’immatriculation sont annoncées comme présentes sur devis/facture, sans validation externe disponible.  
Impact : risque de non-conformité et d’incohérence entre contenu légal, schema et collecte réelle.  
Recommandation : validation propriétaire/juridique, vérification de l’hébergeur et de la mesure réellement activée ; compléter ou limiter les affirmations. Refonte : oui, avant publication. Contrôles : L15, L16, L17, L18.

### Constats MEDIUM

**F-SEO-002 — MEDIUM — CONFIRMÉ, confiance haute — politique slash/canonicals incohérente.**  
Localisation : src/lib/i18n.tsx, public/sitemap.xml, dist/*/index.html, production.  
Preuve : les pages imbriquées sans slash répondent 308 vers la variante slash, alors que sitemap et canonical utilisent la variante sans slash.  
Impact : signaux de duplication et maintenance de routes moins prévisible.  
Recommandation : choisir slash ou non-slash, aligner Caddy, prerender, sitemap, canonical, OG URL et tests.

**F-SEO-003 — MEDIUM — CONFIRMÉ, confiance haute — langue non adressable.**  
Localisation : src/lib/i18n.tsx, index.html, LanguageSelector dans src/components/Navbar.tsx.  
Preuve : le choix fr/en est stocké en localStorage sur une URL unique ; les balises hreflang fr/en/x-default pointent la même URL et la langue html change côté client.  
Impact : les robots et partages ne disposent pas de variantes linguistiques stables.  
Recommandation : décider entre pages localisées stables ou assumer une seule langue indexable ; aligner hreflang, canonical, sitemap et métadonnées.

**F-CONTENT-001 — MEDIUM — INCONNU, confiance haute — bibliothèque d’articles à éditer.**  
Localisation : src/data/articles/ (60 articles FR/EN), notamment freelance.ts lignes 77–94, 1273–1302, 1545–1564, 1643–1662, 1707–1739, 1779–1790.  
Preuve : 27 tokens de modèle ([Client], [Projet X], [Ton nom], etc.) sont présents dans les sources ; environ 420 emojis existent, même si le rendu retire les emojis décoratifs.  
Impact : risque de publier des modèles incomplets et une voix éditoriale générique.  
Recommandation : passer les articles par une revue éditoriale, séparer modèle interne et article public, bloquer le rendu de placeholders restants.

**F-CONTENT-002 — MEDIUM — INCONNU, confiance moyenne — étude Clé de Voûte à recaler.**  
Localisation : src/data/projects/freelance.ts (detailedContent Clé de Voûte), src/data/projects/englishDetails.ts, src/components/Contact.tsx.  
Preuve : le détail historique mentionne un formulaire de contact et GitHub Pages ; l’application actuelle expose un contact mailto/LinkedIn sans formulaire. Le demo GitHub Pages répond 200, mais la date et le périmètre de la description ne sont pas indiqués.  
Impact : incohérence possible entre étude de cas et expérience actuelle.  
Recommandation : faire confirmer période, fonctionnalités réellement livrées et métriques ; distinguer le projet démontré du portfolio courant.

**F-TECH-001 — MEDIUM — CONFIRMÉ, confiance haute — liens internes exclus du check CI.**  
Localisation : scripts/check-critical-links.mjs (liste firstPartyHosts), .github/workflows/ci.yml job links.  
Preuve : le script exclut bastienlopez.fr et www.bastienlopez.fr ; la CI ne fait donc pas de readback des routes de production. Les deux bugs de routes ci-dessus échappent à ce contrôle.  
Impact : couverture de livraison incomplète.  
Recommandation : ajouter un smoke check HTTP premier parti séparé, avec attentes de statut, title, canonical et marqueur 404.

**F-PERF-001 — MEDIUM — CONFIRMÉ, confiance haute — chargement différé sans stratégie de contenu critique.**  
Localisation : src/components/DeferredSection.tsx, src/pages/Index.tsx.  
Preuve : min-h-[24rem], rootMargin 320 px et rendu enfant uniquement après intersection ; les sections non initiales sont absentes du HTML statique.  
Impact : espace vide, déplacement de mise en page et contact tardif sur réseau lent/no-JS.  
Recommandation : mesurer CLS/LCP, réserver des placeholders proportionnés au contenu et inclure au prerender les blocs critiques.

**F-DESIGN-001 — MEDIUM — CONFIRMÉ, confiance haute — motif hero générique répété.**  
Localisation : src/components/Hero.tsx, src/components/Freelance.tsx, src/index.css.  
Preuve : composition centrée avec nom très grand, texte en dégradé, grille 50 px, glow et CTA ; un hero équivalent est répété sur la page freelance.  
Impact : message moins distinctif et hiérarchie concurrente.  
Recommandation : recentrer la hiérarchie sur la proposition et une action primaire, réduire les ornements au rôle de marque et différencier les pages.

**F-DESIGN-003 — MEDIUM — CONFIRMÉ, confiance haute — densité de cartes et pastilles.**  
Localisation : Hero.tsx, About.tsx, Skills.tsx, Projects.tsx, Service.tsx, Contact.tsx, ProjectDetail.tsx.  
Preuve : badges arrondis, quatre contrôles d’études, cartes imbriquées, quatre catégories, grille de projets, pastilles technologies et blocs Contact/Service reprennent la même enveloppe.  
Impact : chaque information paraît équivalente et la lecture des preuves est ralentie.  
Recommandation : réserver les cartes aux unités autonomes, utiliser prose/listes pour les informations secondaires et établir une échelle de rayons.

**F-OPS-001 — MEDIUM — INCONNU, confiance basse — variance de version/cache observée.**  
Localisation : production CUA (siteTab ancien) et nouvelle tab/curl du 14/09/2026.  
Preuve : une tab déjà ouverte affichait une ancienne copie (autres chiffres, emojis, débordement), tandis qu’une nouvelle tab et curl affichaient le checkout actuel sans débordement à 1280 px.  
Impact : un cache/proxy ou artefact de déploiement peut masquer une version obsolète.  
Recommandation : vérifier headers cache, hash d’assets, purge et readback depuis une session vierge après chaque déploiement.

### Constats LOW

**F-SEO-004 — LOW — CONFIRMÉ, confiance haute — image sociale unique.**  
Localisation : index.html, src/lib/i18n.tsx, public/og-image.svg.  
Preuve : title/description/URL changent par route, mais og:image et twitter:image restent l’image SVG racine.  
Recommandation : produire une image sociale raster ou une variante par page importante, puis vérifier les aperçus.

**F-TECH-002 — LOW — CONFIRMÉ, confiance haute — pas de baseline visuelle.**  
Localisation : playwright.config.ts, tests/e2e/.  
Preuve : screenshots Playwright uniquement en cas d’échec ; aucun snapshot visuel ni audit Lighthouse local exécuté dans ce périmètre.  
Recommandation : ajouter quelques snapshots ciblés et une mesure Lighthouse budgetée dans la CI.

**F-PERF-002 — LOW — CONFIRMÉ, confiance haute — dimensions absentes sur avatars.**  
Localisation : src/components/Testimonials.tsx, dist/freelance/index.html.  
Preuve : trois images d’avatars dans le HTML généré n’ont pas de width/height ; les visuels de projets principaux, eux, sont dimensionnés et optimisés.  
Recommandation : ajouter les dimensions intrinsèques et vérifier le CLS.

**F-PERF-003 — LOW — POTENTIEL, confiance moyenne — poids des originaux.**  
Localisation : public/ (environ 39,63 MiB ; exemples berserk.png 3,41 MiB, Altme_Discover.png 2,90 MiB, LuxuryAutoDetailling.png 2,65 MiB).  
Preuve : public/img_optimized contient 135 WebP pour environ 8,46 MiB et le check d’assets passe ; les originaux restent distribuables selon les usages.  
Recommandation : confirmer les chemins réellement servis, interdire les gros originaux dans le rendu public et conserver les sources si elles sont nécessaires à l’édition.

**F-SEC-001 — LOW — CONFIRMÉ, confiance haute — CSP avec inline.**  
Localisation : deploy/Caddyfile.example, headers live.  
Preuve : CSP présente mais script-src unsafe-inline et style-src unsafe-inline. Aucun secret client détecté et npm audit ne trouve aucune vulnérabilité de production.  
Recommandation : tester une CSP nonce/hash si compatible avec le prerender ; sinon documenter l’exception et conserver les autres directives.

**F-DEP-001 — LOW — POTENTIEL, confiance moyenne — dépendances probablement inutilisées.**  
Localisation : package.json, package-lock.json, composants shadcn non importés.  
Preuve : 50 dépendances de production déclarées, environ 14 directement importées par le code applicatif ; le chunk radix-vendor pèse environ 188,58 kB. Ce signal ne prouve pas qu’une dépendance est supprimable.  
Recommandation : dresser une liste d’usage, supprimer seulement après vérification des imports générés et tests, puis régénérer le lockfile.

**F-DESIGN-002 — LOW — CONFIRMÉ, confiance haute — motion décorative.**  
Localisation : Hero.tsx shimmer en boucle et ChevronDown animé, src/index.css animations.  
Preuve : le headline colore en continu et la flèche rebondit ; prefers-reduced-motion est pris en compte mais ne retire pas la fonction de guidage textuelle.  
Recommandation : garder une animation courte et informative, supprimer le rebond permanent et vérifier le mode réduit.

**F-DESIGN-004 — LOW — INCONNU, confiance moyenne — stack et copy larges.**  
Localisation : src/components/Skills.tsx, src/data/site-pages.ts, textes Hero/About.  
Preuve : six familles listent de nombreuses technologies sans niveau, projet associé ou preuve visible ; plusieurs formulations sont génériques.  
Recommandation : relier chaque compétence à une réalisation ou à un niveau assumé et raccourcir les promesses non différenciantes.

**F-A11Y-001 — LOW — POTENTIEL, confiance basse — menus custom.**  
Localisation : src/components/Navbar.tsx, sélecteur de langue et menu mobile.  
Preuve : clavier et axe serious/critical passent ; le code ne montre pas de fermeture documentée au clic extérieur, de focus trap mobile ou d’Escape homogène.  
Recommandation : tester ces parcours manuellement avec lecteur d’écran et compléter seulement si une régression est reproduite.

## # AI-SLOP MAP

Carte des signaux concrets, sans assimiler automatiquement un motif à une faute :

| Zone | Signal observé | IDs concernés | Décision d’audit |
|---|---|---|---|
| Hero homepage | nom centré très grand, texte gradient, grille, glow, trois pastilles et trois CTA | P02, P10, P17, D01, D18, D19, D21, D23 | P10/D18/D19/D21/D23 signalés ; P17 PASS car la proposition décrit le métier et les livrables |
| Hero freelance | même fond gradient/grille et même langage de promesse | D18, D19, P20 | Réduire la répétition et différencier l’intention de page |
| Cartes | cartes About/Skills/Service/Contact/Projects imbriquées, rayons proches | D06, D12, D15 | FAIL lorsque la carte n’ajoute pas de frontière sémantique |
| Pastilles | trois badges de réassurance et nombreuses technologies en pastilles | D15, D23 | À conserver seulement pour statut/technologie ; éviter d’en faire le langage universel |
| Copy | 60 articles, 27 placeholders, formulations template | W04, W07, W09, P20 | Revue éditoriale requise ; les placeholders sont un risque concret |
| Emoji | environ 420 occurrences dans les sources, retrait des emojis décoratifs au rendu | W03, P16 | Visible UI actuelle : PASS/JUSTIFIED ; source éditoriale à nettoyer |
| Preuves | chiffres et témoignages sans provenance exposée | P04, P14, P15 | Bloqueur de confiance jusqu’à validation propriétaire |
| Logo | wordmark texte simple, pas de badge de générateur | P08, P19 | JUSTIFIED/PASS tant qu’il est assumé comme wordmark |

## Système de design actuellement observé

- Fond et surfaces : thème sombre HSL, fond autour de 220 25% 8%, cartes autour de 220 20% 12%, sections alternant #0F1319 et #14191F.
- Accents : cyan primaire (188 94% 43%), vert/émeraude (160 84% 39%), orange CTA (25 95% 53%), texte clair et bordures translucides.
- Typographie : hiérarchie forte dans les titres, paragraphes courts, texte courant lisible ; le hero domine parfois la proposition.
- Formes : rounded-md à rounded-full très fréquent ; l’échelle de rayons n’est pas assez différenciée.
- Mise en page : container centré Tailwind, grilles 1/2/3, catégories grid-cols-2 lg:grid-cols-4, sections lazy avec min-h 24rem.
- Images : variantes WebP et srcset pour les projets ; avatars sans dimensions intrinsèques.
- Motion : shimmer, fade/float/glow, flèche rebondissante, avec règles globales prefers-reduced-motion.
- Responsive : tests fonctionnels locaux à 320, 375, 768, 1280 et 1920 ; aucun débordement détecté dans la suite actuelle. Le viewport CUA direct était limité.

## UX, conversion et architecture

Le hero expose trois actions de poids proche. La recommandation est de faire ressortir une action de preuve (« Voir mes projets ») et une action de contact, puis de séparer clairement les parcours recrutement et mission après les preuves. Le contact actuel est fiable car il utilise mailto, LinkedIn et GitHub, mais la page répète plusieurs fois les mêmes destinations.

L’architecture contient des routes de détail utiles (/projets/:slug, /services/:slug, /freelance, /mentions-legales) et des breadcrumbs/schema JSON-LD contextualisées. La homepage reste néanmoins une longue pile de sections ; la valeur SEO des études de cas et services doit être assumée par leurs URLs stables et leur HTML initial.

## Contenu, projets et études de cas

Les 22 enregistrements projet sont conservés dans src/data/projects/index.ts avec leurs champs id, title, description, category, image, tech, liens, detailedContent et galeries. Les études de cas structurent contexte, besoin, solution, rôle et gains. La vérification de traductions couvre 60 articles FR/EN.

Les résultats chiffrés et les témoignages demandent une preuve propriétaire. Les textes Clé de Voûte et les modèles d’articles demandent une validation éditoriale séparée afin de ne pas mélanger historique de mission, modèle de communication et contenu publié.

## Accessibilité

Points positifs : skip link, focus-visible, boutons et liens labellisés, details natif pour FAQ, dialogue galerie avec aria-modal, navigation clavier testée, axe sans impact serious/critical sur les parcours couverts, et réduction des animations.

À vérifier : fermeture au clic extérieur/Escape du menu de langue, focus trap et retour de focus du menu mobile, focus trap explicite de la galerie, contraste de tous les textes secondaires et annonce des états de chargement. Aucun défaut critique n’a été affirmé sans reproduction.

## Responsive et performance

La suite Playwright couvre les largeurs 320, 375, 768, 1280 et 1920 sans overflow. Les assets optimisés et le srcset des projets sont un bon socle. Les risques restants sont le contenu différé absent du HTML, les dimensions d’avatars et le poids résiduel des originaux. Lighthouse et mesure CLS/LCP en production restent à faire.

## SEO, GEO et partage

Le site possède title, description, canonical, robots, sitemap, manifest, JSON-LD et routes de détail. Les problèmes observés sont la route légale sans slash, le corps 404 homepage, la politique slash incohérente, les hreflang fr/en sur une URL unique, l’image sociale identique et le contenu critique non prerenderé. Aucun llms.txt n’est nécessaire pour cette étape ; la priorité est le HTML public, les routes et les preuves citables.

## Sécurité et confidentialité

Les headers live/Caddy couvrent CSP, X-Frame-Options, nosniff, HSTS, referrer et permissions ; HTTPS répond ; aucune vulnérabilité de production n’est remontée par npm audit. Le produit n’expose pas de formulaire ou d’API authentifiée dans le navigateur, ce qui rend plusieurs contrôles serveur N/D. La CSP unsafe-inline, l’absence de scan Python et l’absence de vérification historique dédiée sont des limites documentées, pas des preuves de compromission.

## Code, dépendances et exploitation

TypeScript strict, ESLint, alias Vite, chunks manuels et scripts de vérification forment une base maintenable. Les dépendances potentiellement inutilisées ne doivent être retirées qu’après graphe d’import et build. La CI vérifie qualité, tests, liens externes, audit npm et Lighthouse en workflow, mais ne lit pas les routes first-party en production et ne conserve pas de baseline visuelle.

## Vérifications exécutées

| Vérification | Résultat |
|---|---|
| npm run lint | PASS |
| npm run typecheck | PASS |
| npm test -- --run | PASS — 1 fichier, 4 tests |
| npm run build | PASS — prerender root, freelance, légal, 22 projets, 3 services, 404 |
| npm run verify:build | PASS |
| npm run verify:performance-assets | PASS — 135 WebP référencés |
| npm run verify:translations | PASS — 60/60 |
| Playwright accessibilité + portfolio | PASS — 14 tests, axe serious/critical et viewports couverts |
| npm audit --omit=dev --audit-level=high --json | PASS — 0 vulnérabilité de production |
| node scripts/check-critical-links.mjs | 29 OK, 1 UNKNOWN externe, 0 échec ; les hôtes first-party sont exclus |
| npm run audit:lighthouse | NON LANCÉ — script écrit un artefact hors périmètre |
| scanners Python anti-vibecode/sécurité | NON LANCÉS — TOOL_MISSING et artefacts hors périmètre |

## # CE QU'IL FAUT CONSERVER

- Les 22 fiches projets, leurs images, liens, technologies, contenus détaillés et galeries.
- Les routes d’études de cas et de services, les breadcrumbs et les données JSON-LD contextualisées.
- Le contact réel mailto/LinkedIn/GitHub et le CV.
- La sanitation DOMPurify et l’échappement HTML pour les articles et contenus projet.
- Les variantes WebP, srcset, dimensions des visuels de projets et le check de performance des assets.
- Le skip link, les styles focus-visible, les labels ARIA, details FAQ et la prise en compte de prefers-reduced-motion.
- TypeScript strict, lint, build prerender, vérification des traductions et couverture Playwright actuelle.
- Les headers Caddy/production, HTTPS, permissions CI en lecture et audit npm sans vulnérabilité de production.
- La palette sombre cyan/émeraude et le ton professionnel, à hiérarchiser plutôt qu’à remplacer sans preuve.

## Matrice des 94 contrôles

Statuts autorisés : PASS, FAIL, JUSTIFIED, N/A, UNKNOWN. Les contrôles UNKNOWN ne sont pas comptés comme des passes ; ils exigent une preuve ou une décision. Les notes ci-dessous renvoient aux constats détaillés.

### Writing and copy — W01 à W10

| ID | Statut | Preuve courte |
|---|---|---|
| W01 | PASS | Pas de dépendance répétée au tiret cadratin dans le copy observé. |
| W02 | PASS | Pas de formule contrastive répétée comme squelette de page. |
| W03 | JUSTIFIED | Les emojis source sont retirés du rendu décoratif ; revue éditoriale F-CONTENT-001. |
| W04 | PASS | Paragraphes et listes restent lisibles, sans emphase sur chaque ligne. |
| W05 | JUSTIFIED | Les groupes de trois du hero correspondent à trois actions/garanties distinctes. |
| W06 | PASS | Peu de hedging automatique ; les inconnues sont traitées dans cet audit. |
| W07 | PASS | Pas de rythme manifestement uniforme sur les pages principales. |
| W08 | PASS | Les sections livrent une proposition avant les explications. |
| W09 | PASS | Aucun filler critique du type explore dans les écrans observés. |
| W10 | PASS | Typographie professionnelle cohérente avec le site. |

### Immediate generated-site signals — P01 à P20

| ID | Statut | Preuve courte |
|---|---|---|
| P01 | PASS | Domaine personnalisé bastienlopez.fr. |
| P02 | PASS | Palette cyan/émeraude ; pas de gradient violet-bleu par défaut. |
| P03 | PASS | Visuels projet réels/identifiables ; aucun artefact synthétique confirmé. |
| P04 | UNKNOWN | Témoignages sans source/consentement dans le dépôt — F-TRUST-002. |
| P05 | PASS | CTA, liens projet, CV et contact ont des destinations ou comportements. |
| P06 | JUSTIFIED | Chargement différé limité aux sections coûteuses, avec état aria-busy. |
| P07 | FAIL | Homepage longue et empilement de sections malgré des intentions distinctes. |
| P08 | JUSTIFIED | Wordmark texte assumé, sans prétention à un logo illustré. |
| P09 | PASS | Favicon, manifest et icônes présents. |
| P10 | FAIL | Shimmer en boucle sur le headline principal. |
| P11 | N/A | Pas de page privacy autonome ; contenu inclus dans Legal et validé via L15. |
| P12 | N/A | Aucun parcours de conditions générales distinct identifié. |
| P13 | PASS | Aucun compteur de visiteurs en direct. |
| P14 | FAIL | Chiffres d’expérience/projets et de résultats non sourcés — F-TRUST-001. |
| P15 | FAIL | Pourcentages et gains sans méthode/date/source publiées — F-TRUST-001. |
| P16 | PASS | Aucun emoji utilisé comme icône produit dans le rendu courant. |
| P17 | PASS | Hero décrit applications métier, APIs, IA et n8n. |
| P18 | PASS | Pas de police manuscrite décorative. |
| P19 | PASS | Aucun badge de générateur ou attribution résiduelle. |
| P20 | FAIL | Accumulation de templates/placeholders dans les articles — F-CONTENT-001. |

### Generic design defaults — D01 à D24

| ID | Statut | Preuve courte |
|---|---|---|
| D01 | JUSTIFIED | Gradients limités aux tokens de marque, mais à hiérarchiser. |
| D02 | PASS | Pas d’icônes flottantes gratuites dans les marges. |
| D03 | PASS | Canvas sombre intentionnel et tokenisé. |
| D04 | PASS | Palette sections cohérente, pas d’arc-en-ciel. |
| D05 | PASS | Ombres non appliquées à chaque objet. |
| D06 | FAIL | Rangées de trois cartes/bénéfices répétées sans hiérarchie suffisante. |
| D07 | FAIL | Blur/translucidité de navbar utilisé comme style récurrent. |
| D08 | UNKNOWN | Police et rationale de marque non documentées dans le dépôt. |
| D09 | PASS | Pas de bande pleine décorative sans fonction. |
| D10 | PASS | Pas de bento imposé par mode. |
| D11 | PASS | Pas de fausse fenêtre terminal décorative. |
| D12 | FAIL | Listes de bénéfices préfixées par check vert répétées. |
| D13 | N/A | Pas de grille tarifaire à trois niveaux. |
| D14 | UNKNOWN | Les projets montrent des visuels, mais les pages service n’exposent pas toujours une démonstration directe. |
| D15 | FAIL | Rayon arrondi quasi universel, de la pastille à la carte. |
| D16 | PASS | Pas de palette violet-noir AI SaaS. |
| D17 | PASS | États loading/error/retry présents pour les chargements asynchrones. |
| D18 | FAIL | Glow/background lumineux répété Hero/Freelance. |
| D19 | FAIL | Dot-grid décorative répétée dans les heroes. |
| D20 | PASS | Pas de sparkle universel pour les actions IA. |
| D21 | FAIL | Flèche de scroll rebondissante permanente. |
| D22 | PASS | Transformations hover réservées aux éléments interactifs observés. |
| D23 | FAIL | Accents néon sur fond sombre largement utilisés comme esthétique tech. |
| D24 | PASS | Pas de pastel indifférencié. |

### Launch readiness — L01 à L20

| ID | Statut | Preuve courte |
|---|---|---|
| L01 | FAIL | Route inconnue : statut 404 mais corps homepage — F-ROUTE-002. |
| L02 | PASS | CTA primaire visible dans le viewport initial. |
| L03 | FAIL | /mentions-legales sans slash réutilise le title homepage — F-ROUTE-001. |
| L04 | PASS | Pages slash prerenderées disposent de descriptions distinctes. |
| L05 | FAIL | OG/Twitter image identique à la racine — F-SEO-004. |
| L06 | PASS | Favicon, manifest et apple icon présents. |
| L07 | PASS | robots.txt existe et expose une politique index/follow. |
| L08 | PASS | Sitemap présent avec routes publiques. |
| L09 | PASS | Alt utiles sur projets ; avatars décoratifs explicitement vides. |
| L10 | PASS | Playwright couvre 320/375/768/1280/1920. |
| L11 | PASS | Actions principales accessibles sans sticky CTA imposé. |
| L12 | PASS | Loading/error/retry visibles pour les notes différées. |
| L13 | N/A | Aucun formulaire avec champs à valider dans le parcours courant. |
| L14 | N/A | Aucun envoi de formulaire ou transaction à confirmer. |
| L15 | UNKNOWN | Réalité de collecte, Search Console et mentions à confirmer — F-LEGAL-001. |
| L16 | UNKNOWN | Applicabilité et exactitude des conditions à confirmer — F-LEGAL-001. |
| L17 | N/A | Analytics client volontairement absent selon README/Legal ; juridiction à confirmer. |
| L18 | JUSTIFIED | Décision actuelle : pas de script analytics client ; Search Console doit être validé. |
| L19 | PASS | Email, LinkedIn et GitHub réels et joignables. |
| L20 | PASS | WebP/srcset et check de 135 assets optimisés. |

### Security and data protection — S01 à S20

| ID | Statut | Preuve courte |
|---|---|---|
| S01 | PASS | Aucun secret client détecté dans le code/env public inspecté. |
| S02 | UNKNOWN | Scan exhaustif de l’historique non exécuté dans ce périmètre. |
| S03 | PASS | Aucun credential admin/service côté navigateur. |
| S04 | N/A | Pas de base ou collection exposée par cette SPA statique. |
| S05 | N/A | Pas de stockage de données sensibles dans le produit audité. |
| S06 | N/A | Pas de route authentifiée. |
| S07 | N/A | Pas d’objet privé adressable par identifiant. |
| S08 | N/A | Pas d’API de mutation ou de champs privilégiés. |
| S09 | N/A | Pas de session cookie applicative observée. |
| S10 | N/A | Aucun mot de passe stocké. |
| S11 | N/A | Aucun login ou endpoint sensible. |
| S12 | N/A | Pas de formulaire public ; contact mailto. |
| S13 | N/A | Pas de requête SQL/DB dans le périmètre frontend. |
| S14 | N/A | Pas de frontière serveur d’entrée utilisateur dans cette livraison. |
| S15 | PASS | DOMPurify/échappement avant rendu HTML dynamique. |
| S16 | N/A | Aucun upload applicatif. |
| S17 | N/A | Pas de sérialiseur/API exposant des champs privés. |
| S18 | PASS | CSP, frame control, nosniff, referrer et permissions présents. |
| S19 | PASS | HTTPS live et HSTS observés. |
| S20 | PASS | npm audit : 0 vulnérabilité de production. |

## Décisions en attente

Les décisions qui bloquent une implémentation sûre sont : validation des chiffres et témoignages, validation juridique/mesure, politique slash, stratégie de langue indexable et niveau de contenu à prerender. Tant qu’elles ne sont pas tranchées, le plan prévoit des tâches de preuve et des formulations réversibles.
