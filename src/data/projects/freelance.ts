import { Project } from './types';

export const freelanceProjects: Project[] = [
  {
    id: 'eloi-coachsteo',
    title: 'Eloi CoachStéo - Sport Trainer',
    description: "Site vitrine one-page pour un coach sportif et ostéopathe. Présentation des services de remise en forme, de préparation physique et de programmes personnalisés HYROX.",
    category: 'freelance',
    image: 'img_projects/eloi_sport.png',
    tech: ['React', 'Tailwind CSS', 'JavaScript'],
    github: 'https://github.com/BastienLopez/Eloi_Coaching',
    demo: 'https://bastienlopez.github.io/Eloi_Coaching/',
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
    gallery: ['img_projects/eloi_sport.png']
  },
  {
    id: 'erp-micro-creches',
    title: 'ERP Micro-Crèches',
    description: "ERP multifonctionnel conçu pour la gestion de plusieurs micro-crèches. Permet la centralisation des données et la supervision de plusieurs établissements depuis une seule interface.",
    category: 'freelance',
    image: 'img_projects/creche.png',
    tech: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'Docker', 'CI/CD', 'TDD'],
    github: 'https://github.com/BastienLopez/Creche_Bon_Petit_Bonhomme',
    detailedContent: `
      <div class="project-detail">
        <h2 class="project-title">👶 ERP Micro-Crèches</h2>
        
        <div class="section">
          <h3 class="section-title">📋 Contexte du projet</h3>
          <p class="description">
            Développement d'un <strong>ERP complet et multifonctionnel</strong> conçu spécifiquement pour la gestion 
            de plusieurs micro-crèches. La solution permet la <strong>centralisation des données</strong> et la supervision 
            de plusieurs établissements depuis une seule interface centralisée.
          </p>
        </div>

        <div class="section info-box">
          <h3 class="section-title">👤 Mon rôle</h3>
          <p class="description">
            Conception et développement full-stack de l'application : modules métier, back-office, gestion des droits,
            intégration des données et préparation du déploiement Docker/CI-CD.
          </p>
          <p class="description">
            Le projet traite des dossiers et des accès par rôle ; les détails fonctionnels restent partiellement anonymisés
            pour préserver la confidentialité.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">⚙️ Technologies utilisées</h3>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-icon">⚛️</span>
              <span class="tech-name">React</span>
              <p class="tech-desc">Interface utilisateur moderne</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🟢</span>
              <span class="tech-name">Node.js</span>
              <p class="tech-desc">Backend performant et scalable</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">📘</span>
              <span class="tech-name">JavaScript ES6+</span>
              <p class="tech-desc">Code moderne et maintenable</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🍃</span>
              <span class="tech-name">MongoDB</span>
              <p class="tech-desc">Base de données NoSQL flexible</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🐳</span>
              <span class="tech-name">Docker</span>
              <p class="tech-desc">Conteneurisation et déploiement</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🔄</span>
              <span class="tech-name">CI/CD</span>
              <p class="tech-desc">Intégration et déploiement continus</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🧪</span>
              <span class="tech-name">TDD</span>
              <p class="tech-desc">Test-Driven Development</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">✨ Fonctionnalités principales</h3>
          <ul class="features-list">
            <li class="feature-item">
              <span class="feature-icon">🏢</span>
              <strong>Multi-établissements</strong> - Gestion centralisée de plusieurs crèches
            </li>
            <li class="feature-item">
              <span class="feature-icon">👶</span>
              <strong>Suivi des présences</strong> - Enfants et personnel en temps réel
            </li>
            <li class="feature-item">
              <span class="feature-icon">📝</span>
              <strong>Inscriptions & Dossiers</strong> - Gestion complète des documents
            </li>
            <li class="feature-item">
              <span class="feature-icon">💰</span>
              <strong>Facturation</strong> - Comptabilité et paiements automatisés
            </li>
            <li class="feature-item">
              <span class="feature-icon">📅</span>
              <strong>Planning</strong> - Organisation du personnel et activités
            </li>
            <li class="feature-item">
              <span class="feature-icon">📊</span>
              <strong>Tableau de bord</strong> - Statistiques et KPIs en temps réel
            </li>
            <li class="feature-item">
              <span class="feature-icon">🔐</span>
              <strong>Permissions</strong> - Système de droits granulaire
            </li>
          </ul>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">
              ✅ Solution <strong>complète</strong> permettant une gestion <strong>efficace et centralisée</strong> 
              de plusieurs micro-crèches.
            </p>
            <p class="result-text">
              ✅ Interface centralisée pour la gestion de plusieurs micro-crèches,
              avec modules métier, suivi et accès par rôle.
            </p>
          </div>
        </div>
      </div>
    `,
    gallery: ['img_projects/creche.png']
  },
  {
    id: 'luxury-auto-detailing',
    title: 'Luxury Auto Detailing',
    description: "Site vitrine pour prestations de detailing automobile haut de gamme : nettoyage, polissage, protection céramique et remise à neuf esthétique.",
    category: 'freelance',
    image: 'img_projects/LuxuryAutoDetailling.png',
    tech: ['React', 'Tailwind CSS', 'JavaScript'],
    demo: 'https://bastienlopez.github.io/LuxuryAutoDetailling/',
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
    gallery: ['img_projects/LuxuryAutoDetailling.png']
  }
  ,
  {
    id: 'ats-filter-resume',
    title: 'ATS Filter Resume - Analyse ATS explicable de CV',
    description: "Application full stack d'analyse ATS de CV avec recommandations explicables et priorisées, avec ou sans offre d'emploi.",
    category: 'freelance',
    image: 'img_projects/ATS_FILTER.png',
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Vitest', 'Playwright', 'GitHub Actions', 'Docker'],
    demo: 'https://bastienlopez.github.io/ATS_FILTER_RESUME/',
    detailedContent: `
      <div class="project-detail">
        <h2 class="project-title">📄 ATS Filter Resume - Analyse ATS explicable de CV</h2>

        <div class="section">
          <h3 class="section-title">📋 Contexte du projet</h3>
          <p class="description">
            Le projet est né d'un besoin concret : de nombreuses candidatures sont filtrées automatiquement
            avant lecture humaine. L'objectif est de fournir un diagnostic clair, pédagogique et actionnable
            pour corriger un CV selon des critères ATS réalistes, sans promesse trompeuse d'embauche.
          </p>
        </div>

        <div class="section info-box">
          <h3 class="section-title">👤 Mon rôle</h3>
          <p class="description">
            Conception et développement de l'application, de la logique d'analyse ATS explicable,
            des parcours de validation et du pipeline de tests et de déploiement.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">🎯 Objectif & positionnement</h3>
          <ul class="features-list">
            <li class="feature-item">
              <span class="feature-icon">🧩</span>
              <strong>Type</strong> - Application web full stack
            </li>
            <li class="feature-item">
              <span class="feature-icon">🎯</span>
              <strong>Objectif</strong> - Évaluer la compatibilité ATS d'un CV avec ou sans offre d'emploi
            </li>
            <li class="feature-item">
              <span class="feature-icon">👥</span>
              <strong>Cible</strong> - Candidats qui veulent augmenter leurs chances de passer les filtres ATS
            </li>
            <li class="feature-item">
              <span class="feature-icon">🚀</span>
              <strong>Statut</strong> - Projet fonctionnel avec pipeline qualité et déploiement GitHub Pages
            </li>
          </ul>
        </div>

        <div class="section">
          <h3 class="section-title">⚙️ Technologies utilisées</h3>
          <div class="tech-grid">
            <div class="tech-item"><span class="tech-icon">🧠</span><span class="tech-name">Frontend</span><p class="tech-desc">Next.js 16, React 19, TypeScript, Tailwind CSS v4</p></div>
            <div class="tech-item"><span class="tech-icon">🔌</span><span class="tech-name">Backend</span><p class="tech-desc">API Routes Next.js et logique d'analyse ATS maison</p></div>
            <div class="tech-item"><span class="tech-icon">📄</span><span class="tech-name">Parsing CV</span><p class="tech-desc">pdf-parse, mammoth</p></div>
            <div class="tech-item"><span class="tech-icon">✅</span><span class="tech-name">Validation</span><p class="tech-desc">Zod, React Hook Form</p></div>
            <div class="tech-item"><span class="tech-icon">🧪</span><span class="tech-name">Tests</span><p class="tech-desc">Vitest (unit, integration, UI) et Playwright (e2e)</p></div>
            <div class="tech-item"><span class="tech-icon">🧹</span><span class="tech-name">Qualité</span><p class="tech-desc">ESLint, Prettier, Husky, lint-staged</p></div>
            <div class="tech-item"><span class="tech-icon">⚡</span><span class="tech-name">CI/CD</span><p class="tech-desc">GitHub Actions (CI unifiée + déploiement GitHub Pages)</p></div>
            <div class="tech-item"><span class="tech-icon">🐳</span><span class="tech-name">Containerisation</span><p class="tech-desc">Docker, docker compose</p></div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">✨ Fonctionnalités principales</h3>
          <ul class="features-list">
            <li class="feature-item"><span class="feature-icon">📥</span>Import CV en PDF ou DOCX</li>
            <li class="feature-item"><span class="feature-icon">🧾</span>Analyse avec ou sans offre d'emploi</li>
            <li class="feature-item"><span class="feature-icon">🧱</span>Détection des sections critiques du CV</li>
            <li class="feature-item"><span class="feature-icon">🔎</span>Extraction des mots-clés, outils, langues et pré-requis</li>
            <li class="feature-item"><span class="feature-icon">📊</span>Scoring détaillé : global, ATS, lisibilité, matching, structure, complétude</li>
            <li class="feature-item"><span class="feature-icon">🚨</span>Identification des risques de rejet automatisé</li>
            <li class="feature-item"><span class="feature-icon">🛠️</span>Recommandations priorisées avec impact estimé</li>
            <li class="feature-item"><span class="feature-icon">🧭</span>Dashboard résultat complet et explicable</li>
            <li class="feature-item"><span class="feature-icon">📱</span>Parcours testé de bout en bout (desktop et mobile)</li>
          </ul>
        </div>

        <div class="section results">
          <h3 class="section-title">⚠️ Limites et interprétation du score</h3>
          <div class="result-box">
            <p class="result-text">
              Le score est un indicateur d'aide à l'optimisation basé sur des règles d'analyse.
              Les ATS utilisent des règles et technologies différentes : aucun score ne peut garantir
              qu'un CV sera accepté ou transmis à un recruteur.
            </p>
          </div>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">✅ Pipeline qualité stable : lint, typecheck, tests unitaires, integration, UI.</p>
            <p class="result-text">✅ Suite e2e verte sur les parcours principaux.</p>
            <p class="result-text">✅ Build production valide et workflow CI/CD unifié exécuté au push.</p>
            <p class="result-text">✅ Build statique GitHub Pages valide pour publication.</p>
            <p class="result-text">✅ Projet présentable en portfolio avec architecture claire et logique métier explicable.</p>
          </div>
        </div>
      </div>
    `,
    gallery: ['img_projects/ATS_FILTER.png', 'img_projects/ATS1.png', 'img_projects/ATS2.png', 'img_projects/ATS3.png']
  },
  {
    id: 'cledevoute',
    title: 'Cle De Voute - Maçonnerie',
    description: "Site vitrine pour Cle De Voute Maçonnerie — présentation de services et portfolio.",
    category: 'freelance',
    image: 'img_projects/CleDeVoute.png',
    tech: ['React', 'Tailwind CSS', 'JavaScript'],
    demo: 'https://bastienlopez.github.io/CleDeVoute/',
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
    gallery: ['img_projects/CleDeVoute.png']
  }
];
