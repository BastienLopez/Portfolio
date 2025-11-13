import { Article } from './types';

export const cultureArticles: Article[] = [
  // 🧠 Culture & Méthodes
    { 
      id: '1', 
      title: 'Comprendre les bases de l\'agilité : Scrum, Kanban, XP', 
      category: 'culture',
      content: `
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Pourquoi l'agilité a révolutionné le développement
</h2>
  
  L'agilité est née d'un constat accablant : <strong class="font-bold text-primary">70% des projets informatiques échouaient</strong> dans les années 90-2000 à cause de méthodes trop rigides (cycle en V, waterfall).
  
  Le <strong class="font-bold text-primary">Manifeste Agile</strong> (2001), créé par 17 développeurs visionnaires, a posé 4 valeurs fondamentales :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Les individus et leurs interactions</strong> > les processus et outils</li>
  <li class="ml-4"><strong class="font-bold text-primary">Un logiciel fonctionnel</strong> > une documentation exhaustive</li>
  <li class="ml-4"><strong class="font-bold text-primary">La collaboration avec le client</strong> > la négociation contractuelle</li>
  <li class="ml-4"><strong class="font-bold text-primary">L'adaptation au changement</strong> > le suivi d'un plan rigide</li>
</ul>
  Ces principes ont donné naissance à plusieurs frameworks complémentaires.
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Scrum : le cadre le plus utilisé au monde
</h2>
  <h3 class="text-xl font-bold mt-6 mb-3">Principes fondamentaux
</h3>
  
  Scrum repose sur des <strong class="font-bold text-primary">cycles courts appelés sprints</strong> (généralement 2 semaines, parfois 1 ou 3).
  Chaque sprint vise à livrer un <strong class="font-bold text-primary">incrément de produit potentiellement livrable</strong>.
  <h3 class="text-xl font-bold mt-6 mb-3">Les 3 rôles clés (et leurs responsabilités réelles)
</h3>
  
  <strong class="font-bold text-primary">Product Owner (PO)</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Porte la vision produit et les besoins métier</li>
  <li class="ml-4">Priorise le backlog (liste ordonnée des fonctionnalités)</li>
  <li class="ml-4">Valide ou rejette les livrables en fin de sprint</li>
  <li class="ml-4">Interface entre business et technique</li>
  <li class="ml-4">Disponibilité : <strong class="font-bold text-primary">20-40% de son temps dédié</strong></li>
</ul>
  <strong class="font-bold text-primary">Scrum Master (SM)</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Facilite les rituels et élimine les obstacles</li>
  <li class="ml-4">Protège l'équipe des perturbations externes</li>
  <li class="ml-4">Coach l'équipe vers l'auto-organisation</li>
  <li class="ml-4">Garant de la méthode Scrum</li>
  <li class="ml-4">⚠️ <strong class="font-bold text-primary">Attention</strong> : Ce n'est PAS un chef de projet !</li>
</ul>
  <strong class="font-bold text-primary">Équipe de développement (Dev Team)</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Auto-organisée (pas de hiérarchie interne)</li>
  <li class="ml-4">Pluridisciplinaire (dev, QA, UX si besoin)</li>
  <li class="ml-4">Taille idéale : 5-9 personnes</li>
  <li class="ml-4">Engagement collectif sur les objectifs du sprint</li>
</ul>
  <h3 class="text-xl font-bold mt-6 mb-3">Les 5 événements Scrum en détail
</h3>
  
  <strong class="font-bold text-primary">1. Sprint Planning (2-4h pour un sprint de 2 semaines)</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Partie 1 : Que va-t-on livrer ? (Objectif du sprint)</li>
  <li class="ml-4">Partie 2 : Comment va-t-on le faire ? (Découpage technique)</li>
  <li class="ml-4">Output : Sprint Backlog (liste des tâches du sprint)</li>
</ul>
  <strong class="font-bold text-primary">2. Daily Scrum / Stand-up (15 min max, debout)</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Même heure, même lieu, chaque jour</li>
  <li class="ml-4">3 questions par personne :</li>
</ul>
    * Qu'ai-je fait hier ?
    * Que vais-je faire aujourd'hui ?
    * Ai-je des blocages ?
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">⚠️ Ce n'est PAS un rapport au chef, mais une synchronisation d'équipe</li>
</ul>
  <strong class="font-bold text-primary">3. Sprint Review (1-2h)</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Démo des fonctionnalités terminées</li>
  <li class="ml-4">Feedback du PO et des stakeholders</li>
  <li class="ml-4">Ajustement du Product Backlog si nécessaire</li>
</ul>
  <strong class="font-bold text-primary">4. Sprint Retrospective (1-2h)</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Temps de réflexion sur le processus</li>
  <li class="ml-4">3 questions clés :</li>
</ul>
    * Qu'est-ce qui a bien fonctionné ?
    * Qu'est-ce qui a mal fonctionné ?
    * Quelle action d'amélioration pour le prochain sprint ?
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Format : Start / Stop / Continue</li>
</ul>
  <strong class="font-bold text-primary">5. Backlog Refinement (1-2h par semaine)</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Affinage des user stories futures</li>
  <li class="ml-4">Estimation (Planning Poker, T-shirt sizing)</li>
  <li class="ml-4">Clarification des critères d'acceptation</li>
</ul>
  <h3 class="text-xl font-bold mt-6 mb-3">Artefacts Scrum
</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Product Backlog</strong> : Liste priorisée de tout ce qu'il reste à faire</li>
  <li class="ml-4"><strong class="font-bold text-primary">Sprint Backlog</strong> : Tâches sélectionnées pour le sprint en cours</li>
  <li class="ml-4"><strong class="font-bold text-primary">Increment</strong> : Version fonctionnelle du produit en fin de sprint</li>
</ul>
  <h3 class="text-xl font-bold mt-6 mb-3">Métriques utiles
</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Vélocité</strong> : Nombre de story points livrés par sprint</li>
  <li class="ml-4"><strong class="font-bold text-primary">Burndown Chart</strong> : Reste à faire vs temps</li>
  <li class="ml-4"><strong class="font-bold text-primary">Cycle Time</strong> : Temps moyen pour compléter une story</li>
</ul>
  <strong class="font-bold text-primary">✅ Avantages de Scrum</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Cadre clair et structuré</li>
  <li class="ml-4">Transparence totale sur l'avancement</li>
  <li class="ml-4">Feedback rapide et régulier</li>
  <li class="ml-4">Amélioration continue intégrée</li>
</ul>
  <strong class="font-bold text-primary">❌ Limites de Scrum</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Peut sembler lourd pour les très petites équipes</li>
  <li class="ml-4">Nécessite l'engagement de toute l'équipe</li>
  <li class="ml-4">Risque de "Scrum Théâtre" sans réelle agilité</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Kanban : la fluidité comme philosophie
</h2>
  <h3 class="text-xl font-bold mt-6 mb-3">Origine et principes
</h3>
  
  Kanban vient du <strong class="font-bold text-primary">système de production Toyota</strong> (années 1940s). Appliqué au dev en 2007 par David Anderson.
  
  <strong class="font-bold text-primary">4 principes fondamentaux :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Commencer par votre processus actuel</li>
  <li class="ml-4">Accepter de poursuivre progressivement le changement évolutif</li>
  <li class="ml-4">Respecter les rôles et responsabilités actuels</li>
  <li class="ml-4">Encourager le leadership à tous les niveaux</li>
</ul>
  <h3 class="text-xl font-bold mt-6 mb-3">Le tableau Kanban
</h3>
  
  <strong class="font-bold text-primary">Colonnes typiques :</strong>
  \`\`\`
  | Backlog | À faire | En analyse | En dev | En test | En review | Fait |
  \`\`\`
  
  <strong class="font-bold text-primary">Limite du WIP (Work In Progress)</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Exemple : Max 3 tâches en dev simultanément</li>
  <li class="ml-4">Objectif : <strong class="font-bold text-primary">finir ce qui est commencé</strong> avant d'en prendre plus</li>
  <li class="ml-4">Révèle les goulots d'étranglement</li>
</ul>
  <h3 class="text-xl font-bold mt-6 mb-3">Métriques Kanban
</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Lead Time</strong> : Temps total de "Backlog" à "Fait"</li>
  <li class="ml-4"><strong class="font-bold text-primary">Cycle Time</strong> : Temps de "En cours" à "Fait"</li>
  <li class="ml-4"><strong class="font-bold text-primary">Throughput</strong> : Nombre de tâches complétées par semaine</li>
  <li class="ml-4"><strong class="font-bold text-primary">Cumulative Flow Diagram</strong> : Visualisation des flux</li>
</ul>
  <h3 class="text-xl font-bold mt-6 mb-3">Pratiques clés
</h3>
  
  <strong class="font-bold text-primary">1. Visualiser le flux de travail</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Tout doit être visible sur le board</li>
  <li class="ml-4">Code couleur par type (feature, bug, tech debt)</li>
</ul>
  <strong class="font-bold text-primary">2. Limiter le WIP</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Force à finir avant de commencer</li>
  <li class="ml-4">Révèle les blocages</li>
</ul>
  <strong class="font-bold text-primary">3. Gérer le flux</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Mesurer et optimiser le cycle time</li>
  <li class="ml-4">Identifier les goulots</li>
</ul>
  <strong class="font-bold text-primary">4. Rendre les règles explicites</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Definition of Done par colonne</li>
  <li class="ml-4">Critères de passage d'une colonne à l'autre</li>
</ul>
  <strong class="font-bold text-primary">5. Amélioration collaborative</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Rétrospectives régulières (même sans sprint)</li>
</ul>
  <strong class="font-bold text-primary">✅ Avantages de Kanban</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Très flexible, pas de timeboxing</li>
  <li class="ml-4">Facile à implémenter progressivement</li>
  <li class="ml-4">Visualisation claire du travail</li>
  <li class="ml-4">Convient aux équipes de support/maintenance</li>
</ul>
  <strong class="font-bold text-primary">❌ Limites de Kanban</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Peut manquer de rythme sans sprints</li>
  <li class="ml-4">Nécessite une discipline forte</li>
  <li class="ml-4">Moins de prédictibilité qu'avec Scrum</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ XP (Extreme Programming) : l'excellence technique
</h2>
  <h3 class="text-xl font-bold mt-6 mb-3">Les 5 valeurs XP
</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Communication</strong> : dialogue constant dans l'équipe</li>
  <li class="ml-4"><strong class="font-bold text-primary">Simplicité</strong> : faire le plus simple qui marche</li>
  <li class="ml-4"><strong class="font-bold text-primary">Feedback</strong> : retours rapides et fréquents</li>
  <li class="ml-4"><strong class="font-bold text-primary">Courage</strong> : oser refactorer, dire la vérité</li>
  <li class="ml-4"><strong class="font-bold text-primary">Respect</strong> : entre membres de l'équipe</li>
</ul>
  <h3 class="text-xl font-bold mt-6 mb-3">Les 12 pratiques XP
</h3>
  
  <strong class="font-bold text-primary">Pratiques de développement :</strong>
  
  <strong class="font-bold text-primary">1. Test-Driven Development (TDD)</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Écrire le test avant le code</li>
  <li class="ml-4">Cycle Red-Green-Refactor</li>
  <li class="ml-4">Couverture de code élevée</li>
</ul>
  <strong class="font-bold text-primary">2. Pair Programming</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">2 devs, 1 clavier</li>
  <li class="ml-4">Driver (code) + Navigator (réfléchit)</li>
  <li class="ml-4">Rotation régulière</li>
  <li class="ml-4">Partage de connaissance instantané</li>
</ul>
  <strong class="font-bold text-primary">3. Refactoring continu</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Améliorer le code sans changer son comportement</li>
  <li class="ml-4">Garder le code propre en permanence</li>
  <li class="ml-4">Dette technique minimale</li>
</ul>
  <strong class="font-bold text-primary">4. Code simple</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">YAGNI : You Aren't Gonna Need It</li>
  <li class="ml-4">Pas de sur-ingénierie</li>
</ul>
  <strong class="font-bold text-primary">5. Propriété collective du code</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">N'importe qui peut modifier n'importe quelle partie</li>
  <li class="ml-4">Pas de silos</li>
</ul>
  <strong class="font-bold text-primary">6. Standards de code</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Conventions communes</li>
  <li class="ml-4">Linting automatique</li>
  <li class="ml-4">Code reviews</li>
</ul>
  <strong class="font-bold text-primary">Pratiques de gestion :</strong>
  
  <strong class="font-bold text-primary">7. Intégration continue</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Merge sur main plusieurs fois par jour</li>
  <li class="ml-4">Build et tests automatiques</li>
</ul>
  <strong class="font-bold text-primary">8. Livraisons fréquentes</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Releases courtes (1-2 semaines)</li>
  <li class="ml-4">Feedback utilisateur rapide</li>
</ul>
  <strong class="font-bold text-primary">9. Rythme soutenable</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Pas plus de 40h/semaine</li>
  <li class="ml-4">Pas d'heures sup régulières</li>
</ul>
  <strong class="font-bold text-primary">10. Client sur site</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Product Owner disponible</li>
  <li class="ml-4">Réponses rapides aux questions</li>
</ul>
  <strong class="font-bold text-primary">11. Planning Game</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Estimation en story points</li>
  <li class="ml-4">Priorisation par le client</li>
</ul>
  <strong class="font-bold text-primary">12. Métaphore</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Vision partagée du système</li>
  <li class="ml-4">Vocabulaire commun</li>
</ul>
  <h3 class="text-xl font-bold mt-6 mb-3">Complémentarité avec Scrum
</h3>
  
  XP se concentre sur <strong class="font-bold text-primary">comment</strong> développer (pratiques techniques).
  Scrum se concentre sur <strong class="font-bold text-primary">comment</strong> organiser (framework de gestion).
  
  <strong class="font-bold text-primary">Combo gagnant : Scrum + XP</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Scrum pour le cadre organisationnel</li>
  <li class="ml-4">XP pour l'excellence technique</li>
</ul>
  <strong class="font-bold text-primary">✅ Avantages de XP</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Qualité de code exceptionnelle</li>
  <li class="ml-4">Très peu de bugs en production</li>
  <li class="ml-4">Équipe soudée et compétente</li>
  <li class="ml-4">Dette technique quasi nulle</li>
</ul>
  <strong class="font-bold text-primary">❌ Limites de XP</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Exigeant et discipliné</li>
  <li class="ml-4">Pair programming coûteux en ressources</li>
  <li class="ml-4">Nécessite une équipe expérimentée</li>
  <li class="ml-4">Client doit être très disponible</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🔄 Comparaison et choix
</h2>
  
  | Critère | Scrum | Kanban | XP |
  |---------|-------|--------|-----|
  | Structure | Rigide | Flexible | Très rigide |
  | Timeboxing | Oui (sprints) | Non | Oui (itérations) |
  | Rôles | 3 rôles définis | Aucun rôle imposé | Tout le monde dev |
  | Changements | Fin de sprint | À tout moment | Fin d'itération |
  | Focus | Gestion projet | Flux continu | Excellence tech |
  | Courbe d'apprentissage | Moyenne | Facile | Difficile |
  | Convient pour | Projets produits | Support/maintenance | Projets critiques |
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Comment choisir ?
</h2>
  
  <strong class="font-bold text-primary">Commence par Scrum si :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Équipe nouvelle à l'agilité</li>
  <li class="ml-4">Besoin de cadre clair</li>
  <li class="ml-4">Projet produit avec releases régulières</li>
</ul>
  <strong class="font-bold text-primary">Adopte Kanban si :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Flux de travail continu (support, ops)</li>
  <li class="ml-4">Pas de cycles de release fixes</li>
  <li class="ml-4">Transition douce depuis waterfall</li>
</ul>
  <strong class="font-bold text-primary">Utilise XP si :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Qualité critique (finance, santé, aéro)</li>
  <li class="ml-4">Équipe senior et motivée</li>
  <li class="ml-4">Client très impliqué</li>
</ul>
  <strong class="font-bold text-primary">Combine Scrum + XP si :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Projet complexe</li>
  <li class="ml-4">Besoin de cadre ET d'excellence technique</li>
  <li class="ml-4">Équipe mâture</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🚀 Par où commencer ?
</h2>
  <h3 class="text-xl font-bold mt-6 mb-3">Semaine 1 : Comprendre
</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Lire le Manifeste Agile</li>
  <li class="ml-4">Regarder des vidéos sur Scrum/Kanban</li>
  <li class="ml-4">Identifier les problèmes de votre équipe actuelle</li>
</ul>
  <h3 class="text-xl font-bold mt-6 mb-3">Semaine 2 : Expérimenter
</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Choisir UN framework (Scrum conseillé pour débuter)</li>
  <li class="ml-4">Former l'équipe (Scrum Master certifié si possible)</li>
  <li class="ml-4">Définir les rôles</li>
</ul>
  <h3 class="text-xl font-bold mt-6 mb-3">Semaine 3 : Lancer
</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Premier sprint de 2 semaines</li>
  <li class="ml-4">Tous les rituels Scrum</li>
  <li class="ml-4">Mesurer la vélocité</li>
</ul>
  <h3 class="text-xl font-bold mt-6 mb-3">Semaine 4 : Ajuster
</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Première rétrospective sérieuse</li>
  <li class="ml-4">Identifier 1-2 améliorations</li>
  <li class="ml-4">Itérer</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">📚 Ressources pour aller plus loin
</h2>
  
  <strong class="font-bold text-primary">Livres essentiels :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">"Scrum: The Art of Doing Twice the Work in Half the Time" - Jeff Sutherland</li>
  <li class="ml-4">"Kanban: Successful Evolutionary Change" - David Anderson</li>
  <li class="ml-4">"Extreme Programming Explained" - Kent Beck</li>
</ul>
  <strong class="font-bold text-primary">Certifications utiles :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">PSM I (Professional Scrum Master) - Scrum.org</li>
  <li class="ml-4">PSPO I (Professional Scrum Product Owner)</li>
  <li class="ml-4">KMP (Kanban Management Professional)</li>
</ul>
  <strong class="font-bold text-primary">Outils recommandés :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Jira, Linear, Azure DevOps (Scrum)</li>
  <li class="ml-4">Trello, Notion, Monday (Kanban)</li>
  <li class="ml-4">GitHub Projects (simple et gratuit)</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">⚠️ Pièges à éviter
</h2>
  
  <strong class="font-bold text-primary">❌ Scrum Zombie</strong> : faire les rituels sans l'esprit agile
  <strong class="font-bold text-primary">❌ Kanban anarchique</strong> : pas de WIP limit = chaos
  <strong class="font-bold text-primary">❌ XP sans tests</strong> : pair programming seul ne suffit pas
  <strong class="font-bold text-primary">❌ Agilité théorique</strong> : parler agile sans livrer régulièrement
  <strong class="font-bold text-primary">❌ Micro-management</strong> : l'agilité n'est pas du contrôle déguisé
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🧩 Conclusion
</h2>
  
  > <strong class="font-bold text-primary">Scrum</strong> structure ton organisation.
  > <strong class="font-bold text-primary">Kanban</strong> fluidifie ton flux de travail.
  > <strong class="font-bold text-primary">XP</strong> solidifie ta base technique.
  
  L'agilité n'est pas une recette magique, mais une <strong class="font-bold text-primary">philosophie de travail</strong>.
  Commence petit, expérimente, mesure, ajuste.
  
  Le succès n'est pas dans le framework choisi, mais dans <strong class="font-bold text-primary">l'état d'esprit d'amélioration continue</strong> de ton équipe.
  
  <strong class="font-bold text-primary">Prochaine étape :</strong> Choisis un framework, forme ton équipe, lance un premier sprint/cycle, et apprends de tes erreurs. L'agilité se vit, elle ne se lit pas ! 🚀
      `
    },
    { 
      id: '2', 
      title: 'Comment écrire de bonnes User Stories', 
      category: 'culture',
      content: `
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction
</h2>
  
  Les <strong class="font-bold text-primary">User Stories</strong> sont la base de la communication entre business et technique.
  Elles remplacent les spécifications rigides par un langage simple et centré utilisateur.
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Structure d'une User Story
</h2>
  
  > En tant que <strong class="font-bold text-primary">[rôle utilisateur]</strong>, je veux <strong class="font-bold text-primary">[objectif]</strong> afin de <strong class="font-bold text-primary">[bénéfice / valeur ajoutée]</strong>.
  
  <strong class="font-bold text-primary">Exemples :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">En tant qu'utilisateur, je veux pouvoir réinitialiser mon mot de passe afin de récupérer l'accès à mon compte.</li>
  <li class="ml-4">En tant qu'administrateur, je veux filtrer les utilisateurs par statut afin de gérer plus rapidement les comptes actifs.</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Critères d'acceptation (Definition of Done)
</h2>
  
  Ce sont les conditions qui définissent quand la story est "terminée".
  
  <strong class="font-bold text-primary">Exemple pour la réinitialisation de mot de passe :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">L'utilisateur reçoit un email contenant un lien unique.</li>
  <li class="ml-4">Le lien expire au bout de 24h.</li>
  <li class="ml-4">Le mot de passe doit contenir au moins 8 caractères.</li>
</ul>
  👉 Ces critères servent de <strong class="font-bold text-primary">base aux tests</strong> et garantissent une compréhension partagée.
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Règle INVEST
</h2>
  
  Une bonne story doit être :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">I</strong>ndépendante</li>
  <li class="ml-4"><strong class="font-bold text-primary">N</strong>égociable</li>
  <li class="ml-4"><strong class="font-bold text-primary">V</strong>alorisante</li>
  <li class="ml-4"><strong class="font-bold text-primary">E</strong>stimable</li>
  <li class="ml-4"><strong class="font-bold text-primary">S</strong>imple</li>
  <li class="ml-4"><strong class="font-bold text-primary">T</strong>estable</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Erreurs fréquentes
</h2>
  
  ❌ Trop de détails techniques.
  ❌ Story trop grosse ("Epic") non découpée.
  ❌ Absence de critères de test.
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Conclusion
</h2>
  
  Une user story bien écrite, c'est une <strong class="font-bold text-primary">communication claire</strong> et une <strong class="font-bold text-primary">vision produit partagée</strong>.
      `
    },
    { 
      id: '3', 
      title: 'Les 5 piliers du TDD (Test Driven Development)', 
      category: 'culture',
      content: `
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction
</h2>
  
  Le <strong class="font-bold text-primary">TDD</strong>, ou développement piloté par les tests, est une méthode qui inverse la logique habituelle :
  
  > On écrit les tests <strong class="font-bold text-primary">avant</strong> le code.
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Le cycle "Red – Green – Refactor"
</h2>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Red</strong> → Écris un test qui échoue (comportement attendu).</li>
  <li class="ml-4"><strong class="font-bold text-primary">Green</strong> → Écris le code minimal pour faire passer le test.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Refactor</strong> → Nettoie le code sans casser les tests.</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Les 5 piliers du TDD
</h2>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Cycles courts</strong> : écrire un test toutes les 2–5 minutes.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Tests unitaires isolés</strong> : pas de dépendances externes.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Refactoring fréquent</strong> : garde le code simple.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Confiance dans le code</strong> : tu modifies sans peur.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Feedback immédiat</strong> : erreurs visibles instantanément.</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Exemple simple
</h2>
  
  \`\`\`python
  def add(a, b):
      return a + b
  
  def test_add():
      assert add(2, 3) == 5
  \`\`\`
  
  Tu crées d'abord \`test_add()\` avant même d'écrire \`add()\`.
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Bénéfices
</h2>
  
  ✅ Réduction drastique des bugs.
  ✅ Base solide pour le refactoring.
  ✅ Documentation vivante.
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Conclusion
</h2>
  
  Le TDD est un <strong class="font-bold text-primary">filet de sécurité pour développeur</strong> : il t'oblige à penser avant d'agir.
      `
    },
    { 
      id: '4', 
      title: 'Comment organiser un sprint efficacement', 
      category: 'culture',
      content: `
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction
</h2>
  
  Un sprint bien géré = un projet qui avance.
  Le but : <strong class="font-bold text-primary">livrer un incrément concret</strong> à chaque itération.
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Étapes d'un sprint réussi
</h2>
  <h3 class="text-xl font-bold mt-6 mb-3">1. Sprint Planning
</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Définis un <strong class="font-bold text-primary">objectif clair</strong> (ex. : "livrer la page profil utilisateur").</li>
  <li class="ml-4">Estime les stories ensemble (Planning Poker).</li>
</ul>
  <h3 class="text-xl font-bold mt-6 mb-3">2. Daily Stand-up
</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">3 questions simples : Qu'ai-je fait ? Que vais-je faire ? Ai-je un blocage ?</li>
</ul>
  <h3 class="text-xl font-bold mt-6 mb-3">3. Sprint Review
</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Présente les fonctionnalités terminées.</li>
  <li class="ml-4">Recueille le feedback client.</li>
</ul>
  <h3 class="text-xl font-bold mt-6 mb-3">4. Sprint Retrospective
</h3>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Analyse ce qui a fonctionné ou non.</li>
  <li class="ml-4">Choisis <strong class="font-bold text-primary">1 axe d'amélioration</strong> pour le prochain sprint.</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Erreurs fréquentes
</h2>
  
  ❌ Trop de stories non livrées.
  ❌ Objectif de sprint flou.
  ❌ Aucune amélioration entre sprints.
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Outils recommandés
</h2>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Jira, Trello, Linear, Notion</li>
  <li class="ml-4">GitHub Projects pour les petits projets</li>
  <li class="ml-4">Burndown chart pour visualiser la progression</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Conclusion
</h2>
  
  Un sprint est un <strong class="font-bold text-primary">cadre d'apprentissage continu</strong> : l'équipe grandit autant que le produit.
      `
    },
    { 
      id: '5', 
      title: 'Code Review : les bonnes pratiques pour donner (et recevoir) du feedback', 
      category: 'culture',
      content: `
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction
</h2>
  
  La <strong class="font-bold text-primary">Code Review</strong> n'est pas qu'un contrôle qualité : c'est une <strong class="font-bold text-primary">opportunité d'apprentissage collectif</strong>.
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Objectifs
</h2>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Améliorer la qualité du code.</li>
  <li class="ml-4">Partager les connaissances.</li>
  <li class="ml-4">Prévenir les bugs et les dettes techniques.</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Bonnes pratiques du reviewer
</h2>
  
  ✅ Sois <strong class="font-bold text-primary">constructif</strong> : critique le code, pas la personne.
  ✅ Commente de manière précise et justifiée.
  ✅ Priorise les points critiques : sécurité, lisibilité, performances.
  ✅ Encourage les bonnes pratiques ("super idée ici 👍").
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Bonnes pratiques de l'auteur
</h2>
  
  ✅ Prépare une <strong class="font-bold text-primary">pull request claire</strong> : petit périmètre, bonne description.
  ✅ Fournis le contexte ("Cette modif corrige le bug #42").
  ✅ Réponds avec respect et ouverture.
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Outils utiles
</h2>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">GitHub / GitLab PRs</li>
  <li class="ml-4">ReviewPad / CodeScene</li>
  <li class="ml-4">ESLint + Prettier pour les standards automatiques</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Conclusion
</h2>
  
  Une bonne review, c'est une discussion <strong class="font-bold text-primary">entre pairs</strong>, pas un jugement.
  C'est la base d'une équipe qui progresse ensemble.
      `
    },
    { 
      id: '6', 
      title: 'Pourquoi documenter son code est un superpouvoir', 
      category: 'culture',
      content: `
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction
</h2>
  
  La documentation est souvent perçue comme une corvée… jusqu'au jour où tu reprends un projet vieux de six mois et que tu bénis celui qui a pris le temps d'écrire deux lignes.
  Documenter ton code, c'est <strong class="font-bold text-primary">penser à ton "toi futur" et à ton équipe</strong>.
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Pourquoi documenter ?
</h2>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Gagner du temps à long terme</strong> - Une bonne doc évite des heures de lecture de code.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Améliorer la transmission</strong> - Tu facilites l'onboarding des nouveaux membres.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Clarifier tes propres choix</strong> - Expliquer ton code, c'est déjà l'analyser.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Servir le client</strong> - Ce que tu livres doit pouvoir être compris sans ton intervention.</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Types de documentation
</h2>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">README.md</strong> : vue d'ensemble du projet (installation, exécution, contribution).</li>
  <li class="ml-4"><strong class="font-bold text-primary">Commentaires dans le code</strong> : le *pourquoi*, pas le *comment*.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Wiki technique</strong> : décisions, schémas d'architecture, APIs.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Changelog</strong> : suivre l'évolution et les releases.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Doc auto-générée</strong> : JSDoc, Doxygen, Sphinx.</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Bonnes pratiques
</h2>
  
  ✅ Rédige la doc <strong class="font-bold text-primary">au fil du développement</strong>, pas après coup.
  ✅ Utilise un ton clair, concis, professionnel.
  ✅ Mets à jour la doc à chaque modification de code.
  ✅ Documente les *process*, pas seulement le code.
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Outils utiles
</h2>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Markdown (simple et universel)</li>
  <li class="ml-4">GitHub Pages pour héberger ta doc</li>
  <li class="ml-4">Notion ou Obsidian</li>
  <li class="ml-4">Swagger / Postman pour les API</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Conclusion
</h2>
  
  > "Un bon code se lit. Un excellent code se comprend grâce à sa documentation."
      `
    },
    { 
      id: '7', 
      title: 'Comment faire du refactoring sans tout casser', 
      category: 'culture',
      content: `
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction
</h2>
  
  Refactorer, c'est <strong class="font-bold text-primary">améliorer la structure du code sans en changer le comportement</strong>.
  C'est indispensable pour la santé du projet, mais dangereux si mal fait.
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Pourquoi refactorer ?
</h2>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Pour simplifier un code devenu complexe.</li>
  <li class="ml-4">Pour améliorer les performances.</li>
  <li class="ml-4">Pour rendre le code plus lisible et maintenable.</li>
  <li class="ml-4">Pour préparer une nouvelle fonctionnalité proprement.</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Méthodologie
</h2>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Sécurise avec des tests</strong> : un bon refactoring s'appuie sur une base de tests solide.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Modifie par petites étapes</strong> : ne refactorise jamais tout d'un coup.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Utilise des commits atomiques</strong> : un changement = une intention.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Mesure avant/après</strong> : complexité, performance, lisibilité.</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Types de refactoring courants
</h2>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Extraire une fonction</strong> : découper les longs blocs en sous-fonctions claires.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Renommer</strong> des variables ou classes pour plus de sens.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Supprimer le code mort</strong> ou dupliqué.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Isoler les dépendances</strong> (injection, adapter pattern).</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Erreurs à éviter
</h2>
  
  ❌ Refactorer sans tests.
  ❌ Modifier le comportement fonctionnel par erreur.
  ❌ Chercher la "perfection" au lieu de la clarté.
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Outils utiles
</h2>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">IDE : IntelliJ, VS Code, PyCharm</li>
  <li class="ml-4">Analyseurs : SonarQube, ESLint, Flake8</li>
  <li class="ml-4">Tests unitaires automatisés</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Conclusion
</h2>
  
  Refactorer, c'est faire de la <strong class="font-bold text-primary">maintenance préventive</strong>.
  Un code refactoré régulièrement vieillit mieux et coûte moins cher à long terme.
      `
    },
    { 
      id: '8', 
      title: 'Les 10 commandements du clean code', 
      category: 'culture',
      content: `
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction
</h2>
  
  Le *Clean Code*, popularisé par Robert C. Martin ("Uncle Bob"), est une philosophie : écrire du code <strong class="font-bold text-primary">simple, lisible et évolutif</strong>.
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Les 10 commandements
</h2>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Ton code sera lisible avant d'être optimisé.</strong></li>
  <li class="ml-4"><strong class="font-bold text-primary">Tu nommeras clairement tes variables et fonctions.</strong></li>
  <li class="ml-4"><strong class="font-bold text-primary">Tu éviteras la duplication de code.</strong></li>
  <li class="ml-4"><strong class="font-bold text-primary">Tu testeras ce que tu écris.</strong></li>
  <li class="ml-4"><strong class="font-bold text-primary">Tu n'ajouteras rien d'inutile.</strong></li>
  <li class="ml-4"><strong class="font-bold text-primary">Tu refactoriseras régulièrement.</strong></li>
  <li class="ml-4"><strong class="font-bold text-primary">Tu respecteras la cohérence de ton projet.</strong></li>
  <li class="ml-4"><strong class="font-bold text-primary">Tu commenteras seulement quand c'est nécessaire.</strong></li>
  <li class="ml-4"><strong class="font-bold text-primary">Tu feras confiance à ton linter.</strong></li>
  <li class="ml-4"><strong class="font-bold text-primary">Tu chercheras la simplicité, pas la perfection.</strong></li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Exemple concret
</h2>
  
  ❌ Mauvais :
  \`\`\`js
  function p(u, v) { return u + v; }
  \`\`\`
  
  ✅ Propre :
  \`\`\`js
  function addUserScore(baseScore, bonus) {
    return baseScore + bonus;
  }
  \`\`\`
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Pourquoi c'est important
</h2>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Lisibilité = moins de bugs.</li>
  <li class="ml-4">Maintenabilité = gain de temps sur le long terme.</li>
  <li class="ml-4">Cohérence = moins de friction en équipe.</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Outils qui aident
</h2>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">ESLint / Prettier</strong> (JS)</li>
  <li class="ml-4"><strong class="font-bold text-primary">Pylint / Black</strong> (Python)</li>
  <li class="ml-4"><strong class="font-bold text-primary">SonarQube / Code Climate</strong></li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Conclusion
</h2>
  
  > "Clean Code is not written by following rules. It's written by following care."
      `
    },
    { 
      id: '9', 
      title: 'Comment bien nommer ses variables et fonctions', 
      category: 'culture',
      content: `
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction
</h2>
  
  Un bon nom est <strong class="font-bold text-primary">auto-explicatif</strong>.
  C'est souvent ce qui différencie un code amateur d'un code professionnel.
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Règles d'or
</h2>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Clarté avant concision</strong> : \`isAuthenticatedUser\` > \`usrAuth\`.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Verbes pour les fonctions</strong>, noms pour les variables.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Constance</strong> dans les conventions : \`camelCase\` ou \`snake_case\`, mais pas les deux.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Pas d'abréviations obscures</strong> : \`nbUsrActv\` est illisible.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Pas de contexte redondant</strong> : \`user.userName\` → \`user.name\`.</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Exemples
</h2>
  
  ❌ \`d = Date.now()\` → on ne sait pas ce que c'est.
  ✅ \`createdAt = Date.now()\` → instantanément compréhensible.
  
  ❌ \`processData(data)\`
  ✅ \`normalizeUserInput(userFormData)\`
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Petits tips
</h2>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Nomme selon le "quoi" et le "pourquoi"</strong>, pas le "comment".</li>
  <li class="ml-4">Imagine que quelqu'un lit ton code sans contexte.</li>
  <li class="ml-4">Les noms doivent durer plus longtemps que la mémoire du dev.</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Conventions par langage
</h2>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">JavaScript / Java / C#</strong> → camelCase pour variables, PascalCase pour classes.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Python / Ruby</strong> → snake_case.</li>
  <li class="ml-4"><strong class="font-bold text-primary">CSS</strong> → kebab-case.</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Conclusion
</h2>
  
  Nommer, c'est <strong class="font-bold text-primary">penser la logique métier</strong>.
  Un bon nom raconte une histoire : il rend ton code auto-documenté.
      `
    },
    { 
      id: '10', 
      title: 'Automatiser ses tâches répétitives : introduction au DevOps mindset', 
      category: 'culture',
      content: `
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction
</h2>
  
  Le réflexe DevOps, c'est :
  
  > "Si tu fais la même chose trois fois, automatise-la."
  
  Automatiser, c'est gagner en productivité et réduire les erreurs humaines.
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Pourquoi automatiser ?
</h2>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Moins d'oublis et d'erreurs manuelles.</li>
  <li class="ml-4">Gagner du temps sur les tâches sans valeur ajoutée.</li>
  <li class="ml-4">Créer un pipeline fiable de build, test et déploiement.</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Exemples concrets
</h2>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Automatiser les tests avant chaque commit</strong> → via Git hooks ou GitHub Actions.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Déploiement continu</strong> → CI/CD (GitHub Actions, GitLab CI, CircleCI).</li>
  <li class="ml-4"><strong class="font-bold text-primary">Nettoyage automatique</strong> → script pour supprimer les branches mergées.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Génération automatique de documentation</strong> → Swagger, Typedoc, Doxygen.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Backup et surveillance automatique</strong> → Cron jobs, alerting, monitoring.</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Outils indispensables
</h2>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Makefile / Taskfile</strong> → pour les commandes récurrentes.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Bash / PowerShell scripts</strong> → pour automatiser en local.</li>
  <li class="ml-4"><strong class="font-bold text-primary">Docker + Compose</strong> → pour standardiser les environnements.</li>
  <li class="ml-4"><strong class="font-bold text-primary">CI/CD (GitHub Actions, Jenkins)</strong> → pour orchestrer tout ça.</li>
</ul>
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Exemple simple (Makefile)
</h2>
  
  \`\`\`makefile
  test:
      pytest tests/
  
  deploy:
      git push origin main
      gh workflow run deploy.yml
  \`\`\`
  
  Une commande \`make deploy\` et ton code part en production 🚀
  <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Conclusion
</h2>
  
  L'automatisation, c'est la <strong class="font-bold text-primary">clé de la sérénité technique</strong>.
  C'est l'essence du DevOps : fiabilité, efficacité et confiance dans ton pipeline.
      `
    },
  {
    id: '11',
    title: 'Pair Programming & Mob Programming : coder à plusieurs',
    category: 'culture',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : La programmation collaborative</h2>

Le développement en solo c'est bien, mais <strong class="font-bold text-primary">coder à plusieurs c'est mieux</strong> !

<strong class="font-bold text-primary">Bénéfices prouvés :</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">-60% de bugs en production</li>
<li class="ml-4">Code review en temps réel</li>
<li class="ml-4">Transfert de connaissance immédiat</li>
<li class="ml-4">Onboarding 3x plus rapide</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🤝 Pair Programming</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Le modèle Driver/Navigator</h3>

<strong class="font-bold text-primary">Driver (celui qui tape) :</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Écrit le code</li>
<li class="ml-4">Pense à l'implémentation tactique</li>
<li class="ml-4">Explique ce qu'il fait</li>
</ul>
<strong class="font-bold text-primary">Navigator (celui qui observe) :</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Pense à la stratégie globale</li>
<li class="ml-4">Anticipe les problèmes</li>
<li class="ml-4">Cherche la documentation</li>
<li class="ml-4">Pose des questions</li>
</ul>
<h3 class="text-xl font-bold mt-6 mb-3">Techniques de pairing</h3>

<strong class="font-bold text-primary">1. Ping Pong Pairing (avec TDD)</strong>

<ul class="my-4 list-disc pl-6">
<li class="ml-4">Dev A : Écrit un test qui échoue</li>
<li class="ml-4">Dev B : Fait passer le test</li>
<li class="ml-4">Dev B : Écrit le prochain test</li>
<li class="ml-4">Dev A : Fait passer le test</li>
<li class="ml-4">Rotation continue !</li>
</ul>
<strong class="font-bold text-primary">2. Strong-Style Pairing</strong>

"Pour qu'une idée passe de ta tête au clavier, elle doit passer par les mains de quelqu'un d'autre."

<ul class="my-4 list-disc pl-6">
<li class="ml-4">Le Navigator dicte</li>
<li class="ml-4">Le Driver exécute</li>
<li class="ml-4">Rotation toutes les 5-10 min</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">👥 Mob Programming</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Le principe</h3>

<strong class="font-bold text-primary">Toute l'équipe sur le même problème en même temps</strong>

<ul class="my-4 list-disc pl-6">
<li class="ml-4">1 Driver (qui code)</li>
<li class="ml-4">3-6 Navigators (qui guident)</li>
<li class="ml-4">1 écran partagé (grand écran ou partage d'écran)</li>
<li class="ml-4">Rotation toutes les 10-15 min</li>
</ul>
<h3 class="text-xl font-bold mt-6 mb-3">Quand utiliser le Mob Programming ?</h3>

<strong class="font-bold text-primary">Cas d'usage :</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Architecture complexe à décider</li>
<li class="ml-4">Bug critique urgent</li>
<li class="ml-4">Onboarding d'un nouveau dev</li>
<li class="ml-4">Spike technique (exploration)</li>
<li class="ml-4">Code legacy difficile à comprendre</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">⚙️ Setup technique</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Pairing en local</h3>

<strong class="font-bold text-primary">Option 1 : Live Share (VS Code)</strong>

<ul class="my-4 list-disc pl-6">
<li class="ml-4">Extension gratuite</li>
<li class="ml-4">Partage de terminal inclus</li>
<li class="ml-4">Audio/Vidéo intégré</li>
<li class="ml-4">Curseurs multi-couleurs</li>
</ul>
<strong class="font-bold text-primary">Option 2 : tmux (terminal)</strong>

Session partagée en SSH pour les puristes !

<h3 class="text-xl font-bold mt-6 mb-3">Pairing remote</h3>

<strong class="font-bold text-primary">Outils recommandés :</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Tuple</strong> : Excellent pour le pairing remote</li>
<li class="ml-4"><strong class="font-bold text-primary">Pop</strong> : Screensharing optimisé dev</li>
<li class="ml-4"><strong class="font-bold text-primary">VS Code Live Share</strong> : Gratuit et simple</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">✅ Bonnes pratiques</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Pour le Driver</h3>

<ul class="my-4 list-disc pl-6">
<li class="ml-4">Pense à voix haute</li>
<li class="ml-4">N'hésite pas à demander conseil</li>
<li class="ml-4">Fais des pauses régulières</li>
<li class="ml-4">Accepte les suggestions</li>
</ul>
<h3 class="text-xl font-bold mt-6 mb-3">Pour le Navigator</h3>

<ul class="my-4 list-disc pl-6">
<li class="ml-4">Sois patient, laisse le Driver taper</li>
<li class="ml-4">Pose des questions au lieu d'imposer</li>
<li class="ml-4">Cherche la doc pendant que Driver code</li>
<li class="ml-4">Prends des notes des idées à explorer</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🚀 Mise en pratique</h2>

Commence par des sessions courtes de 1-2h, puis augmente progressivement. Le pair programming n'est pas fait pour toute la journée tous les jours !

<strong class="font-bold text-primary">Planning type :</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Matin : Pairing sur features complexes (2h)</li>
<li class="ml-4">Après-midi : Solo work (code reviews, docs)</li>
<li class="ml-4">Vendredi : Mob programming sur architecture (1h)</li>
</ul>
La collaboration rend le code meilleur et l'équipe plus forte ! 🤝
    `
  },
  {
    id: '12',
    title: 'Apprendre en continu : rester à jour dans la tech',
    category: 'culture',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : La tech ne s'arrête jamais</h2>

Nouveau framework chaque mois, nouvelles best practices, nouveaux langages...
<strong class="font-bold text-primary">Comment rester à jour sans y passer 10h par jour ?</strong>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">📚 Les 5 piliers de l'apprentissage continu</h2>

<h3 class="text-xl font-bold mt-6 mb-3">1. Apprendre par la pratique (80% du temps)</h3>

<strong class="font-bold text-primary">Side projects</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">1 nouveau projet tous les 2-3 mois</li>
<li class="ml-4">Utilise une techno que tu ne connais pas</li>
<li class="ml-4">Publie sur GitHub</li>
</ul>
<strong class="font-bold text-primary">Coding challenges</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">LeetCode / HackerRank (algo)</li>
<li class="ml-4">Advent of Code (fun et challengeant)</li>
<li class="ml-4">CodeWars (katas quotidiens)</li>
</ul>
<h3 class="text-xl font-bold mt-6 mb-3">2. Lire et veiller (15% du temps)</h3>

<strong class="font-bold text-primary">Newsletters essentielles</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">TLDR</strong> : Actualité tech quotidienne</li>
<li class="ml-4"><strong class="font-bold text-primary">JavaScript Weekly</strong> : Front-end</li>
<li class="ml-4"><strong class="font-bold text-primary">Bytes.dev</strong> : React/JS fun</li>
<li class="ml-4"><strong class="font-bold text-primary">Pointer</strong> : Engineering best practices</li>
</ul>
<strong class="font-bold text-primary">Blogs à suivre</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Kent C. Dodds (React, Testing)</li>
<li class="ml-4">Martin Fowler (Architecture)</li>
<li class="ml-4">CSS Tricks (Front-end)</li>
<li class="ml-4">Dev.to (communauté)</li>
</ul>
<h3 class="text-xl font-bold mt-6 mb-3">3. Contribuer open-source (3% du temps)</h3>

<strong class="font-bold text-primary">Comment commencer :</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Corrige la documentation d'un projet que tu utilises</li>
<li class="ml-4">Cherche les issues "good first issue"</li>
<li class="ml-4">Reporte des bugs avec reproduction claire</li>
</ul>
<h3 class="text-xl font-bold mt-6 mb-3">4. Enseigner et partager (2% du temps)</h3>

<strong class="font-bold text-primary">La meilleure façon d'apprendre = enseigner</strong>

<ul class="my-4 list-disc pl-6">
<li class="ml-4">Écris des articles (dev.to, Medium)</li>
<li class="ml-4">Fais des talks en interne</li>
<li class="ml-4">Réponds sur Stack Overflow</li>
<li class="ml-4">Crée des tutoriels YouTube</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">⏰ Planning réaliste de veille</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Quotidien (15-30 min)</h3>

<ul class="my-4 list-disc pl-6">
<li class="ml-4">Lecture newsletter pendant le café ☕</li>
<li class="ml-4">1 article technique</li>
<li class="ml-4">Scroll rapide Twitter/Reddit tech</li>
</ul>
<h3 class="text-xl font-bold mt-6 mb-3">Hebdomadaire (2-3h)</h3>

<ul class="my-4 list-disc pl-6">
<li class="ml-4">1 tutoriel vidéo (YouTube, Egghead.io)</li>
<li class="ml-4">Travailler sur side project</li>
<li class="ml-4">Lire 1 chapitre d'un livre technique</li>
</ul>
<h3 class="text-xl font-bold mt-6 mb-3">Mensuel (1 journée)</h3>

<ul class="my-4 list-disc pl-6">
<li class="ml-4">Participer à un meetup/conférence</li>
<li class="ml-4">Refactorer un vieux side project</li>
<li class="ml-4">Explorer une nouvelle techno en profondeur</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Choisir quoi apprendre</h2>

<h3 class="text-xl font-bold mt-6 mb-3">La matrice d'apprentissage</h3>

<strong class="font-bold text-primary">Priorité 1 : Utile ET intéressant</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Techno utilisée dans ton job actuel</li>
<li class="ml-4">Compétence qui peut t'ouvrir des portes</li>
</ul>
<strong class="font-bold text-primary">Priorité 2 : Utile mais pas intéressant</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Apprends le minimum nécessaire</li>
<li class="ml-4">Délègue si possible</li>
</ul>
<strong class="font-bold text-primary">Priorité 3 : Intéressant mais pas utile</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Pour le plaisir, en side project</li>
<li class="ml-4">Sans pression</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">📖 Ressources d'apprentissage</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Livres techniques fondamentaux</h3>

<ul class="my-4 list-disc pl-6">
<li class="ml-4">Clean Code - Robert Martin</li>
<li class="ml-4">The Pragmatic Programmer - Hunt & Thomas</li>
<li class="ml-4">Designing Data-Intensive Applications - Kleppmann</li>
<li class="ml-4">You Don't Know JS - Kyle Simpson</li>
</ul>
<h3 class="text-xl font-bold mt-6 mb-3">Plateformes d'apprentissage</h3>

<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Frontend Masters</strong> : Courses front-end avancés</li>
<li class="ml-4"><strong class="font-bold text-primary">Egghead.io</strong> : Vidéos courtes et denses</li>
<li class="ml-4"><strong class="font-bold text-primary">Pluralsight</strong> : Catalogue immense</li>
<li class="ml-4"><strong class="font-bold text-primary">Exercism</strong> : Apprendre en codant</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">💡 Astuces de pro</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Apprendre en public</h3>

Documente ce que tu apprends sur Twitter, blog, GitHub.
<strong class="font-bold text-primary">Bénéfices :</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Tu retiens mieux</li>
<li class="ml-4">Tu aides d'autres personnes</li>
<li class="ml-4">Tu te crées un portfolio</li>
<li class="ml-4">Tu attires des opportunités</li>
</ul>
<h3 class="text-xl font-bold mt-6 mb-3">La règle des 20h</h3>

20 heures de pratique délibérée suffisent pour passer de débutant à compétent sur un sujet.

<ul class="my-4 list-disc pl-6">
<li class="ml-4">Semaine 1-2 : Tutoriels basiques</li>
<li class="ml-4">Semaine 3-4 : Build quelque chose de concret</li>
<li class="ml-4">Après : Tu es opérationnel !</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🚫 Pièges à éviter</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Tutorial Hell</h3>

Faire des tutoriels sans fin sans jamais builder de vrais projets.

<strong class="font-bold text-primary">Solution :</strong> 1 tutoriel = 1 projet personnel appliqué

<h3 class="text-xl font-bold mt-6 mb-3">Syndrome de l'imposteur</h3>

"Je ne sais pas assez de choses..."

<strong class="font-bold text-primary">Réalité :</strong> Personne ne sait tout. Même les seniors apprennent chaque jour.

<h3 class="text-xl font-bold mt-6 mb-3">Shiny Object Syndrome</h3>

Courir après chaque nouvelle techno à la mode.

<strong class="font-bold text-primary">Solution :</strong> Maîtrise les fondamentaux avant de changer.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎓 Plan d'action</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4">Choisis 1 skill à développer ce mois-ci</li>
<li class="ml-4">Bloque 30 min par jour dans ton agenda</li>
<li class="ml-4">Build 1 mini-projet en 2 semaines</li>
<li class="ml-4">Partage ton apprentissage (Twitter, blog)</li>
<li class="ml-4">Répète le mois prochain avec une nouvelle skill</li>
</ul>
L'apprentissage continu n'est pas un sprint, c'est un marathon. Reste curieux, reste humble, et code ! 🚀
    `
  },
];
