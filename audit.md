# Audit complet — bastienlopez.fr

Date de l’audit : 2026-09-09, addendum design/refonte  
Périmètre : dépôt complet du portfolio, configuration, CI/CD, scripts de déploiement, assets publics, rendu local et site de production. Les dossiers générés ou vendoriés ont été exclus de la revue de code, mais leurs tailles et leur influence sur le build ont été mesurées. Aucun correctif de code n’a été appliqué pendant l’audit.

> **État vérifié le 13 septembre 2026 :** ce document conserve la photographie et les recommandations de la baseline du 9 septembre. Les résultats après corrections (prérendu des routes, compression Bloodborne, couverture anglaise 60/60, allègement visuel, claims et droits attestés par le propriétaire, tests et Lighthouse) sont tenus à jour dans [anti-vibecode-audit.md](anti-vibecode-audit.md). Les scores et blocages décrits ci-dessous ne doivent pas être lus comme l’état courant lorsqu’ils contredisent cet addendum.

Les niveaux de preuve utilisés sont :

- **STATIQUE** : lecture du dépôt et des configurations ;
- **BUILD** : commande exécutée sur le dépôt ;
- **RENDU** : DOM, arbre d’accessibilité, capture ou métriques du navigateur ;
- **LIVE** : requête sur https://bastienlopez.fr/ ;
- **PROBABLE** : risque établi par le code, mais qui demande une confirmation métier ou une reproduction supplémentaire.

## 1. Résumé exécutif

Le portfolio fonctionne techniquement, mais l’audit visuel approfondi confirme le diagnostic utilisateur : l’interface cumule les signaux d’un template généré par IA. Le problème n’est pas une couleur isolée. C’est l’empilement du hero centré sur grille sombre, du titre en gradient animé, des pills, des quatre CTA, des titres centrés avec soulignement, des cartes arrondies, des halos, des emojis et des animations répétées. Le même squelette est réutilisé dans presque chaque section, ce qui efface la personnalité des projets réels.

Le score global réévalué est de **56/100**, avec une pondération renforcée sur anti-vibecode-slop et design-taste-codex. Aucun P0 n’a été trouvé. Les deux P1 restent les liens de démonstration morts et les preuves commerciales non vérifiables. Les nouveaux P2 de refonte concernent l’accumulation de patterns AI-template, l’absence d’une hiérarchie éditoriale singulière, la cardification systématique, la surcharge du hero et la motion décorative.

La refonte doit donc être complète : architecture de page, art direction, typographie, palette, traitement des projets, preuves, motion et responsive peuvent changer. Le contenu projet doit être conservé, mais son affichage doit être recomposé autour de preuves et de récits de travail plutôt qu’autour de cartes et de badges.

Le dépôt passe lint, typecheck, build et la vérification d’artefacts. Il ne contient pas de tests automatisés dédiés, de contrôle Lighthouse réellement branché, de test de liens dans la CI ni de validation d’accessibilité automatisée. Le lockfile contient six vulnérabilités signalées par npm audit, dont trois de niveau high ; la portée exploitable doit être traitée avant une prochaine livraison.

## 2. Score global et scores par domaine

Le score global est une pondération de la qualité observable, de la robustesse, de l’accessibilité, de la sécurité et de la préparation au lancement. Il ne remplace pas les priorités P0–P3.

| Domaine | Score | Motif principal |
|---|---:|---|
| Interface et direction visuelle | 35/100 | Accumulation confirmée de patterns hero, gradients, pills, cartes et effets typiques des templates IA. |
| UX, conversion et navigation | 58/100 | CTA présents, mais proposition surchargée et preuves réelles trop éloignées du premier écran. |
| Responsive et mobile | 48/100 | Débordement horizontal confirmé en production et composition mobile non conçue comme une vue autonome. |
| Accessibilité | 60/100 | Fondations correctes ; hiérarchie, listbox et signaux de focus/affordance doivent être repensés avec la refonte. |
| Performance | 64/100 | Build sain, mais chunks importants, imports lazy chargés dès le premier rendu et PNG lourds. |
| SEO et GEO | 84/100 | Canonical, robots, sitemap, JSON-LD et llms.txt présents ; fallback inconnu renvoie HTTP 200. |
| Sécurité applicative | 76/100 | Aucun secret client identifié et DOMPurify utilisé ; CSP absente et dépendances vulnérables. |
| Données personnelles et vie privée | 62/100 | Contact explicite et pas de formulaire ; décision analytics/consentement non documentée. |
| Architecture et maintenabilité | 63/100 | Découpage par sections correct, mais Projects.tsx est un monolithe et les données bilingues sont dupliquées. |
| Qualité TypeScript/JavaScript | 61/100 | Typecheck vert, mais strict, noUnused et plusieurs garde-fous sont désactivés. |
| React et framework | 68/100 | Router, providers et code splitting en place ; absence d’Error Boundary et lazy loading non différé. |
| CSS et système de styles | 42/100 | Tokens cohérents mais utilisés pour répéter un langage néon, gradient, glow et carte sans assez de contraste structurel. |
| Tests et QA | 46/100 | Vérifications de build utiles, mais aucun test unitaire, E2E, axe, Lighthouse ou link check. |
| CI/CD et déploiement | 72/100 | CI reproductible et permissions minimales ; audit npm trop peu strict, actions non épinglées, déploiement non atomique. |

## 3. Stack et architecture détectées

- React 18.3.1, TypeScript 5.8.3, Vite 8.1.5, Tailwind CSS 3.4.17, React Router 7.18.2 et DOMPurify 3.4.12 déclaré dans package.json.
- Application SPA statique : BrowserRouter avec base Vite, une route racine et une route wildcard vers NotFound dans src/App.tsx:18-30.
- Sections chargées depuis src/pages/Index.tsx : About, Projects, Skills, Freelance, DevNotes et Contact. Les données de projets sont agrégées dans src/data/projects/index.ts depuis emploi, freelance, gaming et opensource.
- Pas de backend dans ce dépôt, pas de formulaire de contact persistant et pas d’authentification. Le contact passe par mailto, LinkedIn et GitHub.
- Rendu HTML de contenus éditoriaux traité par DOMPurify dans Projects.tsx et DevNotes.tsx.
- Déploiement VPS manuel via scripts/deploy-vps.ps1, avec Caddy et TLS gérés hors du dépôt selon README.md.
- Codebase Memory a servi à identifier le graphe et les composants, mais son index est partiellement périmé : il référence notamment public/404.html et .github/workflows/gh-pages.yml absents du checkout actuel. Les constats finaux viennent du dépôt et du runtime actuels.

## 4. Skills Codex et outils utilisés

| Skill ou outil | Usage dans cet audit | Résultat |
|---|---|---|
| anti-vibecode-slop | Revue complète des 94 contrôles, avec matrice W/P/D/L/S et lecture des règles de preuve/anti-template | Matrice exhaustive en section 26 ; accumulation AI-template reclassée en FAIL. |
| design-taste-codex | Brief/design system, anti-slop, visual craft, motion, interaction/accessibility et preflight | Rendus production/local capturés ; brief de refonte complet en sections 30 à 33. |
| web-security-audit | Préflight, npm audit, scan statique et DAST localhost | 6 vulnérabilités npm, CSP absente, autres headers production présents. |
| long-horizon-execution | Cadre de travail pour une tâche transversale | Utilisé comme méthode ; aucun fichier de checkpoint ajouté pour respecter le périmètre utilisateur. |
| codebase-memory-mcp | Architecture, composants, imports et impact | Index consulté puis recroisé avec les fichiers actuels. |

## 5. Ce qui est déjà bien fait

- Les tokens de couleur sont centralisés dans src/index.css, ce qui rend une refonte globale possible sans disperser les décisions.
- Le hero expose rapidement le métier, mais sa composition et sa proposition doivent être entièrement resserrées.
- Les fiches projet conservent descriptions, technologies, liens, contenu détaillé et galeries ; les 21 IDs projet analysés sont uniques.
- Les assets significatifs ont un alt utile ou un fallback dérivé du titre ; les images de cartes sont lazy.
- Les imports DOMPurify précèdent les deux usages de dangerouslySetInnerHTML.
- index.html contient title, description, canonical, hreflang, Open Graph, Twitter Cards, JSON-LD WebSite/WebPage/Person/ProfessionalService/FAQPage, manifest, robots et favicon.
- scripts/verify-build.mjs contrôle les artefacts SEO et les assets critiques.
- npm run lint, npm run typecheck, npm run build et npm run verify:build passent.
- Le workflow CI utilise npm ci, Node 22, un timeout, la concurrence annulée et permissions contents: read.
- Le rendu production est en HTTPS avec HSTS et plusieurs headers de sécurité utiles.
- La galerie projet possède une navigation clavier, Escape, verrouillage du scroll, aria-modal et restauration du focus.
- Les animations principales tiennent compte de prefers-reduced-motion et le ticker témoignages peut être arrêté au survol ou au focus.

## 6. P0 — Bloquants critiques

**Aucun P0 confirmé.**

Il n’y a pas de fuite de secret client identifiée, de panne globale de production, de perte de données ni de chemin d’administration exposé dans ce dépôt. Cette conclusion reste bornée aux surfaces présentes dans le checkout et aux contrôles exécutés.

## 7. P1 — Priorité haute

### P1-001 — Deux CTA de démonstration publics sont morts

- **Statut : CONFIRMÉ — LIVE.**
- **Preuve :** src/data/projects/gaming.ts:13 pointe vers https://bastienlopez.github.io/Aqualis/aquarium, HEAD et GET répondent 404 ; src/data/projects/emploi.ts:11 pointe vers https://www.talao.io/fr/, HEAD et GET répondent 404.
- **Impact :** un visiteur qui suit deux cas mis en avant arrive sur une erreur externe ; la promesse de portfolio et la conversion sont directement dégradées.
- **Correction attendue :** remplacer chaque URL par une démo réellement disponible, publier une page de retrait explicite ou retirer le CTA en conservant la fiche projet.

### P1-002 — Preuves commerciales et témoignages non vérifiables dans le dépôt

- **Statut initial : PROBABLE — confirmation métier nécessaire.**
- **Preuve initiale :** statistiques 5+, 30+, 10+ dans src/components/About.tsx:9 ; promesse « Sous 48h » et autres éléments de preuve dans src/components/Freelance.tsx:44-49 ; six témoignages, dont quatre nommés et deux anonymisés, dans src/data/testimonials.ts:14-57. Aucune source, date, lien client ou artefact de résultat n’était associé dans la baseline.
- **Statut final : VALIDÉ PAR LE PROPRIÉTAIRE — traité dans GOV-001 et HYB-001.** Les cinq témoignages conservés, le retrait du témoignage Aqualis déclaré fake, la reformulation `J. DM`, les périmètres des claims et les délais indicatifs sont consignés en section 34 et recontrôlés en section 39.
- **Impact résiduel :** la preuve est autorisée sur le fond ; sa présentation éditoriale et son contexte visuel restent à traiter dans la refonte. Aucun nouveau chiffre ou témoignage n’a été inventé.

## 8. P2 — Priorité moyenne

### P2-001 — Débordement horizontal confirmé en production

- **Statut : CONFIRMÉ — RENDU/LIVE.**
- **Preuve :** src/components/Testimonials.tsx:72 utilise w-screen left-1/2 -translate-x-1/2. À 1280 px, body.scrollWidth=1273 pour clientWidth=1265 ; la section mesure environ 1280 px et commence à -7,68 px.
- **Impact :** barre horizontale visible, bord de page décalé et expérience mobile/tablette moins fiable.
- **Correction attendue :** remplacer la largeur viewport par une largeur contenue ou neutraliser le débordement au bon conteneur, puis tester 375, 768 et 1280 px.

### P2-002 — Classes prose utilisées sans plugin Typography

- **Statut : CONFIRMÉ — STATIQUE/BUILD.**
- **Preuve :** src/components/DevNotes.tsx:139-157 utilise prose et variantes ; package.json:74 déclare @tailwindcss/typography, mais tailwind.config.ts:97 ne configure que tailwindAnimate. Le CSS généré ne contient aucune règle .prose.
- **Impact :** la mise en forme des articles, tableaux, titres et blocs de code ne correspond pas à l’intention déclarée.
- **Correction attendue :** configurer le plugin dans la source Tailwind puis vérifier le CSS généré, ou remplacer les classes par des styles explicitement présents.

### P2-003 — Le fallback NotFound renvoie HTTP 200

- **Statut : CONFIRMÉ — LIVE.**
- **Preuve :** src/App.tsx:28 route toute URL inconnue vers NotFound ; https://bastienlopez.fr/does-not-exist renvoie 200 text/html tout en affichant la page « Page introuvable ».
- **Impact :** moteurs et outils de monitoring peuvent indexer une page inexistante comme valide ; les erreurs de lien ne sont pas correctement signalées.
- **Correction attendue :** configurer le serveur/Caddy pour servir une réponse 404 réelle avec le fallback SPA, ou mettre en place une stratégie de routes statiques compatible.

### P2-004 — CSP absente sur la production

- **Statut : CONFIRMÉ — LIVE/DAST.**
- **Preuve :** les headers production contiennent HSTS, nosniff, Referrer-Policy, Permissions-Policy et X-Frame-Options, mais pas Content-Security-Policy. Le DAST localhost a aussi signalé cette absence.
- **Impact :** la défense en profondeur contre XSS et chargements inattendus est incomplète.
- **Correction attendue :** ajouter une CSP au proxy avec une politique adaptée aux scripts inline JSON-LD, Vite et éventuels fournisseurs analytics, puis la tester en Report-Only avant enforcement.

### P2-005 — Six vulnérabilités dans le lockfile

- **Statut : CONFIRMÉ — BUILD/STATIC.**
- **Preuve :** npm audit --json retourne 3 high, 2 moderate et 1 low : browserslist 4.25.1, js-yaml 4.3.0 et nanoid 3.3.16 côté lockfile ; DOMPurify 3.4.12 est une dépendance directe rendue côté navigateur ; @humanfs/node et postcss-selector-parser sont aussi concernés. npm audit --omit=dev retourne encore trois entrées dans l’arbre de production.
- **Impact :** surface de risque dépendance et divergence entre node_modules local et npm ci du CI.
- **Correction attendue :** examiner les advisories et la reachability, mettre à jour les versions compatibles, régénérer le lockfile, puis faire passer le seuil CI au moins sur high après validation.

### P2-006 — Garde-fous TypeScript et lint désactivés

- **Statut : CONFIRMÉ — STATIQUE.**
- **Preuve :** tsconfig.json:9-14 et tsconfig.app.json:18-21 désactivent strict, noUnusedLocals, noUnusedParameters et noImplicitAny ; eslint.config.js désactive aussi no-unused-vars.
- **Impact :** erreurs de contrat, imports morts et paramètres inutilisés peuvent être livrés malgré un typecheck vert.
- **Correction attendue :** activer progressivement les règles par périmètre, corriger les erreurs réelles et maintenir une exception documentée seulement si nécessaire.

### P2-007 — Projects.tsx concentre trop de responsabilités

- **Statut : CONFIRMÉ — STATIQUE.**
- **Preuve :** src/components/Projects.tsx:241-1285 regroupe filtrage, contenu bilingue inline, parsing Markdown, sanitization, hash routing, grille, détail et galerie ; le graphe compte plus de mille lignes de fonction/composant.
- **Impact :** régressions difficiles à isoler, duplication de contenu et coût élevé de toute évolution UI/data.
- **Correction attendue :** extraire sans changer le contrat les helpers de contenu, la galerie, le détail et les données de présentation dans des modules ciblés.

### P2-008 — Le code splitting ne diffère pas le chargement des sections

- **Statut : PROBABLE — STATIQUE/BUILD.**
- **Preuve :** src/pages/Index.tsx:7-12 déclare six lazy imports, mais src/pages/Index.tsx:28-34 rend immédiatement toutes les sections sous un seul Suspense. Le build émet bien des chunks, mais le premier rendu demande les six imports.
- **Impact :** coût réseau et parsing initial plus élevé que ne le laisse penser le découpage en chunks.
- **Correction attendue :** charger les sections à la demande au viewport ou par interaction, sans masquer l’état de chargement.

### P2-009 — Parité anglaise incomplète

- **Statut : CONFIRMÉ — STATIQUE/RENDU.**
- **Preuve :** src/lib/i18n.tsx:26-46 traduit les métadonnées et l’interface ; src/components/Skills.tsx:30-42 laisse des libellés français en mode anglais ; DevNotes ne traduit pas le contenu des articles ; src/components/Freelance.tsx:255-284 rend une branche anglaise différente qui omet certains détails et la section témoignages française.
- **Impact :** changement de langue qui ne produit pas une expérience éditoriale réellement anglaise.
- **Correction attendue :** définir le périmètre de traduction, traduire ou signaler explicitement les contenus non disponibles et conserver la structure des sections dans les deux locales.

### P2-010 — Sélecteur de langue incomplet au clavier

- **Statut : PROBABLE — STATIQUE.**
- **Preuve :** src/components/Navbar.tsx:6-45 expose role=listbox et role=option, mais aucun déplacement Arrow/Home/End, aucune sélection active ni retour de focus documenté.
- **Impact :** un utilisateur clavier ou lecteur d’écran peut ouvrir le contrôle sans pouvoir le parcourir comme un listbox complet.
- **Correction attendue :** utiliser un composant menu/listbox accessible existant ou implémenter les interactions ARIA et les tests clavier.

### P2-011 — Échec de chargement des articles non présenté

- **Statut : PROBABLE — STATIQUE.**
- **Preuve :** src/components/DevNotes.tsx:70-83 appelle les loaders dans try/finally, sans catch ni état d’erreur ; un échec de chunk ou d’import laisse l’utilisateur sans feedback explicite.
- **Impact :** panne réseau ou cache incohérent difficile à comprendre et à récupérer.
- **Correction attendue :** ajouter un état d’erreur local, un bouton de retry et un message accessible.

### P2-012 — CI sans tests comportementaux, accessibilité, performance ou liens

- **Statut : CONFIRMÉ — STATIQUE/BUILD.**
- **Preuve :** .github/workflows/ci.yml:42-57 exécute npm ci, lint, typecheck, build, verify-build et npm audit --audit-level=critical. package.json n’a aucun script test ; lhci n’est pas installé et aucun link checker/axe n’est exécuté.
- **Impact :** une régression visuelle, de navigation, d’accessibilité ou de lien peut passer la CI ; les vulnérabilités high/moderate ne bloquent pas le pipeline.
- **Correction attendue :** ajouter des tests E2E ciblés, axe/Lighthouse borné et contrôle des URLs, puis choisir un seuil npm audit aligné avec le risque.

### P2-013 — Hiérarchie de titres incohérente dans les détails projet

- **Statut : CONFIRMÉ — STATIQUE/RENDU.**
- **Preuve :** src/components/Projects.tsx:934 rend un h4 puis src/components/Projects.tsx:979 des h5 sans niveau intermédiaire ; le renderer Markdown produit aussi des h2/h3/h4 à partir de contenu libre.
- **Impact :** navigation par titres moins lisible pour les technologies d’assistance et structure éditoriale difficile à maintenir.
- **Correction attendue :** définir une hiérarchie de section documentée et appliquer des niveaux séquentiels indépendants du style visuel.

### P2-014 — Accumulation de patterns reconnaissables comme template IA

- **Statut : CONFIRMÉ — RENDU/STATIQUE.**
- **Preuve :** la capture production montre simultanément un hero centré, une grille de fond, un titre en gradient cyan/vert, quatre pills, deux CTA, une flèche rebondissante et une navbar translucide. Les sources correspondantes sont src/components/Hero.tsx:39-58, 90-123 et src/components/Navbar.tsx:84-127.
- **Impact :** même si chaque choix est techniquement fonctionnel, leur combinaison permet de prédire le site à partir de l’étiquette « portfolio développeur IA ». La direction ne porte pas encore une histoire ou une signature propre à Bastien.
- **Correction attendue :** repartir d’une direction éditoriale orientée preuves et projets, supprimer la grille/glow/gradient par défaut et reconstruire une composition asymétrique avec un seul geste de marque.

### P2-015 — Le même squelette de section est copié dans tout le site

- **Statut : CONFIRMÉ — RENDU/STATIQUE.**
- **Preuve :** About, Projects, Skills, Freelance, Contact et DevNotes répètent titre centré, texte centré, soulignement gradient de 20×4 px puis rangée de cartes ou boutons : src/components/About.tsx:21-25, Projects.tsx:873-882, Skills.tsx:63-68, Freelance.tsx:222-228, Contact.tsx:18-20 et DevNotes.tsx:102-110.
- **Impact :** aucune section n’a de rôle visuel propre ; le lecteur traverse une succession de blocs interchangeables et ne sait pas où se trouve la preuve principale.
- **Correction attendue :** attribuer une composition distincte à chaque intention : manifeste, étude de cas, méthode, notes, contact. Le titre ne doit plus être centré et souligné par défaut.

### P2-016 — Cardification, pills et halos aplatis

- **Statut : CONFIRMÉ — RENDU/STATIQUE.**
- **Preuve :** les statistiques About, les catégories projets, les cartes Skills, les offres Freelance, les témoignages et le Contact utilisent tous border + fond sombre + radius + hover/shadow ; les classes répétées sont visibles notamment dans About.tsx:87-109, Skills.tsx:78-98, Freelance.tsx:320-393, Testimonials.tsx:127 et Contact.tsx:29-54.
- **Impact :** la carte n’indique plus une vraie frontière d’information ou d’action. Les ombres, halos et pills se concurrencent et donnent une esthétique de dashboard SaaS générique.
- **Correction attendue :** réserver les cartes aux études de cas et aux interactions réelles ; convertir le reste en listes éditoriales, lignes, notes marginales, tableaux de compétences ou blocs sans fond.

### P2-017 — Hero trop chargé et proposition ambiguë

- **Statut : CONFIRMÉ — RENDU/STATIQUE.**
- **Preuve :** Hero.tsx:56-114 empile nom, titre animé sur trois lignes, trois paragraphes, quatre tags, deux CTA et une disponibilité CDI/freelance. Le même écran parle à la fois aux recruteurs, PME, clients freelance et utilisateurs de workflows IA.
- **Impact :** le visiteur comprend le métier mais pas la priorité. La promesse devient une liste de capacités et ne donne aucune preuve visible de la qualité du travail.
- **Correction attendue :** choisir une proposition principale, une audience primaire et une action ; déplacer les autres contextes vers des pages/sections secondaires. Afficher dès le premier écran un projet réel ou un résultat documenté.

### P2-018 — Motion décorative répétée sans fonction produit

- **Statut : CONFIRMÉ — STATIQUE/RENDU.**
- **Preuve :** shimmer du titre et pulse dans Hero.tsx:58-60, flèche animate-bounce en Hero.tsx:122, fade/slide sur plusieurs sections, hover scale des cartes Skills/DevNotes/Projects et ticker automatique dans Testimonials.tsx:72-157.
- **Impact :** la page essaie de paraître « premium » par mouvement plutôt que d’utiliser l’animation pour feedback, continuité ou hiérarchie. La répétition augmente la charge visuelle et concurrence le contenu.
- **Correction attendue :** supprimer shimmer, bounce, scale décoratif et ticker automatique ; conserver uniquement les transitions d’état, le focus et une entrée courte si elle clarifie la structure. Chaque animation restante doit avoir une justification écrite et un comportement reduced-motion.

## 9. P3 — Priorité basse

### P3-001 — IDs d’articles non uniques à l’échelle du catalogue

- **Statut : CONFIRMÉ — STATIQUE.**
- **Preuve :** 60 articles analysés pour 52 IDs uniques ; les IDs 11, 12, 21, 22, 31, 32, 41 et 42 apparaissent dans plusieurs fichiers de src/data/articles.
- **Impact :** collision possible si le catalogue devient global, si des clés React sont déplacées ou si une route article est ajoutée.
- **Correction attendue :** préfixer par catégorie ou utiliser un slug stable, sans changer les titres affichés.

### P3-002 — Résidus de template et dépendances probablement inutilisées

- **Statut : PROBABLE — STATIQUE.**
- **Preuve :** src/components/Footer.tsx:1 importe Heart sans l’utiliser ; des wrappers comme input.tsx, textarea.tsx et sonnerToast.ts ne sont pas appelés par les parcours principaux ; package.json contient une large surface Radix/template.
- **Impact :** maintenance et surface de mise à jour plus grandes.
- **Correction attendue :** confirmer avec un outil de dépendances et les imports complets avant toute suppression.

### P3-003 — Version Node du fichier .nvmrc trop large

- **Statut : CONFIRMÉ — STATIQUE.**
- **Preuve :** .nvmrc contient 22 alors que package.json:6-8 exige Node >=22.12.0 et npm >=10.
- **Impact :** une machine en Node 22 antérieur peut diverger du CI ou du build attendu.
- **Correction attendue :** aligner .nvmrc sur une version patch validée ou documenter le gestionnaire de versions utilisé.

### P3-004 — Actions GitHub non épinglées par SHA

- **Statut : CONFIRMÉ — STATIQUE.**
- **Preuve :** .github/workflows/ci.yml:27-30 utilise actions/checkout@v4 et actions/setup-node@v4.
- **Impact :** la supply chain CI dépend d’un tag mutable.
- **Correction attendue :** épingler les actions sur un SHA de commit et documenter la procédure de mise à jour.

### P3-005 — Assets raster lourds sans formats modernes

- **Statut : CONFIRMÉ — STATIQUE/BUILD.**
- **Preuve :** public/img_projects/berserk.png fait 3,57 Mo, Altme_Discover.png 3,04 Mo, CleDeVoute.png 2,81 Mo et plusieurs autres dépassent 1 Mo ; les données utilisent surtout PNG et aucun srcset/WebP/AVIF n’est fourni.
- **Impact :** poids réseau inutile, surtout sur mobile, malgré loading=lazy.
- **Correction attendue :** produire des variantes dimensionnées WebP/AVIF, conserver les originaux hors chemin de livraison si nécessaire et vérifier les captures.

### P3-006 — Petits écarts de finition éditoriale et icônes

- **Statut : CONFIRMÉ — STATIQUE.**
- **Preuve :** public/og-image.svg contient « ERP leger » sans accent ; public/site.webmanifest ne référence qu’un favicon ICO multi-tailles et pas d’icônes PNG 192/512 ; Skills conserve « GitHub Pages » alors que README décrit l’ancienne publication comme retirée.
- **Impact :** finition moins nette et baseline d’installation limitée.
- **Correction attendue :** corriger le texte, fournir les tailles d’icône réellement nécessaires et aligner le libellé de compétence avec la stratégie de déploiement actuelle.

## 10. Audit anti-vibecode — lecture synthétique

La page contient de vrais projets et de vrais assets, mais sa composition visuelle est maintenant classée **FAIL par accumulation**, conformément à la logique du skill : l’anti-slop ne juge pas une grille ou une carte isolée, il juge leur répétition sans raison de contenu. Le domaine et les données réelles ne compensent pas une direction qui reprend presque tous les réflexes du portfolio IA technique.

### 10.1 Écriture et voix

- La voix est compréhensible, mais elle répète des adjectifs génériques (« robuste », « maintenable », « clair », « adapté », « progressif ») sans toujours montrer le résultat concret. W09, W10 et P20 passent en FAIL par accumulation.
- Les emojis ne sont pas une signature de marque documentée : ils servent de puces dans les catégories projets et Dev Notes. W03 et P16 passent en FAIL jusqu’à ce qu’une iconographie volontaire soit définie.
- Les formulations les plus sensibles sont les métriques 5+/30+/10+ et « Sous 48h », traitées en P1-002.
- Aucun compteur live, badge de générateur ou texte lorem ipsum de page publique n’a été trouvé.

### 10.2 Génération visuelle et signaux de template

- La capture production confirme un empilement : fond navy/noir et grille, titre cyan/vert en gradient animé, pills, CTA en gradient, cartes sombres, bordures néon, soulignements identiques et motion répétée.
- Les captures et visuels de projets sont réels, mais ils arrivent après un long bloc abstrait et sont ensuite présentés dans une grille de cartes interchangeable. Le contenu réel ne façonne pas assez la composition.
- Les contrôles D01, D06, D09, D15, D18, D19, D21, D22 et D23 sont des écarts concrets dans l’état actuel ; ils ne doivent plus être décrits comme des choix simplement justifiés.

### 10.3 Complétude

- Les CTA primaires sont visibles, le contact est réel, le favicon et les métadonnées existent.
- La route not-found existe côté interface, mais son statut HTTP de production est incorrect.
- L’absence de page vie privée/mentions/CGU n’est pas automatiquement une erreur pour ce portfolio statique, mais le propriétaire doit confirmer le besoin légal et la politique analytics.

## 11. Revue design/UI

La hiérarchie actuelle est une hiérarchie de template : centrage, titre XXL, ligne gradient, paragraphe gris, rangée de pills, puis cartes. Elle apparaît dans les captures production de Hero, About, Projects, Skills, Freelance, Dev Notes et Contact. La page ne donne pas à chaque section une forme liée à son contenu.

Le problème visuel principal n’est donc pas le manque d’effets, mais l’absence de point de vue. Le portfolio devrait ressembler à un dossier de travail éditorial : une proposition nette, des preuves datées, des études de cas qui occupent l’espace, une méthode lisible et une prise de contact simple. La palette actuelle cyan/émeraude/orange, la grille et les halos doivent être considérés comme une direction à remplacer, pas comme une identité à préserver par défaut.

Le plugin Typography déclaré mais non activé reste un défaut de rendu éditorial. La correction doit se faire dans la configuration Tailwind canonique, en parallèle de la refonte de Dev Notes.

## 12. Revue UX et conversion

Le visiteur comprend le métier, mais reçoit trop de choix au premier écran : CDI, freelance, applications métier, API, n8n, IA, MVP, support technique, quatre tags et deux CTA. La conversion doit commencer par un seul cas d’usage et un seul geste principal. Les preuves de projets doivent apparaître avant les listes de capacités.

Les deux liens morts P1-001 cassent deux parcours de preuve. Le détail projet stocke un hash et utilise replaceState, mais le composant n’écoute pas popstate : les boutons précédent/suivant du navigateur peuvent désynchroniser la vue et l’URL. Le sélecteur de langue fonctionne au clic mais son modèle ARIA est incomplet au clavier. Le fallback NotFound aide à récupérer, sans renvoyer le bon statut HTTP.

La refonte doit remplacer la succession « section longue puis CTA » par un parcours : proposition → preuve réelle → méthode → offre adaptée → contact. Les catégories de projets doivent devenir un filtre secondaire ou une archive, pas le premier élément de lecture.

## 13. Revue accessibilité

Points positifs : skip link, navigation identifiable, labels de boutons, alt d’images, focus visible global, dialog de galerie avec Escape/focus trap et écoute de prefers-reduced-motion.

Écarts : listbox de langue sans navigation clavier complète, titres h4/h5 non séquentiels dans les détails, animation de flèche et headline à vérifier avec reduced motion, contrôle exact à 375 px non exécuté, et barre horizontale observable. Les icônes décoratives devraient être explicitement aria-hidden lorsque leur composant SVG n’apporte pas de sens.

## 14. Revue performance

Le build Vite transforme 1 682 modules et réussit. Mesures gzip produites par le build : chunk Projects 195,73 kB brut/42,75 kB gzip, chunk Radix 188,58 kB/62,01 kB, chunk vendor 145,23 kB/47,59 kB, chunk devops 130,83 kB, plus les chunks d’articles. Le découpage existe, mais les six imports lazy sont rendus immédiatement et peuvent donc être demandés au chargement initial.

Les PNG de plusieurs mégaoctets sont le deuxième poste évident. Les images sont lazy et les dimensions/alt sont corrects, mais il manque des formats modernes et des variantes de taille. Le build a aussi signalé une base Browserslist vieille d’environ six mois.

Lighthouse n’a pas pu être exécuté par le projet : lhci n’est pas installé et .lighthouserc.json ne définit pas de script npm. Ses seuils sont des warnings, pas des gates.

## 15. Revue SEO et GEO

index.html fournit canonical, hreflang fr-FR/x-default, robots index/follow, Open Graph, Twitter Cards, image 1200x630, JSON-LD et manifest. public/robots.txt autorise le crawl et référence public/sitemap.xml. public/llms.txt expose une description et des liens structurés.

La page est une SPA mono-route : il n’y a pas de pages publiques distinctes nécessitant chacune une URL/indexation. Le changement de langue modifie title, description, og et html lang côté client, mais pas les JSON-LD, canonical ou hreflang. Le fallback HTTP 200 sur une URL inconnue est le principal défaut SEO observable. Le sitemap ne contient que la racine, ce qui est cohérent avec l’architecture actuelle.

## 16. Revue sécurité

Le préflight web-security-audit a confirmé un écosystème Node, package-lock présent, absence de SECURITY.md et absence de semgrep/trivy disponibles. Le scan statique a lancé npm audit ; le DAST localhost a contrôlé les headers de base. Les résultats ont été intégrés ici sans conserver de secrets ni d’artefact de scan dans le dépôt.

La surface applicative est limitée : pas de backend, pas d’authentification, pas de base, pas d’upload et pas de formulaire persistant. Les chaînes rendues via dangerouslySetInnerHTML passent par DOMPurify. La dépendance DOMPurify elle-même est néanmoins verrouillée en 3.4.12 et doit être mise à jour selon l’advisory applicable.

En production, HSTS, nosniff, Referrer-Policy, Permissions-Policy et X-Frame-Options sont présents. La CSP manque. Le DAST local ne prouve pas la configuration serveur complète ; les headers LIVE sont la preuve retenue pour la production.

## 17. Dépendances

Le manifest contient une surface Radix/shadcn large pour une page principalement statique. Cela n’est pas une vulnérabilité en soi, mais accroît le coût de mise à jour et de bundle.

Résumé npm audit du lockfile :

| Package | Niveau npm audit | Version du lockfile | Contexte |
|---|---|---:|---|
| browserslist | high | 4.25.1 | chaîne de build |
| js-yaml | high | 4.3.0 | chaîne de build/outils |
| nanoid | high | 3.3.16 | transitive, présente dans l’arbre production |
| dompurify | moderate | 3.4.12 | dépendance directe, frontière HTML client |
| @humanfs/node | moderate | 0.16.6 | ESLint/outillage |
| postcss-selector-parser | low | 6.1.2 | PostCSS/Tailwind |

node_modules local contenait des versions plus récentes pour plusieurs entrées, alors que CI utilise npm ci et le lockfile. Il faut donc corriger le lockfile et non se fier à l’état local.

## 18. Architecture et maintenabilité

Le découpage par section et par data module est lisible. Les types de projet centralisent les champs nécessaires : id, title, description, category, image, tech, github, demo, detailedContent et gallery.

La principale dette est le poids de Projects.tsx : contenu de présentation, parser Markdown, sanitization, navigation par hash et galerie sont couplés. Les objets bilingues inline dupliquent des informations déjà présentes dans les fichiers data. DevNotes et Freelance ont aussi des branches éditoriales parallèles, ce qui augmente le risque de divergence.

Les IDs projet sont uniques. Les IDs d’articles ne le sont qu’à l’intérieur de leur catégorie ; cela devient un risque dès qu’un index global, une route ou une clé React est ajouté.

## 19. Revue TypeScript/JavaScript

Le typecheck passe, mais il est peu strict : strict, noImplicitAny et noUnused sont désactivés. La présence d’un import Heart inutilisé montre que le lint actuel ne protège pas la propreté du graphe.

Les handlers et effets principaux nettoient leurs listeners/timers. Les risques prioritaires sont l’état de hash sans popstate, l’absence d’erreur d’import DevNotes et la gestion non protégée de localStorage dans src/lib/i18n.tsx:18-25 : un navigateur bloquant le stockage peut faire échouer l’initialisation.

## 20. Revue React et framework

BrowserRouter, providers, Suspense et composants fonctionnels sont correctement assemblés. React Query est fourni mais aucun appel réseau n’est utilisé sur les parcours inspectés.

Il n’y a pas d’Error Boundary au niveau racine, ni autour des imports de sections. Les lazy imports donnent un découpage de build mais pas un chargement au viewport. La route wildcard donne une bonne récupération visuelle, avec la limite HTTP déjà décrite.

## 21. Revue CSS et responsive

Les tokens, focus-visible, section backgrounds et reduced-motion sont regroupés dans src/index.css. La règle reduced-motion globale limite les animations, mais elle ne corrige pas le problème de direction : les tokens servent aujourd’hui à décliner le même glow, gradient, radius et border sur tout le site.

Le conteneur viewport des témoignages est la cause mesurée du débordement. Les cartes et CTA utilisent de nombreuses variantes de radius/ombre ; l’échelle reste cohérente techniquement, mais la hiérarchie visuelle est aplatie. Le responsive doit être redessiné comme une composition mobile autonome, pas comme une version plus étroite des mêmes cartes.

## 22. Tests et QA

Il n’y a pas de répertoire de tests ni de script test dans package.json. Les vérifications disponibles sont utiles pour les artefacts mais ne couvrent pas les interactions. À ajouter en priorité :

1. E2E route racine, menu mobile, changement de langue, ouverture/fermeture détail, galerie et retour navigateur.
2. Assertions axe sur navigation, titres, images, dialog et listbox.
3. Contrôle des liens externes et des statuts HTTP des démos.
4. Lighthouse ou équivalent ciblé sur mobile avec seuils bloquants choisis.
5. Test de build qui vérifie l’absence de débordement critique et la présence des règles Typography attendues.

## 23. CI/CD et déploiement

La CI est reproductible et limitée en permissions. Elle installe avec npm ci, contrôle lint/typecheck/build/verify-build et utilise un timeout. Le seuil npm audit critical laisse passer les high et moderate relevés.

scripts/deploy-vps.ps1 valide l’hôte, l’utilisateur et un chemin sous /var/www avant de lancer npm ci, scp et une commande distante find ... rm -rf. Cette suppression est bornée au RemotePath validé, mais le déploiement n’est ni atomique ni rollbackable et le proxy Caddy/TLS/headers n’est pas versionné ici. Aucun déploiement n’a été déclenché pendant cet audit.

## 24. Code mort, fichiers suspects et nettoyage

- Heart est importé mais non utilisé dans Footer.tsx.
- Les wrappers UI et dépendances template doivent être vérifiés avant suppression ; aucune suppression n’a été faite.
- Le libellé GitHub Pages de Skills.tsx est à aligner avec la migration VPS documentée.
- Les répertoires dist, node_modules et les sorties temporaires de l’audit ne sont pas des sources à modifier.
- Les occurrences de tokens, example.com ou TODO dans les articles sont des extraits de code/documentation analysés comme contenu, pas des secrets runtime confirmés.

## 25. Commandes et validations exécutées

| Vérification | Résultat | Preuve |
|---|---|---|
| npm run lint | PASS | exit code 0 |
| npm run typecheck | PASS | exit code 0 |
| npm run build | PASS | Vite 8.1.5, 1 682 modules transformés |
| npm run verify:build | PASS | artefacts dist/ et métadonnées validés |
| npm audit --json | FAIL de sécurité attendue | 6 vulnérabilités : 3 high, 2 moderate, 1 low |
| npm audit --omit=dev --json | FAIL de sécurité attendue | 3 entrées restantes dans l’arbre production |
| preflight.py | PASS partiel | contexte Node identifié ; semgrep/trivy absents |
| run_static_scan.py | PASS technique / findings | rapport npm audit produit puis intégré ici |
| run_local_dast.py | PASS technique / findings | CSP, nosniff et Referrer-Policy absents sur cible localhost |
| Requête LIVE racine/assets | PASS | HTML, robots, sitemap, manifest, favicon répondent 200 |
| Requête LIVE URL inconnue | FAIL | /does-not-exist répond 200 avec contenu NotFound |
| Vérification LIVE des démos | FAIL ciblé | Aqualis et Talao répondent 404 |
| DOM/arbre d’accessibilité/captures | PASS partiel | navigation, CTA, alt, menu ; overflow et titres relevés |
| lhci | NON DISPONIBLE | commande absente, aucun test Lighthouse lancé |

## 26. Matrice anti-vibecode complète — 94 contrôles

Statuts : PASS = vérifié ; FAIL = écart concret ; JUSTIFIED = choix cohérent et intentionnel ; N/A = non applicable ; UNKNOWN = preuve insuffisante ou confirmation propriétaire nécessaire.

| ID | Contrôle | Statut | Preuve ou commentaire |
|---|---|---|---|
| W01 | Long-dash dependency | JUSTIFIED | Usage ponctuel dans une voix éditoriale, pas de motif automatique établi. |
| W02 | Formulaic contrast sentence | PASS | Pas d’accumulation observée. |
| W03 | Decorative emoji punctuation | FAIL | Emojis utilisés comme puces/iconographie de catégories et Dev Notes sans rationale de marque documentée. |
| W04 | Over-structured emphasis | PASS | Sections lisibles, pas de gras sur chaque ligne. |
| W05 | Automatic groups of three | PASS | Les groupes servent les stats/compétences, pas une règle visuelle universelle. |
| W06 | Excessive hedging | PASS | Ton direct sur le hero et le contact. |
| W07 | Uniform paragraph rhythm | PASS | Articles et fiches ont des longueurs variées. |
| W08 | Question restatement before answer | PASS | CTA et propositions vont directement au besoin. |
| W09 | Model-signature vocabulary | FAIL | « Robuste », « maintenable », « clair », « adapté », « progressif » et « approche » se répètent sans preuve associée. |
| W10 | Unnaturally pristine chat-style typography | FAIL | Le rythme centré, parfaitement régulier et très lissé donne une voix de landing page générée. |
| P01 | Deployment subdomain left as identity | PASS | Domaine racine bastienlopez.fr en production. |
| P02 | Default purple/blue hero gradient | JUSTIFIED | Palette cyan/émeraude/orange définie par tokens. |
| P03 | Synthetic or defective imagery | PASS | Captures et visuels locaux inspectés ; pas d’artefact évident. |
| P04 | Fabricated testimonials | PASS | Témoignages confirmés par le propriétaire ; Aqualis retiré comme fake, `J. DM` reformulé, identités anonymisées conservées selon autorisation. |
| P05 | Dead or placeholder controls | FAIL | Deux démos publiques répondent 404, P1-001. |
| P06 | Scroll-reveal animation everywhere | FAIL | Fade/slide/scale/ticker sont répartis sur presque toutes les sections, même sans changement d’état. |
| P07 | One-page-by-default information architecture | FAIL | La page rassemble recrutement, freelance, projets, compétences et documentation ; les preuves sont noyées dans une longue pile. |
| P08 | Text-only placeholder brand mark | PASS | Le nom textuel est utilisé comme identité assumée. |
| P09 | Missing favicon | PASS | favicon.ico et manifest présents. |
| P10 | Gimmicky animated headline coloring | FAIL | Hero.tsx:58 anime en boucle le dégradé du titre. |
| P11 | Empty/template privacy page | N/A | Aucune page vie privée publiée dans ce portfolio statique. |
| P12 | Empty/template terms page | N/A | Aucune page CGU publiée ; besoin légal à confirmer. |
| P13 | Fake live-visitor counter | N/A | Aucun compteur live. |
| P14 | Fake customer/user count | PASS | `5+`, `30+` et `10+` validés par le propriétaire avec périmètre déclaré ; aucun compteur client/utilisateur non autorisé n’est ajouté. |
| P15 | Unsupported performance/stat claims | PASS | `Sous 48h` est borné à l’estimation après échange cadré ; les délais `1–3 semaines`, `4–8 semaines` et `2–6 mois` sont libellés indicatifs et validés. |
| P16 | Emojis as product iconography | FAIL | Emojis dans les quatre catégories projet et les cinq catégories Dev Notes, en plus des icônes Lucide. |
| P17 | Vague hero proposition | PASS | Métier, spécialité et bénéfice sont explicites. |
| P18 | Decorative handwriting font | PASS | Aucune police manuscrite. |
| P19 | Generator/platform badge | PASS | Aucun badge de builder visible. |
| P20 | AI-copy markers repeated | FAIL | Les marqueurs W09/W10 s’accumulent dans hero, freelance, skills, project intro et contact. |
| D01 | High-saturation gradient collision | FAIL | Cyan/vert/bleu/orange en gradients, tabs, boutons, titres, icônes et cartes sans hiérarchie suffisante. |
| D02 | Floating decorative icons | PASS | Pas d’icônes flottantes gratuites dans les marges. |
| D03 | Unconsidered pure-white canvas | JUSTIFIED | Fond sombre intentionnel et contrasté. |
| D04 | Section-by-section rainbow palette | PASS | Palette tokenisée, rôles sémantiques stables. |
| D05 | Shadow on nearly every object | FAIL | Ombres et borders réapparaissent sur métriques, skills, offres, projet, témoignages et contact. |
| D06 | Default three-feature-card row | FAIL | About et Skills utilisent des rangées de cartes identiques à une section de template ; la forme ne vient pas du contenu. |
| D07 | Glass/blur blanket style | PASS | Blur limité à navbar/dialog ; le défaut principal est la cardification, pas le glassmorphism. |
| D08 | Generator-default font selection | UNKNOWN | Aucun système typographique de marque explicite n’est déclaré ; le choix final doit être posé dans la refonte. |
| D09 | Decorative full-width accent band | FAIL | Le soulignement gradient 20×4 px est répété sous presque chaque titre de section sans fonction différente. |
| D10 | Bento layout by reflex | N/A | Pas de bento irrégulier systématique. |
| D11 | Fake terminal window | JUSTIFIED | Le contenu est réellement technique et orienté code/automation. |
| D12 | Every benefit prefixed with green check | PASS | Les checkmarks ne structurent pas toutes les sections. |
| D13 | Three pricing tiers | N/A | Pas de tarification en trois niveaux. |
| D14 | No real product demonstration | PASS | Captures, galeries, liens et fiches projet présents. |
| D15 | Same corner radius on everything | FAIL | Malgré plusieurs valeurs techniques, la perception est celle d’un même rectangle arrondi répété partout. |
| D16 | Purple-on-black AI palette | PASS | Pas de palette purple-on-black. |
| D17 | Missing loading placeholders/states | PASS | DevNotes expose un état de chargement ; erreur réseau reste P2-011. |
| D18 | Background glow/orb decoration | FAIL | Halos dans hero, métriques et icônes ajoutent une ambiance « AI SaaS » sans information. |
| D19 | Decorative dot-grid background | FAIL | Grille du hero et des témoignages sert de texture de template ; elle ne représente aucun mécanisme du travail. |
| D20 | Sparkle icon as universal AI symbol | PASS | Pas d’étoile universelle sur chaque CTA IA. |
| D21 | Bouncing scroll arrows | FAIL | Hero.tsx:122 utilise animate-bounce pour une flèche purement décorative. |
| D22 | Hover animation on non-interactive elements | FAIL | Les cartes Skills animent leurs icônes alors qu’elles ne sont pas actionnables. |
| D23 | Neon-on-dark default styling | FAIL | Fond quasi noir + accents cyan/vert lumineux + glow est précisément le langage générique du portfolio IA développeur. |
| D24 | Generic pastel-everything styling | PASS | Palette sombre, non pastel. |
| L01 | Custom not-found experience | FAIL | Vue custom présente, mais statut HTTP LIVE reste 200. |
| L02 | Primary CTA visible early | PASS | CTA contact/projets/CV visibles dans le hero. |
| L03 | Unique page titles | PASS | Titre racine et titre anglais dynamique observés. |
| L04 | Unique page descriptions | PASS | Meta description présente et mise à jour par locale. |
| L05 | Social sharing image/metadata | PASS | OG/Twitter et og-image.svg présents. |
| L06 | Complete favicon/app-icon baseline | FAIL | favicon présent, mais manifest sans icônes PNG 192/512. |
| L07 | robots.txt policy | PASS | Allow et sitemap explicites. |
| L08 | Sitemap | PASS | sitemap.xml présent et cohérent avec la mono-route. |
| L09 | Alternative text | PASS | Images significatives inspectées avec alt utile. |
| L10 | Real mobile breakpoints tested | FAIL | Overflow confirmé ; largeur exacte 375 px non couverte par une preuve automatisée. |
| L11 | Mobile primary action reachable | PASS | CTA et menu mobile atteignables dans le rendu inspecté. |
| L12 | Loading state for async actions | PASS | Chargement DevNotes et Suspense visibles. |
| L13 | Field-specific form errors | N/A | Aucun formulaire de saisie. |
| L14 | Submission success state | N/A | Aucune soumission persistante. |
| L15 | Real privacy disclosure | UNKNOWN | Aucun texte de privacy ; décision propriétaire nécessaire. |
| L16 | Real terms/conditions | UNKNOWN | Applicabilité juridique non déterminée par le dépôt. |
| L17 | Consent control | N/A | Aucun tracker tiers actif identifié dans le bundle inspecté. |
| L18 | Analytics decision | UNKNOWN | Hooks analytics présents, fournisseur/consentement non configurés dans le dépôt. |
| L19 | Real contact channel | PASS | mailto, LinkedIn, GitHub et CV accessibles. |
| L20 | Optimized image delivery | FAIL | PNG multi-Mo sans WebP/AVIF ni srcset, P3-005. |
| S01 | No private API secrets in browser bundles | PASS | Aucun secret privé identifié ; l’email public est un canal de contact volontaire. |
| S02 | No valid secrets in Git history | UNKNOWN | Pas d’audit historique exhaustif destructif ; fichiers courants inspectés. |
| S03 | Service/admin credentials server-only | N/A | Pas de service/admin backend. |
| S04 | Row/data-level access policies | N/A | Pas de base exposée. |
| S05 | Sensitive data at rest | N/A | Pas de stockage applicatif sensible. |
| S06 | Authentication server-side | N/A | Pas d’authentification. |
| S07 | IDOR/BOLA | N/A | Pas de ressource privée par ID. |
| S08 | Privileged mass assignment | N/A | Pas d’API d’écriture. |
| S09 | Hardened session cookies | N/A | Pas de session cookie. |
| S10 | Modern password hashing | N/A | Aucun mot de passe stocké. |
| S11 | Login abuse rate limiting | N/A | Aucun login. |
| S12 | Public-form abuse protection | N/A | Aucun formulaire serveur. |
| S13 | Parameterized database queries | N/A | Aucune base ni requête. |
| S14 | Server-side input validation | N/A | Pas de frontière serveur d’entrée. |
| S15 | User content safely rendered | PASS | DOMPurify avant les deux dangerouslySetInnerHTML. |
| S16 | Uploads constrained and isolated | N/A | Aucun upload. |
| S17 | API responses minimal | N/A | Aucune API. |
| S18 | Security headers | FAIL | CSP absente malgré les autres headers utiles. |
| S19 | HTTPS enforced | PASS | Production HTTPS et HSTS observés. |
| S20 | Dependency vulnerability hygiene | FAIL | npm audit retourne six vulnérabilités et CI ne bloque que critical. |

## 27. Quick wins recommandés

1. Corriger ou retirer les deux URLs 404 P1-001.
2. Corriger le conteneur témoignages et vérifier 375/768/1280 px.
3. Activer Typography ou supprimer les classes prose non effectives.
4. Configurer le serveur pour que les inconnues renvoient 404.
5. Ajouter une CSP progressive et mettre à jour le lockfile après lecture des advisories.
6. Ajouter le catch/retry DevNotes et le comportement clavier du sélecteur de langue.
7. Revoir les chiffres/témoignages avec leurs preuves avant publication.
8. Mettre en place un contrôle liens + axe minimal dans la CI.

## 28. Roadmap proposée

### Phase 0 — crédibilité et routes

- P1-001 : liens de démonstration.
- P1-002 : validation ou reformulation des preuves commerciales.
- P2-003 : statut HTTP NotFound.

### Phase 1 — rendu et accessibilité

- P2-001 : overflow témoignages.
- P2-002 : Typography.
- P2-010 et P2-013 : listbox clavier et titres.
- D21/D22 : réduire les affordances décoratives.

### Phase 2 — sécurité et performance

- P2-004 et P2-005 : CSP et lockfile.
- P2-008 : lazy loading réellement différé.
- P3-005 : conversion/resizing des images.

### Phase 3 — qualité durable

- P2-006/P2-007/P2-009/P2-011 : strictness progressive, extraction Projects, parité i18n et erreurs de chargement.
- P2-012 : E2E, axe, Lighthouse et link check.
- P3-001 à P3-004/P3-006 : nettoyage et reproductibilité.

## 29. Checklist finale

- [x] Dépôt, configuration, data, assets, scripts et CI inspectés.
- [x] Rendu local et production inspectés.
- [x] Liens externes critiques vérifiés.
- [x] Build et contrôles disponibles exécutés.
- [x] Les 94 contrôles anti-vibecode sont présents dans la matrice.
- [x] Aucun P0 inventé ; les éléments non prouvés sont marqués UNKNOWN ou PROBABLE.
- [x] Aucun secret n’est reproduit dans ce rapport.
- [x] Seul audit.md est autorisé à être ajouté ou modifié par cette demande.
- [x] Aucun commit, push, pull, fetch, merge, rebase, déploiement ou publication n’a été effectué.

## 30. Brief de refonte complète

### 30.1 Design Read

**Portfolio de développeur full-stack pour recruteurs, équipes produit et dirigeants de PME, avec un langage éditorial technique centré sur les preuves de travail, construit sur React/Tailwind existants sans nouvelle dépendance visuelle par défaut.**

La refonte ne doit pas chercher une nouvelle version du même portfolio « dark AI ». Elle doit retirer les automatismes visuels qui empêchent le contenu de porter la page. Le contenu disponible est assez riche pour imposer sa propre forme : études de cas, rôles, contraintes, stacks, galeries, notes techniques et méthode.

### 30.2 Direction proposée : dossier de travail éditorial

- **Fondation :** surfaces sobres et stables, une couleur d’accent principale et une couleur d’action ; aucun gradient décoratif global, aucun halo permanent, aucune grille de fond.
- **Typographie :** une hiérarchie assumée avec un titre de caractère et un corps très lisible, ou une seule famille locale/système correctement réglée. Pas de seconde police ajoutée pour faire « premium » sans nécessité.
- **Composition :** alignements à gauche, colonnes asymétriques et lignes éditoriales ; le centrage reste réservé à une intention précise. Les sections ne doivent plus partager le même titre + trait + cartes.
- **Matière visuelle :** les captures de projets deviennent les éléments forts de la page. Une étude de cas doit occuper une grande surface et montrer contexte, rôle, décision et résultat.
- **Iconographie :** supprimer les emojis de navigation/catégories. Utiliser le texte, des marqueurs simples ou les icônes existantes uniquement quand elles expliquent une action.
- **Formes :** réduire les radius à une petite échelle. Une bordure ou une ombre doit signifier une frontière, une profondeur ou une interaction ; elle ne doit pas décorer chaque bloc.
- **Motion :** retirer shimmer, bounce, ticker automatique et scale décoratif. Conserver les transitions de focus, l’ouverture d’un détail, le changement de filtre et une entrée courte si elle explique la continuité.
- **Preuves :** aucune statistique ou citation sans source validée. Les chiffres non prouvés sont supprimés ou remplacés par des faits observables dans les projets.

### 30.3 Système de décision anti-slop

Chaque nouvel élément doit répondre à trois questions avant implémentation :

1. Quelle information ou action ce motif rend-il plus claire ?
2. Pourquoi cette forme appartient-elle à Bastien plutôt qu’à n’importe quel portfolio développeur IA ?
3. Que se passe-t-il si on le retire ?

Si la réponse à la troisième question est « rien », l’élément est décoratif et doit être supprimé ou rendu exceptionnel. Une animation, un gradient, une pill, une carte ou une icône ne doit jamais être ajoutée pour remplir un vide.

## 31. Blueprint de la nouvelle page

| Zone | Composition cible | Ce qui disparaît |
|---|---|---|
| Header | Navigation courte, nom en texte simple, un seul CTA ; barre compacte au scroll | Gradient du logo, groupe d’icônes sociales permanent, contrôle trop large |
| Hero | Colonne gauche : proposition unique et contexte ; colonne droite : preuve projet réelle ou extrait de fiche | Grille, titre gradient animé, quatre pills, troisième paragraphe, flèche bounce |
| Preuve immédiate | Une ligne factuelle : rôle, type de produit, stack principale, lien vérifié | Statistiques 5+/30+/10+ sans source |
| Études de cas | Liste éditoriale alternée image/texte, 3 à 5 cas prioritaires, archive séparée | Grille de cartes identiques et quatre gros boutons emoji |
| Méthode | Chronologie courte ou schéma de livraison en quatre étapes, sans cartes imbriquées | Bloc « bien adapté si » et listes génériques répétées |
| Stack | Matrice compacte reliée à des projets (« utilisé sur »), pas huit catégories de cartes | Grille d’icônes et listes de technologies hors contexte |
| Freelance | Trois modes de collaboration formulés par livrables et contexte, sans promesse chronométrée non prouvée | « Sous 48h », badges, pseudo-tarification Starter/Business/ERP-Scale |
| Dev Notes | Index éditorial avec titre, date, thème et résumé ; détail lisible avec vrai Typography | Cinq boutons emoji centrés et grand vide avant le contenu |
| Témoignages | Citations statiques, identité et contexte vérifiés ; sinon section supprimée | Ticker automatique, avatars anonymes non sourcés |
| Contact | Une proposition claire, email et LinkedIn, éventuellement un mini formulaire si le besoin est réel | Grande carte contenant deux cartes et quatre niveaux de CTA |
| Footer | Navigation minimale, disponibilité et liens vérifiés | Reprise de l’identité gradient et boutons décoratifs |

## 32. Plan de refonte par étapes

### Étape A — Direction et contenu

- Choisir l’audience prioritaire entre recrutement et missions, puis écrire une phrase de proposition unique.
- Valider les témoignages, les métriques et les liens de démonstration avant de les remettre dans la composition.
- Sélectionner trois à cinq études de cas prouvables et leur attribuer une image, un rôle, une contrainte et un résultat.
- Décider si les Dev Notes restent dans la page ou deviennent une route éditoriale dédiée.

### Étape B — Fondations visuelles

- Remplacer les tokens gradient/glow par une palette de surfaces, texte, accent et action.
- Définir une échelle de titres, de corps, de largeur de lecture et d’espacement.
- Définir deux variantes de conteneur maximum : contenu éditorial et étude de cas.
- Supprimer les classes d’animation décorative et les patterns de soulignement répétés.

### Étape C — Recomposition des sections

- Refaire Hero, Projects et Contact en premier : ce sont les zones qui déterminent la perception et la conversion.
- Remplacer la grille Skills par une matrice liée aux projets.
- Transformer Freelance en méthode/livrables, pas en catalogue de cartes.
- Remplacer Testimonials par des preuves validées et statiques.
- Refaire Dev Notes autour de la lecture et de la recherche, avec Typography activé.

### Étape D — Responsive et accessibilité

- Concevoir explicitement les vues 375, 768 et 1280 px.
- Vérifier aucun overflow, les retours à la ligne du hero, les zones tactiles, le focus, les titres et le contraste.
- Remplacer le listbox custom si un select/menu natif ou un composant existant couvre mieux le besoin.
- Tester reduced-motion et zoom texte après suppression de la motion décorative.

### Étape E — Preuve de sortie

- Rejouer lint, typecheck, build et verify-build.
- Ajouter au minimum un parcours E2E de navigation, un test de liens et axe sur les zones interactives.
- Capturer les trois largeurs et faire une critique unique avec le format Issue / Why / Correction du skill design-taste-codex.
- Repasser les contrôles W/P/D/L concernés ; aucune justification « cohérent avec le thème » ne suffit si le motif reste générique.

## 33. Critères d’acceptation de la refonte

La refonte ne sera considérée comme réussie que si :

- le premier écran exprime une seule proposition et montre une preuve réelle ;
- il n’y a plus de combinaison hero centré + grille + titre gradient + pills + double CTA + flèche bounce ;
- les sections ont des compositions différentes dictées par leur contenu ;
- les cartes, gradients, glows, shadows et radius ne sont plus appliqués par défaut ;
- aucune citation, métrique ou délai ne reste sans preuve ou libellé honnête ;
- la motion sert un état, une continuité, une hiérarchie ou l’orientation ;
- les captures à 375, 768 et 1280 px ne montrent ni overflow ni navbar recouvrant le contenu ;
- les liens de preuve répondent correctement et les URLs inconnues renvoient 404 ;
- la page garde toutes les fiches projets, tous les champs de données et la vue détail ;
- la matrice anti-vibecode est repassée après implémentation et les FAIL visuels sont supprimés ou justifiés par une décision de marque explicite.

## 34. Addendum de décision propriétaire — 2026-09-10

La validation écrite du propriétaire clôt la décision GOV-001. Elle constitue la preuve de décision métier ; elle ne remplace pas une pièce comptable, une autorisation archivistique ou une mesure indépendante lorsqu’une de ces preuves sera nécessaire dans une phase ultérieure.

### Claims chiffrés et délais

| Élément | Décision | Périmètre déclaré | Date / preuve disponible |
|---|---|---|---|
| `5+` années d’expérience | VALIDÉ | Expérience professionnelle et freelance présentée dans le portfolio | 2026-09-10 — validation propriétaire écrite |
| `30+` projets | VALIDÉ | Projets et réalisations du parcours, au-delà du seul inventaire technique des 21 fiches contrôlées par FND-003 | 2026-09-10 — validation propriétaire écrite + inventaire FND-003 |
| `10+` secteurs/contextes | VALIDÉ | Secteurs et contextes couverts par les expériences et projets publiés | 2026-09-10 — validation propriétaire écrite |
| `Sous 48h` | VALIDÉ | Réponse ou estimation initiale après un premier échange cadré ; ce n’est pas un délai de livraison | 2026-09-10 — validation propriétaire écrite |
| `1–3 semaines`, `4–8 semaines`, `2–6 mois` | VALIDÉ | Ordres de grandeur indicatifs et non contractuels, à confirmer après cadrage | 2026-09-10 — validation propriétaire écrite |

### Témoignages

- Éloi V., Luxury Auto, Marino / Clé de Voûte et Utilisateur ATS anonymisé : conservés avec l’identité publique déjà affichée ; autorisation confirmée par le propriétaire.
- José : conservé avec le nom public reformulé en `J. DM`.
- Utilisateur Aqualis anonymisé : retiré de `src/data/testimonials.ts`, déclaré fake par le propriétaire.
- Les photos et logos utilisés dans ces témoignages sont déclarés autorisés par le propriétaire. Les témoignages anonymisés conservés restent explicitement anonymisés.

### Analytics et obligations légales

- Google Search Console est le suivi déclaré pour la visibilité du domaine. La production et le dépôt ne chargent pas de script Google Analytics ou autre tracker navigateur ; aucun identifiant de mesure d’audience n’a été fourni.
- Le consentement de mesure d’audience est déclaré non requis pour cette configuration. La décision ne couvre pas l’ajout futur d’un tracker tiers.
- Une page de mentions légales est requise et a été ajoutée sur `/mentions-legales`, avec le contact public et l’hébergeur OVHcloud. Aucune page privacy dédiée n’est demandée.
- Les numéros d’immatriculation et l’adresse complète ne figurent pas dans les sources disponibles. Pour cette phase, le propriétaire confirme le maintien de la page telle quelle ; une mise à jour reste à prévoir si le statut de l’activité ou les documents contractuels imposent ultérieurement ces mentions.
- Le claim « NDA possible » est validé.

### Corrections appliquées et frontière de publication

- La démo Talao de la source pointe désormais vers `https://www.talao.io/index_fr.html` (réponse HTTP 200 vérifiée) ; la production live observée avant déploiement peut encore servir l’ancienne URL `/fr/`.
- Le projet Aqualis et ses données sont conservés ; seul le témoignage déclaré fake a été retiré.
- Aucun déploiement, publication ou mutation distante n’a été exécuté. La correction de l’URL Talao et la nouvelle route devront être livrées par le processus de déploiement autorisé.

## 35. Exécution des phases 1 et 2 — 2026-09-10

### PROD-001 — PASS

- La démo Talao source utilise `https://www.talao.io/index_fr.html`, vérifiée en HTTP 200.
- La démo Aqualis source utilise `https://bastienlopez.github.io/Aqualis/`, vérifiée en HTTP 200 avec un titre `Aqualis` ; l’ancienne route `/aquarium` répondait 404.
- Les 11 URLs `demo` présentes dans les quatre fichiers de projets ont été testées avec HEAD puis repli GET lorsque nécessaire : toutes répondent dans la plage 2xx/3xx, aucune fiche projet n’a été supprimée.

### PROD-002 — PARTIAL, blocage d’accès VPS

- La production observée répond encore 200 sur `/this-route-should-not-exist-20260910` et 200 sur un chemin d’asset inexistant ; le finding reste confirmé tant que Caddy n’est pas rechargé.
- `deploy/Caddyfile.example` limite le fallback 200 aux routes React connues (`/`, `/mentions-legales`), garde les fichiers existants et sert `index.html` avec le statut 404 conservé pour les inconnues.
- `docker run ... caddy validate` est PASS. Un test Caddy local sur `dist/` est PASS : racine 200, page légale 200, route inconnue 404 avec HTML React, asset existant 200 et asset absent 404.
- Aucun accès ni changement distant n’a été effectué ; le retest live attend l’application de ce fichier sur le VPS.

### SEC-001 — PARTIAL, blocage d’accès VPS

- Les réponses live observées ne contiennent ni `Content-Security-Policy` ni `Content-Security-Policy-Report-Only`.
- La CSP Report-Only versionnée dans `deploy/Caddyfile.example` est bornée à `self`, `data:` pour les images/fonts et sans wildcard. `unsafe-inline` est limité aux inline styles et JSON-LD actuellement présents ; le passage en enforcement est prévu après parcours navigateur.
- Les headers ont été vérifiés sur des réponses 200 et 404 dans le test Caddy local. Le retest live et la collecte des violations navigateur restent à faire après rechargement Caddy.

### SEC-002 et SEC-003 — PASS

- `npm audit fix --no-fund` a mis à jour les versions compatibles dans `package-lock.json` sans `--force`.
- `npm audit --omit=dev --audit-level=high` retourne zéro vulnérabilité pour les dépendances livrées ; l’audit complet actuel des outils de test est détaillé dans la section Phase 5.
- `npm ci` dans le checkout a rencontré un verrou Windows EPERM sur un binaire Rolldown. Une copie temporaire propre a exécuté `npm ci` puis `npm run check` avec succès ; le lockfile est donc reproductible hors du verrou local.
- La CI bloque désormais les niveaux `high` et `critical` sur les dépendances de production avec `npm audit --omit=dev --audit-level=high`.

### SEC-004 — PASS

- `.github/workflows/ci.yml` épingle `actions/checkout` sur `11bd71901bbe5b1630ceea73d27597364c9af683` (`v4.2.2`) et `actions/setup-node` sur `49933ea5288caeca8642d1e84afbd3f7d6820020` (`v4.4.0`). Les SHA ont été vérifiés via l’API GitHub officielle ; les permissions `contents: read`, le cache npm et l’ordre des étapes restent inchangés.

### SEC-005 — PASS, scan redacted

- Le scan borné des fichiers courants et de l’historique Git n’a trouvé aucun motif de clé AWS, token GitHub/npm/Slack/Google ou clé privée.
- Les valeurs ne sont jamais imprimées ni enregistrées. Les outils optionnels Semgrep, Trivy et gitleaks ne sont pas installés ; cette limite est conservée dans `.security-audit/report.md`.

### Preuves sécurité produites

- `.security-audit/context.json`, `scans/static-summary.json`, `scans/dast-basic.json`, `scans/secrets-redacted.json`, `findings.json` et `report.md` sont générés par le workflow `web-security-audit` et ignorés par Git.
- Le DAST local Vite confirme l’absence de headers sur le serveur de développement ; il ne remplace pas le retest Caddy live.

## 36. Exécution de la phase 3 — bugs, robustesse et accessibilité fonctionnelle

Le correctif local de BUG-001 à BUG-006 est terminé et validé par lint, typecheck, build et un parcours navigateur CUA sur le serveur de développement. Cette passe ne clôt pas les contrôles QA prévus : elle fournit l’implémentation et les premiers contrôles observables avant la refonte visuelle.

| Finding | Statut après correctif | Évidence locale | Contrôle restant |
|---|---|---|---|
| P2-010 / BUG-001 | PASS local | Le sélecteur fr/en expose deux options, un focus actif, ArrowUp/ArrowDown, Home/End, Enter/Espace, Escape et le retour focus au déclencheur | Axe + lecteur d’écran dans QA-003 |
| P2-013 / BUG-002 | PASS local | Les titres injectés sont bornés h2–h4 ; le parcours Projects observé garde un h1 unique et ne produit plus de h5 | Snapshot headings complet dans QA-003 |
| P2-011 / BUG-003 | PASS code + succès | Les imports async ont un état d’erreur accessible, un retry idempotent et un identifiant de requête contre les réponses obsolètes | Rejet d’import simulé dans QA-002 |
| P2-007 UX / BUG-004 | PASS local | L’ouverture utilise une entrée hash, le retour appelle l’historique, `popstate` recharge le projet ou la liste et le focus revient au titre Projects | Matrice back/forward/reload dans QA-002 |
| Robustesse i18n / BUG-005 | PASS code | Lecture et écriture `localStorage` sont protégées par fallback français sans changer les métadonnées | Quota et stockage bloqué dans QA-002 |
| W03/P16/L09 / BUG-006 | PASS local | Les SVG décoratifs sont silencieux, les actions gardent leur nom visible, les avatars redondants ne sont plus annoncés et les alt des images projet sont conservés | Axe + responsive dans QA-003/QA-006 |

Le renderer Markdown de Projects conserve le texte et le style, mais remappe les niveaux de titre selon une hiérarchie bornée. Le hash projet accepte les URLs valides, neutralise les hashes invalides et évite l’empilement d’entrées lors de la fermeture par le bouton retour. Les limites restantes sont des preuves QA à exécuter avant la refonte, pas des modifications distantes.

## 37. Exécution de la phase 4 — architecture et qualité du code (2026-09-10)

### ARCH-001 — PASS

La configuration TypeScript de l’application active désormais `strict`, `noImplicitAny`, `noUnusedLocals`, `noUnusedParameters` et `noFallthroughCasesInSwitch`. Les trois diagnostics stricts de la baseline ont été corrigés : l’option `future` obsolète de `BrowserRouter` a été retirée, le filtre impossible `category !== "browser"` a été remplacé par le type réel des projets et l’import React inutilisé de `Testimonials` a été supprimé. `npm run lint` et `npm run typecheck` passent.

### ARCH-002 — PASS

Le parser Markdown de Projects, son échappement et la décoration/normalisation des titres ont été déplacés dans le module pur `src/lib/project-content.ts`. Le sanitizer DOMPurify reste appliqué juste avant `dangerouslySetInnerHTML` dans le composant d’affichage. Le comportement de la vue détail et les classes HTML existantes sont conservés ; le build et l’ouverture d’un détail en navigateur local passent.

### ARCH-003 — PASS local

La vue détail, la visionneuse et le bouton de navigation projet sont séparés dans `src/components/projects/ProjectDetail.tsx`, `ProjectGallery.tsx` et `ProjectNavigation.tsx`. Les fonctions hash/history sont dans `src/lib/project-navigation.ts`. Les props exposent explicitement les données, le localisateur d’image, le rendu sanitizé et les callbacks. Le parcours local a validé l’ouverture d’un projet, l’URL `#project=...`, le retour par historique, l’ouverture d’une capture et la fermeture par Échap.

### ARCH-004 — PASS local

Les données de projets et d’articles restent séparées des libellés de présentation. Les 60 articles Dev Notes disposent maintenant d’une traduction anglaise dans `src/data/articles/en/`, fusionnée par ID avec les sources françaises. `npm run verify:translations` vérifie 60/60 articles, les balises HTML et les blocs de code. `englishDetails.ts` reste la source dédiée aux études de cas anglaises.

### ARCH-005 — PASS

Les 60 IDs d’articles sont maintenant uniques à l’échelle de `allArticles` grâce à un préfixe de catégorie (`culture-`, `devops-`, `tools-`, `architecture-`, `freelance-`). Le contrôle `scripts/verify-phase0-invariants.mjs` traite désormais tout doublon comme une erreur et le baseline a été régénéré après cette décision de schéma. Les titres, contenus, catégories et ordre des articles restent inchangés.

### ARCH-006 — PASS borné

Le fichier `src/components/ui/sonnerToast.ts` a été retiré après confirmation qu’il n’était référencé par aucun fichier source, script ou documentation. Les composants UI locaux et les dépendances Radix qui ne sont pas prouvés morts ont été conservés pour préserver le design system, `Toaster` et `Tooltip` ; aucune suppression de dépendance large n’a été faite par hypothèse.

### ARCH-007 — PASS

`.nvmrc`, `.github/workflows/ci.yml` et le README recommandent désormais Node.js `22.22.0`. Cette version a été observée localement avec npm `10.9.4` et reste compatible avec les engines `Node >=22.12.0` et `npm >=10` déclarés dans `package.json`.

### ARCH-008 — PASS

Le texte de `public/og-image.svg` corrige `ERP leger` en `ERP léger`. La compétence `GitHub Pages` est alignée sur le déploiement statique VPS. `public/site.webmanifest` et les liens d’icône de `index.html` référencent les icônes PNG `192x192` et `512x512` générées depuis le favicon existant ; leurs dimensions ont été vérifiées avec Pillow.

### Validation Phase 4

`npm run check` est PASS (lint, TypeScript strict, build Vite, `verify-build`, traductions et assets). `node scripts/verify-phase0-invariants.mjs` est PASS avec 21 projets, 60 articles, 36 assets et 51 URLs. `git diff --check` est PASS. La vérification locale couvre la page d’accueil, un détail projet, le retour, une galerie avec Échap et un article anglais. Aucun déploiement, commit ou changement distant n’a été effectué.

## 38. Exécution de la phase 5 — performance, tests et CI (2026-09-10)

La phase 5 est implémentée localement sur le build Vite existant. Les fiches projets, les galeries, les routes et les assets originaux ont été conservés.

### PERF-001 — chargement différé mesuré

`src/components/DeferredSection.tsx` remplace le `Suspense` global de `src/pages/Index.tsx`. Chaque section basse possède son propre fallback, une zone réservée pour éviter les déplacements de layout et une activation par IntersectionObserver à 320 px. Les hashes de sections et les hashes projet activent la bonne section avant le rendu, afin de préserver la navigation directe.

Le test Playwright observe les requêtes de scripts : au premier rendu, le chunk `About` peut être anticipé, tandis que `Projects` et `Skills` ne sont pas demandés ; après navigation vers `#projects`, la section devient visible et ses contrôles fonctionnent.

### PERF-002 — images responsive

Les 37 sources raster de `public/img_projects` sont décrites dans `scripts/phase5-image-manifest.json` et accompagnées de 135 WebP dans `public/img_optimized`. `src/lib/image-variants.ts` fournit les `srcSet` et dimensions aux cartes, détails et galeries ; `src/lib/project-content.ts` enrichit aussi les captures HTML détaillées. Les originaux restent les fallbacks.

`npm run verify:performance-assets` vérifie les sources, les variantes et toutes les références `img_projects`. Le contrôle PASS rapporte 33 408 475 octets d’originaux et 8 627 278 octets de variantes (ratio 0,258).

### QA-001 à QA-003 — tests unitaires, E2E et accessibilité

Vitest est configuré par `vitest.config.ts` pour `tests/unit`. Les 4 tests couvrent l’échappement/normalisation du contenu projet et le manifeste d’images ; `npm test` passe.

Playwright est configuré par `playwright.config.ts` sur le preview local. Les 5 tests passent et couvrent le chargement différé, le menu de langue, la navigation projet par hash et historique, la galerie avec Échap, la route 404 et le responsive. Le sweep Chrome couvre 320–2560 px sur les routes principales sans overflow. `@axe-core/playwright` ne remonte aucune violation `serious` ou `critical` sur la vue Projects ; le clavier du menu et de la galerie est exercé.

### QA-004 — liens critiques

`scripts/check-critical-links.mjs` réutilise l’inventaire d’URLs FND-003 en excluant les URLs d’exemple et de services locaux. Il effectue HEAD puis GET si nécessaire, deux retries, et classe les réponses anti-bot/réseau en inconnues au lieu de les présenter comme valides. Le dernier rapport local contient 32 URLs `ok` et une limite réseau, sans 404, 4xx critique ou 5xx.

### QA-005 et QA-006 — Outillage et responsive

L’ancien couple `.lighthouserc.json`/`@lhci/cli` a été retiré après l’audit des avis transitifs de développement. Le gate local actuel utilise lint, TypeScript, build, vérification des traductions et assets, tests unitaires/E2E, axe, liens critiques et audits npm, tous PASS.

La suite Playwright et le sweep Chrome vérifient l’absence d’overflow horizontal de 320 à 2560 px sur les routes principales. Les artefacts de test restent ignorés par Git.

### CI-001 — intégration

`.github/workflows/ci.yml` sépare les jobs `quality`, `unit`, `browser` et `links`, installe Chromium uniquement dans le job navigateur, conserve les permissions `contents: read`, le cache npm et les timeouts. Le job quality bloque le lint, TypeScript, le build, les traductions, les invariants d’assets et l’audit des dépendances de production ; les autres jobs bloquent les tests, l’axe et les liens critiques. Aucun run GitHub réel n’a été déclenché depuis cet environnement.

### Risque de dépendances de test

`npm audit --omit=dev --audit-level=high` et `npm audit --audit-level=high` sont PASS avec 0 vulnérabilité. `@lhci/cli` et sa chaîne transitive ont été retirés du dépôt.

### Validation de phase

Les commandes suivantes passent localement : `npm run lint`, `npm run typecheck`, `npm run build`, `npm run verify:build`, `npm run verify:translations`, `npm run verify:performance-assets`, `npm test`, `npm run test:e2e`, `npm run check:links`, les audits npm et `git diff --check`. Aucun déploiement, commit ou mutation distante n’a été exécuté.

## 39. Exécution HYBRID — fond maintenant, direction visuelle ensuite (2026-09-10)

Cette étape ferme les corrections de fond qui peuvent être faites sans choisir la nouvelle direction artistique. Les compositions hero, preuves, témoignages, mobile et Dev Notes restent donc volontairement dans leur forme actuelle jusqu’aux tâches DESIGN-REFONTE.

### HYB-001 — preuves et témoignages

**PASS fond.** Les claims `5+`, `30+`, `10+`, `Sous 48h` et les trois fourchettes de délai sont validés par le propriétaire, bornés par leur périmètre et décrits en section 34. Les témoignages conservés sont Éloi V., Luxury Auto, `J. DM`, Marino / Clé de Voûte et l’utilisateur ATS anonymisé. Le témoignage Aqualis déclaré fake est absent des données. Les noms publics, l’anonymisation et l’autorisation des photos/logos sont respectés. La présentation éditoriale statique et contextualisée reste planifiée dans DES-006/DES-008.

### HYB-002 — Typography

**PASS fond.** `@tailwindcss/typography` est maintenant activé dans `tailwind.config.ts`, ce qui génère les règles utilisées par les classes `prose` de Dev Notes. Le contenu, les catégories, le chargement asynchrone et la sanitization ne changent pas. La largeur de lecture et la composition de l’index seront redessinées dans DES-007.

### HYB-003 — proposition véridique

**PASS fond, hiérarchie visuelle différée.** Le premier texte du hero indique désormais les deux audiences déclarées par le propriétaire — équipes produit remote et clients freelance ciblés — le type de travail livré — applications métier et automatisations IA/n8n — et deux preuves autorisées — `5+` ans et `30+` projets. La ligne de soutien précise les livrables (portails, back-offices, APIs, workflows) et la passation documentée. Le poids relatif recrutement/freelance reste une décision de brief DESIGN-REFONTE, pas une hypothèse cachée dans le layout.

### HYB-004 — overflow mécanique

**PASS fond.** La section Testimonials utilise désormais un conteneur `w-full` local au flux au lieu de `w-screen` décalé par `left-1/2` et `translate-x-1/2`. Cette correction retire la cause mécanique observée sans imposer la future composition mobile. Le sweep Chrome 320–2560 px de QA-006 reste le contrôle de régression.

### Validation de sortie HYBRID

Les contrôles ont été rejoués après ces modifications : `npm run check`, `npm test`, `npm run test:e2e` et `git diff --check` sont PASS. Le build contient bien les règles `.prose` générées ; Playwright passe ses 5 parcours, dont axe et le responsive, et le sweep Chrome 320–2560 px ne détecte aucun overflow. Aucun contenu projet, lien de démo, asset original ou route n’a été supprimé ; aucun déploiement, commit ou changement distant n’a été exécuté. La direction visuelle anti-slop reste explicitement reportée à DES-001/DES-002.

## 40. Ré-audit P0 → HYBRID (2026-09-10)

Ce contrôle recroise les statuts documentés avec le checkout courant après l’exécution HYBRID. Les anciens constats de la matrice anti-vibecode restent conservés comme baseline historique ; les statuts courants ci-dessous font foi pour la livraison actuelle.

| Périmètre | Statut courant | Preuve rejouée ou vérifiée | Limite restante |
|---|---|---|---|
| FND-001 | PASS | `PROJECT_MEMORY.md`, `package.json`, lockfile, Node `22.22.0`, lint, typecheck et build cohérents | Aucun contrôle distant du checkout, volontairement hors périmètre |
| FND-002 | PASS local et live | Routes `/`, `/mentions-legales`, catch-all, preview, parcours Chrome et Caddy vérifiés ; inconnue live en 404 avec headers de sécurité |
| FND-003 | PASS | `verify-phase0-invariants.mjs` : 21 projets, 60 articles, 36 assets, 51 URLs, catégories et routes attendues ; baseline régénéré après la reformulation intentionnelle des métriques projet | Aucun écart d’invariant local |
| GOV-001 | PASS owner | Claims autorisés, témoignages, analytics, mentions légales, NDA et logos/photos consignés en section 34 | Aucun contenu propriétaire supplémentaire nécessaire pour P0-HYBRID |
| PROD-001 | PASS | `check-phase0-urls.mjs` et `check:links` : 32 URLs critiques OK, aucune 4xx/5xx critique ; Talao et Aqualis conservés avec les nouvelles URLs | La disponibilité de Talao a été confirmée par le propriétaire ; le lien QR n’est pas utilisé comme CTA projet |
| PROD-002 | PASS live | Caddy validé puis rechargé sur le VPS ; racine et mentions 200, inconnue et asset absent 404, asset existant 200, méthode POST 405, `www` redirigé en 301 |
| SEC-001 | PASS live | CSP active sur les réponses 200 et 404 ; Chrome live ne signale aucun blocage CSP sur l’accueil ni les mentions légales |
| SEC-002/003 | PASS runtime | `npm audit --omit=dev --audit-level=high` et audit complet : 0 vulnérabilité ; `@lhci/cli` retiré | Aucun avis npm restant |
| SEC-004/005 | PASS local | Actions CI épinglées sur SHA ; contrôles secrets courants et historique documentés sans match | Run GitHub réel encore non observé |
| BUG-001 à BUG-006 | PASS | Sélecteur clavier, headings, retry async, hash/history, fallback storage et sémantique images/icônes couverts par le code et les tests | Matrice lecteur d’écran/navigateur élargie seulement si demandée |
| ARCH-001 à ARCH-008 | PASS local | TypeScript strict, modules extraits, sanitization, IDs uniques, résidu mort supprimé, Node, manifest, libellés et traductions 60/60 vérifiés par `npm run check` | Aucun point local restant |
| PERF-001/002 | PASS local | Sections différées, 37 sources / 135 variantes WebP, ratio 0,258 contrôlés | Aucun |
| QA-001 à QA-006 | PASS local | Vitest 4/4, Playwright 5/5, axe sans violation bloquante, liens, audits npm et responsive Chrome 320–2560 px passés | Les autres moteurs restent hors périmètre selon la décision du propriétaire |
| CI-001 | PASS configuration | Workflow multi-jobs, audit runtime et checks versionnés | Run distant à observer après push autorisé |
| HYB-001 | PASS fond | Claims et témoignages validés ; métriques projet non validées reformulées sans chiffres | Réintroduire un chiffre seulement avec périmètre/date/preuve |
| HYB-002 | PASS fond | Plugin Typography présent et règles `.prose` générées dans le CSS de build | Refonte éditoriale future |
| HYB-003 | PASS fond | Proposition hero bilingue : audiences, travail livré et preuves autorisées explicités | Hiérarchie visuelle des deux audiences à décider dans DES-001 |
| HYB-004 | PASS fond | `Testimonials` en `w-full`, Playwright 375/768/1280 sans overflow | Composition responsive future |

### Verdict

P0 → HYBRID est **PASS localement et côté Caddy/CSP live**, avec une limite restante : l’observation d’un run CI distant après push. Les contrôles visuels anti-slop encore FAIL dans la matrice historique appartiennent à DESIGN-REFONTE ; ils ne sont pas présentés comme corrigés par cet audit.
