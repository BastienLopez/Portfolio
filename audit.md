# Audit complet du portfolio — état local et production

Date du contrôle : **21 septembre 2026**
Périmètre : source locale, build prerender, rendu navigateur, SEO/GEO, accessibilité, performance, liens, dépendances et readback HTTP de `https://bastienlopez.fr`.

## Verdict

Le build courant est prêt localement et produit **38 routes canoniques** : accueil, freelance, page locale de création de sites internet à Reims, mentions légales, 22 projets, 2 services et 10 Dev Notes. L’ancienne URL `/services/sites-vitrines` reste une redirection de compatibilité vers la page Reims. Chaque route prerender possède un titre, une description, un canonical, un `h1` et des données structurées. La section Dev Notes expose aussi un `CollectionPage` et un `ItemList` reliant les notes dédiées. La page légale locale contient son titre, son canonical et son JSON-LD propres.

Le retrait du prefetch global des images projet améliore nettement la charge initiale. Le dernier Lighthouse local du 21 septembre mesure **82/100** sur l’accueil, **87/100** sur `/freelance` et **89/100** sur la page locale ; SEO, accessibilité et bonnes pratiques restent à 100. Les scores performance varient selon l’exécution et le build signale encore quelques chunks JavaScript >500 KiB.

Le readback public exécuté le 21 septembre 2026 confirme la publication : **38 URLs**, **38/38 finales en 200**, **0 redirection initiale**, et la redirection 301 de compatibilité de `/services/sites-vitrines`. `/creation-site-internet-reims` et `/mentions-legales` sans slash servent chacun leur HTML initial, titre, canonical et données structurées. La convention d’URL est maintenant alignée côté Caddy et sitemap.

## Notes actuelles

Ces évaluations sont des notes techniques internes, pas des scores officiels Google ou LLM.

| Axe | Local actuel | Production observée | Évidence / limite |
| --- | ---: | ---: | --- |
| Positionnement | **9,0/10** | **8,8/10** | Métier, Reims, services et cas d’usage explicites. |
| Frontend / architecture | **9,1/10** | **8,8/10** | React/Vite, composants réutilisables, routes prerender. |
| UI / UX | **9,1/10** | **9,1/10** | Parcours desktop/mobile public sans erreur console ; routes canoniques servies directement. |
| Accessibilité / responsive | **9,5/10** | **9,5/10** | Lighthouse 100 et axe/E2E sans régression. |
| Anti-AI-slop | **8,5/10** | **7,9/10** | Design spécifique et contenu réel ; autorité externe encore limitée. |
| Copywriting | **8,8/10** | **8,4/10** | Français prioritaire, pages d’intention et CTA cohérents. |
| Portfolio / projets | **9,0/10** | **8,7/10** | 22 projets, stacks, images et fiches conservés. |
| Crédibilité / preuves | **8,2/10** | **7,5/10** | Témoignages réels et accord confirmé par le propriétaire ; résultats externes chiffrés non publiés. |
| SEO technique — code | **9,9/10** | **9,2/10** | Canonical, métadonnées de section, JSON-LD, robots, sitemap et prerender contrôlés. |
| SEO technique — production | **9,9/10** | **9,9/10** | Audit public : 38/38 routes finales en 200, 0 redirection initiale, canonical légal et redirection legacy conformes. |
| SEO contenu | **9,0/10** | **8,8/10** | 10 notes françaises d’intention, descriptions thématiques et liens internes publiés ; indexation réelle à suivre. |
| GEO technique | **9,9/10** | **9,9/10** | `llms.txt`, `llms-full.txt`, sitemap, `CollectionPage`, `ItemList` et métadonnées d’articles validés en production. |
| GEO autorité / entité | **7,2/10** | **6,8/10** | Citations tierces et recommandations LLM restent à mesurer. |
| **Global** | **≈ 9,1/10** | **≈ 9,0/10** | Technique publiée et cohérente ; l’autorité GEO externe et la mesure d’indexation restent à développer. |

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
- Readback production : 38/38 routes du sitemap répondent directement en 200, sans redirection initiale ; `/services/sites-vitrines` répond en 301 vers `/creation-site-internet-reims`, et `/mentions-legales` sans slash sert la fiche légale.
- Lighthouse local : `/` à **82 performance / 100 accessibilité / 100 bonnes pratiques / 100 SEO**, `/freelance` à **87 / 100 / 100 / 100**, `/creation-site-internet-reims` à **89 / 100 / 100 / 100**. Le contrôle public actuel est structurel (HTTP, routes et métadonnées) ; aucun score Lighthouse de production n’est extrapolé.

### À améliorer

| Priorité | Action | Pourquoi |
| --- | --- | --- |
| **P1 performance** | Réduire les chunks JavaScript et CSS réellement inutilisés si le gain est mesurable. | Lighthouse local est à 82–89 en performance ; quelques chunks vendor dépassent encore 500 KiB. |
| **P1 suivi** | Conserver la mesure Lighthouse publique. | Surveiller le LCP et les scores après chaque publication ; les audits sont sensibles aux conditions réseau. |
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
| `npm run check:links` | **PASS**, 31 OK, 1 inconnu externe, 0 échec (limite réseau/anti-bot externe) |
| `npm audit --audit-level=high` | **PASS**, 0 vulnérabilité |
| Lighthouse local `/` | **82 performance / 100 accessibilité / 100 bonnes pratiques / 100 SEO** |
| Lighthouse local `/freelance` | **87 performance / 100 accessibilité / 100 bonnes pratiques / 100 SEO** |
| Lighthouse local `/creation-site-internet-reims` | **89 performance / 100 accessibilité / 100 bonnes pratiques / 100 SEO** |
| `npm run test:axe` | **PASS**, 4 tests d’accessibilité |
| Probe SSH `ovh-vps` | **N/D**, accès SSH non nécessaire pour ce readback ; publication confirmée par les réponses HTTP publiques |
| `npm run audit:production` | **PASS**, 38 routes du sitemap, 38/38 finales en 200, 0 redirection initiale, redirection legacy et fichiers GEO conformes |
| Readback navigateur production | **PASS**, accueil/Dev Notes à 1440 et 375 px, fond `rgb(20, 25, 31)`, note ouverte au début, 0 erreur console/réseau |
| Lighthouse production | **N/D dans ce passage** : le readback public a vérifié HTTP, routes, métadonnées et fichiers GEO ; Lighthouse local est documenté ci-dessus |

## Conclusion opérationnelle

Le build local et la production exposent maintenant la même page complète de création de sites internet à Reims, avec des routes canoniques, un HTML légal correct et les fichiers GEO cohérents. L’audit public est conforme techniquement. Les prochaines améliorations concernent la performance fine, l’indexation observée dans Search Console/Bing et l’autorité GEO externe ; le score GEO autorité reste à **7,2/10** car les citations et recommandations ne peuvent pas être garanties par le code.
