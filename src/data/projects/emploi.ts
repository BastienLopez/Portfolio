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
          <h3 class="section-title">👤 Ma contribution</h3>
          <p class="description">
            Contribution au sein de l'équipe produit sur des sujets liés au wallet et à son écosystème technique.
            Les détails d'implémentation restent volontairement limités pour des raisons de confidentialité.
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
          <h3 class="section-title">📊 Contexte produit</h3>
          <div class="result-box success">
            <p class="result-text highlight-large">
              💼 Produit d'identité numérique destiné à des contextes d'entreprise et de conformité européenne.
            </p>
            <p class="result-text">
              ✅ Les éléments présentés décrivent le produit et les standards associés, sans afficher de métrique non sourcée dans ce portfolio.
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
              <a href="https://talao.co/ai/qrcode" target="_blank" rel="noopener noreferrer" class="doc-link">
                🔗 Accéder au validateur →
              </a>
            </div>
            <div class="version-card">
              <h4>✅ VC / VP Validator</h4>
              <p>Validez vos credentials (VCs) et présentations (VPs) aux formats SD-JWT, JWT, JSON-LD</p>
              <a href="https://talao.co/ai/vc" target="_blank" rel="noopener noreferrer" class="doc-link">
                🔗 Accéder au validateur →
              </a>
            </div>
            <div class="version-card featured">
              <h4>💻 GitHub Open Source</h4>
              <p>Code source complet accessible pour audit de sécurité et confidentialité</p>
              <a href="https://github.com/TalaoDAO" target="_blank" rel="noopener noreferrer" class="doc-link">
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

        <div class="section info-box">
          <h3 class="section-title">👤 Ma contribution</h3>
          <p class="description">
            Participation au développement et à l'amélioration de briques de la plateforme Discover,
            incluant les intégrations présentées ici. Le produit résulte d'un travail d'équipe.
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
              <p class="tech-desc">Développement backend</p>
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
              <strong>Interface responsive</strong> - Parcours adapté aux principaux supports
            </li>
          </ul>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">
              ✅ Contribution au développement et à l’amélioration de briques du module Discover et de ses intégrations de données, au sein de l’équipe produit.
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

        <div class="section info-box">
          <h3 class="section-title">👤 Ma contribution</h3>
          <p class="description">
            Création et maintenance de contenus et de parcours de documentation, avec migration de GitBook
            vers Docusaurus pour faciliter l'intégration des développeurs.
          </p>
          <p class="highlight"><strong>50+ pages et sections</strong> de documentation migrées ou maintenues entre GitBook et Docusaurus.</p>
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
              <strong>Recherche</strong> - Recherche plein texte dans la documentation
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
              <a href="https://altme-documentation.gitbook.io/wallet-provider-documentation" target="_blank" rel="noopener noreferrer" class="doc-link">
                📖 Consulter la documentation V1 →
              </a>
            </div>
            <div class="version-card featured">
              <h4>V2 - Docusaurus ⭐</h4>
              <p>Version moderne avec performances optimisées</p>
              <a href="https://doc.wallet-provider.io/welcome/" target="_blank" rel="noopener noreferrer" class="doc-link">
                📘 Consulter la documentation V2 →
              </a>
            </div>
          </div>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">
              ✅ Documentation structurée pour faciliter l’intégration des développeurs.
            </p>
            <p class="result-text">
              ✅ Migration vers Docusaurus pour proposer une navigation plus structurée
              et une base de documentation plus maintenable.
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

        <div class="section info-box">
          <h3 class="section-title">👤 Mon rôle</h3>
          <p class="description">
            Conception du workflow de veille, développement du bot TypeScript, intégration avec Teams,
            orchestration Mastra et configuration des alertes ciblées.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">⚙️ Technologies utilisées</h3>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-icon">📘</span>
              <span class="tech-name">TypeScript</span>
              <p class="tech-desc">Développement typé</p>
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

        <div class="section project-metrics">
          <h3 class="section-title">Quelques chiffres</h3>
          <div class="metrics-grid">
            <div><strong>500+</strong><span>sources de veille connectées</span></div>
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
        <img src="img_projects/bot_teams_exemple.png" alt="Capture du bot Teams de veille automatisee" />
        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">
              ✅ Bot <strong>déployé avec succès</strong> permettant aux équipes de rester <strong>informées efficacement</strong> 
              sur les sujets qui les intéressent.
            </p>
            <p class="result-text">
              ✅ Veille centralisée, synthèses et alertes disponibles dans l'espace de travail des équipes.
            </p>
          </div>
        </div>
      </div>
    `,
    gallery: ['img_projects/bot-conversation-ia.png', 'img_projects/bot_teams_exemple.png']
  },
  {
    id: 'seo-geo-optimization',
    title: 'SEO & référencement local',
    description: "Optimisation SEO et référencement local pour différentes entreprises : audit, données structurées, contenu et suivi des performances.",
    category: 'emploi',
    image: 'img_projects/seo_geo.png',
    tech: ['SEO', 'Google Analytics', 'Google Search Console', 'Schema.org', 'Local SEO', 'Données structurées'],
    detailedContent: `
      <div class="project-detail">
        <h2 class="project-title">📈 SEO & référencement local</h2>
        
        <div class="section">
          <h3 class="section-title">📋 Contexte du projet</h3>
          <p class="description">
            Optimisation du <strong>référencement naturel (SEO)</strong> et du
            <strong>référencement local</strong> pour différentes entreprises : audit, contenu,
            données structurées et suivi des signaux utiles.
          </p>
        </div>

        <div class="section info-box">
          <h3 class="section-title">💡 SEO, référencement local et GEO : bien les distinguer</h3>
          <p class="description">
            Le <strong>SEO (Search Engine Optimization)</strong> travaille la compréhension et la visibilité d'un site dans les moteurs de recherche.
            Le <strong>référencement local</strong> cible les recherches géolocalisées, notamment via les fiches établissement et les signaux locaux.
          </p>
          <p class="description">
            Le <strong>GEO (Generative Engine Optimization)</strong> désigne un travail éditorial et structurel destiné à rendre les informations plus compréhensibles par les moteurs génératifs. Ce n'est pas un synonyme de référencement local.
          </p>
          <p class="highlight">
            🎯 <strong>Objectif :</strong> Être trouvé par vos clients potentiels au bon moment et être reconnu comme une référence 
            par les moteurs de recherche et les IA (ChatGPT, Claude, etc.).
          </p>
        </div>

        <div class="section info-box">
          <h3 class="section-title">👤 Mon rôle</h3>
          <p class="description">
            Audit, optimisation des balises et contenus, structuration technique et mise en place des éléments de suivi SEO et local.
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
          <h3 class="section-title">📊 Travail réalisé et suivi</h3>
          
          <div class="comparison">
            <div class="before-after">
              <div class="before">
                <h4>Point de départ</h4>
                <ul class="comparison-list">
                  <li>📄 Informations et contenus à structurer</li>
                  <li>🗺️ Présence locale à consolider</li>
                  <li>📊 Indicateurs de visibilité à mettre en place</li>
                </ul>
              </div>
              
              <div class="after">
                <h4>Actions et indicateurs à suivre</h4>
                <ul class="comparison-list success">
                  <li>🤖 <strong>Contenu et données structurées</strong><br/>
                    <span class="detail">Base plus lisible pour les moteurs, les utilisateurs et les assistants IA</span>
                  </li>
                  <li>🔎 <strong>Suivi du positionnement</strong><br/>
                    <span class="detail">Indicateurs structurés pour suivre les requêtes dans Search Console</span>
                  </li>
                  <li>⭐ <strong>Données structurées</strong><br/>
                    <span class="detail">Éléments Schema.org intégrés au socle technique</span>
                  </li>
                  <li>📈 <strong>Trafic organique</strong><br/>
                    <span class="detail">Mesure disponible via les outils Analytics et Search Console configurés</span>
                  </li>
                  <li>💬 <strong>Demandes qualifiées</strong><br/>
                    <span class="detail">Indicateur à suivre selon les objectifs définis avec chaque entreprise</span>
                  </li>
                  <li>🗺️ <strong>Présence locale</strong><br/>
                    <span class="detail">Fondations mises en place pour les requêtes et fiches locales pertinentes</span>
                  </li>
                  <li>🏆 <strong>Socle SEO maintenable</strong><br/>
                    <span class="detail">Balises, structure technique et contenu plus cohérents</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Résultat</h3>
          <div class="result-box success">
            <p class="result-text highlight-large">
              💼 Le travail met en place un socle technique et éditorial mesurable via Search Console et Analytics.
            </p>
            <p class="result-text">
              ✅ Les métadonnées, la structure technique, les données structurées et les signaux locaux sont organisés dans une base maintenable.
            </p>
            <p class="result-text">
              ✅ Les résultats de trafic, de positionnement ou de conversion ne sont pas avancés sans données source.
            </p>
          </div>
        </div>
      </div>
    `,
    gallery: ['img_projects/seo_geo.png']
  },
  {
    id: 'n8n-workflow-automation',
    title: 'Automatisations n8n — Reporting, derush video & prospection',
    description: "Workflows n8n pour automatiser la génération de rapports SocialPilot en PDF, l'adaptation de vidéos aux formats réseaux sociaux et la préparation de prospects depuis Google Maps.",
    category: 'emploi',
    image: 'img_projects/n8n.png',
    tech: ['n8n', 'SocialPilot', 'Google Maps', 'PDF', 'Automatisation de workflows'],
    detailedContent: `
      <div class="project-detail">
        <h2 class="project-title">⚙️ Automatisations n8n — reporting, derush video & prospection</h2>

        <div class="section">
          <h3 class="section-title">📋 Contexte du projet</h3>
          <p class="description">
            Conception de workflows <strong>n8n</strong> pour automatiser des opérations récurrentes autour
            du reporting réseaux sociaux, de la préparation de contenus vidéo et de la prospection.
            L'objectif : relier les outils existants, fiabiliser les étapes de traitement et produire des
            livrables réutilisables pour le client.
          </p>
        </div>

        <div class="section info-box">
          <h3 class="section-title">👤 Ma contribution</h3>
          <ul class="features-list">
            <li class="feature-item"><span class="feature-icon">🔎</span><strong>Analyse des processus</strong> — identification des tâches répétitives et des sources de données.</li>
            <li class="feature-item"><span class="feature-icon">🧩</span><strong>Architecture des workflows</strong> — découpage des étapes, déclencheurs, conditions et sorties.</li>
            <li class="feature-item"><span class="feature-icon">🔌</span><strong>Intégrations</strong> — connexion d'API et de services tiers, transformation des données JSON.</li>
            <li class="feature-item"><span class="feature-icon">🛡️</span><strong>Fiabilité</strong> — gestion des erreurs, contrôle des données et amélioration continue des scénarios.</li>
          </ul>
        </div>

        <div class="section">
          <h3 class="section-title">⚙️ Technologies et outils</h3>
          <div class="tech-grid">
            <div class="tech-item"><span class="tech-icon">🔄</span><span class="tech-name">n8n</span><p class="tech-desc">Orchestration et automatisation visuelle</p></div>
            <div class="tech-item"><span class="tech-icon">🔌</span><span class="tech-name">API REST & Webhooks</span><p class="tech-desc">Connexion des outils et déclenchements</p></div>
            <div class="tech-item"><span class="tech-icon">🧾</span><span class="tech-name">JSON & PDF</span><p class="tech-desc">Transformation de données et génération de livrables</p></div>
            <div class="tech-item"><span class="tech-icon">🤖</span><span class="tech-name">IA & automatisation</span><p class="tech-desc">Analyse et enrichissement de certains traitements</p></div>
            <div class="tech-item"><span class="tech-icon">📊</span><span class="tech-name">SocialPilot</span><p class="tech-desc">Données et rapports de réseaux sociaux</p></div>
            <div class="tech-item"><span class="tech-icon">🎬</span><span class="tech-name">Traitement vidéo</span><p class="tech-desc">Préparation de contenus pour les réseaux sociaux</p></div>
          </div>
        </div>

        <div class="section project-metrics">
          <h3 class="section-title">Quelques chiffres</h3>
          <div class="metrics-grid">
            <div><strong>15+</strong><span>rapports générés</span></div>
            <div><strong>200+ h</strong><span>de rush traitées</span></div>
            <div><strong>10+</strong><span>tâches automatisées</span></div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">📊 Workflow 1 — Reporting SocialPilot</h3>
          <p class="description">
            Conception d’un workflow n8n capable d’automatiser la production complète de reportings social media
            à partir des rapports PDF générés par SocialPilot.
          </p>
          <p class="description">
            Le système prend en charge l’ensemble du processus : récupération des fichiers sources, extraction et
            structuration des données, contrôle des KPI, analyse des performances, génération d’un rapport client
            personnalisé et vérification finale du document avant livraison.
          </p>
          <div class="workflow-steps">
            <div class="workflow-step">
              <h4>Collecte et sécurisation des données</h4>
              <p>Le workflow se déclenche automatiquement selon une planification définie et surveille les nouveaux rapports reçus par email. Les pièces jointes PDF sont récupérées, contrôlées puis comparées aux fichiers déjà présents dans Google Drive afin d’éviter les doublons et les traitements inutiles. Chaque nouveau rapport est ensuite archivé avant de poursuivre son traitement.</p>
            </div>
            <div class="workflow-step">
              <h4>Extraction et structuration des KPI</h4>
              <p>Les données contenues dans les rapports SocialPilot sont extraites puis analysées réseau par réseau. Le workflow transforme les informations issues des différents formats de rapports en une structure JSON commune et normalisée, tout en conservant les spécificités propres à chaque réseau. Une couche de validation contrôle ensuite la présence et la cohérence des indicateurs attendus.</p>
            </div>
            <div class="workflow-step">
              <h4>OCR et récupération des données visuelles</h4>
              <p>Lorsque certaines informations ne sont accessibles que dans des graphiques ou éléments visuels, le workflow identifie les données manquantes et déclenche un traitement OCR ciblé. Les informations récupérées sont structurées, normalisées puis réintégrées au jeu de données principal, sans appliquer inutilement l’OCR à l’ensemble du document.</p>
            </div>
            <div class="workflow-step">
              <h4>Analyse automatisée des performances</h4>
              <p>À partir des données consolidées, une couche d’analyse génère une lecture synthétique des performances sociales : évolution de l’audience, engagement, performances des formats de contenu et signaux d’alerte. Des règles de contrôle maintiennent les conclusions et recommandations dans le périmètre des données réellement disponibles.</p>
            </div>
            <div class="workflow-step">
              <h4>Génération du rapport client</h4>
              <p>Une fois les données validées et enrichies, le workflow construit le contexte nécessaire au rapport final. Le PDF regroupe les KPI par réseau, les tableaux de performance, les analyses, les recommandations et les éléments visuels issus des rapports sources pour produire un livrable unique et exploitable par le client.</p>
            </div>
            <div class="workflow-step">
              <h4>Contrôle qualité, livraison et supervision</h4>
              <p>Un premier audit vérifie le contenu du document, puis un second contrôle analyse visuellement les pages générées afin de détecter les problèmes de mise en page, les contenus coupés ou les visuels manquants. Le rapport reçoit un statut final avant son dépôt dans Google Drive et son éventuelle association à Notion. Les notifications Discord suivent l’exécution, la couverture des données, le contrôle qualité et les erreurs techniques.</p>
            </div>
          </div>
          <p class="workflow-services"><strong>Technologies et services utilisés :</strong> n8n, SocialPilot, Gmail API, Google Drive, Notion, OCR, analyse IA, génération PDF et Discord.</p>
        </div>

        <div class="section">
          <h3 class="section-title">🎬 Workflow 2 — Dérushage et pré-montage vidéo assistés par IA</h3>
          <p class="description">
            Conception d’un pipeline n8n dédié à l’analyse et à la préparation automatisée de vidéos longues pour la
            création de contenus courts destinés aux réseaux sociaux.
          </p>
          <p class="description">
            Le workflow transforme une vidéo brute en livrables exploitables pour le montage : transcription
            structurée, sélection des meilleurs passages, organisation des séquences, sous-titres, timeline,
            preview vidéo et fichiers techniques. L’objectif est de réduire le travail manuel avant le montage tout
            en conservant un contrôle éditorial et technique sur les séquences sélectionnées.
          </p>
          <div class="workflow-steps">
            <div class="workflow-step">
              <h4>Ingestion et préparation des médias</h4>
              <p>Le workflow récupère les nouvelles vidéos depuis Google Drive et vérifie automatiquement qu’elles n’ont pas déjà été traitées. Pour chaque fichier, un environnement de travail est créé avec les chemins, dossiers et paramètres nécessaires. La durée cible peut aussi être définie afin d’adapter la sélection des séquences au format final attendu.</p>
            </div>
            <div class="workflow-step">
              <h4>Extraction audio et transcription</h4>
              <p>L’audio est extrait puis envoyé dans une chaîne de transcription basée sur Whisper. La transcription conserve les informations temporelles nécessaires pour retrouver chaque phrase dans la vidéo originale. Le workflow détecte aussi la langue, nettoie et découpe le texte en blocs exploitables, puis applique des contrôles avant l’analyse.</p>
            </div>
            <div class="workflow-step">
              <h4>Analyse éditoriale des rushes</h4>
              <p>La transcription sert à identifier les passages les plus intéressants selon la pertinence du sujet, le potentiel de rétention, l’énergie, l’émotion, la qualité audio, la densité d’information, les répétitions et l’autonomie de l’extrait. Les séquences sont classées et scorées pour préparer la sélection de montage.</p>
            </div>
            <div class="workflow-step">
              <h4>Détection des questions et réponses</h4>
              <p>Pour les interviews, le workflow analyse la structure de la conversation afin d’identifier les questions et leurs réponses. Les timestamps sont contrôlés pour éviter les silences inutiles, les débuts trop précoces et les coupures au milieu d’une phrase. Les blocs validés peuvent former des séquences structurées avec une carte question suivie de la réponse correspondante.</p>
            </div>
            <div class="workflow-step">
              <h4>Construction automatique du pré-montage</h4>
              <p>À partir des meilleures séquences, le workflow génère une EDL — Edit Decision List — qui décrit précisément la structure du futur montage. La timeline peut intégrer un hook d’ouverture, des blocs question-réponse, des micro-coupes techniques et les extraits retenus, avec des contrôles contre les doublons et les mauvaises coupures.</p>
            </div>
            <div class="workflow-step">
              <h4>Sous-titres, preview et livraison</h4>
              <p>Le pipeline génère les sous-titres et informations temporelles, ainsi qu’une timeline compatible avec Adobe Premiere. Une preview MP4 peut visualiser l’enchaînement proposé avant le montage définitif. Les livrables et rapports de contrôle sont organisés dans une arborescence Google Drive dédiée, pour préparer des formats verticaux adaptés à Instagram, TikTok, Facebook et aux autres plateformes sociales.</p>
            </div>
          </div>
          <p class="workflow-services"><strong>Technologies et services utilisés :</strong> n8n, Google Drive API, FFmpeg, Whisper, JavaScript, microservices vidéo, analyse IA, génération EDL, sous-titres SRT/ASS et export de timeline pour le montage.</p>
        </div>

        <div class="section">
          <h3 class="section-title">📍 Workflow 3 — Préparation de prospection</h3>
          <p class="description">
            Collecte et structuration de prospects à partir de Google Maps pour préparer des listes exploitables
            dans un processus commercial, avec les informations disponibles et les contrôles nécessaires.
          </p>
        </div>

        <div class="section info-box">
          <h3 class="section-title">🧱 Architecture commune</h3>
          <p class="description">
            Les automatisations reposent sur des déclencheurs planifiés ou à la demande, des connexions API,
            des transformations de données, des branches conditionnelles et une sortie adaptée au besoin :
            rapport, fichier, notification ou liste structurée.
          </p>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Objectif et confidentialité</h3>
          <div class="result-box success">
            <p class="result-text">
              ✅ Des workflows centralisés pour limiter les manipulations manuelles et rendre les livrables plus reproductibles.
            </p>
            <p class="result-text">
              🔒 Projet client : les données, paramètres précis et résultats chiffrés ne sont pas publiés pour des raisons de confidentialité.
            </p>
          </div>
        </div>
      </div>
    `,
    gallery: ['img_projects/n8n1.png', 'img_projects/n8n2.png']
    ,
    translations: {
      en: {
        title: 'n8n Automations — reporting, content & prospecting',
        description: 'n8n workflows that automate SocialPilot PDF reports, video adaptation for social media formats, and prospect-list preparation from Google Maps.',
        detailedContent: `
          <div class="project-detail">
            <h2 class="project-title">⚙️ n8n automations — reporting, content & prospecting</h2>
            <div class="section">
              <h3 class="section-title">📋 Project context</h3>
              <p class="description">Design of <strong>n8n</strong> workflows to automate recurring operations around social-media reporting, video-content preparation and prospecting. The aim is to connect existing tools, make processing steps reliable and create reusable client deliverables.</p>
            </div>
            <div class="section info-box">
              <h3 class="section-title">👤 My contribution</h3>
              <ul class="features-list">
                <li class="feature-item"><span class="feature-icon">🔎</span><strong>Process analysis</strong> — identifying repetitive tasks and data sources.</li>
                <li class="feature-item"><span class="feature-icon">🧩</span><strong>Workflow architecture</strong> — defining steps, triggers, conditions and outputs.</li>
                <li class="feature-item"><span class="feature-icon">🔌</span><strong>Integrations</strong> — connecting APIs and third-party services, transforming JSON data.</li>
                <li class="feature-item"><span class="feature-icon">🛡️</span><strong>Reliability</strong> — error handling, data checks and continuous scenario improvement.</li>
              </ul>
            </div>
            <div class="section">
              <h3 class="section-title">⚙️ Technologies and tools</h3>
              <div class="tech-grid">
                <div class="tech-item"><span class="tech-icon">🔄</span><span class="tech-name">n8n</span><p class="tech-desc">Visual orchestration and automation</p></div>
                <div class="tech-item"><span class="tech-icon">🔌</span><span class="tech-name">REST APIs & Webhooks</span><p class="tech-desc">Tool connections and triggers</p></div>
                <div class="tech-item"><span class="tech-icon">🧾</span><span class="tech-name">JSON & PDF</span><p class="tech-desc">Data transformation and document generation</p></div>
                <div class="tech-item"><span class="tech-icon">🤖</span><span class="tech-name">AI & automation</span><p class="tech-desc">Analysis and enrichment of selected processing steps</p></div>
                <div class="tech-item"><span class="tech-icon">📊</span><span class="tech-name">SocialPilot</span><p class="tech-desc">Social media data and reports</p></div>
                <div class="tech-item"><span class="tech-icon">🎬</span><span class="tech-name">Video processing</span><p class="tech-desc">Preparing content for social platforms</p></div>
              </div>
            </div>
            <div class="section">
              <h3 class="section-title">📊 Workflow 1 — SocialPilot reporting</h3>
              <p class="description">An automated scenario retrieves available data, prepares it and produces a PDF follow-up report. The result can then be sent to the client through the chosen channel.</p>
              <ul class="features-list">
                <li class="feature-item"><span class="feature-icon">📥</span><strong>Collection and normalisation</strong> — retrieving, cleaning and formatting SocialPilot data.</li>
                <li class="feature-item"><span class="feature-icon">📄</span><strong>PDF report</strong> — assembling a clear deliverable for social-performance follow-up.</li>
                <li class="feature-item"><span class="feature-icon">📤</span><strong>Distribution</strong> — preparing report delivery or storage for the client.</li>
              </ul>
            </div>
            <div class="section">
              <h3 class="section-title">🎬 Workflow 2 — Video derush and preparation</h3>
              <p class="description">The workflow organises raw-video processing to support adaptations for Instagram, Facebook, TikTok and other social-media formats. It can chain media intake, data extraction, transcription, analysis and organisation of useful sequences.</p>
              <ul class="features-list">
                <li class="feature-item"><span class="feature-icon">🎥</span><strong>Intake and preparation</strong> — centralising media and metadata.</li>
                <li class="feature-item"><span class="feature-icon">📝</span><strong>Transcription and analysis</strong> — reading content to identify useful excerpts.</li>
                <li class="feature-item"><span class="feature-icon">⏱️</span><strong>Sequencing</strong> — locating timestamps and organising material for editing.</li>
              </ul>
            </div>
            <div class="section">
              <h3 class="section-title">📍 Workflow 3 — Prospecting preparation</h3>
              <p class="description">Collecting and structuring prospects from Google Maps to prepare usable commercial lists, using available information and the required checks.</p>
            </div>
            <div class="section info-box">
              <h3 class="section-title">🧱 Shared architecture</h3>
              <p class="description">The automations rely on scheduled or on-demand triggers, API connections, data transformations, conditional branches and an output suited to the need: report, file, notification or structured list.</p>
            </div>
            <div class="section results">
              <h3 class="section-title">🎯 Objective and confidentiality</h3>
              <div class="result-box success">
                <p class="result-text">✅ Centralised workflows reduce manual handling and make deliverables more reproducible.</p>
                <p class="result-text">🔒 Client project: data, precise configuration and quantified results are not published for confidentiality reasons.</p>
              </div>
            </div>
          </div>
        `,
      },
    },
  }
];
