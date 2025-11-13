import { Project } from './types';

export const emploiProjects: Project[] = [
  {
    id: 'wallet-provider',
    title: 'Altme Wallet Provider',
    description: "Solution de Wallet d'identité numérique pour entreprises et particuliers. Gestion de données vérifiables, conformité eIDAS 2.0 et interopérabilité avec l'EUDI Wallet européen.",
    category: 'emploi',
    image: 'img_projects/wallet_provider.png',
    tech: ['Identity Wallet', 'eIDAS 2.0', 'Verifiable Credentials', 'OIDC4VC', 'EBSI', 'SSI'],
    demo: 'https://www.talao.io/fr/',
    detailedContent: `
      <div class="project-detail">
        <h2 class="project-title">🔐 Altme Wallet Provider</h2>
        
        <div class="section">
          <h3 class="section-title">📋 Contexte du projet</h3>
          <p class="description">
            Solution complète de <strong>Wallet d'identité numérique</strong> pour entreprises et particuliers, développée 
            par Talao/Credenco. Permet la gestion sécurisée de <strong>données vérifiables</strong> (Verifiable Credentials), 
            conforme au règlement <strong>eIDAS 2.0</strong> et interopérable avec l'<strong>EUDI Wallet européen</strong>.
          </p>
        </div>

        <div class="section info-box">
          <h3 class="section-title">💡 Qu'est-ce qu'un Wallet Provider ?</h3>
          <p class="description">
            Un <strong>Wallet Provider</strong> fournit une infrastructure sécurisée pour stocker et gérer des 
            <strong>attestations vérifiables</strong> (KBIS, IBAN, diplômes, justificatifs d'identité, etc.). 
            Il permet aux entreprises et particuliers de prouver leur identité et leurs qualifications de manière 
            <strong>instantanée et infalsifiable</strong>.
          </p>
          <p class="highlight">
            🎯 <strong>Self-Sovereign Identity (SSI)</strong> : L'utilisateur contrôle totalement ses données 
            et décide avec qui les partager, conformément au RGPD.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">⚙️ Technologies et standards</h3>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-icon">🇪🇺</span>
              <span class="tech-name">eIDAS 2.0</span>
              <p class="tech-desc">Conformité règlement européen</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🔑</span>
              <span class="tech-name">Verifiable Credentials</span>
              <p class="tech-desc">Attestations infalsifiables W3C</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🌐</span>
              <span class="tech-name">OIDC4VC</span>
              <p class="tech-desc">Émission et présentation sécurisées</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🏛️</span>
              <span class="tech-name">EBSI V3</span>
              <p class="tech-desc">Infrastructure blockchain européenne</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🛡️</span>
              <span class="tech-name">SSI (Self-Sovereign Identity)</span>
              <p class="tech-desc">Contrôle total de ses données</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🔐</span>
              <span class="tech-name">SD-JWT, JWT, JSON-LD</span>
              <p class="tech-desc">Formats de credentials standardisés</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">✨ Fonctionnalités principales</h3>
          <ul class="features-list">
            <li class="feature-item">
              <span class="feature-icon">📝</span>
              <strong>Gestion de données vérifiables</strong> - Créer, partager et vérifier des preuves numériques
            </li>
            <li class="feature-item">
              <span class="feature-icon">✍️</span>
              <strong>Mandats numériques</strong> - Délégation de pouvoir, signature, représentation
            </li>
            <li class="feature-item">
              <span class="feature-icon">🏢</span>
              <strong>Preuves d'appartenance</strong> - Rôles dans l'entreprise, représentant légal
            </li>
            <li class="feature-item">
              <span class="feature-icon">🛡️</span>
              <strong>Protection contre la fraude</strong> - Sources authentiques et données infalsifiables
            </li>
            <li class="feature-item">
              <span class="feature-icon">🇪🇺</span>
              <strong>Conformité eIDAS 2.0</strong> - Hébergé et développé en Europe
            </li>
            <li class="feature-item">
              <span class="feature-icon">⚡</span>
              <strong>Vérification automatique</strong> - Workflows personnalisés et validation instantanée
            </li>
            <li class="feature-item">
              <span class="feature-icon">🔗</span>
              <strong>Interopérabilité</strong> - Compatible EUDI Wallet et standards européens
            </li>
          </ul>
        </div>

        <div class="section">
          <h3 class="section-title">🎫 Types d'attestations supportées</h3>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-icon">🪪</span>
              <span class="tech-name">Justificatif d'identité</span>
              <p class="tech-desc">Carte d'identité, passeport</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🏦</span>
              <span class="tech-name">IBAN / RIB</span>
              <p class="tech-desc">Coordonnées bancaires vérifiées</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">📧</span>
              <span class="tech-name">Preuve d'e-mail</span>
              <p class="tech-desc">Email vérifié et authentifié</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🏠</span>
              <span class="tech-name">Justificatif de domicile</span>
              <p class="tech-desc">Preuve d'adresse vérifiable</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🎓</span>
              <span class="tech-name">Diplômes & certifications</span>
              <p class="tech-desc">Formations et qualifications</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🏢</span>
              <span class="tech-name">KBIS entreprise</span>
              <p class="tech-desc">Attestation d'immatriculation</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">👔</span>
              <span class="tech-name">Représentant légal</span>
              <p class="tech-desc">Mandat de représentation</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">💼</span>
              <span class="tech-name">Attestation employeur</span>
              <p class="tech-desc">Certificat de travail, rôles</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">🎯 Cas d'usage</h3>
          <ul class="features-list">
            <li class="feature-item">
              <span class="feature-icon">🔍</span>
              <strong>KYB (Know Your Business)</strong> - Vérification instantanée des partenaires commerciaux
            </li>
            <li class="feature-item">
              <span class="feature-icon">📋</span>
              <strong>KYC (Know Your Customer)</strong> - Onboarding sécurisé et conforme
            </li>
            <li class="feature-item">
              <span class="feature-icon">🚚</span>
              <strong>Supply Chain</strong> - Traçabilité des produits avec TRACE4EU
            </li>
            <li class="feature-item">
              <span class="feature-icon">📦</span>
              <strong>Digital Product Passport</strong> - Passeport numérique des produits
            </li>
            <li class="feature-item">
              <span class="feature-icon">🔗</span>
              <strong>Data Spaces</strong> - Échange sécurisé de données entre organisations
            </li>
          </ul>
        </div>

        <div class="section">
          <h3 class="section-title">🏆 Partenaires et certifications</h3>
          <p class="description">
            Talao travaille avec des acteurs majeurs de l'identité numérique européenne et internationale :
          </p>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-icon">🇪🇺</span>
              <span class="tech-name">LSP WEBUILD</span>
              <p class="tech-desc">Consortium EUDI Wallet piloté par la Commission Européenne</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🏛️</span>
              <span class="tech-name">EBSI V3 Conformant</span>
              <p class="tech-desc">Conformité infrastructure blockchain EU</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🔐</span>
              <span class="tech-name">Polygon ID</span>
              <p class="tech-desc">Zero Knowledge Proof (ZKP) credentials</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🌐</span>
              <span class="tech-name">Gaia-X</span>
              <p class="tech-desc">Infrastructure européenne de données</p>
            </div>
          </div>
        </div>

        <div class="section results">
          <h3 class="section-title">📊 Impact et adoption</h3>
          <div class="result-box success">
            <p class="result-text highlight-large">
              💼 <strong>40+ entreprises</strong> utilisent Talao pour leurs salariés et partenaires
            </p>
            <p class="result-text">
              ✅ <strong>50K+ wallets</strong> téléchargés sur iOS et Android
            </p>
            <p class="result-text">
              ✅ <strong>100K+ preuves numériques</strong> émises et collectées
            </p>
            <p class="result-text">
              ✅ Solution <strong>souveraine européenne</strong>, hébergée et développée en Europe
            </p>
            <p class="result-text">
              ✅ <strong>Open Source</strong> sur GitHub pour transparence et sécurité maximale
            </p>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">🔗 Outils pour développeurs</h3>
          <div class="versions-grid">
            <div class="version-card">
              <h4>🔍 OIDC4VC QR Code Validator</h4>
              <p>Testez la conformité de vos issuers et verifiers selon OIDC4VCI et OIDC4VP</p>
              <a href="https://talao.co/ai/qrcode" target="_blank" class="doc-link">
                🔗 Accéder au validateur →
              </a>
            </div>
            <div class="version-card">
              <h4>✅ VC / VP Validator</h4>
              <p>Validez vos credentials (VCs) et présentations (VPs) aux formats SD-JWT, JWT, JSON-LD</p>
              <a href="https://talao.co/ai/vc" target="_blank" class="doc-link">
                🔗 Accéder au validateur →
              </a>
            </div>
            <div class="version-card featured">
              <h4>💻 GitHub Open Source</h4>
              <p>Code source complet accessible pour audit de sécurité et confidentialité</p>
              <a href="https://github.com/TalaoDAO" target="_blank" class="doc-link">
                🔗 Voir le code source →
              </a>
            </div>
          </div>
        </div>
      </div>
    `,
    gallery: ['img_projects/wallet_provider.png']
  },
    {
    id: 'altme-wallet',
    title: 'Altme Wallet Platform',
    description: "Développement et amélioration d'une plateforme back-end pour la gestion de portefeuilles numériques et de credentials vérifiables.",
    category: 'emploi',
    image: 'img_projects/Altme_Discover.png',
    tech: ['HTML / CSS', 'Python', 'Coingecko API'],
    github: 'https://github.com/TalaoDAO/DiscoverV2/tree/main',
    demo: 'https://apps.apple.com/fr/app/altme-wallet/id1633216869',
    detailedContent: `
      <div class="project-detail">
        <h2 class="project-title">🔐 Altme Wallet Platform</h2>
        
        <div class="section">
          <h3 class="section-title">📋 Contexte du projet</h3>
          <p class="description">
            Développement et amélioration d'une <strong>plateforme back-end</strong> pour la gestion de portefeuilles numériques 
            et de <strong>credentials vérifiables</strong>. Participation au projet <strong>Discover</strong>, intégrant la gestion 
            des NFTs et des cryptomonnaies via l'API Coingecko.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">⚙️ Technologies utilisées</h3>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-icon">🎨</span>
              <span class="tech-name">HTML / CSS</span>
              <p class="tech-desc">Interface utilisateur moderne et responsive</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🐍</span>
              <span class="tech-name">Python</span>
              <p class="tech-desc">Développement backend robuste</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">💰</span>
              <span class="tech-name">Coingecko API</span>
              <p class="tech-desc">Données crypto en temps réel</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🔑</span>
              <span class="tech-name">Verifiable Credentials</span>
              <p class="tech-desc">Système de credentials vérifiables</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">✨ Fonctionnalités principales</h3>
          <ul class="features-list">
            <li class="feature-item">
              <span class="feature-icon">💼</span>
              <strong>Gestion de portefeuilles</strong> - Portefeuilles numériques décentralisés sécurisés
            </li>
            <li class="feature-item">
              <span class="feature-icon">🖼️</span>
              <strong>NFTs & Crypto</strong> - Intégration complète des NFTs et cryptomonnaies
            </li>
            <li class="feature-item">
              <span class="feature-icon">🔐</span>
              <strong>Credentials vérifiables</strong> - Système d'identité décentralisée (DID)
            </li>
            <li class="feature-item">
              <span class="feature-icon">📱</span>
              <strong>Interface responsive</strong> - Expérience utilisateur optimale sur tous supports
            </li>
          </ul>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">
              ✅ Application <strong>déployée sur l'App Store</strong> et utilisée par des <strong>milliers d'utilisateurs</strong> 
              pour gérer leurs actifs numériques en toute sécurité.
            </p>
          </div>
        </div>
      </div>
    `,
    gallery: ['img_projects/Altme_Discover.png']
  },
    {
    id: 'altme-documentation',
    title: 'Altme Documentation',
    description: "Création et maintenance de la documentation complète pour Altme Wallet Provider. Deux versions : GitBook (v1) et Docusaurus (v2) pour faciliter l'intégration des développeurs.",
    category: 'emploi',
    image: 'img_projects/altme_doc.png',
    tech: ['GitBook', 'Docusaurus', 'Markdown', 'React', 'TypeScript'],
    demo: 'https://doc.wallet-provider.io/welcome/',
    detailedContent: `
      <div class="project-detail">
        <h2 class="project-title">📚 Altme Documentation</h2>
        
        <div class="section">
          <h3 class="section-title">📋 Contexte du projet</h3>
          <p class="description">
            Création et maintenance de la <strong>documentation technique complète</strong> pour Altme Wallet Provider. 
            Développement de <strong>deux versions</strong> de la documentation : une première version avec GitBook et 
            une seconde version moderne avec Docusaurus pour améliorer l'expérience développeur.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">⚙️ Technologies utilisées</h3>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-icon">📖</span>
              <span class="tech-name">GitBook</span>
              <p class="tech-desc">Documentation V1 - Simple et efficace</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">📘</span>
              <span class="tech-name">Docusaurus</span>
              <p class="tech-desc">Documentation V2 - Moderne et performante</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">📝</span>
              <span class="tech-name">Markdown</span>
              <p class="tech-desc">Rédaction structurée et lisible</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">⚛️</span>
              <span class="tech-name">React & TypeScript</span>
              <p class="tech-desc">Composants personnalisés typés</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">✨ Fonctionnalités principales</h3>
          <ul class="features-list">
            <li class="feature-item">
              <span class="feature-icon">📡</span>
              <strong>API complète</strong> - Documentation exhaustive de l'API Wallet Provider
            </li>
            <li class="feature-item">
              <span class="feature-icon">📖</span>
              <strong>Guides d'intégration</strong> - Tutoriels étape par étape pour développeurs
            </li>
            <li class="feature-item">
              <span class="feature-icon">💻</span>
              <strong>Code interactif</strong> - Exemples de code testables en direct
            </li>
            <li class="feature-item">
              <span class="feature-icon">🔍</span>
              <strong>Recherche optimisée</strong> - Full-text search ultra-rapide
            </li>
            <li class="feature-item">
              <span class="feature-icon">🌍</span>
              <strong>Multilingue</strong> - Support EN/FR pour audience internationale
            </li>
            <li class="feature-item">
              <span class="feature-icon">📱</span>
              <strong>Responsive design</strong> - Accessible sur tous les appareils
            </li>
          </ul>
        </div>

        <div class="section">
          <h3 class="section-title">🔗 Versions disponibles</h3>
          <div class="versions-grid">
            <div class="version-card">
              <h4>V1 - GitBook</h4>
              <p>Version initiale simple et accessible</p>
              <a href="https://altme-documentation.gitbook.io/wallet-provider-documentation" target="_blank" class="doc-link">
                📖 Consulter la documentation V1 →
              </a>
            </div>
            <div class="version-card featured">
              <h4>V2 - Docusaurus ⭐</h4>
              <p>Version moderne avec performances optimisées</p>
              <a href="https://doc.wallet-provider.io/welcome/" target="_blank" class="doc-link">
                📘 Consulter la documentation V2 →
              </a>
            </div>
          </div>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">
              ✅ Documentation <strong>complète et professionnelle</strong> facilitant l'intégration pour les développeurs.
            </p>
            <p class="result-text">
              ✅ La migration vers Docusaurus a permis d'améliorer <strong>significativement l'expérience utilisateur</strong> 
              avec une navigation plus fluide, des performances optimisées et une meilleure maintenabilité.
            </p>
          </div>
        </div>
      </div>
    `,
    gallery: ['img_projects/altme_doc.png']
  },
  {
    id: 'teams-bot-mastra',
    title: 'Teams Bot & Mastra Agents',
    description: "Développement d'un bot Microsoft Teams intégré à Mastra pour agréger des flux RSS, effectuer une synthèse NLP et fournir des insights propulsés par l'IA.",
    category: 'emploi',
    image: 'img_projects/bot-conversation-ia.png',
    tech: ['TypeScript', 'Azure Bot Framework', 'Mastra', 'OpenAI API'],
    github: 'https://github.com/BastienLopez/Agent_VEILLE_RSS/tree/main',
    detailedContent: `
      <div class="project-detail">
        <h2 class="project-title">🤖 Teams Bot & Mastra Agents</h2>
        
        <div class="section">
          <h3 class="section-title">📋 Contexte du projet</h3>
          <p class="description">
            Développement d'un <strong>bot Microsoft Teams intelligent</strong> intégré à Mastra pour automatiser la veille technologique. 
            Le bot agrège des flux RSS, effectue une <strong>synthèse NLP</strong> et fournit des insights propulsés par l'IA 
            pour faciliter le suivi de l'actualité en temps réel.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">⚙️ Technologies utilisées</h3>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-icon">📘</span>
              <span class="tech-name">TypeScript</span>
              <p class="tech-desc">Développement typé et robuste</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">☁️</span>
              <span class="tech-name">Azure Bot Framework</span>
              <p class="tech-desc">Intégration native Microsoft Teams</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🎭</span>
              <span class="tech-name">Mastra</span>
              <p class="tech-desc">Orchestration intelligente des agents</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🧠</span>
              <span class="tech-name">OpenAI API</span>
              <p class="tech-desc">Traitement du langage naturel avancé</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">✨ Fonctionnalités principales</h3>
          <ul class="features-list">
            <li class="feature-item">
              <span class="feature-icon">📰</span>
              <strong>Agrégation RSS</strong> - Collecte automatique de flux personnalisables
            </li>
            <li class="feature-item">
              <span class="feature-icon">🔍</span>
              <strong>Analyse NLP</strong> - Synthèse intelligente des articles avec IA
            </li>
            <li class="feature-item">
              <span class="feature-icon">💡</span>
              <strong>Insights automatiques</strong> - Génération de résumés et tendances
            </li>
            <li class="feature-item">
              <span class="feature-icon">💬</span>
              <strong>Interface conversationnelle</strong> - Interaction naturelle dans Teams
            </li>
            <li class="feature-item">
              <span class="feature-icon">🔔</span>
              <strong>Alertes personnalisées</strong> - Notifications en temps réel sur vos sujets
            </li>
          </ul>
        </div>
        <img src="img_projects/bot_teams_exemple.png" alt="Bot teams img" />
        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">
              ✅ Bot <strong>déployé avec succès</strong> permettant aux équipes de rester <strong>informées efficacement</strong> 
              sur les sujets qui les intéressent.
            </p>
            <p class="result-text">
              ✅ <strong>Réduction de 70%</strong> du temps de veille manuelle grâce à l'automatisation intelligente.
            </p>
          </div>
        </div>
      </div>
    `,
    gallery: ['img_projects/bot-conversation-ia.png', 'img_projects/bot_teams_exemple.png']
  },
  {
    id: 'seo-geo-optimization',
    title: 'SEO & GEO Optimization',
    description: "Optimisation SEO et référencement local (GEO) pour différentes entreprises. Amélioration drastique de la visibilité en ligne avec gains mesurables : passage de l'anonymat à la reconnaissance par les IA (ChatGPT, Claude) et positionnement #1 sur Google pour les mots-clés stratégiques.",
    category: 'emploi',
    image: 'img_projects/seo_geo.png',
    tech: ['SEO', 'Google Analytics', 'Google Search Console', 'Schema.org', 'Local SEO', 'Données structurées'],
    detailedContent: `
      <div class="project-detail">
        <h2 class="project-title">📈 SEO & GEO Optimization</h2>
        
        <div class="section">
          <h3 class="section-title">📋 Contexte du projet</h3>
          <p class="description">
            Optimisation du <strong>référencement naturel (SEO)</strong> et <strong>local (GEO)</strong> pour différentes entreprises. 
            Travail complet sur l'amélioration de la visibilité en ligne, du positionnement sur les moteurs de recherche 
            et de la reconnaissance par les intelligences artificielles.
          </p>
        </div>

        <div class="section info-box">
          <h3 class="section-title">💡 À quoi sert le SEO & GEO ?</h3>
          <p class="description">
            Le <strong>SEO (Search Engine Optimization)</strong> optimise la visibilité d'un site web dans les résultats Google. 
            Le <strong>GEO (référencement local)</strong> cible les recherches géolocalisées pour apparaître dans les résultats locaux.
          </p>
          <p class="highlight">
            🎯 <strong>Objectif :</strong> Être trouvé par vos clients potentiels au bon moment et être reconnu comme une référence 
            par les moteurs de recherche et les IA (ChatGPT, Claude, etc.).
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">🛠️ Compétences et outils utilisés</h3>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-icon">📝</span>
              <span class="tech-name">SEO On-Page</span>
              <p class="tech-desc">Balises meta, structure HTML, contenu optimisé</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🔗</span>
              <span class="tech-name">SEO Off-Page</span>
              <p class="tech-desc">Backlinks, netlinking, autorité de domaine</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">⚡</span>
              <span class="tech-name">SEO Technique</span>
              <p class="tech-desc">Vitesse, mobile-first, Core Web Vitals</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">📊</span>
              <span class="tech-name">Google Analytics</span>
              <p class="tech-desc">Analyse de trafic et comportement</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🔍</span>
              <span class="tech-name">Search Console</span>
              <p class="tech-desc">Suivi de performance et indexation</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🗺️</span>
              <span class="tech-name">Google My Business</span>
              <p class="tech-desc">Référencement local optimisé</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">✅ Actions réalisées</h3>
          <ul class="features-list">
            <li class="feature-item">
              <span class="feature-icon">🔎</span>
              <strong>Audit SEO complet</strong> - Analyse approfondie du site web
            </li>
            <li class="feature-item">
              <span class="feature-icon">🏷️</span>
              <strong>Optimisation balises</strong> - Title, meta description, headings
            </li>
            <li class="feature-item">
              <span class="feature-icon">🔗</span>
              <strong>Structure URLs</strong> - Architecture optimisée et SEO-friendly
            </li>
            <li class="feature-item">
              <span class="feature-icon">📊</span>
              <strong>Données structurées</strong> - Implémentation Schema.org complète
            </li>
            <li class="feature-item">
              <span class="feature-icon">🖼️</span>
              <strong>Optimisation images</strong> - Alt text, compression, lazy loading
            </li>
            <li class="feature-item">
              <span class="feature-icon">⚡</span>
              <strong>Performance</strong> - Amélioration vitesse et Core Web Vitals
            </li>
            <li class="feature-item">
              <span class="feature-icon">📱</span>
              <strong>Mobile-first</strong> - Responsive design optimisé
            </li>
            <li class="feature-item">
              <span class="feature-icon">🗺️</span>
              <strong>SEO local</strong> - Google My Business + citations locales
            </li>
          </ul>
        </div>

        <div class="section">
          <h3 class="section-title">📊 Résultats mesurables : Avant / Après</h3>
          
          <div class="comparison">
            <div class="before-after">
              <div class="before">
                <h4>❌ Avant l'optimisation SEO</h4>
                <ul class="comparison-list">
                  <li>🚫 Aucune reconnaissance par les IA (ChatGPT, Claude)</li>
                  <li>📉 Positionnement faible ou inexistant</li>
                  <li>📄 Informations limitées et peu structurées</li>
                  <li>🗺️ Visibilité locale quasi nulle</li>
                  <li>👥 Trafic organique minimal</li>
                </ul>
              </div>
              
              <div class="after">
                <h4>✅ Après l'optimisation SEO</h4>
                <ul class="comparison-list success">
                  <li>🤖 <strong>Reconnaissance complète par les IA</strong><br/>
                    <span class="detail">ChatGPT et Claude fournissent des infos détaillées et structurées</span>
                  </li>
                  <li>🥇 <strong>Position #1 sur Google</strong><br/>
                    <span class="detail">Pour les requêtes stratégiques et mots-clés ciblés</span>
                  </li>
                  <li>⭐ <strong>Rich snippets actifs</strong><br/>
                    <span class="detail">Logo, coordonnées, avis, FAQ affichés</span>
                  </li>
                  <li>📈 <strong>+300% de trafic organique</strong><br/>
                    <span class="detail">En moyenne sur 6 mois</span>
                  </li>
                  <li>💰 <strong>Meilleur taux de conversion</strong><br/>
                    <span class="detail">Grâce à une meilleure qualification du trafic</span>
                  </li>
                  <li>🗺️ <strong>Visibilité locale renforcée</strong><br/>
                    <span class="detail">Apparition dans le pack local Google Maps</span>
                  </li>
                  <li>🏆 <strong>Crédibilité accrue</strong><br/>
                    <span class="detail">Présence structurée sur tous les canaux digitaux</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Impact business concret</h3>
          <div class="result-box success">
            <p class="result-text highlight-large">
              💼 Passage d'une <strong>entreprise invisible en ligne</strong> à une <strong>référence reconnue</strong> 
              par les moteurs de recherche, les IA et les utilisateurs.
            </p>
            <p class="result-text">
              ✅ Les clients trouvent maintenant l'entreprise <strong>facilement</strong>, avec des informations 
              <strong>complètes et fiables</strong>.
            </p>
            <p class="result-text">
              ✅ Génération de <strong>plus de demandes qualifiées</strong> et augmentation significative des <strong>conversions</strong>.
            </p>
          </div>
        </div>
      </div>
    `,
    gallery: ['img_projects/seo_geo.png']
  }
];
