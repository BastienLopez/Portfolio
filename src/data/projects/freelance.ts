import { Project } from "./types";

export const freelanceProjects: Project[] = [
  {
    id: "eloi-coachsteo",
    title: "Eloi CoachStéo - Sport Trainer",
    description:
      "Site vitrine one-page pour présenter l'accompagnement d'un coach sportif et ostéopathe : remise en forme, préparation physique, programmes personnalisés et entraînement HYROX.",
    category: "freelance",
    image: "img_projects/eloi_sport.png",
    tech: ["React", "Tailwind CSS", "JavaScript"],
    github: "",
    demo: "https://bastienlopez.github.io/Eloi_Coaching/",
    detailedContent: `
      <div class="project-detail">
        <h2 class="project-title">💪 Eloi CoachStéo - Sport Trainer</h2>
        
        <div class="section">
          <h3 class="section-title">📋 Contexte du projet</h3>
          <p class="description">
            Création d'un <strong>site vitrine one-page</strong> pour présenter l'activité d'Eloi,
            à la croisée du coaching sportif et de l'ostéopathie. Le besoin était de rendre l'offre
            compréhensible dès l'arrivée, puis d'accompagner le visiteur vers le bon service et la prise
            de contact.
          </p>
          <p class="description">
            La page rassemble la remise en forme, la préparation physique et les programmes personnalisés
            <strong>HYROX</strong> dans une expérience continue. Le format one-page évite de disperser
            l'information et permet de parcourir rapidement les prestations depuis un téléphone comme
            depuis un écran large.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">👤 Mon rôle</h3>
          <p class="description">
            J'ai pris en charge la conception du site, la hiérarchie des contenus, l'intégration React
            et Tailwind CSS, la mise en page responsive et la mise en ligne. J'ai transformé les
            informations de service en sections courtes, lisibles et orientées vers une action claire.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">🧭 Parcours de la page</h3>
          <ul class="features-list">
            <li class="feature-item"><strong>Positionnement</strong> — Comprendre rapidement le double accompagnement coaching et ostéopathie.</li>
            <li class="feature-item"><strong>Prestations</strong> — Identifier la remise en forme, la préparation physique et les programmes HYROX.</li>
            <li class="feature-item"><strong>Preuves et réassurance</strong> — Mettre en avant les visuels et la section de témoignages déjà prévue dans le site.</li>
            <li class="feature-item"><strong>Contact</strong> — Atteindre le formulaire ou le parcours de prise de rendez-vous sans chercher l'information.</li>
          </ul>
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

        <div class="section">
          <h3 class="section-title">📈 Valeur apportée</h3>
          <p class="description">
            Le site donne une vitrine professionnelle à une activité qui réunit plusieurs expertises.
            La hiérarchie de la page aide le visiteur à comprendre l'offre, à distinguer les types
            d'accompagnement et à passer directement au contact lorsqu'il est prêt.
          </p>
          <p class="description">
            Le gain est surtout opérationnel et qualitatif : les informations sont regroupées dans
            une page responsive, la galerie apporte un support visuel et le parcours de contact devient
            identifiable sur mobile comme sur desktop. Aucun volume de rendez-vous ni taux de conversion
            n'est revendiqué sans mesure publiée.
          </p>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">
              ✅ Site déployé pour présenter clairement l'offre de coaching,
              les services et les modalités de contact.
            </p>
            <p class="result-text">
              ✅ Présentation <strong>claire et professionnelle</strong> de son expertise en coaching
              sportif et ostéopathie, avec une lecture immédiate des prestations.
            </p>
            <p class="result-text">
              ✅ Parcours responsive déployé pour consulter les services et accéder au contact depuis
              les principaux supports.
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
            <li class="feature-item"><strong>Portail parents</strong> — espace dédié aux familles avec accès différenciés.</li>
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
            <button type="button" class="project-inline-visual" data-gallery-index="5"><img src="img_projects/erp-micro-creches-portail-parent-accueil.png" alt="Tableau de bord destiné aux familles" loading="lazy" decoding="async" /><span>Portail parent - accueil</span></button>
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
          <p class="description">L’ERP repose sur une SPA React connectée à une API Express, avec des contrôles d’accès côté backend, MongoDB pour les données métier et des suites de tests automatisés autour de certains parcours critiques.</p>
          <button type="button" class="project-inline-visual" data-gallery-index="9"><img src="img_projects/erp-micro-creches-architecture-technique.png" alt="Architecture React, Express, MongoDB, tests et Docker" loading="lazy" decoding="async" /><span>Architecture technique de l’ERP</span></button>
        </div>
        <div class="section">
          <h3 class="section-title">Qualité et livraison</h3>
          <p class="description">Le dépôt comprend des suites Jest principalement autour du backend et de certains parcours critiques, une documentation API préparée autour de Swagger/OpenAPI, un environnement Docker reproductible et des workflows CI configurés. Un workflow de déploiement est préparé ; l’usage en production n’est pas affirmé ici.</p>
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
      "Site vitrine premium pour présenter les prestations de detailing automobile : nettoyage, décontamination, polissage, protection céramique et remise à neuf esthétique.",
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
            Création d'un <strong>site vitrine premium</strong> pour un atelier de detailing automobile.
            Le site devait expliquer clairement des prestations qui ne se résument pas à un simple lavage :
            décontamination, polissage, protection céramique et relooking intérieur.
          </p>
          <p class="description">
            L'interface met l'accent sur le résultat visuel attendu, la différence entre les services
            et la possibilité de demander un rendez-vous. La galerie et les appels à l'action structurent
            la visite sans alourdir la page.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">👤 Mon rôle</h3>
          <p class="description">
            J'ai assuré la conception et l'intégration frontend avec React et Tailwind CSS, l'adaptation
            responsive, la hiérarchisation des prestations, la galerie, la prise de contact et le
            déploiement du site. Le travail a consisté à transformer une offre technique en parcours
            visuel compréhensible pour un futur client.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">🧭 Parcours de présentation</h3>
          <ul class="features-list">
            <li class="feature-item"><strong>Accroche premium</strong> — Installer l'univers de la marque et la promesse de soin dès le premier écran.</li>
            <li class="feature-item"><strong>Services</strong> — Distinguer nettoyage, polissage, protection céramique et travail intérieur.</li>
            <li class="feature-item"><strong>Résultats visibles</strong> — Utiliser la galerie avant/après pour donner un repère concret au visiteur.</li>
            <li class="feature-item"><strong>Demande de rendez-vous</strong> — Garder un contact direct et accessible depuis chaque étape importante.</li>
          </ul>
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

        <div class="section">
          <h3 class="section-title">📈 Valeur apportée</h3>
          <p class="description">
            Le site transforme une liste de prestations en une présentation guidée : le visiteur comprend
            ce qui est proposé, voit le niveau de finition attendu et sait comment entrer en contact.
            Cette structure aide l'atelier à expliquer des interventions parfois techniques sans perdre
            la dimension visuelle propre au detailing.
          </p>
          <p class="description">
            Le gain est qualitatif : une vitrine cohérente, responsive et centrée sur les réalisations,
            avec un accès direct à la demande de rendez-vous. Les performances commerciales ne sont pas
            chiffrées ici faute de données de suivi publiées.
          </p>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">
              ✅ Site déployé pour présenter clairement les prestations, les exemples de rendu et les
              modalités de prise de contact.
            </p>
            <p class="result-text">
              ✅ Parcours responsive permettant de passer de la découverte d'un service à la demande
              de rendez-vous sans rupture.
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
      "Site vitrine pour Cle De Voute Maçonnerie : présentation des prestations, mise en valeur des réalisations et accès rapide à la prise de contact.",
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
            orienté prise de contact. Le projet devait présenter les prestations et les réalisations
            avec suffisamment de contexte pour rassurer un particulier ou un professionnel avant sa
            première demande.
          </p>
          <p class="description">
            La page a donc été pensée comme un parcours simple : comprendre l'activité, parcourir le
            portfolio, puis trouver rapidement le moyen de contacter l'entreprise. La structure reste
            lisible sur mobile, où une grande partie des recherches locales commence.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">🧑‍💻 Rôle</h3>
          <p class="description">
            J'ai pris en charge la conception et l'intégration frontend, le design d'interface,
            l'organisation des sections, l'optimisation des images, la mise en avant des CTA et le
            déploiement sur GitHub Pages. Le travail couvre le passage du besoin de visibilité locale
            à une page publique directement exploitable.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">🧭 Parcours et contenu</h3>
          <ul class="features-list">
            <li class="feature-item"><strong>Présentation de l'activité</strong> — Donner le contexte nécessaire avant d'entrer dans le détail des prestations.</li>
            <li class="feature-item"><strong>Réalisations</strong> — Utiliser le portfolio pour rendre le savoir-faire visible et concret.</li>
            <li class="feature-item"><strong>Appels à l'action</strong> — Rendre la demande de contact visible sans interrompre la lecture.</li>
            <li class="feature-item"><strong>Responsive</strong> — Conserver la hiérarchie et la lisibilité sur téléphone, tablette et desktop.</li>
          </ul>
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
            <li class="feature-item">Simplifier la prise de contact pour rendre la demande plus directe.</li>
          </ul>
        </div>

        <div class="section">
          <h3 class="section-title">🔧 Solutions apportées</h3>
          <ul class="features-list">
            <li class="feature-item">Optimisation des images (WebP/AVIF) et lazy-loading pour alléger le chargement initial.</li>
            <li class="feature-item">Design mobile-first avec composants réutilisables (Tailwind + React).</li>
            <li class="feature-item">Formulaire de contact simple et mise en évidence des appels à l'action (CTA).</li>
            <li class="feature-item">Déploiement sur GitHub Pages pour une distribution simple et fiable.</li>
          </ul>
        </div>

        <div class="section">
          <h3 class="section-title">📈 Valeur apportée</h3>
          <p class="description">
            Le site donne à l'entreprise un support public qui explique son activité en quelques étapes
            et met les réalisations au centre de la décision. Les composants réutilisables facilitent
            les évolutions de contenu, tandis que les images optimisées évitent de sacrifier la qualité
            visuelle sur les pages de portfolio.
          </p>
          <p class="description">
            Le gain observable est une présentation plus claire et un contact plus accessible depuis
            les usages mobiles. La baisse exacte du poids ou du temps de chargement n'est pas chiffrée
            dans cette fiche ; elle reste à mesurer avec un outil de suivi si nécessaire.
          </p>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">✅ Site déployé et accessible publiquement via GitHub Pages.</p>
            <p class="result-text">✅ Chargement initial allégé et rendu visuel préservé grâce aux images optimisées.</p>
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
