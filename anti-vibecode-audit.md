# Audit anti-vibecode — 15 septembre 2026

## Résumé

- **Périmètre :** dépôt Portfolio, application React/Vite, routes publiques, assets, métadonnées SEO/GEO, rendu local pré-rendu et lecture HTTP du domaine public.
- **Mode :** audit complet, sans correction de code pendant cet audit.
- **Preuves :** statique, build/prerender, Playwright, axe, Lighthouse local, npm audit et sondes HTTP de production.
- **Couverture :** 94/94 contrôles.
- **Statuts :** PASS 52, JUSTIFIED 17, UNKNOWN 5, N/A 20, FAIL 0.
- **Point le plus urgent :** publier la version actuelle et vérifier les routes publiques. Le dépôt contient les nouvelles pages, mais le domaine public sert encore une version précédente.

Le scanner statique du skill sert uniquement de générateur de pistes. Les faux positifs sur les exemples SQL, les compteurs d’articles et les balises HTML contrôlées ont été relus dans leur contexte avant classement.

## Constats à traiter

| Priorité | Contrôle / sujet | Preuve actuelle | Action attendue |
|---|---|---|---|
| P0 | Déploiement et routage public | https://bastienlopez.fr/mentions-legales renvoie le HTML de l’accueil avec son canonical `/`; https://bastienlopez.fr/notes/refactoring-sans-tout-casser renvoie 404. Le sitemap public contient 28 URLs contre 36 dans le dépôt. | Publier le build actuel avec la configuration Caddy de référence, puis relire statuts, titles, canonicals, sitemap et llms.txt. |
| P1 | HTML initial de la home | npm run verify:build échoue : le H1 pré-rendu contient seulement Développ... et le H2 de soutien n’est pas présent. L’animation de frappe vide le texte avant la fin du prerender. | Conserver le texte complet dans le HTML initial et animer une couche visuelle après hydratation, ou supprimer cette animation. |
| P1 | Alignement des technologies des cartes | npm run test:e2e : 14 tests passent, l’assertion d’alignement échoue avec un écart vertical de 82 px entre cartes. | Stabiliser la hauteur/position de la zone technologies, puis relancer la suite complète. |
| P1 | Multilingue et hreflang | Le site change de langue via localStorage sur la même URL. Le code ne publie que fr-FR et x-default vers la même URL ; Google recommande des URLs distinctes pour des versions réellement multilingues. | Choisir des routes /en/ avec alternates réciproques, ou assumer un site FR et retirer les signaux EN ambigus. |
| P1 | Preuves commerciales | 7+ ans et 30+ projets sont visibles, mais le dépôt contient 22 fiches projet ; source de calcul et alignement externe non fournis. La provenance des témoignages n’est pas prouvée dans le dépôt. | Valider les chiffres/provenances, ou reformuler sans métrique non démontrée. |
| P2 | Hiérarchie visuelle | Hero avec grille, glow, gradient, typing, pills et trois CTA ; effets cohérents mais nombreux. | Réduire décoration ou motion après la correction SEO initiale. |

## Vérifications positives

- Le dépôt local expose home, freelance, mentions légales, 22 projets, 3 services, 8 notes dédiées et une 404 pré-rendue.
- Les 60 notes sources sont disponibles dans les cinq catégories ; 8 ont une URL autonome, canonical, TechArticle et entrée sitemap/llms.txt.
- Les cartes projets utilisent les stacks en texte séparé, sans pills arrondies, et les fiches conservent galeries et contenus détaillés.
- Les blocs code sont rendus en pre/code et les graphes Mermaid sont transformés en SVG côté client avec sanitization et repli code.
- La configuration Caddy de référence contient CSP, HSTS, anti-clickjacking, nosniff, permissions, canonicalisation slash et 404 avec statut conservé.

## Matrice des 94 contrôles

### Écriture — W01 à W10

| ID | Statut | Preuve / décision |
|---|---|---|
| W01 | JUSTIFIED | Tirets cadratins surtout dans titres de projets et nom de marque. |
| W02 | JUSTIFIED | Une formulation contrastive ponctuelle dans un article technique. |
| W03 | JUSTIFIED | Emojis limités aux exemples et contenus techniques. |
| W04 | PASS | Listes utilisées quand elles améliorent le balayage. |
| W05 | PASS | Groupes de trois justifiés par CTA, technologies et catégories. |
| W06 | PASS | Affirmations directes, réserves limitées à la confidentialité. |
| W07 | PASS | Longueurs de paragraphes variées selon les sections. |
| W08 | PASS | Les pages commencent par la proposition utile. |
| W09 | JUSTIFIED | Le verbe explorer reste lié à la navigation ; pas de remplissage récurrent. |
| W10 | PASS | Typographie professionnelle et cohérente. |

### Signaux de site généré — P01 à P20

| ID | Statut | Preuve / décision |
|---|---|---|
| P01 | PASS | Domaine canonique personnalisé bastienlopez.fr. |
| P02 | JUSTIFIED | Dégradés bleu/cyan intégrés au système de marque. |
| P03 | PASS | Captures et assets projet locaux, sans défaut évident. |
| P04 | UNKNOWN | Provenance/consentement des témoignages non prouvés dans le dépôt. |
| P05 | PASS | Parcours critiques testés, aucun CTA mort localement. |
| P06 | PASS | Pas de scroll-reveal uniforme. |
| P07 | PASS | Routes dédiées projets, services, notes, légal et 404. |
| P08 | JUSTIFIED | Wordmark textuel assumé dans la navbar. |
| P09 | PASS | favicon et icônes d’application présents. |
| P10 | JUSTIFIED | Gradient de texte statique, typing non bouclé. |
| P11 | PASS | Mentions légales substantielles. |
| P12 | N/A | Pas de produit nécessitant des conditions dédiées. |
| P13 | PASS | Aucun compteur de visiteurs simulé. |
| P14 | PASS | Aucun compteur clients/utilisateurs automatique. |
| P15 | UNKNOWN | Périmètre des métriques 7+ ans et 30+ projets à confirmer. |
| P16 | JUSTIFIED | Emojis confinés aux articles techniques. |
| P17 | PASS | Hero concret : métier, applications métier, APIs et workflows n8n. |
| P18 | PASS | Pas de police manuscrite. |
| P19 | PASS | Pas de badge de générateur. |
| P20 | JUSTIFIED | Marqueurs de copywriting ponctuels, pas dominants. |

### Defaults visuels génériques — D01 à D24

| ID | Statut | Preuve / décision |
|---|---|---|
| D01 | JUSTIFIED | Gradients tokenisés et hiérarchisés. |
| D02 | PASS | Icônes de marge fonctionnelles ou masquées. |
| D03 | JUSTIFIED | Fond sombre choisi pour contraste et marque. |
| D04 | PASS | Palette fondée sur des tokens sémantiques. |
| D05 | PASS | Ombres limitées, cartes majoritairement shadow-none. |
| D06 | PASS | Colonnes de témoignages adaptées au contenu. |
| D07 | JUSTIFIED | Blur limité aux galeries et modals. |
| D08 | JUSTIFIED | Police système, sans choix template imposé. |
| D09 | PASS | Filets et séparateurs structurent les sections. |
| D10 | PASS | Pas de bento layout forcé. |
| D11 | PASS | Blocs de code correspondant à du contenu réel. |
| D12 | PASS | Pas de coches vertes répétées pour chaque bénéfice. |
| D13 | N/A | Aucune tarification à trois niveaux. |
| D14 | PASS | Captures, galeries, détails et liens de projets présents. |
| D15 | PASS | Stacks sans rayon universel ; contrôles avec échelle fonctionnelle. |
| D16 | JUSTIFIED | Palette bleu nuit/cyan/orange documentée. |
| D17 | PASS | États chargement, erreur et retry des Dev Notes. |
| D18 | JUSTIFIED | Glows cohérents mais réductibles en P2. |
| D19 | JUSTIFIED | Grille hero statique et légère. |
| D20 | PASS | Pas de sparkle universel. |
| D21 | PASS | Flèche scroll statique, reduced-motion respecté. |
| D22 | PASS | Hover réservé aux éléments interactifs. |
| D23 | JUSTIFIED | Accents cyan sur fond sombre assumés comme marque. |
| D24 | PASS | Pas de palette pastel générique. |

### Lancement et complétude — L01 à L20

| ID | Statut | Preuve / décision |
|---|---|---|
| L01 | UNKNOWN | 404 locale validée ; corps de la 404 publique non confirmé. |
| L02 | PASS | CTA principaux visibles et testés. |
| L03 | PASS | Titres distincts par route dans le prerender local. |
| L04 | PASS | Descriptions distinctes par route. |
| L05 | PASS | Open Graph/Twitter et og-image.png présents. |
| L06 | PASS | Favicon, icônes et manifest présents. |
| L07 | PASS | robots.txt autorise le site et OAI-SearchBot. |
| L08 | UNKNOWN | 36 URLs dans le sitemap local contre 28 en production. |
| L09 | PASS | Alt utiles pour images projet ; avatars décoratifs. |
| L10 | PASS | Responsive étroit/large couvert par E2E et axe. |
| L11 | PASS | CTA atteignables sur mobile. |
| L12 | PASS | Chargement/erreur/retry des catégories. |
| L13 | N/A | Aucun formulaire. |
| L14 | N/A | Aucun envoi ou transaction. |
| L15 | PASS | Contenu légal et décision de mesure explicités. |
| L16 | N/A | Pas de vente, compte ou abonnement. |
| L17 | N/A | Aucun tracker non essentiel activé. |
| L18 | N/A | Aucun fournisseur analytics chargé par défaut. |
| L19 | PASS | Email, GitHub et LinkedIn disponibles. |
| L20 | PASS | srcset/WebP/dimensions/lazy loading ; 142 WebP vérifiés. |

### Sécurité smoke — S01 à S20

| ID | Statut | Preuve / décision |
|---|---|---|
| S01 | PASS | Aucun secret privé détecté dans les surfaces publiques inspectées. |
| S02 | UNKNOWN | Historique Git complet non inspecté dans cet audit. |
| S03 | N/A | Pas de backend/admin credential. |
| S04 | N/A | Pas de base ni règle d’accès exposée. |
| S05 | N/A | Pas de stockage de données sensibles. |
| S06 | N/A | Pas d’authentification. |
| S07 | N/A | Pas de ressource protégée par identifiant. |
| S08 | N/A | Pas d’API de mutation ou champ privilégié. |
| S09 | N/A | Pas de session cookie. |
| S10 | N/A | Aucun mot de passe stocké. |
| S11 | N/A | Aucun endpoint de connexion. |
| S12 | N/A | Aucun formulaire public/commentaire. |
| S13 | PASS | Occurrences SQL du scanner limitées aux exemples d’articles. |
| S14 | N/A | Pas de frontière serveur métier. |
| S15 | PASS | DOMPurify et Mermaid strict avant rendu HTML/SVG. |
| S16 | N/A | Aucun upload. |
| S17 | N/A | Aucune réponse API. |
| S18 | PASS | CSP, HSTS, nosniff, clickjacking, referrer et permissions observés. |
| S19 | PASS | HTTPS public ; HTTP et www redirigés. |
| S20 | PASS | npm audit : 0 vulnérabilité sur 692 dépendances. |

## Validation exécutée

- npm run lint — PASS.
- npm run typecheck — PASS.
- npm test — PASS, 2 fichiers et 6 tests.
- npm run test:axe — PASS, 4/4.
- npm run test:e2e — 14/15 PASS ; échec documenté sur l’alignement vertical des technologies.
- npm run build — PASS, prerender des routes locales.
- npm run verify:build — FAIL sur le H1/H2 pré-rendu animé.
- npm run verify:translations — PASS, 60/60.
- npm run verify:performance-assets — PASS, 142 WebP.
- npm run audit:lighthouse — home/freelance : SEO 100, accessibilité 100, bonnes pratiques 100 ; performance 51/54.
- npm run check:links — 29 OK, 1 inconnu LinkedIn anti-bot, 0 échec.
- npm audit --audit-level=high --json — PASS, 0 vulnérabilité.
- Sondes HTTP publiques — headers de sécurité PASS, mais version publique obsolète par rapport au dépôt.

## Limites et décisions propriétaire

- Le score SEO/GEO ne garantit ni indexation ni positionnement. La mise en ligne, Search Console, profils externes et preuve des chiffres restent hors de ce dépôt.
- La cohérence juridique de l’identité, de l’hébergeur, des témoignages et des métriques doit être confirmée par le propriétaire.
- Aucun déploiement, redémarrage VPS ou mutation externe n’a été effectué pendant cet audit.

## Actions restantes

Voir plan-action.md pour la liste priorisée et les critères d’acceptation. Les éléments déjà démontrés dans ce rapport ne sont pas répétés comme tâches.
