# Audit complet refonte — Site Quality Audit

Date du contrôle : **21 septembre 2026**
Mode : **audit, correctifs locaux et revalidation**. Le build local contient les correctifs décrits ci-dessous ; la production devra être republiée puis recontrôlée séparément.

## 1. Executive summary

### Site audité

Le dépôt contient un seul site frontend public : le portfolio de Bastien Lopez, servi sur `https://bastienlopez.fr`. Il s’agit d’une application React/TypeScript/Vite avec Tailwind CSS et React Router. Les données de projets et de Dev Notes sont intégrées au même frontend ; aucun deuxième site frontend indépendant n’a été trouvé à la racine du dépôt.

Le verdict local est **prêt pour la publication sur le périmètre contrôlé**. Les défauts reproductibles de l’audit initial ont été corrigés et revalidés : la police de marque est chargée en local, la ligne de signature ne déborde plus, le hero desktop reste lisible en 1080p et le clic Freelance réinitialise le scroll avant le montage de la route. La production correspond encore au déploiement précédent tant que le nouveau build n’est pas publié.

| Indicateur | Verdict |
| --- | --- |
| Readiness globale | **Bonne en local, publication à revalider** : correctifs D08/L10 validés localement |
| Qualité visuelle | **Bonne** : hiérarchie, palette et typographie de marque cohérentes |
| Generic / AI-looking | **Faible** : la typographie système a été remplacée par une police de marque self-hosted |
| P0 Critical | **0** |
| P1 High | **0** |
| P2 Medium | **2** : autorité GEO externe, rotation historique des secrets |
| P3 Low | **0 finding** ; quelques polishes optionnels seulement |

### SEO et GEO

Le socle technique est solide et vérifié : `npm run audit:production` confirme **38 URLs du sitemap, 38/38 réponses finales en 200, aucune redirection initiale**, ainsi que la cohérence de `robots.txt`, `sitemap.xml`, `llms.txt` et des métadonnées. Les titres, descriptions, canoniques, JSON-LD, Open Graph et données d’identité sont présents sur les routes publiques.

La limite actuelle est externe au code : l’indexation Search Console/Bing, les citations tierces et la recommandation effective par un LLM ne peuvent pas être prouvées depuis ce dépôt. Elles restent donc des contrôles manuels à suivre, pas des échecs techniques du site.

## 2. Scope

### Site et architecture

- **Site** : portfolio personnel Bastien Lopez, domaine root `bastienlopez.fr`.
- **Stack** : React 18, TypeScript, Vite, Tailwind CSS, React Router, `lucide-react`, DOMPurify/Mermaid pour les contenus techniques.
- **Design system** : tokens HSL dans `src/index.css`, surfaces navy, accents cyan/vert et CTA orange, composants locaux adaptés au portfolio.
- **Assets** : favicon, icônes PWA, image Open Graph, captures de projets et assets WebP optimisés.

### Routes et pages inspectées

Le sitemap et le build exposent 38 routes publiques : accueil, `/freelance`, `/creation-site-internet-reims`, mentions légales, services, 22 fiches projet et 10 Dev Notes. Les inspections rendues ont couvert au minimum :

- `/`
- `/freelance`
- `/creation-site-internet-reims`
- `/services/applications-metier`
- `/notes/creer-site-internet-entreprise-cadrage`
- `/projets/altme-wallet-provider`
- `/mentions-legales`
- une route inconnue pour le comportement 404
- navigation, sections projets, Dev Notes, FAQ, CTA et footer via les pages représentatives.

### Environnements et largeurs

- **Production HTTP** : `https://bastienlopez.fr`, headers, routes, fichiers SEO/GEO et redirections.
- **Navigateur public** : Playwright Chromium sans erreurs console ni requêtes échouées sur les routes représentatives.
- **Desktop** : 1440 px.
- **Tablette** : 820 px.
- **Mobile** : 375 px.
- **Statique** : sources, `index.html`, `src/App.tsx`, `src/lib/i18n.tsx`, `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`.

### Validations impossibles ou externes

- Les données Search Console, Bing Webmaster Tools et les positions/réponses effectives des LLM ne sont pas accessibles depuis le dépôt.
- La rotation historique de secrets chez les fournisseurs ne peut pas être prouvée par un scan local.
- Un lien LinkedIn renvoie `999` à l’outil de liens, limite anti-bot externe ; cela ne prouve pas un lien cassé.
- Le contrôle visuel ne remplace pas une session complète de lecteur d’écran avec utilisateurs réels.

## 3. Anti-vibecode audit

### Synthèse des 94 contrôles

| Statut | Nombre |
| --- | ---: |
| PASS | **52** |
| FAIL | **0** |
| JUSTIFIED | **18** |
| N/A | **23** |
| UNKNOWN | **1** |
| **Total** | **94** |

Les deux défauts de l’audit initial, **D08** et **L10**, sont maintenant `PASS` dans le working tree local : Manrope est chargé depuis `/public/fonts`, et `/services/applications-metier` ne déborde plus à 375, 820 ou 1440 px. Le readback de production doit être relancé après publication.

### Listing des 18 contrôles `JUSTIFIED`

| ID | Justification courte |
| --- | --- |
| W01 | Tirets longs ponctuels et cohérents avec les titres français. |
| W02 | Contrastes pédagogiques limités aux notes et FAQ. |
| W03 | Emojis cantonnés à certains contenus techniques, sans structurer les CTA. |
| W05 | Groupes de trois correspondant à des stacks, offres ou preuves comparables. |
| W08 | Questions réservées aux FAQ et suivies d’une réponse utile. |
| P02 | Accents cyan/vert/orange issus des tokens de marque, sans violet/bleu par défaut. |
| P08 | Nom textuel utilisé volontairement comme wordmark. |
| P10 | Dégradé cyan→vert limité aux éléments de marque et sans animation de couleur en boucle. |
| P16 | Emojis des notes utilisés comme contenu pédagogique, pas comme iconographie produit. |
| D01 | Gradients limités aux tokens cyan/vert de la marque. |
| D03 | Fond sombre intentionnel avec texte clair et contraste vérifié. |
| D06 | Grilles réservées à des contenus réellement comparables. |
| D07 | Blur limité à la navigation et à la visionneuse, avec un rôle fonctionnel. |
| D11 | Blocs code/terminal réservés aux Dev Notes techniques. |
| D12 | Alternance maîtrisée de repères numérotés, listes et prose. |
| D18 | Halos utilisés pour les héros et études de cas, sans répétition décorative globale. |
| D20 | `lucide-react` fournit une iconographie cohérente liée aux actions. |
| D23 | Cyan sur fond sombre correspondant à la palette de marque. |

### A. Écriture et copy — W01 à W10

| ID | Statut | Preuve / remarque |
| --- | --- | --- |
| W01 | JUSTIFIED | Les tirets longs restent ponctuels et cohérents avec les titres français. |
| W02 | JUSTIFIED | Les contrastes pédagogiques restent limités à des formulations de notes et FAQ. |
| W03 | JUSTIFIED | Les emojis sont cantonnés à certains contenus techniques ; ils ne structurent pas les CTA. |
| W04 | PASS | Les sections servent la lecture sans transformer chaque phrase en liste sur-structurée. |
| W05 | JUSTIFIED | Les groupes de trois correspondent aux stacks, offres ou preuves réellement comparables. |
| W06 | PASS | Les formulations principales restent directes et ne sont pas affaiblies par des qualificatifs empilés. |
| W07 | PASS | Les longueurs de paragraphes varient selon le contenu et les pages. |
| W08 | JUSTIFIED | Les questions sont réservées aux FAQ, puis reçoivent une réponse utile. |
| W09 | PASS | Le copy principal évite les marqueurs génériques de génération relevés par la grille. |
| W10 | PASS | La typographie éditoriale reste professionnelle et cohérente avec la voix française. |

### B. Signaux de site généré — P01 à P20

| ID | Statut | Preuve / remarque |
| --- | --- | --- |
| P01 | PASS | Le site public utilise le domaine réel `bastienlopez.fr`. |
| P02 | JUSTIFIED | Les accents cyan/vert/orange sont les tokens de marque ; aucun dégradé violet/bleu par défaut n’est utilisé. |
| P03 | PASS | Les visuels sont des captures et assets de projets identifiables, sans artefact génératif observé. |
| P04 | PASS | Les témoignages ont été confirmés comme réels et publiés avec l’accord du propriétaire. |
| P05 | PASS | Les CTA, navs, fiches projet et liens critiques ont des destinations ou comportements contrôlés. |
| P06 | PASS | Aucun scroll-reveal uniforme ne bloque la compréhension du contenu. |
| P07 | PASS | Les services, fiches projet, Dev Notes et mentions légales ont des routes dédiées. |
| P08 | JUSTIFIED | Le nom textuel sert de wordmark volontaire et cohérent avec la navigation. |
| P09 | PASS | `favicon.ico`, icônes PNG et manifest sont présents et servis en production. |
| P10 | JUSTIFIED | Le dégradé cyan→vert des titres est limité aux éléments de marque et n’anime pas en boucle la couleur. |
| P11 | N/A | Aucun espace de confidentialité distinct n’est requis par le périmètre statique actuel ; les mentions légales décrivent l’absence de tracking navigateur. |
| P12 | N/A | Aucun parcours de vente, compte ou CGV n’est présent sur ce portfolio vitrine. |
| P13 | PASS | Aucun compteur de visiteurs en temps réel simulé. |
| P14 | PASS | Aucun compteur de clients/utilisateurs non sourcé dans les éléments contrôlés. |
| P15 | PASS | Les seules expériences chiffrées visibles sont les informations déclarées et cohérentes du portfolio. |
| P16 | JUSTIFIED | Les emojis des notes sont du contenu pédagogique et ne remplacent pas le système d’icônes produit. |
| P17 | PASS | Le hero explicite métier, zone, services et cas d’usage. |
| P18 | PASS | Aucune police manuscrite décorative. |
| P19 | PASS | Aucun badge de générateur ou de plateforme laissé par inadvertance. |
| P20 | PASS | Les marqueurs de copy ne s’accumulent pas au point de créer une voix automatisée uniforme. |

### C. Defaults de design — D01 à D24

| ID | Statut | Preuve / remarque |
| --- | --- | --- |
| D01 | JUSTIFIED | Les gradients restent dans les tokens cyan/vert et structurent la marque. |
| D02 | PASS | Pas d’icônes flottantes décoratives dans les marges. |
| D03 | JUSTIFIED | Le fond sombre est intentionnel, avec texte clair et contraste vérifié. |
| D04 | PASS | Les couleurs sont tokenisées par rôles sémantiques. |
| D05 | PASS | Les ombres, bordures et glows ne sont pas appliqués mécaniquement à tous les objets. |
| D06 | JUSTIFIED | Les grilles projets, stacks et témoignages regroupent des contenus réellement comparables. |
| D07 | JUSTIFIED | Le blur est limité à la navigation et à la visionneuse, où il fournit une profondeur fonctionnelle. |
| D08 | PASS | `tailwind.config.ts` expose Manrope comme famille sans et `src/index.css` charge `/fonts/manrope-latin.woff2` en self-hosted ; Playwright confirme Manrope sur le body et les H1. |
| D09 | PASS | Aucun bandeau pleine largeur purement décoratif. |
| D10 | PASS | Pas de bento appliqué par réflexe. |
| D11 | JUSTIFIED | Les blocs code/terminal apparaissent seulement dans les Dev Notes techniques. |
| D12 | JUSTIFIED | Les contenus alternent repères numérotés, listes et prose ; tout n’est pas préfixé d’une coche verte. |
| D13 | N/A | Aucune offre tarifaire en trois niveaux. |
| D14 | PASS | Captures, études de cas, démos et liens de projet montrent des preuves concrètes. |
| D15 | PASS | Les composants locaux adaptent les primitives UI ; les cartes projet éditoriales n’ont pas le chrome stock uniforme. |
| D16 | PASS | L’esthétique n’est pas le thème IA violet/noir par défaut. |
| D17 | N/A | Le site est principalement statique et n’attend pas de mutation réseau métier. |
| D18 | JUSTIFIED | Les halos servent les héros et les études de cas, sans blobs décoratifs partout. |
| D19 | PASS | Pas de texture dot-grid/noise généralisée servant uniquement de garniture. |
| D20 | JUSTIFIED | `lucide-react` fournit une iconographie cohérente ; les icônes sont associées à des actions distinctes. |
| D21 | PASS | Pas de curseur suiveur, trail ou flèche de scroll en boucle sans fonction. |
| D22 | PASS | Les interactions hover/focus restent lisibles et attachées aux contrôles interactifs. |
| D23 | JUSTIFIED | Le cyan sur fond sombre est la palette de marque, pas une esthétique néon arbitraire. |
| D24 | PASS | Pas de palette pastel indifférenciée. |

### D. Readiness et complétude — L01 à L20

| ID | Statut | Preuve / remarque |
| --- | --- | --- |
| L01 | PASS | La route inconnue renvoie HTTP 404 et affiche une page de récupération avec retour accueil. |
| L02 | PASS | Les CTA principaux sont visibles dès le premier écran des pages d’entrée. |
| L03 | PASS | Les routes publiques exposent des titres uniques, vérifiés par le build et le readback production. |
| L04 | PASS | Les routes publiques exposent des descriptions uniques et cohérentes avec leur intention. |
| L05 | PASS | Open Graph, Twitter Card et image 1200×630 sont présents. |
| L06 | PASS | Favicon, icônes PWA et manifest sont servis en production. |
| L07 | PASS | `robots.txt` autorise le crawl public et déclare le sitemap. |
| L08 | PASS | `sitemap.xml` contient 38 URLs canoniques uniques avec `lastmod`. |
| L09 | PASS | Les images de contenu ont des alt utiles ; les éléments décoratifs sont neutralisés pour les lecteurs d’écran. |
| L10 | PASS | `Service.tsx` autorise le shrink/wrap des items de signature ; Playwright confirme `scrollWidth === innerWidth` à 375, 820 et 1440 px. |
| L11 | PASS | Les CTA restent atteignables sur mobile et aucune action primaire n’est cachée. |
| L12 | N/A | Pas de mutation ou de chargement métier nécessitant un état d’attente. |
| L13 | N/A | Aucun formulaire public de saisie à valider. |
| L14 | N/A | Aucun workflow de soumission ou transaction. |
| L15 | PASS | Les mentions légales correspondent au site statique et à l’absence de tracking navigateur. |
| L16 | N/A | Pas de vente, compte ou abonnement nécessitant des conditions générales spécifiques. |
| L17 | N/A | Aucun cookie non essentiel ni script d’audience côté client observé. |
| L18 | N/A | La mesure est volontairement limitée à Search Console, déclarée dans les mentions légales. |
| L19 | PASS | Email de contact et profils externes sont accessibles. |
| L20 | PASS | Les assets image optimisés/WebP et les attributs de chargement sont présents. |

### E. Sécurité smoke — S01 à S20

| ID | Statut | Preuve / remarque |
| --- | --- | --- |
| S01 | PASS | Aucun secret runtime dans les bundles client ; les valeurs trouvées sont des exemples pédagogiques. |
| S02 | UNKNOWN | Aucun secret détecté dans le contrôle courant, mais la rotation historique côté fournisseurs ne peut pas être prouvée localement. |
| S03 | N/A | Aucun backend administrateur ni credential de service exposé par ce frontend. |
| S04 | N/A | Aucune base de données exposée par le portfolio statique. |
| S05 | N/A | Aucun stockage de données sensibles côté application. |
| S06 | N/A | Aucune authentification. |
| S07 | N/A | Aucun objet privé accessible par identifiant. |
| S08 | N/A | Aucune API d’administration ni mass assignment. |
| S09 | N/A | Pas de session cookie. |
| S10 | N/A | Aucun mot de passe stocké. |
| S11 | N/A | Aucun login ni endpoint sensible. |
| S12 | N/A | Aucun formulaire public ni commentaire. |
| S13 | PASS | Aucun runtime SQL ; les requêtes des articles sont du code d’exemple. |
| S14 | N/A | Aucune frontière serveur recevant une saisie utilisateur. |
| S15 | PASS | Le rendu des notes passe par la sanitation prévue avant insertion HTML. |
| S16 | N/A | Aucun upload. |
| S17 | N/A | Aucun endpoint JSON exposant des enregistrements. |
| S18 | PASS | CSP, HSTS, `nosniff`, frame deny, referrer et permissions policy vérifiés par HTTP. |
| S19 | PASS | La production force HTTPS et renvoie HSTS. |
| S20 | PASS | `npm audit --audit-level=high` renvoie zéro vulnérabilité. |

## 4. Design-taste review

| Critère | Évaluation | Évidence |
| --- | --- | --- |
| Hiérarchie | **Bonne** | Hero clair, sections éditoriales, repères cyan, titres de pages et CTA différenciés. |
| Typographie | **Bonne / PASS D08** | Manrope est self-hosted, déclaré dans les tokens Tailwind et rendu sur le body et les H1 ; l’échelle et les graisses restent lisibles. |
| Rythme et spacing | **Bon avec réserve** | Séparateurs et espacements structurent les pages ; la ligne de signature du service déborde à 820 px. |
| Couleurs | **Forte / JUSTIFIED** | Navy, cyan/vert et orange forment un système stable ; le violet par défaut est absent. |
| Contraste | **Bon** | Texte clair sur fonds sombres ; les contrôles Lighthouse/accessibilité précédents sont à 100. |
| Responsive | **PASS sur 375/820/1440** | Les items de signature du service peuvent maintenant se réduire et se répartir sans overflow. |
| Accessibilité visuelle | **Bonne** | H1 unique, focus visibles, alt, liens explicites et réduction de mouvement prévue. |
| Interactions | **Bonne** | Navigation, CTA, FAQ, galeries et liens de projet ont des comportements observables. |
| Motion | **Mesurée / JUSTIFIED** | Typing du hero, transitions et fades ponctuels ; branche `prefers-reduced-motion` présente. |
| Cohérence de marque | **Forte** | Même palette, mêmes repères éditoriaux et même iconographie sur portfolio, freelance, services et notes. |
| Différenciation | **Forte** | Captures réelles de projets, contenu français situé à Reims, études de cas et Dev Notes spécifiques. |
| Qualité de composition | **Bonne** | Alternance de grilles, séparateurs et prose ; absence de bento ou de cartes identiques partout. |
| Usage du design system | **Bon** | Tokens centralisés et composants adaptés ; les primitives ne sont pas livrées comme une démo stock. |
| Generic / AI-looking | **Faible** | Quelques conventions modernes sont visibles, mais elles sont contextualisées et ne s’accumulent pas en template générique. |

## 5. AI / template fingerprints

| Pattern réellement présent | Lecture | Verdict |
| --- | --- | --- |
| Dégradés cyan/vert dans hero et wordmark | Accent de marque limité à quelques éléments, sans palette violet/bleu générique. | **Isolé et JUSTIFIED** |
| Fond navy, grille et halos | Système visuel stable pour un portfolio technique ; les halos ne sont pas répétés sur chaque carte. | **Intentionnel / JUSTIFIED** |
| Eyebrow et repères numérotés | Répétés comme système éditorial de navigation des sections. | **Répétitif mais utile, JUSTIFIED** |
| `lucide-react` | Même famille d’icônes, utilisée pour clarifier une action ou un lien. | **Cohérent, pas mécanique** |
| Manrope self-hosted | Famille déclarée dans les tokens et chargée depuis un asset local, avec `font-display: swap`. | **Choix de marque cohérent, PASS D08** |
| Bordures et rayons sur certains contrôles | Les cartes projet et fiches privilégient aussi des séparateurs éditoriaux et des cartes sans ombre. | **Pas d’accumulation problématique** |
| Blur | Limité à la navbar et à la visionneuse, donc fonctionnel. | **JUSTIFIED** |
| Fade-in / transitions | Animations courtes et localisées ; pas de scroll-reveal systématique. | **Acceptable** |
| Emojis dans quelques notes | Contenu technique historique, pas décoration de chaque titre du site. | **JUSTIFIED** |
| Accumulation globale | Le couple sombre + cyan + repères éditoriaux forme une identité stable avec de vraies preuves projet. | **Pas de fingerprint AI critique** |

Patterns explicitement recherchés mais non problématiques : gradient violet/bleu par défaut, texte hero en gradient générique, glassmorphism généralisé, trois icon-boxes identiques, composants shadcn non adaptés, cursor trail, CTA qui perdent leur affordance, pairing Space Grotesk/Instrument Serif et grain/noise décoratif généralisé.

## 6. Findings prioritaires

### P0 — Critical

**Aucun finding P0.** Aucun secret client, parcours principal cassé ou défaut de sécurité critique n’a été observé.

### P1 — High

**Aucun finding P1.** Les routes, CTA principaux, metadata et protections HTTP contrôlées sont fonctionnels.

### Correctifs P2 résolus dans le working tree local

#### F-P2-01 — Typographie UI laissée sur la pile système par défaut — résolu

- **Site** : portfolio Bastien Lopez.
- **Routes** : toutes les routes UI ; preuve directe sur `/`, `/freelance`, `/creation-site-internet-reims`, `/services/applications-metier` et une Dev Note.
- **Fichier/composant** : `tailwind.config.ts`, `src/index.css` et `public/fonts/manrope-latin.woff2`.
- **Contrôle** : `D08` (generator-default typography) et contre-audit Design Taste — Typography.
- **Statut** : **RÉSOLU LOCAL**.
- **Correctif** : Manrope est self-hosted dans `public/fonts/manrope-latin.woff2`, déclaré dans `tailwind.config.ts` et appliqué au body, aux contrôles et aux titres via `src/index.css`.
- **Preuve post-correctif** : Playwright sur le build preview confirme `bodyFont` et `h1Font` à `Manrope, ui-sans-serif, system-ui, sans-serif`, `document.fonts.check('16px Manrope') === true` et quatre réponses HTTP `200` pour la ressource de police.
- **Suite** : revalider le CLS et la performance après publication ; ne pas remplacer la famille sans preuve de régression.

#### F-P2-02 — Débordement tablette dans la ligne de signature du service — résolu

- **Site** : portfolio Bastien Lopez.
- **Route** : `/services/applications-metier`.
- **Fichier/composant** : `src/pages/Service.tsx`, ligne de signature autour de l’`ol.grid.flex-1`.
- **Contrôle** : `L10` (responsive réel), contre-audit design responsive/spacing.
- **Statut** : **RÉSOLU LOCAL**.
- **Correctif** : la liste de signature dans `src/pages/Service.tsx` utilise des colonnes adaptées (`sm:grid-cols-2`, `lg:grid-cols-4`) et des items `min-w-0` avec retour à la ligne.
- **Preuve post-correctif** : Playwright sur le build preview confirme `scrollWidth === innerWidth` à 375, 820 et 1440 px, sans erreur console ni requête échouée.
- **Suite** : conserver ce contrôle responsive dans les futures validations.

### P2 — Medium restant

#### F-P2-03 — Autorité GEO et indexation externe non prouvées par le dépôt

- **Site** : toutes les routes publiques.
- **Routes/fichiers** : `public/llms.txt`, `public/llms-full.txt`, `public/sitemap.xml`, `index.html` et métadonnées de route.
- **Contrôle** : limite externe du GEO ; contrôles techniques `L03/L04/L08` restent PASS.
- **Statut** : **UNKNOWN**.
- **Preuve** : le socle technique est cohérent et `audit:production` passe, mais Search Console, Bing, les citations indépendantes et les réponses effectives des LLM ne sont pas lisibles depuis le workspace. Le check de liens a aussi rencontré la limite anti-bot LinkedIn (`999`).
- **Pourquoi c’est un problème** : un bon balisage ne prouve ni l’indexation réelle, ni une citation, ni une recommandation dans un moteur de réponse.
- **Recommandation** : suivre Search Console/Bing, conserver un journal daté des requêtes et sources LLM, et vérifier les profils externes. **Aucune promesse de classement ou de recommandation ne doit être ajoutée au site.**

#### F-P2-04 — Rotation historique des secrets non démontrable

- **Site** : dépôt frontend.
- **Zone** : historique Git et fournisseurs externes, hors fichiers source actuels.
- **Contrôle** : `S02`.
- **Statut** : **UNKNOWN**.
- **Preuve** : aucun secret runtime n’a été trouvé dans le contrôle courant et `npm audit --audit-level=high` renvoie zéro vulnérabilité, mais le dépôt ne permet pas de prouver que d’anciennes clés auraient été révoquées côté fournisseurs.
- **Pourquoi c’est un problème** : une clé historique valide resterait un risque même si elle n’est plus référencée par le bundle actuel.
- **Recommandation** : confirmer côté Git/fournisseurs la révocation ou la rotation de toute clé historique, sans exposer de valeur secrète. **Aucune réécriture d’historique ou rotation n’a été effectuée.**

### P3 — Low

**Aucun finding P3.** La page 404 actuelle est volontairement minimale mais récupérable ; son enrichissement éventuel relève d’un polish facultatif, pas d’un défaut démontré.

## 7. Things that are already good — ne pas toucher sans preuve

- La structure root-domain et les 38 routes prerender/public sont cohérentes ; ne pas réintroduire d’anciennes URLs GitHub Pages dans les canoniques.
- Le trio `robots.txt` / sitemap / canoniques et les fichiers `llms.txt` donnent une représentation claire de l’identité, de Reims, des services, des projets et des Dev Notes.
- Les pages services, fiches projet, notes et mentions légales ont une hiérarchie dédiée ; ne pas les recondenser en une seule page générique.
- Les captures de projets, stacks, études de cas et témoignages confirmés donnent des preuves concrètes ; ne pas les remplacer par des métriques inventées.
- La palette navy/cyan/vert/orange, les repères éditoriaux et les séparateurs sont une identité cohérente ; ne pas les supprimer parce qu’ils sont modernes.
- Le système `lucide-react` est cohérent avec les actions et n’est pas utilisé comme décoration flottante.
- Le typing du hero possède une valeur initiale utile et une branche `prefers-reduced-motion` ; ne pas enlever l’effet sans régression ou demande UX.
- Les notes techniques rendent le code dans des blocs dédiés et Mermaid pour les diagrammes ; ne pas aplatir ces contenus en texte brut.
- Les mentions légales reflètent le périmètre réel sans inventer d’immatriculation, de cookies ou d’analytics.
- HTTPS, HSTS, CSP, `nosniff`, frame deny, referrer policy et permissions policy sont observés en production.
- Le chargement d’images optimisées, le favicon, le manifest et les métadonnées sociales sont déjà en place.

## 8. Unknown / manual checks

1. **Search Console** : couverture, indexation, exclusions, CTR et requêtes après la dernière publication.
2. **Bing Webmaster Tools** : découverte du sitemap et des pages prioritaires.
3. **GEO/LLM** : tests datés des requêtes « développeur freelance Reims », « création de site internet Reims » et variantes, avec sources effectivement citées.
4. **Autorité externe** : contrôle manuel que GitHub, LinkedIn, Malt et Société.com pointent vers le domaine canonique et présentent la même identité.
5. **Secrets historiques** : confirmation propriétaire de la rotation/révocation chez les fournisseurs, sans exposer de credential.
6. **Lecteur d’écran** : parcours manuel complet clavier + lecteur d’écran sur navbar, accordéons, galeries et CTA.
7. **Performance** : le relevé Lighthouse local du 21 septembre est de 82–89 en performance selon la route, avec SEO/accessibilité/bonnes pratiques à 100 ; le build signale encore quelques chunks JavaScript >500 KiB à réduire si le gain est mesurable.

## 9. Suggested remediation plan

### Must fix before launch

- Publier le build local validé, puis relancer `npm run audit:production` et un readback HTTP des routes prioritaires.
- Vérifier après publication que la ressource Manrope et le CTA d’avis Google sont servis avec les bons headers et que la convention d’URL reste inchangée.

### Should fix

- Suivre Search Console et Bing sur 7–28 jours avec un journal de couverture, requêtes, impressions et exclusions.
- Vérifier manuellement les profils externes et les citations qui peuvent soutenir l’entité Bastien Lopez.
- Relancer Lighthouse après une prochaine publication ; réduire les chunks inutilisés uniquement si le gain est mesurable et ne dégrade pas le rendu.
- Confirmer la rotation des éventuelles clés historiques côté fournisseurs.

### Optional polish

- Enrichir éventuellement la 404 avec un lien vers les projets ou le service freelance, sans modifier son rôle de récupération.
- Ajouter des checks visuels/tablette au pipeline si la largeur 820 est une cible de support durable.

### Do not change

- Ne pas supprimer la palette, les repères éditoriaux, les captures réelles, les fiches projet, les notes ou les liens LLM pour « moderniser » l’interface.
- Ne pas ajouter de cookies, tracker, faux compteur, témoignage, certification, métrique ou promesse de classement pour augmenter artificiellement le SEO/GEO.
- Ne pas remplacer Manrope uniquement parce qu’une autre famille est à la mode : tout changement doit être justifié par la marque, la lisibilité et le contexte du portfolio.
- Ne pas créer une page CGU/RGPD générique tant que le site reste statique sans vente, compte, formulaire ou tracking non déclaré.
- Ne pas transformer les patterns `JUSTIFIED` de la matrice en `FAIL` uniquement parce qu’ils sont populaires dans les templates.

## Evidence ledger

### Contrôles exécutés pendant cet audit

- `npm run audit:production` : **PASS** — 38 URLs du sitemap, 38/38 finales en 200, 0 redirection initiale, fichiers GEO cohérents (readback public du 21 septembre ; le nouveau build local reste à publier).
- `npm run lint` : **PASS**.
- `npm run typecheck` : **PASS**.
- `npm run build` puis `npm run verify:build` : **PASS** — build Vite, prerender et URLs de production présents.
- `npm run test:axe` : **PASS**, 4/4 tests.
- `npm run test:e2e` : **PASS**, 16/16 tests fonctionnels.
- `npm run verify:performance-assets` : **PASS**, 151 images WebP référencées par le manifeste.
- `npm run verify:translations` : **PASS**, 62 articles vérifiés.
- `npm audit --audit-level=high --json` : **PASS**, 0 vulnérabilité high/critical/moderate/low.
- Playwright local sur le build preview, routes représentatives et viewports 1440/820/375 : **PASS** pour HTTP 200, un H1, absence d’erreurs console et de requêtes échouées ; `scrollWidth === innerWidth` sur `/services/applications-metier` aux trois largeurs.
- Inspection typographique Playwright locale : **PASS D08** — Manrope rendu sur body/H1, `document.fonts.check()` valide et ressource `/fonts/manrope-latin.woff2` en HTTP 200.
- CTA avis Google : **PASS local** — lien `https://share.google/lZ2jBImQaBpUQGkDq`, ouverture dans un nouvel onglet et `rel="noopener noreferrer"`.
- HTTP production : `http://bastienlopez.fr/` → `308` vers HTTPS ; HTTPS renvoie HSTS, CSP, `nosniff`, frame deny, referrer policy et permissions policy ; `/mentions-legales` → `200` ; route inconnue → `404` ; favicon, OG image et robots → `200`.
- Lighthouse local : **PASS**, `/` 82, `/freelance` 87 et `/creation-site-internet-reims` 89 en performance, 100 en accessibilité, bonnes pratiques et SEO.
- Inspection visuelle des rendus locaux desktop, tablette et mobile : identité cohérente, CTA lisibles ; les changements UI ci-dessus ont été revalidés sur le build preview local.

### Contrôles précédemment enregistrés et toujours pertinents

Les contrôles déjà consignés dans `anti-vibecode-audit.md` restent pertinents pour le contexte historique du build prerender, `verify:build`, traductions, assets, E2E, axe et Lighthouse. Ils sont distingués des validations locales exécutées après les correctifs ci-dessus.

### Suivi contenu et UI après l’audit

- **Contenu français** : les formulations visibles « CDI & freelance », « remote/full remote », « topic », « responsive » et « workflows/reporting » ont été harmonisées en français courant, tout en conservant les termes techniques nécessaires (`CI/CD`, `API`, `n8n`, `SEO/GEO`).
- **Transition À propos → Projets** : le projet possède maintenant un fondu supérieur raccordé à la surface précédente ; la pseudo-bordure qui créait un trait abrupt est alignée sur la couleur de départ.
- **Transition Dev Notes → Contact** : le contact commence par un fondu depuis la surface `#14191F` des Dev Notes vers le fond principal.
- **Services Freelance** : la colonne des titres est rapprochée des numéros, les flèches restent attachées à leur titre et le test local ne signale aucun overflow à 375, 820 ou 1440 px.
- **Projets Freelance** : chaque séparation entre deux projets n’utilise plus qu’une seule bordure partagée.
- **Témoignages** : « Laisser un avis Google » reste aligné à droite sur desktop et conserve un lien externe sécurisé.
- **Hero desktop** : le titre métier reste sur une seule ligne à 1080p et le contenu complet, y compris les CTA, reste visible sur les hauteurs courtes sans débordement horizontal.
- **Navigation Freelance** : le clic depuis toute page, y compris depuis `/freelance`, remet la page en haut avant et après le montage lazy ; le scénario est couvert par E2E.

## Conclusion

Le working tree local est à **52 PASS / 0 FAIL / 18 JUSTIFIED / 23 N/A / 1 UNKNOWN**. La typographie, le contenu visible, le hero desktop 1080p, les transitions de fond, l’alignement des services et la bordure des projets sont corrigés et revalidés ; le CTA d’avis Google reste présent dans la section des témoignages. Il reste à publier ce build puis à relire la production. L’autorité GEO, l’indexation externe et la rotation historique des secrets restent des contrôles externes : ils ne peuvent pas être garantis par une modification locale du frontend.
