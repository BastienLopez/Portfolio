# Audit complet du portfolio — anti-vibecode, design, SEO, GEO et qualité

Date : 13 septembre 2026  
Dépôt audité : Portfolio Bastien Lopez  
Stack observée : React, TypeScript, Vite, React Router, Tailwind CSS  
Référentiel : anti-vibecode-slop (94 contrôles) et design-taste-codex
Statut des 94 contrôles : **43 PASS, 16 FAIL, 15 JUSTIFIÉ, 18 N/A, 2 UNKNOWN**

## Verdict

La passe ciblée demandée est corrigée localement : contraste des titres Dev Notes, relecture et couverture anglaise des 60 articles, métadonnées par route, FAQ JSON-LD, sitemap/llms.txt, ticker continu des témoignages, résumés structurés pour les 21 fiches projet, prérendu statique des routes publiques, compression de Bloodborne, mesure Lighthouse et hiérarchie des actions projet. Les visuels larges remplissent maintenant leur carte, les visuels carrés/portrait restent contenus, les pastilles de stack sont uniformément grises, les ronds de la section Compétences sont orange, les boutons À propos occupent la largeur disponible, les quatre points de « Ma façon de travailler » sont régulièrement espacés et le contact freelance suit la largeur du contenu. Le ticker occupe maintenant 100 % de la fenêtre, utilise deux séquences identiques, des cartes de taille commune, un mouvement linéaire permanent et un bouton pause/reprise. Les contrôles Chromium, Axe, E2E, liens, traductions, assets et build passent.

La refonte visuelle du hero reste volontairement hors périmètre. Le hero conserve donc ses effets de texte, sa grille et ses emojis ; quelques répétitions de cartes, d’ombres et de cyan restent à traiter dans cette passe séparée. Les routes publiques disposent désormais de fichiers HTML prérendus contenant leur contenu et leurs métadonnées pour les crawlers sans JavaScript. La vérification du domaine public révèle toutefois un déploiement antérieur : `/freelance` répond 404, le sitemap public ne contient pas cette route et `/mentions-legales` sert encore les métadonnées de la racine. Le code local est prêt, mais le déploiement doit être actualisé.

Les seules modifications encore à décider sont formulées en clair dans la section « Modifications restantes ». La matrice technique complète reste conservée plus bas pour assurer la traçabilité de l’audit.

## Périmètre et méthode

L’audit couvre le code source, les données projets, les routes, les métadonnées, les fichiers robots/sitemap/llms, la configuration de build et CI, les dépendances de production, le rendu Chromium, l’accessibilité Axe, les interactions principales, Lighthouse et les signatures visuelles anti-slop.

Le domaine public, les redirections HTTP→HTTPS et les en-têtes réellement servis ont été vérifiés le 13 septembre 2026. Les navigateurs non Chromium, l’historique Git complet, les droits d’utilisation des témoignages et photos, la suffisance juridique des mentions et les preuves historiques des claims restent des décisions ou pièces du propriétaire.

## Findings prioritaires

| ID | Priorité | État | Preuve actuelle | Limite ou suite |
| --- | --- | --- | --- | --- |
| A11Y-001 | P1 | RÉSOLU | Les h3/h4 Dev Notes ont une couleur claire explicite ; le test ciblé vérifie le style calculé sur l’article ouvert. | Refaire une vérification visuelle lors de la prochaine passe UI. |
| I18N-001 | P1 | RÉSOLU LOCALEMENT | Les 60 identifiants sont couverts, les contenus sont non vides et la relecture ciblée a supprimé les résidus français explicites dans les exemples anglais ; Freelance et témoignages ont leurs textes anglais. | Une validation du sens métier par le propriétaire reste possible avant publication éditoriale. |
| SEO-001 | P1 | RÉSOLU AU RUNTIME ET AU BUILD | `usePageMetadata` définit title, description, robots, canonical, hreflang et URLs OG/Twitter par route et locale ; le test E2E et les quatre fichiers HTML prérendus couvrent `/`, `/freelance`, `/mentions-legales` et la 404. | Relire les métadonnées sur le domaine public après déploiement. |
| SEO-002 | P1 | RÉSOLU | Le JSON-LD FAQPage est créé uniquement par `FreelanceFaq` sur `/freelance` et retiré au démontage ; la racine n’en contient plus. | Relire le schéma sur le domaine public après déploiement. |
| GEO-001 | P1 | RÉSOLU | `sitemap.xml` déclare la racine, `/freelance` et `/mentions-legales` ; `llms.txt` pointe vers `/freelance`. | Vérifier les réponses HTTP live lors de la mise en production. |
| VIS-001 | P2 | OUVERT | Le hero conserve machine à écrire, shimmer, curseur, flèche et grille. | Passe visuelle hero prévue séparément. |
| VIS-002 | P2 | PARTIELLEMENT RÉSOLU LOCALEMENT | Les gradients de catégories, les ombres et plusieurs répétitions de cartes ont été retirés ou aplatis dans About, Skills, Projects, Testimonials, Freelance et Dev Notes. Les cartes projet utilisent maintenant une image pleine largeur pour les captures larges, un rendu contenu pour les visuels carrés/portrait, des pastilles de stack grises et une hiérarchie détail/code puis projet. Le hero, ses emojis et certains panneaux gardent encore des motifs répétitifs. | À reprendre pendant la refonte visuelle du hero. |
| UX-001 | P2 | RÉSOLU | Les cinq témoignages validés composent deux séquences identiques dans un ticker CSS continu. La piste occupe 100 % de la fenêtre, les cartes font 340 px sous 768 px et 420 px à partir de 768 px, avec une hauteur commune. Le mouvement est linéaire et permanent, avec un bouton pause/reprise explicite ; `prefers-reduced-motion` désactive l’animation. Mesures Chromium : viewport du carrousel = viewport de la fenêtre à 375, 1500 et 2524 px, sans overflow horizontal. | Contrôle manuel des très petites largeurs à maintenir. |
| SEO-003 | P2 | RÉSOLU LOCALEMENT | `DeferredSection` reste différé pour l’exécution interactive, mais le build génère `dist/index.html`, `dist/freelance/index.html`, `dist/mentions-legales/index.html` et `dist/404.html` avec contenu, H1 et métadonnées route-specific ; `verify:build` les contrôle. | Vérifier que le serveur public distribue bien ces fichiers après déploiement. |
| PERF-001 | P2 | RÉSOLU LOCALEMENT | `bloodborne-1440.webp` est passé de 919 410 octets (898 KiB) à 625 256 octets (611 KiB), dimensions 1440×2160 conservées ; le budget CI est fixé à 750 KiB. | Contrôler le poids réellement servi par le CDN/VPS après déploiement. |
| QA-001 | P2 | RÉSOLU LOCALEMENT | `npm run audit:lighthouse` mesure `/` et `/freelance` ; un job CI dédié est configuré. Derniers scores locaux : 89/100/100/100 et 87/98/100/100 (performance/accessibilité/bonnes pratiques/SEO). | Aucun run GitHub Actions ni artefact CI n’est encore relu depuis ce checkout. |
| CONTENT-001 | P1 | RÉSOLU LOCALEMENT | Les 21 fiches affichent désormais un résumé commun avec contexte, tâches réalisées et résultats/gains. Le bloc métriques n’est rendu que lorsqu’un chiffre existe ; Clé de Voûte affiche les deux valeurs fournies par le propriétaire. | Relecture éditoriale humaine recommandée pour préciser d’éventuels gains non encore documentés. |
| DEPLOY-001 | P1 | FAIL PUBLIC / PASS LOCAL | Le build local prérend `/freelance`, `/mentions-legales` et la 404, mais `https://bastienlopez.fr/freelance` répond 404 le 13 septembre 2026. Le sitemap public ne contient pas `/freelance` et `/mentions-legales` renvoie encore le titre/description de la racine avec FAQ JSON-LD. | Publier le build courant sur le VPS/Caddy, puis relire les trois routes, le sitemap et les métadonnées depuis le domaine public. |
| DEPLOY-002 | P2 | FAIL PUBLIC | `https://www.bastienlopez.fr/` répond 200 au lieu de rediriger vers `https://bastienlopez.fr/`, même si sa balise canonical pointe vers le domaine racine. | Activer et vérifier la redirection HTTPS de `www` vers le domaine canonique. |

## Matrice anti-vibecode-slop — 94 contrôles

### Writing

| ID | Statut | Observation |
| --- | --- | --- |
| W01 | JUSTIFIÉ | Le tiret cadratin apparaît dans des titres ou phrases normales ; pas de répétition mécanique dominante. |
| W02 | PASS | Pas de structure récurrente « ce n’est pas X, c’est Y » dans les textes principaux. |
| W03 | FAIL | Emojis utilisés comme icônes de catégories dans Dev Notes et Projets. |
| W04 | JUSTIFIÉ | Les listes et sous-sections servent la lecture de services et d’articles, malgré une densité élevée. |
| W05 | JUSTIFIÉ | Plusieurs groupes de trois correspondent à des périmètres ou livrables réels. |
| W06 | PASS | Pas de hedging automatique ou de promesses prudentes répétées. |
| W07 | PASS | Le rythme des paragraphes principaux n’est pas uniformément généré. |
| W08 | PASS | Les textes ne reformulent pas systématiquement la demande du lecteur. |
| W09 | PASS | Le vocabulaire décrit les services et projets sans marqueurs creux récurrents. |
| W10 | PASS | Pas de typographie de conversation artificielle dans l’interface. |

### Product and credibility

| ID | Statut | Observation |
| --- | --- | --- |
| P01 | PASS | Le site public utilise le domaine racine bastienlopez.fr. |
| P02 | PASS | Le hero n’utilise pas de dégradé violet/bleu dominant. |
| P03 | JUSTIFIÉ | Les visuels correspondent à des projets ou clients connus ; le propriétaire confirme que les droits d’utilisation des photos sont acquis. Aucune pièce de cession n’est stockée dans le dépôt. |
| P04 | JUSTIFIÉ | Les cinq témoignages ont été validés par le propriétaire, qui confirme leur authenticité et l’autorisation d’affichage ; les pièces d’autorisation ne sont pas stockées dans le dépôt. |
| P05 | PASS | Les boutons, menus, FAQ, détails projet, galerie et liens testés répondent ; les actions de chaque carte suivent une hiérarchie détail/code puis démo pleine largeur. |
| P06 | FAIL | Animations d’entrée et effets de révélation s’accumulent dans Hero, Freelance, Projects et Dev Notes. |
| P07 | JUSTIFIÉ | L’architecture comporte maintenant une page freelance, une page légale, une 404 et des détails projet. |
| P08 | JUSTIFIÉ | Le nom Bastien Lopez est un wordmark textuel volontaire. |
| P09 | PASS | Favicon et icônes manifest sont présents et référencés. |
| P10 | FAIL | Machine à écrire, shimmer, curseur pulsé et flèche animée dans le hero. |
| P11 | N/A | Il n’y a pas de page privacy séparée ; la page légale décrit la mesure actuelle. |
| P12 | JUSTIFIÉ | La page mentions légales est réelle et contient les informations fournies ; une page terms séparée n’a pas été demandée. |
| P13 | PASS | Aucun faux compteur de visiteurs en temps réel. |
| P14 | PASS | Aucun faux compteur de clients/utilisateurs ; les métriques projet visibles ne se présentent pas comme des utilisateurs. |
| P15 | JUSTIFIÉ | Le propriétaire confirme comme réels les claims 5+, 30+, 10+, les délais indicatifs et les métriques Clé de Voûte (+60 % de trafic SEO/GEO, +15 % de demandes de devis hebdomadaires) et autorise leur affichage. Les justificatifs externes ne sont pas versionnés dans le dépôt. |
| P16 | FAIL | Emojis employés comme iconographie de produit et de catégories. |
| P17 | PASS | Le hero précise activité, périmètre et publics visés. |
| P18 | PASS | Aucune police manuscrite ou signature décorative. |
| P19 | PASS | Aucun badge de builder ou watermark fournisseur. |
| P20 | FAIL | Accumulation de patterns de site IA : gradients, cartes répétées, effets de texte et emojis ; la traduction visible ciblée est maintenant couverte. |

### Design

| ID | Statut | Observation |
| --- | --- | --- |
| D01 | FAIL | Le hero, le CTA principal et quelques éléments de shell conservent des gradients cyan/vert/orange à forte saturation ; les gradients de catégories ont été retirés. |
| D02 | PASS | Pas de nuage d’icônes flottantes décoratives indépendant du contenu. |
| D03 | JUSTIFIÉ | Le canvas sombre est cohérent avec le thème choisi et le contraste des éléments clairs. |
| D04 | PASS | Les boutons de catégories utilisent maintenant un rôle visuel commun ; les anciennes variations violet/rose/vert/orange ont été retirées. |
| D05 | FAIL | Les ombres répétitives ont été supprimées des blocs principaux, mais il reste des ombres fonctionnelles dans le menu, les toasts et la galerie ainsi que des effets du hero. |
| D06 | FAIL | Répétition de rangées de cartes de même poids dans About, Skills et Freelance. |
| D07 | JUSTIFIÉ | Le blur est limité aux overlays de navigation, menu et galerie ; il sert la profondeur fonctionnelle. |
| D08 | PASS | Pas de police explicitement générateur type Inter/Geist/Space Grotesk imposée partout ; la pile système reste lisible. |
| D09 | JUSTIFIÉ | Les bandes de transition pleine largeur servent les séparations de sections demandées. |
| D10 | PASS | Pas de bento grid décoratif sans relation avec le contenu. |
| D11 | PASS | Pas de faux terminal utilisé comme simple décoration. |
| D12 | FAIL | Listes de bénéfices avec coches vertes répétées dans About et Freelance. |
| D13 | JUSTIFIÉ | Les trois niveaux de prestation décrivent des périmètres réels et ne forment pas une grille de prix artificielle. |
| D14 | PASS | Les projets disposent de captures, liens ou détails ; le site ne repose pas sur des placeholders. |
| D15 | PASS | Les rayons ont été normalisés vers des valeurs plus sobres (`rounded-md`/`rounded-lg`) selon le rôle du composant ; les tags et cartes ne partagent plus un rayon surdimensionné. |
| D16 | PASS | La palette de base est bleu-noir/cyan, pas une palette violet-noir dominante. |
| D17 | PASS | Suspense, états de chargement et erreur Dev Notes sont prévus. |
| D18 | PASS | Pas de blobs lumineux floutés omniprésents ; les tokens glow sont limités. |
| D19 | FAIL | Une grille de lignes reste utilisée comme texture décorative dans le hero ; elle a été retirée du bloc témoignages. |
| D20 | PASS | Pas de système sparkle universel pour toutes les fonctionnalités IA. |
| D21 | FAIL | Flèche de scroll rebondissante dans le hero. |
| D22 | PASS | Les `hover:scale` des cartes et catégories ont été retirés ; le seul zoom restant concerne l’image d’une fiche détail interactive. |
| D23 | FAIL | Cyan néon sur fond sombre utilisé comme signature générale de site tech. |
| D24 | PASS | Pas de palette pastel généralisée. |

### Launch, SEO, UX et accessibilité

| ID | Statut | Observation |
| --- | --- | --- |
| L01 | PASS | 404 personnalisée affichée sur route inconnue ; la réponse live Caddy n’est pas rejouée dans cette passe. |
| L02 | PASS | CTA principal visible tôt sur la page d’accueil et vérifié en rendu Chromium. |
| L03 | FAIL | Le code local produit un title distinct pour la racine, `/freelance`, `/mentions-legales` et la 404, mais le domaine public sert le même title de racine sur `/mentions-legales` et `/freelance` répond 404. |
| L04 | FAIL | Les descriptions sont distinctes dans le code local, mais la description de la racine est encore servie sur `/mentions-legales` en production ; `/freelance` n’est pas publié. |
| L05 | FAIL | OG, Twitter, canonical et hreflang sont corrects dans les quatre sorties HTML locales, mais les métadonnées publiques de `/mentions-legales` sont celles de la racine et la route freelance est absente. |
| L06 | PASS | Favicon, manifest et icônes 192/512 présents. |
| L07 | PASS | robots.txt autorise l’exploration et référence le sitemap. |
| L08 | FAIL | Le sitemap local déclare la racine, `/freelance` et `/mentions-legales`, mais le sitemap public relu le 13 septembre 2026 ne contient pas `/freelance`. |
| L09 | JUSTIFIÉ | Les images projet ont des alt descriptifs ; les avatars témoignages ont alt vide car le nom et rôle sont déjà affichés à côté. |
| L10 | PASS | 40 couples route/largeur Chromium de 320 à 1920 px sans overflow horizontal. |
| L11 | PASS | Menu mobile, CTA, email et LinkedIn atteignables dans les tests. |
| L12 | PASS | Suspense et états d’attente présents pour les sections différées. |
| L13 | N/A | Aucun formulaire applicatif à valider sur ce périmètre. |
| L14 | N/A | Aucun flux de soumission de formulaire ou paiement. |
| L15 | PASS | La page légale indique l’absence de mesure client non nécessaire ; pas de script analytics tiers observé dans le build. |
| L16 | UNKNOWN | La suffisance juridique finale, SIRET et adresse relèvent d’une validation propriétaire ou professionnelle. |
| L17 | N/A | Aucun cookie non essentiel ni tracking client à consentir n’est activé dans le code audité. |
| L18 | JUSTIFIÉ | La mesure client est volontairement absente ; Search Console n’est pas une preuve d’un script exécuté sur le site. |
| L19 | PASS | Email, LinkedIn et GitHub sont visibles et testés comme destinations. |
| L20 | PASS | 135 WebP, manifest de variantes, srcset et lazy loading sont présents ; `bloodborne-1440.webp` pèse maintenant 611 KiB et reste sous le budget de 750 KiB. |

### Security

| ID | Statut | Observation |
| --- | --- | --- |
| S01 | PASS | Aucun motif de secret n’a été trouvé dans src, public, index.html, vite.config.ts et package.json. |
| S02 | UNKNOWN | Le scan complet de l’historique Git n’a pas été exécuté. |
| S03 | N/A | Aucun serveur avec credentials ou secret runtime dans ce dépôt statique. |
| S04 | N/A | Pas de base de données ni politique de lignes. |
| S05 | N/A | Pas de stockage de données sensibles. |
| S06 | N/A | Pas d’authentification applicative. |
| S07 | N/A | Pas de ressource identifiée par un identifiant utilisateur côté serveur. |
| S08 | N/A | Pas d’endpoint de mutation ou de mass assignment. |
| S09 | N/A | Pas de session ou cookie applicatif. |
| S10 | N/A | Pas de mot de passe à hacher. |
| S11 | N/A | Pas de route d’authentification à limiter. |
| S12 | N/A | Pas de formulaire serveur ou endpoint public à abuser. |
| S13 | N/A | Pas de requête SQL runtime ; les exemples d’articles sont du contenu éditorial. |
| S14 | N/A | Pas d’API métier runtime dans ce dépôt. |
| S15 | PASS | DOMPurify protège le HTML détaillé et le Markdown est échappé avant rendu. |
| S16 | N/A | Aucun upload utilisateur. |
| S17 | N/A | Aucun endpoint exposant des champs de données. |
| S18 | PASS | Le domaine public sert CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy et Permissions-Policy ; vérifié le 13 septembre 2026. |
| S19 | PASS | HTTP redirige en 308 vers HTTPS et le domaine HTTPS sert HSTS ; vérifié avec les deux hôtes publics le 13 septembre 2026. |
| S20 | PASS | npm audit production : zéro vulnérabilité high ou supérieure ; dépendances verrouillées et CI présentes. |

## Modifications restantes

La configuration locale VPS/Caddy/CI est documentée et les preuves externes de claims, témoignages et photos sont confirmées par le propriétaire. Le domaine public n’est pas à jour avec ce checkout ; voici chaque problème restant, avec l’action attendue :

1. **Emojis utilisés comme icônes** dans Dev Notes et certaines catégories projet : les remplacer par les icônes Lucide déjà utilisées dans le reste du site.
2. **Animations d’entrée répétées** dans Hero, Freelance, Projects et Dev Notes : ne conserver que les transitions qui expliquent un changement d’état.
3. **Titre du hero animé** (machine à écrire, shimmer et curseur pulsé) : afficher le message directement ou réduire l’animation à une entrée courte.
4. **Formulations qui donnent une impression de texte généré** dans plusieurs titres, cartes et appels à l’action : relire ces textes avec une voix plus personnelle et plus concise.
5. **Gradients cyan/vert/orange très saturés** dans le hero, le CTA principal et certains éléments du shell : les atténuer et réserver la couleur vive aux actions importantes.
6. **Ombres répétées** sur les menus, toasts, galeries et plusieurs cartes : garder une ombre uniquement lorsqu’elle indique une élévation utile.
7. **Rangées de cartes de même poids** dans About, Skills et Freelance : différencier la hiérarchie par la composition, la taille ou un regroupement plus éditorial.
8. **Listes de bénéfices avec une coche devant chaque ligne** dans About et Freelance : varier la présentation ou réduire les coches aux points réellement prioritaires.
9. **Grille décorative** en arrière-plan du hero : la retirer si elle n’apporte pas d’information au contenu.
10. **Flèche de scroll qui rebondit** dans le hero : la supprimer ou la rendre statique.
11. **Cyan néon comme signature générale** sur fond sombre : réduire sa fréquence et utiliser davantage les tons neutres du thème.
12. **Déployer le build actuel sur le domaine public** : `/freelance` répond encore 404, le sitemap public est ancien et `/mentions-legales` sert encore les métadonnées de la racine.
13. **Redirection HTTPS de `www`** : `https://www.bastienlopez.fr/` répond 200 au lieu de rediriger vers le domaine canonique.
14. **Historique Git non audité pour les secrets** : lancer un scan complet de l’historique et révoquer toute clé trouvée avant publication.
15. **Vérification juridique finale** : confirmer que les mentions légales contiennent toujours les informations obligatoires exactes (identité, adresse, hébergeur et statut).

## SEO et GEO — détail

Les fondamentaux présents sont robots.txt, sitemap.xml, manifest, JSON-LD de site/personne/service, une page légale, un fichier llms.txt et des coordonnées de contact. Les projets et services sont suffisamment explicites pour une compréhension humaine et machine.

Les métadonnées de route et de locale sont maintenant gérées par `usePageMetadata` : title, description, robots, canonical, hreflang et URLs OG/Twitter suivent la page courante. Le JSON-LD FAQPage est injecté uniquement lorsque `/freelance` affiche la FAQ dans le code local ; le domaine public sert encore une version antérieure où la FAQ apparaît sur la racine. Le sitemap et `llms.txt` pointent vers les routes publiques actuelles dans le checkout. Le script `scripts/prerender-routes.mjs`, appelé par `postbuild`, produit quatre fichiers HTML avec le contenu et les métadonnées de chaque route ; `scripts/verify-build.mjs` vérifie leur présence et leurs marqueurs.

La présence de Search Console ne prouve pas une mesure client ni un consentement nécessaire. Aucun script Google Analytics n’a été trouvé dans le code audité ; cette distinction doit rester documentée dans la page légale.

## Fonctionnement et expérience utilisateur

Les scénarios principaux passent : navigation, menu mobile, changement de langue, détail projet, galerie, ticker continu des cinq témoignages, ouverture FAQ, liens email/LinkedIn/GitHub et 404. Aucun message console, erreur de page ou requête échouée n’est apparu pendant les parcours Chromium audités. Les cartes de témoignage ont une largeur et une hauteur communes sur les largeurs testées ; le mouvement avance seul et se fige avec le bouton pause/reprise. Le viewport du ticker prend toute la largeur de la fenêtre sans créer de scrollbar horizontale.

Le principal risque UX vient de la hiérarchie visuelle et du mouvement, pas d’un crash : le hero retarde encore son message, les sections différées peuvent apparaître tardivement et la page freelance est longue avec plusieurs blocs de poids similaire. Le ticker de témoignages avance automatiquement en continu, boucle sans rupture grâce à ses deux séquences, respecte la réduction de mouvement et propose une pause/reprise explicite. La largeur responsive est correcte dans la campagne Chromium ; Safari, Edge, Opera et la parité VPS ne sont pas des preuves requises dans cette passe.

## Preuves positives

- 21 projets uniques dans les quatre sources de données ; aucun doublon d’identifiant détecté.
- 5 témoignages actuels : Éloi V., Luxury Auto, J. DM, Marino et Utilisateur ATS anonymisé.
- 60 articles français et 60 entrées anglaises partageant les mêmes identifiants.
- Les 41 images projet/client référencées existent ; les variantes WebP sont générées et le contrôle assets passe.
- Les quatre routes publiques disposent d’un HTML prérendu dans `dist/`, avec titre, H1 et contenu vérifiés pour une lecture sans JavaScript.
- `bloodborne-1440.webp` conserve ses dimensions 1440×2160 tout en passant de 898 KiB à 611 KiB.
- Les 21 fiches projet exposent un résumé « tâches / résultats & gains » avant leur contenu détaillé ; le bloc métriques est conditionnel et contient les valeurs documentées disponibles.
- Clé de Voûte affiche ses métriques fournies (+60 % de trafic SEO/GEO et +15 % de demandes de devis hebdomadaires) en français comme en anglais ; une fiche sans métrique n’affiche aucun panneau ni texte de remplacement.
- Les cartes projet remplissent la largeur avec les captures panoramiques, conservent un `object-contain` lisible pour les visuels carrés/portrait et placent « En savoir plus » et « Code » côte à côte avant la démo pleine largeur.
- Le ticker de témoignages affiche deux séquences des cinq avis validés, des cartes de dimensions communes (340 px mobile, 420 px desktop), un défilement linéaire continu et un contrôle pause/reprise ; son viewport prend 100 % de la fenêtre. Les largeurs 320, 375, 430, 768, 1280 et 1920 px ne provoquent pas de débordement du document.
- Les pastilles de stack restent neutres et lisibles ; les ronds de la section Compétences & Technologies utilisent l’orange d’accent ; le lien de projet ATS Filter Resume et le dépôt PatriPro sont vérifiés.
- Le propriétaire atteste le 13 septembre 2026 que les claims et métriques publiés sont réels, que les témoignages sont authentiques et que les droits photo sont acquis. Cette attestation autorise l’affichage ; aucun justificatif contractuel ou export analytique n’est stocké dans le dépôt.
- Les routes principales rendent un élément main ; la racine a un h1, les pages freelance et légale ont leur contenu principal.
- Axe ne remonte aucune violation sur les routes principales ni sur l’article Dev Notes ouvert.
- La CI exécute lint, typecheck, build, vérification build, traductions, assets, tests unitaires, Playwright, liens et un audit Lighthouse sur les routes publiques.

## Vérifications exécutées

| Vérification | Résultat |
| --- | --- |
| npm.cmd run check | PASS : lint, typecheck, build Vite, verify:build, verify:translations, verify:performance-assets |
| npm.cmd test | PASS : 1 fichier, 4 tests |
| npm.cmd run test:axe | PASS : 3 tests |
| npm.cmd run test:e2e | PASS : 9 tests |
| npm.cmd run check:links | PASS : 30 OK, 1 UNKNOWN LinkedIn externe, 0 échec ; ATS Filter Resume et PatriPro répondent 200 |
| npm.cmd audit --omit=dev --audit-level=high --json | PASS : 0 vulnérabilité de production |
| Responsive Chromium | PASS : 40 cas, 320 à 1920 px, 0 overflow et 0 erreur ; contrôle supplémentaire du carousel pleine largeur à 375, 1500 et 2524 px |
| Parcours Chromium | PASS : navigation, langue, projet, galerie, ticker continu des témoignages, pause/reprise, FAQ, menu mobile et liens |
| Axe complémentaire | PASS : 3 tests ; aucune violation sérieuse/critique et test de contraste Dev Notes ciblé |
| JSON-LD | PASS syntaxique : WebSite, WebPage, Person, ProfessionalService ; FAQPage présent uniquement sur `/freelance` |
| Relecture anglaise | PASS local : 60/60 identifiants, 60 contenus non vides et aucun token accentué français restant dans les fichiers EN ; exemples/commentaires résiduels traduits |
| Scanner statique anti-slop | TRIAGE : quelques détections heuristiques et deux faux négatifs de présence ; aucune conclusion automatique sans relecture |
| Lighthouse | PASS : `npm run audit:lighthouse`, `/` = 89/100/100/100 et `/freelance` = 87/98/100/100 (performance/accessibilité/bonnes pratiques/SEO) |
| Prérendu SEO | PASS : `postbuild` génère quatre HTML route-specific ; `verify:build` contrôle titres, H1 et marqueurs de contenu |
| Domaine public | PARTIEL : racine et mentions légales répondent 200, route inconnue 404, HTTP→HTTPS 308 et headers de sécurité présents ; `/freelance` répond 404, sitemap public ancien et `www` HTTPS ne redirige pas |
| Historique Git pour secrets | NON EXÉCUTÉ |

Le contrôle Axe ne détectait pas A11Y-001 ; le test ciblé ajouté mesure désormais la couleur calculée des h3/h4 après correction. La prochaine passe visuelle devra confirmer la perception sur les différents écrans.

## Points à traiter avant de déclarer la refonte terminée

Les actions 1 à 11 concernent la passe visuelle anti-slop. Les actions 12 à 15 concernent le déploiement, le domaine, les contrôles juridiques et l’historique Git. Les preuves de claims, témoignages et photos sont déjà confirmées par le propriétaire et restent conservées hors dépôt.

## Limites de preuve

Cet audit est une photographie du checkout local et du domaine public observés le 13 septembre 2026. Les headers live et la redirection HTTP→HTTPS ont été contrôlés, mais le certificat n’a pas fait l’objet d’une analyse TLS exhaustive, les navigateurs non Chromium n’ont pas été testés et aucun run GitHub Actions n’est relu depuis ce checkout. Les droits photo, témoignages et claims sont confirmés par le propriétaire mais leurs justificatifs restent hors dépôt ; la suffisance juridique finale et l’historique Git restent à valider. Le domaine public n’est pas aligné avec le build local : un déploiement reste nécessaire. Les modifications déjà présentes dans le dépôt n’ont pas été annulées ; ce fichier ne constitue ni un commit ni un déploiement.
