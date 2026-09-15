# Audit complet du portfolio — état local et production

Date de contrôle : **15 septembre 2026**  
Périmètre : code source, build prerender, rendu local, Lighthouse local, tests E2E, liens critiques, fichiers SEO/GEO et dernier readback HTTP de `https://bastienlopez.fr`.

## Verdict

Le dépôt local est prêt pour une nouvelle publication. Le build produit **38 URLs** cohérentes : 22 projets, 10 Dev Notes, 3 services, l’accueil, la page freelance et les pages légales/404. Les métadonnées sont contrôlées avant écriture prerender, le canonical attendu est sans slash final et la fiche légale est correcte dans `dist/mentions-legales/index.html`.

La production n’est pas encore alignée sur ce build. Le dernier contrôle public trouve encore **36 URLs**, dont 34 qui commencent par une redirection 308 vers la version avec slash, et `/mentions-legales` sert le shell accueil dans le HTML initial. Le code de correction et la configuration Caddy de référence sont prêts, mais ils doivent encore être publiés sur l’hôte actif.

## Notes actuelles

Ces notes sont des évaluations techniques internes, pas des scores Google ou LLM officiels.

| Axe | Local actuel | Production observée | Preuve et limite |
| --- | ---: | ---: | --- |
| Positionnement | **9,0/10** | **8,8/10** | Métier, Reims, offres, stack et cas d’usage explicites. |
| Frontend / architecture | **9,1/10** | **8,8/10** | React/Vite, routes prerender, vérifications de cohérence et composants réutilisés. |
| UI / UX | **8,8/10** | **8,5/10** | Hiérarchie premium, cartes projet, fiches et notes testées ; validation visuelle production à refaire après publication. |
| Accessibilité / responsive | **9,5/10** | **9,5/10** | Lighthouse local et public à 100, axe/E2E sans régression connue. |
| Anti-AI-slop | **8,0/10** | **7,8/10** | Contenu et parcours spécifiques ; preuves publiables et autorité externe restent limités. |
| Copywriting | **8,8/10** | **8,5/10** | Français prioritaire, pages d’intention et CTA reliés aux services. |
| Portfolio / projets | **9,0/10** | **8,7/10** | 22 projets conservés, liens et fiches accessibles ; source locale prête pour 38 routes. |
| Crédibilité / preuves | **6,8/10** | **6,5/10** | Témoignages présents ; résultats vérifiables et autorisations externes non prouvés. |
| SEO technique — code | **9,8/10** | **9,2/10** | Canonical, robots, JSON-LD, sitemap, prerender et assertions de build. |
| SEO technique — production | **9,8/10** | **8,2/10** | La version publique conserve les 34 redirections et le HTML légal obsolète. |
| SEO contenu | **8,8/10** | **8,0/10** | 10 notes françaises d’intention, 62 traductions contrôlées ; indexation réelle à mesurer. |
| GEO technique | **9,7/10** | **8,7/10** | `llms.txt` et `llms-full.txt` locaux couvrent 22 projets et 10 notes ; production est encore sur l’ancien fichier. |
| GEO autorité / entité | **6,8/10** | **6,8/10** | Citations, recommandations LLM et signaux externes ne sont pas contrôlables par le code seul. |
| **Global observé** | **≈ 8,7/10** | **≈ 8,1/10** | Le dépôt est publiable ; l’écart restant est surtout le déploiement et les preuves externes. |

## Contrôles locaux

| Contrôle | Résultat |
| --- | --- |
| `npm run lint` | **PASS** |
| `npm run typecheck` | **PASS** |
| `npm run build` | **PASS** ; prerender des 38 routes |
| `npm run verify:build` | **PASS** ; canonical légal et index GEO vérifiés |
| `npm run verify:translations` | **PASS** ; 62 articles FR/EN alignés |
| `npm run verify:performance-assets` | **PASS** ; 151 WebP référencés |
| `npm test -- --run` | **PASS** ; 7 tests |
| `npm run test:e2e` | **PASS** après mise à jour du contrat Dev Notes ; 15 tests |
| `npm run check:links` | **PASS** ; 29 OK, 1 inconnu externe, 0 échec |
| `npm audit --audit-level=high` | **PASS** ; 0 vulnérabilité |
| `npm run audit:lighthouse` | **PASS** ; accueil 72/100 performance, freelance 73/100, SEO/accessibilité/bonnes pratiques 100/100 |
| Sitemap local | **PASS** ; 38 URLs uniques, 22 projets, 10 notes, `lastmod` présents |
| `llms.txt` / `llms-full.txt` locaux | **PASS** ; identité, services, 22 projets et 10 notes |

L’animation typing est conservée conformément à la demande. Le prerender attend sa fin et garde le métier ainsi que la phrase de soutien dans le HTML initial.

## Contrôles publics au dernier readback

Le script reproductible `npm run audit:production` a été exécuté avant cette mise à jour :

- sitemap public : **36 URLs**, toutes finissent en HTTP 200, mais **34/36** commencent par une 308 vers une URL avec slash ;
- `/mentions-legales` : titre et canonical initiaux incorrects (shell accueil), alors que `/mentions-legales/` rend la bonne fiche après redirection ;
- titres, descriptions, canonical, `h1` et JSON-LD présents sur les routes finales ;
- Lighthouse public précédent : SEO 100, accessibilité 100, bonnes pratiques 100, performance 72 sur `/` et 69 sur `/freelance/` ;
- `robots.txt` public : 200, sitemap déclaré, `OAI-SearchBot` autorisé ;
- `llms.txt` public : ancienne version avec 22 projets et 8 notes ; `llms-full.txt` public ne listait encore aucun projet ni note.

Le résultat public actuel est donc **FAIL attendu (42 écarts)** jusqu’à publication du build local et de la règle de routage active. Le contrôle signale aussi explicitement l’absence des deux nouvelles notes dans le sitemap et `llms.txt`. Il ne s’agit pas d’un échec des contrôles locaux.

## Ce qui est corrigé dans le dépôt

- `scripts/prerender-routes.mjs` vérifie titre, description et canonical avant d’écrire chaque HTML.
- `scripts/verify-build.mjs` vérifie la fiche légale, les 38 routes, les index GEO et les canonical.
- `src/App.tsx` ne charge plus les providers inutilisés dans l’app-shell initiale.
- Deux Dev Notes françaises répondent aux intentions « créer un site pour son entreprise » et « cadrer une automatisation n8n ».
- `public/llms-full.txt` contient les 22 projets et 10 notes avec leurs URLs canoniques.
- Les deux nouvelles notes sont reliées aux services concernés et présentes dans le sitemap, `llms.txt` et le prerender.
- `scripts/audit-production.mjs` fournit un contrôle HTTP reproductible qui échoue dès qu’une redirection, une metadata ou un signal GEO diverge.

## Priorités après publication

1. Publier le build et appliquer la configuration de routage canonique sans slash (`deploy/Caddyfile.example` ou règle équivalente de l’hôte).
2. Relancer `npm run audit:production` jusqu’à obtenir 38/38 routes finales en 200, zéro redirection initiale et la fiche légale correcte.
3. Relire le sitemap dans Google Search Console et Bing Webmaster Tools ; mesurer couverture, exclusions, requêtes et impressions après 7 à 28 jours.
4. Continuer à documenter les résultats publiables avec accord ou anonymisation cohérente.
5. Tenir un journal daté de requêtes LLM afin de mesurer les citations et la découvrabilité, sans promettre une recommandation automatique.

## Limites de preuve

Le code peut rendre l’entité, les services et les contenus faciles à comprendre. Il ne peut pas forcer Google ou un LLM à crawler, indexer, citer ou recommander le site. Ces points dépendent du déploiement réel, de l’autorité externe, des citations indépendantes et du temps.
