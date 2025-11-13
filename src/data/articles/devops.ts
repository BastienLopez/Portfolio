import { Article } from './types';

export const devopsArticles: Article[] = [
  // ⚙️ CI/CD & DevOps
    { 
      id: '11', 
      title: 'Qu\'est-ce que le CI/CD et pourquoi c\'est essentiel', 
      category: 'devops',
      content: `
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : La révolution DevOps
</h2>
  
  Le <strong class="font-bold text-primary">CI/CD (Continuous Integration / Continuous Delivery)</strong> n'est pas qu'un buzzword — c'est devenu le <strong class="font-bold text-primary">standard incontournable</strong> du développement moderne.
  
  Avant le CI/CD, les équipes rencontraient des problèmes récurrents :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">"Ça marche sur ma machine" mais explose en prod</li>
  <li class="ml-4">Intégrations manuelles qui prennent des heures</li>
  <li class="ml-4">Bugs découverts des semaines après le commit</li>
  <li class="ml-4">Déploiements stressants le vendredi soir</li>
</ul>
  
  Le CI/CD résout ces problèmes en <strong class="font-bold text-primary">automatisant tout le cycle</strong> : du commit jusqu'à la production.
  
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ CI : Continuous Integration (Intégration Continue)
</h2>
  
  <h3 class="text-xl font-bold mt-6 mb-3">Principe fondamental
</h3>
  
  L'intégration continue repose sur un concept simple : <strong class="font-bold text-primary">fusionner le code fréquemment</strong> (plusieurs fois par jour) au lieu d'attendre des semaines.
  
  À chaque commit ou pull request, une pipeline automatique :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Clone le code</li>
  <li class="ml-4">Installe les dépendances</li>
  <li class="ml-4">Lance le linting (ESLint, Prettier)</li>
  <li class="ml-4">Exécute les tests unitaires et d'intégration</li>
  <li class="ml-4">Build le projet</li>
  <li class="ml-4">Vérifie la couverture de code</li>
</ul>
  
  <strong class="font-bold text-primary">Objectif :</strong> garantir que chaque commit laisse le projet dans un état stable et déployable.
  
  <h3 class="text-xl font-bold mt-6 mb-3">Exemple concret avec GitHub Actions
</h3>
  
  Fichier <strong class="font-bold text-primary">.github/workflows/ci.yml</strong> :
  
  \`\`\`yaml
  name: CI Pipeline
  
  on:
    push:
      branches: [ main, develop ]
    pull_request:
      branches: [ main ]
  
  jobs:
    test:
      runs-on: ubuntu-latest
      
      strategy:
        matrix:
          node-version: [18, 20]
      
      steps:
        - uses: actions/checkout@v4
        
        - name: Setup Node.js \${{ matrix.node-version }}
          uses: actions/setup-node@v4
          with:
            node-version: \${{ matrix.node-version }}
            cache: 'npm'
        
        - name: Install dependencies
          run: npm ci
        
        - name: Lint code
          run: npm run lint
        
        - name: Run tests
          run: npm test -- --coverage
        
        - name: Build
          run: npm run build
        
        - name: Upload coverage to Codecov
          uses: codecov/codecov-action@v3
          with:
            files: ./coverage/coverage-final.json
  \`\`\`
  
  <h3 class="text-xl font-bold mt-6 mb-3">Les bénéfices de la CI
</h3>
  
  <strong class="font-bold text-primary">1. Feedback immédiat</strong>
  Tu sais en 5 minutes si ton code casse quelque chose, pas 2 semaines plus tard.
  
  <strong class="font-bold text-primary">2. Moins de conflits</strong>
  Des merges fréquents = des conflits Git plus petits et plus faciles à résoudre.
  
  <strong class="font-bold text-primary">3. Qualité constante</strong>
  Les tests automatiques empêchent les régressions de passer en prod.
  
  <strong class="font-bold text-primary">4. Documentation vivante</strong>
  La pipeline elle-même documente le processus de build.
  
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ CD : Continuous Delivery vs Continuous Deployment
</h2>
  
  <h3 class="text-xl font-bold mt-6 mb-3">Continuous Delivery (Livraison Continue)
</h3>
  
  Le code est <strong class="font-bold text-primary">toujours prêt à être déployé</strong>, mais le déploiement en production nécessite une validation manuelle.
  
  Workflow typique :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Code → CI → Build → Déploiement auto sur <strong class="font-bold text-primary">staging</strong></li>
  <li class="ml-4">Tests manuels sur staging</li>
  <li class="ml-4">Clic manuel pour déployer en production</li>
</ul>
  
  <strong class="font-bold text-primary">Avantage :</strong> Contrôle humain avant la prod (pour features critiques).
  
  <h3 class="text-xl font-bold mt-6 mb-3">Continuous Deployment (Déploiement Continu)
</h3>
  
  Chaque commit qui passe les tests est <strong class="font-bold text-primary">automatiquement déployé en production</strong> sans intervention humaine.
  
  Workflow typique :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Code → CI → Build → Auto-deploy staging → Auto-deploy production</li>
</ul>
  
  <strong class="font-bold text-primary">Avantage :</strong> Vitesse maximale, releases multiples par jour.
  
  <strong class="font-bold text-primary">Requis :</strong> Tests très solides, feature flags, monitoring robuste.
  
  <h3 class="text-xl font-bold mt-6 mb-3">Exemple de CD avec Vercel
</h3>
  
  \`\`\`yaml
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel Production
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
  \`\`\`
  
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Les outils populaires de CI/CD
</h2>
  
  <h3 class="text-xl font-bold mt-6 mb-3">GitHub Actions</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ Gratuit pour projets publics</li>
  <li class="ml-4">✅ Intégré nativement à GitHub</li>
  <li class="ml-4">✅ Marketplace d'actions réutilisables</li>
  <li class="ml-4">❌ 2000 minutes/mois sur le plan gratuit</li>
</ul>
  
  <h3 class="text-xl font-bold mt-6 mb-3">GitLab CI/CD</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ Pipeline ultra-puissante</li>
  <li class="ml-4">✅ Auto DevOps (détection automatique du langage)</li>
  <li class="ml-4">✅ Runners auto-hébergés</li>
</ul>
  
  <h3 class="text-xl font-bold mt-6 mb-3">CircleCI</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ Très rapide (builds parallèles)</li>
  <li class="ml-4">✅ Docker natif</li>
  <li class="ml-4">❌ Payant rapidement</li>
</ul>
  
  <h3 class="text-xl font-bold mt-6 mb-3">Jenkins</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ Open-source, très customisable</li>
  <li class="ml-4">✅ Des milliers de plugins</li>
  <li class="ml-4">❌ Configuration complexe</li>
  <li class="ml-4">❌ Nécessite un serveur dédié</li>
</ul>
  
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Les bénéfices business du CI/CD
</h2>
  
  <strong class="font-bold text-primary">1. Réduction des coûts</strong>
  Moins de bugs en prod = moins de hotfixes d'urgence = moins d'heures sup.
  
  <strong class="font-bold text-primary">2. Time-to-market accéléré</strong>
  Livrer une feature en 1 jour au lieu de 1 mois.
  
  <strong class="font-bold text-primary">3. Meilleure collaboration</strong>
  Les devs, QA et ops partagent la même pipeline.
  
  <strong class="font-bold text-primary">4. Feedback client rapide</strong>
  Tester des hypothèses produit en quelques heures.
  
  <strong class="font-bold text-primary">5. Confiance accrue</strong>
  Déployer devient banal, plus stressant.
  
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Étapes pour implémenter le CI/CD
</h2>
  
  <h3 class="text-xl font-bold mt-6 mb-3">Semaine 1 : CI basique</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Mettre en place des tests unitaires</li>
  <li class="ml-4">Configurer un linter</li>
  <li class="ml-4">Créer un workflow GitHub Actions simple</li>
</ul>
  
  <h3 class="text-xl font-bold mt-6 mb-3">Semaine 2 : Améliorer la CI</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Ajouter tests d'intégration</li>
  <li class="ml-4">Mesurer la couverture de code (>80%)</li>
  <li class="ml-4">Tester sur plusieurs versions de Node</li>
</ul>
  
  <h3 class="text-xl font-bold mt-6 mb-3">Semaine 3 : CD sur staging</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Auto-deploy sur un environnement de staging</li>
  <li class="ml-4">Mettre en place des tests E2E (Playwright, Cypress)</li>
</ul>
  
  <h3 class="text-xl font-bold mt-6 mb-3">Semaine 4 : CD en production</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Feature flags pour déploiements progressifs</li>
  <li class="ml-4">Monitoring et alertes (Sentry, Datadog)</li>
  <li class="ml-4">Rollback automatique en cas d'erreur</li>
</ul>
  
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">⚠️ Pièges à éviter
</h2>
  
  <strong class="font-bold text-primary">1. Pipeline trop lente</strong>
  Si les tests prennent 30 minutes, personne ne les attend.
  → Solution : paralléliser, cacher les dépendances.
  
  <strong class="font-bold text-primary">2. Tests flaky</strong>
  Tests qui passent ou échouent aléatoirement → perte de confiance.
  → Solution : éviter les timeouts arbitraires, mocker les APIs externes.
  
  <strong class="font-bold text-primary">3. Tout déployer en prod direct</strong>
  Même avec le CD, garde un environnement de staging.
  
  <strong class="font-bold text-primary">4. Ignorer les secrets</strong>
  Ne jamais commit des clés API → utiliser des secrets chiffrés.
  
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Conclusion
</h2>
  
  Le CI/CD n'est pas une option — c'est la <strong class="font-bold text-primary">fondation d'un workflow professionnel</strong>.
  
  > "Si ça fait mal, fais-le plus souvent." — Martin Fowler
  
  Plus tu déploies, moins c'est risqué. Le CI/CD transforme le déploiement d'un événement stressant en un <strong class="font-bold text-primary">non-événement quotidien</strong>.
  
  <strong class="font-bold text-primary">Prochaine étape :</strong> Configure ta première pipeline GitHub Actions et ressens la magie de voir tes tests passer automatiquement à chaque commit ! 🚀
      `
    },
    { 
      id: '12', 
      title: 'Mettre en place une pipeline CI/CD simple avec GitHub Actions', 
      category: 'devops',
      content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : GitHub Actions, le CI/CD natif de GitHub</h2>

<strong class="font-bold text-primary">GitHub Actions</strong> est devenu l'outil CI/CD incontournable pour les projets hébergés sur GitHub. Lancé en 2019, il offre une intégration native avec vos repositories, éliminant le besoin de configurer des services tiers comme Jenkins ou Travis CI.

L'avantage majeur ? <strong class="font-bold text-primary">Tout se passe au même endroit</strong> : code, issues, pull requests et pipelines de déploiement.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Concepts fondamentaux</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Workflows, Jobs et Steps</h3>

Un <strong class="font-bold text-primary">workflow</strong> est un processus automatisé défini en YAML et stocké dans <strong class="font-bold text-primary">.github/workflows/</strong>.

Structure hiérarchique :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Workflow</strong> : processus complet (CI, CD, release...)</li>
  <li class="ml-4"><strong class="font-bold text-primary">Job</strong> : unité d'exécution (tests, build, deploy...)</li>
  <li class="ml-4"><strong class="font-bold text-primary">Step</strong> : action individuelle (run command, use action...)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Déclencheurs (Triggers)</h3>

GitHub Actions peut réagir à de nombreux événements :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">push</strong> : sur un commit</li>
  <li class="ml-4"><strong class="font-bold text-primary">pull_request</strong> : ouverture/modification de PR</li>
  <li class="ml-4"><strong class="font-bold text-primary">schedule</strong> : cron jobs (backups, cleanups...)</li>
  <li class="ml-4"><strong class="font-bold text-primary">workflow_dispatch</strong> : déclenchement manuel</li>
  <li class="ml-4"><strong class="font-bold text-primary">release</strong> : création de release</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Pipeline CI complète</h2>

Créez <strong class="font-bold text-primary">.github/workflows/ci.yml</strong> :

\`\`\`yaml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    name: Code Quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run format:check

  test:
    name: Tests
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'
      
      - run: npm ci
      - run: npm test -- --coverage
      
      - name: Upload coverage
        if: matrix.node-version == '20'
        uses: codecov/codecov-action@v4
        with:
          token: \${{ secrets.CODECOV_TOKEN }}

  build:
    name: Build
    needs: [lint, test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Points clés</h3>

<strong class="font-bold text-primary">1. Parallélisation</strong>
"lint" et "test" tournent en même temps. "build" attend leur succès avec <strong class="font-bold text-primary">needs</strong>.

<strong class="font-bold text-primary">2. Matrix builds</strong>
Teste sur Node 18 et 20 simultanément.

<strong class="font-bold text-primary">3. Caching</strong>
<strong class="font-bold text-primary">cache: 'npm'</strong> divise le temps d'install par 3.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Pipeline CD : Déploiement</h2>

<strong class="font-bold text-primary">.github/workflows/deploy.yml</strong> :

\`\`\`yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-staging:
    name: Deploy Staging
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://staging.app.com
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
        env:
          VITE_API_URL: \${{ secrets.STAGING_API }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}

  deploy-production:
    name: Deploy Production
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://app.com
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
        env:
          VITE_API_URL: \${{ secrets.PROD_API }}
      
      - name: Deploy to Vercel Prod
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Gestion des Secrets</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Créer des secrets</h3>

Dans GitHub : <strong class="font-bold text-primary">Settings → Secrets and variables → Actions</strong>

Types de secrets :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Repository secrets</strong> : accessibles partout</li>
  <li class="ml-4"><strong class="font-bold text-primary">Environment secrets</strong> : staging vs production</li>
  <li class="ml-4"><strong class="font-bold text-primary">Organization secrets</strong> : partagés entre repos</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Utilisation dans le workflow</h3>

\`\`\`yaml
env:
  API_KEY: \${{ secrets.API_KEY }}
  DB_URL: \${{ secrets.DATABASE_URL }}
  PUBLIC_VAR: \${{ vars.PUBLIC_CONFIG }}
\`\`\`

<strong class="font-bold text-primary">⚠️ Sécurité :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Ne jamais echo un secret</li>
  <li class="ml-4">Masquer automatiquement dans les logs</li>
  <li class="ml-4">Révoquer si compromis</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Optimisations avancées</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Caching multi-niveaux</h3>

\`\`\`yaml
- name: Cache dependencies
  uses: actions/cache@v4
  with:
    path: |
      ~/.npm
      node_modules
      .next/cache
    key: \${{ runner.os }}-\${{ hashFiles('**/package-lock.json') }}
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Conditional execution</h3>

\`\`\`yaml
- name: Deploy only on main
  if: github.ref == 'refs/heads/main' && success()
  run: npm run deploy
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Reusable workflows</h3>

Créez des workflows réutilisables pour éviter la duplication :

\`\`\`yaml
# .github/workflows/deploy-reusable.yml
on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Actions du Marketplace</h2>

Actions essentielles :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">actions/checkout@v4</strong> : clone le repo</li>
  <li class="ml-4"><strong class="font-bold text-primary">actions/setup-node@v4</strong> : installe Node.js</li>
  <li class="ml-4"><strong class="font-bold text-primary">actions/cache@v4</strong> : cache les dépendances</li>
  <li class="ml-4"><strong class="font-bold text-primary">codecov/codecov-action</strong> : upload coverage</li>
  <li class="ml-4"><strong class="font-bold text-primary">slackapi/slack-github-action</strong> : notifs Slack</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">7️⃣ Debugging</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Activer les logs détaillés</h3>

Ajoutez dans Settings → Secrets :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">ACTIONS_RUNNER_DEBUG</strong> = true</li>
  <li class="ml-4"><strong class="font-bold text-primary">ACTIONS_STEP_DEBUG</strong> = true</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Afficher le contexte</h3>

\`\`\`yaml
- name: Debug
  run: echo '\${{ toJSON(github) }}'
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">8️⃣ Best Practices</h2>

<strong class="font-bold text-primary">1. Versionner les actions</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ <strong class="font-bold text-primary">actions/checkout@v4</strong></li>
  <li class="ml-4">❌ actions/checkout@main</li>
</ul>

<strong class="font-bold text-primary">2. Timeouts</strong>
\`\`\`yaml
jobs:
  test:
    timeout-minutes: 10
\`\`\`

<strong class="font-bold text-primary">3. Fail fast</strong>
\`\`\`yaml
strategy:
  fail-fast: true
\`\`\`

<strong class="font-bold text-primary">4. Environnements protégés</strong>
Activez "Required reviewers" pour la production.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

GitHub Actions transforme le CI/CD en un <strong class="font-bold text-primary">processus transparent et automatisé</strong>.

Avantages clés :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ Gratuit pour projets publics</li>
  <li class="ml-4">✅ Intégration GitHub native</li>
  <li class="ml-4">✅ 10 000+ actions disponibles</li>
  <li class="ml-4">✅ Configuration simple en YAML</li>
</ul>

<strong class="font-bold text-primary">Action immédiate :</strong> Créez votre premier workflow CI aujourd'hui et observez la magie opérer ! 🚀

<strong class="font-bold text-primary">Ressources :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">docs.github.com/actions</li>
  <li class="ml-4">github.com/marketplace?type=actions</li>
  <li class="ml-4">github.com/sdras/awesome-actions</li>
</ul>
      `
    },
    { 
      id: '13', 
      title: 'Comment versionner efficacement avec Git et GitHub', 
      category: 'devops',
      content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Git, l'outil indispensable du développeur</h2>

Git est bien plus qu'un simple outil de versionnement — c'est le <strong class="font-bold text-primary">système nerveux de tout projet moderne</strong>. Maîtriser Git, c'est la différence entre un développeur junior et un développeur professionnel.

Un bon versionnement permet :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">De <strong class="font-bold text-primary">collaborer efficacement</strong> sans écraser le travail des autres</li>
  <li class="ml-4">De garder un <strong class="font-bold text-primary">historique propre et navigable</strong></li>
  <li class="ml-4">De <strong class="font-bold text-primary">revenir en arrière</strong> à tout moment sans panique</li>
  <li class="ml-4">De <strong class="font-bold text-primary">déployer en confiance</strong> avec des releases traçables</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Commits atomiques et messages explicites</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Qu'est-ce qu'un commit atomique ?</h3>

Un commit atomique = <strong class="font-bold text-primary">une seule modification logique</strong>.

Exemples :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ "fix: correct email validation regex"</li>
  <li class="ml-4">✅ "feat: add user authentication"</li>
  <li class="ml-4">❌ "update stuff" (trop vague)</li>
  <li class="ml-4">❌ "fix login + add tests + update README" (3 choses différentes)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Convention Conventional Commits</h3>

Format standard : <strong class="font-bold text-primary">type(scope): description</strong>

Types principaux :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">feat</strong> : nouvelle fonctionnalité</li>
  <li class="ml-4"><strong class="font-bold text-primary">fix</strong> : correction de bug</li>
  <li class="ml-4"><strong class="font-bold text-primary">docs</strong> : documentation uniquement</li>
  <li class="ml-4"><strong class="font-bold text-primary">style</strong> : formatage, point-virgules manquants (pas de changement de code)</li>
  <li class="ml-4"><strong class="font-bold text-primary">refactor</strong> : refactoring (ni bug ni feature)</li>
  <li class="ml-4"><strong class="font-bold text-primary">test</strong> : ajout/modification de tests</li>
  <li class="ml-4"><strong class="font-bold text-primary">chore</strong> : maintenance (dépendances, config...)</li>
</ul>

Exemples concrets :
\`\`\`bash
feat(auth): add JWT token refresh mechanism
fix(api): handle 404 errors in user endpoint
docs(readme): update installation instructions
refactor(utils): extract validation logic to separate module
test(auth): add integration tests for login flow
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Stratégie de branches</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Git Flow vs GitHub Flow</h3>

<strong class="font-bold text-primary">GitHub Flow (recommandé pour la plupart des projets)</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Une branche <strong class="font-bold text-primary">main</strong> toujours déployable</li>
  <li class="ml-4">Branches de feature courtes : <strong class="font-bold text-primary">feature/nom-feature</strong></li>
  <li class="ml-4">Pull Request → Review → Merge → Delete branch</li>
</ul>

<strong class="font-bold text-primary">Git Flow (pour projets complexes)</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">main</strong> : production</li>
  <li class="ml-4"><strong class="font-bold text-primary">develop</strong> : intégration</li>
  <li class="ml-4"><strong class="font-bold text-primary">feature/*</strong> : nouvelles features</li>
  <li class="ml-4"><strong class="font-bold text-primary">release/*</strong> : préparation de release</li>
  <li class="ml-4"><strong class="font-bold text-primary">hotfix/*</strong> : correctifs urgents en prod</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Nommage des branches</h3>

Conventions claires :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">feature/user-authentication</strong></li>
  <li class="ml-4"><strong class="font-bold text-primary">bugfix/fix-email-validation</strong></li>
  <li class="ml-4"><strong class="font-bold text-primary">hotfix/critical-security-patch</strong></li>
  <li class="ml-4"><strong class="font-bold text-primary">chore/update-dependencies</strong></li>
</ul>

❌ Éviter : <strong class="font-bold text-primary">test</strong>, <strong class="font-bold text-primary">dev</strong>, <strong class="font-bold text-primary">john-branch</strong>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Workflow Git quotidien</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Démarrer une nouvelle feature</h3>

\`\`\`bash
# Mettre à jour main
git checkout main
git pull origin main

# Créer une branche de feature
git checkout -b feature/payment-integration

# Travailler...
git add src/payment/
git commit -m "feat(payment): add Stripe integration"

# Pousser la branche
git push -u origin feature/payment-integration
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Synchroniser avec main pendant le développement</h3>

\`\`\`bash
# Récupérer les dernières modifications de main
git checkout main
git pull origin main

# Rebaser votre branche sur main
git checkout feature/payment-integration
git rebase main

# Si conflits : résoudre, puis
git add .
git rebase --continue

# Forcer le push (après rebase)
git push --force-with-lease
\`\`\`

<strong class="font-bold text-primary">⚠️ Astuce :</strong> Utilisez <strong class="font-bold text-primary">--force-with-lease</strong> au lieu de <strong class="font-bold text-primary">--force</strong> pour éviter d'écraser le travail de quelqu'un d'autre.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Pull Requests professionnelles</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Template de PR</h3>

<strong class="font-bold text-primary">Exemple de description complète :</strong>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Description</strong> : Ajout de l'intégration Stripe pour les paiements</li>
  <li class="ml-4"><strong class="font-bold text-primary">Type</strong> : Nouvelle feature</li>
  <li class="ml-4"><strong class="font-bold text-primary">Checklist</strong> : Tests ajoutés, Documentation mise à jour, Build CI passe</li>
  <li class="ml-4"><strong class="font-bold text-primary">Tests</strong> : Paiement de 10€ effectué avec succès</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Best practices pour les reviews</h3>

<strong class="font-bold text-primary">Pour l'auteur :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">PR courtes (<400 lignes modifiées)</li>
  <li class="ml-4">Description claire du "pourquoi"</li>
  <li class="ml-4">Tests automatiques qui passent</li>
  <li class="ml-4">Screenshots si UI modifiée</li>
</ul>

<strong class="font-bold text-primary">Pour le reviewer :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Feedback constructif et bienveillant</li>
  <li class="ml-4">Questions pour comprendre le contexte</li>
  <li class="ml-4">Suggestions avec exemples de code</li>
  <li class="ml-4">Approuver si c'est "assez bon", pas parfait</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Versioning sémantique (SemVer)</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Format : MAJOR.MINOR.PATCH</h3>

Exemple : <strong class="font-bold text-primary">2.4.1</strong>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">MAJOR (2)</strong> : changement incompatible (breaking change)</li>
  <li class="ml-4"><strong class="font-bold text-primary">MINOR (4)</strong> : nouvelle feature rétrocompatible</li>
  <li class="ml-4"><strong class="font-bold text-primary">PATCH (1)</strong> : correction de bug rétrocompatible</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Créer une release sur GitHub</h3>

\`\`\`bash
# Tagger une version
git tag -a v2.4.1 -m "Release 2.4.1: Fix payment bug"
git push origin v2.4.1
\`\`\`

Sur GitHub : <strong class="font-bold text-primary">Releases → Draft new release</strong>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ .gitignore et fichiers sensibles</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Fichiers à toujours ignorer</h3>

\`\`\`gitignore
# Dépendances
node_modules/
vendor/

# Fichiers de build
dist/
build/
.next/

# Variables d'environnement
.env
.env.local
.env.production

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*
\`\`\`

<strong class="font-bold text-primary">⚠️ Crucial :</strong> Ne JAMAIS commit de clés API, mots de passe ou tokens.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">7️⃣ Commandes Git avancées utiles</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Squash de commits</h3>

\`\`\`bash
# Squash les 3 derniers commits
git rebase -i HEAD~3

# Dans l'éditeur, remplacer 'pick' par 'squash' ou 's'
# Sauvegarder et écrire un nouveau message de commit
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Cherry-pick un commit spécifique</h3>

\`\`\`bash
git cherry-pick abc1234
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Stash temporaire</h3>

\`\`\`bash
# Mettre de côté les modifications
git stash save "WIP: feature en cours"

# Lister les stash
git stash list

# Récupérer le stash
git stash pop
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Voir l'historique d'un fichier</h3>

\`\`\`bash
git log --follow -p -- src/auth/login.ts
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">8️⃣ Protection des branches sur GitHub</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Règles de protection recommandées</h3>

Dans <strong class="font-bold text-primary">Settings → Branches → Branch protection rules</strong> :

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ <strong class="font-bold text-primary">Require pull request before merging</strong></li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Require approvals (1-2)</strong></li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Require status checks to pass</strong> (CI/CD)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Require conversation resolution</strong></li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Include administrators</strong></li>
  <li class="ml-4">❌ <strong class="font-bold text-primary">Allow force pushes</strong> (désactiver)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

Un versionnement Git propre n'est pas un luxe — c'est la <strong class="font-bold text-primary">marque d'un développeur professionnel</strong>.

Règles d'or :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Commits atomiques avec messages clairs</li>
  <li class="ml-4">Branches courtes et focalisées</li>
  <li class="ml-4">Pull requests bien documentées</li>
  <li class="ml-4">main toujours stable et déployable</li>
  <li class="ml-4">Jamais de secrets dans le code</li>
</ul>

<strong class="font-bold text-primary">Ressources :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">conventionalcommits.org</li>
  <li class="ml-4">gitflow.github.io</li>
  <li class="ml-4">semver.org</li>
  <li class="ml-4">github.com/github/gitignore (templates)</li>
</ul>

> "Un historique Git propre raconte l'histoire de ton projet. Rends-la lisible." 📖
      `
    },
    { 
      id: '14', 
      title: 'Les erreurs fréquentes sur Git et comment les éviter', 
      category: 'devops',
      content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Même les meilleurs se trompent</h2>

Git est puissant, mais avec cette puissance viennent des <strong class="font-bold text-primary">pièges classiques</strong> que tous les développeurs rencontrent un jour. La bonne nouvelle ? <strong class="font-bold text-primary">Chaque erreur Git a une solution</strong>.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Commit sur la mauvaise branche</h2>

<h3 class="text-xl font-bold mt-6 mb-3">❌ Le problème</h3>

Tu codes une feature sur <strong class="font-bold text-primary">main</strong> au lieu de créer une branche dédiée.

<h3 class="text-xl font-bold mt-6 mb-3">✅ La solution (si pas encore pusher)</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Stash tes modifications : <strong class="font-bold text-primary">git stash</strong></li>
  <li class="ml-4">Créer la bonne branche : <strong class="font-bold text-primary">git checkout -b feature/my-feature</strong></li>
  <li class="ml-4">Appliquer tes modifs : <strong class="font-bold text-primary">git stash pop</strong></li>
  <li class="ml-4">Nettoyer main : <strong class="font-bold text-primary">git checkout main && git reset --hard origin/main</strong></li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">✅ Alternative (si déjà commité)</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">git branch feature/my-feature</strong> (créer une branche à partir du commit actuel)</li>
  <li class="ml-4"><strong class="font-bold text-primary">git reset --hard HEAD~1</strong> (revenir en arrière sur main)</li>
  <li class="ml-4"><strong class="font-bold text-primary">git checkout feature/my-feature</strong></li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Merge conflictuel raté</h2>

<h3 class="text-xl font-bold mt-6 mb-3">❌ Le problème</h3>

Tu lances un <strong class="font-bold text-primary">git merge</strong> et tout part en vrille avec des conflits partout.

<h3 class="text-xl font-bold mt-6 mb-3">✅ Annuler le merge en cours</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">git merge --abort</strong> (retour à l'état avant le merge)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">✅ Mieux : Utiliser rebase au lieu de merge</h3>

Le rebase rejoue tes commits au-dessus de la branche cible, évitant souvent des conflits :

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">git checkout feature/my-feature</strong></li>
  <li class="ml-4"><strong class="font-bold text-primary">git pull origin main --rebase</strong></li>
  <li class="ml-4">Résoudre les conflits un par un</li>
  <li class="ml-4"><strong class="font-bold text-primary">git rebase --continue</strong></li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">🎯 Prévention</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Toujours <strong class="font-bold text-primary">pull avant de merge</strong></li>
  <li class="ml-4">Synchronise régulièrement ta branche avec main</li>
  <li class="ml-4">Utilise des petites PR pour réduire les conflits</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Perte de commits</h2>

<h3 class="text-xl font-bold mt-6 mb-3">❌ Le problème</h3>

Tu as fait un <strong class="font-bold text-primary">git reset --hard</strong> ou supprimé une branche, et tes commits ont disparu.

<h3 class="text-xl font-bold mt-6 mb-3">✅ Récupération avec reflog</h3>

Git conserve un <strong class="font-bold text-primary">historique de toutes tes actions</strong> (pendant 30 jours par défaut) :

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">git reflog</strong> (voir l'historique des HEAD)</li>
  <li class="ml-4">Trouver le SHA du commit perdu (ex: abc1234)</li>
  <li class="ml-4"><strong class="font-bold text-primary">git cherry-pick abc1234</strong> (récupérer ce commit)</li>
  <li class="ml-4">Ou : <strong class="font-bold text-primary">git checkout abc1234</strong> puis <strong class="font-bold text-primary">git checkout -b recovery-branch</strong></li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">💡 Astuce</h3>

<strong class="font-bold text-primary">Git n'oublie presque jamais</strong>. Même après un reset --hard, reflog te sauve.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Commit de fichiers sensibles (.env, secrets)</h2>

<h3 class="text-xl font-bold mt-6 mb-3">❌ Le problème</h3>

Tu as commit un fichier <strong class="font-bold text-primary">.env</strong> avec des clés API ou mots de passe.

<h3 class="text-xl font-bold mt-6 mb-3">✅ Retirer le fichier de l'historique</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">git rm --cached .env</strong> (retirer du suivi Git)</li>
  <li class="ml-4">Ajouter .env dans .gitignore</li>
  <li class="ml-4"><strong class="font-bold text-primary">git commit -m "chore: remove .env from tracking"</strong></li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">⚠️ Si déjà pushé sur GitHub</h3>

<strong class="font-bold text-primary">ALERTE CRITIQUE</strong> : tes secrets sont publics.

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Révoquer immédiatement</strong> toutes les clés exposées</li>
  <li class="ml-4">Nettoyer l'historique avec git filter-branch ou BFG Repo-Cleaner</li>
  <li class="ml-4">Forcer le push : <strong class="font-bold text-primary">git push --force</strong></li>
  <li class="ml-4">Prévenir ton équipe de re-clone le repo</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Historique illisible avec trop de commits</h2>

<h3 class="text-xl font-bold mt-6 mb-3">❌ Le problème</h3>

Tu as 50 commits "fix typo", "wip", "test"...

<h3 class="text-xl font-bold mt-6 mb-3">✅ Squash avant merge</h3>

Combiner plusieurs commits en un seul :

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">git rebase -i HEAD~5</strong> (interactif sur les 5 derniers commits)</li>
  <li class="ml-4">Remplacer <strong class="font-bold text-primary">pick</strong> par <strong class="font-bold text-primary">squash</strong> (ou s) pour les commits à fusionner</li>
  <li class="ml-4">Sauvegarder et écrire un nouveau message de commit propre</li>
  <li class="ml-4"><strong class="font-bold text-primary">git push --force-with-lease</strong></li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">📊 Visualiser l'historique</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">git log --oneline --graph --decorate --all</strong></li>
  <li class="ml-4">Ou utilise <strong class="font-bold text-primary">GitKraken</strong>, <strong class="font-bold text-primary">SourceTree</strong> ou l'extension <strong class="font-bold text-primary">Git Graph</strong> dans VSCode</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Force push destructif</h2>

<h3 class="text-xl font-bold mt-6 mb-3">❌ Le problème</h3>

Tu fais <strong class="font-bold text-primary">git push --force</strong> et tu écrases le travail de quelqu'un d'autre.

<h3 class="text-xl font-bold mt-6 mb-3">✅ Utilise --force-with-lease</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">git push --force-with-lease</strong></li>
</ul>

Ça vérifie que personne n'a pushé entre temps. Si c'est le cas, <strong class="font-bold text-primary">le push est rejeté</strong>.

<h3 class="text-xl font-bold mt-6 mb-3">🎯 Règle d'or</h3>

<strong class="font-bold text-primary">Ne JAMAIS force push sur main ou develop</strong> (utilise la protection de branche sur GitHub).

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">7️⃣ Oublier de pull avant de push</h2>

<h3 class="text-xl font-bold mt-6 mb-3">❌ Le problème</h3>

Tu push et Git refuse : "Updates were rejected because the remote contains work..."

<h3 class="text-xl font-bold mt-6 mb-3">✅ Solution</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">git pull --rebase origin main</strong></li>
  <li class="ml-4">Résoudre les conflits éventuels</li>
  <li class="ml-4"><strong class="font-bold text-primary">git push</strong></li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">🎯 Automatisation</h3>

Configure un alias :

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">git config --global alias.sync 'pull --rebase'</strong></li>
  <li class="ml-4">Puis : <strong class="font-bold text-primary">git sync</strong></li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🛡️ Bonnes habitudes pour éviter les erreurs</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ <strong class="font-bold text-primary">Toujours pull avant de commencer</strong> une feature</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Créer une branche</strong> pour chaque modification</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Commits courts et fréquents</strong> (atomiques)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Utiliser .gitignore</strong> dès le début du projet</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Ne jamais commit de secrets</strong> (.env, tokens, mots de passe)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Utiliser --force-with-lease</strong> au lieu de --force</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Activer la protection de branche</strong> sur main</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🚨 Commandes de secours</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Annuler les modifications locales</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">git restore .</strong> (annuler tous les fichiers modifiés)</li>
  <li class="ml-4"><strong class="font-bold text-primary">git restore src/file.ts</strong> (annuler un fichier spécifique)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Annuler le dernier commit (mais garder les modifs)</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">git reset --soft HEAD~1</strong></li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Annuler le dernier commit (et SUPPRIMER les modifs)</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">git reset --hard HEAD~1</strong></li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Voir qui a modifié une ligne</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">git blame src/file.ts</strong></li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

Git peut sembler intimidant, mais <strong class="font-bold text-primary">chaque erreur est réversible</strong>.

Les clés :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Comprendre reflog (ton filet de sécurité)</li>
  <li class="ml-4">Ne jamais paniquer : Git n'oublie presque jamais</li>
  <li class="ml-4">Utiliser des branches et des commits atomiques</li>
  <li class="ml-4">Protéger main avec des branch protection rules</li>
</ul>

<strong class="font-bold text-primary">Ressources :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">ohshitgit.com (guide de dépannage humoristique)</li>
  <li class="ml-4">dangitgit.com (version sans gros mots)</li>
  <li class="ml-4">git-scm.com/book (documentation officielle)</li>
</ul>

> "Git is hard: screwing up is easy, and figuring out how to fix your mistakes is tough. But don't worry — you got this!" 🚀
      `
    },
    { 
      id: '15', 
      title: 'Docker pour les débutants : comprendre images, containers et volumes', 
      category: 'devops',
      content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Docker, la révolution de la portabilité</h2>

<strong class="font-bold text-primary">Docker</strong> permet de faire tourner ton code "partout de la même façon". C'est l'un des <strong class="font-bold text-primary">piliers du DevOps moderne</strong> et la solution au fameux "Ça marche sur ma machine !".

Docker résout un problème universel : <strong class="font-bold text-primary">garantir que ton app tourne de manière identique</strong> sur ton PC, le serveur de staging et la production.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🐳 Qu'est-ce que Docker ?</h2>

Docker est une <strong class="font-bold text-primary">plateforme de conteneurisation</strong> qui emballe ton application avec toutes ses dépendances dans une unité légère et portable appelée <strong class="font-bold text-primary">container</strong>.

<h3 class="text-xl font-bold mt-6 mb-3">Différence avec une VM</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Virtual Machine</strong> : Émule un OS complet (lourd, lent)</li>
  <li class="ml-4"><strong class="font-bold text-primary">Docker Container</strong> : Partage le kernel de l'hôte (léger, rapide)</li>
</ul>

Un container Docker démarre en <strong class="font-bold text-primary">quelques millisecondes</strong> vs plusieurs minutes pour une VM.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Les 3 concepts fondamentaux</h2>

<h3 class="text-xl font-bold mt-6 mb-3">📦 Image Docker</h3>

Une <strong class="font-bold text-primary">image</strong> est un <strong class="font-bold text-primary">template immuable</strong> qui contient :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Un système d'exploitation minimal (Alpine, Ubuntu...)</li>
  <li class="ml-4">Ton runtime (Node.js, Python, Java...)</li>
  <li class="ml-4">Tes dépendances</li>
  <li class="ml-4">Ton code applicatif</li>
</ul>

Pense à une image comme une <strong class="font-bold text-primary">recette de cuisine</strong> : elle décrit comment construire l'environnement.

<h3 class="text-xl font-bold mt-6 mb-3">🏃 Container Docker</h3>

Un <strong class="font-bold text-primary">container</strong> est une <strong class="font-bold text-primary">instance en exécution</strong> d'une image.

Analogie : si l'image est la recette, le container est <strong class="font-bold text-primary">le plat cuisiné</strong>.

Tu peux lancer <strong class="font-bold text-primary">plusieurs containers</strong> à partir de la même image (comme faire plusieurs gâteaux avec la même recette).

<h3 class="text-xl font-bold mt-6 mb-3">💾 Volume Docker</h3>

Un <strong class="font-bold text-primary">volume</strong> est un <strong class="font-bold text-primary">stockage persistant</strong> qui survit à la suppression du container.

Pourquoi c'est crucial ? Parce que les containers sont <strong class="font-bold text-primary">éphémères</strong> : quand tu supprimes un container, toutes ses données internes disparaissent.

Les volumes permettent de :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Persister les données de base de données</li>
  <li class="ml-4">Partager des fichiers entre containers</li>
  <li class="ml-4">Séparer les données du code</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Créer ta première image Docker</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Le Dockerfile</h3>

Le <strong class="font-bold text-primary">Dockerfile</strong> est le fichier de configuration qui définit comment construire ton image.

Exemple pour une app Node.js :

<strong class="font-bold text-primary">Instructions expliquées :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">FROM node:20-alpine</strong> : Image de base (Node 20 sur Alpine Linux, super léger 40 MB)</li>
  <li class="ml-4"><strong class="font-bold text-primary">WORKDIR /app</strong> : Répertoire de travail dans le container</li>
  <li class="ml-4"><strong class="font-bold text-primary">COPY package*.json ./</strong> : Copier les fichiers de dépendances en premier (optimisation cache)</li>
  <li class="ml-4"><strong class="font-bold text-primary">RUN npm ci</strong> : Installer les dépendances (npm ci = plus rapide et déterministe que npm install)</li>
  <li class="ml-4"><strong class="font-bold text-primary">COPY . .</strong> : Copier tout le code source</li>
  <li class="ml-4"><strong class="font-bold text-primary">EXPOSE 3000</strong> : Documenter le port (informatif uniquement)</li>
  <li class="ml-4"><strong class="font-bold text-primary">CMD</strong> : Commande exécutée au démarrage du container</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Build de l'image</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">docker build -t my-app .</strong></li>
</ul>

L'option <strong class="font-bold text-primary">-t</strong> donne un nom (tag) à ton image.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Lancer un container</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Commande de base</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">docker run -p 3000:3000 my-app</strong></li>
</ul>

<strong class="font-bold text-primary">-p 3000:3000</strong> : Mapper le port 3000 du container au port 3000 de ton PC

<h3 class="text-xl font-bold mt-6 mb-3">Options utiles</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">-d</strong> : Mode détaché (arrière-plan)</li>
  <li class="ml-4"><strong class="font-bold text-primary">--name mon-container</strong> : Donner un nom au container</li>
  <li class="ml-4"><strong class="font-bold text-primary">-e VAR=value</strong> : Passer une variable d'environnement</li>
  <li class="ml-4"><strong class="font-bold text-primary">-v /host/path:/container/path</strong> : Monter un volume</li>
  <li class="ml-4"><strong class="font-bold text-primary">--rm</strong> : Supprimer le container automatiquement après arrêt</li>
</ul>

Exemple complet :

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">docker run -d --name api -p 5000:5000 -e NODE_ENV=production my-app</strong></li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Gérer les volumes</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Créer un volume nommé</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">docker volume create my-data</strong></li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Utiliser le volume dans un container</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">docker run -v my-data:/app/data my-app</strong></li>
</ul>

Les données écrites dans <strong class="font-bold text-primary">/app/data</strong> dans le container seront persistées dans le volume.

<h3 class="text-xl font-bold mt-6 mb-3">Bind mount (mapper un dossier local)</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">docker run -v $(pwd):/app my-app</strong></li>
</ul>

Utile pour le <strong class="font-bold text-primary">hot reload</strong> en développement.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Commandes Docker essentielles</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Gestion des containers</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">docker ps</strong> : Lister les containers en cours</li>
  <li class="ml-4"><strong class="font-bold text-primary">docker ps -a</strong> : Tous les containers (même arrêtés)</li>
  <li class="ml-4"><strong class="font-bold text-primary">docker stop <id></strong> : Arrêter un container</li>
  <li class="ml-4"><strong class="font-bold text-primary">docker start <id></strong> : Redémarrer un container arrêté</li>
  <li class="ml-4"><strong class="font-bold text-primary">docker rm <id></strong> : Supprimer un container</li>
  <li class="ml-4"><strong class="font-bold text-primary">docker logs <id></strong> : Voir les logs</li>
  <li class="ml-4"><strong class="font-bold text-primary">docker exec -it <id> sh</strong> : Ouvrir un shell dans le container</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Gestion des images</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">docker images</strong> : Lister les images</li>
  <li class="ml-4"><strong class="font-bold text-primary">docker rmi <image></strong> : Supprimer une image</li>
  <li class="ml-4"><strong class="font-bold text-primary">docker pull <image></strong> : Télécharger une image du Docker Hub</li>
  <li class="ml-4"><strong class="font-bold text-primary">docker push <image></strong> : Pousser une image sur un registry</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Nettoyage</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">docker system prune</strong> : Nettoyer tout ce qui est inutilisé</li>
  <li class="ml-4"><strong class="font-bold text-primary">docker system prune -a --volumes</strong> : Nettoyage agressif (tout supprimer)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Best practices</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ <strong class="font-bold text-primary">Utilise des images Alpine</strong> (plus légères)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Multi-stage builds</strong> pour réduire la taille finale</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">.dockerignore</strong> pour exclure node_modules, .git, etc.</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Ne pas run en root</strong> (sécurité)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Copier package.json avant le code</strong> (optimisation cache)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Un processus par container</strong> (principe Unix)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">7️⃣ Cas d'usage concrets</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Dev local identique à la prod</h3>

Plus de "ça marche sur ma machine" : tout le monde utilise le même container.

<h3 class="text-xl font-bold mt-6 mb-3">CI/CD automatisé</h3>

Build une image, teste-la, deploy-la. Même artefact du dev à la prod.

<h3 class="text-xl font-bold mt-6 mb-3">Isolation de projets</h3>

Projet A avec Node 18, Projet B avec Node 20 ? Aucun conflit.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

Docker, c'est la <strong class="font-bold text-primary">clé de la portabilité moderne</strong>.

Les 3 concepts à retenir :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Image</strong> : Template immuable</li>
  <li class="ml-4"><strong class="font-bold text-primary">Container</strong> : Instance en exécution</li>
  <li class="ml-4"><strong class="font-bold text-primary">Volume</strong> : Persistance des données</li>
</ul>

Tu codes sur ton PC, tu déploies sur n'importe quel serveur. <strong class="font-bold text-primary">Build once, run anywhere</strong>.

<strong class="font-bold text-primary">Ressources :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">docs.docker.com</li>
  <li class="ml-4">hub.docker.com (images officielles)</li>
  <li class="ml-4">dockerlabs.collabnix.com</li>
</ul>

> "Docker solved the 'works on my machine' problem forever." 🐳
      `
    },
    { 
      id: '16', 
      title: 'Créer ton environnement de dev avec Docker Compose', 
      category: 'devops',
      content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : L'orchestration multi-services simplifiée</h2>

<strong class="font-bold text-primary">Docker Compose</strong> te permet de gérer plusieurs services (base de données, API, front, Redis, etc.) en <strong class="font-bold text-primary">une seule commande</strong>.

Fini de lancer 10 terminaux pour démarrer ton stack. Avec Compose, <strong class="font-bold text-primary">docker compose up</strong> et tout démarre.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Qu'est-ce que Docker Compose ?</h2>

Docker Compose est un <strong class="font-bold text-primary">outil d'orchestration local</strong> qui permet de définir et gérer des applications multi-containers via un fichier YAML.

Un seul fichier <strong class="font-bold text-primary">docker-compose.yml</strong> pour toute ton infrastructure locale.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Exemple concret : Stack MERN</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Structure du projet</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">frontend/</strong> : React app</li>
  <li class="ml-4"><strong class="font-bold text-primary">backend/</strong> : Node.js API</li>
  <li class="ml-4"><strong class="font-bold text-primary">mongo</strong> : Base de données MongoDB</li>
  <li class="ml-4"><strong class="font-bold text-primary">redis</strong> : Cache</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Fichier docker-compose.yml complet</h3>

<strong class="font-bold text-primary">Explications détaillées :</strong>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">services</strong> : Chaque container défini (frontend, backend, mongo, redis)</li>
  <li class="ml-4"><strong class="font-bold text-primary">build</strong> : Construire l'image depuis un Dockerfile local</li>
  <li class="ml-4"><strong class="font-bold text-primary">ports</strong> : Mapper ports container → host</li>
  <li class="ml-4"><strong class="font-bold text-primary">environment</strong> : Variables d'environnement</li>
  <li class="ml-4"><strong class="font-bold text-primary">depends_on</strong> : Ordre de démarrage (backend attend mongo)</li>
  <li class="ml-4"><strong class="font-bold text-primary">volumes</strong> : Persistance données + hot reload code</li>
  <li class="ml-4"><strong class="font-bold text-primary">networks</strong> : Communication interne entre services</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Commandes Docker Compose essentielles</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Lancer tous les services</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">docker compose up</strong> : Lancer au premier plan (logs visibles)</li>
  <li class="ml-4"><strong class="font-bold text-primary">docker compose up -d</strong> : Mode détaché (arrière-plan)</li>
  <li class="ml-4"><strong class="font-bold text-primary">docker compose up --build</strong> : Rebuild les images avant de lancer</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Arrêter et nettoyer</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">docker compose down</strong> : Arrêter et supprimer les containers</li>
  <li class="ml-4"><strong class="font-bold text-primary">docker compose down -v</strong> : Supprimer aussi les volumes (ATTENTION : données perdues)</li>
  <li class="ml-4"><strong class="font-bold text-primary">docker compose stop</strong> : Arrêter sans supprimer</li>
  <li class="ml-4"><strong class="font-bold text-primary">docker compose start</strong> : Redémarrer les containers arrêtés</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Gestion des services individuels</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">docker compose logs backend</strong> : Voir les logs d'un service</li>
  <li class="ml-4"><strong class="font-bold text-primary">docker compose logs -f</strong> : Suivre les logs en temps réel</li>
  <li class="ml-4"><strong class="font-bold text-primary">docker compose exec backend sh</strong> : Ouvrir un shell dans un service</li>
  <li class="ml-4"><strong class="font-bold text-primary">docker compose restart backend</strong> : Redémarrer un service spécifique</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Rebuild et clean</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">docker compose build</strong> : Rebuild les images sans lancer</li>
  <li class="ml-4"><strong class="font-bold text-primary">docker compose build --no-cache</strong> : Rebuild from scratch</li>
  <li class="ml-4"><strong class="font-bold text-primary">docker compose ps</strong> : Liste les services en cours</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Variables d'environnement</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Utiliser un fichier .env</h3>

Crée un fichier <strong class="font-bold text-primary">.env</strong> à la racine :

Exemple : <strong class="font-bold text-primary">DB_USER=admin</strong>, <strong class="font-bold text-primary">DB_PASSWORD=secret123</strong>, <strong class="font-bold text-primary">REDIS_PORT=6379</strong>

Dans docker-compose.yml, référence-les avec <strong class="font-bold text-primary">\${DB_USER}</strong>

<h3 class="text-xl font-bold mt-6 mb-3">⚠️ Sécurité</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Ajoute <strong class="font-bold text-primary">.env</strong> dans <strong class="font-bold text-primary">.gitignore</strong></li>
  <li class="ml-4">Crée un <strong class="font-bold text-primary">.env.example</strong> avec des valeurs factices pour l'équipe</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Volumes : Data persistence vs Hot Reload</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Volume nommé (persistance)</h3>

Les données survivent à <strong class="font-bold text-primary">docker compose down</strong>.

<h3 class="text-xl font-bold mt-6 mb-3">Bind mount (hot reload)</h3>

Modifications du code local <strong class="font-bold text-primary">immédiatement reflétées</strong> dans le container.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Networking : Communication inter-services</h2>

Par défaut, Compose crée un <strong class="font-bold text-primary">réseau bridge</strong> où tous les services peuvent communiquer.

Exemple : depuis le backend, tu peux faire <strong class="font-bold text-primary">fetch('http://redis:6379')</strong> — le nom du service devient le hostname.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Best Practices</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ <strong class="font-bold text-primary">Un docker-compose.yml par environnement</strong> (dev, staging, prod)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Utilise .env pour les secrets</strong></li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Ne pas commit .env</strong></li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Healthchecks pour les dépendances</strong> (ex: attendre que Postgres soit ready)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Volumes nommés pour les DBs</strong> (évite les pertes de données)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Restart policies</strong> : restart: unless-stopped</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">7️⃣ Cas d'usage avancés</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Profils (launch only specific services)</h3>

Lancer uniquement le backend et la DB, sans le front :

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">docker compose --profile backend up</strong></li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Override file</h3>

<strong class="font-bold text-primary">docker-compose.override.yml</strong> pour des configurations locales spécifiques.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">8️⃣ Debugging</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Service ne démarre pas ?</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Vérifier les logs : <strong class="font-bold text-primary">docker compose logs backend</strong></li>
  <li class="ml-4">Inspecter le container : <strong class="font-bold text-primary">docker compose ps</strong></li>
  <li class="ml-4">Rebuild : <strong class="font-bold text-primary">docker compose up --build</strong></li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Port déjà utilisé ?</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Changer le port host : <strong class="font-bold text-primary">"3001:3000"</strong></li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

Docker Compose est ton <strong class="font-bold text-primary">orchestrateur local indispensable</strong>.

Avantages clés :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Configuration unique pour toute l'équipe</li>
  <li class="ml-4">Facile à répliquer en staging ou prod</li>
  <li class="ml-4">Pas besoin d'installer localement les dépendances (MongoDB, Redis...)</li>
  <li class="ml-4">Hot reload pour le dev</li>
</ul>

<strong class="font-bold text-primary">Ressources :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">docs.docker.com/compose</li>
  <li class="ml-4">github.com/compose-spec/compose-spec</li>
  <li class="ml-4">awesome-compose (exemples de stacks)</li>
</ul>

> "Docker Compose: because nobody wants to run 10 terminal tabs to start an app." 🚀
      `
    },
    { 
      id: '17', 
      title: 'Bonnes pratiques pour les environnements de staging et production', 
      category: 'devops',
      content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : La règle d'or du déploiement professionnel</h2>

Un projet professionnel doit toujours avoir <strong class="font-bold text-primary">au moins trois environnements</strong> :

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Dev</strong> : pour coder et expérimenter</li>
  <li class="ml-4"><strong class="font-bold text-primary">Staging</strong> : pour tester en conditions réelles</li>
  <li class="ml-4"><strong class="font-bold text-primary">Production</strong> : pour livrer aux utilisateurs</li>
</ul>

<strong class="font-bold text-primary">Ne JAMAIS tester directement en production</strong> — c'est la marque d'un développeur amateur.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Pourquoi séparer les environnements ?</h2>

<h3 class="text-xl font-bold mt-6 mb-3">❌ Risques sans staging</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Bug critique découvert en prod après déploiement</li>
  <li class="ml-4">Migration de DB qui casse tout</li>
  <li class="ml-4">Feature incompatible avec la prod</li>
  <li class="ml-4">Performance catastrophique sous charge réelle</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">✅ Avantages d'un environnement de staging</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Tester en conditions réelles</strong> avant la prod</li>
  <li class="ml-4"><strong class="font-bold text-primary">QA peut valider</strong> sans risque</li>
  <li class="ml-4"><strong class="font-bold text-primary">Démo client</strong> sur un environnement stable</li>
  <li class="ml-4"><strong class="font-bold text-primary">Rollback rapide</strong> si problème détecté</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Architecture des 3 environnements</h2>

<h3 class="text-xl font-bold mt-6 mb-3">🛠️ Dev (Développement)</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">But</strong> : Coder, expérimenter, debugger</li>
  <li class="ml-4"><strong class="font-bold text-primary">Infrastructure</strong> : Locale (Docker Compose) ou cloud (ressources minimales)</li>
  <li class="ml-4"><strong class="font-bold text-primary">Base de données</strong> : Locale ou partagée entre devs</li>
  <li class="ml-4"><strong class="font-bold text-primary">Déploiement</strong> : Manuel ou auto sur push (feature branches)</li>
  <li class="ml-4"><strong class="font-bold text-primary">Logs</strong> : Verbeux (debug mode)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">🔍 Staging (Préproduction)</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">But</strong> : Tester en conditions identiques à la prod</li>
  <li class="ml-4"><strong class="font-bold text-primary">Infrastructure</strong> : Clone de la prod (même OS, même versions)</li>
  <li class="ml-4"><strong class="font-bold text-primary">Base de données</strong> : Copie anonymisée de la prod</li>
  <li class="ml-4"><strong class="font-bold text-primary">Déploiement</strong> : Auto sur merge dans develop ou staging branch</li>
  <li class="ml-4"><strong class="font-bold text-primary">Logs</strong> : Mode production</li>
  <li class="ml-4"><strong class="font-bold text-primary">Monitoring</strong> : Activé (même outils qu'en prod)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">🚀 Production</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">But</strong> : Servir les vrais utilisateurs</li>
  <li class="ml-4"><strong class="font-bold text-primary">Infrastructure</strong> : Optimisée pour la performance et la résilience</li>
  <li class="ml-4"><strong class="font-bold text-primary">Base de données</strong> : Données réelles (RGPD, backups fréquents)</li>
  <li class="ml-4"><strong class="font-bold text-primary">Déploiement</strong> : Manuel avec approbation ou auto sur main avec tests</li>
  <li class="ml-4"><strong class="font-bold text-primary">Monitoring</strong> : 24/7 avec alertes</li>
  <li class="ml-4"><strong class="font-bold text-primary">Accès</strong> : Restreint (admins uniquement)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Variables d'environnement</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Principe : Configuration externalisée</h3>

<strong class="font-bold text-primary">Ne JAMAIS hardcoder</strong> les configs dans le code.

<h3 class="text-xl font-bold mt-6 mb-3">Exemple de .env par environnement</h3>

<strong class="font-bold text-primary">Dev (.env.development)</strong>

<strong class="font-bold text-primary">Staging (.env.staging)</strong>

<strong class="font-bold text-primary">Production (.env.production)</strong>

<h3 class="text-xl font-bold mt-6 mb-3">🎯 Gestion des secrets</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Dev</strong> : .env local (non commité)</li>
  <li class="ml-4"><strong class="font-bold text-primary">Staging/Prod</strong> : Variables d'env dans Vercel, Railway, AWS Secrets Manager, etc.</li>
  <li class="ml-4">Utiliser <strong class="font-bold text-primary">dotenv</strong> (Node) ou équivalents</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Base de données par environnement</h2>

<h3 class="text-xl font-bold mt-6 mb-3">⚠️ Erreur classique</h3>

Partager la même DB entre dev et prod \u2192 <strong class="font-bold text-primary">CATASTROPHE ASSURÉE</strong>.

<h3 class="text-xl font-bold mt-6 mb-3">✅ Bonne pratique</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Dev</strong> : DB locale (Docker Postgres/MongoDB)</li>
  <li class="ml-4"><strong class="font-bold text-primary">Staging</strong> : DB cloud isolée avec copie anonymisée de la prod</li>
  <li class="ml-4"><strong class="font-bold text-primary">Production</strong> : DB protégée avec backups quotidiens</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Scripts de migration</h3>

Utiliser des outils comme <strong class="font-bold text-primary">Prisma</strong>, <strong class="font-bold text-primary">TypeORM</strong>, <strong class="font-bold text-primary">Alembic</strong> pour des migrations versionnées.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Workflow Git</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Stratégie de branches</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">feature/*</strong> \u2192 Dev environment (auto-deploy optionnel)</li>
  <li class="ml-4"><strong class="font-bold text-primary">develop</strong> \u2192 Staging environment (auto-deploy)</li>
  <li class="ml-4"><strong class="font-bold text-primary">main</strong> \u2192 Production environment (deploy manuel ou avec approbation)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">CI/CD Pipeline</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Push sur <strong class="font-bold text-primary">develop</strong> \u2192 Tests \u2192 Deploy staging</li>
  <li class="ml-4">Merge dans <strong class="font-bold text-primary">main</strong> \u2192 Tests \u2192 Approval \u2192 Deploy prod</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Monitoring et observabilité</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Staging : Comme la prod</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">M\u00eames outils de monitoring (Datadog, New Relic, Sentry)</li>
  <li class="ml-4">Logs structur\u00e9s</li>
  <li class="ml-4">Alertes (mais sans pager l'\u00e9quipe \u00e0 3h du mat')</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Production : Surveillance 24/7</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Uptime monitoring</strong> : UptimeRobot, Pingdom</li>
  <li class="ml-4"><strong class="font-bold text-primary">Error tracking</strong> : Sentry, Rollbar</li>
  <li class="ml-4"><strong class="font-bold text-primary">Performance</strong> : Lighthouse CI, Web Vitals</li>
  <li class="ml-4"><strong class="font-bold text-primary">Logs</strong> : CloudWatch, Logtail, Loki</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">7️⃣ Feature Flags</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Pourquoi ?</h3>

Activer/désactiver des features <strong class="font-bold text-primary">sans redéployer</strong>.

<h3 class="text-xl font-bold mt-6 mb-3">Exemple avec LaunchDarkly ou custom</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Feature activée en staging pour tests</li>
  <li class="ml-4">Feature désactivée en prod jusqu'à validation</li>
  <li class="ml-4">Rollout progressif (5% users \u2192 50% \u2192 100%)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">8️⃣ Sécurité et accès</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Contrôle d'accès</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Dev</strong> : Tous les devs</li>
  <li class="ml-4"><strong class="font-bold text-primary">Staging</strong> : Devs + QA + Product</li>
  <li class="ml-4"><strong class="font-bold text-primary">Production</strong> : Admins uniquement (principe du moindre privilège)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Protection des secrets</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Utiliser <strong class="font-bold text-primary">AWS Secrets Manager</strong>, <strong class="font-bold text-primary">HashiCorp Vault</strong></li>
  <li class="ml-4">Rotation automatique des clés API</li>
  <li class="ml-4">Audit logs pour tracer les accès</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">9️⃣ Outils recommandés</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Docker Compose</strong> : Stacks identiques entre env</li>
  <li class="ml-4"><strong class="font-bold text-primary">Terraform</strong> : Infrastructure as Code</li>
  <li class="ml-4"><strong class="font-bold text-primary">GitHub Actions</strong> : CI/CD pipeline</li>
  <li class="ml-4"><strong class="font-bold text-primary">Vercel/Railway</strong> : Preview deployments automatiques</li>
  <li class="ml-4"><strong class="font-bold text-primary">Doppler/Infisical</strong> : Gestion centralisée des secrets</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

Un bon DevOps ne teste <strong class="font-bold text-primary">jamais directement en production</strong>.

Règles d'or :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Au moins 3 environnements (Dev, Staging, Prod)</li>
  <li class="ml-4">Variables d'env externalisées (jamais de secrets hardcodés)</li>
  <li class="ml-4">Bases de données séparées</li>
  <li class="ml-4">Staging = clone de prod</li>
  <li class="ml-4">Monitoring activé partout</li>
  <li class="ml-4">Accès restreints à la prod</li>
</ul>

> "Test in staging like it's production. Treat production like it's sacred." 🛡️
      `
    },
    { 
      id: '18', 
      title: 'Introduction à Kubernetes (pour les curieux)', 
      category: 'devops',
      content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : L'orchestrateur de containers</h2>

Kubernetes (ou <strong class="font-bold text-primary">K8s</strong>) est un outil d'orchestration de containers qui automatise le déploiement, la mise à l'échelle et la résilience de tes applications.

Si Docker est ton <strong class="font-bold text-primary">container runtime</strong>, Kubernetes est ton <strong class="font-bold text-primary">chef d'orchestre</strong> qui gère des centaines de containers.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🤔 Pourquoi Kubernetes ?</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Problèmes que K8s résout</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Scalabilité manuelle</strong> : K8s scale automatiquement selon la charge</li>
  <li class="ml-4"><strong class="font-bold text-primary">Crashes d'app</strong> : Self-healing (redémarrage auto des pods)</li>
  <li class="ml-4"><strong class="font-bold text-primary">Déploiements risqués</strong> : Rolling updates sans downtime</li>
  <li class="ml-4"><strong class="font-bold text-primary">Load balancing</strong> : Distribution automatique du trafic</li>
  <li class="ml-4"><strong class="font-bold text-primary">Gestion des secrets</strong> : ConfigMaps et Secrets natifs</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Architecture Kubernetes</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Control Plane (cerveau)</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">API Server</strong> : Point d'entrée pour toutes les commandes</li>
  <li class="ml-4"><strong class="font-bold text-primary">Scheduler</strong> : Décide où placer les pods</li>
  <li class="ml-4"><strong class="font-bold text-primary">Controller Manager</strong> : Maintient l'état désiré</li>
  <li class="ml-4"><strong class="font-bold text-primary">etcd</strong> : Base de données clé-valeur (stocke l'état du cluster)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Nodes (travailleurs)</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Kubelet</strong> : Agent sur chaque node qui exécute les pods</li>
  <li class="ml-4"><strong class="font-bold text-primary">Kube-proxy</strong> : Gère le réseau</li>
  <li class="ml-4"><strong class="font-bold text-primary">Container Runtime</strong> : Docker, containerd...</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Concepts clés</h2>

<h3 class="text-xl font-bold mt-6 mb-3">📦 Pod</h3>

L'<strong class="font-bold text-primary">unité de base</strong> dans K8s. Un pod contient 1 ou plusieurs containers qui partagent :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">La même IP</li>
  <li class="ml-4">Le même stockage (volumes)</li>
  <li class="ml-4">Le même namespace réseau</li>
</ul>

Généralement : <strong class="font-bold text-primary">1 pod = 1 container principal</strong>.

<h3 class="text-xl font-bold mt-6 mb-3">🚀 Deployment</h3>

Gère le <strong class="font-bold text-primary">cycle de vie des pods</strong> :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Nombre de replicas (scalabilité)</li>
  <li class="ml-4">Rolling updates (déploiements progressifs)</li>
  <li class="ml-4">Rollback automatique si échec</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">🌐 Service</h3>

Expose tes pods au réseau avec une <strong class="font-bold text-primary">IP stable</strong>.

Types :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">ClusterIP</strong> : Accessible uniquement dans le cluster</li>
  <li class="ml-4"><strong class="font-bold text-primary">NodePort</strong> : Expose sur un port du node</li>
  <li class="ml-4"><strong class="font-bold text-primary">LoadBalancer</strong> : Crée un load balancer externe (AWS ELB, GCP LB...)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">🔀 Ingress</h3>

Gère les accès <strong class="font-bold text-primary">HTTP/HTTPS externes</strong> avec routing intelligent.

Exemple : <strong class="font-bold text-primary">api.example.com → backend service</strong>, <strong class="font-bold text-primary">example.com → frontend service</strong>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Exemple complet : Déployer une app</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Deployment (deployment.yaml)</h3>

<strong class="font-bold text-primary">Explications :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">replicas: 3</strong> : 3 pods identiques (haute dispo)</li>
  <li class="ml-4"><strong class="font-bold text-primary">selector</strong> : Identifie les pods à gérer</li>
  <li class="ml-4"><strong class="font-bold text-primary">template</strong> : Définit le pod</li>
  <li class="ml-4"><strong class="font-bold text-primary">image</strong> : L'image Docker à utiliser</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Service (service.yaml)</h3>

Expose les pods avec un load balancer.

<h3 class="text-xl font-bold mt-6 mb-3">Commandes kubectl</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">kubectl apply -f deployment.yaml</strong> : Déployer</li>
  <li class="ml-4"><strong class="font-bold text-primary">kubectl get pods</strong> : Lister les pods</li>
  <li class="ml-4"><strong class="font-bold text-primary">kubectl logs pod-name</strong> : Voir les logs</li>
  <li class="ml-4"><strong class="font-bold text-primary">kubectl exec -it pod-name -- sh</strong> : Shell dans le pod</li>
  <li class="ml-4"><strong class="font-bold text-primary">kubectl scale deployment webapp --replicas=5</strong> : Scaler</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Auto-scaling</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Horizontal Pod Autoscaler (HPA)</h3>

Scale automatiquement selon le CPU/RAM :

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">kubectl autoscale deployment webapp --cpu-percent=50 --min=2 --max=10</strong></li>
</ul>

Si CPU > 50%, K8s ajoute des pods (jusqu'à 10 max).

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ ConfigMaps et Secrets</h2>

<h3 class="text-xl font-bold mt-6 mb-3">ConfigMap (configuration non sensible)</h3>

Exemple : URL d'API, nom de l'environnement.

<h3 class="text-xl font-bold mt-6 mb-3">Secret (données sensibles)</h3>

Exemple : Mots de passe, tokens API (encodés en base64).

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Quand utiliser Kubernetes ?</h2>

<h3 class="text-xl font-bold mt-6 mb-3">✅ OUI si :</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Microservices nombreux (>10 services)</li>
  <li class="ml-4">Besoin de scalabilité forte et automatique</li>
  <li class="ml-4">Équipe DevOps dédiée</li>
  <li class="ml-4">Multi-cloud ou hybrid cloud</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">❌ NON si :</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Petit projet / monolithe simple</li>
  <li class="ml-4">Pas de ressources DevOps (courbe d'apprentissage)</li>
  <li class="ml-4">Serverless suffit (Lambda, Cloud Functions)</li>
  <li class="ml-4">Docker Compose répond à tes besoins</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">7️⃣ Alternatives et solutions managées</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Amazon EKS</strong> : Kubernetes managé sur AWS</li>
  <li class="ml-4"><strong class="font-bold text-primary">Google GKE</strong> : Kubernetes managé sur GCP</li>
  <li class="ml-4"><strong class="font-bold text-primary">Azure AKS</strong> : Kubernetes managé sur Azure</li>
  <li class="ml-4"><strong class="font-bold text-primary">Minikube</strong> : K8s local pour dev</li>
  <li class="ml-4"><strong class="font-bold text-primary">K3s</strong> : Version légère pour IoT/Edge</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

Kubernetes est un <strong class="font-bold text-primary">Docker Compose à très grande échelle</strong>.

Avantages :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Scalabilité automatique</li>
  <li class="ml-4">Haute disponibilité</li>
  <li class="ml-4">Gestion centralisée des ressources</li>
  <li class="ml-4">Standard de l'industrie</li>
</ul>

<strong class="font-bold text-primary">Pas indispensable pour débuter</strong>, mais incontournable à maîtriser à terme.

<strong class="font-bold text-primary">Ressources :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">kubernetes.io/docs</li>
  <li class="ml-4">learnk8s.io</li>
  <li class="ml-4">kubernetes.io/training</li>
</ul>

> "Kubernetes: because manually managing 100 Docker containers is insane." ☸️
      `
    },
    { 
      id: '19', 
      title: 'Automatiser les tests avant un déploiement', 
      category: 'devops',
      content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Le filet de sécurité du CI/CD</h2>

Automatiser les tests, c'est garantir que chaque mise en production se fait <strong class="font-bold text-primary">sans surprise</strong>. C'est la base d'un pipeline de qualité.

<strong class="font-bold text-primary">Sans tests automatisés :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Bug critique découvert en prod après le deploy</li>
  <li class="ml-4">Régression non détectée (feature qui casse une autre)</li>
  <li class="ml-4">Refactoring risqué (peur de tout casser)</li>
</ul>

<strong class="font-bold text-primary">Avec tests automatisés :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Feedback immédiat (échec = pipeline bloqué)</li>
  <li class="ml-4">Confiance pour refactorer</li>
  <li class="ml-4">Documentation vivante du code</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ La pyramide des tests</h2>

<h3 class="text-xl font-bold mt-6 mb-3">🔬 Tests Unitaires (70% des tests)</h3>

<strong class="font-bold text-primary">Objectif :</strong> Vérifier les fonctions/méthodes isolées.

<strong class="font-bold text-primary">Caractéristiques :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Ultra rapides (millisecondes)</li>
  <li class="ml-4">Pas de dépendances externes (DB, API)</li>
  <li class="ml-4">Nombreux (centaines de tests)</li>
</ul>

<strong class="font-bold text-primary">Exemple avec Jest (JavaScript) :</strong>

Teste la logique pure sans effets de bord.

<h3 class="text-xl font-bold mt-6 mb-3">🔗 Tests d'Intégration (20% des tests)</h3>

<strong class="font-bold text-primary">Objectif :</strong> Valider la communication entre modules.

<strong class="font-bold text-primary">Exemple :</strong> Tester une API qui interroge vraiment une DB de test.

Outils : <strong class="font-bold text-primary">Supertest</strong> (Node), <strong class="font-bold text-primary">pytest</strong> (Python)

<h3 class="text-xl font-bold mt-6 mb-3">🎭 Tests End-to-End (E2E) (10% des tests)</h3>

<strong class="font-bold text-primary">Objectif :</strong> Simuler le comportement utilisateur complet.

<strong class="font-bold text-primary">Exemple :</strong> Tester le flow "Login → Créer un post → Logout" dans un vrai navigateur.

Outils : <strong class="font-bold text-primary">Playwright</strong>, <strong class="font-bold text-primary">Cypress</strong>, <strong class="font-bold text-primary">Selenium</strong>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Intégrer les tests dans le CI/CD</h2>

<h3 class="text-xl font-bold mt-6 mb-3">GitHub Actions : Pipeline complet</h3>

<strong class="font-bold text-primary">Étapes du workflow :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Checkout du code</li>
  <li class="ml-4">Installation des dépendances</li>
  <li class="ml-4">Linting (ESLint, Prettier)</li>
  <li class="ml-4">Tests unitaires</li>
  <li class="ml-4">Tests d'intégration</li>
  <li class="ml-4">Build</li>
  <li class="ml-4">Tests E2E (optionnel)</li>
</ul>

Si <strong class="font-bold text-primary">un seul test échoue</strong>, le pipeline s'arrête → <strong class="font-bold text-primary">pas de déploiement</strong>.

<h3 class="text-xl font-bold mt-6 mb-3">GitLab CI équivalent</h3>

Même principe avec <strong class="font-bold text-primary">.gitlab-ci.yml</strong>.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Code Coverage : Mesurer la qualité</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Qu'est-ce que le code coverage ?</h3>

<strong class="font-bold text-primary">Pourcentage de code testé</strong> par les tests.

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">80% coverage = bon</li>
  <li class="ml-4">90%+ = excellent</li>
  <li class="ml-4">100% = irréaliste (et pas toujours utile)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Générer un rapport avec Jest</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">npm test -- --coverage</strong></li>
</ul>

Affiche : lines, branches, functions, statements couverts.

<h3 class="text-xl font-bold mt-6 mb-3">Enforcer un seuil minimum</h3>

Dans <strong class="font-bold text-primary">package.json</strong> ou <strong class="font-bold text-primary">jest.config.js</strong> :

Le build échoue si coverage < 80%.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Tests de non-régression</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Problème : Refactoring qui casse</h3>

Tu changes du code → une feature existante cesse de fonctionner.

<h3 class="text-xl font-bold mt-6 mb-3">Solution : Tests automatisés</h3>

Chaque bug corrigé doit avoir <strong class="font-bold text-primary">un test associé</strong> pour éviter qu'il revienne.

<strong class="font-bold text-primary">Workflow :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Bug découvert en prod</li>
  <li class="ml-4">Écrire un test qui échoue (reproduit le bug)</li>
  <li class="ml-4">Corriger le bug</li>
  <li class="ml-4">Le test passe → commit</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Tests de performance</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Lighthouse CI</h3>

Teste les <strong class="font-bold text-primary">Web Vitals</strong> à chaque commit :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Performance (LCP, FID, CLS)</li>
  <li class="ml-4">Accessibilité</li>
  <li class="ml-4">SEO</li>
  <li class="ml-4">Best practices</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Load testing</h3>

Outils : <strong class="font-bold text-primary">k6</strong>, <strong class="font-bold text-primary">Artillery</strong>, <strong class="font-bold text-primary">JMeter</strong>

Simuler 1000 utilisateurs simultanés pour tester la scalabilité.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Bonnes pratiques</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ <strong class="font-bold text-primary">Tests rapides</strong> : Unitaires < 1s, Intégration < 10s</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Tests déterministes</strong> : Pas de flaky tests (qui échouent aléatoirement)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Un test = une assertion claire</strong> : Facile à débugger</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Coverage raisonnable</strong> : 80% est un bon objectif</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Tests isolés</strong> : Pas de dépendances entre tests</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Fail fast</strong> : Stopper le pipeline dès le 1er échec</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">7️⃣ Outils par langage</h2>

<h3 class="text-xl font-bold mt-6 mb-3">JavaScript/TypeScript</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Jest</strong> : Tests unitaires/intégration</li>
  <li class="ml-4"><strong class="font-bold text-primary">Vitest</strong> : Alternative ultra rapide</li>
  <li class="ml-4"><strong class="font-bold text-primary">Playwright</strong> : Tests E2E</li>
  <li class="ml-4"><strong class="font-bold text-primary">Cypress</strong> : Tests E2E (plus simple)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Python</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">pytest</strong> : Framework de test</li>
  <li class="ml-4"><strong class="font-bold text-primary">unittest</strong> : Intégré à Python</li>
  <li class="ml-4"><strong class="font-bold text-primary">Selenium</strong> : Tests E2E</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Java</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">JUnit</strong> : Standard pour tests unitaires</li>
  <li class="ml-4"><strong class="font-bold text-primary">Mockito</strong> : Mocking</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">8️⃣ TDD : Test-Driven Development</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Principe</h3>

<strong class="font-bold text-primary">Écrire les tests AVANT le code</strong>.

Cycle :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">🔴 <strong class="font-bold text-primary">Red</strong> : Écrire un test qui échoue</li>
  <li class="ml-4">🟢 <strong class="font-bold text-primary">Green</strong> : Écrire le minimum de code pour le faire passer</li>
  <li class="ml-4">🔵 <strong class="font-bold text-primary">Refactor</strong> : Améliorer le code sans casser le test</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Avantages</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Code testable dès le départ</li>
  <li class="ml-4">Meilleure architecture (découplage)</li>
  <li class="ml-4">Confiance pour refactorer</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

Les tests automatiques sont le <strong class="font-bold text-primary">pare-chocs du CI/CD</strong>. Sans eux, ton pipeline est une autoroute sans frein.

Règles d'or :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Pipeline bloqué si tests échouent</li>
  <li class="ml-4">Coverage minimum : 80%</li>
  <li class="ml-4">Tests rapides et déterministes</li>
  <li class="ml-4">Pyramide des tests respectée (70% unit, 20% integ, 10% E2E)</li>
</ul>

<strong class="font-bold text-primary">Ressources :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">jestjs.io</li>
  <li class="ml-4">playwright.dev</li>
  <li class="ml-4">martinfowler.com/testing</li>
</ul>

> "Code without tests is broken by design." — Jacob Kaplan-Moss 🧪
      `
    },
    { 
      id: '20', 
      title: 'Surveiller et monitorer ses apps après déploiement', 
      category: 'devops',
      content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : L'observabilité, clé de la fiabilité</h2>

Livrer, c'est bien. <strong class="font-bold text-primary">Observer</strong>, c'est mieux. Une app sans monitoring, c'est un avion sans tableau de bord.

<strong class="font-bold text-primary">Questions que le monitoring doit répondre :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Mon app est-elle accessible ? (Uptime)</li>
  <li class="ml-4">Est-elle rapide ? (Performance)</li>
  <li class="ml-4">Y a-t-il des erreurs ? (Error tracking)</li>
  <li class="ml-4">Les ressources sont-elles saines ? (CPU, RAM, Disk)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Les 3 piliers de l'observabilité</h2>

<h3 class="text-xl font-bold mt-6 mb-3">📝 Logs (ce qu'il s'est passé)</h3>

<strong class="font-bold text-primary">Définition :</strong> Enregistrements horodatés des événements.

<strong class="font-bold text-primary">Exemple :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">2025-01-10 14:32:15 INFO User 123 logged in</li>
  <li class="ml-4">2025-01-10 14:35:42 ERROR Database connection failed</li>
</ul>

<strong class="font-bold text-primary">Niveaux de logs :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">DEBUG</strong> : Détails pour le dev (désactivé en prod)</li>
  <li class="ml-4"><strong class="font-bold text-primary">INFO</strong> : Événements normaux</li>
  <li class="ml-4"><strong class="font-bold text-primary">WARN</strong> : Problème potentiel</li>
  <li class="ml-4"><strong class="font-bold text-primary">ERROR</strong> : Erreur récupérable</li>
  <li class="ml-4"><strong class="font-bold text-primary">CRITICAL</strong> : Erreur critique (système down)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">📊 Metrics (ce qui se passe en temps réel)</h3>

<strong class="font-bold text-primary">Définition :</strong> Valeurs numériques mesurées dans le temps.

<strong class="font-bold text-primary">Exemples :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">CPU usage : 45%</li>
  <li class="ml-4">RAM : 2.3 GB / 8 GB</li>
  <li class="ml-4">Requests per second : 1200</li>
  <li class="ml-4">Response time : 230ms</li>
  <li class="ml-4">Error rate : 0.5%</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">🔍 Traces (parcours d'une requête)</h3>

<strong class="font-bold text-primary">Définition :</strong> Suivi du parcours d'une requête à travers tous les services.

<strong class="font-bold text-primary">Exemple :</strong> Requête utilisateur → API Gateway → Auth Service → Database → Response

Outils : <strong class="font-bold text-primary">Jaeger</strong>, <strong class="font-bold text-primary">Zipkin</strong>, <strong class="font-bold text-primary">OpenTelemetry</strong>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Stack de monitoring complète</h2>

<h3 class="text-xl font-bold mt-6 mb-3">📝 Logs : ELK Stack</h3>

<strong class="font-bold text-primary">Composants :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Elasticsearch</strong> : Stockage et indexation des logs</li>
  <li class="ml-4"><strong class="font-bold text-primary">Logstash</strong> : Collecte et transformation</li>
  <li class="ml-4"><strong class="font-bold text-primary">Kibana</strong> : Visualisation (dashboards)</li>
</ul>

<strong class="font-bold text-primary">Alternative moderne :</strong> <strong class="font-bold text-primary">Loki + Grafana</strong> (plus léger)

<h3 class="text-xl font-bold mt-6 mb-3">📊 Metrics : Prometheus + Grafana</h3>

<strong class="font-bold text-primary">Prometheus :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Time-series database (stocke les métriques dans le temps)</li>
  <li class="ml-4">Pull model (scrape les endpoints /metrics)</li>
  <li class="ml-4">Alerting intégré</li>
</ul>

<strong class="font-bold text-primary">Grafana :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Dashboards magnifiques</li>
  <li class="ml-4">Alerting visuel</li>
  <li class="ml-4">Multi-sources (Prometheus, Loki, InfluxDB...)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">🚨 Error Tracking : Sentry</h3>

Capture automatiquement les <strong class="font-bold text-primary">exceptions et erreurs</strong> en prod.

<strong class="font-bold text-primary">Fonctionnalités :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Stack traces complètes</li>
  <li class="ml-4">Contexte utilisateur (navigateur, OS, user ID)</li>
  <li class="ml-4">Source maps (erreurs JS déminifiées)</li>
  <li class="ml-4">Alertes Slack/Email</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">⏱️ Uptime Monitoring</h3>

<strong class="font-bold text-primary">Outils :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">UptimeRobot</strong> : Gratuit, ping toutes les 5 min</li>
  <li class="ml-4"><strong class="font-bold text-primary">Pingdom</strong> : Monitoring avancé</li>
  <li class="ml-4"><strong class="font-bold text-primary">Better Uptime</strong> : Status page + alerting</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Configurer Prometheus + Grafana</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Étape 1 : Exposer les metrics</h3>

Exemple Node.js avec <strong class="font-bold text-primary">prom-client</strong> :

Expose un endpoint <strong class="font-bold text-primary">/metrics</strong> que Prometheus scrappe.

<h3 class="text-xl font-bold mt-6 mb-3">Étape 2 : Configurer Prometheus</h3>

Dans <strong class="font-bold text-primary">prometheus.yml</strong> :

<h3 class="text-xl font-bold mt-6 mb-3">Étape 3 : Créer un dashboard Grafana</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Ajouter Prometheus comme source de données</li>
  <li class="ml-4">Créer un dashboard avec des panels (CPU, RAM, Requests/s...)</li>
  <li class="ml-4">Configurer des alertes (CPU > 80%)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Alerting intelligent</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Quand alerter ?</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">🔴 <strong class="font-bold text-primary">Critical</strong> : Site down, DB inaccessible → Alerte immédiate (SMS, appel)</li>
  <li class="ml-4">🟠 <strong class="font-bold text-primary">Warning</strong> : CPU > 80%, Disk > 90% → Slack/Email</li>
  <li class="ml-4">🟡 <strong class="font-bold text-primary">Info</strong> : Deploy réussi → Log uniquement</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Éviter l'alert fatigue</h3>

<strong class="font-bold text-primary">Problème :</strong> Trop d'alertes → on les ignore.

<strong class="font-bold text-primary">Solution :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Alerter uniquement sur ce qui nécessite une <strong class="font-bold text-primary">action immédiate</strong></li>
  <li class="ml-4">Grouper les alertes similaires</li>
  <li class="ml-4">Silence pendant les maintenances</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Performance Monitoring</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Web Vitals (Frontend)</h3>

<strong class="font-bold text-primary">Métriques Google :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">LCP</strong> (Largest Contentful Paint) : Temps de chargement du contenu principal</li>
  <li class="ml-4"><strong class="font-bold text-primary">FID</strong> (First Input Delay) : Réactivité aux clics</li>
  <li class="ml-4"><strong class="font-bold text-primary">CLS</strong> (Cumulative Layout Shift) : Stabilité visuelle</li>
</ul>

<strong class="font-bold text-primary">Outils :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Google Analytics 4</li>
  <li class="ml-4">Vercel Analytics</li>
  <li class="ml-4">web-vitals library</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">APM (Application Performance Monitoring)</h3>

<strong class="font-bold text-primary">Outils :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Datadog APM</strong> : Traces distribuées</li>
  <li class="ml-4"><strong class="font-bold text-primary">New Relic</strong> : Monitoring all-in-one</li>
  <li class="ml-4"><strong class="font-bold text-primary">Elastic APM</strong> : Intégré à ELK</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Logs structurés</h2>

<h3 class="text-xl font-bold mt-6 mb-3">JSON Logs</h3>

<strong class="font-bold text-primary">Au lieu de :</strong> "User 123 logged in at 14:32"

<strong class="font-bold text-primary">Préférer :</strong>

Plus facile à parser et indexer dans Elasticsearch.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">7️⃣ Bonnes pratiques</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ <strong class="font-bold text-primary">Centraliser les logs</strong> (ELK, Loki)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Alerter sur les seuils critiques</strong> (CPU > 90%, erreurs > 1%)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Dashboards clairs</strong> (Grafana)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Retention policy</strong> (supprimer les vieux logs pour économiser)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Monitoring du monitoring</strong> (Prometheus qui surveille Prometheus)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Relier au CI/CD</strong> (alerter sur deploy failed)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">8️⃣ Solutions all-in-one</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Datadog</strong> : Logs + Metrics + APM + Tracing (payant mais puissant)</li>
  <li class="ml-4"><strong class="font-bold text-primary">New Relic</strong> : Monitoring complet (free tier généreux)</li>
  <li class="ml-4"><strong class="font-bold text-primary">Grafana Cloud</strong> : Loki + Prometheus + Grafana managés</li>
  <li class="ml-4"><strong class="font-bold text-primary">AWS CloudWatch</strong> : Natif AWS</li>
  <li class="ml-4"><strong class="font-bold text-primary">Azure Monitor</strong> : Natif Azure</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

Un bon DevOps ne dort jamais tranquille sans un dashboard. <strong class="font-bold text-primary">Surveiller, c'est maîtriser.</strong>

Les 3 piliers :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Logs (ce qui s'est passé)</li>
  <li class="ml-4">Metrics (ce qui se passe)</li>
  <li class="ml-4">Traces (parcours des requêtes)</li>
</ul>

<strong class="font-bold text-primary">Ressources :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">prometheus.io</li>
  <li class="ml-4">grafana.com</li>
  <li class="ml-4">sentry.io/welcome</li>
  <li class="ml-4">opentelemetry.io</li>
</ul>

> "You can't improve what you don't measure." — Peter Drucker 📊
      `
    },
  {
    id: '21',
    title: 'Infrastructure as Code avec Terraform',
    category: 'devops',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Gérer l'infra comme du code</h2>

<strong class="font-bold text-primary">Infrastructure as Code (IaC)</strong> = Définir ton infrastructure cloud dans des fichiers versionnés.

<strong class="font-bold text-primary">Avant IaC :</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Clics manuels dans AWS Console</li>
<li class="ml-4">Documentation Word obsolète</li>
<li class="ml-4">Impossible à reproduire</li>
</ul>
<strong class="font-bold text-primary">Avec IaC :</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Code versionné dans Git</li>
<li class="ml-4">Reproductible à l'infini</li>
<li class="ml-4">Code review de l'infra</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🏗️ Terraform : Le standard IaC</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Pourquoi Terraform ?</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Multi-cloud</strong> : AWS, Azure, GCP, DigitalOcean...</li>
  <li class="ml-4"><strong class="font-bold text-primary">Déclaratif</strong> : Tu décris l'état final, Terraform fait le reste</li>
  <li class="ml-4"><strong class="font-bold text-primary">Plan avant apply</strong> : Aperçu des changements avant exécution</li>
  <li class="ml-4"><strong class="font-bold text-primary">State management</strong> : Connaît l'état actuel vs désiré</li>
  <li class="ml-4"><strong class="font-bold text-primary">Immutabilité</strong> : Remplace au lieu de modifier</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Alternatives</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Pulumi</strong> : IaC avec TypeScript/Python/Go</li>
  <li class="ml-4"><strong class="font-bold text-primary">AWS CloudFormation</strong> : Spécifique AWS (YAML/JSON)</li>
  <li class="ml-4"><strong class="font-bold text-primary">Azure ARM Templates</strong> : Spécifique Azure</li>
  <li class="ml-4"><strong class="font-bold text-primary">Ansible</strong> : Configuration management (plutôt impératif)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Premier exemple : EC2 instance</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Fichier main.tf</h3>

\`\`\`hcl
provider "aws" {
  region = "eu-west-1"
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  
  tags = {
    Name        = "WebServer"
    Environment = "Production"
  }
}
\`\`\`

<strong class="font-bold text-primary">Explications :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">provider</strong> : Configure AWS (région, credentials)</li>
  <li class="ml-4"><strong class="font-bold text-primary">resource</strong> : Crée une ressource (ici un serveur EC2)</li>
  <li class="ml-4"><strong class="font-bold text-primary">ami</strong> : Image du système (Amazon Linux, Ubuntu...)</li>
  <li class="ml-4"><strong class="font-bold text-primary">instance_type</strong> : Taille du serveur (t2.micro = 1 vCPU, 1 GB RAM)</li>
  <li class="ml-4"><strong class="font-bold text-primary">tags</strong> : Métadonnées pour organiser</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Workflow Terraform</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">terraform init</strong> : Télécharger les providers (AWS, Azure...)</li>
  <li class="ml-4"><strong class="font-bold text-primary">terraform plan</strong> : Voir ce qui va être créé/modifié/détruit</li>
  <li class="ml-4"><strong class="font-bold text-primary">terraform apply</strong> : Appliquer les changements (demande confirmation)</li>
  <li class="ml-4"><strong class="font-bold text-primary">terraform destroy</strong> : Tout détruire (cleanup)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Variables et outputs</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Variables (variables.tf)</h3>

Rendre le code réutilisable :

\`\`\`hcl
variable "region" {
  default = "eu-west-1"
}

variable "instance_type" {
  default = "t2.micro"
}
\`\`\`

<strong class="font-bold text-primary">Utilisation :</strong> var.region, var.instance_type

<h3 class="text-xl font-bold mt-6 mb-3">Outputs (outputs.tf)</h3>

Afficher des infos après apply :

\`\`\`hcl
output "instance_ip" {
  value = aws_instance.web.public_ip
}
\`\`\`

Affiche l'IP publique du serveur créé.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Modules réutilisables</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Pourquoi des modules ?</h3>

Au lieu de dupliquer du code, <strong class="font-bold text-primary">encapsule dans des modules</strong>.

<strong class="font-bold text-primary">Exemple de structure :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">modules/vpc/ (Virtual Private Cloud)</li>
  <li class="ml-4">modules/ec2/ (Serveurs)</li>
  <li class="ml-4">modules/rds/ (Database)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Utilisation d'un module</h3>

\`\`\`hcl
module "vpc" {
  source = "./modules/vpc"
  
  cidr_block  = "10.0.0.0/16"
  environment = "production"
}
\`\`\`

Réutilisable pour dev, staging, prod avec des paramètres différents.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Remote State (S3 + DynamoDB)</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Problème du state local</h3>

Par défaut, Terraform stocke l'état dans <strong class="font-bold text-primary">terraform.tfstate</strong> (local).

<strong class="font-bold text-primary">Risques :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Perte du fichier = perte de l'état</li>
  <li class="ml-4">Pas de collaboration (conflicts)</li>
  <li class="ml-4">Pas de locking (2 personnes qui appliquent en même temps)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Solution : Remote State sur S3</h3>

Dans <strong class="font-bold text-primary">backend.tf</strong> :

\`\`\`hcl
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "eu-west-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
\`\`\`

<strong class="font-bold text-primary">Avantages :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">State partagé entre l'équipe</li>
  <li class="ml-4">Versioning activé (rollback possible)</li>
  <li class="ml-4">Locking via DynamoDB (évite les conflicts)</li>
  <li class="ml-4">Encrypted at rest</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Workspaces (multi-environnements)</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Gérer dev, staging, prod</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">terraform workspace new dev</strong></li>
  <li class="ml-4"><strong class="font-bold text-primary">terraform workspace new staging</strong></li>
  <li class="ml-4"><strong class="font-bold text-primary">terraform workspace new prod</strong></li>
  <li class="ml-4"><strong class="font-bold text-primary">terraform workspace select dev</strong></li>
</ul>

Chaque workspace a son propre state.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">7️⃣ Terraform dans le CI/CD</h2>

<h3 class="text-xl font-bold mt-6 mb-3">GitHub Actions exemple</h3>

\`\`\`yaml
name: Terraform
on: [push]
jobs:
  terraform:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: hashicorp/setup-terraform@v2
      - run: terraform init
      - run: terraform plan
\`\`\`

Automatise terraform plan sur chaque PR.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">8️⃣ Bonnes pratiques</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ <strong class="font-bold text-primary">Versionne ton code Terraform</strong> (Git)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Remote state</strong> (S3 + DynamoDB ou Terraform Cloud)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Modules réutilisables</strong> (DRY principle)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Variables pour les secrets</strong> (jamais hardcodé)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Un workspace par environnement</strong></li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Toujours run plan avant apply</strong></li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Code review des changements d'infra</strong></li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Terraform fmt</strong> (formatage automatique)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Terraform validate</strong> (vérifier la syntaxe)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">9️⃣ Terraform vs autres outils</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Terraform vs Ansible</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Terraform</strong> : Provisionning infra (créer des serveurs)</li>
  <li class="ml-4"><strong class="font-bold text-primary">Ansible</strong> : Configuration management (configurer des serveurs existants)</li>
</ul>

Souvent utilisés <strong class="font-bold text-primary">ensemble</strong> : Terraform crée l'infra, Ansible la configure.

<h3 class="text-xl font-bold mt-6 mb-3">Terraform vs CloudFormation</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Terraform</strong> : Multi-cloud, HCL (lisible)</li>
  <li class="ml-4"><strong class="font-bold text-primary">CloudFormation</strong> : AWS only, YAML/JSON (verbeux)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

Infrastructure fiable = <strong class="font-bold text-primary">Infrastructure as Code</strong> !

Avantages clés :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Versionné comme du code</li>
  <li class="ml-4">Reproductible</li>
  <li class="ml-4">Testable</li>
  <li class="ml-4">Documenté automatiquement</li>
  <li class="ml-4">Multi-environnements facile</li>
</ul>

<strong class="font-bold text-primary">Ressources :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">developer.hashicorp.com/terraform</li>
  <li class="ml-4">registry.terraform.io (modules officiels)</li>
  <li class="ml-4">spacelift.io/blog (best practices)</li>
</ul>

> "Infrastructure as Code: because clicking buttons in the AWS console at 2 AM is not sustainable." 🏗️
    `
  },
  {
    id: '22',
    title: 'Sécurité DevOps : Les essentiels (DevSecOps)',
    category: 'devops',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Shift Left Security</h2>

<strong class="font-bold text-primary">DevSecOps</strong> = Intégrer la sécurité dès le début du cycle de développement, pas à la fin.

<strong class="font-bold text-primary">Principe du "Shift Left" :</strong> Plus tôt tu détectes une vulnérabilité, moins elle coûte à corriger.

<h3 class="text-xl font-bold mt-6 mb-3">❌ Approche traditionnelle</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Dev → Test → <strong class="font-bold text-primary">Audit sécu en fin de projet</strong></li>
  <li class="ml-4">Vulnérabilités découvertes juste avant le release</li>
  <li class="ml-4">Panique, rush, patches de dernière minute</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">✅ DevSecOps</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Sécurité <strong class="font-bold text-primary">automatisée dans le CI/CD</strong></li>
  <li class="ml-4">Scan de vulnérabilités à chaque commit</li>
  <li class="ml-4">Feedback immédiat pour les devs</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Scan des dépendances (SCA)</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Problème : Dépendances vulnérables</h3>

<strong class="font-bold text-primary">80% du code d'une app moderne vient de dépendances externes</strong> (npm, pip, Maven...).

Exemple : <strong class="font-bold text-primary">Log4Shell</strong> (CVE-2021-44228) a affecté des millions d'apps Java.

<h3 class="text-xl font-bold mt-6 mb-3">Outils de scan</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">npm audit</strong> : Intégré à npm</li>
  <li class="ml-4"><strong class="font-bold text-primary">Snyk</strong> : Scan + auto-fix des vulnérabilités</li>
  <li class="ml-4"><strong class="font-bold text-primary">Dependabot</strong> (GitHub) : PRs automatiques pour mettre à jour les deps</li>
  <li class="ml-4"><strong class="font-bold text-primary">OWASP Dependency-Check</strong> : Open source</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Intégration CI/CD</h3>

Dans GitHub Actions :

Échec du pipeline si vulnérabilités <strong class="font-bold text-primary">critical</strong> détectées.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Scan de code statique (SAST)</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Qu'est-ce que SAST ?</h3>

<strong class="font-bold text-primary">Static Application Security Testing</strong> : Analyse ton code source pour trouver des failles (sans l'exécuter).

<strong class="font-bold text-primary">Exemples de vulnérabilités détectées :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">SQL Injection</li>
  <li class="ml-4">XSS (Cross-Site Scripting)</li>
  <li class="ml-4">Secrets hardcodés (API keys dans le code)</li>
  <li class="ml-4">Buffer overflow</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Outils SAST</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">SonarQube</strong> : Open source, supporte 25+ langages</li>
  <li class="ml-4"><strong class="font-bold text-primary">Semgrep</strong> : Léger, rapide</li>
  <li class="ml-4"><strong class="font-bold text-primary">CodeQL</strong> (GitHub) : Gratuit pour repos publics</li>
  <li class="ml-4"><strong class="font-bold text-primary">Checkmarx</strong> : Enterprise</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Scan de secrets</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Problème : Secrets committés</h3>

Exemple de secrets <strong class="font-bold text-primary">à ne JAMAIS commit</strong> :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">AWS Access Keys</li>
  <li class="ml-4">API tokens (Stripe, SendGrid...)</li>
  <li class="ml-4">Mots de passe</li>
  <li class="ml-4">Private SSH keys</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Outils de détection</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">GitGuardian</strong> : Scan en temps réel des commits</li>
  <li class="ml-4"><strong class="font-bold text-primary">TruffleHog</strong> : Scan de l'historique Git</li>
  <li class="ml-4"><strong class="font-bold text-primary">GitHub Secret Scanning</strong> : Natif GitHub</li>
  <li class="ml-4"><strong class="font-bold text-primary">git-secrets</strong> : Pre-commit hook</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">⚠️ Si un secret a été commité</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Révoquer immédiatement</strong> la clé</li>
  <li class="ml-4">Nettoyer l'historique Git (BFG Repo-Cleaner)</li>
  <li class="ml-4">Forcer le re-clone du repo pour l'équipe</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Scan des images Docker</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Vulnérabilités dans les images</h3>

Une image Docker peut contenir des <strong class="font-bold text-primary">vulnérabilités OS</strong> (Ubuntu, Alpine...) ou des <strong class="font-bold text-primary">packages vulnérables</strong>.

<h3 class="text-xl font-bold mt-6 mb-3">Outils de scan</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Trivy</strong> : Scanner open source ultra rapide</li>
  <li class="ml-4"><strong class="font-bold text-primary">Snyk Container</strong> : Scan + recommandations</li>
  <li class="ml-4"><strong class="font-bold text-primary">Docker Scout</strong> : Intégré à Docker Desktop</li>
  <li class="ml-4"><strong class="font-bold text-primary">Clair</strong> : Par CoreOS</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Exemple avec Trivy</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">trivy image nginx:latest</strong></li>
</ul>

Affiche toutes les CVE détectées.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Infrastructure as Code Security</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Scan Terraform/CloudFormation</h3>

<strong class="font-bold text-primary">Outils :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Checkov</strong> : Scan de Terraform, CloudFormation, Kubernetes YAML</li>
  <li class="ml-4"><strong class="font-bold text-primary">tfsec</strong> : Spécifique Terraform</li>
  <li class="ml-4"><strong class="font-bold text-primary">Terrascan</strong> : Multi-IaC</li>
</ul>

<strong class="font-bold text-primary">Exemples de détections :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Bucket S3 public par erreur</li>
  <li class="ml-4">Security group trop permissif (0.0.0.0/0)</li>
  <li class="ml-4">Encryption désactivée</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Gestion des secrets (Vault)</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Solutions de gestion de secrets</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">HashiCorp Vault</strong> : Standard de l'industrie</li>
  <li class="ml-4"><strong class="font-bold text-primary">AWS Secrets Manager</strong> : Natif AWS</li>
  <li class="ml-4"><strong class="font-bold text-primary">Azure Key Vault</strong> : Natif Azure</li>
  <li class="ml-4"><strong class="font-bold text-primary">Doppler</strong> : Simple et moderne</li>
  <li class="ml-4"><strong class="font-bold text-primary">Infisical</strong> : Open source alternative</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Principe</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Secrets stockés <strong class="font-bold text-primary">chiffrés</strong> dans Vault</li>
  <li class="ml-4">App récupère les secrets au runtime (pas hardcodés)</li>
  <li class="ml-4">Rotation automatique des secrets</li>
  <li class="ml-4">Audit logs de tous les accès</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">7️⃣ OWASP Top 10</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Les 10 vulnérabilités web critiques</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">A01: Broken Access Control</strong> (accès non autorisés)</li>
  <li class="ml-4"><strong class="font-bold text-primary">A02: Cryptographic Failures</strong> (données non chiffrées)</li>
  <li class="ml-4"><strong class="font-bold text-primary">A03: Injection</strong> (SQL, NoSQL, LDAP...)</li>
  <li class="ml-4"><strong class="font-bold text-primary">A04: Insecure Design</strong> (architecture vulnérable)</li>
  <li class="ml-4"><strong class="font-bold text-primary">A05: Security Misconfiguration</strong></li>
  <li class="ml-4"><strong class="font-bold text-primary">A06: Vulnerable Components</strong> (dépendances)</li>
  <li class="ml-4"><strong class="font-bold text-primary">A07: Authentication Failures</strong></li>
  <li class="ml-4"><strong class="font-bold text-primary">A08: Software and Data Integrity</strong></li>
  <li class="ml-4"><strong class="font-bold text-primary">A09: Logging Failures</strong></li>
  <li class="ml-4"><strong class="font-bold text-primary">A10: Server-Side Request Forgery (SSRF)</strong></li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">8️⃣ Bonnes pratiques DevSecOps</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ <strong class="font-bold text-primary">Automatiser les scans</strong> dans le CI/CD</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Fail fast</strong> : Pipeline bloqué si vulnérabilité critique</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Rotation des secrets</strong> (tous les 90 jours)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Principe du moindre privilège</strong> (IAM minimal)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Monitoring des accès</strong> (audit logs)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">MFA partout</strong> (Multi-Factor Authentication)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Network segmentation</strong> (VPC, subnets privés)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Patch management</strong> (updates régulières)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

La sécurité n'est <strong class="font-bold text-primary">pas une étape finale</strong>, c'est un <strong class="font-bold text-primary">processus continu</strong>.

Les 3 piliers DevSecOps :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Automatisation (scans dans le CI/CD)</li>
  <li class="ml-4">Visibilité (monitoring des vulnérabilités)</li>
  <li class="ml-4">Réactivité (patch rapide)</li>
</ul>

<strong class="font-bold text-primary">Ressources :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">owasp.org/top-ten</li>
  <li class="ml-4">snyk.io/learn</li>
  <li class="ml-4">cheatsheetseries.owasp.org</li>
</ul>

> "Security is not a product, but a process." — Bruce Schneier 🔒
    `
  },
];
