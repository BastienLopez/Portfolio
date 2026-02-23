import { Project } from './types';

export const mobileProjects: Project[] = [
  {
    id: 'aqualis',
    title: 'Aqualis',
    description:
      'Aquarium gamifié de motivation : réalise des sessions focus (travail, étude, sport) pour gagner de l\'or et de l\'XP, collectionne des poissons rares, gère tes aquariums et lance des reproductions.',
    category: 'mobile',
    image: 'img_projects/aqualis.png',
    tech: ['React Native', 'Expo', 'TypeScript', 'Context API'],
    github: 'https://github.com/BastienLopez/Aqualis',
    demo: 'https://bastienlopez.github.io/Aqualis/aquarium',
    detailedContent: `
      <div class="project-detail">
        <h2 class="project-title">🐠 Aqualis</h2>

        <div class="section">
          <h3 class="section-title">📋 Présentation</h3>
          <p class="description">
            <strong>Aqualis</strong> est un <strong>aquarium gamifié</strong> conçu comme une boucle de motivation/focus.
            Le principe : tu effectues des <strong>sessions chronométrées</strong> (travail, études, sport…),
            ce qui te récompense en <strong>gold 🪙 et XP</strong>. Ces ressources servent à
            <strong>collectionner des poissons</strong>, les placer dans des aquariums thématiques,
            et lancer des <strong>reproductions</strong> pour obtenir de nouveaux spécimens.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">🔄 Boucle principale (core loop)</h3>
          <ul class="features-list">
            <li class="feature-item"><span class="feature-icon">⏱️</span> Choisis une activité (work / study / sport) et une durée de session type <em>pomodoro</em>.</li>
            <li class="feature-item"><span class="feature-icon">🪙</span> Termine la session → reçois de l'XP et de l'or calculés dynamiquement.</li>
            <li class="feature-item"><span class="feature-icon">🐟</span> Utilise l'or pour acheter des poissons dans la boutique du catalogue.</li>
            <li class="feature-item"><span class="feature-icon">📈</span> L'XP fait monter ton niveau joueur (formule en racine carrée).</li>
            <li class="feature-item"><span class="feature-icon">📋</span> Des quêtes quotidiennes orientent ta progression et offrent des récompenses supplémentaires.</li>
          </ul>
        </div>

        <div class="section">
          <h3 class="section-title">🐠 Gestion des aquariums & collection</h3>
          <ul class="features-list">
            <li class="feature-item"><span class="feature-icon">🌊</span> Plusieurs aquariums thématiques disponibles : <em>deep, reef, abyss, pandemonium</em>…</li>
            <li class="feature-item"><span class="feature-icon">➕</span> Assigne ou retire tes poissons de chaque aquarium (limite par bac).</li>
            <li class="feature-item"><span class="feature-icon">📚</span> Section <strong>Savoir</strong> : fiches détaillées sur chaque espèce de poisson.</li>
            <li class="feature-item"><span class="feature-icon">🗂️</span> Section <strong>Collection</strong> : liste tous tes poissons possédés et leur statut.</li>
          </ul>
        </div>

        <div class="section">
          <h3 class="section-title">🧬 Système de reproduction (mid-game)</h3>
          <ul class="features-list">
            <li class="feature-item"><span class="feature-icon">♂️♀️</span> Chaque poisson a un <strong>genre</strong> (mâle / femelle) ; une paire est nécessaire pour se reproduire.</li>
            <li class="feature-item"><span class="feature-icon">🥚</span> La paire passe par plusieurs statuts : <em>en attente → œuf → bébé</em>.</li>
            <li class="feature-item"><span class="feature-icon">✨</span> Le bébé hérite de traits des deux parents et est ajouté à ta collection.</li>
            <li class="feature-item"><span class="feature-icon">🔒</span> Un niveau minimum de reproduction est requis selon l'espèce.</li>
          </ul>
        </div>

        <div class="section">
          <h3 class="section-title">⚙️ Technologies utilisées</h3>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-icon">⚛️</span>
              <span class="tech-name">React Native / Expo</span>
              <p class="tech-desc">App mobile cross-platform</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🟦</span>
              <span class="tech-name">TypeScript</span>
              <p class="tech-desc">Typage strict et fiable</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🗂️</span>
              <span class="tech-name">Context API</span>
              <p class="tech-desc">État global du jeu</p>
            </div>
          </div>
        </div>
      </div>
    `,
  },
];
