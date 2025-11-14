import { Project } from './types';

export const freelanceProjects: Project[] = [
  {
    id: 'eloi-coachsteo',
    title: 'Eloi CoachStéo - Sport Trainer',
    description: "Site vitrine one-page pour un coach sportif et ostéopathe. Présentation des services de remise en forme, de préparation physique et de programmes personnalisés HYRIX.",
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
            <strong>HYRIX</strong> avec un design moderne et responsive.
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
              <strong>Services détaillés</strong> - Présentation des programmes HYRIX
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
              ✅ Site <strong>déployé avec succès</strong> permettant au coach d'<strong>augmenter sa visibilité en ligne</strong> 
              et d'attirer de nouveaux clients.
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
              ✅ <strong>Amélioration significative</strong> de la productivité administrative et gain de temps considérable.
            </p>
          </div>
        </div>
      </div>
    `,
    gallery: ['img_projects/creche.png']
  },
  {
    id: 'luxury-auto-detailling',
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
              ✅ Site <strong>déployé</strong> et optimisé pour présenter l'ensemble des prestations et convertir les visiteurs en clients.
            </p>
          </div>
        </div>
      </div>
    `,
    gallery: ['img_projects/LuxuryAutoDetailling.png']
  }
  ,
  {
    id: 'cledevoute',
    title: 'CleDeVoute',
    description: "Site vitrine pour CleDeVoute — présentation de services et portfolio.",
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
            Création d'un <strong>site vitrine</strong> pour CleDeVoute afin de présenter ses services,
            réalisations et faciliter la prise de contact avec les clients.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">⚙️ Technologies utilisées</h3>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-icon">🌐</span>
              <span class="tech-name">HTML</span>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🎨</span>
              <span class="tech-name">CSS</span>
            </div>
            <div class="tech-item">
              <span class="tech-icon">⚡</span>
              <span class="tech-name">JavaScript</span>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">✨ Fonctionnalités principales</h3>
          <ul class="features-list">
            <li class="feature-item"><strong>Présentation claire</strong> des services et réalisations</li>
            <li class="feature-item"><strong>Galerie</strong> d'exemples visuels</li>
            <li class="feature-item"><strong>Contact</strong> simple et accessible</li>
            <li class="feature-item"><strong>Responsive</strong> et optimisé mobile</li>
          </ul>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">✅ Site déployé et accessible publiquement via GitHub Pages.</p>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">🔗 Démo</h3>
          <p class="description"><a href="https://bastienlopez.github.io/CleDeVoute/" target="_blank" rel="noopener noreferrer">Voir la démo</a></p>
        </div>
      </div>
    `,
    gallery: ['img_projects/CleDeVoute.png']
  }
];
