# Plan d’action — baseline technique puis refonte UI/UX

Date : 2026-09-09  
Source principale : audit.md  
Nature de cette mission : planification initiale, puis exécution bornée des phases 0 à 4. GOV-001 est validé par le propriétaire ; les corrections autorisées sont appliquées dans le périmètre éditorial, de routage, de supply chain, d’architecture et de configuration versionnée, sans déploiement ni publication distante.

## 1. Objectif et ordre impératif

Le portfolio doit d’abord retrouver une baseline technique saine, reproductible et crédible. La refonte visuelle décrite dans audit.md:30-33 ne commence qu’après validation explicite du quality gate **FOUNDATION COMPLETE**.

Ordre d’exécution :

1. Phase 0 — baseline et filet de sécurité ;
2. Phase 1 — production et crédibilité ;
3. Phase 2 — sécurité et supply chain ;
4. Phase 3 — bugs, robustesse et accessibilité fonctionnelle ;
5. Phase 4 — architecture et qualité du code ;
6. Phase 5 — performance, tests et CI ;
7. Quality gate **FOUNDATION COMPLETE** ;
8. Phase 6 — direction, contenu et preuves ;
9. Phase 7 — design system ;
10. Phase 8 — hero et navigation ;
11. Phase 9 — études de cas et projets ;
12. Phase 10 — compétences et freelance ;
13. Phase 11 — Dev Notes, témoignages et contact ;
14. Phase 12 — responsive, accessibilité et motion ;
15. Phase 13 — QA visuelle et nouvel audit anti-vibecode ;
16. Quality gate **REFONTE COMPLETE**.

Une tâche terminée doit laisser le dépôt dans un état testable. Une tâche ne doit pas mélanger une correction de fond avec une nouvelle direction artistique, sauf lorsqu’elle est explicitement marquée HYBRID.

## 2. Règles de conservation

- Préserver toutes les fiches des 21 projets et tous leurs champs : id, title, description, category, image, tech, github, demo, detailedContent et gallery.
- Préserver resolveImage et la compatibilité avec import.meta.env.BASE_URL.
- Préserver la vue détail, la galerie, les liens valides et les catégories PROJETS PRO, MISSIONS FREELANCE, OPEN SOURCE, GAMING / MOBILE.
- Ne jamais inventer de chiffre, témoignage, client, résultat, adresse, preuve ou information juridique.
- Ne jamais lancer npm audit fix --force.
- Mettre à jour les dépendances par petits groupes cohérents, avec validation entre les groupes.
- Ne pas supprimer un asset ou une donnée parce qu’elle gêne la future composition ; décider son usage dans la phase DESIGN-REFONTE.
- Ne pas faire de commit, push, pull, fetch, merge, rebase, déploiement ou publication pendant les sessions d’implémentation sans demande distincte.
- Chaque modification de fond doit rester behavior-preserving pour l’interface existante jusqu’au démarrage de la refonte.

## 3. État de départ connu

- Branche observée : main, alignée avec origin/main.
- audit.md provient de la mission d’audit précédente ; ses constats restent la baseline et ses addenda d’exécution sont conservés sans réécriture destructive.
- Le dépôt passe actuellement npm run lint, npm run typecheck, npm run build et npm run verify:build.
- Il n’existe pas de script de test automatisé, de test E2E, d’axe, de link checker ou de Lighthouse branché.
- Codebase Memory recense 353 nœuds et 518 relations ; ses chemins doivent être recroisés avec le checkout courant avant une modification, car son index est partiellement périmé.
- La chaîne visuelle actuelle est volontairement traitée comme dette DESIGN-REFONTE : hero centré/grille/gradient/pills, titres centrés soulignés, cartes répétées, halos, emojis et motion décorative.

## 4. Conventions des tâches

Chaque tâche suit le format demandé :

- Finding audit : contrôle ou finding couvert ;
- Phase : phase d’exécution ;
- Catégorie : FOUNDATION, DESIGN-REFONTE ou HYBRID ;
- Priorité : P0 à P3 ;
- Dépend de : IDs qui doivent être terminés ;
- Fichiers concernés : périmètre probable à confirmer par Codebase Memory ;
- Problème actuel : constat vérifiable ;
- Modification prévue : action bornée ;
- Ce qui ne doit pas changer : contrat et contenu à préserver ;
- Risques : régression possible ;
- Tests à exécuter : preuves attendues ;
- Critères d’acceptation : condition observable ;
- Rollback possible : méthode réversible.

OWNER INPUT REQUIRED signifie qu’une décision ou une preuve appartenant au propriétaire est obligatoire avant de modifier le contenu. Codex ne doit pas la déduire.

# Phase 0 — Baseline et filet de sécurité

## État d’exécution de la Phase 0 — 2026-09-09

- **FND-001 — PASS** : baseline Git/toolchain horodatée ; `npm ci` exact passe dans un environnement isolé ; l’échec du checkout est documenté comme verrouillage `EPERM` de `node_modules` ; aucune branche de correction n’a été créée. Une modification non demandée de `src/data/projects/emploi.ts` a été détectée après la baseline et préservée.
- **FND-002 — PASS avec findings conservés** : rendus local et production capturés à 375/768/1280, arbres d’accessibilité, logs console, métriques de scroll, routes racine/inconnue et inventaire de 51 URLs enregistrés. Les résultats P1-001, P2-001 et P2-003 restent ouverts pour les phases prévues.
- **FND-003 — PASS, renforcé par ARCH-005** : contrôle versionné `scripts/verify-phase0-invariants.mjs` + `scripts/phase0-invariants-baseline.json`, vérifiant 21 projets, 60 articles, champs, catégories, 36 assets, routes, `resolveImage` et `import.meta.env.BASE_URL`. Les doublons d’articles observés dans la baseline initiale ont été préfixés par catégorie pendant ARCH-005 ; le contrôle échoue désormais sur tout doublon. La dérive d’URL de `emploi.ts` reste à traiter dans le périmètre de production/liens.
- **GOV-001 — PASS / OWNER VALIDATED** : validation écrite reçue le 2026-09-10. Les claims `5+`, `30+`, `10+`, `Sous 48h` et les délais indicatifs sont validés ; le témoignage Aqualis est retiré, José devient `J. DM`, les autres témoignages sont conservés selon l’autorisation fournie ; Search Console est le suivi déclaré, sans tracker navigateur dans le dépôt ; privacy est déclarée non nécessaire et une page de mentions légales est requise.
- **Corrections autorisées après GOV-001** : la source Talao pointe vers `https://www.talao.io/index_fr.html` ; la fiche témoignages ne contient plus le retour Aqualis déclaré fake ; la route `/mentions-legales` et son lien Footer ont été ajoutés. La production live reste inchangée tant qu’aucun déploiement n’est demandé.

Artefacts de preuve hors dépôt : `C:/Users/UTILISATEUR/.codex/portfolio-phase0-20260909/phase0-baseline.json`, `phase0-runtime-evidence.json`, `phase0-url-results.json` et `GOV-001-owner-decisions.md`.

## FND-001 — Geler la baseline Git et le toolchain

Finding audit : prérequis global, P3-003  
Phase : 0  
Catégorie : FOUNDATION  
Priorité : P2  
Dépend de : aucune  
Fichiers concernés : package.json, package-lock.json, .nvmrc, .github/workflows/ci.yml  
Problème actuel : .nvmrc contient seulement 22, tandis que package.json exige Node >=22.12.0 et npm >=10 ; le worktree contient déjà audit.md non suivi.  
Modification prévue : documenter la baseline exacte, vérifier les versions, décider d’une version Node patch reproductible et ne créer une branche dédiée qu’au début des corrections.  
Ce qui ne doit pas changer : aucune dépendance ni source n’est modifiée dans cette tâche.  
Risques : confondre l’état local avec celui installé par npm ci.  
Tests à exécuter : git status --short --branch, node --version, npm --version, npm ci dans un environnement de travail dédié.  
Critères d’acceptation : baseline horodatée, branche recommandée codex/foundation-baseline, écart node_modules/lockfile documenté, aucun fichier source modifié.  
Rollback possible : oui, supprimer les notes de session ; aucune mutation du dépôt.

## FND-002 — Capturer le comportement de référence et l’inventaire d’URLs

Finding audit : P1-001, P2-001, P2-003, L01, L10, L19  
Phase : 0  
Catégorie : FOUNDATION  
Priorité : P1  
Dépend de : FND-001  
Fichiers concernés : aucun fichier de production ; artefacts de test hors dépôt  
Problème actuel : les preuves de rendu, de responsive et de liens sont dispersées dans audit.md et ne constituent pas encore un filet de sécurité rejouable.  
Modification prévue : capturer local et production à 375, 768 et 1280 px, l’arbre d’accessibilité, le scroll horizontal, les routes racine/inconnue, les CTA et toutes les URLs externes importantes.  
Ce qui ne doit pas changer : aucune capture ne doit entraîner une modification du code ou des assets.  
Risques : confondre un blocage externe LinkedIn avec un lien mort ; noter séparément 404, 405, timeout et anti-bot.  
Tests à exécuter : navigateur, requêtes HEAD/GET bornées, console/network logs et script de métriques DOM.  
Critères d’acceptation : un jeu de preuves de référence rejouable avec URL, viewport, statut et résultat pour chaque parcours critique.  
Rollback possible : oui, supprimer uniquement les captures temporaires hors dépôt.

## FND-003 — Formaliser les invariants data, routes et assets

Finding audit : règles PROJECT_MEMORY, P2-007, P3-001, P3-005  
Phase : 0  
Catégorie : FOUNDATION  
Priorité : P1  
Dépend de : FND-001  
Fichiers concernés : src/data/projects/types.ts, src/data/projects/index.ts, src/data/projects/*.ts, src/data/articles/*.ts, src/App.tsx  
Problème actuel : la future refonte touchera l’affichage de nombreuses données et pourrait perdre des champs, des images ou des routes de détail.  
Modification prévue : produire une matrice des champs obligatoires, des 21 IDs projets, des 60 articles, des catégories, des images référencées et des URLs ; définir les invariants de non-perte avant toute extraction.  
Ce qui ne doit pas changer : contenu projet, catégories attendues, resolveImage, BrowserRouter et contrats de détail.  
Risques : inventaire incomplet ou confusion entre IDs d’articles locaux et globaux.  
Tests à exécuter : script de comptage des IDs, références d’images, champs obligatoires et catégories.  
Critères d’acceptation : un contrôle automatisable échoue si un projet, un champ ou un asset disparaît.  
Rollback possible : oui, tâche documentaire et script de test isolé.

## GOV-001 — Obtenir les décisions propriétaire sur preuves et obligations

Finding audit : P1-002, P14, P15, L15, L16, L18  
Phase : 1, avant contenu public  
Catégorie : FOUNDATION  
Priorité : P1  
Dépend de : FND-003  
Fichiers concernés : src/data/testimonials.ts, src/components/About.tsx, src/components/Freelance.tsx, src/lib/analytics.ts, éventuelles pages légales  
Problème actuel : les statistiques 5+/30+/10+, Sous 48h, témoignages et hooks analytics n’ont pas de preuve, de politique ou de décision propriétaire dans le dépôt.  
Modification prévue : demander, pour chaque chiffre et témoignage, une validation, un périmètre, une date et une preuve ; demander si les analytics sont activés et si des pages privacy/terms sont nécessaires.  
Ce qui ne doit pas changer : aucune donnée ne doit être inventée pour remplir un tableau.  
Risques : bloquer volontairement la publication de claims non vérifiables ; c’est préférable à une preuve fabriquée.  
Tests à exécuter : contrôle éditorial et relecture propriétaire, pas de test technique substitutif.  
Critères d’acceptation : chaque claim est VALIDÉ, REFORMULÉ SANS CHIFFRE ou RETIRÉ ; la décision analytics/legal est écrite.  
Rollback possible : oui, aucun code modifié ; conserver la décision et revenir au contenu précédent uniquement si validé.

# Phase 1 — Production et crédibilité

## PROD-001 — Réparer ou retirer les deux démos mortes

Finding audit : P1-001, P05  
Phase : 1  
Catégorie : FOUNDATION  
Priorité : P1  
Dépend de : FND-002, GOV-001 si une démo remplace une preuve client  
Fichiers concernés : src/data/projects/gaming.ts, src/data/projects/emploi.ts  
Problème actuel : Aqualis et Talao répondent 404 depuis les URLs publiques utilisées par les fiches.  
Modification prévue : vérifier une URL officielle de remplacement ; à défaut, retirer uniquement le CTA démo et conserver la fiche, l’image, la description, le rôle et le code disponibles.  
Ce qui ne doit pas changer : aucun projet ni champ non ciblé ne doit disparaître.  
Risques : publier une nouvelle URL non vérifiée ou transformer une référence client en claim non autorisé.  
Tests à exécuter : HEAD puis GET, vérification navigateur et contrôle du lien rendu.  
Critères d’acceptation : chaque CTA restant répond avec le statut attendu et mène au bon projet ; aucun CTA ne pointe vers une URL 404.  
Rollback possible : oui, restaurer l’objet data précédent si la nouvelle URL échoue.

## PROD-002 — Servir un vrai statut 404 pour les routes inconnues

Finding audit : P2-003, L01  
Phase : 1  
Catégorie : FOUNDATION  
Priorité : P2  
Dépend de : FND-002  
Fichiers concernés : deploy/Caddyfile.example, configuration Caddy/VPS hors dépôt, scripts/deploy-vps.ps1 si nécessaire, src/App.tsx pour préserver la vue  
Problème actuel : /does-not-exist affiche NotFound mais répond HTTP 200.  
Modification prévue : définir une stratégie serveur compatible SPA qui conserve la récupération visuelle et renvoie 404 pour une URL inconnue ; ne pas simuler le statut dans React.  
Ce qui ne doit pas changer : la route racine, le contenu de NotFound et les routes de ressources valides.  
Risques : casser le fallback des assets ou des URLs historiques.  
Tests à exécuter : requêtes HEAD/GET sur racine, route inconnue, assets, hash et éventuelles routes futures.  
Critères d’acceptation : inconnue = 404 HTML utile ; racine/assets = 200 ; aucune régression du deep link autorisé.  
Rollback possible : oui, restaurer la configuration proxy précédente.

# Phase 2 — Sécurité et supply chain

## SEC-001 — Définir et déployer une CSP compatible

Finding audit : P2-004, S18  
Phase : 2  
Catégorie : FOUNDATION  
Priorité : P2  
Dépend de : FND-002  
Fichiers concernés : deploy/Caddyfile.example, configuration Caddy/VPS, index.html uniquement si une contrainte réelle l’exige  
Problème actuel : la production ne renvoie pas Content-Security-Policy, alors que d’autres headers sont présents.  
Modification prévue : inventorier scripts, styles inline, JSON-LD, images, fonts et éventuels analytics ; déployer d’abord une CSP Report-Only puis enforcement minimal.  
Ce qui ne doit pas changer : HTTPS, HSTS, nosniff, Referrer-Policy, Permissions-Policy et X-Frame-Options.  
Risques : bloquer le rendu ou les métadonnées si les sources sont mal listées.  
Tests à exécuter : headers LIVE, console CSP, chargement racine, images, galerie, Dev Notes et changement de langue.  
Critères d’acceptation : aucune violation nécessaire en enforcement ; aucune source wildcard injustifiée ; rapport documenté.  
Rollback possible : oui, repasser Report-Only ou restaurer la règle proxy.

## SEC-002 — Remédier aux dépendances runtime vulnérables

Finding audit : P2-005, S20  
Phase : 2  
Catégorie : FOUNDATION  
Priorité : P1  
Dépend de : FND-001, FND-003  
Fichiers concernés : package.json, package-lock.json, usages DOMPurify et build runtime  
Problème actuel : npm audit signale DOMPurify 3.4.12 et des entrées de l’arbre production ; node_modules local ne correspond pas entièrement au lockfile.  
Modification prévue : lire chaque advisory, déterminer reachability et version minimale compatible, mettre à jour DOMPurify/nanoid/postcss-selector-parser par groupe runtime cohérent, puis régénérer le lockfile avec npm install contrôlé.  
Ce qui ne doit pas changer : sanitization avant dangerouslySetInnerHTML et comportement visible des contenus.  
Risques : changement de comportement du sanitizer ou du bundler.  
Tests à exécuter : npm audit --omit=dev, lint, typecheck, build, verify-build, rendu Projects/DevNotes et tests sécurité de contenu.  
Critères d’acceptation : aucune vulnérabilité runtime high non traitée ; justification écrite pour chaque advisory restante ; lockfile reproductible.  
Rollback possible : oui, restaurer package.json/package-lock.json et le groupe de dépendances.

## SEC-003 — Remédier aux dépendances de build et d’outillage

Finding audit : P2-005, S20  
Phase : 2  
Catégorie : FOUNDATION  
Priorité : P2  
Dépend de : SEC-002  
Fichiers concernés : package.json, package-lock.json, chaîne ESLint/Tailwind/Vite  
Problème actuel : browserslist, js-yaml et @humanfs/node sont signalés dans l’arbre de développement ; la CI ne bloque que critical.  
Modification prévue : mettre à jour par petits groupes compatibles, supprimer les dépendances réellement mortes seulement après ARCH-006, puis définir le niveau d’audit CI.  
Ce qui ne doit pas changer : scripts existants et résultat CSS/JS attendu sans preuve de remplacement.  
Risques : changement de lint ou de génération CSS.  
Tests à exécuter : npm ci, lint, typecheck, build, verify-build et npm audit complet.  
Critères d’acceptation : versions lockfile et node_modules issues de npm ci ; aucune high oubliée sans justification.  
Rollback possible : oui, rollback par groupe de dépendances.

## SEC-004 — Épingler les actions GitHub

Finding audit : P3-004  
Phase : 2  
Catégorie : FOUNDATION  
Priorité : P3  
Dépend de : FND-001  
Fichiers concernés : .github/workflows/ci.yml  
Problème actuel : checkout@v4 et setup-node@v4 utilisent des tags mutables.  
Modification prévue : remplacer les tags par des SHA vérifiés et conserver le commentaire de version lisible.  
Ce qui ne doit pas changer : permissions read-only, cache, timeout et ordre des checks.  
Risques : SHA erroné ou action incompatible.  
Tests à exécuter : workflow en PR/manuel et reproduction locale des commandes.  
Critères d’acceptation : aucun uses: non épinglé ; CI verte sur un run réel.  
Rollback possible : oui, restaurer les références de tags précédentes.

## SEC-005 — Vérifier secrets courants et historique sans exposition

Finding audit : S01 PASS à revalider, S02 UNKNOWN  
Phase : 2  
Catégorie : FOUNDATION  
Priorité : P1  
Dépend de : FND-001  
Fichiers concernés : .env*, config, historique Git, public, build output temporaire  
Problème actuel : la présence de secrets valides dans l’historique n’a pas été prouvée ; les extraits de tokens dans les articles sont documentaires.  
Modification prévue : lancer un scan redacted des noms/valeurs sensibles et une revue historique limitée, sans imprimer de secret ni réécrire l’historique.  
Ce qui ne doit pas changer : email public volontaire et exemples de code non secrets.  
Risques : faux positifs dans les articles ou fuite accidentelle des sorties du scanner.  
Tests à exécuter : scan redacted, revue des bundles et contrôle .gitignore.  
Critères d’acceptation : aucun secret client valide ; chaque finding historique est classé faux positif ou escaladé pour rotation par le propriétaire.  
Rollback possible : oui, scan en lecture seule sans mutation.

# Phase 3 — Bugs, robustesse et accessibilité fonctionnelle

## BUG-001 — Rendre le sélecteur de langue navigable au clavier

Finding audit : P2-010  
Phase : 3  
Catégorie : FOUNDATION  
Priorité : P2  
Dépend de : FND-002  
Fichiers concernés : src/components/Navbar.tsx, src/lib/i18n.tsx  
Problème actuel : role=listbox/option est présent mais Arrow/Home/End, sélection active et retour focus ne sont pas gérés.  
Modification prévue : utiliser un contrôle natif adapté ou compléter le composant avec focus management et clavier documenté.  
Ce qui ne doit pas changer : locales fr/en, persistance volontaire et mise à jour du titre.  
Risques : double annonce ou perte de focus dans le menu mobile.  
Tests à exécuter : clavier Tab/Enter/Escape/Arrow/Home/End, lecteur d’écran si disponible, mobile menu et axe.  
Critères d’acceptation : ouverture, navigation, sélection et fermeture sont possibles sans souris ; focus visible et ordre logique.  
Rollback possible : oui, restaurer le composant précédent.

## BUG-002 — Rendre la hiérarchie de titres séquentielle

Finding audit : P2-013  
Phase : 3  
Catégorie : FOUNDATION  
Priorité : P2  
Dépend de : FND-003  
Fichiers concernés : src/components/Projects.tsx, renderer detailedContent, composants de section  
Problème actuel : les détails passent de h4 à h5 sans niveau intermédiaire et le renderer Markdown fabrique des niveaux selon le texte.  
Modification prévue : définir une hiérarchie sémantique stable indépendante des tailles Tailwind.  
Ce qui ne doit pas changer : le texte des fiches, leur ordre et le rendu global avant refonte.  
Risques : modifier le style apparent si les classes dépendent des balises.  
Tests à exécuter : arbre des titres, axe, navigation par headings et snapshot DOM ciblé.  
Critères d’acceptation : aucun saut de niveau dans les parcours principaux ; h1 unique ; styles visuels conservés temporairement.  
Rollback possible : oui, revert du mapping de balises.

## BUG-003 — Ajouter un état d’erreur et retry à Dev Notes

Finding audit : P2-011, D17  
Phase : 3  
Catégorie : FOUNDATION  
Priorité : P2  
Dépend de : FND-002  
Fichiers concernés : src/components/DevNotes.tsx, loaders src/data/articles  
Problème actuel : l’import async est dans try/finally sans catch ni feedback d’échec.  
Modification prévue : ajouter état idle/loading/success/error, message accessible et retry idempotent.  
Ce qui ne doit pas changer : contenu des articles, catégories et sanitization.  
Risques : état stale après changement rapide de catégorie.  
Tests à exécuter : import réussi, import rejeté simulé, retry, double clic, clavier et reduced motion.  
Critères d’acceptation : toute erreur donne une action de récupération et ne laisse pas une section vide silencieuse.  
Rollback possible : oui, restaurer le handler avec les tests associés.

## BUG-004 — Synchroniser hash, historique et boutons précédent/suivant

Finding audit : section UX/TS de audit.md, P2-007 associé  
Phase : 3  
Catégorie : FOUNDATION  
Priorité : P2  
Dépend de : FND-003  
Fichiers concernés : src/components/Projects.tsx, src/App.tsx si route nécessaire  
Problème actuel : replaceState et lecture initiale du hash existent, mais aucun listener popstate ne resynchronise la vue.  
Modification prévue : isoler le contrôleur hash, écouter popstate, gérer hash invalide et restaurer le scroll/focus attendu.  
Ce qui ne doit pas changer : URLs de projets valides, galerie et données.  
Risques : boucle d’historique ou ouverture d’un mauvais projet au rechargement.  
Tests à exécuter : ouvrir, précédent, suivant, reload, hash invalide, mobile et fermeture de détail.  
Critères d’acceptation : URL et vue restent synchronisées dans chaque sens sans entrée d’historique parasite.  
Rollback possible : oui, restaurer le contrôleur précédent.

## BUG-005 — Protéger l’initialisation et l’écriture localStorage

Finding audit : robustesse i18n, section 19  
Phase : 3  
Catégorie : FOUNDATION  
Priorité : P2  
Dépend de : FND-002  
Fichiers concernés : src/lib/i18n.tsx  
Problème actuel : localStorage peut lever une exception dans un navigateur restreint ou une politique privée.  
Modification prévue : encapsuler lecture/écriture, fallback fr et synchronisation document sans faire tomber l’application.  
Ce qui ne doit pas changer : choix fr/en et métadonnées actuellement mises à jour.  
Risques : masquer une vraie erreur si le fallback est trop large.  
Tests à exécuter : localStorage disponible, absent, quota/exception simulée, changement de langue.  
Critères d’acceptation : l’application reste navigable avec stockage bloqué ; aucune donnée sensible n’est écrite.  
Rollback possible : oui, revert du helper de stockage.

## BUG-006 — Clarifier les rôles sémantiques des icônes et images décoratives

Finding audit : section accessibilité, W03/P16 et L09  
Phase : 3  
Catégorie : FOUNDATION  
Priorité : P2  
Dépend de : FND-003  
Fichiers concernés : src/components/About.tsx, Skills.tsx, Navbar.tsx, Projects.tsx, Testimonials.tsx, DevNotes.tsx  
Problème actuel : plusieurs SVG décoratifs et éléments d’icône n’expriment pas clairement s’ils sont informatifs ou silencieux.  
Modification prévue : aria-hidden pour décoration, alt utile pour information, labels pour actions et suppression des doublons annoncés.  
Ce qui ne doit pas changer : images projet porteuses d’information ni leurs chemins.  
Risques : masquer une image qui devrait être annoncée.  
Tests à exécuter : arbre d’accessibilité, axe, clavier et contrôle manuel des alt.  
Critères d’acceptation : chaque image significative a un alt utile ; chaque décoration est silencieuse ; aucune action n’est identifiée seulement par couleur.  
Rollback possible : oui, revert ciblé.

# Phase 4 — Architecture et qualité du code

## ARCH-001 — Activer progressivement la strictness TypeScript

Finding audit : P2-006  
Phase : 4  
Catégorie : FOUNDATION  
Priorité : P2  
Dépend de : FND-003  
Fichiers concernés : tsconfig.json, tsconfig.app.json, fichiers TypeScript révélés par le compilateur  
Problème actuel : strict, noImplicitAny et noUnused sont désactivés.  
Modification prévue : activer une règle à la fois ou par sous-périmètre, corriger les diagnostics réels et documenter les exceptions minimales.  
Ce qui ne doit pas changer : comportement runtime et API de données.  
Risques : gros diff de typage ou contournements any.  
Tests à exécuter : npm run typecheck à chaque étape, lint, build et revue diff.  
Critères d’acceptation : règles choisies actives, zéro erreur non justifiée, aucun any ajouté pour faire passer le check.  
Rollback possible : oui, rollback par règle activée.

## ARCH-002 — Extraire le parser Markdown et la sanitization de Projects

Finding audit : P2-007  
Phase : 4  
Catégorie : FOUNDATION  
Priorité : P2  
Dépend de : FND-003, BUG-002  
Fichiers concernés : src/components/Projects.tsx, nouveaux helpers src/lib ou src/components/projects  
Problème actuel : parsing, décoration, escaping et préparation DOM sont mêlés au composant de page.  
Modification prévue : extraire un module pur pour formatage/parser, conserver escaping et DOMPurify à la frontière d’affichage.  
Ce qui ne doit pas changer : HTML produit, contenu detailedContent, sécurité de sanitization et classes visuelles temporaires.  
Risques : différence subtile de rendu Markdown ou titres.  
Tests à exécuter : fixtures de contenu projet, chaînes HTML inoffensives, build et comparaison DOM.  
Critères d’acceptation : même sortie observable pour les 21 projets, module testable sans navigateur, aucune nouvelle source HTML non sanitizée.  
Rollback possible : oui, revert de l’extraction.

## ARCH-003 — Extraire détail, galerie et contrôleur de navigation projet

Finding audit : P2-007, section architecture  
Phase : 4  
Catégorie : FOUNDATION  
Priorité : P2  
Dépend de : BUG-004, ARCH-002  
Fichiers concernés : src/components/Projects.tsx, futurs ProjectDetail/ProjectGallery/ProjectNavigation  
Problème actuel : le composant de plus de mille lignes porte grille, détail, galerie, hash et données bilingues.  
Modification prévue : séparer responsabilités avec props explicites et préserver les contrats d’image, focus, Escape et liens.  
Ce qui ne doit pas changer : rendu fonctionnel et toutes les informations projet ; aucune nouvelle direction visuelle.  
Risques : perte du focus trap ou divergence fr/en.  
Tests à exécuter : E2E détail/galerie, clavier, back/forward, typecheck, snapshot de données.  
Critères d’acceptation : chaque sous-composant a une responsabilité testable et la sortie actuelle reste behavior-preserving.  
Rollback possible : oui, revert des extractions dans l’ordre inverse.

## ARCH-004 — Séparer contenu i18n, données projet et locale d’affichage

Finding audit : P2-009  
Phase : 4  
Catégorie : FOUNDATION  
Priorité : P2  
Dépend de : FND-003, GOV-001  
Fichiers concernés : src/lib/i18n.tsx, src/components/Skills.tsx, Freelance.tsx, DevNotes.tsx, src/data/projects/englishDetails.ts  
Problème actuel : l’interface traduit une partie des labels, mais laisse des compétences et articles français ou supprime des sections dans la branche anglaise.  
Modification prévue : définir un contrat de parité, externaliser les labels UI et marquer explicitement les contenus non traduits avant de les traduire.  
Ce qui ne doit pas changer : texte source français et données projet complètes.  
Risques : traduction automatique non validée ou régression SEO client.  
Tests à exécuter : snapshot fr/en des titres, sections, labels, meta et contenu projet.  
Critères d’acceptation : chaque locale affiche la même structure fonctionnelle ; contenu indisponible explicitement signalé ; aucun texte inventé.  
Rollback possible : oui, revert par locale.

## ARCH-005 — Rendre les IDs d’articles globalement uniques

Finding audit : P3-001  
Phase : 4  
Catégorie : FOUNDATION  
Priorité : P3  
Dépend de : FND-003  
Fichiers concernés : src/data/articles/*.ts, types, éventuelles clés/routes d’article  
Problème actuel : 60 articles ne produisent que 52 IDs uniques à l’échelle du catalogue.  
Modification prévue : préfixer par catégorie ou créer des slugs stables, avec mapping de compatibilité si une URL existe.  
Ce qui ne doit pas changer : titres, contenu, catégories et ordre d’affichage.  
Risques : casser une future URL ou une clé persistée.  
Tests à exécuter : unicité globale, rendu de chaque catégorie, navigation article et build.  
Critères d’acceptation : aucun doublon global ; aucune catégorie perdue.  
Rollback possible : oui, restaurer les IDs et le mapping.

## ARCH-006 — Auditer puis supprimer uniquement les résidus confirmés

Finding audit : P3-002  
Phase : 4  
Catégorie : FOUNDATION  
Priorité : P3  
Dépend de : FND-003, ARCH-001  
Fichiers concernés : Footer.tsx, wrappers UI, package.json/package-lock.json  
Problème actuel : import Heart inutilisé et surface Radix/template possiblement non utilisée.  
Modification prévue : produire un graphe d’imports et une analyse de dépendances ; supprimer uniquement ce qui n’est référencé ni par l’application ni par les tests/outils.  
Ce qui ne doit pas changer : composants conservés par le design system local et runtime Toaster/Tooltip.  
Risques : supprimer un import dynamique ou une dépendance de build implicite.  
Tests à exécuter : lint strict, typecheck, build, npm ci, smoke navigation.  
Critères d’acceptation : zéro import mort confirmé dans le périmètre ; bundle inchangé fonctionnellement ; lockfile cohérent.  
Rollback possible : oui, revert fichier par fichier.

## ARCH-007 — Aligner .nvmrc avec le runtime validé

Finding audit : P3-003  
Phase : 4  
Catégorie : FOUNDATION  
Priorité : P3  
Dépend de : FND-001  
Fichiers concernés : .nvmrc, README.md, CI si nécessaire  
Problème actuel : le major Node ne garantit pas Node >=22.12.0.  
Modification prévue : choisir une version patch validée et aligner documentation/CI.  
Ce qui ne doit pas changer : contraintes package.json sans preuve contraire.  
Risques : divergence entre poste développeur et runner.  
Tests à exécuter : npm ci, lint, typecheck, build sur le runtime retenu.  
Critères d’acceptation : une seule version recommandée et reproductible est documentée.  
Rollback possible : oui, restaurer .nvmrc.

## ARCH-008 — Corriger les écarts de finition non visuels structurants

Finding audit : P3-006, L06  
Phase : 4  
Catégorie : FOUNDATION  
Priorité : P3  
Dépend de : GOV-001  
Fichiers concernés : public/og-image.svg, public/site.webmanifest, src/components/Skills.tsx  
Problème actuel : typo ERP leger, baseline d’icônes limitée et libellé GitHub Pages incohérent avec le déploiement VPS.  
Modification prévue : corriger la faute, compléter uniquement les icônes réellement nécessaires et remplacer le libellé obsolète par une formulation vérifiée.  
Ce qui ne doit pas changer : contenu métier non concerné et stratégie de base path.  
Risques : ajouter des assets lourds ou inventer une capacité de déploiement.  
Tests à exécuter : verify-build, validation manifest, capture sociale si disponible et relecture.  
Critères d’acceptation : texte sans faute, références d’icônes valides, aucun libellé obsolète non expliqué.  
Rollback possible : oui, restaurer les trois fichiers.

# Phase 5 — Performance, tests et CI

## PERF-001 — Différer réellement le chargement des sections

Finding audit : P2-008  
Phase : 5  
Catégorie : FOUNDATION  
Priorité : P2  
Dépend de : ARCH-003, QA-001  
Fichiers concernés : src/pages/Index.tsx, composants sections  
Problème actuel : les six lazy imports sont rendus immédiatement sous un seul Suspense.  
Modification prévue : charger au viewport ou par intention utilisateur avec une primitive simple et un état de chargement accessible.  
Ce qui ne doit pas changer : ordre des sections, ancres, contenu et navigation.  
Risques : contenu non indexable ou ancres qui sautent si le chargement est trop agressif.  
Tests à exécuter : réseau initial, scroll, anchor navigation, reduced motion, build et performance mobile.  
Critères d’acceptation : chunks non nécessaires non demandés au premier rendu ; toutes les sections finissent par être accessibles et stables.  
Rollback possible : oui, restaurer les imports immédiats.

## PERF-002 — Optimiser la livraison des images sans toucher à l’art direction

Finding audit : P3-005, L20  
Phase : 5  
Catégorie : FOUNDATION  
Priorité : P2  
Dépend de : FND-003, QA-001  
Fichiers concernés : public/img_projects, public/img_clients, data image refs, composants image  
Problème actuel : plusieurs PNG dépassent 1 à 3,5 Mo, sans WebP/AVIF ni variantes de taille.  
Modification prévue : générer des dérivés dimensionnés et modernes, conserver les originaux si nécessaires, puis choisir srcset/sizes sans redessiner les cartes.  
Ce qui ne doit pas changer : image associée à chaque projet, alt, resolveImage et galerie.  
Risques : compression destructive, mauvais crop ou chemin cassé.  
Tests à exécuter : inventaire dimensions/poids, visual diff des 21 projets, build, réseau mobile.  
Critères d’acceptation : baisse mesurable du poids initial/lazy, aucun asset manquant, qualité visuelle acceptable.  
Rollback possible : oui, restaurer les fichiers dérivés et les refs.

## QA-001 — Installer le socle de tests sans redessiner l’UI

Finding audit : P2-012  
Phase : 5  
Catégorie : FOUNDATION  
Priorité : P1  
Dépend de : FND-003, ARCH-001  
Fichiers concernés : package.json, configuration test, tests/  
Problème actuel : aucun script test ni fixture automatisée.  
Modification prévue : choisir un runner compatible avec les dépendances existantes et créer des helpers pour données projet, locale, routes et rendu.  
Ce qui ne doit pas changer : runtime de production et aucune dépendance de design.  
Risques : ajouter une pile de test trop lourde ou des tests couplés au DOM actuel.  
Tests à exécuter : test runner, lint, typecheck et build.  
Critères d’acceptation : npm test ou équivalent reproductible, fixtures isolées et échec démontré sur une régression volontaire puis restauré.  
Rollback possible : oui, retirer la configuration et les dépendances de test.

## QA-002 — Couvrir les parcours E2E critiques

Finding audit : P2-012, L02, L11, L12, P05  
Phase : 5  
Catégorie : FOUNDATION  
Priorité : P1  
Dépend de : QA-001, PROD-001, PROD-002, BUG-001, BUG-003, BUG-004  
Fichiers concernés : tests E2E, package.json, éventuellement vite preview config  
Problème actuel : aucune preuve automatisée pour menu, locale, projet, galerie, back/forward, Dev Notes, NotFound et CTA.  
Modification prévue : créer des scénarios courts et indépendants sur local preview.  
Ce qui ne doit pas changer : aucun test ne doit exiger un service distant mutable sauf link checker séparé.  
Risques : tests flaky liés aux animations ou aux URLs externes.  
Tests à exécuter : suite E2E séquentielle sur preview.  
Critères d’acceptation : parcours critique vert sur desktop et viewport mobile ; échec lisible en cas de régression.  
Rollback possible : oui, retirer un scénario flaky après cause racine documentée.

## QA-003 — Ajouter axe et vérifications clavier

Finding audit : P2-010, P2-013, BUG-006, L09, S18 smoke  
Phase : 5  
Catégorie : FOUNDATION  
Priorité : P1  
Dépend de : QA-001, BUG-001, BUG-002, BUG-006  
Fichiers concernés : tests accessibilité, composants interactifs  
Problème actuel : la vérification accessibilité est visuelle et partielle.  
Modification prévue : axe ciblé sur root, menu, détail projet, galerie, Dev Notes et contact ; tests clavier explicites.  
Ce qui ne doit pas changer : textes projet et comportement métier validé.  
Risques : faux positifs de contraste sur choix visuel actuel ; classer les exceptions avec preuve.  
Tests à exécuter : axe, Tab/Shift+Tab, Escape, Enter, Arrow, zoom texte et reduced motion.  
Critères d’acceptation : zéro violation bloquante sur parcours critiques ; chaque exception est documentée et non masquée.  
Rollback possible : oui, tests indépendants du runtime.

## QA-004 — Ajouter un link checker critique

Finding audit : P1-001, P2-012, L19  
Phase : 5  
Catégorie : FOUNDATION  
Priorité : P1  
Dépend de : QA-001, PROD-001  
Fichiers concernés : script de vérification, CI  
Problème actuel : deux démos mortes ont été découvertes manuellement et aucun contrôle ne les empêcherait de revenir.  
Modification prévue : extraire les URLs attendues depuis les données, classer les réponses externes anti-bot, et échouer sur 4xx/5xx des liens critiques.  
Ce qui ne doit pas changer : aucune requête intrusive ni boucle large sur des domaines externes.  
Risques : instabilité de services tiers ; retries bornés et allowlist de statut documentée.  
Tests à exécuter : URLs fixtures 200/404/405/timeout simulées, puis inventaire réel borné.  
Critères d’acceptation : un lien critique 404 fait échouer le check ; LinkedIn 405 est classé UNKNOWN et non PASS silencieux.  
Rollback possible : oui, désactiver le job sans supprimer le script.

## QA-005 — Brancher Lighthouse ou un contrôle performance équivalent

Finding audit : P2-012, L10, L20  
Phase : 5  
Catégorie : FOUNDATION  
Priorité : P2  
Dépend de : QA-001, PERF-001, PERF-002, HYB-004  
Fichiers concernés : package.json, .lighthouserc.json ou outil choisi, CI  
Problème actuel : .lighthouserc.json existe mais lhci n’est pas installé et ses seuils sont seulement warnings.  
Modification prévue : installer/configurer le minimum nécessaire, choisir des seuils mesurables et éviter l’upload externe de rapports si non nécessaire.  
Ce qui ne doit pas changer : aucune nouvelle dépendance runtime.  
Risques : seuils trop ambitieux ou variables selon le runner.  
Tests à exécuter : Lighthouse local sur 375/1280, répétitions bornées, build preview.  
Critères d’acceptation : performance, accessibility, best practices et SEO ont des résultats enregistrés ; les seuils bloquants sont justifiés.  
Rollback possible : oui, retirer l’intégration CI et conserver la commande locale.

## QA-006 — Créer la régression responsive de référence

Finding audit : P2-001, L10, L20  
Phase : 5  
Catégorie : FOUNDATION  
Priorité : P1  
Dépend de : QA-001, FND-002  
Fichiers concernés : tests E2E/visual, configuration viewport  
Problème actuel : le site n’a pas de preuve automatisée à 375, 768 et 1280 px ; l’overflow production est confirmé.  
Modification prévue : créer des assertions d’overflow, visibilité CTA/nav, wrapping headings, images, grilles, sticky/fixed elements et screenshots de référence.  
Ce qui ne doit pas changer : aucune règle visuelle de la future refonte dans cette tâche.  
Risques : snapshots trop sensibles à des différences de police ou de navigateur.  
Tests à exécuter : suite sur trois viewports, avec comparaison DOM et capture ciblée.  
Critères d’acceptation : aucune largeur document supérieure au viewport, aucun recouvrement navbar/hero, CTA atteignable.  
Rollback possible : oui, retirer les snapshots sans toucher au code.

## CI-001 — Intégrer les contrôles dans la CI

Finding audit : P2-012, S20, P3-004  
Phase : 5  
Catégorie : FOUNDATION  
Priorité : P1  
Dépend de : SEC-002, SEC-003, SEC-004, QA-002, QA-003, QA-004, QA-005, QA-006  
Fichiers concernés : .github/workflows/ci.yml, package.json  
Problème actuel : la CI ne lance ni tests, ni E2E, ni axe, ni liens, ni Lighthouse, et ne bloque que critical pour npm audit.  
Modification prévue : ajouter des jobs séparés et lisibles, conserver permissions read-only, cache et timeout, puis définir les seuils high/critical documentés.  
Ce qui ne doit pas changer : ordre de base lint/typecheck/build/verify-build et comportement du dépôt.  
Risques : CI trop lente ou dépendante d’externe ; jobs parallélisables et timeouts bornés.  
Tests à exécuter : reproduction locale puis workflow manuel/PR.  
Critères d’acceptation : chaque gate retourne un statut explicite ; un échec de test, lien critique ou vulnérabilité bloquante arrête la validation.  
Rollback possible : oui, rollback job par job.

# HYBRID — fond maintenant, direction visuelle ensuite

## HYB-001 — Valider les preuves puis les recomposer

Finding audit : P1-002, P04, P14, P15  
Phase : 1 puis 6/11  
Catégorie : HYBRID  
Priorité : P1  
Dépend de : GOV-001, FND-003  
Fichiers concernés : src/data/testimonials.ts, About.tsx, Freelance.tsx, futurs composants de preuve  
Problème actuel : le fond nécessite une décision propriétaire ; la future direction doit aussi décider si ces preuves méritent une place visuelle.  
Modification prévue : maintenant, valider/reformuler/retirer chaque claim ; après gate, transformer les preuves validées en éléments éditoriaux statiques et contextuels.  
Ce qui ne doit pas changer : aucune citation ou métrique non validée ne doit être conservée pour remplir la nouvelle UI.  
Risques : bloquer une section entière si aucune preuve n’est autorisée ; prévoir une composition sans témoignages.  
Tests à exécuter : relecture propriétaire, contrôle de contenu, puis QA visuelle et accessibilité de la présentation.  
Critères d’acceptation : aucun claim UNKNOWN dans la livraison ; la présentation ne ressemble pas à un compteur marketing.  
Rollback possible : oui, désactiver la section de preuve et garder la fiche projet.

## HYB-002 — Stabiliser Typography maintenant, refondre l’éditorial ensuite

Finding audit : P2-002  
Phase : 3 puis 11  
Catégorie : HYBRID  
Priorité : P2  
Dépend de : FND-003  
Fichiers concernés : tailwind.config.ts, DevNotes.tsx, futur index/article detail  
Problème actuel : les classes prose n’ont aucune règle générée ; la correction de fond est indépendante de la future composition, mais son rendu final sera redesigné.  
Modification prévue : maintenant, activer le plugin ou remplacer les classes par un style réel et vérifier lisibilité/HTML ; après gate, recomposer l’index et le détail éditorial.  
Ce qui ne doit pas changer : contenu article, sanitization, catégories et chargement async.  
Risques : modifier temporairement l’apparence avant la refonte ; accepter une apparence neutre et lisible comme étape intermédiaire.  
Tests à exécuter : build CSS, rendu titre/tableau/code/image, axe et snapshots.  
Critères d’acceptation : les articles ont une typographie lisible dans la baseline ; la refonte peut changer la composition sans restaurer le bug.  
Rollback possible : oui, revert de la configuration Typography.

## HYB-003 — Définir une proposition véridique avant de dessiner le hero

Finding audit : P2-017, P17, W09/W10  
Phase : 1 puis 6/8  
Catégorie : HYBRID  
Priorité : P2  
Dépend de : GOV-001, FND-003  
Fichiers concernés : Hero.tsx, About.tsx, Freelance.tsx, contenu éditorial  
Problème actuel : le hero adresse plusieurs audiences et empile capacités, tags et CTA ; la phrase de positionnement doit être vraie avant toute composition.  
Modification prévue : maintenant, définir audience primaire, proposition, action et preuves autorisées ; après gate, reconstruire la composition avec ces éléments.  
Ce qui ne doit pas changer : possibilité de conserver les contextes secondaires dans des sections dédiées.  
Risques : choisir une audience sans validation métier.  
Tests à exécuter : relecture owner, test de compréhension en cinq secondes, puis QA responsive et clavier.  
Critères d’acceptation : une phrase explique qui est aidé, par quel type de travail et avec quelle preuve ; aucun jargon générique ajouté.  
Rollback possible : oui, contenu versionné indépendamment du layout.

## HYB-004 — Corriger l’overflow maintenant et redessiner le mobile après le gate

Finding audit : P2-001, L10, D22 associé  
Phase : 3 puis 12  
Catégorie : HYBRID  
Priorité : P1  
Dépend de : FND-002  
Fichiers concernés : Testimonials.tsx, conteneurs globaux, future responsive layout  
Problème actuel : w-screen/left-1/2 provoque environ 7–8 px de débordement en production ; la future composition mobile doit être redessinée séparément.  
Modification prévue : maintenant, neutraliser la cause mécanique sans changer la direction ; après gate, concevoir mobile/tablette/desktop selon le blueprint.  
Ce qui ne doit pas changer : contenu des témoignages tant que GOV-001 n’a pas statué.  
Risques : masquer un overflow issu d’une autre section ; l’assertion QA-006 doit rester active.  
Tests à exécuter : 375/768/1280, scrollWidth/clientWidth, screenshots et axe.  
Critères d’acceptation : baseline sans overflow avant refonte ; composition future non contrainte par le workaround.  
Rollback possible : oui, restaurer le conteneur puis traiter la cause exacte.

# DESIGN-REFONTE — après FOUNDATION COMPLETE

## DES-001 — Arrêter la direction artistique et le contenu approuvés

Finding audit : P2-014, P2-015, P2-017, W03, W09, W10, P20, sections 30.1/30.3  
Phase : 6  
Catégorie : DESIGN-REFONTE  
Priorité : P2  
Dépend de : FOUNDATION COMPLETE, HYB-001, HYB-003  
Fichiers concernés : audit.md, contenu validé, futur brief de design  
Problème actuel : la direction actuelle est prédictible comme portfolio IA : hero centré, grille, gradient, pills, cartes et motion.  
Modification prévue : écrire la phrase Design Read, choisir l’audience prioritaire, sélectionner les preuves réelles et valider une direction dossier de travail éditorial.  
Ce qui ne doit pas changer : vérité des projets, contraintes d’accessibilité et décisions propriétaire.  
Risques : remplacer le template par une nouveauté arbitraire.  
Tests à exécuter : critique de brief, revue contenu, check anti-slop catégories reflex.  
Critères d’acceptation : une direction explique pourquoi chaque motif appartient au portfolio ; aucun élément n’est ajouté pour remplir un espace.  
Rollback possible : oui, revenir au brief approuvé avant implémentation.

## DES-002 — Construire le nouveau design system visuel

Finding audit : P2-015, P2-016, D01, D05, D06, D08, D09, D15, D18, D19, D23, W03, P16  
Phase : 7  
Catégorie : DESIGN-REFONTE  
Priorité : P2  
Dépend de : DES-001  
Fichiers concernés : src/index.css, tailwind.config.ts, primitives UI locales  
Problème actuel : gradients, glows, radius, borders et card shadows sont le langage par défaut de chaque section.  
Modification prévue : définir surfaces, texte, accent, action, typographie, spacing scale et deux variantes de conteneur ; retirer la grille/glow/gradient décoratifs et réduire les cards.  
Ce qui ne doit pas changer : stack React/Tailwind, icon library existante, focus-visible et contrastes validés.  
Risques : perte de contraste ou changement global trop large.  
Tests à exécuter : snapshots visuels, contraste, zoom, reduced motion, lint/typecheck/build.  
Critères d’acceptation : aucune section n’hérite automatiquement d’un gradient/glow/card ; les tokens expriment une hiérarchie mesurable.  
Rollback possible : oui, commit isolé des tokens et classes.

## DES-003 — Recomposer header, navigation et hero

Finding audit : P2-014, P2-017, P10, P06, D19, D21, D23, sections 31/33  
Phase : 8  
Catégorie : DESIGN-REFONTE  
Priorité : P1  
Dépend de : DES-002, HYB-003  
Fichiers concernés : Navbar.tsx, Hero.tsx, App/page shell  
Problème actuel : premier écran centré et surchargé ; titre gradient animé, grille, quatre pills, double CTA et flèche bounce.  
Modification prévue : créer un hero asymétrique : proposition unique, preuve projet réelle, un CTA principal et navigation courte.  
Ce qui ne doit pas changer : ancres utiles, contact, projets, CV et locale.  
Risques : perdre la lisibilité du métier ou rendre l’action principale moins visible.  
Tests à exécuter : 375/768/1280, clavier, axe, capture first viewport, reduced motion.  
Critères d’acceptation : message et action compris en quelques secondes ; aucune grille, shimmer, pill décorative ou flèche bounce nécessaire.  
Rollback possible : oui, commit UI isolé.

## DES-004 — Transformer Projects en études de cas éditoriales

Finding audit : P2-014, P2-015, P2-016, P07, D14, sections 31/32  
Phase : 9  
Catégorie : DESIGN-REFONTE  
Priorité : P1  
Dépend de : DES-002, DES-003, ARCH-003, PROD-001  
Fichiers concernés : composants d’affichage projet, src/data/projects, assets  
Problème actuel : les projets sont une grille de cartes identiques après une sélection de boutons emoji.  
Modification prévue : afficher trois à cinq cas prioritaires en lignes alternées image/texte avec contexte, rôle, contrainte, décision et résultat ; déplacer l’archive et les catégories dans un niveau secondaire.  
Ce qui ne doit pas changer : toutes les fiches, galeries, liens valides et catégories.  
Risques : masquer les projets secondaires ou augmenter le poids initial.  
Tests à exécuter : inventaire FND-003, E2E détail/galerie, images, clavier et responsive.  
Critères d’acceptation : une étude de cas montre une preuve avant les tags techniques ; aucun projet n’est perdu.  
Rollback possible : oui, basculer vers l’affichage de l’archive précédente.

## DES-005 — Remplacer la grille Skills par une matrice de preuves

Finding audit : P2-015, P2-016, D06, D22  
Phase : 10  
Catégorie : DESIGN-REFONTE  
Priorité : P2  
Dépend de : DES-002, DES-004  
Fichiers concernés : Skills.tsx, data de compétences/projets  
Problème actuel : huit cartes avec icônes et listes de technologies hors contexte.  
Modification prévue : associer chaque capacité à un ou plusieurs projets, livrables ou environnements ; utiliser une table/liste éditoriale compacte.  
Ce qui ne doit pas changer : compétences réellement revendiquées sans en inventer de nouvelles.  
Risques : interpréter un outil cité comme compétence experte sans preuve.  
Tests à exécuter : relecture data, axe, responsive, absence d’hover trompeur.  
Critères d’acceptation : chaque compétence visible répond à où l’ai-je utilisée ou est clairement présentée comme expérience.  
Rollback possible : oui, restaurer la liste précédente.

## DES-006 — Recomposer Freelance autour des livrables et de la méthode

Finding audit : P1-002, P2-015, P2-016, P2-017, P15, sections 31/32  
Phase : 10  
Catégorie : DESIGN-REFONTE  
Priorité : P1  
Dépend de : DES-001, HYB-001, HYB-003  
Fichiers concernés : Freelance.tsx, données claims/packages/caseStudies  
Problème actuel : grand titre centré, pills, quatre cartes de preuve et offres qui ressemblent à une grille tarifaire générique.  
Modification prévue : présenter problèmes traités, livrables, étapes et modes de collaboration en lignes/chronologie ; supprimer toute promesse non validée.  
Ce qui ne doit pas changer : services réellement proposés, FAQ utile et liens contact.  
Risques : promettre un délai ou un résultat non validé.  
Tests à exécuter : contrôle GOV-001, clavier details, axe, responsive et relecture métier.  
Critères d’acceptation : chaque bloc explique un livrable ou une décision ; aucun compteur décoratif ni Sous 48h non validé.  
Rollback possible : oui, restaurer la section Freelance seule.

## DES-007 — Refaire Dev Notes en index éditorial lisible

Finding audit : P2-002, P2-015, P2-016, P07, D17  
Phase : 11  
Catégorie : DESIGN-REFONTE  
Priorité : P2  
Dépend de : HYB-002, DES-002  
Fichiers concernés : DevNotes.tsx, src/data/articles, Typography config  
Problème actuel : cinq boutons emoji centrés, grand vide avant le contenu et cartes génériques pour un corpus éditorial important.  
Modification prévue : index à deux colonnes ou liste filtrable avec titre, thème, date et résumé ; détail avec largeur de lecture 60–75 caractères et navigation claire.  
Ce qui ne doit pas changer : contenu des 60 articles, catégories, sanitization et chargement async.  
Risques : perdre la découverte des articles ou créer une fausse date.  
Tests à exécuter : E2E catégorie/article/retry, axe, Typography, responsive et performance.  
Critères d’acceptation : le corpus est lisible et trouvable sans emoji obligatoire ni espace vide décoratif.  
Rollback possible : oui, réactiver l’index précédent.

## DES-008 — Présenter les témoignages comme preuves statiques validées

Finding audit : P1-002, P04, P06, P15, D05, D18  
Phase : 11  
Catégorie : DESIGN-REFONTE  
Priorité : P1  
Dépend de : HYB-001, DES-002  
Fichiers concernés : Testimonials.tsx, src/data/testimonials.ts  
Problème actuel : ticker infini, avatars/cartes et identités anonymisées créent une preuve marketing automatique sans contexte suffisant.  
Modification prévue : afficher une ou deux citations validées avec contexte projet, rôle et date si autorisés ; supprimer entièrement la section si aucune preuve n’est confirmée.  
Ce qui ne doit pas changer : confidentialité et anonymisation validées par le propriétaire.  
Risques : exposer un client ou présenter un avis non autorisé.  
Tests à exécuter : revue propriétaire, axe, reduced motion, responsive et liens éventuels.  
Critères d’acceptation : aucun ticker automatique ; chaque citation est traçable ou la section est absente.  
Rollback possible : oui, retirer la section sans toucher aux études de cas.

## DES-009 — Simplifier Contact et Footer

Finding audit : P2-015, P2-016, L19  
Phase : 11  
Catégorie : DESIGN-REFONTE  
Priorité : P2  
Dépend de : DES-002, DES-003  
Fichiers concernés : Contact.tsx, Footer.tsx, Navbar.tsx  
Problème actuel : grande carte contenant deux cartes de contexte et plusieurs CTA, avec reprise du gradient au footer.  
Modification prévue : une proposition courte, deux contextes en texte structuré si utiles, email/LinkedIn comme actions claires, footer minimal.  
Ce qui ne doit pas changer : canaux de contact réels et sujet mailto.  
Risques : réduire la visibilité du contact.  
Tests à exécuter : E2E CTA, clavier, axe, responsive et vérification des URLs.  
Critères d’acceptation : un visiteur sait quoi envoyer et par quel canal sans traverser des cartes imbriquées.  
Rollback possible : oui, restaurer Contact/Footer.

## DES-010 — Concevoir mobile, tablette et desktop comme compositions distinctes

Finding audit : P2-001, L10, D15, sections 31-33  
Phase : 12  
Catégorie : DESIGN-REFONTE  
Priorité : P1  
Dépend de : DES-003, DES-004, DES-006, DES-009, HYB-004, QA-006  
Fichiers concernés : shell, toutes sections redesignées, src/index.css  
Problème actuel : la page actuelle réduit des blocs desktop et conserve les mêmes cartes/alignements ; l’overflow existe en production.  
Modification prévue : définir explicitement ordre, densité, largeur de lecture, navigation, images, CTA et sticky elements aux trois largeurs.  
Ce qui ne doit pas changer : aucun contenu projet ni lien.  
Risques : divergence fr/en ou régression des ancres.  
Tests à exécuter : screenshots 375/768/1280, axe, zoom, touch target, scrollWidth et E2E.  
Critères d’acceptation : composition mobile lisible sans overflow, desktop non étiré, tablet sans collision.  
Rollback possible : oui, commit responsive isolé.

## DES-011 — Repasser toutes les interactions par les états accessibles

Finding audit : D22, L11/L12, sections 13/32  
Phase : 12  
Catégorie : DESIGN-REFONTE  
Priorité : P1  
Dépend de : DES-003, DES-004, DES-007, DES-009, QA-003  
Fichiers concernés : composants interactifs redesignés  
Problème actuel : le hover et la transformation servent parfois d’affordance sur des éléments non cliquables ; les états ne sont pas spécifiés pour chaque nouveau bloc.  
Modification prévue : définir default, hover, focus-visible, active, disabled, loading, error et success lorsqu’applicables ; préférer les primitives natives.  
Ce qui ne doit pas changer : navigation clavier et focus trap déjà fonctionnels.  
Risques : styles qui dépendent uniquement de hover ou contraste insuffisant.  
Tests à exécuter : axe, clavier, touch, zoom et captures des états.  
Critères d’acceptation : chaque contrôle important a un feedback visible hors hover et un focus identifiable.  
Rollback possible : oui, revert composant par composant.

## DES-012 — Réduire la motion à des transitions signifiantes

Finding audit : P2-018, P06, P10, D18, D19, D21, D23  
Phase : 12  
Catégorie : DESIGN-REFONTE  
Priorité : P2  
Dépend de : DES-002, DES-003, DES-010  
Fichiers concernés : Hero.tsx, Testimonials.tsx, Projects.tsx, DevNotes.tsx, index.css  
Problème actuel : shimmer, bounce, fade/slide systématiques, scale hover et ticker donnent une impression de mouvement décoratif.  
Modification prévue : supprimer ce qui n’explique ni état ni continuité ; garder transitions courtes de focus, ouverture, sélection et changement de vue ; reduced motion doit produire une version immédiatement compréhensible.  
Ce qui ne doit pas changer : navigation, galerie et feedback nécessaire.  
Risques : retirer une orientation utile ; remplacer la motion par une hiérarchie statique claire.  
Tests à exécuter : capture motion on/off, axe, performance CPU et navigation clavier.  
Critères d’acceptation : aucune animation continue sans justification ; toutes les animations restantes respectent prefers-reduced-motion.  
Rollback possible : oui, revert animation par animation.

## DES-013 — Exécuter une critique visuelle unique et corriger les écarts

Finding audit : contrôles anti-vibecode W/P/D, preflight design-taste-codex  
Phase : 13  
Catégorie : DESIGN-REFONTE  
Priorité : P1  
Dépend de : DES-003 à DES-012, QA-002, QA-003, QA-005, QA-006  
Fichiers concernés : toutes surfaces redesignées  
Problème actuel : aucune revue finale structurée ne vérifie hiérarchie, alignement, lisibilité, responsive, accessibilité, performance et identité.  
Modification prévue : produire une table Issue / Why it matters / Targeted correction sur les trois largeurs, puis appliquer une seule passe de corrections ciblées.  
Ce qui ne doit pas changer : données projet et critères de fond validés par FOUNDATION.  
Risques : boucle esthétique sans fin ou changements de goût non motivés.  
Tests à exécuter : captures, axe, Lighthouse, E2E et revue manuelle.  
Critères d’acceptation : zéro problème critique de hiérarchie, overflow, CTA, focus ou preuve ; chaque exception esthétique est justifiée par le brief.  
Rollback possible : oui, revert de la passe critique complète.

## DES-014 — Refaire l’audit anti-vibecode avant livraison

Finding audit : tous contrôles W/P/D/L concernés  
Phase : 13  
Catégorie : DESIGN-REFONTE  
Priorité : P1  
Dépend de : DES-013, CI-001  
Fichiers concernés : audit de sortie, captures et rapport  
Problème actuel : la matrice actuelle contient des FAIL visuels explicites et ne peut pas servir de preuve de refonte terminée.  
Modification prévue : repasser les 94 contrôles avec preuves statiques et rendues ; classer PASS, FAIL, JUSTIFIED, N/A ou UNKNOWN sans forcer un résultat.  
Ce qui ne doit pas changer : aucune conclusion de sécurité ou de crédibilité sans preuve.  
Risques : déclarer la refonte terminée sur une simple capture desktop.  
Tests à exécuter : matrice complète, captures mobile/tablette/desktop, URLs et CI finale.  
Critères d’acceptation : aucun P1 ouvert, aucun FAIL visuel non accepté par le brief, UNKNOWN owner-input explicitement résolu.  
Rollback possible : oui, la tâche produit un rapport sans mutation du site.

# Quality gate obligatoire — FOUNDATION COMPLETE

Ce gate est une étape de décision, pas une tâche de redesign. Tant qu’un critère échoue, aucune tâche DES ne commence. Les corrections FOUNDATION et les sous-tâches FOUNDATION des tâches HYBRID doivent être terminées et testées.

## Critères mesurables

- lint PASS ;
- typecheck PASS avec les règles TypeScript activées par ARCH-001 ;
- build PASS ;
- verify-build PASS ;
- suite de tests unitaires/invariants PASS ;
- parcours E2E critiques PASS ;
- axe et clavier PASS sur navigation, menu langue, détail projet, galerie, Dev Notes et contact ;
- link checker critique PASS ;
- URLs invalides gérées avec un vrai statut 404 ;
- aucune vulnérabilité critique ;
- vulnérabilités high corrigées ou explicitement documentées et acceptées par le propriétaire ;
- CSP et headers de sécurité vérifiés en production ;
- aucune régression responsive fonctionnelle à 375, 768 et 1280 px ;
- scrollWidth égal clientWidth sur les parcours vérifiés ;
- aucune image ou donnée projet manquante ;
- aucun P1 technique ouvert ;
- aucun finding FOUNDATION bloquant ouvert ;
- claims, témoignages, analytics et besoins légaux classés par GOV-001 ;
- worktree propre hors fichiers explicitement autorisés ;
- rapport de gate daté avec commandes, statuts PASS/FAIL/PARTIAL/UNKNOWN et limites.

## Décision de passage

Le responsable de session écrit FOUNDATION COMPLETE uniquement lorsque toutes les cases sont vertes ou lorsqu’une exception est explicitement acceptée avec propriétaire, risque, expiration et plan de retour. Une capture desktop seule ne peut pas valider ce gate.

# Couverture exhaustive des findings de audit.md

Chaque finding est rattaché à une tâche. Les contrôles PASS, JUSTIFIED et N/A sont conservés et revalidés par le contrôle indiqué ; ils ne génèrent pas de correction artificielle.

| Finding / contrôle | Catégorie | Tâche ou disposition |
|---|---|---|
| P1-001 | FOUNDATION | PROD-001 puis QA-004 |
| P1-002 | HYBRID | GOV-001 puis HYB-001, DES-006, DES-008 |
| P2-001 | HYBRID | HYB-004 puis QA-006 et DES-010 |
| P2-002 | HYBRID | HYB-002 puis DES-007 |
| P2-003 | FOUNDATION | PROD-002 puis QA-002 |
| P2-004 | FOUNDATION | SEC-001 |
| P2-005 | FOUNDATION | SEC-002 puis SEC-003 |
| P2-006 | FOUNDATION | ARCH-001 |
| P2-007 | FOUNDATION | BUG-004, ARCH-002, ARCH-003 |
| P2-008 | FOUNDATION | PERF-001 |
| P2-009 | FOUNDATION | ARCH-004 |
| P2-010 | FOUNDATION | BUG-001 puis QA-003 |
| P2-011 | FOUNDATION | BUG-003 puis QA-002 |
| P2-012 | FOUNDATION | QA-001, QA-002, QA-003, QA-004, QA-005, CI-001 |
| P2-013 | FOUNDATION | BUG-002 puis QA-003 |
| P2-014 | DESIGN-REFONTE | DES-001, DES-002, DES-003, DES-004 |
| P2-015 | DESIGN-REFONTE | DES-002, DES-004, DES-005, DES-007, DES-009 |
| P2-016 | DESIGN-REFONTE | DES-002, DES-004, DES-005, DES-006, DES-009 |
| P2-017 | HYBRID | HYB-003 puis DES-003 et DES-006 |
| P2-018 | DESIGN-REFONTE | DES-012 |
| P3-001 | FOUNDATION | ARCH-005 |
| P3-002 | FOUNDATION | ARCH-006 |
| P3-003 | FOUNDATION | FND-001 puis ARCH-007 |
| P3-004 | FOUNDATION | SEC-004 puis CI-001 |
| P3-005 | FOUNDATION | PERF-002 puis QA-005 |
| P3-006 | FOUNDATION | ARCH-008 |

## Disposition des contrôles anti-vibecode sans finding séparé

| Contrôles | Disposition |
|---|---|
| W01, W02, W04, W05, W06, W07, W08 | Préserver si le brief le confirme ; relecture DES-001 et matrice DES-014. |
| W03 | DESIGN-REFONTE : DES-002 et DES-005 suppriment les emojis décoratifs ou justifient une iconographie cohérente. |
| W09, W10 | HYBRID/DESIGN : HYB-003 pour la proposition et DES-001 pour la voix, puis DES-014. |
| P01, P02, P03, P08, P09, P11, P12, P13, P17, P18, P19 | Aucun correctif fond requis ; préserver et revalider dans DES-014. P17 est recouvert par HYB-003 si la proposition devient trop large. |
| P04, P14, P15 | GOV-001 puis HYB-001, DES-006 et DES-008 ; jamais de validation implicite. |
| P05 | PROD-001 et QA-004. |
| P06, P10, P16, P20 | DESIGN-REFONTE : DES-001, DES-003 et DES-012 selon le cas. |
| D01, D05, D06, D08, D09, D15, D18, D19, D23 | DESIGN-REFONTE : DES-002, puis vérification DES-013/DES-014. |
| D02, D03, D04, D07, D10, D11, D12, D13, D14, D16, D17, D20, D24 | Pas de correction FOUNDATION ; préserver seulement si le brief le justifie et revalider dans DES-014. D17 a son état technique couvert par BUG-003. |
| D21, D22 | DESIGN-REFONTE : DES-011 et DES-012 ; tests clavier/axe dans QA-003. |
| L01 | PROD-002 et QA-002. |
| L02, L11, L12 | QA-002, QA-003, puis DES-003/DES-011 après refonte. |
| L03, L04, L05, L07, L08, L09, L19 | Préserver ; vérifier dans verify-build, QA-002, QA-004 et DES-014. |
| L06 | ARCH-008 puis DES-014. |
| L10 | HYB-004, QA-006, DES-010. |
| L13, L14 | N/A tant qu’il n’y a pas de formulaire ou transaction ; ne pas ajouter un formulaire pour satisfaire la checklist. |
| L15, L16, L18 | OWNER INPUT REQUIRED via GOV-001 ; aucune page ou analytics inventé. |
| L17 | N/A si aucune analytics non essentielle n’est activée ; sinon nouvelle tâche sécurité/consentement avant publication. |
| L20 | PERF-002 et QA-005. |
| S01 | SEC-005 revalide sans imprimer de secrets. |
| S02 | SEC-005 reste UNKNOWN jusqu’à une revue historique redacted et une décision rotation si nécessaire. |
| S03, S04, S05, S06, S07, S08, S09, S10, S11, S12, S13, S14, S16, S17 | N/A pour cette SPA sans backend, auth, base, upload ou API exposée ; ne pas créer de faux travail. |
| S15 | Préserver la sanitization et vérifier dans ARCH-002, tests contenu et CI. |
| S18 | SEC-001. |
| S19 | Préserver HTTPS/HSTS et vérifier dans FND-002/SEC-001. |
| S20 | SEC-002, SEC-003 et CI-001. |

# Graphe de dépendances logique

    FND-001 ─┬─ FND-002 ─┬─ PROD-001 ─┬─ QA-004
             │           ├─ PROD-002 ─┴─ QA-002
             │           ├─ BUG-001 ─┐
             │           ├─ BUG-003  ├─ QA-002/QA-003
             │           ├─ BUG-005  ┘
             │           └─ HYB-004 ── QA-006 ── QA-005
             ├─ FND-003 ─┬─ GOV-001 ── HYB-001 ── DES-006/DES-008
             │            ├─ ARCH-001 ── QA-001
             │            ├─ ARCH-002 ── ARCH-003 ── PERF-001
             │            ├─ ARCH-004
             │            └─ ARCH-005/006/008
             ├─ SEC-002 ── SEC-003 ── CI-001
             └─ SEC-004 ───────────────┘

    QA-001/002/003/004/005/006 + SEC + BUG + ARCH + PERF
      └─ FOUNDATION COMPLETE
           └─ HYB-001/HYB-002/HYB-003 fond validé
                └─ DES-001 ── DES-002
                     └─ DES-003 ── DES-004 ── DES-005
                          ├─ DES-006
                          ├─ DES-007
                          ├─ DES-008
                          └─ DES-009
                               └─ DES-010 ── DES-011/DES-012
                                    └─ DES-013 ── DES-014
                                         └─ REFONTE COMPLETE

Les liens du graphe sont des dépendances de validation. Une tâche peut être techniquement réalisable plus tôt, mais ne doit pas être exécutée si elle introduit déjà une direction artistique future.

# Ordre d’exécution exact

| Ordre | ID | Finding | Action | Risque | Validation |
| ----: | -- | ------- | ------ | ------ | ---------- |
| 1 | FND-001 | P3-003 / baseline | Geler Git, Node, npm et lockfile | Baseline différente du CI | status, versions, npm ci |
| 2 | FND-002 | P1-001/P2-001/P2-003/L01/L10 | Capturer rendus, routes et URLs | Preuve non rejouable | captures, DOM, HTTP |
| 3 | FND-003 | P2-007/P3-001/P3-005 | Formaliser invariants data/assets | Perte de projet | inventaire 21/60/champs |
| 4 | GOV-001 | P1-002/P14/P15/L15/L16/L18 | Obtenir décisions owner | Claims impossibles à publier | validation écrite |
| 5 | HYB-001 | P1-002/P04/P14/P15 | Valider les preuves, fond seulement | Témoignage non autorisé | claims classés |
| 6 | PROD-001 | P1-001/P05 | Réparer/retirer démos 404 | Nouvelle URL morte | HEAD/GET/browser |
| 7 | PROD-002 | P2-003/L01 | Configurer vrai 404 | Casser SPA/assets | HTTP root/unknown/assets |
| 8 | SEC-001 | P2-004/S18 | CSP Report-Only puis enforcement | Bloquer scripts | headers/console |
| 9 | SEC-002 | P2-005/S20 | Corriger runtime deps | Régression sanitizer | audit prod + build |
| 10 | SEC-003 | P2-005/S20 | Corriger build deps | Régression tooling | npm ci + checks |
| 11 | SEC-004 | P3-004 | Épingler actions SHA | SHA incompatible | CI manuelle |
| 12 | SEC-005 | S01/S02 | Scan secrets redacted | Faux positif/fuite sortie | scan sans secret |
| 13 | BUG-001 | P2-010 | Corriger listbox clavier | Focus cassé | clavier + axe |
| 14 | BUG-002 | P2-013 | Corriger headings | Style/semantics divergents | axe/headings |
| 15 | BUG-003 | P2-011/D17 | Ajouter error/retry Dev Notes | État stale | import rejeté/retry |
| 16 | BUG-004 | hash/history | Synchroniser popstate | Boucle historique | back/forward/reload |
| 17 | BUG-005 | robustesse i18n | Protéger localStorage | Fallback masqué | storage bloqué |
| 18 | BUG-006 | accessibilité icônes | Clarifier alt/aria-hidden | Image masquée | AX/axe |
| 19 | HYB-002 | P2-002 | Activer Typography côté fond | CSS intermédiaire | build CSS/rendu |
| 20 | HYB-003 | P2-017/W09/W10 | Stabiliser proposition côté contenu | Audience mal choisie | revue owner |
| 21 | HYB-004 | P2-001/L10 | Neutraliser overflow mécanique | Workaround incomplet | 375/768/1280 |
| 22 | ARCH-001 | P2-006 | Activer strictness par étapes | Diff trop large | typecheck par règle |
| 23 | ARCH-002 | P2-007 | Extraire parser Markdown | HTML divergent | fixtures/DOM |
| 24 | ARCH-003 | P2-007 | Extraire détail/gallery/nav | Perte focus/données | E2E + data snapshot |
| 25 | ARCH-004 | P2-009 | Séparer i18n et data | Traduction inventée | snapshots fr/en |
| 26 | ARCH-005 | P3-001 | Rendre IDs articles uniques | URL future cassée | unicité/catalogue |
| 27 | ARCH-006 | P3-002 | Nettoyer résidus confirmés | Dépendance implicite | lint/build/npm ci |
| 28 | ARCH-007 | P3-003 | Fixer version Node | Divergence runner | npm ci/checks |
| 29 | ARCH-008 | P3-006/L06 | Corriger typo/icons/libellé | Asset ou claim inventé | verify-build/relecture |
| 30 | PERF-001 | P2-008 | Différer vrais lazy imports | Anchor/indexabilité | réseau/scroll/build |
| 31 | PERF-002 | P3-005/L20 | Optimiser images | Crop/qualité cassés | poids/visual diff |
| 32 | QA-001 | P2-012 | Ajouter runner/fixtures | Tests trop couplés | test volontaire |
| 33 | QA-002 | P2-012/L02/L11/L12 | E2E parcours critiques | Flaky externe | suite preview |
| 34 | QA-003 | P2-010/P2-013/L09 | axe + clavier | Faux positifs | axe/keyboard |
| 35 | QA-004 | P1-001/P2-012/L19 | Link checker critique | Tiers instables | fixtures + URLs |
| 36 | QA-005 | P2-012/L10/L20 | Lighthouse/perf gate | Seuils instables | 375/1280 |
| 37 | QA-006 | P2-001/L10/L20 | Régression responsive | Snapshot fragile | overflow/captures |
| 38 | CI-001 | P2-012/S20/P3-004 | Brancher les gates CI | CI trop lente | workflow PR/manual |
| 39 | FOUNDATION COMPLETE | quality gate | Autoriser ou bloquer la refonte | Faux départ design | checklist complète |
| 40 | DES-001 | P2-014/P2-015/P2-017/W/P | Valider brief et preuves | Nouvel effet de mode | critique brief |
| 41 | DES-002 | D/W/P visuels | Refaire tokens et fondations | Contraste/régression globale | snapshots/contraste |
| 42 | DES-003 | Hero/nav | Recomposer premier écran | CTA moins clair | first viewport |
| 43 | DES-004 | Projects | Études de cas éditoriales | Projet masqué | data/E2E/images |
| 44 | DES-005 | Skills | Matrice capacités/preuves | Expertise surinterprétée | relecture data/axe |
| 45 | DES-006 | Freelance | Livrables/méthode | Promesse non validée | owner/axe/responsive |
| 46 | DES-007 | Dev Notes | Index éditorial | Article moins trouvable | E2E/typography |
| 47 | DES-008 | Testimonials | Preuves statiques ou retrait | Client exposé | owner/axe |
| 48 | DES-009 | Contact/Footer | Parcours contact simple | Contact moins visible | CTA/links |
| 49 | DES-010 | Responsive design | Trois compositions | Divergence locale | screenshots/axe |
| 50 | DES-011 | Interaction states | États accessibles | Hover-only | axe/keyboard/touch |
| 51 | DES-012 | Motion | Transitions signifiantes | Orientation retirée | motion on/off |
| 52 | DES-013 | Preflight design | Une critique et une passe | Boucle esthétique | issue table + QA |
| 53 | DES-014 | W/P/D/L final | Nouvel audit 94 contrôles | Faux ready-to-ship | matrice + CI |
| 54 | REFONTE COMPLETE | final gate | Clôturer la refonte | Finding résiduel | audit final signé |

# Progress tracker

## FOUNDATION

- [x] FND-001
- [x] FND-002
- [x] FND-003
- [x] GOV-001 — OWNER VALIDATED
- [x] PROD-001 — PASS, démos vérifiées
- [~] PROD-002 — IMPLÉMENTATION TERMINÉE, vérification VPS différée au gate final
- [~] SEC-001 — IMPLÉMENTATION TERMINÉE, activation/retest VPS différés au gate final
- [x] SEC-002 — PASS, audit runtime à zéro
- [x] SEC-003 — PASS runtime, avis dev Lighthouse documentés en phase 5
- [x] SEC-004 — PASS, actions épinglées sur SHA vérifiés
- [x] SEC-005 — PASS, scan redacted courant + historique sans match
- [x] BUG-001 — PASS, sélecteur langue navigable au clavier
- [x] BUG-002 — PASS, hiérarchie de titres normalisée
- [x] BUG-003 — PASS, erreur et retry Dev Notes
- [x] BUG-004 — PASS, hash/history synchronisés
- [x] BUG-005 — PASS, localStorage protégé
- [x] BUG-006 — PASS, icônes et images sémantisées
- [x] ARCH-001 — PASS, TypeScript strict activé
- [x] ARCH-002 — PASS, parser Projects extrait et sanitization conservée
- [x] ARCH-003 — PASS local, détail/galerie/navigation extraits
- [x] ARCH-004 — PASS local, 60 articles Dev Notes traduits et vérifiés par `npm run verify:translations`
- [x] ARCH-005 — PASS, IDs d’articles globalement uniques
- [x] ARCH-006 — PASS borné, résidu non référencé supprimé
- [x] ARCH-007 — PASS, Node 22.22.0 aligné
- [x] ARCH-008 — PASS, typo/icônes/libellé corrigés
- [x] PERF-001 — PASS local, sections différées avec ancres conservées
- [x] PERF-002 — PASS local, 37 sources et 135 variantes WebP contrôlées
- [x] QA-001 — PASS, Vitest et fixtures purées exécutables
- [x] QA-002 — PASS local, 5 parcours Playwright
- [x] QA-003 — PASS local, axe sérieux/critique et clavier
- [x] QA-004 — PASS, contrôle des liens critiques avec classification anti-bot
- [x] QA-005 — PASS local, Lighthouse sur accueil et mentions légales
- [x] QA-006 — PASS local, sweep responsive Chrome 320–2560 px et routes principales sans overflow
- [x] CI-001 — PASS configuration, exécution GitHub réelle encore à observer
- [~] FOUNDATION COMPLETE — gates locales passées, PROD-002/SEC-001 live reportés au contrôle final

## HYBRID

- [x] HYB-001 — PASS fond, claims et témoignages validés ; recomposition éditoriale reportée à DES-006/DES-008
- [x] HYB-002 — PASS fond, plugin Typography activé ; index/détail éditorial reportés à DES-007
- [x] HYB-003 — PASS fond, proposition duale explicitée ; poids visuel recrutement/freelance à décider dans DES-001
- [x] HYB-004 — PASS fond, overflow `w-screen` neutralisé ; composition responsive reportée à DES-010

## DESIGN-REFONTE

- [ ] DES-001
- [ ] DES-002
- [ ] DES-003
- [ ] DES-004
- [ ] DES-005
- [ ] DES-006
- [ ] DES-007
- [ ] DES-008
- [ ] DES-009
- [ ] DES-010
- [ ] DES-011
- [ ] DES-012
- [ ] DES-013
- [ ] DES-014
- [ ] REFONTE COMPLETE

# Comptage et vérification finale du plan

- Tâches FOUNDATION : **34**.
- Tâches DESIGN-REFONTE : **14**.
- Tâches HYBRID : **4**.
- Tâches OWNER INPUT REQUIRED : **1**, GOV-001, qui regroupe les décisions de preuve, analytics et obligations légales.
- Nombre total de tâches exécutables : **52**, hors les deux quality gates.
- Tous les findings P1-001 à P3-006 de audit.md sont présents dans la table de couverture.
- Les contrôles W/P/D/L/S qui ne sont pas des findings séparés sont groupés explicitement dans la disposition anti-vibecode.
- Les contrôles N/A ne déclenchent aucune implémentation fictive.
- Les findings visuels P2-014 à P2-018 et D associés restent après FOUNDATION COMPLETE.
- Les bugs fonctionnels associés à l’overflow, Typography, clavier, headings, erreurs async, history et storage sont planifiés avant la refonte.
- Le plan initial ne modifiait pas le code ; après validation GOV-001, les corrections autorisées de contenu, de routage légal, d’URLs de démo, de dépendances et de configuration versionnée sont appliquées. Aucun déploiement ou changement distant n’est inclus.
- Les artefacts de preuve `.security-audit/` restent ignorés par Git ; `action-plan.md`, `audit.md`, le template Caddy et les fichiers source modifiés sont explicitement suivis dans le diff de cette exécution.

# Journal d’exécution — phases 1 et 2

Date : 2026-09-10

| Tâche | Statut | Preuve | Limite restante |
|---|---|---|---|
| PROD-001 | PASS | 11 URLs `demo` vérifiées ; Talao et Aqualis répondent 200 ; aucun projet supprimé | Aucun |
| PROD-002 | PARTIAL | `deploy/Caddyfile.example` validé par Caddy et exercé sur `dist/` : routes connues 200, inconnue 404 | Recharger Caddy sur le VPS puis retester le domaine live |
| SEC-001 | PARTIAL | CSP Report-Only et headers versionnés ; headers vérifiés sur réponses locales 200/404 | Activer/retester sur le VPS et parcourir le site pour collecter les violations |
| SEC-002 | PASS | `npm audit` runtime à zéro ; DOMPurify et nanoid corrigés dans le lockfile | Aucun |
| SEC-003 | PASS runtime | `npm audit --audit-level=high` et `npm ci` passent avec 0 vulnérabilité ; `@lhci/cli` et sa chaîne transitive ont été retirés du projet | Aucun avis npm restant |
| SEC-004 | PASS | `checkout` et `setup-node` épinglés sur SHA vérifiés par l’API GitHub | Un run CI réel reste à observer après push autorisé |
| SEC-005 | PASS | Scan redacted fichiers courants + historique : 0 match | Semgrep, Trivy et gitleaks absents de l’environnement |

Les deux tâches PARTIAL sont bloquées uniquement par l’absence d’accès autorisé au VPS. La suite peut commencer sur les tâches locales ; pour fermer complètement les phases 1 et 2, il faudra appliquer le template Caddy et fournir les statuts/headers live après rechargement.

## Décision de séquencement — 2026-09-10

Le propriétaire confirme que la configuration Caddy, la CSP live et leurs vérifications HTTP restent volontairement reportées au contrôle final. Cette décision clôt l’implémentation et la documentation des phases 1 et 2 pour poursuivre les phases suivantes ; le risque résiduel et le retest attendu restent explicitement suivis dans PROD-002 et SEC-001.

## Journal d’exécution — phase 3

Date : 2026-09-10

| Tâche | Statut | Preuve | Limite restante |
|---|---|---|---|
| BUG-001 | PASS | Sélecteur local vérifié au clavier : ouverture, ArrowUp, sélection Enter et retour du focus sur le déclencheur ; Home/End/Escape et navigation cyclique sont implémentés | Parcours lecteur d’écran/axe complet à rejouer dans QA-003 |
| BUG-002 | PASS | Renderer de contenu projet borné à des niveaux h2–h4 et featured case study remappée h3/h4 ; arbre AX local : h1 unique, aucun h5 dans le parcours projet | Audit automatisé de tous les parcours à couvrir dans QA-003 |
| BUG-003 | PASS | Chargement asynchrone conserve loading/success, expose une alerte avec action Réessayer sur rejet et invalide les réponses obsolètes lors d’un changement rapide de catégorie ; chargement réel testé localement | Rejet d’import simulé à rejouer dans QA-002 |
| BUG-004 | PASS | Ouverture d’un projet crée une entrée hash, le bouton retour appelle l’historique, `popstate` resynchronise la vue et restaure le focus sur le titre de section ; URL locale vérifiée avant/après | Parcours navigateur précédent/suivant/reload complet à couvrir dans QA-002 |
| BUG-005 | PASS | Lecture et écriture `localStorage` encapsulées avec fallback français ; lint, typecheck et build passent | Simulation quota/storage bloqué à rejouer dans QA-002 |
| BUG-006 | PASS | SVG décoratifs marqués `aria-hidden`, avatars redondants rendus silencieux, images projet conservent leurs alt ; arbre AX local ne répète plus les icônes des actions | Contrôle axe et revue 375/768/1280 à couvrir dans QA-003/QA-006 |

Vérifications exécutées : `npm run lint`, `npm run typecheck`, `npm run build` et parcours local dans le navigateur CUA. Aucun contenu projet, champ de données, image ou URL de démonstration n’a été supprimé ou modifié par cette phase.

## 37. Exécution de la phase 4 — architecture et qualité du code

Exécutée le 2026-09-10. Le périmètre reste behavior-preserving : aucune fiche projet, galerie, route ou contenu d’article n’a été supprimé.

| Finding | Statut | Modification et preuve |
|---|---|---|
| ARCH-001 | PASS | `tsconfig.app.json` et `tsconfig.json` activent `strict`, `noImplicitAny`, `noUnusedLocals`, `noUnusedParameters` et `noFallthroughCasesInSwitch`. Les trois diagnostics réels de la baseline ont été corrigés dans `App.tsx`, `Projects.tsx` et `Testimonials.tsx`. `npm run typecheck` et `npm run lint` passent. |
| ARCH-002 | PASS | Le parser Markdown, l’échappement et la normalisation des titres de Projects vivent dans `src/lib/project-content.ts`, module pur sans DOM. `DOMPurify.sanitize` reste à la frontière d’affichage dans `Projects.tsx`. Le build passe et le rendu détaillé a été ouvert dans le navigateur local. |
| ARCH-003 | PASS local | `ProjectDetail`, `ProjectGallery` et `ProjectNavigation` ont des props explicites dans `src/components/projects/`; les helpers hash/history sont dans `src/lib/project-navigation.ts`. Le navigateur local a validé ouverture, retour, URL hash, galerie et fermeture par Échap. |
| ARCH-004 | PASS local | Les 60 articles anglais sont séparés dans `src/data/articles/en/`, fusionnés par ID avec les données sources et contrôlés par `scripts/verify-english-articles.mjs` : 60/60, balises HTML et blocs de code conservés. |
| ARCH-005 | PASS | Les 60 IDs d’articles sont globalement uniques par préfixe de catégorie (`culture-`, `devops-`, `tools-`, `architecture-`, `freelance-`). Le contrôle FND-003 échoue désormais en cas de doublon et passe avec le nouveau baseline ; titres, contenu, catégories et ordre sont inchangés. |
| ARCH-006 | PASS borné | Le résidu confirmé `src/components/ui/sonnerToast.ts`, sans référence dans le dépôt, a été retiré. Les composants UI et dépendances Radix non prouvés morts sont conservés pour ne pas casser le design system, `Toaster` ou `Tooltip`. |
| ARCH-007 | PASS | `.nvmrc`, la CI et la documentation convergent vers Node.js `22.22.0`, compatible avec les engines `>=22.12.0`. Le runtime local observé est Node `v22.22.0` / npm `10.9.4`. |
| ARCH-008 | PASS | Le typo de l’OG image est corrigé (`léger`), la compétence GitHub Pages est remplacée par l’hébergement VPS statique actuel et le manifest/index référencent des icônes PNG `192x192` et `512x512` dérivées du favicon existant. |

Validation de sortie : `npm run check` passe (lint, typecheck, build, verify-build, traductions et assets), `node scripts/verify-phase0-invariants.mjs` passe (21 projets, 60 articles, 36 assets, 51 URLs), `git diff --check` passe et le parcours local couvre un détail projet, le retour historique, une galerie et un article anglais.

## 38. Exécution de la phase 5 — performance, tests et CI (2026-09-10)

| Finding | Statut | Preuve et limite restante |
|---|---|---|
| PERF-001 | PASS local | `DeferredSection` charge les six sections sous le hero par IntersectionObserver, réserve une zone stable et traite les ancres `#about`, `#projects`, `#project=...`, `#freelance-cases`, `#devnotes` et `#contact`. Playwright vérifie que les chunks `Projects` et `Skills` ne sont pas demandés au premier rendu, puis que `#projects` est accessible. |
| PERF-002 | PASS local | 37 images raster de `public/img_projects` ont 135 variantes WebP générées dans `public/img_optimized`, avec `srcSet`, `sizes`, dimensions et fallback original dans les cartes, détails, galeries et HTML détaillé. Le contrôle rapporte 33 408 475 octets source contre 8 627 278 octets optimisés (ratio 0,258). |
| QA-001 | PASS | Vitest est configuré sur `tests/unit`, avec 4 tests ciblant le renderer de contenu et le manifeste d’images. `npm test` passe. |
| QA-002 | PASS local | 5 tests Playwright couvrent chargement différé, navigation par hash et historique, galerie/Échap, locale, route 404 et responsive. `npm run test:e2e` passe. |
| QA-003 | PASS local | `@axe-core/playwright` ne remonte aucune violation `serious` ou `critical` sur la vue Projects ; le clavier couvre le menu de langue et la visionneuse. |
| QA-004 | PASS | `npm run check:links` contrôle les URLs critiques avec HEAD/GET et deux retries ; 32 URLs répondent `ok`, les deux classifications externes restantes sont confirmées par le propriétaire et aucune 4xx/5xx critique n’est détectée. |
| QA-005 | PASS local | L’ancien outillage `@lhci/cli` et ses avis transitifs ont été retirés ; la qualité locale est bloquée par lint, typecheck, build, vérification des traductions, assets, tests et audit npm (0 vulnérabilité). |
| QA-006 | PASS local | Chrome couvre 320–2560 px par pas de 8 px sur l’accueil, plus les routes légales, projets, Dev Notes et 404 à 14 largeurs repères ; aucun overflow horizontal, aucun menu hors fenêtre et aucune erreur console/page/requête. |
| CI-001 | PASS configuration | Le workflow sépare quality, unit, browser/axe, links et lighthouse, conserve `contents: read`, cache npm, timeouts et actions épinglées. Un run GitHub réel reste à observer après push autorisé. |

### Dépendances et limite d’audit

`npm audit --audit-level=high` et `npm audit --omit=dev --audit-level=high` sont PASS avec 0 vulnérabilité. L’ancien outillage `@lhci/cli`, source des avis transitifs de l’audit de développement, n’est plus une dépendance du dépôt.

### Validation de sortie Phase 5

`npm run lint`, `npm run typecheck`, `npm run build`, `npm run verify:build`, `npm run verify:translations`, `npm run verify:performance-assets`, `npm test`, `npm run test:e2e`, `npm run check:links`, les audits npm et `git diff --check` ont été exécutés localement. Aucun déploiement, commit, push ou upload de rapport vers un service tiers n’a été exécuté.

## 39. Exécution HYBRID — fond maintenant, direction visuelle ensuite (2026-09-10)

Cette étape ferme les corrections de fond qui peuvent être faites sans choisir la nouvelle direction artistique. Les compositions hero, preuves, témoignages, mobile et Dev Notes restent donc volontairement dans leur forme actuelle jusqu’aux tâches DESIGN-REFONTE.

| Tâche | Statut | Preuve et limite restante |
|---|---|---|
| HYB-001 | PASS fond | Claims `5+`, `30+`, `10+`, `Sous 48h` et délais indicatifs validés par le propriétaire ; cinq témoignages autorisés conservés, `J. DM` reformulé, témoignage Aqualis déclaré fake retiré. Présentation éditoriale statique et contextuelle à traiter dans DES-006/DES-008. |
| HYB-002 | PASS fond | `@tailwindcss/typography` activé dans `tailwind.config.ts`, sans changement de contenu, catégories, async ou sanitization. Composition Dev Notes à traiter dans DES-007. |
| HYB-003 | PASS fond | Le hero énonce les deux audiences déclarées (équipes produit remote et clients freelance ciblés), le travail livré (applications métier et automatisations IA/n8n) et les preuves autorisées (`5+` ans, `30+` projets). Le poids visuel relatif des audiences reste une décision du brief DES-001. |
| HYB-004 | PASS fond | `Testimonials` passe à `w-full` dans le flux ; `w-screen`, `left-1/2` et `translate-x-1/2` ne causent plus l’overflow mécanique. La composition mobile reste à redessiner dans DES-010. |

### Validation de sortie HYBRID

Après ces modifications, `npm run check`, `npm test`, `npm run test:e2e` et `git diff --check` ont été rejoués avec succès. Le build contient les règles `.prose`, les 5 parcours Playwright passent et le sweep Chrome responsive 320–2560 px est sans overflow. Aucun contenu projet, lien de démo, asset original ou route n’a été supprimé ; aucun déploiement, commit ou changement distant n’a été exécuté.

## 40. Ré-audit P0 → HYBRID (2026-09-10)

Le contrôle final confirme que les statuts P0 à HYBRID sont cohérents avec le checkout courant. Les métriques projet non couvertes par la validation propriétaire ont été reformulées sans chiffres dans `src/data/projects/emploi.ts` et `src/data/projects/englishDetails.ts`; le baseline FND-003 a été régénéré avec `node scripts/verify-phase0-invariants.mjs --write-baseline` après cette décision intentionnelle.

| Bloc | Verdict | Limite encore ouverte |
|---|---|---|
| FND-001 à FND-003 | PASS local | Aucune dérive d’invariant ; VPS et CI distante hors contrôle local |
| GOV-001 / HYB-001 | PASS owner / fond | Réintroduire les cinq métriques reformulées uniquement avec preuve/date ; question dans `manque_phase.md` |
| PROD-001 | PASS | Les URLs Talao et Aqualis sont conservées avec leurs nouvelles cibles ; la disponibilité de Talao a été confirmée par le propriétaire et le lien QR n’est pas utilisé comme CTA projet |
| PROD-002 | PASS live | Caddy rechargé et validé sur le VPS ; routes, assets, méthode POST, `www` et headers vérifiés |
| SEC-001 | PASS live | CSP active sur les réponses 200/404 ; parcours Chrome live sans blocage CSP |
| SEC-002 à SEC-005 | PASS runtime/config | 0 vulnérabilité npm ; run CI réel à observer après push |
| BUG-001 à BUG-006 / ARCH-001 à ARCH-008 | PASS local | Traduction anglaise 60/60 et IDs d’articles vérifiés |
| PERF-001/002 / QA-001 à QA-006 | PASS local | Responsive Chrome validé ; autres moteurs hors périmètre selon la décision du propriétaire |
| HYB-002 à HYB-004 | PASS fond | Direction visuelle et hiérarchie des audiences reportées à DESIGN-REFONTE |

Le seul contenu manquant nouveau est donc la preuve éventuelle des cinq chiffres retirés des fiches projet. Toutes les autres limites sont déjà listées dans `manque_phase.md`.
