import { Project } from './types';

export const opensourceProjects: Project[] = [
  {
    id: 'berserk-universe',
    title: 'Berserk Universe',
    description: "Plateforme interactive dédiée à l'univers de *Berserk* de Kentarō Miura. Présente des résumés, analyses de personnages et une carte interactive retraçant les lieux emblématiques du manga.",
    category: 'opensource',
    image: 'img_projects/berserk.png',
    tech: ['HTML', 'CSS', 'JS'],
    github: 'https://github.com/BastienLopez/Berserk',
    demo: 'https://bastienlopez.github.io/Berserk/templates/Kentaro_Miura.html',
    detailedContent: `
      <div class="project-detail">
        <h2 class="project-title">⚔️ Berserk Universe</h2>
        
        <div class="section">
          <h3 class="section-title">📋 Contexte du projet</h3>
          <p class="description">
            Plateforme interactive dédiée à l'univers de <strong>Berserk</strong> de Kentarō Miura. 
            Ce projet présente des <strong>résumés détaillés</strong>, des analyses de personnages et une 
            <strong>carte interactive</strong> retraçant les lieux emblématiques du manga culte.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">⚙️ Technologies utilisées</h3>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-icon">🌐</span>
              <span class="tech-name">HTML5</span>
              <p class="tech-desc">Structure sémantique moderne</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🎨</span>
              <span class="tech-name">CSS3</span>
              <p class="tech-desc">Design et animations</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">⚡</span>
              <span class="tech-name">JavaScript Vanilla</span>
              <p class="tech-desc">Interactions dynamiques</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">📄</span>
              <span class="tech-name">GitHub Pages</span>
              <p class="tech-desc">Hébergement gratuit</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">✨ Fonctionnalités principales</h3>
          <ul class="features-list">
            <li class="feature-item">
              <span class="feature-icon">📚</span>
              <strong>Univers détaillé</strong> - Présentation complète de Berserk
            </li>
            <li class="feature-item">
              <span class="feature-icon">👤</span>
              <strong>Fiches personnages</strong> - Analyses approfondies
            </li>
            <li class="feature-item">
              <span class="feature-icon">🗺️</span>
              <strong>Carte interactive</strong> - Lieux emblématiques du manga
            </li>
            <li class="feature-item">
              <span class="feature-icon">⏱️</span>
              <strong>Timeline</strong> - Événements majeurs chronologiques
            </li>
            <li class="feature-item">
              <span class="feature-icon">🌑</span>
              <strong>Design sombre</strong> - Atmosphère fidèle au manga
            </li>
            <li class="feature-item">
              <span class="feature-icon">📱</span>
              <strong>Navigation fluide</strong> - Interface responsive
            </li>
          </ul>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">
              ✅ Projet <strong>open source</strong> réunissant contenus, navigation interactive et exploration de l'univers de Berserk.
            </p>
            <p class="result-text">
              ✅ Ressource <strong>complète</strong> pour découvrir ou redécouvrir cet univers légendaire.
            </p>
          </div>
        </div>
      </div>
    `,
    gallery: ['img_projects/berserk.png']
  },
  {
    id: 'pokemon-binder',
    title: 'Pokémon Binder',
    description: "Application web pour gérer sa collection de cartes Pokémon TCG. Permet d'ajouter, classer et visualiser les cartes dans un classeur virtuel, avec recherche avancée et statistiques de collection.",
    category: 'opensource',
    image: 'img_projects/pokemon_binder.png',
    tech: ['React', 'JavaScript', 'Python', 'HTML / CSS'],
    github: 'https://github.com/BastienLopez/Pokemon_binder',
    demo: 'https://bastienlopez.github.io/Pokemon_binder',
    detailedContent: `
      <div class="project-detail">
        <h2 class="project-title">🎴 Pokémon Binder</h2>
        
        <div class="section">
          <h3 class="section-title">📋 Contexte du projet</h3>
          <p class="description">
            Application web complète pour <strong>gérer sa collection de cartes Pokémon TCG</strong>. 
            Permet d'ajouter, classer et visualiser les cartes dans un classeur virtuel, 
            avec un système de <strong>recherche avancée</strong> et des statistiques détaillées de collection.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">👤 Mon rôle</h3>
          <p class="description">
            Conception et développement de l'application React, logique de collection,
            intégration des données Pokémon TCG, recherche, statistiques et import/export.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">⚙️ Technologies utilisées</h3>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-icon">⚛️</span>
              <span class="tech-name">React</span>
              <p class="tech-desc">Interface utilisateur dynamique</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">📘</span>
              <span class="tech-name">JavaScript ES6+</span>
              <p class="tech-desc">Logique applicative moderne</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🐍</span>
              <span class="tech-name">Python</span>
              <p class="tech-desc">Backend et API</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🎨</span>
              <span class="tech-name">HTML / CSS</span>
              <p class="tech-desc">Design responsive</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🎮</span>
              <span class="tech-name">Pokémon TCG API</span>
              <p class="tech-desc">Données officielles des cartes</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">✨ Fonctionnalités principales</h3>
          <ul class="features-list">
            <li class="feature-item">
              <span class="feature-icon">➕</span>
              <strong>Gestion complète</strong> - Ajout et suivi de cartes
            </li>
            <li class="feature-item">
              <span class="feature-icon">📚</span>
              <strong>Classeur virtuel</strong> - Visualisation par sets
            </li>
            <li class="feature-item">
              <span class="feature-icon">🔍</span>
              <strong>Recherche avancée</strong> - Par nom, type, rareté
            </li>
            <li class="feature-item">
              <span class="feature-icon">📊</span>
              <strong>Statistiques</strong> - Détails de collection
            </li>
            <li class="feature-item">
              <span class="feature-icon">💰</span>
              <strong>Valeur collection</strong> - Suivi de la valeur totale
            </li>
            <li class="feature-item">
              <span class="feature-icon">📥</span>
              <strong>Import/Export</strong> - Sauvegarde des collections
            </li>
            <li class="feature-item">
              <span class="feature-icon">📱</span>
              <strong>Interface responsive</strong> - Consultation et gestion adaptées aux écrans courants
            </li>
          </ul>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">
              ✅ Application permettant de rechercher, organiser, importer et suivre une collection Pokémon TCG.
            </p>
            <p class="result-text">
              ✅ Recherche, statistiques et classeur virtuel regroupés dans le même parcours.
            </p>
          </div>
        </div>
      </div>
    `,
    gallery: ['img_projects/pokemon_binder.png']
  },
  {
    id: 'ia-trading',
    title: 'AI Stock Trading Bot',
    description: "Projet expérimental de collecte de données, backtesting et analyse de signaux de marché avec IA, sans promesse de performance financière.",
    category: 'opensource',
    image: 'img_projects/ai_trading.png',
    tech: ['Python', 'PyTorch', 'CUDA', 'RL', 'ML', 'NLP', 'HTML / CSS'],
    github: 'https://github.com/BastienLopez/ia_trading',
    detailedContent: `
      <div class="project-detail">
        <h2 class="project-title">🤖 AI Stock Trading Bot</h2>
        
        <div class="section">
          <h3 class="section-title">📋 Contexte du projet</h3>
          <p class="description">
            Projet expérimental de <strong>backtesting et d'analyse de signaux</strong> utilisant l'intelligence artificielle.
            Ce bot combine <strong>apprentissage par renforcement</strong> (Deep Q-Network, SAC, PPO), 
            analyse de sentiment via LLM et indicateurs techniques pour explorer des stratégies de marché.
          </p>
        </div>

        <div class="section info-box">
          <h3 class="section-title">👤 Mon rôle</h3>
          <p class="description">
            Conception et développement de l'expérimentation : collecte de données, backtesting,
            intégration de modèles d'analyse et visualisation des signaux.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">⚙️ Technologies utilisées</h3>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-icon">🐍</span>
              <span class="tech-name">Python</span>
              <p class="tech-desc">Développement backend</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🔥</span>
              <span class="tech-name">PyTorch</span>
              <p class="tech-desc">Modèles d'IA et deep learning</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">⚡</span>
              <span class="tech-name">CUDA</span>
              <p class="tech-desc">Accélération GPU</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🧠</span>
              <span class="tech-name">Reinforcement Learning</span>
              <p class="tech-desc">DQN, SAC, PPO</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">📊</span>
              <span class="tech-name">Machine Learning & NLP</span>
              <p class="tech-desc">Analyse de sentiment</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">💰</span>
              <span class="tech-name">APIs Crypto</span>
              <p class="tech-desc">CoinGecko, CryptoCompare</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">✨ Fonctionnalités principales</h3>
          <ul class="features-list">
            <li class="feature-item">
              <span class="feature-icon">📡</span>
              <strong>Collecte multi-sources</strong> - Prix, volumes, sentiment
            </li>
            <li class="feature-item">
              <span class="feature-icon">📰</span>
              <strong>Analyse de sentiment</strong> - Actualités et réseaux sociaux
            </li>
            <li class="feature-item">
              <span class="feature-icon">🤖</span>
              <strong>Agent RL</strong> - DQN, SAC, PPO
            </li>
            <li class="feature-item">
              <span class="feature-icon">📊</span>
              <strong>Indicateurs techniques</strong> - MACD, RSI, Bollinger, Ichimoku
            </li>
            <li class="feature-item">
              <span class="feature-icon">🛡️</span>
              <strong>Gestion des risques</strong> - VaR, stop-loss, trailing stops
            </li>
            <li class="feature-item">
              <span class="feature-icon">🔮</span>
              <strong>Prédictions multi-horizons</strong> - Avec intervalles de confiance
            </li>
            <li class="feature-item">
              <span class="feature-icon">🧪</span>
              <strong>Backtesting</strong> - Optimisation des hyperparamètres
            </li>
            <li class="feature-item">
              <span class="feature-icon">📊</span>
              <strong>Dashboard temps réel</strong> - Visualisations interactives
            </li>
            <li class="feature-item">
              <span class="feature-icon">💼</span>
              <strong>Trading multi-actifs</strong> - Allocation de portefeuille
            </li>
            <li class="feature-item">
              <span class="feature-icon">📋</span>
              <strong>Ordres professionnels</strong> - Limites, SL, TP
            </li>
          </ul>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">
              ✅ Exploration technique combinant collecte de données, modèles IA, gestion du risque et backtesting.
            </p>
            <p class="result-text">
              ✅ Expérimentation autour du deep learning, de l'analyse de sentiment et des indicateurs techniques.
            </p>
            <p class="result-text">
              ⚠️ Projet de R&D : il ne constitue ni un conseil en investissement ni une promesse de performance financière.
            </p>
          </div>
        </div>
      </div>
    `,
    gallery: ['img_projects/ai_trading.png']
  },
  {
    id: 'patripro',
    title: 'PatriPro',
    description: "Application permettant de centraliser le suivi des comptes, placements, budgets et emprunts dans un même tableau de bord.",
    category: 'opensource',
    image: 'img_projects/PatriPro.png',
    tech: ['React', 'Tailwind CSS', 'JavaScript', 'Chart.js'],
    demo: 'https://bastienlopez.github.io/PatriPro/',
    detailedContent: `
      <div class="project-detail">
        <h2 class="project-title">🏛️ PatriPro</h2>
        
        <div class="section">
          <h3 class="section-title">📋 Contexte du projet</h3>
          <p class="description">
            Application web complète pour <strong>gérer son patrimoine financier</strong> (placements, comptes, épargne, emprunts). 
            Permet de centraliser tous ses actifs, suivre leur évolution en temps réel et piloter son budget 
            avec des <strong>analyses graphiques</strong> et des <strong>recommandations personnalisées</strong>.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">⚙️ Technologies utilisées</h3>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-icon">⚛️</span>
              <span class="tech-name">React</span>
              <p class="tech-desc">Interface utilisateur réactive</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🎨</span>
              <span class="tech-name">Tailwind CSS</span>
              <p class="tech-desc">Design moderne et responsive</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">📊</span>
              <span class="tech-name">Chart.js</span>
              <p class="tech-desc">Graphiques et visualisations</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🚀</span>
              <span class="tech-name">GitHub Pages</span>
              <p class="tech-desc">Hébergement et déploiement</p>
            </div>
          </div>
        </div>

        <div class="section info-box">
          <h3 class="section-title">👤 Mon rôle</h3>
          <p class="description">Conception et développement de l’application, structuration du dashboard, logique de gestion patrimoniale, suivi des données financières et visualisations.</p>
        </div>

        <div class="section">
          <h3 class="section-title">✨ Fonctionnalités principales</h3>
          <ul class="features-list">
            <li class="feature-item">
              <span class="feature-icon">🎯</span>
              <strong>Dashboard</strong> - Vue d'ensemble du patrimoine avec KPIs (brut, net, rendement)
            </li>
            <li class="feature-item">
              <span class="feature-icon">💼</span>
              <strong>Portefeuilles</strong> - Gestion des placements (PEA, CTO, Crypto, Assurance-vie)
            </li>
            <li class="feature-item">
              <span class="feature-icon">🏦</span>
              <strong>Comptes bancaires</strong> - Suivi des comptes courants et soldes
            </li>
            <li class="feature-item">
              <span class="feature-icon">📗</span>
              <strong>Livrets</strong> - Gestion de l'épargne réglementée (Livret A, LDDS, LEP, PEL)
            </li>
            <li class="feature-item">
              <span class="feature-icon">💳</span>
              <strong>Emprunts</strong> - Suivi des crédits avec tableau d'amortissement
            </li>
            <li class="feature-item">
              <span class="feature-icon">💰</span>
              <strong>Budget</strong> - Pilotage des revenus et dépenses par catégorie
            </li>
            <li class="feature-item">
              <span class="feature-icon">📊</span>
              <strong>Cashflow</strong> - Flux de trésorerie et solde net mensuel
            </li>
            <li class="feature-item">
              <span class="feature-icon">📅</span>
              <strong>Calendrier</strong> - Rappels d'échéances (prélèvements, revenus)
            </li>
            <li class="feature-item">
              <span class="feature-icon">👁️</span>
              <strong>Watchlist</strong> - Surveillance d'actifs financiers (actions, crypto)
            </li>
            <li class="feature-item">
              <span class="feature-icon">📈</span>
              <strong>Insights</strong> - Analyses et recommandations (diversification, risques)
            </li>
            <li class="feature-item">
              <span class="feature-icon">🏢</span>
              <strong>Entreprise</strong> - Profil professionnel et paramètres (micro-entreprise)
            </li>
          </ul>
        </div>

        <div class="section">
          <h3 class="section-title">📊 Visualisations & graphiques</h3>
          <ul class="features-list">
            <li class="feature-item">
              <span class="feature-icon">📈</span>
              <strong>Évolution du patrimoine</strong> - Graphique temporel avec filtres (1M, 3M, 1A, YTD, MAX)
            </li>
            <li class="feature-item">
              <span class="feature-icon">🥧</span>
              <strong>Diversification</strong> - Répartition des actifs (Cash, Livrets, PEA, CTO, Crypto, Assurance-vie)
            </li>
            <li class="feature-item">
              <span class="feature-icon">📊</span>
              <strong>Budget visuel</strong> - Dépenses par catégorie avec barres de progression
            </li>
            <li class="feature-item">
              <span class="feature-icon">💸</span>
              <strong>Flux mensuels</strong> - Sources de revenus vs. catégories de dépenses
            </li>
          </ul>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">
              Application permettant de centraliser comptes, placements, budgets et emprunts dans un même tableau de bord.
            </p>
            <p class="result-text">
              Visualisations pour suivre l’évolution du patrimoine, la répartition des actifs et les flux mensuels.
            </p>
            <p class="result-text">
              ✅ Application <strong>déployée</strong> et accessible publiquement en production.
            </p>
          </div>
        </div>
      </div>
    `,
    gallery: ['img_projects/PatriPro.png']
  },
  {
    id: "ats-filter-resume",
    title: "ATS Filter Resume - Analyse ATS explicable de CV",
    description:
      "Application full stack d'analyse ATS de CV avec recommandations explicables et priorisées, avec ou sans offre d'emploi.",
    category: 'opensource',
    image: "img_projects/ATS_FILTER.png",
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Vitest",
      "Playwright",
      "GitHub Actions",
      "Docker",
    ],
    demo: "https://bastienlopez.github.io/ATS_FILTER_RESUME/",
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
    gallery: [
      "img_projects/ATS_FILTER.png",
      "img_projects/ATS1.png",
      "img_projects/ATS2.png",
      "img_projects/ATS3.png",
    ],
  },
  {
    id: 'novotel-roue-chance',
    title: 'NOVOTEL - Roue de la Chance',
    description: "Site web interactif pour le NOVOTEL Reims Tinqueux permettant aux clients de donner leur avis et de tenter leur chance avec une roue de la fortune pour gagner des récompenses.",
    category: 'opensource',
    image: 'img_projects/novotel.png',
    tech: ['JavaScript', 'D3.js', 'HTML', 'CSS', 'GitHub Actions'],
    github: 'https://github.com/BastienLopez/NOVOTEL_Roue_de_la_chance',
    detailedContent: `
      <div class="project-detail">
        <h2 class="project-title">🎡 NOVOTEL - Roue de la Chance</h2>
        
        <div class="section">
          <h3 class="section-title">📋 Contexte du projet</h3>
          <p class="description">
            Expérience web conçue pour le restaurant du <strong>NOVOTEL Reims Tinqueux</strong>. Des QR codes placés sur les sous-verres permettaient aux clients d’accéder depuis leur téléphone à un parcours autour d’un avis Google, puis à une roue de la chance offrant la possibilité de gagner un lot.
          </p>
        </div>

        <div class="section info-box">
          <h3 class="section-title">👤 Mon rôle</h3>
          <p class="description">Conception de l’expérience web, développement frontend, logique de la roue, intégration du parcours QR, formulaire et déploiement automatisé.</p>
        </div>

        <div class="section">
          <h3 class="section-title">⚙️ Technologies utilisées</h3>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-icon">📘</span>
              <span class="tech-name">JavaScript</span>
              <p class="tech-desc">Interactions dynamiques</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">📊</span>
              <span class="tech-name">D3.js</span>
              <p class="tech-desc">Animation de la roue</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🌐</span>
              <span class="tech-name">HTML5</span>
              <p class="tech-desc">Structure sémantique</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🎨</span>
              <span class="tech-name">CSS3</span>
              <p class="tech-desc">Design responsive</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🔄</span>
              <span class="tech-name">GitHub Actions</span>
              <p class="tech-desc">Déploiement automatisé</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">✨ Fonctionnalités principales</h3>
          <ul class="features-list">
            <li class="feature-item">
              <span class="feature-icon">📝</span>
              <strong>Formulaire d'avis</strong> - Validation (min 50 caractères)
            </li>
            <li class="feature-item">
              <span class="feature-icon">😊</span>
              <strong>Évaluation emoji</strong> - Système de notation intuitif
            </li>
            <li class="feature-item">
              <span class="feature-icon">🎡</span>
              <strong>Roue de la chance</strong> - Animation fluide et attractive
            </li>
            <li class="feature-item">
              <span class="feature-icon">🎁</span>
              <strong>Coupons personnalisés</strong> - Téléchargement automatique
            </li>
            <li class="feature-item">
              <span class="feature-icon">🔗</span>
              <strong>Redirection Google</strong> - Pour avis publics
            </li>
            <li class="feature-item">
              <span class="feature-icon">📱</span>
              <strong>Design responsive</strong> - Tous les écrans
            </li>
            <li class="feature-item">
              <span class="feature-icon">🔒</span>
              <strong>Conformité RGPD</strong> - Mentions légales complètes
            </li>
            <li class="feature-item">
              <span class="feature-icon">🚀</span>
              <strong>Déploiement automatisé</strong> - Via GitHub Actions
            </li>
            <li class="feature-item">
              <span class="feature-icon">🔐</span>
              <strong>HTTPS sécurisé</strong> - Let's Encrypt
            </li>
          </ul>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">
              ✅ Solution <strong>complète et professionnelle</strong> pour améliorer l'engagement client.
            </p>
            <p class="result-text">
              ✅ Système <strong>gamifié</strong> encourageant les retours d'expérience avec une expérience ludique.
            </p>
          </div>
        </div>
      </div>
    `,
    gallery: ['img_projects/novotel.png']
  }
];
