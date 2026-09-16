# Audit complet du portfolio — état local et production

Date du contrôle : **16 septembre 2026**
Périmètre : source locale, build prerender, rendu navigateur, SEO/GEO, accessibilité, performance, liens, dépendances et readback HTTP de `https://bastienlopez.fr`.

## Verdict

Le build courant est prêt localement et produit **38 routes canoniques** : accueil, freelance, page locale de création de sites internet à Reims, mentions légales, 22 projets, 2 services et 10 Dev Notes. L’ancienne URL `/services/sites-vitrines` reste une redirection de compatibilité vers la page Reims. Chaque route prerender possède un titre, une description, un canonical, un `h1` et des données structurées. La section Dev Notes expose aussi un `CollectionPage` et un `ItemList` reliant les notes dédiées. La page légale locale contient son titre, son canonical et son JSON-LD propres.

Le retrait du prefetch global des images projet améliore nettement la charge initiale. Le dernier Lighthouse local mesure **88/100** sur l’accueil, **88/100** sur `/freelance` et **91/100** sur la page locale ; SEO, accessibilité et bonnes pratiques restent à 100. Le LCP observé se situe entre **3,0 et 3,2 s** sur ces trois routes. Les scores performance varient selon l’exécution.

Le readback public exécuté le 16 septembre 2026 sert encore l’ancien sitemap : **38 URLs**, **38/38 finales en 200**, mais **36 redirections 308**, aucune page locale `/creation-site-internet-reims` publiée et aucune redirection de l’ancienne URL sites vitrines. `/mentions-legales` sans slash sert encore le shell accueil au lieu de sa fiche légale. La convention d’URL et le déploiement devront être harmonisés côté Caddy/VPS.

## Notes actuelles

Ces évaluations sont des notes techniques internes, pas des scores officiels Google ou LLM.

| Axe | Local actuel | Production observée | Évidence / limite |
| --- | ---: | ---: | --- |
| Positionnement | **9,0/10** | **8,8/10** | Métier, Reims, services et cas d’usage explicites. |
| Frontend / architecture | **9,1/10** | **8,8/10** | React/Vite, composants réutilisables, routes prerender. |
| UI / UX | **9,1/10** | **8,8/10** | Parcours desktop/mobile public sans erreur console ; les redirections d’URL restent à nettoyer. |
| Accessibilité / responsive | **9,5/10** | **9,5/10** | Lighthouse 100 et axe/E2E sans régression. |
| Anti-AI-slop | **8,5/10** | **7,9/10** | Design spécifique et contenu réel ; autorité externe encore limitée. |
| Copywriting | **8,8/10** | **8,4/10** | Français prioritaire, pages d’intention et CTA cohérents. |
| Portfolio / projets | **9,0/10** | **8,7/10** | 22 projets, stacks, images et fiches conservés. |
| Crédibilité / preuves | **8,2/10** | **7,5/10** | Témoignages réels et accord confirmé par le propriétaire ; résultats externes chiffrés non publiés. |
| SEO technique — code | **9,9/10** | **9,2/10** | Canonical, métadonnées de section, JSON-LD, robots, sitemap et prerender contrôlés. |
| SEO technique — production | **9,9/10** | **8,0/10** | Lighthouse SEO 100, mais 36 redirections initiales et `/mentions-legales` sans slash incorrecte. |
| SEO contenu | **9,0/10** | **8,8/10** | 10 notes françaises d’intention, descriptions thématiques et liens internes publiés ; indexation réelle à suivre. |
| GEO technique | **9,9/10** | **9,6/10** | `llms.txt`, `llms-full.txt`, `CollectionPage`, `ItemList` et métadonnées d’articles validés localement ; la nouvelle page locale reste à publier. |
| GEO autorité / entité | **7,2/10** | **6,8/10** | Citations tierces et recommandations LLM restent à mesurer. |
| **Global** | **≈ 9,1/10** | **≈ 8,5/10** | Build local prêt ; l’écart observé vient du routage serveur public et de l’autorité externe. |

## SEO et GEO : état précis

### Validé localement

- Sitemap : **38 URLs canoniques uniques**, toutes avec `lastmod`.
- Ancienne URL du portfolio GitHub Pages : **0 référence dans le build** ; les démos de production des projets sont conservées.
- Métadonnées : **38/38** routes canoniques avec titre, description, canonical, `h1` et JSON-LD ; zéro doublon de titre ou de description.
- Données structurées : `Person`, `ProfilePage`, `ProfessionalService`, `Service`, `CreativeWork`, `TechArticle`, `FAQPage` et `BreadcrumbList` selon les routes.
- Architecture des pages site vitrine : `/creation-site-internet-reims` regroupe désormais l’intention Reims, le périmètre, les livrables, la méthode, les résultats et la FAQ. `/services/sites-vitrines` est conservée uniquement comme ancienne URL de compatibilité redirigée vers cette page.
- Crawlabilité : `robots.txt` autorise le site, déclare le sitemap et autorise `OAI-SearchBot` ; les pages sont prérendues avec leur contenu principal.
- GEO documentaire : 22 projets, 10 notes, 2 services canoniques et la page locale complète de création de sites internet à Reims sont décrits dans les fichiers LLM avec des liens canoniques.
- Dev Notes : les cinq thèmes sont décrits dans les fichiers LLM, les notes indexables sont reliées par un `ItemList` et les pages dédiées exposent leur section, leurs mots-clés et leur temps de lecture.
- UX Dev Notes : l’ouverture d’une note inline repositionne le début de la note sous la navigation ; les pages dédiées et la section inline utilisent le fond exact `#14191f`.
- Intentions françaises couvertes : création de sites internet à Reims, création de site d’entreprise, développeur web freelance à Reims, application métier PME et automatisation n8n.
- Open Graph/Twitter : image 1200x630 et métadonnées présentes.
- Sécurité HTTP publique : HTTPS, HSTS, CSP, `X-Content-Type-Options`, `X-Frame-Options`, Referrer Policy et Permissions Policy présents.
- Témoignages : leur réalité et l’accord de publication sont confirmés par l’utilisateur ; aucune action de retrait n’est requise.
- Autorité externe : GitHub, LinkedIn, Malt et Société.com sont maintenant reliés dans les données structurées et les fichiers LLM ; ces profils confirment l’identité et l’activité de développement web à Reims. La recherche publique fait toutefois encore peu remonter le domaine lui-même, donc le GEO autorité reste à **7,2/10**.
- Readback production : accueil, `/freelance/`, `/mentions-legales/` et une Dev Note répondent en 200 ; aucun message console ni échec réseau sur les parcours desktop/mobile testés.
- Lighthouse production : `/` à **93 performance / 100 accessibilité / 100 bonnes pratiques / 100 SEO**, `/freelance/` à **95 / 100 / 100 / 100**, LCP **2,6 s** sur les deux routes.

### À améliorer

| Priorité | Action | Pourquoi |
| --- | --- | --- |
| **P0 serveur** | Harmoniser la règle Caddy avec la convention sans slash du sitemap et du canonical. | Éliminer les 36 redirections initiales et servir chaque URL publiée directement. |
| **P0 serveur** | Corriger le fallback de `/mentions-legales` sans slash. | Le premier HTML public doit afficher la fiche légale, son titre, sa description, son canonical et son JSON-LD. |
| **P1 suivi** | Conserver la mesure Lighthouse publique. | Les scores actuels sont bons ; surveiller le LCP et les économies JS/CSS après la correction serveur. |
| **P1 autorité GEO** | Consolider les citations externes et remplacer les anciens liens de portfolio sur les profils tiers. | GitHub, Malt et Société.com fournissent déjà des signaux cohérents ; le domaine doit encore devenir la destination de référence. |
| **P1 suivi** | Lire Search Console et Bing après 7 à 28 jours. | Vérifier couverture, exclusions, requêtes, impressions et CTR réels. |
| **P2 GEO** | Tenir un journal daté des tests LLM, sources citées et URL renvoyées. | Mesurer la découvrabilité sans promettre une recommandation automatique. |

## Contrôles exécutés

| Contrôle | Résultat |
| --- | --- |
| `npm ci` | **PASS**, 651 paquets installés, 0 vulnérabilité signalée |
| `npm run lint` | **PASS** |
| `npm run typecheck` | **PASS** |
| `npm run build` | **PASS**, 38 routes canoniques prerender |
| `npm run verify:build` | **PASS** |
| `npm run verify:translations` | **PASS**, 62 articles alignés |
| `npm run verify:performance-assets` | **PASS**, 151 WebP |
| `npm test -- --run` | **PASS**, 7 tests |
| `npm run test:e2e` | **PASS**, 16 tests |
| `npm run check:links` | **PASS**, 29 OK, 2 inconnus externes, 0 échec (App Store et LinkedIn soumis à des limites réseau) |
| `npm audit --audit-level=high` | **PASS**, 0 vulnérabilité |
| Lighthouse local `/` | **88 performance / 100 accessibilité / 100 bonnes pratiques / 100 SEO** |
| Lighthouse local `/freelance` | **88 performance / 100 accessibilité / 100 bonnes pratiques / 100 SEO** |
| Lighthouse local `/creation-site-internet-reims` | **91 performance / 100 accessibilité / 100 bonnes pratiques / 100 SEO** |
| Probe SSH `ovh-vps` | **N/D**, accès SSH non nécessaire pour ce readback ; publication confirmée par les réponses HTTP publiques |
| `npm run audit:production` | **FAIL attendu avant publication (44 écarts)**, readback actuel : 38 routes, 36 redirections initiales, page locale absente, alias sites-vitrines non redirigé, légal sans slash incorrect et `llms.txt` incomplet |
| Readback navigateur production | **PASS**, accueil/Dev Notes à 1440 et 375 px, fond `rgb(20, 25, 31)`, note ouverte au début, 0 erreur console/réseau |
| Lighthouse production | **PASS SEO/accessibilité/bonnes pratiques**, performance 93–95, LCP 2,6 s |

## Conclusion opérationnelle

Le build local contient maintenant une page unique et complète pour la création de sites internet à Reims. Ses signaux SEO/GEO techniques sont cohérents. La production ne pourra être déclarée conforme qu’après publication de ces 38 routes canoniques, mise en place de la redirection legacy, correction des redirections serveur et correction du fallback de `/mentions-legales` sans slash. Il faudra ensuite relancer l’audit HTTP puis suivre Search Console, Bing et les citations LLM. Le score GEO autorité reste volontairement à **7,2/10** : des citations tierces réelles et des mesures externes sont nécessaires pour le faire progresser, et ne peuvent pas être inventées par le code.
