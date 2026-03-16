## Portfolio — Développeur freelance

Bienvenue sur mon portfolio de développeur freelance. Ce dépôt contient le site présentant mes compétences, mes réalisations (projets), ainsi que les moyens de me contacter.

Disponible via : [Portfolio](https://bastienlopez.github.io/Portfolio/)
## À propos

Ce site présente mon travail en tant que développeur web : création d'interfaces modernes avec React et TypeScript, développement d'API, intégration d'outils de CI/CD, et accompagnement technique pour des projets web professionnels.

## Compétences

- Frontend : React, TypeScript, HTML5/CSS3, Tailwind CSS
- Backend : Node.js, Express, FastAPI, Python
- Bases de données : MongoDB, PostgreSQL, MySQL
- DevOps / Déploiement : Docker, GitHub Actions, hébergement statique
- Outils & méthodologies : Git, TDD, CI/CD, architecture propres

## Projets

Vous trouverez des exemples de projets et captures dans le site lui-même (section Projets). Les images et ressources se trouvent dans `public/img_projects`.

## Technologies utilisées

Le site est construit avec : Vite, React, TypeScript, shadcn-ui et Tailwind CSS.

## Lancer le site en local

Prérequis : Node.js (version LTS) et npm.

1. Installer les dépendances :

```powershell
npm install
```

2. Lancer le serveur de développement :

```powershell
npm run dev
```

3. Construire pour la production :

```powershell
npm run build
```

Si vous aviez des dépendances supprimées du `package.json`, exécutez `npm install` pour mettre à jour le `package-lock.json`.

## Déploiement

Vous pouvez déployer le dossier `dist` produit par `npm run build` sur n'importe quel hébergeur de sites statiques (Netlify, Vercel, GitHub Pages, etc.).

## SEO / GEO (GitHub Pages)

Le SEO principal est géré dans [index.html](index.html):
- title, meta description, canonical
- Open Graph / Twitter cards
- JSON-LD (WebSite, WebPage, Person, ProfessionalService, FAQPage)

Fichiers publics SEO:
- [public/robots.txt](public/robots.txt)
- [public/sitemap.xml](public/sitemap.xml)
- [public/llms.txt](public/llms.txt)

Image sociale Open Graph:
- [public/og-image.svg](public/og-image.svg)
- Pour la remplacer: conservez un format 1200x630 et mettez a jour l'URL `og:image` / `twitter:image` dans [index.html](index.html) si le nom change.

Important pour ce repo:
- Le site est servi sous `/Portfolio/` (GitHub Pages).
- Les URLs absolues SEO doivent rester sur `https://bastienlopez.github.io/Portfolio/`.

## Contact

Pour toute demande de mission freelance, collaboration ou question technique, utilisez la section Contact du site ou contactez-moi via mon profil GitHub.
