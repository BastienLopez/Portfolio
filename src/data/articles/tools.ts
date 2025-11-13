import { Article } from './types';

export const toolsArticles: Article[] = [
 // 🧩 Outils & Productivité
  { 
    id: '21', 
    title: 'Les extensions VS Code indispensables', 
    category: 'tools',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : VS Code, l'éditeur universel</h2>

VS Code domine le marché des éditeurs de code avec <strong class="font-bold text-primary">70%+ des développeurs</strong> qui l'utilisent quotidiennement.

Pourquoi cet engouement ?
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Léger et rapide (contrairement à IntelliJ/Eclipse)</li>
  <li class="ml-4">Extensions pour TOUT (langages, frameworks, outils)</li>
  <li class="ml-4">Open source (Microsoft)</li>
  <li class="ml-4">Customisable à l'infini</li>
  <li class="ml-4">Intégré avec Git, Docker, SSH...</li>
</ul>

Mais <strong class="font-bold text-primary">mal configuré</strong>, VS Code reste basique. Bien équipé, il devient un <strong class="font-bold text-primary">IDE puissant</strong>.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Qualité de code (obligatoires)</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Prettier (formattage auto)</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Formatage automatique : indentation, quotes, point-virgules...</li>
  <li class="ml-4">Supporte JS, TS, CSS, HTML, JSON, Markdown...</li>
  <li class="ml-4">Config via <strong class="font-bold text-primary">.prettierrc</strong></li>
</ul>

Settings recommandés (settings.json) :
\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">ESLint (linting JS/TS)</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Détecte les erreurs potentielles</li>
  <li class="ml-4">Force un style de code cohérent</li>
  <li class="ml-4">Auto-fix possible (Cmd+Shift+P → ESLint: Fix all)</li>
</ul>

Enable auto-fix :
\`\`\`json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Error Lens (erreurs inline)</h3>

Affiche les erreurs TypeScript/ESLint <strong class="font-bold text-primary">directement dans la ligne</strong> (plus besoin de hover).

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Git & Versionning</h2>

<h3 class="text-xl font-bold mt-6 mb-3">GitLens (Git superchargé)</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Voir <strong class="font-bold text-primary">qui a modifié quelle ligne</strong> (blame inline)</li>
  <li class="ml-4">Historique du fichier (timeline)</li>
  <li class="ml-4">Comparer des commits</li>
  <li class="ml-4">Graph de branches</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Git Graph (visualiser les branches)</h3>

Alternative à GitLens pour un <strong class="font-bold text-primary">graph visuel</strong> des commits et branches.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Développement Web</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Live Server (reload auto)</h3>

Lance un serveur local avec <strong class="font-bold text-primary">hot reload</strong> instantané.

Clic droit sur <strong class="font-bold text-primary">index.html</strong> → "Open with Live Server".

<h3 class="text-xl font-bold mt-6 mb-3">Auto Rename Tag</h3>

Renomme automatiquement les <strong class="font-bold text-primary">balises HTML/JSX liées</strong>.

Exemple : Change <strong class="font-bold text-primary">&lt;div&gt;</strong> en <strong class="font-bold text-primary">&lt;section&gt;</strong> → fermeture updatée automatiquement.

<h3 class="text-xl font-bold mt-6 mb-3">REST Client (tester des APIs)</h3>

Crée un fichier <strong class="font-bold text-primary">.http</strong> :
\`\`\`http
GET https://api.github.com/users/github
Authorization: Bearer YOUR_TOKEN
\`\`\`

Clic sur "Send Request" → réponse dans VS Code (adieu Postman).

<h3 class="text-xl font-bold mt-6 mb-3">Tailwind CSS IntelliSense</h3>

Auto-complétion des classes Tailwind + preview des couleurs.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Productivité & Navigation</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Path Intellisense</h3>

Auto-complétion des <strong class="font-bold text-primary">chemins de fichiers</strong> (imports, images...).

<h3 class="text-xl font-bold mt-6 mb-3">TODO Highlight</h3>

Met en surbrillance <strong class="font-bold text-primary">TODO</strong>, <strong class="font-bold text-primary">FIXME</strong>, <strong class="font-bold text-primary">HACK</strong> dans le code.

<h3 class="text-xl font-bold mt-6 mb-3">Better Comments</h3>

Commentaires colorés selon le type :
\`\`\`js
// ! Danger
// ? Question
// TODO: À faire
// * Important
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Apparence & Thèmes</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Material Icon Theme</h3>

Icônes Material Design pour les fichiers (très lisible).

<h3 class="text-xl font-bold mt-6 mb-3">Thèmes populaires</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Dracula Official</strong> : Sombre, violet</li>
  <li class="ml-4"><strong class="font-bold text-primary">One Dark Pro</strong> : Inspiré d'Atom</li>
  <li class="ml-4"><strong class="font-bold text-primary">Night Owl</strong> : Optimisé pour la nuit</li>
  <li class="ml-4"><strong class="font-bold text-primary">GitHub Theme</strong> : Clair/sombre comme GitHub</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Langages spécifiques</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Python</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Python</strong> (Microsoft) : IntelliSense, linting, debugging</li>
  <li class="ml-4"><strong class="font-bold text-primary">Pylance</strong> : Type checking rapide</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Docker</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Docker</strong> : Syntax highlighting Dockerfile, gérer containers</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Markdown</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Markdown All in One</strong> : Shortcuts, preview, TOC auto</li>
  <li class="ml-4"><strong class="font-bold text-primary">Markdown Preview Enhanced</strong> : Preview style GitHub, export PDF/HTML, diagrammes</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">JSON</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">JSON Crack</strong> : Visualise JSON en format graphique (diagramme relationnel type BDD)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">7️⃣ IA & Assistance au code</h2>

<h3 class="text-xl font-bold mt-6 mb-3">GitHub Copilot</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Auto-complétion IA (suggestions contextuelles)</li>
  <li class="ml-4">Génération fonctions complètes</li>
  <li class="ml-4">10$/mois (gratuit étudiants/open-source)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Codeium</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Alternative gratuite à Copilot</li>
  <li class="ml-4">Support multi-langages</li>
  <li class="ml-4">Chat IA intégré</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Continue (Ollama local)</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">LLM local (Llama, Mistral, CodeLlama)</li>
  <li class="ml-4">100% privé (pas de cloud)</li>
  <li class="ml-4">Gratuit, open-source</li>
  <li class="ml-4">Nécessite Ollama installé</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">8️⃣ Docker & Containers</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Docker (extension officielle)</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Syntax highlighting Dockerfile</li>
  <li class="ml-4">Gérer containers/images depuis VS Code</li>
  <li class="ml-4">Logs containers en temps réel</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Dev Containers</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Développer DANS un container Docker</li>
  <li class="ml-4">Environnement isolé et reproductible</li>
  <li class="ml-4">Config via .devcontainer/devcontainer.json</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

Un bon setup VS Code = <strong class="font-bold text-primary">gain de productivité massif</strong>.

Les must-have par catégorie :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong>Qualité :</strong> Prettier, ESLint, Error Lens</li>
  <li class="ml-4"><strong>Git :</strong> GitLens</li>
  <li class="ml-4"><strong>Web :</strong> Live Server, Tailwind IntelliSense, REST Client</li>
  <li class="ml-4"><strong>Productivité :</strong> Path Intellisense, TODO Highlight</li>
  <li class="ml-4"><strong>Markdown :</strong> Markdown Preview Enhanced</li>
  <li class="ml-4"><strong>JSON :</strong> JSON Crack</li>
  <li class="ml-4"><strong>IA :</strong> Copilot ou Codeium (Continue pour local)</li>
  <li class="ml-4"><strong>Docker :</strong> Docker + Dev Containers</li>
</ul>

> "La productivité ne vient pas de plus de travail, mais de meilleurs outils." 🚀
    `
  },
  { 
    id: '22', 
    title: 'Organiser sa veille tech efficacement', 
    category: 'tools',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Rester à jour sans sombrer</h2>

La tech évolue <strong class="font-bold text-primary">ultra vite</strong> : nouveau framework JS chaque semaine, mises à jour majeures, vulnérabilités...

<strong class="font-bold text-primary">Problème :</strong> Sans organisation, la veille devient une <strong class="font-bold text-primary">source de stress</strong> (des dizaines de tabs ouvertes jamais lues).

<strong class="font-bold text-primary">Solution :</strong> Un système de veille structuré et régulier.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Centraliser les sources</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Agrégateurs RSS</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Feedly</strong> : Regroupe blogs, docs officielles, YouTube</li>
  <li class="ml-4"><strong class="font-bold text-primary">Inoreader</strong> : Plus avancé (filtres, rules)</li>
  <li class="ml-4"><strong class="font-bold text-primary">NewsBlur</strong> : Open source, auto-hébergeable</li>
</ul>

<strong class="font-bold text-primary">Exemple de flux RSS à suivre :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">dev.to/feed</li>
  <li class="ml-4">css-tricks.com/feed</li>
  <li class="ml-4">blog.cloudflare.com/rss</li>
  <li class="ml-4">github.blog/feed</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Newsletters tech</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">TLDR</strong> : Résumé quotidien (tech, dev, crypto, IA)</li>
  <li class="ml-4"><strong class="font-bold text-primary">JavaScript Weekly</strong> : Actus JS</li>
  <li class="ml-4"><strong class="font-bold text-primary">DevOps Weekly</strong> : Outils et pratiques DevOps</li>
  <li class="ml-4"><strong class="font-bold text-primary">Hacker Newsletter</strong> : Top posts de Hacker News</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Réseaux sociaux</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Twitter/X</strong> : Crée des listes (ex: "Frontend devs")</li>
  <li class="ml-4"><strong class="font-bold text-primary">Reddit</strong> : r/programming, r/webdev, r/devops</li>
  <li class="ml-4"><strong class="font-bold text-primary">LinkedIn</strong> : Suis des experts (Kent C. Dodds, Dan Abramov...)</li>
  <li class="ml-4"><strong class="font-bold text-primary">YouTube</strong> : Fireship, Theo, Traversy Media</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Structurer par catégories</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Crée des catégories claires</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Frontend</strong> : React, Vue, CSS, UI/UX</li>
  <li class="ml-4"><strong class="font-bold text-primary">Backend</strong> : Node.js, APIs, databases</li>
  <li class="ml-4"><strong class="font-bold text-primary">DevOps</strong> : Docker, CI/CD, Kubernetes</li>
  <li class="ml-4"><strong class="font-bold text-primary">Outils</strong> : VS Code, Git, CLI tools</li>
  <li class="ml-4"><strong class="font-bold text-primary">Sécurité</strong> : Vulnérabilités, best practices</li>
  <li class="ml-4"><strong class="font-bold text-primary">IA/ML</strong> : ChatGPT, GitHub Copilot, trends</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Outils de sauvegarde</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Notion</strong> : Database de liens avec tags</li>
  <li class="ml-4"><strong class="font-bold text-primary">Raindrop.io</strong> : Bookmarks organisés</li>
  <li class="ml-4"><strong class="font-bold text-primary">Pocket</strong> : Read-it-later simple</li>
  <li class="ml-4"><strong class="font-bold text-primary">Obsidian</strong> : Notes connectées (second brain)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Planifier sa veille (time-boxing)</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Créneau fixe hebdomadaire</h3>

<strong class="font-bold text-primary">Exemple :</strong> Vendredi matin, 9h-9h30.

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Parcourir Feedly (10 min)</li>
  <li class="ml-4">Lire 2-3 articles marqués (15 min)</li>
  <li class="ml-4">Sauvegarder dans Notion (5 min)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Veille passive</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Podcasts en voiture/transports (Syntax.fm, Changelog)</li>
  <li class="ml-4">Vidéos YouTube pendant la pause déj (Fireship, ThePrimeagen)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Filtrer l'essentiel</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Règle des 3 filtres</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Est-ce actionable ?</strong> (Puis-je l'appliquer maintenant ?)</li>
  <li class="ml-4"><strong class="font-bold text-primary">Est-ce pertinent ?</strong> (Lié à mes projets/stack ?)</li>
  <li class="ml-4"><strong class="font-bold text-primary">Est-ce vérifié ?</strong> (Source fiable ?)</li>
</ul>

Si <strong class="font-bold text-primary">NON</strong> aux 3 → skip.

<h3 class="text-xl font-bold mt-6 mb-3">Éviter le FOMO</h3>

<strong class="font-bold text-primary">Tu ne peux PAS tout suivre.</strong>

Plutôt que de tout lire, focus sur <strong class="font-bold text-primary">ta stack principale</strong> + 1-2 technologies émergentes.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Apprendre par la pratique</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Learn in public</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Écrire un thread Twitter/X</strong> : Explique ce que tu as appris</li>
  <li class="ml-4"><strong class="font-bold text-primary">Publier un article de blog</strong> : Résumé + exemples</li>
  <li class="ml-4"><strong class="font-bold text-primary">Créer un mini-projet</strong> : Test the new tool/framework</li>
</ul>

<strong class="font-bold text-primary">Principe :</strong> Ce qu'on explique, on le retient 3x mieux.

<h3 class="text-xl font-bold mt-6 mb-3">Veille collaborative</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Crée un channel Slack/Discord avec ton équipe</li>
  <li class="ml-4">Chacun partage 1-2 liens par semaine</li>
  <li class="ml-4">Revue hebdo : "Cette semaine j'ai appris..."</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Exemple de workflow complet</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Lundi matin (5 min)</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Lire newsletter TLDR</li>
  <li class="ml-4">Marquer 2-3 articles intéressants</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Mercredi pause (10 min)</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Lire 1 article marqué</li>
  <li class="ml-4">Prendre 3 notes dans Notion</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Vendredi aprèm (30 min)</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Feedly : parcourir les flux (15 min)</li>
  <li class="ml-4">Lire 1 article technique complet (10 min)</li>
  <li class="ml-4">Tester un outil/lib (5 min)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

Une bonne veille = <strong class="font-bold text-primary">régularité + filtrage</strong>.

Les 3 règles d'or :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Centralise (Feedly + newsletters)</li>
  <li class="ml-4">Planifie (créneau fixe hebdo)</li>
  <li class="ml-4">Partage (learn in public)</li>
</ul>

> "Mieux vaut 30 minutes par semaine que 3 heures de binge-reading le dimanche soir." 📚
    `
  },
  { 
    id: '23', 
    title: 'Améliorer sa productivité avec des scripts Bash simples', 
    category: 'tools',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Automatiser les tâches répétitives</h2>

Tu tapes les <strong class="font-bold text-primary">mêmes commandes</strong> tous les jours ?

Exemples :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">rm -rf node_modules && npm install</li>
  <li class="ml-4">git add . && git commit -m "fix" && git push</li>
  <li class="ml-4">docker stop \$(docker ps -q)</li>
</ul>

Plutôt que de les retaper, <strong class="font-bold text-primary">automatise avec Bash</strong>.

<strong class="font-bold text-primary">Bash</strong> = Le langage de scripting Unix/Linux (aussi dispo sur macOS et Windows via Git Bash/WSL).

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Script 1 : Nettoyer un projet Node.js</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Problème</h3>

Node_modules corrompu ? Besoin de réinstaller les deps proprement ?

<h3 class="text-xl font-bold mt-6 mb-3">Script : clean.sh</h3>

\`\`\`bash
#!/bin/bash
echo "🧹 Nettoyage en cours..."

rm -rf node_modules
rm -rf package-lock.json

echo "📦 Réinstallation des dépendances..."
npm install

echo "✅ Terminé !"
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Utilisation</h3>

\`\`\`bash
chmod +x clean.sh
./clean.sh
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Script 2 : Déploiement rapide (Git)</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Problème</h3>

Taper git add, commit, push à chaque fois = chronophage.

<h3 class="text-xl font-bold mt-6 mb-3">Script : deploy.sh</h3>

\`\`\`bash
#!/bin/bash

if [ -z "$1" ]; then
  echo "⚠️  Usage: ./deploy.sh \\"commit message\\""
  exit 1
fi

echo "🚀 Déploiement en cours..."

git add .
git commit -m "$1"
git push origin main

echo "✅ Poussé sur main !"
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Utilisation</h3>

\`\`\`bash
./deploy.sh "fix: corrige le bug de login"
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Script 3 : Sauvegarde automatique</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Problème</h3>

Tu veux sauvegarder tes projets régulièrement.

<h3 class="text-xl font-bold mt-6 mb-3">Script : backup.sh</h3>

\`\`\`bash
#!/bin/bash
DATE=\$(date +%F)
BACKUP_DIR=~/backups

mkdir -p \$BACKUP_DIR

echo "💾 Sauvegarde du dossier ~/projects..."

tar -czvf \$BACKUP_DIR/backup_\$DATE.tar.gz ~/projects

echo "✅ Sauvegarde créée : \$BACKUP_DIR/backup_\$DATE.tar.gz"
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Automatisation (cron)</h3>

Lance ce script tous les jours à 23h :

\`\`\`bash
crontab -e

# Ajoute cette ligne :
0 23 * * * ~/bin/backup.sh
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Script 4 : Tuer tous les containers Docker</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Problème</h3>

Plein de containers qui tournent, tu veux tout stopper.

<h3 class="text-xl font-bold mt-6 mb-3">Script : docker-clean.sh</h3>

\`\`\`bash
#!/bin/bash
echo "🐳 Arrêt de tous les containers..."

docker stop \$(docker ps -q)

echo "🧹 Suppression des containers arrêtés..."

docker container prune -f

echo "✅ Nettoyage terminé !"
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Rendre tes scripts accessibles partout</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Étape 1 : Crée un dossier ~/bin</h3>

\`\`\`bash
mkdir -p ~/bin
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Étape 2 : Ajoute ~/bin au PATH</h3>

Dans <strong class="font-bold text-primary">~/.bashrc</strong> ou <strong class="font-bold text-primary">~/.zshrc</strong> :

\`\`\`bash
export PATH="$HOME/bin:$PATH"
\`\`\`

Recharge :

\`\`\`bash
source ~/.bashrc
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Étape 3 : Place tes scripts dans ~/bin</h3>

\`\`\`bash
mv deploy.sh ~/bin/deploy
chmod +x ~/bin/deploy
\`\`\`

Maintenant tu peux lancer <strong class="font-bold text-primary">deploy</strong> depuis n'importe où !

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Bonnes pratiques Bash</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ <strong class="font-bold text-primary">Shebang</strong> : Toujours commencer par #!/bin/bash</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Vérifier les arguments</strong> : if [ -z "$1" ]</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Quotes</strong> : Utilise "$VAR" au lieu de \$VAR</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Exit codes</strong> : exit 1 en cas d'erreur</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">set -e</strong> : Arrête le script si une commande échoue</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

Quelques scripts Bash = <strong class="font-bold text-primary">des heures gagnées</strong>.

Les 3 use cases principaux :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Nettoyage/installation (clean.sh)</li>
  <li class="ml-4">Déploiement rapide (deploy.sh)</li>
  <li class="ml-4">Automatisation récurrente (backup.sh + cron)</li>
</ul>

> "Le meilleur code est celui qu'on n'écrit qu'une fois." ⚙️
    `
  },
  { 
    id: '24', 
    title: 'Écrire une documentation claire en Markdown (README, Wiki, etc.)', 
    category: 'tools',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Le langage universel de la doc</h2>

<strong class="font-bold text-primary">Markdown</strong> est LE format pour écrire de la documentation : README, wikis, blogs, changelogs, issues GitHub...

<strong class="font-bold text-primary">Pourquoi Markdown ?</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Lisible même en texte brut</li>
  <li class="ml-4">Compatible partout (GitHub, GitLab, Notion, Discord...)</li>
  <li class="ml-4">Versionnable avec Git</li>
  <li class="ml-4">Convertible en HTML/PDF</li>
  <li class="ml-4">Rapide à écrire (pas de boutons, juste du texte)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Syntaxe essentielle</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Titres</h3>

\`\`\`markdown
# H1 - Titre principal
## H2 - Section
### H3 - Sous-section
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Formatage texte</h3>

\`\`\`markdown
**gras** ou __gras__
*italique* ou _italique_
~~barré~~
\`code inline\`
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Listes</h3>

\`\`\`markdown
- Liste non ordonnée
- Item 2
  - Sous-item

1. Liste ordonnée
2. Item 2
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Liens et images</h3>

\`\`\`markdown
[Texte du lien](https://example.com)
![Alt text](image.png)
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Code blocks</h3>

\\\`\\\`\\\`javascript
const hello = () => {
  console.log("Hello!");
};
\\\`\\\`\\\`

<h3 class="text-xl font-bold mt-6 mb-3">Citations</h3>

\`\`\`markdown
> Ceci est une citation
> Sur plusieurs lignes
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Tableaux</h3>

\`\`\`markdown
| Colonne 1 | Colonne 2 |
|-----------|-----------|
| Data 1    | Data 2    |
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Structure d'un bon README</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Template recommandé</h3>

\`\`\`markdown
# Nom du Projet

Description courte et claire du projet.

## 🚀 Installation

\\\`\\\`\\\`bash
npm install
npm start
\\\`\\\`\\\`

## 📖 Utilisation

Exemples de code...

## ✨ Features

- Feature 1
- Feature 2

## 🛠️ Stack technique

- React 18
- TypeScript
- Tailwind CSS

## 🤝 Contributing

Pull requests welcome!

## 📝 License

MIT
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Bonnes pratiques</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ <strong class="font-bold text-primary">Titre clair</strong> : # Mon Projet</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Table des matières</strong> pour docs longues</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Screenshots</strong> ou GIFs pour visualiser</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Exemples de code</strong> concrets</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Badges</strong> (build status, version...)</li>
  <li class="ml-4">✅ <strong class="font-bold text-primary">Liens vers docs</strong> détaillées si besoin</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Outils et extensions</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Éditeurs</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">VS Code</strong> : Preview intégré (Cmd+Shift+V)</li>
  <li class="ml-4"><strong class="font-bold text-primary">Obsidian</strong> : Notes liées (second brain)</li>
  <li class="ml-4"><strong class="font-bold text-primary">Typora</strong> : WYSIWYG Markdown</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Générateurs de docs</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">MkDocs</strong> : Site statique depuis Markdown</li>
  <li class="ml-4"><strong class="font-bold text-primary">Docusaurus</strong> : Docs React (Meta)</li>
  <li class="ml-4"><strong class="font-bold text-primary">VitePress</strong> : Docs Vue/Vite</li>
  <li class="ml-4"><strong class="font-bold text-primary">GitBook</strong> : Plateforme hébergée</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Extensions VS Code</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Markdown All in One</strong> : Shortcuts, TOC auto, preview</li>
  <li class="ml-4"><strong class="font-bold text-primary">markdownlint</strong> : Linting Markdown</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Markdown avancé (GitHub Flavored)</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Task lists</h3>

\`\`\`markdown
- [x] Tâche terminée
- [ ] Tâche en cours
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Alerts/Admonitions</h3>

Sur GitHub :

\`\`\`markdown
> [!NOTE]
> Useful information

> [!WARNING]
> Critical warning
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Mermaid diagrams</h3>

\`\`\`markdown
\\\`\\\`\\\`mermaid
graph TD
  A[Start] --> B[Process]
  B --> C[End]
\\\`\\\`\\\`
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

Markdown = <strong class="font-bold text-primary">communication efficace</strong> sans complexité.

<strong class="font-bold text-primary">Les 3 règles d'or :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Simple et clair</li>
  <li class="ml-4">Exemples concrets</li>
  <li class="ml-4">Structure logique</li>
</ul>

> "Une bonne doc vaut mille meetings." 📚
    `
  },
  { 
    id: '25', 
    title: 'Utiliser GitHub Projects pour gérer ses side projects', 
    category: 'tools',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Gestion de projet native GitHub</h2>

<strong class="font-bold text-primary">GitHub Projects</strong> = Kanban/Roadmap intégré directement dans GitHub.

<strong class="font-bold text-primary">Avantages :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Pas besoin de Trello/Jira/Notion séparé</li>
  <li class="ml-4">Issues et PRs synchronisés automatiquement</li>
  <li class="ml-4">Gratuit pour repos publics ET privés</li>
  <li class="ml-4">Automatisations intégrées</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Créer un projet</h2>

<strong class="font-bold text-primary">Étapes :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Onglet "Projects" dans ton repo</li>
  <li class="ml-4">"New project" → Choisir template (Board, Table, Roadmap)</li>
  <li class="ml-4">Personnaliser les colonnes</li>
</ul>

<strong class="font-bold text-primary">Templates disponibles :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Board</strong> : Kanban classique (To Do, In Progress, Done)</li>
  <li class="ml-4"><strong class="font-bold text-primary">Table</strong> : Vue spreadsheet (filtres, tri)</li>
  <li class="ml-4"><strong class="font-bold text-primary">Roadmap</strong> : Timeline avec dates</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Ajouter des items</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Issues existantes</h3>

Drag & drop depuis la liste d'issues.

<h3 class="text-xl font-bold mt-6 mb-3">Draft items</h3>

Crée des notes rapides (converties en issues plus tard).

<h3 class="text-xl font-bold mt-6 mb-3">Pull Requests</h3>

Les PRs apparaissent automatiquement si liées à une issue.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Custom fields</h2>

Ajoute des champs personnalisés :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Priority</strong> : High, Medium, Low</li>
  <li class="ml-4"><strong class="font-bold text-primary">Size</strong> : Small, Medium, Large</li>
  <li class="ml-4"><strong class="font-bold text-primary">Sprint</strong> : Sprint 1, Sprint 2...</li>
  <li class="ml-4"><strong class="font-bold text-primary">Assignee</strong> : Qui travaille dessus</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Automatisations</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Built-in workflows</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Issue ouverte → Auto-add à "To Do"</li>
  <li class="ml-4">PR mergée → Move to "Done"</li>
  <li class="ml-4">Issue fermée → Archive automatiquement</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">GitHub Actions</h3>

Automatise avec des workflows :

\`\`\`yaml
name: Add to Project
on:
  issues:
    types: [opened]
jobs:
  add-to-project:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/add-to-project@v0.5.0
        with:
          project-url: https://github.com/users/USER/projects/1
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Labels et filtres</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Labels recommandés</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">feature</strong> 🟢 : Nouvelle fonctionnalité</li>
  <li class="ml-4"><strong class="font-bold text-primary">bug</strong> 🔴 : Correction de bug</li>
  <li class="ml-4"><strong class="font-bold text-primary">docs</strong> 📘 : Documentation</li>
  <li class="ml-4"><strong class="font-bold text-primary">refactor</strong> ♻️ : Code cleanup</li>
  <li class="ml-4"><strong class="font-bold text-primary">urgent</strong> 🚨 : Priorité haute</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Filtres puissants</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">label:bug status:"In Progress"</li>
  <li class="ml-4">assignee:@me</li>
  <li class="ml-4">is:open is:pr</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Vues multiples</h2>

Crée plusieurs vues du même projet :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Vue Kanban</strong> : Pour workflow quotidien</li>
  <li class="ml-4"><strong class="font-bold text-primary">Vue Table</strong> : Pour tri/filtrage avancé</li>
  <li class="ml-4"><strong class="font-bold text-primary">Vue Roadmap</strong> : Pour planification long terme</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

GitHub Projects = <strong class="font-bold text-primary">Jira simplifié</strong>, parfait pour side projects et petites équipes.

<strong class="font-bold text-primary">Best practices :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Une issue = une tâche claire</li>
  <li class="ml-4">Labels cohérents</li>
  <li class="ml-4">Automatise tout ce qui peut l'être</li>
</ul>

> "La meilleure gestion de projet est celle qu'on utilise vraiment." 📋
    `
  },
  { 
    id: '26', 
    title: 'Créer un setup de terminal productif (Oh My Zsh, Starship, aliases…)', 
    category: 'tools',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Le terminal, ton QG quotidien</h2>

Tu passes <strong class="font-bold text-primary">des heures par jour</strong> dans le terminal. Autant le rendre rapide, beau et efficace.

<strong class="font-bold text-primary">Objectifs :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Navigation ultra-rapide</li>
  <li class="ml-4">Autocomplétion intelligente</li>
  <li class="ml-4">Prompt informatif mais minimaliste</li>
  <li class="ml-4">Aliases pour commandes fréquentes</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Choisir son shell</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Bash vs Zsh</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Bash</strong> : Par défaut sur Linux, stable</li>
  <li class="ml-4"><strong class="font-bold text-primary">Zsh</strong> : Plus moderne, meilleure autocomplétion, thèmes</li>
</ul>

<strong class="font-bold text-primary">Recommandation :</strong> Zsh (défaut macOS depuis Catalina).

Installer Zsh :
\`\`\`bash
# macOS
brew install zsh

# Linux
sudo apt install zsh

# Définir comme shell par défaut
chsh -s $(which zsh)
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Oh My Zsh (framework Zsh)</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Installation</h3>

\`\`\`bash
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Plugins essentiels</h3>

Dans <strong class="font-bold text-primary">~/.zshrc</strong> :

\`\`\`bash
plugins=(
  git
  z
  zsh-autosuggestions
  zsh-syntax-highlighting
  docker
  npm
)
\`\`\`

<strong class="font-bold text-primary">Description :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">git</strong> : Aliases (gst, gco, gpl...)</li>
  <li class="ml-4"><strong class="font-bold text-primary">z</strong> : Jump to frequent dirs (z my-project)</li>
  <li class="ml-4"><strong class="font-bold text-primary">autosuggestions</strong> : Suggestions basées sur historique</li>
  <li class="ml-4"><strong class="font-bold text-primary">syntax-highlighting</strong> : Coloration commandes</li>
</ul>

Installer plugins externes :
\`\`\`bash
git clone https://github.com/zsh-users/zsh-autosuggestions \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Starship Prompt</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Installation</h3>

\`\`\`bash
curl -sS https://starship.rs/install.sh | sh
\`\`\`

Ajoute à <strong class="font-bold text-primary">~/.zshrc</strong> :

\`\`\`bash
eval "$(starship init zsh)"
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Pourquoi Starship ?</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Ultra rapide (écrit en Rust)</li>
  <li class="ml-4">Multi-shell (Bash, Zsh, Fish...)</li>
  <li class="ml-4">Affiche : Git branch, Node version, Python env...</li>
  <li class="ml-4">Hautement customisable</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Config personnalisée</h3>

Crée <strong class="font-bold text-primary">~/.config/starship.toml</strong> :

\`\`\`toml
[character]
success_symbol = "[➜](bold green)"
error_symbol = "[✗](bold red)"

[git_branch]
format = "on [$symbol$branch]($style) "
style = "bold purple"
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Aliases puissants</h2>

Dans <strong class="font-bold text-primary">~/.zshrc</strong> ou <strong class="font-bold text-primary">~/.bashrc</strong> :

\`\`\`bash
# Git
alias gs='git status'
alias ga='git add'
alias gc='git commit -m'
alias gp='git push'
alias gl='git log --oneline --graph --decorate'

# Navigation
alias ..='cd ..'
alias ...='cd ../..'
alias ll='ls -lah'

# Docker
alias dps='docker ps'
alias dstop='docker stop $(docker ps -q)'
alias dclean='docker system prune -af'

# Dev
alias serve='python3 -m http.server 8080'
alias weather='curl wttr.in'
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Outils CLI modernes</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">bat</strong> : cat avec syntax highlighting</li>
  <li class="ml-4"><strong class="font-bold text-primary">exa</strong> : ls moderne</li>
  <li class="ml-4"><strong class="font-bold text-primary">fzf</strong> : Fuzzy finder interactif</li>
  <li class="ml-4"><strong class="font-bold text-primary">tldr</strong> : Man pages simplifiées</li>
</ul>

Installer :
\`\`\`bash
brew install bat exa fzf tldr
\`\`\`

Aliases :
\`\`\`bash
alias cat='bat'
alias ls='exa --icons'
alias find='fzf'
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

Un terminal bien configuré = <strong class="font-bold text-primary">gain de vitesse massif</strong>.

<strong class="font-bold text-primary">Setup minimal recommandé :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Zsh + Oh My Zsh</li>
  <li class="ml-4">Starship prompt</li>
  <li class="ml-4">Aliases personnalisés</li>
  <li class="ml-4">fzf + bat + exa</li>
</ul>

> "Le terminal n'est pas un obstacle, c'est un accélérateur." ⚡
    `
  },
  { 
    id: '27', 
    title: 'Gérer ses secrets et clés API en local sans risque', 
    category: 'tools',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Ne JAMAIS commit de secrets</h2>

Mettre ses clés API dans un repo public est une <strong class="font-bold text-primary">erreur fatale</strong>.

<strong class="font-bold text-primary">Risques :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Compromission de compte (factures AWS astronomiques)</li>
  <li class="ml-4">Accès non autorisé aux données clients</li>
  <li class="ml-4">Scanners automatiques cherchent les secrets sur GitHub</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Fichiers .env</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Créer .env</h3>

\`\`\`bash
# .env
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
JWT_SECRET=super-secret-key-change-me
API_KEY=abcd1234efgh5678
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Ajouter au .gitignore</h3>

\`\`\`bash
# .gitignore
.env
.env.local
.env.*.local
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Créer .env.example</h3>

Template public pour l'équipe :

\`\`\`bash
# .env.example
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
STRIPE_SECRET_KEY=sk_test_your_key_here
JWT_SECRET=change-me
API_KEY=your-api-key
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Utiliser les variables d'env</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Node.js</h3>

\`\`\`javascript
// Installer dotenv
npm install dotenv

// app.js
require('dotenv').config();

const apiKey = process.env.API_KEY;
const dbUrl = process.env.DATABASE_URL;
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Python</h3>

\`\`\`python
# Installer python-dotenv
pip install python-dotenv

# app.py
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv('API_KEY')
db_url = os.getenv('DATABASE_URL')
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">React/Vite</h3>

Préfixe <strong class="font-bold text-primary">VITE_</strong> obligatoire :

\`\`\`bash
# .env
VITE_API_URL=https://api.example.com
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
\`\`\`

\`\`\`javascript
// src/config.ts
export const API_URL = import.meta.env.VITE_API_URL;
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ GitHub Secrets (CI/CD)</h2>

Pour les workflows GitHub Actions :

<strong class="font-bold text-primary">Étapes :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Repo → Settings → Secrets and variables → Actions</li>
  <li class="ml-4">New repository secret</li>
  <li class="ml-4">Nom : <strong class="font-bold text-primary">AWS_ACCESS_KEY_ID</strong></li>
  <li class="ml-4">Valeur : ta clé secrète</li>
</ul>

Utilisation dans workflow :

\`\`\`yaml
name: Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to AWS
        env:
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: aws s3 sync ./build s3://my-bucket
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ HashiCorp Vault (équipes)</h2>

Pour gestion centralisée des secrets en production.

<h3 class="text-xl font-bold mt-6 mb-3">Installation</h3>

\`\`\`bash
# macOS
brew tap hashicorp/tap
brew install hashicorp/tap/vault

# Démarrer serveur dev
vault server -dev
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Stocker un secret</h3>

\`\`\`bash
vault kv put secret/myapp/config api_key=abc123 db_password=secret
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Lire un secret</h3>

\`\`\`bash
vault kv get secret/myapp/config
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Bonnes pratiques</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Rotation régulière</strong> : Change API keys tous les 90 jours</li>
  <li class="ml-4"><strong class="font-bold text-primary">Scopes minimaux</strong> : Donne permissions strictement nécessaires</li>
  <li class="ml-4"><strong class="font-bold text-primary">Secrets différents par env</strong> : Dev ≠ Staging ≠ Production</li>
  <li class="ml-4"><strong class="font-bold text-primary">Audit logs</strong> : Trace qui accède aux secrets</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

La gestion de secrets = <strong class="font-bold text-primary">sécurité 101</strong>.

<strong class="font-bold text-primary">Checklist :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ .env dans .gitignore</li>
  <li class="ml-4">✅ .env.example committé</li>
  <li class="ml-4">✅ GitHub Secrets pour CI/CD</li>
  <li class="ml-4">✅ Rotation régulière des clés</li>
</ul>

> "Un secret committé est un secret compromis." 🔐
    `
  },
  { 
    id: '28', 
    title: 'Optimiser ses builds avec Makefile ou Taskfile', 
    category: 'tools',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Automatiser sans se répéter</h2>

Tu tapes les mêmes commandes longues tous les jours ? <strong class="font-bold text-primary">Makefile ou Taskfile</strong> = ton interface CLI centralisée.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Makefile (classique Unix)</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Créer Makefile</h3>

\`\`\`makefile
# Makefile
.PHONY: install dev build test clean deploy

install:
	npm install

dev:
	npm run dev

build:
	npm run build

test:
	npm test

clean:
	rm -rf node_modules dist

deploy:
	npm run build
	aws s3 sync ./dist s3://my-bucket
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Utilisation</h3>

\`\`\`bash
make install
make dev
make deploy    # build + deploy S3
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Variables</h3>

\`\`\`makefile
ENV ?= dev
REGION := us-east-1

deploy:
	@echo "Deploying to \$(ENV) in \$(REGION)"
	aws s3 sync ./dist s3://my-bucket-\$(ENV)
\`\`\`

Usage : <strong class="font-bold text-primary">make deploy ENV=prod</strong>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Taskfile (moderne, multi-OS)</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Installation</h3>

\`\`\`bash
# macOS
brew install go-task/tap/go-task

# Linux
sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Créer Taskfile.yml</h3>

\`\`\`yaml
# Taskfile.yml
version: '3'

tasks:
  install:
    desc: Install dependencies
    cmds:
      - npm install

  dev:
    desc: Start dev server
    cmds:
      - npm run dev

  build:
    desc: Build for production
    cmds:
      - npm run build

  deploy:
    desc: Deploy to S3
    deps: [build]
    cmds:
      - aws s3 sync ./dist s3://my-bucket
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Utilisation</h3>

\`\`\`bash
task install
task dev
task deploy    # Auto-build avant deploy
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Tâches avancées</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Docker workflow</h3>

\`\`\`yaml
tasks:
  docker:build:
    desc: Build Docker image
    cmds:
      - docker build -t myapp:latest .

  docker:run:
    desc: Run container
    cmds:
      - docker run -p 3000:3000 myapp:latest
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Lint + format</h3>

\`\`\`yaml
tasks:
  lint:
    desc: Lint code
    cmds:
      - eslint . --ext .ts,.tsx

  format:
    desc: Format code
    cmds:
      - prettier --write "src/**/*.{ts,tsx}"

  check:
    desc: Run all checks
    deps: [lint, test]
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Makefile vs Taskfile</h2>

<strong class="font-bold text-primary">Makefile :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ Présent partout (Linux/macOS)</li>
  <li class="ml-4">✅ Syntaxe classique connue</li>
  <li class="ml-4">❌ Tabs obligatoires (source d'erreurs)</li>
  <li class="ml-4">❌ Moins lisible pour débutants</li>
</ul>

<strong class="font-bold text-primary">Taskfile :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ YAML (plus lisible)</li>
  <li class="ml-4">✅ Multi-OS (Windows, Linux, macOS)</li>
  <li class="ml-4">✅ Variables et templating puissant</li>
  <li class="ml-4">❌ Installation requise</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

Make/Taskfile = <strong class="font-bold text-primary">interface unifiée</strong> pour ton projet.

<strong class="font-bold text-primary">Recommandation :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Projet simple : npm scripts</li>
  <li class="ml-4">Multi-langages : Taskfile</li>
  <li class="ml-4">Legacy/Unix : Makefile</li>
</ul>

> "La meilleure commande est celle qu'on n'a pas à retaper." ⚙️
    `
  },
  { 
    id: '29', 
    title: 'Sauvegarder et synchroniser sa config de dev entre machines', 
    category: 'tools',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Ton environnement partout</h2>

Rien de plus frustrant que de changer de machine et <strong class="font-bold text-primary">perdre toutes ses configs</strong>.

<strong class="font-bold text-primary">Objectif :</strong> Nouveau laptop = environnement prêt en 10 minutes.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Dotfiles avec Git</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Créer repo dotfiles</h3>

\`\`\`bash
cd ~
mkdir dotfiles && cd dotfiles
git init

# Copier configs importantes
cp ~/.zshrc .
cp ~/.gitconfig .
cp ~/.vimrc .

git add .
git commit -m "Initial dotfiles"
git remote add origin https://github.com/user/dotfiles
git push -u origin main
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Installer sur nouvelle machine</h3>

\`\`\`bash
git clone https://github.com/user/dotfiles ~/dotfiles
cd ~/dotfiles

# Créer liens symboliques
ln -s ~/dotfiles/.zshrc ~/.zshrc
ln -s ~/dotfiles/.gitconfig ~/.gitconfig
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ GNU Stow (automatisation)</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Structure dotfiles</h3>

\`\`\`bash
~/dotfiles/
  zsh/
    .zshrc
  git/
    .gitconfig
  vim/
    .vimrc
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Utilisation</h3>

\`\`\`bash
# Installer Stow
brew install stow

# Créer liens automatiquement
cd ~/dotfiles
stow zsh    # Crée ~/.zshrc
stow git    # Crée ~/.gitconfig
stow vim    # Crée ~/.vimrc
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ chezmoi (multi-machines)</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Installation</h3>

\`\`\`bash
brew install chezmoi

# Initialiser avec repo existant
chezmoi init https://github.com/user/dotfiles

# Voir changements
chezmoi diff

# Appliquer
chezmoi apply
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Avantages chezmoi</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Templates (configs différentes par machine)</li>
  <li class="ml-4">Secrets chiffrés</li>
  <li class="ml-4">Scripts d'installation</li>
  <li class="ml-4">Update auto depuis GitHub</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ VS Code Settings Sync</h2>

<strong class="font-bold text-primary">Synchronise automatiquement :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Extensions</li>
  <li class="ml-4">Settings</li>
  <li class="ml-4">Keybindings</li>
  <li class="ml-4">Snippets</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Activation</h3>

1. Cmd/Ctrl + Shift + P → "Settings Sync: Turn On"
2. Se connecter avec GitHub
3. ✅ Sync automatique !

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Script d'installation complet</h2>

\`\`\`bash
#!/bin/bash
# install.sh

# Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Outils CLI
brew install git zsh starship fzf bat exa

# Dotfiles
git clone https://github.com/user/dotfiles ~/dotfiles
cd ~/dotfiles && stow zsh git

# Oh My Zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

echo "✅ Setup complete!"
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Fichiers à sauvegarder</h2>

<strong class="font-bold text-primary">Essentiels :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">.zshrc / .bashrc</li>
  <li class="ml-4">.gitconfig</li>
  <li class="ml-4">.vimrc / .nvimrc</li>
  <li class="ml-4">.ssh/config</li>
</ul>

<strong class="font-bold text-primary">Optionnels :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">~/.config/starship.toml</li>
  <li class="ml-4">~/. aws/config</li>
  <li class="ml-4">Brewfile (liste packages Homebrew)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

Sauvegarder sa config = <strong class="font-bold text-primary">assurance tranquillité</strong>.

<strong class="font-bold text-primary">Workflow recommandé :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Dotfiles → Git + Stow</li>
  <li class="ml-4">VS Code → Settings Sync</li>
  <li class="ml-4">Script install.sh pour nouveau laptop</li>
</ul>

> "Chaque machine devientt chez toi en 10 minutes." 🏠
    `
  },
  { 
    id: '30', 
    title: 'Découvrir des outils CLI méconnus qui simplifient la vie (fzf, bat, exa, tldr…)', 
    category: 'tools',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Moderniser ta CLI</h2>

La CLI regorge de <strong class="font-bold text-primary">petites perles méconnues</strong> qui accélèrent ton quotidien.

<strong class="font-bold text-primary">Objectif :</strong> Remplacer les commandes Unix classiques par versions modernes.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ fzf – Fuzzy Finder</h2>

<strong class="font-bold text-primary">Recherche floue interactive</strong> dans historique, fichiers, processus...

<h3 class="text-xl font-bold mt-6 mb-3">Installation</h3>

\`\`\`bash
brew install fzf

# Keybindings (Ctrl+R pour historique)
$(brew --prefix)/opt/fzf/install
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Utilisation</h3>

\`\`\`bash
# Recherche fichier
vim $(fzf)

# Recherche dans historique
Ctrl + R

# CD interactif
cd $(find . -type d | fzf)
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ bat – cat avec syntax highlighting</h2>

<strong class="font-bold text-primary">cat</strong> avec coloration syntaxique et numérotation.

<h3 class="text-xl font-bold mt-6 mb-3">Installation</h3>

\`\`\`bash
brew install bat

# Alias
alias cat='bat'
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Exemple</h3>

\`\`\`bash
bat src/app.ts    # Syntax highlighting automatique
bat --theme=GitHub src/app.ts
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ exa – ls moderne</h2>

<strong class="font-bold text-primary">ls</strong> avec couleurs, icônes et infos Git.

<h3 class="text-xl font-bold mt-6 mb-3">Installation</h3>

\`\`\`bash
brew install exa

# Aliases
alias ls='exa --icons'
alias ll='exa -lah --icons --git'
alias tree='exa --tree --icons'
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Exemple</h3>

\`\`\`bash
exa -lah --git    # Liste + statuts Git
exa --tree        # Arborescence
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ tldr – Man pages simplifiées</h2>

<strong class="font-bold text-primary">man</strong> mais en version ultra-condensée avec exemples.

<h3 class="text-xl font-bold mt-6 mb-3">Installation</h3>

\`\`\`bash
brew install tldr
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Exemple</h3>

\`\`\`bash
tldr tar    # Exemples rapides de tar
tldr git
tldr docker
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ ripgrep (rg) – grep ultra-rapide</h2>

<strong class="font-bold text-primary">grep</strong> mais <strong class="font-bold text-primary">10x plus rapide</strong>, ignore .gitignore automatiquement.

<h3 class="text-xl font-bold mt-6 mb-3">Installation</h3>

\`\`\`bash
brew install ripgrep
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Exemple</h3>

\`\`\`bash
rg "useState" src/    # Cherche dans src/
rg -i "api" .         # Case insensitive
rg -t ts "interface"  # Uniquement fichiers TypeScript
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ httpie – curl ergonomique</h2>

<strong class="font-bold text-primary">curl</strong> mais avec syntaxe lisible et JSON coloré.

<h3 class="text-xl font-bold mt-6 mb-3">Installation</h3>

\`\`\`bash
brew install httpie
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Exemple</h3>

\`\`\`bash
# GET
http https://api.github.com/users/octocat

# POST JSON
http POST https://api.example.com/users name=John email=john@example.com

# Headers
http GET https://api.example.com Authorization:"Bearer token123"
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">7️⃣ htop – top visuel</h2>

<strong class="font-bold text-primary">top</strong> avec interface colorée et interactive.

<h3 class="text-xl font-bold mt-6 mb-3">Installation</h3>

\`\`\`bash
brew install htop
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Utilisation</h3>

\`\`\`bash
htop    # Interface interactive (F9 pour kill, F6 pour trier)
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">8️⃣ ncdu – analyseur d'espace disque</h2>

<strong class="font-bold text-primary">du</strong> mais visuel et navigable.

<h3 class="text-xl font-bold mt-6 mb-3">Installation</h3>

\`\`\`bash
brew install ncdu
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Utilisation</h3>

\`\`\`bash
ncdu /    # Analyse espace disque
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">9️⃣ Installer tout en une commande</h2>

\`\`\`bash
brew install fzf bat exa tldr ripgrep httpie htop ncdu
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🔟 Aliases recommandés</h2>

Dans <strong class="font-bold text-primary">~/.zshrc</strong> :

\`\`\`bash
# Remplacements modernes
alias cat='bat'
alias ls='exa --icons'
alias ll='exa -lah --icons --git'
alias tree='exa --tree --icons'
alias grep='rg'
alias top='htop'
alias du='ncdu'
alias curl='http'

# Helpers
alias preview='fzf --preview "bat --color=always {}"'
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

Ces outils n'ont pas d'interface graphique, mais offrent <strong class="font-bold text-primary">vitesse et précision incomparables</strong>.

<strong class="font-bold text-primary">Must-have :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">fzf : Navigation fichiers</li>
  <li class="ml-4">bat : Lecture code</li>
  <li class="ml-4">exa : Listing fichiers</li>
  <li class="ml-4">ripgrep : Recherche code</li>
</ul>

> "La CLI moderne est plus rapide que n'importe quel GUI." ⚡
    `
  },
  {
    id: '31',
    title: 'Figma pour développeurs : maquettes et design systems',
    category: 'tools',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Figma n'est pas que pour les designers</h2>

<strong class="font-bold text-primary">Figma</strong> est l'outil de design collaboratif par excellence. En tant que dev, comprendre Figma =  meilleure collaboration avec les designers.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎨 Fonctionnalités clés pour devs</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Inspect Mode</h3>

<ul class="my-4 list-disc pl-6">
<li class="ml-4">Voir les CSS/spacing exacts</li>
<li class="ml-4">Exporter assets (SVG, PNG)</li>
<li class="ml-4">Copier les couleurs hex/rgba</li>
</ul>
<h3 class="text-xl font-bold mt-6 mb-3">Design Tokens</h3>

Variables de design réutilisables :
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Colors : primary, secondary, accent</li>
<li class="ml-4">Typography : font sizes, weights</li>
<li class="ml-4">Spacing : 4px, 8px, 16px...</li>
</ul>
<h3 class="text-xl font-bold mt-6 mb-3">Components & Variants</h3>

Le designer crée des composants (Button, Card) avec variants (primary, secondary).

<strong class="font-bold text-primary">→ Tu les implémentes de la même façon en code !</strong>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🔗 Figma → Code</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Plugins utiles</h3>

<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Figma to Code</strong> : Génère React/Vue/HTML</li>
<li class="ml-4"><strong class="font-bold text-primary">Anima</strong> : Export responsive code</li>
<li class="ml-4"><strong class="font-bold text-primary">Zeplin</strong> : Handoff design → dev</li>
</ul>
<h3 class="text-xl font-bold mt-6 mb-3">Figma API</h3>

Récupère les design tokens programmatiquement :

\`\`\`javascript
const response = await fetch('https://api.figma.com/v1/files/FILE_KEY', {
  headers: { 'X-Figma-Token': 'YOUR_TOKEN' }
});
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">💡 Collaboration designer-dev</h2>

<strong class="font-bold text-primary">Bonnes pratiques :</strong>

<ul class="my-4 list-disc pl-6">
<li class="ml-4">Commentaires directs sur Figma (comme code review)</li>
<li class="ml-4">Partage de lien avec version spécifique</li>
<li class="ml-4">Design system partagé (Tailwind CSS + Figma)</li>
</ul>
Figma = langage commun entre design et dev ! 🎨
    `
  },
  {
    id: '32',
    title: 'Notion : organiser sa veille et ses projets',
    category: 'tools',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : L'outil tout-en-un</h2>

<strong class="font-bold text-primary">Notion</strong> combine notes, bases de données, wikis et gestion de projet.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">📚 Use cases pour devs</h2>

<h3 class="text-xl font-bold mt-6 mb-3">1. Veille technologique</h3>

Crée une database "Articles à lire" :
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Colonnes : Titre, URL, Catégorie, Statut</li>
<li class="ml-4">Filtre par catégorie (React, DevOps, AI...)</li>
<li class="ml-4">Vue Kanban : À lire / En cours / Lu</li>
</ul>
<h3 class="text-xl font-bold mt-6 mb-3">2. Documentation personnelle</h3>

<ul class="my-4 list-disc pl-6">
<li class="ml-4">Snippets de code réutilisables</li>
<li class="ml-4">Solutions aux erreurs courantes</li>
<li class="ml-4">Commandes Git/Docker mémo</li>
</ul>
<h3 class="text-xl font-bold mt-6 mb-3">3. Gestion de side projects</h3>

Template de projet :
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Idée / Roadmap</li>
<li class="ml-4">Stack technique</li>
<li class="ml-4">TODOs (database avec statuts)</li>
<li class="ml-4">Ressources / Links utiles</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">⚡ Fonctionnalités puissantes</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Blocs de code</h3>

Syntax highlighting pour 50+ langages !

\`\`\`python
def hello():
    print("Hello from Notion!")
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Databases liées</h3>

Une database "Projets" peut référencer une database "Technologies".

<h3 class="text-xl font-bold mt-6 mb-3">Templates</h3>

Crée des templates pour :
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Notes de meeting</li>
<li class="ml-4">Post-mortems d'incidents</li>
<li class="ml-4">Documentation de features</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🔗 Intégrations</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Notion API</strong> : Automatise avec Zapier/n8n</li>
<li class="ml-4"><strong class="font-bold text-primary">Notion Web Clipper</strong> : Sauvegarde articles</li>
<li class="ml-4"><strong class="font-bold text-primary">GitHub sync</strong> : Issues → Notion</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">💡 Setup recommandé</h2>

<strong class="font-bold text-primary">Pages principales :</strong>

<ul class="my-4 list-disc pl-6">
<li class="ml-4">🏠 Dashboard (vue d'ensemble)</li>
<li class="ml-4">📚 Knowledge Base (docs perso)</li>
<li class="ml-4">🚀 Projets (side projects)</li>
<li class="ml-4">📖 Veille (articles/vidéos)</li>
<li class="ml-4">💼 Freelance (clients, factures)</li>
</ul>
Notion = second cerveau pour développeurs ! 🧠
    `
  },
];
