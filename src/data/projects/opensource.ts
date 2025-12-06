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
              ✅ Projet <strong>open source</strong> apprécié par la communauté des fans de Berserk.
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
              <strong>Interface intuitive</strong> - Responsive et ergonomique
            </li>
          </ul>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">
              ✅ Outil <strong>pratique et complet</strong> pour les collectionneurs de cartes Pokémon.
            </p>
            <p class="result-text">
              ✅ Interface <strong>moderne et ergonomique</strong> facilitant la gestion et le suivi des collections.
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
    description: "Système de trading de cryptomonnaies utilisant l'intelligence artificielle, l'apprentissage par renforcement (RL) et l'analyse de sentiment pour prédire les mouvements de marché.",
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
            Système complet de <strong>trading automatisé</strong> utilisant l'intelligence artificielle avancée. 
            Ce bot combine <strong>apprentissage par renforcement</strong> (Deep Q-Network, SAC, PPO), 
            analyse de sentiment via LLM et indicateurs techniques pour optimiser les décisions de trading.
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
              ✅ Système <strong>complet</strong> combinant état de l'art en IA et finance quantitative.
            </p>
            <p class="result-text">
              ✅ Techniques avancées de <strong>deep learning</strong>, gestion des risques et optimisation de portefeuille.
            </p>
            <p class="result-text">
              ✅ Maximisation des performances tout en <strong>contrôlant l'exposition au risque</strong>.
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
    description: "Application de gestion de patrimoine financier. Suivi des portefeuilles, comptes bancaires, livrets, emprunts et budget avec analyses et insights en temps réel.",
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
              ✅ Solution <strong>complète</strong> pour centraliser et piloter son patrimoine financier.
            </p>
            <p class="result-text">
              ✅ Interface <strong>intuitive</strong> avec graphiques en temps réel et recommandations.
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
            Site web interactif conçu pour le <strong>NOVOTEL Reims Tinqueux</strong> permettant aux clients 
            de donner leur avis et de participer à un <strong>jeu de la roue de la fortune</strong> pour gagner 
            des récompenses attractives. Système gamifié pour améliorer l'engagement client.
          </p>
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
