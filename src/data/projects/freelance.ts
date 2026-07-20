import { Project } from "./types";

export const freelanceProjects: Project[] = [
  {
    id: "eloi-coachsteo",
    title: "Eloi CoachStéo - Sport Trainer",
    description:
      "Site vitrine one-page pour un coach sportif et ostéopathe. Présentation des services de remise en forme, de préparation physique et de programmes personnalisés HYROX.",
    category: "freelance",
    image: "img_projects/eloi_sport.png",
    tech: ["React", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/BastienLopez/Eloi_Coaching",
    demo: "https://bastienlopez.github.io/Eloi_Coaching/",
    detailedContent: `
      <div class="project-detail">
        <h2 class="project-title">💪 Eloi CoachStéo - Sport Trainer</h2>
        
        <div class="section">
          <h3 class="section-title">📋 Contexte du projet</h3>
          <p class="description">
            Création d'un <strong>site vitrine one-page</strong> pour un coach sportif et ostéopathe professionnel. 
            Le site présente ses services de remise en forme, de préparation physique et de programmes personnalisés 
            <strong>HYROX</strong> avec un design moderne et responsive.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">👤 Mon rôle</h3>
          <p class="description">
            Conception du site, intégration React et Tailwind CSS, mise en page responsive,
            structuration des contenus et mise en ligne.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">⚙️ Technologies utilisées</h3>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-icon">⚛️</span>
              <span class="tech-name">React</span>
              <p class="tech-desc">Framework moderne pour une UI réactive</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🎨</span>
              <span class="tech-name">Tailwind CSS</span>
              <p class="tech-desc">Design responsive et personnalisé</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">📄</span>
              <span class="tech-name">GitHub Pages</span>
              <p class="tech-desc">Hébergement gratuit et performant</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">✨ Fonctionnalités principales</h3>
          <ul class="features-list">
            <li class="feature-item">
              <span class="feature-icon">🎯</span>
              <strong>Design one-page</strong> - Épuré et professionnel
            </li>
            <li class="feature-item">
              <span class="feature-icon">🏋️</span>
              <strong>Services détaillés</strong> - Présentation des programmes HYROX
            </li>
            <li class="feature-item">
              <span class="feature-icon">📧</span>
              <strong>Contact intégré</strong> - Formulaire de prise de contact
            </li>
            <li class="feature-item">
              <span class="feature-icon">📱</span>
              <strong>Mobile-first</strong> - Optimisation mobile et performance
            </li>
            <li class="feature-item">
              <span class="feature-icon">💬</span>
              <strong>Témoignages</strong> - Section avis clients
            </li>
          </ul>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">
              ✅ Site déployé pour présenter clairement l'offre de coaching,
              les services et les modalités de contact.
            </p>
            <p class="result-text">
              ✅ Présentation <strong>claire et professionnelle</strong> de son expertise en coaching sportif et ostéopathie.
            </p>
          </div>
        </div>
      </div>
    `,
    gallery: ["img_projects/eloi_sport.png"],
  },
  {
    id: "erp-micro-creches",
    title: "ERP Micro-Crèches",
    description:
      "ERP métier multi-crèches avec portail familles et site vitrine : opérations, données, documents, planning, transmissions et pilotage centralisés.",
    category: "freelance",
    image: "img_projects/creche.png",
    tech: [
      "React",
      "Node.js",
      "JavaScript",
      "MongoDB",
      "Docker",
      "CI/CD",
      "TDD",
    ],
    detailedContent: `
      <div class="project-detail">
        <h2 class="project-title">ERP Multi-Crèches &amp; Écosystème Digital</h2>
        <div class="section"><h3 class="section-title">◇ Présentation du projet</h3>
          <p class="description">Conception et développement d’un <strong>ERP métier complet destiné à la gestion centralisée d’un réseau de micro-crèches</strong>, accompagné d’un <strong>portail dédié aux familles</strong> et d’un <strong>site web vitrine</strong>.</p>
          <p class="description">L’objectif du projet était de remplacer une organisation fragmentée par une plateforme unique capable de centraliser l’ensemble des opérations quotidiennes : gestion des enfants, suivi des présences, transmissions, planning, personnel, dossiers administratifs, documents, communication avec les familles, statistiques et pilotage de plusieurs établissements.</p>
          <p class="description">La solution a été conçue pour fonctionner dans un environnement <strong>multi-crèches</strong>, avec une isolation stricte des données entre les établissements et différents niveaux d’accès selon le profil de l’utilisateur.</p>
          <p class="description">Un administrateur global peut superviser l’ensemble du réseau et consulter des indicateurs consolidés, tandis que les responsables et professionnels accèdent uniquement aux établissements auxquels ils sont rattachés. Les parents disposent quant à eux d’un espace sécurisé leur permettant de consulter exclusivement les informations concernant leurs propres enfants.</p>
          <p class="description">Le projet couvre ainsi l’ensemble du cycle de vie d’une application métier : <strong>analyse des besoins, conception UX/UI, architecture technique, développement full-stack, sécurité, tests automatisés, déploiement, monitoring, documentation et maintenance</strong>.</p>
        </div>
        <div class="section"><h3 class="section-title">◎ Mon rôle</h3>
          <p class="description">J’ai assuré la <strong>conception et le développement full-stack de l’ensemble de la solution</strong>, depuis la définition de l’architecture jusqu’à la préparation et l’industrialisation du déploiement.</p>
          <p class="description">Mon intervention a notamment porté sur :</p>
          <ul class="features-list">
            <li class="feature-item">Analyse des besoins métier et définition du périmètre fonctionnel.</li>
            <li class="feature-item">Modélisation de la base de données.</li>
            <li class="feature-item">Conception de l’architecture multi-crèches.</li>
            <li class="feature-item">Développement du backend et des API REST.</li>
            <li class="feature-item">Développement des interfaces React.</li>
            <li class="feature-item">Création des espaces professionnels, administrateurs et parents.</li>
            <li class="feature-item">Mise en place de l’authentification et de la gestion des permissions.</li>
            <li class="feature-item">Développement du système de sélection et d’isolation des crèches.</li>
            <li class="feature-item">Gestion des dossiers enfants et des documents administratifs.</li>
            <li class="feature-item">Développement des outils de planning et de suivi des présences.</li>
            <li class="feature-item">Création du système de transmissions quotidiennes.</li>
            <li class="feature-item">Développement des tableaux de bord et outils de reporting.</li>
            <li class="feature-item">Mise en place des exports CSV et PDF.</li>
            <li class="feature-item">Développement et intégration du site web vitrine.</li>
            <li class="feature-item">Mise en place des tests unitaires, d’intégration, end-to-end et de charge.</li>
            <li class="feature-item">Conteneurisation de l’environnement avec Docker.</li>
            <li class="feature-item">Mise en place des processus CI/CD.</li>
            <li class="feature-item">Documentation de l’API avec Swagger/OpenAPI.</li>
            <li class="feature-item">Travail sur les problématiques de sécurité et de conformité RGPD.</li>
            <li class="feature-item">Préparation du monitoring, des sauvegardes et de la maintenance applicative.</li>
          </ul>
          <p class="description">Certaines données, règles métier et informations organisationnelles sont volontairement anonymisées afin de préserver la confidentialité du projet.</p>
        </div>
        <div class="section"><h3 class="section-title">✦ Chiffres et éléments clés</h3>
          <p class="description"><strong>5 établissements gérés depuis une même plateforme</strong></p>
          <p class="description"><strong>4 niveaux principaux d’accès</strong> Superadministrateur, administrateur de crèche, professionnel et parent.</p>
          <p class="description"><strong>150+ tests automatisés</strong> Tests backend, frontend, intégration, sécurité et parcours end-to-end.</p>
          <p class="description"><strong>Architecture multi-sites</strong> Isolation automatique des données selon la crèche active.</p>
          <p class="description"><strong>Application métier complète</strong> ERP professionnel, espace parents et site web vitrine.</p>
          <p class="description"><strong>API REST documentée</strong> Documentation interactive Swagger et export OpenAPI.</p>
          <p class="description"><strong>Infrastructure conteneurisée</strong> Déploiement reproductible avec Docker et orchestration des différents services.</p>
        </div>
        <div class="section"><h3 class="section-title">⌘ Stack technique</h3>
          <div class="workflow-step"><h4>Frontend</h4>
          </div>
          <div class="workflow-step"><h4>React</h4>
            <p class="description">Développement d’une interface utilisateur dynamique permettant de construire les différents espaces métier de l’application :</p>
            <ul class="features-list">
              <li class="feature-item">Dashboard.</li>
              <li class="feature-item">Gestion des enfants.</li>
              <li class="feature-item">Gestion du personnel.</li>
              <li class="feature-item">Planning.</li>
              <li class="feature-item">Badgeuse.</li>
              <li class="feature-item">Transmissions.</li>
              <li class="feature-item">Documents.</li>
              <li class="feature-item">Reporting.</li>
              <li class="feature-item">Administration.</li>
              <li class="feature-item">Portail parents.</li>
            </ul>
            <p class="description">L’interface a été pensée pour rester utilisable aussi bien sur ordinateur que sur tablette et mobile.</p>
          </div>
          <div class="workflow-step"><h4>JavaScript ES6+</h4>
            <p class="description">Utilisation d’une architecture JavaScript moderne et modulaire afin de garantir la maintenabilité et l’évolution du projet.</p>
          </div>
          <div class="workflow-step"><h4>React Testing Library</h4>
            <p class="description">Tests des composants, interactions utilisateurs, formulaires, workflows documentaires et différents écrans métier.</p>
          </div>
          <div class="workflow-step"><h4>Backend</h4>
          </div>
          <div class="workflow-step"><h4>Node.js</h4>
            <p class="description">Développement du serveur applicatif et de la logique métier.</p>
          </div>
          <div class="workflow-step"><h4>Express.js</h4>
            <p class="description">Création d’une API REST structurée permettant de gérer les différents domaines fonctionnels de l’ERP.</p>
          </div>
          <div class="workflow-step"><h4>API REST</h4>
            <p class="description">Architecture basée sur des ressources métier telles que :</p>
            <ul class="features-list">
              <li class="feature-item">enfants </li>
              <li class="feature-item">parents </li>
              <li class="feature-item">personnel </li>
              <li class="feature-item">présences </li>
              <li class="feature-item">transmissions </li>
              <li class="feature-item">activités </li>
              <li class="feature-item">contrats </li>
              <li class="feature-item">documents </li>
              <li class="feature-item">rapports </li>
              <li class="feature-item">support.</li>
            </ul>
          </div>
          <div class="workflow-step"><h4>JWT</h4>
            <p class="description">Authentification sécurisée par token et contrôle des accès selon les rôles et les établissements autorisés.</p>
          </div>
          <div class="workflow-step"><h4>Swagger / OpenAPI</h4>
            <p class="description">Documentation interactive de l’API permettant de consulter et tester les endpoints directement depuis une interface dédiée.</p>
            <p class="description">L’API peut également être exportée au format OpenAPI pour être utilisée avec des outils externes tels que Postman ou ReDoc.</p>
          </div>
          <div class="workflow-step"><h4>Base de données</h4>
          </div>
          <div class="workflow-step"><h4>MongoDB</h4>
            <p class="description">Base de données NoSQL adaptée aux nombreux domaines métier et aux structures évolutives du projet.</p>
            <p class="description">Les données sont réparties dans différentes collections telles que :</p>
            <ul class="features-list">
              <li class="feature-item"><code>creches</code></li>
              <li class="feature-item"><code>children</code></li>
              <li class="feature-item"><code>parents</code></li>
              <li class="feature-item"><code>staff</code></li>
              <li class="feature-item"><code>attendance</code></li>
              <li class="feature-item"><code>staff_attendance</code></li>
              <li class="feature-item"><code>transmissions</code></li>
              <li class="feature-item"><code>documents</code></li>
              <li class="feature-item"><code>contracts</code></li>
              <li class="feature-item"><code>activities</code></li>
              <li class="feature-item"><code>reports</code></li>
              <li class="feature-item"><code>consents</code></li>
              <li class="feature-item"><code>logs</code></li>
            </ul>
          </div>
          <div class="workflow-step"><h4>Mongoose</h4>
            <p class="description">Utilisation de modèles, validations, relations et index permettant de garantir la cohérence des données.</p>
            <p class="description">Des index spécifiques ont été mis en place afin d’optimiser les recherches et de garantir certaines contraintes métier, notamment sur les présences et les transmissions quotidiennes.</p>
          </div>
          <div class="workflow-step"><h4>Infrastructure &amp; DevOps</h4>
            <ul class="features-list">
              <li class="feature-item">Docker</li>
              <li class="feature-item">Docker Compose</li>
              <li class="feature-item">CI/CD</li>
              <li class="feature-item">Kubernetes</li>
              <li class="feature-item">Redis</li>
              <li class="feature-item">Monitoring Prometheus / Grafana</li>
              <li class="feature-item">Déploiement staging et production</li>
              <li class="feature-item">Stratégie Blue/Green</li>
              <li class="feature-item">Sauvegardes MongoDB chiffrées</li>
              <li class="feature-item">Health checks</li>
              <li class="feature-item">Runbooks d’exploitation</li>
            </ul>
          </div>
        </div>
        <div class="section"><h3 class="section-title">🏢 Architecture multi-crèches</h3>
          <p class="description">L’un des principaux enjeux techniques du projet était de transformer une application initialement pensée pour un seul établissement en une solution capable de gérer plusieurs crèches de manière sécurisée.</p>
          <p class="description">Une architecture multi-sites a donc été mise en place autour d’une collection dédiée aux établissements et d’un identifiant <code>crecheId</code> associé aux principales ressources métier.</p>
          <p class="description">Chaque requête est automatiquement exécutée dans le contexte d’une crèche active.</p>
          <p class="description">Le frontend conserve l’établissement sélectionné et transmet son identifiant au backend. Le serveur vérifie ensuite que l’utilisateur possède les droits nécessaires avant d’autoriser l’accès aux données.</p>
          <p class="description">Cette architecture permet de garantir une séparation stricte entre les données des établissements tout en conservant une base de données et une infrastructure communes.</p>
          <div class="workflow-step"><h4>Sélection de la crèche active</h4>
            <p class="description">Un composant dédié permet aux utilisateurs travaillant sur plusieurs sites de changer rapidement d’établissement.</p>
            <p class="description">La crèche active est conservée dans le contexte global de l’application afin que l’ensemble des pages et requêtes soient automatiquement synchronisées.</p>
          </div>
          <div class="workflow-step"><h4>Isolation des données</h4>
            <p class="description">Chaque donnée métier est automatiquement filtrée selon l’établissement actif :</p>
            <ul class="features-list">
              <li class="feature-item">enfants </li>
              <li class="feature-item">personnel </li>
              <li class="feature-item">présences </li>
              <li class="feature-item">transmissions </li>
              <li class="feature-item">documents </li>
              <li class="feature-item">contrats </li>
              <li class="feature-item">activités </li>
              <li class="feature-item">statistiques.</li>
            </ul>
            <p class="description">Un utilisateur ne peut donc pas accéder aux données d’une crèche pour laquelle il ne possède pas d’autorisation.</p>
          </div>
          <div class="workflow-step"><h4>Vue globale</h4>
            <p class="description">Les administrateurs globaux disposent d’un mode permettant d’agréger les données de plusieurs établissements et d’obtenir une vision consolidée du réseau.</p>
            <p class="description">Ils peuvent ensuite sélectionner une crèche précise pour accéder à son environnement opérationnel.</p>
          </div>
          <div class="workflow-step"><h4>Profils utilisateurs</h4>
          </div>
          <div class="workflow-step"><h4>Superadministrateur</h4>
            <ul class="features-list">
              <li class="feature-item">Accès à l’ensemble des établissements.</li>
              <li class="feature-item">Sélection rapide de la crèche active.</li>
              <li class="feature-item">Dashboard consolidé multi-sites.</li>
              <li class="feature-item">Administration globale.</li>
            </ul>
          </div>
          <div class="workflow-step"><h4>Administrateur de crèche</h4>
            <ul class="features-list">
              <li class="feature-item">Accès à son établissement.</li>
              <li class="feature-item">Gestion du personnel.</li>
              <li class="feature-item">Gestion des enfants.</li>
              <li class="feature-item">Documents.</li>
              <li class="feature-item">Reporting.</li>
              <li class="feature-item">Paramètres.</li>
            </ul>
          </div>
          <div class="workflow-step"><h4>Professionnel</h4>
            <ul class="features-list">
              <li class="feature-item">Accès aux crèches auxquelles il est rattaché.</li>
              <li class="feature-item">Gestion opérationnelle quotidienne.</li>
              <li class="feature-item">Présences.</li>
              <li class="feature-item">Transmissions.</li>
              <li class="feature-item">Planning.</li>
              <li class="feature-item">Activités.</li>
            </ul>
          </div>
          <div class="workflow-step"><h4>Parent</h4>
            <ul class="features-list">
              <li class="feature-item">Accès uniquement à ses propres enfants.</li>
              <li class="feature-item">Consultation des informations autorisées.</li>
              <li class="feature-item">Journal quotidien.</li>
              <li class="feature-item">Documents et démarches administratives.</li>
            </ul>
          </div>
        </div>
        <div class="section"><h3 class="section-title">👶 Gestion complète des enfants</h3>
          <p class="description">L’ERP intègre un module complet de gestion des dossiers enfants.</p>
          <p class="description">Les professionnels peuvent :</p>
          <ul class="features-list">
            <li class="feature-item">créer un dossier </li>
            <li class="feature-item">consulter une fiche enfant </li>
            <li class="feature-item">modifier les informations </li>
            <li class="feature-item">suivre les informations administratives </li>
            <li class="feature-item">gérer les contacts d’urgence </li>
            <li class="feature-item">consulter les informations importantes </li>
            <li class="feature-item">suivre les allergies </li>
            <li class="feature-item">gérer les documents obligatoires </li>
            <li class="feature-item">consulter l’historique des présences </li>
            <li class="feature-item">accéder aux transmissions quotidiennes.</li>
          </ul>
          <p class="description">Chaque enfant possède également une checklist de documents administratifs permettant de suivre facilement les pièces reçues, manquantes ou validées.</p>
        </div>
        <div class="section"><h3 class="section-title">⏱ Présences et badgeuse enfants</h3>
          <p class="description">Un système complet de suivi des présences permet de gérer les arrivées et les départs des enfants.</p>
          <p class="description">Les équipes disposent notamment :</p>
          <ul class="features-list">
            <li class="feature-item">d’une liste des enfants attendus dans la journée </li>
            <li class="feature-item">du statut de présence de chaque enfant </li>
            <li class="feature-item">d’un système de badgeage rapide </li>
            <li class="feature-item">du suivi des heures d’arrivée </li>
            <li class="feature-item">du suivi des heures de départ </li>
            <li class="feature-item">de la gestion des absences </li>
            <li class="feature-item">de la gestion des retards </li>
            <li class="feature-item">d’un historique individuel.</li>
          </ul>
          <p class="description">Les statuts permettent de distinguer les enfants :</p>
          <ul class="features-list">
            <li class="feature-item">attendus </li>
            <li class="feature-item">présents </li>
            <li class="feature-item">absents </li>
            <li class="feature-item">en retard.</li>
          </ul>
          <p class="description">Un calendrier permet également de consulter et gérer les présences sur différentes périodes.</p>
        </div>
        <div class="section"><h3 class="section-title">📅 Planning enfants</h3>
          <p class="description">Le module de planning permet aux équipes de visualiser l’organisation des enfants selon plusieurs vues :</p>
          <ul class="features-list">
            <li class="feature-item">journée </li>
            <li class="feature-item">semaine </li>
            <li class="feature-item">mois.</li>
          </ul>
          <p class="description">Il permet également de gérer :</p>
          <ul class="features-list">
            <li class="feature-item">les événements </li>
            <li class="feature-item">les absences </li>
            <li class="feature-item">les congés </li>
            <li class="feature-item">les périodes de maladie </li>
            <li class="feature-item">le suivi mensuel </li>
            <li class="feature-item">le suivi annuel </li>
            <li class="feature-item">le cumul des heures.</li>
          </ul>
          <p class="description">Des règles métier garantissent la cohérence des données et évitent la création de présences dupliquées.</p>
        </div>
        <div class="section"><h3 class="section-title">🍼 Transmissions quotidiennes</h3>
          <p class="description">Un module complet de transmissions permet aux professionnels de renseigner tout ce qui concerne la journée de l’enfant.</p>
          <p class="description">Les transmissions peuvent inclure :</p>
          <ul class="features-list">
            <li class="feature-item">repas </li>
            <li class="feature-item">biberons </li>
            <li class="feature-item">siestes </li>
            <li class="feature-item">changes </li>
            <li class="feature-item">activités </li>
            <li class="feature-item">incidents </li>
            <li class="feature-item">traitements </li>
            <li class="feature-item">températures </li>
            <li class="feature-item">observations </li>
            <li class="feature-item">commentaires </li>
            <li class="feature-item">photos.</li>
          </ul>
          <p class="description">Toutes les informations d’une journée sont regroupées afin de faciliter le suivi et la consultation.</p>
          <p class="description">Les professionnels disposent de formulaires rapides adaptés à chaque type de transmission.</p>
          <p class="description">Chaque événement est horodaté et associé à son auteur afin de garantir la traçabilité des actions.</p>
        </div>
        <div class="section"><h3 class="section-title">📖 Journal quotidien destiné aux familles</h3>
          <p class="description">Les données renseignées par les professionnels alimentent automatiquement un journal quotidien accessible depuis le portail parents.</p>
          <p class="description">Les familles peuvent retrouver la journée de leur enfant à travers différents onglets :</p>
          <ul class="features-list">
            <li class="feature-item">repas </li>
            <li class="feature-item">siestes </li>
            <li class="feature-item">activités </li>
            <li class="feature-item">photos </li>
            <li class="feature-item">commentaires.</li>
          </ul>
          <p class="description">Une timeline permet également de visualiser chronologiquement les événements de la journée.</p>
          <p class="description">La galerie photo intègre les informations nécessaires à la traçabilité, tout en respectant les règles de consentement et de confidentialité.</p>
        </div>
        <div class="section"><h3 class="section-title">👨‍👩‍👧‍👦 Portail parents</h3>
          <p class="description">Un espace sécurisé distinct de l’interface professionnelle a été développé pour les familles.</p>
          <p class="description">Chaque parent retrouve uniquement les enfants auxquels son compte est associé.</p>
          <p class="description">Le dashboard parent permet notamment de consulter :</p>
          <ul class="features-list">
            <li class="feature-item">les enfants associés au compte </li>
            <li class="feature-item">leur statut du jour </li>
            <li class="feature-item">les dernières informations importantes </li>
            <li class="feature-item">leur journal quotidien </li>
            <li class="feature-item">leurs documents </li>
            <li class="feature-item">les informations administratives autorisées.</li>
          </ul>
          <p class="description">Le système permet également de gérer des situations familiales plus complexes grâce à des relations parent-enfant historisées, notamment pour les comptes partagés ou les gardes alternées.</p>
        </div>
        <div class="section"><h3 class="section-title">📄 Gestion documentaire</h3>
          <p class="description">L’application intègre un véritable système de gestion documentaire.</p>
          <p class="description">Les documents peuvent être classés selon leur destination :</p>
          <ul class="features-list">
            <li class="feature-item">administration </li>
            <li class="feature-item">personnel </li>
            <li class="feature-item">parents </li>
            <li class="feature-item">enfants.</li>
          </ul>
          <p class="description">Les utilisateurs autorisés peuvent :</p>
          <ul class="features-list">
            <li class="feature-item">rechercher un document </li>
            <li class="feature-item">filtrer les documents </li>
            <li class="feature-item">importer un fichier </li>
            <li class="feature-item">modifier ses métadonnées </li>
            <li class="feature-item">définir ses droits d’accès </li>
            <li class="feature-item">télécharger un document </li>
            <li class="feature-item">supprimer un document.</li>
          </ul>
          <p class="description">Les droits de consultation peuvent être configurés individuellement selon les profils.</p>
        </div>
        <div class="section"><h3 class="section-title">✅ Workflow des documents parents</h3>
          <p class="description">Les parents peuvent transmettre directement certains documents depuis leur espace.</p>
          <p class="description">Chaque document passe par un workflow de validation :</p>
          <p class="description"><strong>En attente → Validé → Refusé</strong></p>
          <p class="description">Le système conserve également les informations de suivi nécessaires :</p>
          <ul class="features-list">
            <li class="feature-item">auteur de l’envoi </li>
            <li class="feature-item">date de réception </li>
            <li class="feature-item">statut </li>
            <li class="feature-item">historique </li>
            <li class="feature-item">validation </li>
            <li class="feature-item">motif éventuel de refus.</li>
          </ul>
          <p class="description">Cela permet de centraliser les démarches administratives et d’éviter les échanges de documents dispersés entre différents canaux.</p>
        </div>
        <div class="section"><h3 class="section-title">👩‍💼 Gestion du personnel</h3>
          <p class="description">Un module complet est consacré aux professionnels travaillant dans les établissements.</p>
          <p class="description">Il permet de gérer :</p>
          <ul class="features-list">
            <li class="feature-item">les fiches employés </li>
            <li class="feature-item">les rôles </li>
            <li class="feature-item">les établissements autorisés </li>
            <li class="feature-item">les plannings </li>
            <li class="feature-item">le pointage </li>
            <li class="feature-item">les heures réalisées </li>
            <li class="feature-item">les congés </li>
            <li class="feature-item">les absences </li>
            <li class="feature-item">les tâches </li>
            <li class="feature-item">les notes de frais.</li>
          </ul>
          <p class="description">Chaque professionnel dispose également de son propre espace personnel.</p>
        </div>
        <div class="section"><h3 class="section-title">🕐 Badgeuse personnel</h3>
          <p class="description">Une badgeuse permet d’enregistrer les heures de présence des employés.</p>
          <p class="description">Les données peuvent ensuite être utilisées pour :</p>
          <ul class="features-list">
            <li class="feature-item">calculer les journées travaillées </li>
            <li class="feature-item">contrôler les horaires réalisés </li>
            <li class="feature-item">suivre les absences </li>
            <li class="feature-item">préparer les données nécessaires à la paie.</li>
          </ul>
          <p class="description">Un export CSV permet d’exploiter facilement ces données dans d’autres outils.</p>
        </div>
        <div class="section"><h3 class="section-title">📊 Tableaux de bord et reporting</h3>
          <p class="description">L’ERP propose plusieurs indicateurs destinés au pilotage quotidien des établissements.</p>
          <p class="description">Parmi les données disponibles :</p>
          <ul class="features-list">
            <li class="feature-item">taux de présence </li>
            <li class="feature-item">absences du jour </li>
            <li class="feature-item">heures cumulées </li>
            <li class="feature-item">taux d’encadrement </li>
            <li class="feature-item">indicateurs de personnel </li>
            <li class="feature-item">données consolidées par établissement.</li>
          </ul>
          <p class="description">Les administrateurs globaux peuvent également consulter des indicateurs agrégés sur plusieurs crèches.</p>
        </div>
        <div class="section"><h3 class="section-title">📤 Exports</h3>
          <p class="description">Plusieurs données de l’application peuvent être exportées afin de faciliter leur utilisation administrative.</p>
          <p class="description">Formats disponibles :</p>
          <ul class="features-list">
            <li class="feature-item">CSV </li>
            <li class="feature-item">PDF.</li>
          </ul>
          <p class="description">Les exports concernent notamment :</p>
          <ul class="features-list">
            <li class="feature-item">présences </li>
            <li class="feature-item">statistiques </li>
            <li class="feature-item">reporting </li>
            <li class="feature-item">données destinées à la gestion administrative et à la paie.</li>
          </ul>
        </div>
        <div class="section"><h3 class="section-title">🔐 Sécurité et gestion des accès</h3>
          <p class="description">La sécurité a été intégrée directement dans l’architecture de l’application.</p>
          <p class="description">L’authentification repose sur des tokens JWT.</p>
          <p class="description">Les autorisations sont ensuite contrôlées selon :</p>
          <ul class="features-list">
            <li class="feature-item">le rôle </li>
            <li class="feature-item">l’utilisateur </li>
            <li class="feature-item">les établissements autorisés </li>
            <li class="feature-item">la ressource demandée </li>
            <li class="feature-item">la relation entre un parent et un enfant.</li>
          </ul>
          <p class="description">Les contrôles sont effectués directement côté serveur afin d’éviter qu’une simple modification de l’interface ou d’une requête puisse donner accès à des données non autorisées.</p>
          <p class="description">Les API retournent automatiquement une erreur d’autorisation lorsqu’un utilisateur tente d’accéder à une ressource située en dehors de son périmètre.</p>
        </div>
        <div class="section"><h3 class="section-title">🛡️ RGPD et protection des données</h3>
          <p class="description">Le projet traitant des données concernant des enfants et des familles, une attention particulière a été accordée à la protection des données.</p>
          <p class="description">Plusieurs mécanismes ont été intégrés :</p>
          <ul class="features-list">
            <li class="feature-item">restriction des informations selon le profil </li>
            <li class="feature-item">contrôle des accès aux dossiers enfants </li>
            <li class="feature-item">gestion des consentements </li>
            <li class="feature-item">contrôle de la visibilité des photos </li>
            <li class="feature-item">journalisation des actions sensibles </li>
            <li class="feature-item">historique des validations de documents </li>
            <li class="feature-item">limitation des uploads </li>
            <li class="feature-item">contrôle du type et de la taille des fichiers </li>
            <li class="feature-item">chiffrement des données sensibles stockées </li>
            <li class="feature-item">chiffrement des sauvegardes </li>
            <li class="feature-item">procédures et documentation RGPD.</li>
          </ul>
          <p class="description">Des mécanismes de floutage ou de watermark peuvent également être appliqués lors de certains exports contenant des contenus sensibles.</p>
        </div>
        <div class="section"><h3 class="section-title">🧪 Tests et qualité logicielle</h3>
          <p class="description">Une stratégie de tests complète a été mise en place afin de sécuriser les fonctionnalités critiques de l’ERP.</p>
          <p class="description">Le projet comprend <strong>plus de 150 tests automatisés</strong>.</p>
          <div class="workflow-step"><h4>Tests unitaires</h4>
            <p class="description">Validation :</p>
            <ul class="features-list">
              <li class="feature-item">des modèles </li>
              <li class="feature-item">des fonctions utilitaires </li>
              <li class="feature-item">des règles métier </li>
              <li class="feature-item">des permissions </li>
              <li class="feature-item">des filtres multi-crèches.</li>
            </ul>
          </div>
          <div class="workflow-step"><h4>Tests d’intégration</h4>
            <p class="description">Validation des interactions entre :</p>
            <ul class="features-list">
              <li class="feature-item">API </li>
              <li class="feature-item">base de données </li>
              <li class="feature-item">authentification </li>
              <li class="feature-item">permissions </li>
              <li class="feature-item">documents </li>
              <li class="feature-item">transmissions </li>
              <li class="feature-item">reporting.</li>
            </ul>
          </div>
          <div class="workflow-step"><h4>Tests frontend</h4>
            <p class="description">Tests des principaux composants React et des interactions utilisateurs.</p>
          </div>
          <div class="workflow-step"><h4>Tests end-to-end</h4>
            <p class="description">Simulation de parcours utilisateurs complets :</p>
            <ul class="features-list">
              <li class="feature-item">connexion </li>
              <li class="feature-item">sélection d’une crèche </li>
              <li class="feature-item">consultation du dashboard </li>
              <li class="feature-item">gestion des enfants </li>
              <li class="feature-item">création d’une transmission </li>
              <li class="feature-item">consultation du planning </li>
              <li class="feature-item">génération d’un export </li>
              <li class="feature-item">parcours parent.</li>
            </ul>
          </div>
          <div class="workflow-step"><h4>Tests de charge</h4>
            <p class="description">Des scénarios de charge ont également permis de simuler des volumes importants d’actions simultanées, notamment les badgeages et les écritures métier.</p>
            <p class="description">L’objectif de couverture du backend a été fixé à un niveau supérieur ou égal à 80 %.</p>
          </div>
        </div>
        <div class="section"><h3 class="section-title">🚀 CI/CD et déploiement</h3>
          <p class="description">L’application a été pensée pour disposer d’un environnement reproductible et industrialisé.</p>
          <p class="description">L’ensemble des services est conteneurisé avec Docker :</p>
          <ul class="features-list">
            <li class="feature-item">backend </li>
            <li class="feature-item">frontend </li>
            <li class="feature-item">MongoDB </li>
            <li class="feature-item">Redis </li>
            <li class="feature-item">site web.</li>
          </ul>
          <p class="description">Docker Compose permet de démarrer l’écosystème complet avec une seule configuration.</p>
          <p class="description">Des scripts permettent également d’initialiser automatiquement la base avec :</p>
          <ul class="features-list">
            <li class="feature-item">plusieurs crèches </li>
            <li class="feature-item">des administrateurs </li>
            <li class="feature-item">des professionnels mono-site </li>
            <li class="feature-item">des professionnels multi-sites </li>
            <li class="feature-item">des parents </li>
            <li class="feature-item">des enfants.</li>
          </ul>
          <p class="description">Le pipeline CI/CD automatise les différentes étapes de contrôle et de déploiement.</p>
          <p class="description">La mise en production repose également sur :</p>
          <ul class="features-list">
            <li class="feature-item">un environnement de staging </li>
            <li class="feature-item">une orchestration Kubernetes </li>
            <li class="feature-item">une stratégie de déploiement Blue/Green </li>
            <li class="feature-item">des sauvegardes MongoDB chiffrées.</li>
          </ul>
        </div>
        <div class="section"><h3 class="section-title">📡 Monitoring et exploitation</h3>
          <p class="description">L’exploitation de la plateforme a également été prise en compte.</p>
          <p class="description">La solution dispose de mécanismes permettant de surveiller :</p>
          <ul class="features-list">
            <li class="feature-item">la disponibilité de l’API </li>
            <li class="feature-item">la connexion à la base de données </li>
            <li class="feature-item">les performances </li>
            <li class="feature-item">l’état des services </li>
            <li class="feature-item">les index de la base de données.</li>
          </ul>
          <p class="description">L’écosystème de monitoring repose notamment sur Prometheus et Grafana.</p>
          <p class="description">Des endpoints de santé permettent également de vérifier rapidement l’état de l’API et de MongoDB.</p>
          <p class="description">Des runbooks documentent les principales opérations :</p>
          <ul class="features-list">
            <li class="feature-item">redémarrage des services </li>
            <li class="feature-item">ajout d’une nouvelle crèche </li>
            <li class="feature-item">gestion des sauvegardes </li>
            <li class="feature-item">procédures d’exploitation </li>
            <li class="feature-item">procédures de sécurité.</li>
          </ul>
        </div>
        <div class="section"><h3 class="section-title">🆘 Support et maintenance</h3>
          <p class="description">Un système de support interne permet également de centraliser les demandes et incidents.</p>
          <p class="description">Le projet prévoit une logique de TMA comprenant :</p>
          <ul class="features-list">
            <li class="feature-item">suivi des anomalies </li>
            <li class="feature-item">corrections </li>
            <li class="feature-item">optimisations </li>
            <li class="feature-item">suivi des performances de la base </li>
            <li class="feature-item">supervision </li>
            <li class="feature-item">gestion des incidents </li>
            <li class="feature-item">alertes par e-mail </li>
            <li class="feature-item">notifications via Slack ou Microsoft Teams.</li>
          </ul>
        </div>
        <div class="section"><h3 class="section-title">💬 Accompagnement utilisateur</h3>
          <p class="description">Afin de faciliter la prise en main d’un ERP disposant d’un grand nombre de fonctionnalités, plusieurs outils d’accompagnement ont été intégrés :</p>
          <ul class="features-list">
            <li class="feature-item">parcours de découverte </li>
            <li class="feature-item">tooltips directement dans l’application </li>
            <li class="feature-item">documentation utilisateur </li>
            <li class="feature-item">FAQ intégrée </li>
            <li class="feature-item">chatbot d’assistance.</li>
          </ul>
          <p class="description">Une phase de recette utilisateur a également permis de valider les principaux parcours avant la mise en production.</p>
        </div>
        <div class="section"><h3 class="section-title">🌐 Site web vitrine</h3>
          <p class="description">Le projet comprend également un <strong>site web vitrine dédié au réseau de micro-crèches</strong>, intégré au même écosystème technique.</p>
          <p class="description">Le site est déployable indépendamment de l’ERP tout en partageant la même infrastructure Docker.</p>
          <p class="description">Un travail d’optimisation a été réalisé autour :</p>
          <ul class="features-list">
            <li class="feature-item">du référencement naturel </li>
            <li class="feature-item">du SEO </li>
            <li class="feature-item">du référencement géographique </li>
            <li class="feature-item">de la performance </li>
            <li class="feature-item">de l’expérience mobile.</li>
          </ul>
          <p class="description">L’objectif était de construire un écosystème numérique cohérent associant la partie publique destinée à la visibilité des établissements et l’outil métier utilisé quotidiennement par les équipes et les familles.</p>
        </div>
        <div class="section"><h3 class="section-title">📱 UX/UI et responsive design</h3>
          <p class="description">L’interface a été pensée selon une approche mobile-first afin de pouvoir être utilisée directement par les professionnels sur le terrain.</p>
          <p class="description">Une attention particulière a été accordée à :</p>
          <ul class="features-list">
            <li class="feature-item">la rapidité d’accès aux actions courantes </li>
            <li class="feature-item">la lisibilité des informations </li>
            <li class="feature-item">la réduction du nombre de clics </li>
            <li class="feature-item">l’utilisation sur tablette </li>
            <li class="feature-item">l’utilisation sur mobile </li>
            <li class="feature-item">la navigation entre plusieurs établissements.</li>
          </ul>
          <p class="description">Le système multi-crèches propose également différents éléments destinés à faciliter le changement de contexte :</p>
          <ul class="features-list">
            <li class="feature-item">nom de la crèche active </li>
            <li class="feature-item">indicateurs visuels </li>
            <li class="feature-item">sélecteur rapide </li>
            <li class="feature-item">changement d’établissement depuis le dashboard </li>
            <li class="feature-item">navigation rapide entre les différents sites.</li>
          </ul>
          <p class="description">Des fonctionnalités d’accessibilité et d’internationalisation ont également été intégrées.</p>
        </div>
        <div class="section"><h3 class="section-title">⚙️ Administration et configuration</h3>
          <p class="description">L’ERP dispose d’un espace d’administration permettant de gérer la configuration générale du système.</p>
          <p class="description">Les fonctionnalités comprennent notamment :</p>
          <ul class="features-list">
            <li class="feature-item">paramètres généraux </li>
            <li class="feature-item">administration du système </li>
            <li class="feature-item">gestion des établissements </li>
            <li class="feature-item">gestion des accès </li>
            <li class="feature-item">configuration des documents requis </li>
            <li class="feature-item">configuration des horaires </li>
            <li class="feature-item">gestion des utilisateurs.</li>
          </ul>
          <p class="description">Un assistant d’onboarding permet également de faciliter la création d’un nouvel établissement.</p>
          <p class="description">Il est possible de réutiliser les configurations existantes afin d’accélérer le déploiement d’une nouvelle crèche :</p>
          <ul class="features-list">
            <li class="feature-item">modèles de documents </li>
            <li class="feature-item">paramètres </li>
            <li class="feature-item">horaires </li>
            <li class="feature-item">configurations métier.</li>
          </ul>
        </div>
        <div class="section"><h3 class="section-title">🧠 Principaux défis techniques</h3>
          <div class="workflow-step"><h4>Isolation des données entre plusieurs crèches</h4>
            <p class="description">La difficulté principale consistait à garantir qu’un utilisateur ne puisse jamais accéder aux données d’un établissement non autorisé.</p>
            <p class="description">Cette problématique a été résolue grâce à une gestion centralisée du contexte de crèche et à un filtrage systématique directement au niveau du backend.</p>
          </div>
          <div class="workflow-step"><h4>Gestion de permissions complexes</h4>
            <p class="description">Les règles d’accès diffèrent fortement selon qu’un utilisateur est administrateur global, responsable d’une crèche, professionnel ou parent.</p>
            <p class="description">Un système de contrôle d’accès granulaire a donc été conçu afin de gérer ces différents scénarios.</p>
          </div>
          <div class="workflow-step"><h4>Centralisation d’un grand nombre de domaines métier</h4>
            <p class="description">L’application regroupe de nombreux modules interdépendants :</p>
            <p class="description">enfants, parents, personnel, présences, plannings, documents, transmissions, statistiques et administration.</p>
            <p class="description">L’architecture a été pensée afin de conserver une séparation claire des responsabilités tout en maintenant une expérience utilisateur cohérente.</p>
          </div>
          <div class="workflow-step"><h4>Sécurisation des données sensibles</h4>
            <p class="description">Le projet manipule des données personnelles concernant des enfants.</p>
            <p class="description">La sécurité, la traçabilité et la limitation des accès ont donc été intégrées dès la conception de l’architecture.</p>
          </div>
          <div class="workflow-step"><h4>Maintenabilité et évolutivité</h4>
            <p class="description">La solution a été conçue pour permettre l’ajout de nouveaux établissements et de nouveaux modules sans remettre en cause l’architecture existante.</p>
          </div>
        </div>
        <div class="section"><h3 class="section-title">↗ Résultats</h3>
          <p class="description">Le projet a abouti à la création d’un <strong>écosystème digital complet permettant de centraliser la gestion opérationnelle et administrative de plusieurs micro-crèches</strong>.</p>
          <p class="description">La plateforme permet notamment :</p>
          <ul class="features-list">
            <li class="feature-item">de superviser plusieurs établissements depuis une interface unique </li>
            <li class="feature-item">d’isoler automatiquement les données de chaque crèche </li>
            <li class="feature-item">de centraliser les dossiers des enfants </li>
            <li class="feature-item">de suivre les présences des enfants et du personnel </li>
            <li class="feature-item">d’organiser les plannings </li>
            <li class="feature-item">de digitaliser les transmissions quotidiennes </li>
            <li class="feature-item">de simplifier les échanges avec les familles </li>
            <li class="feature-item">de centraliser les documents administratifs </li>
            <li class="feature-item">d’automatiser une partie du reporting </li>
            <li class="feature-item">de fournir des indicateurs consolidés aux responsables </li>
            <li class="feature-item">de sécuriser les accès selon les profils </li>
            <li class="feature-item">d’assurer la traçabilité des actions </li>
            <li class="feature-item">de disposer d’une infrastructure industrialisée et reproductible.</li>
          </ul>
          <p class="description">Au-delà du développement d’une application CRUD classique, ce projet m’a permis de travailler sur les problématiques d’un <strong>véritable logiciel métier en production</strong> : architecture multi-sites, isolation des données, sécurité, permissions complexes, expérience utilisateur, tests automatisés, performance, déploiement et exploitation.</p>
        </div>
        <div class="section"><h3 class="section-title">✧ Compétences mises en œuvre</h3>
          <p class="description"><strong>Développement frontend</strong> React, architecture de composants, gestion d’état, interfaces métier complexes et responsive design.</p>
          <p class="description"><strong>Développement backend</strong> Node.js, Express, conception d’API REST et logique métier.</p>
          <p class="description"><strong>Base de données</strong> MongoDB, Mongoose, modélisation, indexation et optimisation.</p>
          <p class="description"><strong>Architecture</strong> Conception multi-crèches et isolation des données.</p>
          <p class="description"><strong>Sécurité</strong> JWT, RBAC, contrôle d’accès par ressource et par établissement.</p>
          <p class="description"><strong>Qualité</strong> Tests unitaires, intégration, end-to-end et tests de charge.</p>
          <p class="description"><strong>DevOps</strong> Docker, CI/CD, Kubernetes, monitoring et stratégies de déploiement.</p>
          <p class="description"><strong>Documentation</strong> Swagger/OpenAPI, documentation technique, procédures et runbooks.</p>
          <p class="description"><strong>Gestion de projet</strong> Analyse fonctionnelle, conception, développement, recette, déploiement et maintenance.</p>
        </div>
      </div>
    `,
    gallery: ["img_projects/creche.png"],
  },
  {
    id: "luxury-auto-detailing",
    title: "Luxury Auto Detailing",
    description:
      "Site vitrine pour prestations de detailing automobile haut de gamme : nettoyage, polissage, protection céramique et remise à neuf esthétique.",
    category: "freelance",
    image: "img_projects/LuxuryAutoDetailling.png",
    tech: ["React", "Tailwind CSS", "JavaScript"],
    demo: "https://bastienlopez.github.io/LuxuryAutoDetailling/",
    detailedContent: `
      <div class="project-detail">
        <h2 class="project-title">🚗 Luxury Auto Detailing</h2>
        
        <div class="section">
          <h3 class="section-title">📋 Contexte du projet</h3>
          <p class="description">
            Création d'un <strong>site vitrine</strong> pour un atelier de detailing automobile proposant des prestations haut de gamme : polissage, décontamination, protection céramique et relooking intérieur.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">👤 Mon rôle</h3>
          <p class="description">
            Conception et intégration frontend avec React et Tailwind CSS, adaptation responsive,
            présentation des prestations, galerie, prise de contact et déploiement du site.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">⚙️ Technologies utilisées</h3>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-icon">⚛️</span>
              <span class="tech-name">React</span>
              <p class="tech-desc">Interface réactive et moderne</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🎨</span>
              <span class="tech-name">Tailwind CSS</span>
              <p class="tech-desc">Design responsive et élégant</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">✨ Fonctionnalités principales</h3>
          <ul class="features-list">
            <li class="feature-item">
              <span class="feature-icon">🧽</span>
              <strong>Présentation des services</strong> - Polissage, céramique, nettoyage intérieur
            </li>
            <li class="feature-item">
              <span class="feature-icon">📸</span>
              <strong>Galerie avant/après</strong> - Showcase photos haute qualité
            </li>
            <li class="feature-item">
              <span class="feature-icon">📅</span>
              <strong>Prise de rendez-vous</strong> - Formulaire et contact direct
            </li>
            <li class="feature-item">
              <span class="feature-icon">💬</span>
              <strong>Témoignages</strong> - Avis clients et notes
            </li>
          </ul>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">
              ✅ Site déployé, conçu pour présenter clairement les prestations et faciliter la prise de contact.
            </p>
          </div>
        </div>
      </div>
    `,
    gallery: ["img_projects/LuxuryAutoDetailling.png"],
  },
  {
    id: "cledevoute",
    title: "Cle De Voute - Maçonnerie",
    description:
      "Site vitrine pour Cle De Voute Maçonnerie — présentation de services et portfolio.",
    category: "freelance",
    image: "img_projects/CleDeVoute.png",
    tech: ["React", "Tailwind CSS", "JavaScript"],
    demo: "https://bastienlopez.github.io/CleDeVoute/",
    detailedContent: `
      <div class="project-detail">
        <h2 class="project-title">🔑 CleDeVoute</h2>

        <div class="section">
          <h3 class="section-title">📋 Contexte du projet</h3>
          <p class="description">
            CleDeVoute souhaitait moderniser sa présence en ligne avec un site vitrine clair et
            orienté conversion pour présenter ses services, réalisations et faciliter la prise de contact.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">🧑‍💻 Rôle</h3>
          <p class="description">Conception et intégration frontend, UI design léger, optimisation performance et déploiement sur GitHub Pages.</p>
        </div>

        <div class="section">
          <h3 class="section-title">⚙️ Technologies & outils</h3>
          <div class="tech-grid">
            <div class="tech-item"><span class="tech-icon">⚛️</span><span class="tech-name">React</span></div>
            <div class="tech-item"><span class="tech-icon">🎨</span><span class="tech-name">Tailwind CSS</span></div>
            <div class="tech-item"><span class="tech-icon">⚡</span><span class="tech-name">JavaScript</span></div>
            <div class="tech-item"><span class="tech-icon">🚀</span><span class="tech-name">GitHub Pages</span></div>
            <div class="tech-item"><span class="tech-icon">🛠️</span><span class="tech-name">Vite</span></div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">🚧 Défis rencontrés</h3>
          <ul class="features-list">
            <li class="feature-item">Réduire le temps de chargement tout en gardant des images haute qualité.</li>
            <li class="feature-item">Assurer une navigation fluide sur mobile et desktop.</li>
            <li class="feature-item">Simplifier la prise de contact pour augmenter les conversions.</li>
          </ul>
        </div>

        <div class="section">
          <h3 class="section-title">🔧 Solutions apportées</h3>
          <ul class="features-list">
            <li class="feature-item">Optimisation des images (WebP/AVIF) et lazy-loading pour améliorer FCP.</li>
            <li class="feature-item">Design mobile-first avec composants réutilisables (Tailwind + React).</li>
            <li class="feature-item">Formulaire de contact simple et mise en évidence des appels à l'action (CTA).</li>
            <li class="feature-item">Déploiement sur GitHub Pages pour une distribution simple et fiable.</li>
          </ul>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">✅ Site déployé et accessible publiquement via GitHub Pages.</p>
            <p class="result-text">✅ Amélioration du rendu initial et réduction du poids des pages grâce aux images optimisées.</p>
            <p class="result-text">✅ Interface responsive avec navigation et appels à l'action adaptés aux usages mobiles.</p>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">📌 Remarques / Améliorations possibles</h3>
          <ul class="features-list">
            <li class="feature-item">Ajouter un suivi RUM (Web Vitals) pour mesurer l'impact réel des optimisations.</li>
            <li class="feature-item">Intégrer un sitemap et les balises Open Graph pour améliorer le référencement.</li>
          </ul>
        </div>
      </div>
    `,
    gallery: ["img_projects/CleDeVoute.png"],
  },
];
