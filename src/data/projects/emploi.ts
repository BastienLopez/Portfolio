import { Project } from './types';

export const n8nReportingProject: Project = {
  id: 'n8n-reporting',
  title: 'Automatisations n8n — Reporting',
  description: 'Workflow n8n qui transforme les rapports PDF SocialPilot en reportings social media clairs et prêts à relire pour les clients CM : collecte, KPI, analyse, génération et contrôle qualité.',
  category: 'emploi',
  image: 'img_projects/n8n.png',
  tech: ['n8n', 'SocialPilot', 'Gmail API', 'Google Drive', 'PDF', 'OCR', 'Discord'],
  detailedContent: `
    <div class="project-detail">
      <h2 class="project-title">Automatisations n8n — Reporting</h2>

      <div class="section">
        <h3 class="section-title">Contexte du projet</h3>
        <p class="description">
          Conception d’un workflow n8n dédié au reporting social media. Le point de départ est le rapport PDF exporté
          par SocialPilot ; le point d’arrivée est un rapport CM client structuré, analysé, contrôlé et prêt à être relu
          puis livré. L’automatisation relie les outils déjà utilisés et garde une trace des étapes de traitement.
        </p>
        <p class="description">
          L’objectif n’est pas de déposer un PDF brut : les données sont récupérées, normalisées par réseau,
          interprétées dans leur contexte, puis regroupées dans un livrable lisible avec les KPI, les tableaux,
          les analyses, les recommandations et les visuels utiles au suivi du client.
        </p>
      </div>

      <div class="section info-box">
        <h3 class="section-title">Ma contribution</h3>
        <ul class="features-list">
          <li class="feature-item"><strong>Analyse des processus</strong> — cartographie de la réception des rapports, des contrôles et de la livraison CM.</li>
          <li class="feature-item"><strong>Architecture n8n</strong> — déclencheurs, branches, transformations, reprises sur erreur et sorties documentées.</li>
          <li class="feature-item"><strong>Intégrations</strong> — connexion Gmail, Google Drive, SocialPilot, Notion et Discord avec des données JSON normalisées.</li>
          <li class="feature-item"><strong>Qualité des données</strong> — contrôles de pièces jointes, doublons, KPI attendus et cohérence des informations par réseau.</li>
          <li class="feature-item"><strong>Livrable client</strong> — génération d’un rapport CM personnalisé et contrôles avant dépôt ou notification.</li>
        </ul>
      </div>

      <div class="section">
        <h3 class="section-title">Technologies et outils</h3>
        <div class="tech-grid">
          <div class="tech-item"><span class="tech-name">n8n</span><p class="tech-desc">Orchestration des étapes et supervision du scénario</p></div>
          <div class="tech-item"><span class="tech-name">SocialPilot</span><p class="tech-desc">Source des rapports et des indicateurs sociaux</p></div>
          <div class="tech-item"><span class="tech-name">Gmail API</span><p class="tech-desc">Réception et récupération des pièces jointes</p></div>
          <div class="tech-item"><span class="tech-name">Google Drive</span><p class="tech-desc">Archivage des sources et des livrables</p></div>
          <div class="tech-item"><span class="tech-name">JSON, PDF et OCR</span><p class="tech-desc">Normalisation, génération et récupération ciblée des données visuelles</p></div>
          <div class="tech-item"><span class="tech-name">Discord / Notion</span><p class="tech-desc">Suivi, notifications et association du rapport au contexte client</p></div>
        </div>
      </div>

      <div class="section project-metrics">
        <h3 class="section-title">Entrées, traitement et sortie</h3>
        <div class="metrics-grid">
          <div><strong>Entrée</strong><span>Rapport PDF exporté par SocialPilot</span></div>
          <div><strong>Traitement</strong><span>KPI normalisés, analyse et contrôle qualité</span></div>
          <div><strong>Sortie</strong><span>Rapport CM client personnalisé prêt à livrer</span></div>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">Workflow complet de reporting</h3>
        <div class="workflow-steps">
          <div class="workflow-step">
            <h4>1. Réception et sécurisation</h4>
            <p>Le scénario surveille les nouveaux rapports reçus par email selon une planification définie. Les pièces jointes PDF sont contrôlées, identifiées et comparées aux archives existantes pour éviter les doublons avant tout traitement.</p>
          </div>
          <div class="workflow-step">
            <h4>2. Archivage des sources</h4>
            <p>Chaque rapport validé est archivé dans Google Drive avec les métadonnées utiles. Les fichiers sources restent disponibles pour la traçabilité et pour relire l’origine des indicateurs utilisés dans le document final.</p>
          </div>
          <div class="workflow-step">
            <h4>3. Extraction et normalisation des KPI</h4>
            <p>Les informations sont extraites puis regroupées réseau par réseau. Les formats différents sont transformés en une structure JSON commune, tout en conservant les spécificités propres à chaque canal. Des validations vérifient la présence et la cohérence des KPI attendus.</p>
          </div>
          <div class="workflow-step">
            <h4>4. OCR et données visuelles ciblées</h4>
            <p>Quand une valeur est uniquement visible dans un graphique ou un élément visuel, le workflow déclenche un OCR ciblé sur la zone utile. Les informations récupérées sont normalisées puis réintégrées sans appliquer inutilement l’OCR à tout le document.</p>
          </div>
          <div class="workflow-step">
            <h4>5. Analyse et recommandations CM</h4>
            <p>Les données consolidées alimentent une lecture synthétique : évolution de l’audience, engagement, performance des formats, signaux d’alerte et recommandations. Les conclusions restent bornées aux informations réellement présentes dans les rapports SocialPilot.</p>
          </div>
          <div class="workflow-step">
            <h4>6. Génération du rapport client</h4>
            <p>Le workflow assemble les KPI par réseau, tableaux de performance, analyses, recommandations et visuels dans un PDF client. L’objectif est de transformer une exportation technique en support de suivi compréhensible par le client et l’équipe de community management.</p>
          </div>
          <div class="workflow-step">
            <h4>7. Contrôle qualité et livraison</h4>
            <p>Un contrôle de contenu vérifie les données et les sections attendues. Un second contrôle visuel recherche les pages coupées, les éléments manquants ou les problèmes de mise en page. Le rapport reçoit son statut final avant dépôt dans Drive, association éventuelle à Notion et notification Discord.</p>
          </div>
        </div>
      </div>

      <div class="section info-box">
        <h3 class="section-title">Valeur produite</h3>
        <ul class="features-list">
          <li class="feature-item">Un rapport SocialPilot brut devient un livrable CM client homogène et exploitable.</li>
          <li class="feature-item">Les étapes répétitives de collecte, de mise en forme et de vérification sont orchestrées dans un même workflow.</li>
          <li class="feature-item">Les sources, contrôles et notifications rendent la production plus traçable et plus simple à reprendre.</li>
          <li class="feature-item">Les données client, paramètres exacts et résultats chiffrés restent confidentiels.</li>
        </ul>
      </div>

      <div class="section results">
        <h3 class="section-title">Périmètre et confidentialité</h3>
        <div class="result-box success">
          <p class="result-text">Le périmètre couvre la chaîne complète : rapport SocialPilot reçu, données contrôlées, analyse bornée, PDF CM généré, QA et livraison.</p>
          <p class="result-text">Aucun pourcentage de gain n’est publié ici sans mesure client vérifiable.</p>
        </div>
      </div>
    </div>
  `,
  gallery: ['img_projects/n8n1.png', 'img_projects/n8n2.png'],
};

export const n8nVideoDerushProject: Project = {
  id: 'n8n-video-derush',
  title: 'Automatisations n8n — Dérush vidéo',
  description: 'Pipeline n8n qui transforme des rushes bruts en séquences sélectionnées, pré-montage, sous-titres, preview et livrables prêts pour la production de formats Instagram et TikTok.',
  category: 'emploi',
  image: 'img_projects/n8n.png',
  tech: ['n8n', 'Google Drive API', 'FFmpeg', 'Whisper', 'EDL', 'SRT / ASS', 'JavaScript'],
  detailedContent: `
    <div class="project-detail">
      <h2 class="project-title">Automatisations n8n — Dérush vidéo</h2>

      <div class="section">
        <h3 class="section-title">Contexte du projet</h3>
        <p class="description">
          Conception d’un pipeline n8n qui part de rushes vidéo bruts et prépare des contenus courts pour les réseaux
          sociaux. Le workflow organise la matière, transcrit les échanges, repère les passages utiles et produit les
          fichiers nécessaires pour passer du tournage au pré-montage puis à la production Instagram ou TikTok.
        </p>
        <p class="description">
          Le but est de livrer une base de montage exploitable plutôt qu’une simple transcription : séquences retenues,
          timestamps fiables, hook, questions-réponses, micro-coupes, sous-titres, preview et timeline sont rassemblés
          dans une arborescence claire. La validation éditoriale humaine reste possible à chaque étape.
        </p>
      </div>

      <div class="section info-box">
        <h3 class="section-title">Ma contribution</h3>
        <ul class="features-list">
          <li class="feature-item"><strong>Architecture du pipeline</strong> — ingestion, préparation, analyse, sélection et livraison dans n8n.</li>
          <li class="feature-item"><strong>Traitement média</strong> — extraction audio, conversion, contrôle des fichiers et préparation des espaces de travail.</li>
          <li class="feature-item"><strong>Analyse assistée par IA</strong> — transcription horodatée, scoring éditorial et détection des blocs questions-réponses.</li>
          <li class="feature-item"><strong>Pré-montage technique</strong> — génération EDL, sous-titres, preview MP4 et livrables orientés montage.</li>
          <li class="feature-item"><strong>Contrôles et documentation</strong> — doublons, timestamps, coupures, dossiers de sortie et règles de reprise.</li>
        </ul>
      </div>

      <div class="section">
        <h3 class="section-title">Technologies et outils</h3>
        <div class="tech-grid">
          <div class="tech-item"><span class="tech-name">n8n</span><p class="tech-desc">Orchestration des étapes et automatisation du pipeline</p></div>
          <div class="tech-item"><span class="tech-name">Google Drive API</span><p class="tech-desc">Ingestion, organisation et livraison des médias</p></div>
          <div class="tech-item"><span class="tech-name">FFmpeg</span><p class="tech-desc">Extraction audio, conversions et génération de previews</p></div>
          <div class="tech-item"><span class="tech-name">Whisper</span><p class="tech-desc">Transcription avec timestamps et langue détectée</p></div>
          <div class="tech-item"><span class="tech-name">EDL / SRT / ASS</span><p class="tech-desc">Timeline de pré-montage et sous-titres exploitables</p></div>
          <div class="tech-item"><span class="tech-name">JavaScript et IA</span><p class="tech-desc">Transformations, analyse éditoriale et contrôles métier</p></div>
        </div>
      </div>

      <div class="section project-metrics">
        <h3 class="section-title">De l’entrée aux livrables</h3>
        <div class="metrics-grid">
          <div><strong>Entrée</strong><span>Rush vidéo brut et métadonnées de tournage</span></div>
          <div><strong>Pré-montage</strong><span>Séquences, hook, Q/R et timestamps sélectionnés</span></div>
          <div><strong>Sorties</strong><span>EDL, SRT/ASS, preview MP4 et dossiers prêts pour la production</span></div>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">Pipeline complet de dérush</h3>
        <div class="workflow-steps">
          <div class="workflow-step">
            <h4>1. Ingestion et préparation</h4>
            <p>Les nouvelles vidéos sont récupérées depuis Google Drive. Le workflow vérifie qu’elles n’ont pas déjà été traitées, crée l’espace de travail, prépare les chemins et applique les paramètres de durée ou de format nécessaires à la suite du traitement.</p>
          </div>
          <div class="workflow-step">
            <h4>2. Extraction audio et transcription</h4>
            <p>FFmpeg extrait l’audio puis Whisper produit une transcription horodatée. La langue est détectée, le texte est nettoyé et découpé en blocs afin de retrouver rapidement chaque phrase dans le rush original.</p>
          </div>
          <div class="workflow-step">
            <h4>3. Analyse éditoriale</h4>
            <p>Les séquences sont analysées selon le sujet, le potentiel d’accroche, la densité d’information, l’énergie, l’émotion, la qualité audio, les répétitions et l’autonomie de l’extrait. Les passages utiles sont classés et scorés pour préparer la sélection.</p>
          </div>
          <div class="workflow-step">
            <h4>4. Questions, réponses et timestamps</h4>
            <p>Pour les interviews, le workflow repère les questions et leurs réponses. Les timestamps sont ajustés pour éviter les silences inutiles, les débuts trop tôt et les coupes au milieu d’une phrase. Les blocs validés peuvent former une séquence structurée question puis réponse.</p>
          </div>
          <div class="workflow-step">
            <h4>5. Construction du pré-montage</h4>
            <p>Les meilleurs passages sont assemblés dans une EDL compatible avec une reprise dans Adobe Premiere. La timeline peut intégrer le hook d’ouverture, les blocs Q/R, les micro-coupes techniques et les extraits sélectionnés, avec des contrôles contre les doublons et les mauvaises jonctions.</p>
          </div>
          <div class="workflow-step">
            <h4>6. Sous-titres et preview</h4>
            <p>Le pipeline génère les fichiers SRT ou ASS et une preview MP4 pour visualiser l’enchaînement avant le montage définitif. Les sorties sont préparées pour des formats courts verticaux adaptés à Instagram, TikTok, Facebook et autres plateformes sociales.</p>
          </div>
          <div class="workflow-step">
            <h4>7. Livraison prête pour la production</h4>
            <p>Les rushes sélectionnés, la timeline, les sous-titres, la preview et les rapports de contrôle sont rangés dans une arborescence Google Drive dédiée. Le monteur retrouve la matière et les repères nécessaires pour finaliser rapidement chaque contenu.</p>
          </div>
        </div>
      </div>

      <div class="section info-box">
        <h3 class="section-title">Valeur produite</h3>
        <ul class="features-list">
          <li class="feature-item">Un rush long devient une sélection éditoriale structurée et exploitable pour les formats courts.</li>
          <li class="feature-item">Le monteur reçoit une timeline, des sous-titres, une preview et des repères temporels plutôt qu’un dossier non trié.</li>
          <li class="feature-item">Les contrôles de doublons, de coupures et de timestamps sécurisent les étapes avant production.</li>
          <li class="feature-item">La sélection assistée par IA accélère la préparation tout en laissant la décision éditoriale finale à l’équipe.</li>
        </ul>
      </div>

      <div class="section results">
        <h3 class="section-title">Périmètre et confidentialité</h3>
        <div class="result-box success">
          <p class="result-text">Le périmètre couvre le passage du rush brut aux livrables de pré-montage prêts à être repris pour produire les formats Instagram et TikTok.</p>
          <p class="result-text">Les données de tournage, paramètres exacts et résultats chiffrés restent confidentiels.</p>
        </div>
      </div>
    </div>
  `,
  gallery: ['img_projects/n8n1.png', 'img_projects/n8n2.png'],
};


export const emploiProjects: Project[] = [
  {
    id: 'wallet-provider',
    title: 'Altme Wallet Provider',
    description: "Solution de Wallet d'identité numérique pour entreprises et particuliers. Gestion de données vérifiables, conformité eIDAS 2.0 et interopérabilité avec l'EUDI Wallet européen.",
    category: 'emploi',
    image: 'img_projects/wallet_provider.png',
    tech: ['Identity Wallet', 'eIDAS 2.0', 'Verifiable Credentials', 'OIDC4VC', 'EBSI', 'SSI'],
    demo: 'https://www.talao.io/index_fr.html',
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
          <p class="highlight"><strong>Pages et sections de documentation</strong> migrées ou maintenues entre GitBook et Docusaurus.</p>
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
  n8nReportingProject,
  n8nVideoDerushProject,
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
          <h3 class="section-title">Périmètre de veille</h3>
          <div class="metrics-grid">
            <div><strong>Sources connectées</strong><span>Agrégation et analyse configurées</span></div>
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
];
