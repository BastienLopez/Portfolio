## Portfolio — Développeur Full-Stack IA & Automatisation

Portfolio de Bastien Lopez, développeur full-stack IA & automatisation. Le site s'adresse aux recruteurs pour des postes remote/full remote et aux clients pour des missions freelance ciblées.

Site officiel : [bastienlopez.fr](https://bastienlopez.fr/)

L'ancien déploiement GitHub Pages a été supprimé. GitHub reste uniquement utilisé comme dépôt de code source.

## À propos

Ce site présente mon travail autour des applications métier, APIs internes, workflows IA, automatisations n8n, React, TypeScript, Python/FastAPI, Docker et CI/CD.

## Compétences

- Frontend : React, TypeScript, HTML5/CSS3, Tailwind CSS
- Backend : Node.js, Express, FastAPI, Python
- Bases de données : MongoDB, PostgreSQL, MySQL
- DevOps / Déploiement : Docker, CI/CD, hébergement statique
- Outils & méthodologies : Git, TDD, architecture propre

## Projets

Vous trouverez des exemples de projets et captures dans le site lui-même, dans la section Projets. Les images et ressources se trouvent dans `public/img_projects`.

## Technologies utilisées

Le site est construit avec : Vite, React, TypeScript, shadcn-ui et Tailwind CSS.

## Installation et développement local

Prérequis : Node.js 22.12 ou supérieur et npm 10 ou supérieur. Le runtime local et CI recommandé est Node.js 22.22.0, indiqué dans `.nvmrc`.

Installer les dépendances :

```powershell
npm ci
```

Lancer le serveur de développement :

```powershell
npm run dev
```

Vérifier le projet :

```powershell
npm run check
```

Construire les fichiers statiques :

```powershell
npm run build
```

Vérifier le contenu généré :

```powershell
npm run verify:build
```

Le hero reste lisible sur les hauteurs courtes : les CTA et l'indicateur de défilement restent dans le flux, et le titre complet est conservé dans le prérendu malgré son effet de frappe. Les parcours responsive couvrent notamment 320, 375, 430, 768, 1280 et 1920 px de large, ainsi que les hauteurs desktop courtes.

Vérifier les variantes d’images :

```powershell
npm run verify:performance-assets
```

Lancer les tests unitaires :

```powershell
npm test
```

Lancer les parcours navigateur, responsive et axe (Chromium) :

```powershell
npx playwright install chromium
npm run test:e2e
```

Les fichiers produits sont placés dans `dist/`.

Tester le build avec le serveur de preview :

```powershell
npm run preview -- --host 127.0.0.1 --port 4173
```

## Déploiement VPS

Le déploiement de production est statique : le build est réalisé localement, puis le contenu de `dist/` est copié sur le VPS.

Le script [`scripts/deploy-vps.ps1`](scripts/deploy-vps.ps1) installe les dépendances avec `npm ci`, lance `npm run check`, puis envoie uniquement le contenu de `dist/` via SSH et SCP. Il utilise la clé SSH déjà configurée sur le poste et ne contient ni adresse IP, ni mot de passe, ni secret.

Exemple :

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\deploy-vps.ps1 `
  -VpsHost "ADRESSE_IP_DU_VPS"
```

Les paramètres `VpsUser` et `RemotePath` peuvent être personnalisés. Leurs valeurs par défaut sont `bl_ovh` et `/var/www/bastienlopez.fr`.

Caddy, installé séparément sur le VPS, servira directement `/var/www/bastienlopez.fr`. La configuration de référence est [`deploy/Caddyfile.example`](deploy/Caddyfile.example). Elle garde les routes SPA connues (`/`, `/freelance` et `/mentions-legales`) en 200, sert les fichiers existants et affiche la page React NotFound avec un vrai statut 404 pour les chemins inconnus. Caddy gérera automatiquement HTTPS ; aucun cron Certbot n'est nécessaire.

La même configuration redirige `www.bastienlopez.fr` vers le domaine canonique, conserve `/`, `/freelance` et `/mentions-legales` en 200, sert les fichiers existants et affiche la page React NotFound avec un vrai statut 404 pour les chemins inconnus. Elle active les headers de sécurité et une CSP en `Content-Security-Policy`. Vérifier dans Chrome le domaine canonique, `/freelance`, `/mentions-legales`, une route inconnue, un asset existant et le sous-domaine `www`. L'application ne charge pas de script de mesure d'audience côté client ; `connect-src 'self'` et `img-src 'self' data:` restent donc volontairement bornés.

Le déploiement de production reste manuel pour le moment. Aucune CI ne se connecte au VPS.

## CI

Le workflow GitHub Actions [`.github/workflows/ci.yml`](.github/workflows/ci.yml) vérifie le projet avec Node.js 22.22.0. Il sépare les contrôles de qualité, les tests unitaires, les parcours Chromium/axe et les liens critiques. La CI ne déploie ni sur GitHub Pages ni sur le VPS.

## SEO / GEO

Le SEO principal est géré dans [index.html](index.html) :

- title, meta description, canonical et hreflang
- Open Graph / Twitter cards
- JSON-LD (WebSite, WebPage, Person, ProfessionalService, FAQPage)

Fichiers publics SEO :

- [public/robots.txt](public/robots.txt)
- [public/sitemap.xml](public/sitemap.xml)
- [public/llms.txt](public/llms.txt)
- [public/site.webmanifest](public/site.webmanifest)

Image sociale Open Graph : [public/og-image.svg](public/og-image.svg). Pour la remplacer, conserver un format 1200x630 et mettre à jour les URL `og:image` et `twitter:image` dans [index.html](index.html) si le nom change.

Après la mise en ligne du domaine, une nouvelle validation Search Console pourra être effectuée si nécessaire.

Après chaque déploiement qui modifie les routes publiques, vérifier que `/freelance` répond en 200, que `/sitemap.xml` contient cette URL et que `/robots.txt` référence le sitemap, puis resoumettre `sitemap.xml` dans Search Console.

## Contact

Pour un poste remote/full remote, une mission freelance ciblée, une collaboration ou une question technique, utiliser la section Contact du site ou contacter Bastien via GitHub ou LinkedIn.
