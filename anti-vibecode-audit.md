# Audit anti-AI-slop — portfolio Bastien Lopez

Date : **15 septembre 2026**  
Périmètre : rendu local, production publique, contenu, routes, responsive, accessibilité, SEO/GEO, crédibilité et comportements inachevés.

## Verdict

Le portfolio a une identité claire : développeur Full-Stack IA et automatisation, basé à Reims, avec des offres, projets et notes techniques concrets. Les cartes et fiches projets ont une hiérarchie cohérente, les Dev Notes sont structurées et les CTA renvoient vers des parcours réels.

Le dépôt local est propre et testable. La production reste en décalage tant que le nouveau build n’est pas publié : ce décalage technique ne doit pas être masqué par une note visuelle.

## Score anti-slop

| Axe | Note | Observation |
| --- | ---: | --- |
| Identité et positionnement | **9,0/10** | Métier, zone, services et usages visibles dès l’accueil. |
| Hiérarchie et composition | **8,8/10** | Hero, projets clés, catégories, offres, preuves et contact ont un ordre lisible. |
| Spécificité du contenu | **8,5/10** | 22 projets, stacks explicites et 10 notes d’intention ; certaines phrases restent sobres par prudence factuelle. |
| Finition et comportement | **8,8/10** | 15 E2E, axe, build et routes prerender ; animation typing conservée volontairement avec contenu initial présent. |
| SEO/GEO sans promesse abusive | **9,0/10 local** | Metadata, JSON-LD, sitemap et index LLM contrôlés ; recommandations LLM non garanties. |
| Crédibilité | **6,8/10** | Témoignages et projets présents ; preuves externes, résultats chiffrés et autorisations restent à consolider. |
| **Global anti-slop** | **8,3/10 local** | Interface et contenu spécifiques ; le dernier gain vient de la preuve externe et de la publication correcte. |

## Ce qui est convaincant

- Les textes français répondent à des besoins reconnaissables : site vitrine, application métier, API, automatisation et n8n.
- Les 22 projets ont conservé leurs données, liens, technologies et fiches détaillées.
- Les 10 Dev Notes ont un titre, un résumé, des sections et un retour vers les projets.
- Les cartes de projets affichent les stacks en texte complet, sans coupure artificielle.
- Le code vérifie maintenant les canonical, la fiche légale, les index GEO et les routes avant publication.
- `llms.txt` et `llms-full.txt` locaux donnent une représentation exploitable de l’entité, des services, projets et notes.

## Résidus à surveiller

- La production publique sert encore l’ancienne convention slash et l’ancien nombre de notes jusqu’au prochain déploiement.
- Les résultats Search Console, Bing et les recommandations LLM sont externes et doivent être mesurés dans le temps.
- La performance locale est correcte mais reste perfectible : 72/100 accueil et 73/100 freelance, principalement à cause des chunks vendor/CSS et du LCP simulé.
- Les témoignages et résultats doivent rester reliés à des preuves autorisées ; aucune métrique ne doit être ajoutée sans source.

## Validation exécutée

- `npm run lint`, `npm run typecheck`, `npm run build`, `npm run verify:build` : **PASS**.
- `npm run verify:translations` : **PASS**, 62 articles alignés.
- `npm run verify:performance-assets` : **PASS**, 151 WebP.
- `npm test -- --run` : **PASS**, 7 tests.
- `npm run test:e2e` : **PASS**, 15 tests.
- `npm run check:links` : 29 OK, 1 inconnu externe, 0 échec.
- `npm audit --audit-level=high` : **PASS**, 0 vulnérabilité.
- Lighthouse local : SEO/accessibilité/bonnes pratiques 100/100/100 ; performance 72/73.
- Audit public reproductible : **FAIL attendu avant déploiement**, 36 URLs publiques, 34 redirections initiales et metadata légale obsolète.

## Actions restantes

1. Publier le build et la règle de routage canonique.
2. Relancer `npm run audit:production` et documenter le readback 38/38 sans redirection.
3. Suivre Search Console, Bing et un journal de requêtes LLM.
4. Ajouter uniquement des preuves et résultats vérifiables avec accord.
