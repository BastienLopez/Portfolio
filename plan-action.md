# Plan d’action — état après préparation de la prochaine publication

Date de mise à jour : **15 septembre 2026**  
Source : audit local final et dernier contrôle HTTP de `https://bastienlopez.fr`.

## État général

La refonte, le prerender, les métadonnées et les fondations SEO/GEO sont corrigés dans le dépôt. Le build local produit **38 URLs** : 22 projets, 10 Dev Notes, 3 services, l’accueil, la page freelance et les pages légales/404. Lighthouse local donne **SEO 100, accessibilité 100, bonnes pratiques 100**, avec **72/100** de performance sur l’accueil et **73/100** sur `/freelance`.

La production n’a pas encore reçu ce build. Le dernier readback public reste à 36 URLs avec 34 redirections vers slash et une metadata légale initiale incorrecte. Le travail local est donc prêt ; la clôture production dépend d’une publication et d’un contrôle HTTP externe.

## Travaux terminés et vérifiés dans le dépôt

| Sujet | État | Preuve |
| --- | --- | --- |
| Refonte UI des projets, stacks et fiches | **FAIT** | Tests E2E et 22 projets conservés. |
| Dev Notes et catégories | **FAIT** | 10 routes notes dans le sitemap et le prerender ; test E2E adapté. |
| Prerender et routes publiques | **FAIT LOCALEMENT** | Build + `verify:build` ; 38 sorties HTML et canonical contrôlés. |
| HTML initial des mentions légales | **FAIT LOCALEMENT** | `dist/mentions-legales/index.html` contient titre, description, robots et canonical légaux. |
| Convention canonical sans slash | **FAIT DANS LE CODE** | Prerender, sitemap, metadata et Caddy de référence alignés. |
| SEO de base | **FAIT** | Lighthouse local SEO 100 ; JSON-LD et robots vérifiés. |
| Accessibilité et bonnes pratiques | **FAIT** | Lighthouse local 100/100 ; E2E et axe existants. |
| Allègement app-shell | **FAIT** | Providers inutilisés retirés de `src/App.tsx` ; performance locale 71/73. |
| Sitemap source | **FAIT** | 38 URLs uniques, `lastmod`, robots et vérification build. |
| `llms.txt` / `llms-full.txt` source | **FAIT** | Identité, Reims, services, 22 projets et 10 notes. |
| Contenu SEO/GEO français | **FAIT** | Deux notes d’intention ajoutées, 62 traductions alignées, liens internes services. |
| Audit reproductible | **FAIT** | `npm run audit:production` vérifie routes, metadata, JSON-LD, robots et GEO. |
| Dépendances à haut risque | **FAIT** | `npm audit --audit-level=high` : 0 vulnérabilité. |

## Reste à faire avant de déclarer la production conforme

### P0 — publication et routage

| Action | Critère de validation | État |
| --- | --- | --- |
| Publier le build local sur l’hôte actif | Le serveur sert les 38 dossiers prerender et les fichiers `llms*`, sitemap et robots à jour | **À déployer** |
| Appliquer la convention d’URL sans slash | `curl -I` de chaque `<loc>` du sitemap répond directement 200, sans 308 intermédiaire | **À déployer / non prouvé** |
| Relire `/mentions-legales` sans JavaScript | Titre légal, description légale, `noindex`/`index` attendu et canonical légal dans le premier HTML | **À déployer / non prouvé** |
| Relancer `npm run audit:production` | 38/38 finales 200, 0 redirection, 0 metadata incohérente, GEO complet | **Bloqué par la publication** |

### P1 — mesure externe et autorité

| Action | Critère de validation | État |
| --- | --- | --- |
| Relire Google Search Console | Sitemap traité, couverture et exclusions comprises, requêtes/impressions suivies à 7–28 jours | **À faire dans le compte** |
| Vérifier Bing Webmaster Tools | Sitemap et pages prioritaires découverts | **À faire dans le compte** |
| Consolider les preuves de crédibilité | Témoignages, résultats et liens de projets publiables avec accord ou anonymisation cohérente | **À faire éditorialement** |
| Mesurer la performance publique | Lighthouse après publication, cache/CDN et LCP comparés au local 72/73 | **À mesurer** |

### P2 — GEO continu

| Action | Critère de validation | État |
| --- | --- | --- |
| Tester la découvrabilité LLM | Journal daté des requêtes, sources citées, URL renvoyées et évolution observée | **À faire périodiquement** |
| Publier de nouvelles notes à intention française | Chaque note répond à une question, cite une preuve interne et renvoie vers un service ou une étude de cas | **Prêt à continuer** |
| Maintenir les index GEO | Toute nouvelle fiche est ajoutée au sitemap, `llms.txt`, `llms-full.txt`, prerender et vérifications | **Automatisé par contrôles, à maintenir** |

## Checklist de clôture

- [x] Build, lint, typecheck, unités, E2E, assets, traductions et audit npm relancés.
- [x] Sitemap source, canonical et prerender utilisent la convention sans slash.
- [x] `/mentions-legales` est correct dans le HTML local sans dépendre de l’hydratation.
- [x] `llms-full.txt` couvre les 22 projets et 10 notes du build local.
- [ ] Publier le build et la configuration de routage.
- [ ] Relancer `npm run audit:production` avec 0 écart.
- [ ] Relire le sitemap et la couverture dans Search Console/Bing.

## Ce qui ne peut pas être garanti par le code seul

Un sitemap, `llms.txt`, du JSON-LD et des pages bien rédigées facilitent l’interprétation. Ils ne forcent pas Google ou un LLM à indexer, citer ou recommander le site. L’autorité externe, les citations indépendantes, la qualité des réponses et le temps restent nécessaires.
