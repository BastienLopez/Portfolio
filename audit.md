# Audit complet du portfolio — état local et production

Date du contrôle : **15 septembre 2026**
Périmètre : source locale, build prerender, rendu navigateur, SEO/GEO, accessibilité, performance, liens, dépendances et readback HTTP de `https://bastienlopez.fr`.

## Verdict

Le dépôt local est prêt pour publication. Le build courant produit **38 routes** : accueil, freelance, mentions légales, 22 projets, 3 services et 10 Dev Notes. Chaque route prerender possède un titre, une description, un canonical, un `h1` et des données structurées. La section Dev Notes expose aussi un `CollectionPage` et un `ItemList` reliant les notes dédiées. La page légale a été refondue dans le même système éditorial que les services et son HTML initial contient ses propres metadata et JSON-LD.

Le retrait du prefetch global des images projet améliore nettement la charge initiale : le dernier Lighthouse local mesure **88/100** sur l’accueil et `/freelance`, avec un LCP à **3,2–3,3 s** (les scores performance varient selon l’exécution). SEO, accessibilité et bonnes pratiques restent à 100.

La production publique n’a pas encore reçu ce build. Le dernier readback public expose 38 URLs finales en 200 mais 36 redirections 308 sur les URL sans slash et l’ancien HTML initial de `/mentions-legales`. La publication est bloquée par l’authentification de l’alias SSH `ovh-vps` ; le serveur atteint bien le VPS, mais répond `Permission denied (publickey,password)`.

## Notes actuelles

Ces évaluations sont des notes techniques internes, pas des scores officiels Google ou LLM.

| Axe | Local actuel | Production observée | Évidence / limite |
| --- | ---: | ---: | --- |
| Positionnement | **9,0/10** | **8,8/10** | Métier, Reims, services et cas d’usage explicites. |
| Frontend / architecture | **9,1/10** | **8,8/10** | React/Vite, composants réutilisables, routes prerender. |
| UI / UX | **9,1/10** | **8,4/10** | Page légale et services alignés localement ; production à relire après publication. |
| Accessibilité / responsive | **9,5/10** | **9,5/10** | Lighthouse 100 et axe/E2E sans régression. |
| Anti-AI-slop | **8,5/10** | **7,9/10** | Design spécifique et contenu réel ; autorité externe encore limitée. |
| Copywriting | **8,8/10** | **8,4/10** | Français prioritaire, pages d’intention et CTA cohérents. |
| Portfolio / projets | **9,0/10** | **8,7/10** | 22 projets, stacks, images et fiches conservés. |
| Crédibilité / preuves | **8,2/10** | **7,5/10** | Témoignages réels et accord confirmé par le propriétaire ; résultats externes chiffrés non publiés. |
| SEO technique — code | **9,9/10** | **9,2/10** | Canonical, métadonnées de section, JSON-LD, robots, sitemap et prerender contrôlés. |
| SEO technique — production | **9,8/10** | **7,9/10** | 36 redirections initiales et HTML légal obsolète tant que le build n’est pas publié. |
| SEO contenu | **9,0/10** | **8,2/10** | 10 notes françaises d’intention, descriptions thématiques et liens internes ; indexation réelle à suivre. |
| GEO technique | **9,9/10** | **9,2/10** | `llms.txt`, `llms-full.txt`, `CollectionPage`, `ItemList` et métadonnées d’articles alignés sur identité, services, projets et notes. |
| GEO autorité / entité | **7,2/10** | **6,8/10** | Citations tierces et recommandations LLM restent à mesurer. |
| **Global** | **≈ 9,1/10** | **≈ 8,2/10** | Local prêt ; l’écart est surtout publication, routage réel et autorité externe. |

## SEO et GEO : état précis

### Validé localement

- Sitemap : **38 URLs uniques**, toutes avec `lastmod`.
- Métadonnées : **38/38** routes avec titre, description, canonical, `h1` et JSON-LD ; zéro doublon de titre ou de description.
- Données structurées : `Person`, `ProfilePage`, `ProfessionalService`, `Service`, `CreativeWork`, `TechArticle`, `FAQPage` et `BreadcrumbList` selon les routes.
- Crawlabilité : `robots.txt` autorise le site, déclare le sitemap et autorise `OAI-SearchBot`.
- GEO documentaire : 22 projets, 10 notes et 3 services sont décrits dans les fichiers LLM avec des liens canoniques.
- Dev Notes : les cinq thèmes sont décrits dans les fichiers LLM, les notes indexables sont reliées par un `ItemList` et les pages dédiées exposent leur section, leurs mots-clés et leur temps de lecture.
- UX Dev Notes : l’ouverture d’une note inline repositionne le début de la note sous la navigation ; les pages dédiées et la section inline utilisent le fond exact `#14191f`.
- Intentions françaises couvertes : création de site d’entreprise, développeur web freelance à Reims, application métier PME et automatisation n8n.
- Open Graph/Twitter : image 1200x630 et métadonnées présentes.
- Sécurité HTTP publique : HTTPS, HSTS, CSP, `X-Content-Type-Options`, `X-Frame-Options`, Referrer Policy et Permissions Policy présents.
- Témoignages : leur réalité et l’accord de publication sont confirmés par l’utilisateur ; aucune action de retrait n’est requise.

### À améliorer

| Priorité | Action | Pourquoi |
| --- | --- | --- |
| **P0 publication** | Rétablir l’authentification SSH, publier le build et la règle Caddy sans slash final. | Éliminer les 36 redirections initiales et servir chaque canonical directement. |
| **P0 publication** | Relire `/mentions-legales` sans JavaScript après déploiement. | Le premier HTML public doit afficher son titre, sa description, son canonical et son JSON-LD propres. |
| **P1 suivi** | Mesurer Lighthouse public après publication. | Comparer le LCP public au local 3,2–3,3 s et vérifier le cache réel. |
| **P1 autorité GEO** | Obtenir des citations externes réelles et cohérentes. | Le code facilite l’interprétation mais ne crée pas à lui seul l’autorité d’entité. |
| **P1 suivi** | Lire Search Console et Bing après 7 à 28 jours. | Vérifier couverture, exclusions, requêtes, impressions et CTR réels. |
| **P2 GEO** | Tenir un journal daté des tests LLM, sources citées et URL renvoyées. | Mesurer la découvrabilité sans promettre une recommandation automatique. |

## Contrôles exécutés

| Contrôle | Résultat |
| --- | --- |
| `npm ci` | **PASS**, 651 paquets installés, 0 vulnérabilité signalée |
| `npm run lint` | **PASS** |
| `npm run typecheck` | **PASS** |
| `npm run build` | **PASS**, 38 routes prerender |
| `npm run verify:build` | **PASS** |
| `npm run verify:translations` | **PASS**, 62 articles alignés |
| `npm run verify:performance-assets` | **PASS**, 151 WebP |
| `npm test -- --run` | **PASS**, 7 tests |
| `npm run test:e2e` | **PASS**, 16 tests |
| `npm run check:links` | **PASS**, 29 OK, 1 inconnu externe, 0 échec |
| `npm audit --audit-level=high` | **PASS**, 0 vulnérabilité |
| Lighthouse local `/` | **88 performance / 100 accessibilité / 100 bonnes pratiques / 100 SEO**, LCP 3,2 s |
| Lighthouse local `/freelance` | **88 performance / 100 accessibilité / 100 bonnes pratiques / 100 SEO**, LCP 3,3 s |
| Probe SSH `ovh-vps` | **BLOQUÉ**, authentification refusée ; aucune publication effectuée |
| `npm run audit:production` | **À relancer après publication** : dernier readback connu avec 36 redirections initiales et HTML légal obsolète |

## Conclusion opérationnelle

Le SEO et le GEO techniques locaux sont solides et le principal problème de performance local est traité. Le site est prêt à être poussé dès que l’accès SSH de déploiement est rétabli. Après publication, il faut relancer l’audit HTTP, vérifier les 38 routes sans redirection, puis suivre Search Console, Bing et les citations LLM. Le score GEO autorité reste volontairement à **7,2/10** : des citations tierces réelles et des mesures externes sont nécessaires pour le faire progresser, et ne peuvent pas être inventées par le code.
