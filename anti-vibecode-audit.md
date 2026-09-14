# Audit complet du portfolio — Bastien Lopez

Date de l’audit : 14 septembre 2026

## Summary

- **Dépôt audité :** Portfolio React/Vite local, avec le build généré dans dist/ et une lecture HTTP de https://bastienlopez.fr.
- **Périmètre :** accueil, page freelance, projets et fiches détaillées, navigation, responsive, accessibilité, SEO/GEO, assets, contact, routes légales/404, configuration Caddy de référence et hygiène de release.
- **Mode :** audit seul. Aucun correctif de code, commit, push ou déploiement n’a été effectué.
- **Framework :** React + TypeScript + Vite + Tailwind/shadcn-ui.
- **Preuve :** statique, build-tested, rendu Playwright/Lighthouse et readback HTTP production.
- **Couverture :** 94/94 contrôles.
- **Comptage :** PASS 50 / FAIL 5 / JUSTIFIED 16 / N/A 20 / UNKNOWN 3.
- **Verdict : NO-GO avant push final.** Le code local est techniquement sain, mais la production actuelle ne sert pas les routes prerenderisées attendues et plusieurs affirmations chiffrées ou témoignages attendent une validation propriétaire.

Le build local est cohérent : npm run check passe, les 4 tests unitaires passent, les 11 parcours E2E passent, les deux pages obtiennent 100/100 en accessibilité, bonnes pratiques et SEO dans Lighthouse, et la vérification des dépendances de production ne trouve aucune vulnérabilité de niveau high ou supérieur. Ce résultat ne prouve pas que le VPS serve déjà ce build.

La lecture de production montre que /mentions-legales/ fonctionne, alors que /mentions-legales renvoie la homepage. Une route inconnue répond bien HTTP 404 mais reçoit le HTML de la homepage, avec son titre et ses robots index/follow, au lieu de la page NotFound prérenderisée. La page /freelance redirige vers /freelance/, puis fonctionne. Le contenu live de /freelance/ correspond à une version antérieure et contient encore l’ancien libellé de projet. Il faut donc corriger ou vérifier la configuration Caddy, publier le build voulu, puis refaire le readback.

## Findings to fix

| Priorité | ID | Zone | Statut | Preuve | Pourquoi | Action |
|---|---|---|---|---|---|---|
| P1 | L01, L03, L04 | Routes légales et 404 en production | FAIL | Readback du 14/09 : /mentions-legales = 200 avec titre/corps homepage ; route inconnue = 404 avec corps homepage. dist/mentions-legales/index.html et dist/404.html sont corrects localement. | Mauvaise page et métadonnées indexables possibles pour une URL légale ou inconnue. | Servir mentions-legales/index.html pour la forme publiée choisie et 404.html dans handle_errors 404, puis vérifier les statuts, titres, canonical et robots sur le domaine. |
| P1 | P15 | Chiffres et résultats | FAIL | Claims présents dans About.tsx, Freelance.tsx et les fiches : 7+, 30+, 10+, environ 90 %, +60 %, +15 %, volumes/profils de projets. Aucun justificatif ou source de mesure n’est versionné. | Une preuve chiffrée non sourcée peut dégrader la confiance et constituer un signal de contenu fabriqué. | Confirmer chaque chiffre avec une source propriétaire ou retirer/nuancer le chiffre avant publication. |
| P1 | P04 | Témoignages | UNKNOWN | src/data/testimonials.ts contient noms, avatars et citations ; aucune preuve de consentement, source ou validation n’est présente dans le dépôt. | Un témoignage non authentifié doit être retiré plutôt que présenté comme preuve client. | Confirmer l’authenticité, l’autorisation d’usage et l’anonymisation, ou retirer l’élément concerné. |
| P1 | L15 | Mentions légales / confidentialité | UNKNOWN | src/pages/Legal.tsx décrit Bastien, OVHcloud, Search Console et l’absence de formulaire/script côté client, mais reporte les informations d’immatriculation au devis/facture. | La conformité et l’exactitude des informations de l’éditeur restent une décision du propriétaire et du conseil compétent. | Valider les mentions obligatoires, l’adresse/immatriculation et la description réelle des traitements avant mise en ligne. |
| P2 | L05 | Image sociale | UNKNOWN | index.html référence og-image.svg et Twitter avec 1200×630 ; l’asset est servi, mais aucun test de rendu par crawler social n’a été fait. | Certains crawlers ou plateformes peuvent traiter différemment un SVG Open Graph. | Tester une URL partagée sur les plateformes visées ; fournir un PNG 1200×630 si nécessaire. |
| P2 | Release | Écart dépôt/build/live | FAIL de processus | Working tree non propre : nombreuses modifications, suppressions de documents historiques et nouvel asset non suivi. Le live contient une copie plus ancienne que dist/. | Un push sans sélection explicite peut inclure ou omettre des changements non liés ; le résultat publié ne serait pas traçable. | Revoir le diff, sélectionner les fichiers voulus, créer le commit de release, puis déployer explicitement. Aucun nettoyage automatique n’a été fait par cet audit. |
| P3 | D21 | Flèche de défilement | FAIL | src/components/Hero.tsx applique animate-bounce à la flèche #about. | Une animation en boucle sur une action de simple défilement est un résidu visuel dispensable. | Facultatif : supprimer le rebond ou le limiter à une animation non continue, en conservant l’accès clavier. |

## Fixes applied

| ID | Fichiers changés | Changement | Vérification |
|---|---|---|---|
| — | Aucun fichier applicatif | Audit uniquement ; aucun correctif n’a été appliqué. | Les commandes et preuves sont listées ci-dessous. |

## Justified choices

| ID | Preuve | Décision |
|---|---|---|
| W01, W03, W09 | Titres de projets et CTA utilisent une ponctuation et des verbes liés au contenu ; les emojis décoratifs des fiches/notes sont retirés au rendu par removeDecorativeEmoji. | Conserver. Les tirets servent la hiérarchie des intitulés ; les mots comme « Explorer » sont des CTA contextualisés. |
| P02, P08, P20 | Palette sombre cyan/verte, grille néon et wordmark textuel cohérents avec le portfolio ; pas de badge générateur visible. | Conserver comme système de marque, sans l’interpréter comme un défaut de template. |
| D06, D07, D08, D12, D15 | Cartes, blur de navigation/visionneuse, typographie sans-serif et icônes de méthode ont une fonction identifiable et une échelle de composants. | Conserver ; usage limité et cohérent. |
| D18, D19, D23 | Glow et grille sont présents dans le hero et la page freelance comme signature visuelle, avec une palette tokenisée ; ils ne sont pas disséminés dans chaque bloc. | Conserver ; surveiller la densité sur les futures pages. |
| D20 | Star représente la catégorie Open Source, pas une action IA répétée. | Conserver. |
| S15 | DOMPurify.sanitize protège le contenu HTML des articles/projets et les blocs de code passent par échappement. | Conserver ; le scanner textuel qui signale dangerouslySetInnerHTML est un faux positif traité par la chaîne de sanitation. |

## Unknown / owner input needed

| ID | Preuve manquante ou décision propriétaire |
|---|---|
| P04 | Validation de l’authenticité, du consentement et du niveau d’anonymisation des trois avis affichés. |
| P15 | Source et date pour 7+ ans, 30+ projets, 10+ secteurs, environ 90 %, +60 %, +15 % et les métriques présentes dans les fiches. |
| L05 | Validation du rendu des cartes sociales par les plateformes réellement utilisées ; le SVG 1200×630 est correct statiquement mais non testé par crawler. |
| L15 | Validation des mentions légales, des informations d’éditeur et du périmètre réel de Search Console, hébergeur et journaux serveur. |
| Déploiement | Confirmation de la configuration Caddy active et de la révision effectivement publiée sur le VPS. |
| Assets | Confirmation des droits/provenance des captures et avatars utilisés sur le portfolio public. |

## Validation performed

- [x] Linter : npm run lint — PASS.
- [x] Typecheck : npm run typecheck — PASS.
- [x] Tests unitaires : npm test — 1 fichier, 4 tests PASS.
- [x] Build production local : npm run build — PASS ; prérendu accueil, freelance, mentions légales et 404.
- [x] Garde de build : npm run verify:build — PASS.
- [x] Traductions : npm run verify:translations — 60/60 entrées PASS.
- [x] Assets : npm run verify:performance-assets — 135 variantes WebP référencées PASS.
- [x] Dépendances : npm audit --omit=dev --audit-level=high — 0 vulnérabilité signalée.
- [x] Tests navigateur et axe : npm run test:e2e — 11/11 PASS, dont 320/375/768/1280/1920 px, navigation clavier, galerie et routes.
- [x] Liens critiques : npm run check:links — 29 OK, 0 échec, 1 inconnu (LinkedIn anti-bot HTTP 999).
- [x] Lighthouse local : accueil performance 89, accessibilité 100, bonnes pratiques 100, SEO 100 ; freelance performance 88, accessibilité 100, bonnes pratiques 100, SEO 100.
- [x] Smoke rendu desktop : captures Playwright à 1920×1080 et 2560×1440 ; aucune largeur de document supérieure à la fenêtre.
- [x] Smoke rendu mobile : captures Playwright à 375×812 ; aucune largeur de document supérieure à la fenêtre.
- [x] Click-through CTA/routes : parcours E2E pour #projects, /freelance, 404, langue, galerie et CTA portfolio.
- [x] Contact : vérification de la présence des liens mailto/GitHub/LinkedIn ; aucun formulaire ou transaction n’est exposé.
- [x] Readback production : HTTPS, HSTS, CSP, X-Frame-Options, nosniff, referrer-policy et permissions-policy présents ; routes et contenu live comparés au build local.
- [ ] Configuration Caddy validée localement : N/D, binaire Caddy absent du poste.
- [ ] Crawler social réel : N/D.
- [ ] Validation propriétaire des chiffres, avis, droits d’image et mentions légales : N/D.

## 94-control checklist matrix

### Writing and copy

| ID | Statut | Preuve / commentaire |
|---|---|---|
| W01 | JUSTIFIED | Les tirets cadrent des titres de projets et de sections ; pas de dépendance dans chaque phrase. |
| W02 | PASS | Pas de répétition de la formule « pas X mais Y » dans le copy principal. |
| W03 | JUSTIFIED | Les emojis historiques sont supprimés au rendu des notes et fiches ; les rares contenus d’article restent du contenu éditorial source. |
| W04 | PASS | Copy hero, services et fiches : paragraphes courts et listes limitées aux informations parallèles. |
| W05 | PASS | Les groupes de services et étapes correspondent à des concepts distincts, pas à une cadence automatique. |
| W06 | PASS | Les réserves sont limitées aux faits réellement conditionnels. |
| W07 | PASS | Les longueurs de paragraphes varient entre hero, services, FAQ et fiches. |
| W08 | PASS | Les sections commencent par une proposition ou une réponse, sans reformuler une question utilisateur. |
| W09 | JUSTIFIED | « Explorer » est réservé aux CTA d’automatisation et reste descriptif ; aucun remplissage générique répété. |
| W10 | PASS | Typographie sobre, lisible et cohérente avec un portfolio professionnel bilingue. |

### Immediate generated-site signals

| ID | Statut | Preuve / commentaire |
|---|---|---|
| P01 | PASS | Les URLs canoniques et le site public utilisent bastienlopez.fr ; les sous-domaines GitHub sont limités aux démos de projets. |
| P02 | JUSTIFIED | Le dégradé est sombre cyan/vert, tokenisé et cohérent avec la marque ; ce n’est pas un violet/bleu par défaut. |
| P03 | PASS | Les visuels observés sont des captures de produits/projets ; aucun artefact synthétique évident dans les rendus contrôlés. |
| P04 | UNKNOWN | Avis, avatars et citations présents dans src/data/testimonials.ts, mais preuve de consentement absente du dépôt. |
| P05 | PASS | E2E et check de liens couvrent les CTA, routes, démos et boutons de fiches ; aucun contrôle principal sans comportement. |
| P06 | PASS | Chargement différé ciblé par DeferredSection; pas d’animation d’entrée généralisée sur chaque bloc. |
| P07 | JUSTIFIED | L’accueil est une présentation compacte, tandis que freelance, mentions légales et fiches ont des parcours distincts. |
| P08 | JUSTIFIED | Le nom texte est un wordmark volontaire ; aucune fausse promesse d’un logo graphique n’est faite. |
| P09 | PASS | favicon.ico, icônes 192/512 et manifest présents localement et servis en production. |
| P10 | PASS | Le titre principal n’a pas de boucle de changement de couleur ; le shimmer est limité au titre et respecte reduced-motion pour la frappe. |
| P11 | PASS | La page légale est remplie et cohérente avec l’absence de compte, formulaire et script d’audience côté client. |
| P12 | N/A | Aucun tunnel commercial, abonnement ou condition d’utilisation produit ne rend une page de terms nécessaire à ce stade. |
| P13 | PASS | Aucun compteur de visiteurs en direct simulé. |
| P14 | PASS | Aucun compteur générique de clients/utilisateurs ; les volumes projet sont traités par P15. |
| P15 | FAIL | Plusieurs métriques de preuve n’ont pas de source versionnée ou référence propriétaire. |
| P16 | PASS | Les icônes d’interface sont Lucide ; les emojis décoratifs sont retirés dans les surfaces concernées. |
| P17 | PASS | Le hero indique clairement le développeur, les applications métier, APIs et automatisations n8n. |
| P18 | PASS | Aucune police manuscrite/cursive décorative. |
| P19 | PASS | Aucun badge Lovable, Vercel, builder ou attribution de template visible. |
| P20 | JUSTIFIED | Le copy reste spécifique aux services et projets ; les patterns détectés dans les articles sont du contenu éditorial, pas la voix globale du site. |

### Generic design defaults

| ID | Statut | Preuve / commentaire |
|---|---|---|
| D01 | PASS | Les dégradés sont limités au hero et aux surfaces de marque, sans collision multicolore agressive. |
| D02 | PASS | Les icônes visibles sont dans des composants fonctionnels ou des marqueurs de section. |
| D03 | PASS | Le canvas sombre est intentionnel et fournit un contraste stable avec les surfaces de carte. |
| D04 | PASS | Palette cyan/vert/orange d’action définie par tokens et rôles sémantiques. |
| D05 | PASS | Les cartes et boutons utilisent majoritairement shadow-none; les ombres sont réservées à la visionneuse/menu. |
| D06 | JUSTIFIED | Les grilles de projets et avis regroupent des unités de contenu comparables et indépendantes. |
| D07 | JUSTIFIED | Le blur sert la profondeur de la navbar et de la visionneuse, pas tous les composants. |
| D08 | JUSTIFIED | Sans-serif système choisie pour la lisibilité du produit et des longues fiches ; aucune police décorative nécessaire. |
| D09 | PASS | Aucun bandeau accent pleine largeur sans rôle de structure. |
| D10 | PASS | Pas de bento irrégulier gratuit ; sections et grilles suivent la hiérarchie des données. |
| D11 | PASS | Les blocs code appartiennent aux articles techniques ; aucune fausse fenêtre terminal dans le marketing. |
| D12 | JUSTIFIED | Les checks cyan structurent les principes de travail et restent limités à cette section. |
| D13 | N/A | Aucun prix ni architecture de trois offres. |
| D14 | PASS | Captures, galeries, livrables et fiches détaillées démontrent les projets. |
| D15 | JUSTIFIED | L’échelle rounded-sm/md/lg distingue fiches, boutons, badges et modales. |
| D16 | PASS | Palette cyan/verte/orange sur fond bleu-noir, sans esthétique purple-on-black d’IA SaaS. |
| D17 | PASS | DeferredSection, Suspense, états de chargement/erreur/retry des Dev Notes fournissent un état d’attente visible. |
| D18 | JUSTIFIED | Glow utilisé comme signature du hero/grille, pas comme orbe répétée dans chaque section. |
| D19 | JUSTIFIED | La grille carrée du hero est une signature visuelle et reste cantonnée aux zones prévues. |
| D20 | JUSTIFIED | L’étoile est l’icône de catégorie Open Source, non un symbole universel d’action IA. |
| D21 | FAIL | Flèche #about en animate-bounce ; polish P3 recommandé. |
| D22 | PASS | Les états hover observés concernent des contrôles interactifs ; pas de transformation trompeuse sur texte statique. |
| D23 | JUSTIFIED | Le néon est tokenisé et cohérent avec l’identité du portfolio, sans palette arbitraire par section. |
| D24 | PASS | Pas de palette pastel uniforme. |

### Launch readiness and completeness

| ID | Statut | Preuve / commentaire |
|---|---|---|
| L01 | FAIL | Local 404.html correct, mais production route inconnue sert le corps homepage sous statut 404. |
| L02 | PASS | CTA projets/contact visibles dans le hero accueil et CTA parler du projet/works dans le hero freelance. |
| L03 | FAIL | Local titles uniques ; readback production de /mentions-legales sans slash utilise le titre homepage. |
| L04 | FAIL | Local descriptions uniques ; même écart production pour /mentions-legales et les chemins inconnus. |
| L05 | UNKNOWN | OG/Twitter et asset 1200×630 présents ; validation par crawler social non réalisée. |
| L06 | PASS | Favicon, icônes plateforme et manifest présents et servis. |
| L07 | PASS | public/robots.txt autorise le site public et référence le sitemap canonique. |
| L08 | PASS | public/sitemap.xml contient les routes indexables /, /freelance et /mentions-legales; servi HTTP 200. |
| L09 | PASS | Alt utiles sur captures/projets ; avatars décoratifs ont alt="" à côté du nom textuel. |
| L10 | PASS | E2E et captures couvrent 320/375/768/1280/1920/2560 px sans débordement horizontal. |
| L11 | PASS | CTA hero restent visibles et atteignables à 375 px ; click-through E2E. |
| L12 | PASS | Suspense, chargement différé, retry Dev Notes et états de visionneuse couverts. |
| L13 | N/A | Pas de formulaire public avec champs à valider. |
| L14 | N/A | Pas de soumission/transaction côté navigateur ; contact par mailto et réseaux réels. |
| L15 | UNKNOWN | Disclosure présente, mais validation juridique et inventaire complet des traitements restent à faire. |
| L16 | N/A | Portfolio informatif sans tunnel de vente ni compte ; aucun terms flow applicable identifié. |
| L17 | N/A | Aucun script d’audience côté client ni cookie non essentiel déclaré dans le build. |
| L18 | N/A | Mesure client volontairement omise ; Search Console est externe et mentionné dans la page légale. |
| L19 | PASS | Email, GitHub et LinkedIn sont présents dans navbar/footer/contact ; LinkedIn est le seul check externe anti-bot inconnu. |
| L20 | PASS | Manifest de variantes WebP, srcSet, dimensions, lazy loading et check de 135 fichiers ; Lighthouse reste à 88/89. |

### Security smoke check

| ID | Statut | Preuve / commentaire |
|---|---|---|
| S01 | PASS | import.meta.env ne sert que BASE_URL dans l’application ; aucun secret privé dans le bundle ou les assets. |
| S02 | PASS | Recherche historique redacted sur patterns de clés/mots de passe : exemples pédagogiques uniquement, aucun secret valide identifié. |
| S03 | N/A | Site statique sans clé service/admin ou backend connecté au navigateur. |
| S04 | N/A | Aucune base/table/collection exposée par ce dépôt. |
| S05 | N/A | Aucune donnée sensible persistée par ce site statique. |
| S06 | N/A | Aucune zone authentifiée. |
| S07 | N/A | Aucun identifiant de ressource utilisateur ni endpoint de données. |
| S08 | N/A | Aucun endpoint acceptant des champs privilégiés. |
| S09 | N/A | Aucune session cookie applicative. |
| S10 | N/A | Aucun mot de passe stocké. |
| S11 | N/A | Aucun login ou endpoint sensible. |
| S12 | N/A | Aucun formulaire public, inscription ou commentaire. |
| S13 | PASS | Aucun SQL exécuté par l’application ; les snippets SQL présents sont éditoriaux et non exécutés. |
| S14 | N/A | Aucune frontière serveur recevant une entrée utilisateur dans ce dépôt. |
| S15 | PASS | DOMPurify protège HTML articles/projets ; escapeHtml protège les blocs code avant rendu. |
| S16 | N/A | Aucun upload. |
| S17 | N/A | Aucune réponse API ou sérialiseur de données. |
| S18 | PASS | Production renvoie CSP, X-Frame-Options DENY, nosniff, HSTS, referrer-policy et permissions-policy. |
| S19 | PASS | HTTP redirige en 308 vers HTTPS ; les routes publiques HTTPS répondent. |
| S20 | PASS | npm audit --omit=dev --audit-level=high : 0 vulnérabilité ; la couverture ne remplace pas une revue de dépendances dev exhaustive. |

## Remaining issues

1. **Bloquant avant push/deploy :** corriger le mapping Caddy des routes sans slash et servir la page 404 prérenderisée au lieu de la homepage.
2. **Bloquant de crédibilité :** valider les métriques et les avis, ou retirer les éléments non justifiables.
3. **Bloquant de conformité propriétaire :** faire relire les mentions légales et la réalité des traitements déclarés.
4. **Gate de release :** revoir le diff non commité et confirmer exactement les fichiers à publier ; cet audit n’a fait aucun reset/nettoyage.
5. **À vérifier après publication :** /, /freelance, /freelance/, /mentions-legales, /mentions-legales/, une route inconnue, robots.txt, sitemap.xml, favicon, PDF CV, www→canonique, titres/descriptions et liens de production.
6. **Polish non bloquant :** remplacer l’animation animate-bounce de la flèche hero et recontrôler les scores Lighthouse après correction éventuelle.

Tant que les points 1 à 4 ne sont pas levés et relus sur le domaine public, le portfolio ne doit pas être annoncé comme prêt pour la production.
