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
    image: "img_projects/erp-micro-creches-vue-multisite.png",
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
        <div class="section">
          <h3 class="section-title">Présentation du projet</h3>
          <p class="description">ERP métier conçu pour centraliser la gestion opérationnelle et administrative d’un réseau de <strong>cinq micro-crèches</strong>, avec un espace professionnel et un portail destiné aux familles.</p>
          <p class="description">La plateforme remplace des données et opérations dispersées par un environnement unique, adapté au multi-établissements, aux profils utilisateurs distincts et aux informations sensibles liées aux enfants, parents et équipes.</p>
          <p class="description">Elle rassemble les modules métier utiles au suivi quotidien, à la coordination des établissements et au pilotage des responsables autorisés.</p>
          <p class="description">Les informations sensibles et les visuels ont été anonymisés lorsque nécessaire afin de respecter les exigences de confidentialité du projet.</p>
          <button type="button" class="project-inline-visual" data-gallery-index="1"><img src="img_projects/erp-micro-creches-vue-multisite.png" alt="Vue consolidée des enfants avec sélection de l'établissement" loading="lazy" decoding="async" /><span>Vue multi-crèches et contexte actif</span></button>
        </div>
        <div class="section info-box">
          <h3 class="section-title">Mon rôle</h3>
          <p class="description">Conception et développement full-stack du projet, de l’analyse du besoin à la préparation de la livraison.</p>
          <ul class="features-list">
            <li class="feature-item"><strong>Analyse métier</strong> — cadrage du périmètre et des parcours utilisateurs.</li>
            <li class="feature-item"><strong>Reprise de données</strong> — intégration de huit années d’historique pour assurer la continuité avec les données existantes.</li>
            <li class="feature-item"><strong>Architecture</strong> — conception multi-établissements et séparation des responsabilités.</li>
            <li class="feature-item"><strong>Frontend</strong> — interfaces React pour les espaces professionnels, administrateurs et parents.</li>
            <li class="feature-item"><strong>Backend &amp; API</strong> — services Node.js/Express et API REST documentée.</li>
            <li class="feature-item"><strong>Données</strong> — modélisation MongoDB/Mongoose des domaines métier.</li>
            <li class="feature-item"><strong>Accès</strong> — authentification, rôles, permissions et contexte d’établissement.</li>
            <li class="feature-item"><strong>Qualité</strong> — suites de tests automatisés pour les flux critiques.</li>
            <li class="feature-item"><strong>Livraison</strong> — environnement Docker, workflows CI et documentation technique.</li>
          </ul>
        </div>
        <div class="section project-metrics">
          <h3 class="section-title">Chiffres clés</h3>
          <div class="metrics-grid">
            <div><strong>5</strong><span>micro-crèches gérées depuis une même plateforme</span></div>
            <div><strong>4</strong><span>profils d’accès principaux</span></div>
            <div><strong>8</strong><span>ans de données historiques migrées</span></div>
          </div>
        </div>
        <div class="section">
          <h3 class="section-title">Architecture multi-crèches</h3>
          <p class="description">Chaque donnée métier est rattachée à un établissement. La crèche active est transmise dans le parcours, puis le backend vérifie que le compte possède les droits nécessaires avant de servir les données. Les profils autorisés disposent d’une vue consolidée du réseau.</p>
          <ul class="features-list">
            <li class="feature-item"><strong>Superadministrateur</strong> — supervision du réseau et indicateurs consolidés.</li>
            <li class="feature-item"><strong>Administrateur de crèche</strong> — administration de son ou ses établissements autorisés.</li>
            <li class="feature-item"><strong>Professionnel</strong> — accès aux opérations quotidiennes de son établissement.</li>
            <li class="feature-item"><strong>Parent</strong> — consultation des seules informations associées à ses enfants.</li>
          </ul>
        </div>
        <div class="section">
          <h3 class="section-title">Fonctionnalités métier</h3>
          <ul class="features-list">
            <li class="feature-item"><strong>Multi-établissements</strong> — contexte actif et pilotage centralisé.</li>
            <li class="feature-item"><strong>Enfants &amp; dossiers</strong> — informations administratives et suivi associé.</li>
            <li class="feature-item"><strong>Présences &amp; badgeuse</strong> — arrivées, départs, absences et historique.</li>
            <li class="feature-item"><strong>Planning</strong> — organisation des équipes et des activités.</li>
            <li class="feature-item"><strong>Transmissions</strong> — suivi quotidien partagé avec les familles.</li>
            <li class="feature-item"><strong>Portail parents</strong> — espace sécurisé dédié aux familles.</li>
            <li class="feature-item"><strong>Personnel</strong> — gestion des équipes et de leurs informations.</li>
            <li class="feature-item"><strong>Documents</strong> — centralisation des éléments administratifs.</li>
            <li class="feature-item"><strong>Reporting</strong> — tableaux de bord et indicateurs utiles au pilotage.</li>
            <li class="feature-item"><strong>Administration</strong> — rôles, permissions et paramètres d’accès.</li>
          </ul>
          <div class="inline-visual-grid">
            <button type="button" class="project-inline-visual" data-gallery-index="0"><img src="img_projects/erp-micro-creches-gestion-enfants.png" alt="Interface de gestion des enfants d'une micro-crèche" loading="lazy" decoding="async" /><span>Gestion des enfants</span></button>
            <button type="button" class="project-inline-visual" data-gallery-index="2"><img src="img_projects/erp-micro-creches-presences-du-jour.png" alt="Suivi quotidien des présences, absences et retards" loading="lazy" decoding="async" /><span>Présences du jour</span></button>
            <button type="button" class="project-inline-visual" data-gallery-index="3"><img src="img_projects/erp-micro-creches-planning-hebdomadaire.png" alt="Calendrier hebdomadaire des créneaux de présence" loading="lazy" decoding="async" /><span>Planning hebdomadaire</span></button>
            <button type="button" class="project-inline-visual" data-gallery-index="4"><img src="img_projects/erp-micro-creches-suivi-heures-realisees.png" alt="Synthèse hebdomadaire et mensuelle des heures réalisées par enfant" loading="lazy" decoding="async" /><span>Suivi des heures réalisées</span></button>
            <button type="button" class="project-inline-visual" data-gallery-index="5"><img src="img_projects/erp-micro-creches-portail-parent-accueil.png" alt="Tableau de bord sécurisé destiné aux familles" loading="lazy" decoding="async" /><span>Portail parent - accueil</span></button>
            <button type="button" class="project-inline-visual" data-gallery-index="6"><img src="img_projects/erp-micro-creches-portail-parent-transmissions.png" alt="Fiche enfant et transmissions quotidiennes accessibles aux parents" loading="lazy" decoding="async" /><span>Portail parent - transmissions</span></button>
          </div>
        </div>
        <div class="section">
          <h3 class="section-title">Administration et dossiers familles</h3>
          <p class="description">Les administrateurs peuvent créer et gérer les comptes parents, associer les enfants aux bonnes familles et centraliser les documents et pièces administratives depuis un même espace.</p>
          <button type="button" class="project-inline-visual" data-gallery-index="7"><img src="img_projects/erp-micro-creches-gestion-comptes-parents.png" alt="Gestion des comptes parents, des enfants associés et des documents" loading="lazy" decoding="async" /><span>Administration des comptes parents et dossiers familles</span></button>
        </div>
        <div class="section">
          <h3 class="section-title">Données sensibles et sécurité</h3>
          <p class="description">L’application manipule des données concernant les enfants, les parents et le personnel. L’authentification, les rôles, les contrôles côté backend et l’isolation par établissement encadrent leur accès. Des mesures de protection et de gestion des accès ont été intégrées ; aucune conformité juridique formelle n’est revendiquée.</p>
          <button type="button" class="project-inline-visual" data-gallery-index="8"><img src="img_projects/erp-micro-creches-roles-permissions.png" alt="Schéma des rôles, périmètres d'accès et contrôles RBAC de l'ERP" loading="lazy" decoding="async" /><span>Rôles, permissions et périmètres d’accès</span></button>
        </div>
        <div class="section">
          <h3 class="section-title">Architecture technique</h3>
          <p class="description">L’ERP repose sur une SPA React connectée à une API Express, avec une couche de DTO partagés, des contrôles d’accès côté backend, MongoDB pour les données métier et des suites de tests automatisés autour des parcours critiques.</p>
          <button type="button" class="project-inline-visual" data-gallery-index="9"><img src="img_projects/erp-micro-creches-architecture-technique.png" alt="Architecture React, Express, MongoDB, tests et Docker" loading="lazy" decoding="async" /><span>Architecture technique de l’ERP</span></button>
        </div>
        <div class="section">
          <h3 class="section-title">Qualité et livraison</h3>
          <p class="description">Le dépôt comprend des suites Jest autour du backend, du frontend et des parcours critiques, une documentation API préparée autour de Swagger/OpenAPI, un environnement Docker reproductible et des workflows CI configurés. Un workflow de déploiement est préparé ; l’usage en production n’est pas affirmé ici.</p>
        </div>
        <div class="section">
          <h3 class="section-title">Principaux défis</h3>
          <div class="workflow-steps">
            <div class="workflow-step"><h4>Isolation multi-crèches</h4><p>Éviter tout accès à un établissement non autorisé. La solution repose sur le contexte de crèche et les contrôles d’accès backend.</p></div>
            <div class="workflow-step"><h4>Permissions</h4><p>Faire coexister quatre profils aux besoins distincts. Les droits sont appliqués selon le rôle et l’établissement.</p></div>
            <div class="workflow-step"><h4>Domaines métier interdépendants</h4><p>Relier enfants, équipes, présences, planning, documents et suivi quotidien. Les modules sont structurés pour conserver une expérience cohérente.</p></div>
            <div class="workflow-step"><h4>Données sensibles</h4><p>Encadrer les informations personnelles. Les parcours et contrôles privilégient la confidentialité et la limitation des accès.</p></div>
          </div>
        </div>
        <div class="section results">
          <h3 class="section-title">Résultat</h3>
          <div class="result-box success">
            <p class="result-text">La gestion de cinq micro-crèches est centralisée dans une plateforme unique, avec modules métier, portail parents et accès différenciés selon les profils.</p>
            <p class="result-text">Le projet apporte une supervision multi-sites, des dossiers centralisés, un suivi opérationnel, une communication avec les familles, une gestion des permissions et une architecture conçue pour évoluer.</p>
          </div>
        </div>
      </div>
    `,
    gallery: [
      { src: "img_projects/erp-micro-creches-gestion-enfants.png", title: "Gestion des enfants", alt: "Interface de gestion des enfants d'une micro-crèche" },
      { src: "img_projects/erp-micro-creches-vue-multisite.png", title: "Vue multi-crèches et contexte actif", alt: "Vue consolidée des enfants avec sélection de l'établissement" },
      { src: "img_projects/erp-micro-creches-presences-du-jour.png", title: "Présences du jour", alt: "Suivi quotidien des présences, absences et retards" },
      { src: "img_projects/erp-micro-creches-planning-hebdomadaire.png", title: "Planning hebdomadaire des présences", alt: "Calendrier hebdomadaire des créneaux de présence" },
      { src: "img_projects/erp-micro-creches-suivi-heures-realisees.png", title: "Suivi des heures réalisées", alt: "Synthèse hebdomadaire et mensuelle des heures réalisées par enfant" },
      { src: "img_projects/erp-micro-creches-portail-parent-accueil.png", title: "Portail parent - tableau de bord", alt: "Tableau de bord sécurisé destiné aux familles" },
      { src: "img_projects/erp-micro-creches-portail-parent-transmissions.png", title: "Portail parent - transmissions quotidiennes", alt: "Fiche enfant et transmissions quotidiennes accessibles aux parents" },
      { src: "img_projects/erp-micro-creches-gestion-comptes-parents.png", title: "Administration des comptes parents", alt: "Gestion des comptes parents, des enfants associés et des documents" },
      { src: "img_projects/erp-micro-creches-roles-permissions.png", title: "Rôles et permissions", alt: "Schéma des rôles, périmètres d'accès et contrôles RBAC de l'ERP" },
      { src: "img_projects/erp-micro-creches-architecture-technique.png", title: "Architecture technique de l'ERP", alt: "Architecture React, Express, MongoDB, tests et Docker" },
    ],
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
