import { Project } from './types';

export const gamingProjects: Project[] = [
  {
    id: 'nolvus-mod-automation',
    title: 'Nolvus Mod Automation',
    description: "Automation of mods download (+3k5 mods) Nolvus Skyrim for free account. AutoHotkey script pour télécharger automatiquement les mods Nolvus sans compte premium.",
    category: 'gaming',
    image: 'img_projects/nolvus.png',
    tech: ['AutoHotkey', 'Automation', 'OCR'],
    github: 'https://github.com/BastienLopez/nolvus_mod_dowload_automation',
    detailedContent: `
      <div class="project-detail">
        <h2 class="project-title">🎮 Nolvus Mod Automation</h2>
        
        <div class="section">
          <h3 class="section-title">📋 Contexte du projet</h3>
          <p class="description">
            Script <strong>AutoHotkey</strong> permettant d'automatiser le téléchargement de plus de <strong>3500 mods</strong> 
            pour Nolvus Skyrim sans avoir besoin d'un compte premium. Le script détecte automatiquement le bouton 
            "Slow Download" et gère le scrolling de la page.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">⚙️ Technologies utilisées</h3>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-icon">🤖</span>
              <span class="tech-name">AutoHotkey 2.0</span>
              <p class="tech-desc">Automation avancée</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🔍</span>
              <span class="tech-name">OCR</span>
              <p class="tech-desc">Reconnaissance d'image</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">⌨️</span>
              <span class="tech-name">Gestion événements</span>
              <p class="tech-desc">Clavier/Souris</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">✨ Fonctionnalités principales</h3>
          <ul class="features-list">
            <li class="feature-item">
              <span class="feature-icon">🔍</span>
              <strong>Détection automatique</strong> - Bouton "Slow Download"
            </li>
            <li class="feature-item">
              <span class="feature-icon">📜</span>
              <strong>Scrolling intelligent</strong> - Recherche automatique
            </li>
            <li class="feature-item">
              <span class="feature-icon">⬇️</span>
              <strong>Téléchargement arrière-plan</strong> - Gestion autonome
            </li>
            <li class="feature-item">
              <span class="feature-icon">⚙️</span>
              <strong>Configuration</strong> - Évite les interférences
            </li>
            <li class="feature-item">
              <span class="feature-icon">✅</span>
              <strong>Compatible Nolvus</strong> - Dashboard intégré
            </li>
          </ul>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">
              ✅ Téléchargement <strong>automatique</strong> de tous les mods sans intervention manuelle.
            </p>
            <p class="result-text">
              ✅ <strong>Économie de plusieurs heures</strong> de clics répétitifs pour utilisateurs gratuits.
            </p>
          </div>
        </div>
      </div>
    `,
    gallery: ['img_projects/nolvus.png']
  },
  {
    id: 'bloodborne-shadps4',
    title: 'Bloodborne - Emulator Installation Guide',
    description: "Installation guide for Bloodborne via ShadPS4 emulator with graphics mods and 60fps + bug fix. Guide complet pour jouer à Bloodborne sur PC.",
    category: 'gaming',
    image: 'img_projects/bloodborne.png',
    tech: ['ShadPS4', 'ReShade', 'Modding', 'Emulation'],
    github: 'https://github.com/BastienLopez/Bloodborne_ShadPS4_60fps',
    detailedContent: `
      <div class="project-detail">
        <h2 class="project-title">🩸 Bloodborne - Guide Émulateur</h2>
        
        <div class="section">
          <h3 class="section-title">📋 Contexte du projet</h3>
          <p class="description">
            Guide complet d'installation de <strong>Bloodborne sur PC</strong> via l'émulateur ShadPS4. 
            Inclut l'installation du jeu, des <strong>mods graphiques</strong>, ReShade et les patchs <strong>60 FPS</strong> 
            pour une expérience optimale sur PC.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">⚙️ Technologies utilisées</h3>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-icon">🎮</span>
              <span class="tech-name">ShadPS4</span>
              <p class="tech-desc">Émulateur PS4 pour PC</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🎨</span>
              <span class="tech-name">ReShade</span>
              <p class="tech-desc">Amélioration graphique</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🔧</span>
              <span class="tech-name">PC Remaster Project</span>
              <p class="tech-desc">Mods graphiques HD</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🛠️</span>
              <span class="tech-name">Vertex Explosion Fix</span>
              <p class="tech-desc">Correction bugs textures</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">✨ Guide d'installation</h3>
          <ul class="features-list">
            <li class="feature-item">
              <span class="feature-icon">📥</span>
              <strong>Installation ShadPS4</strong> - Configuration complète
            </li>
            <li class="feature-item">
              <span class="feature-icon">🎮</span>
              <strong>Installation jeu</strong> - Bloodborne + DLC
            </li>
            <li class="feature-item">
              <span class="feature-icon">🖼️</span>
              <strong>Mods graphiques HD</strong> - Textures, lumière, sons
            </li>
            <li class="feature-item">
              <span class="feature-icon">🎨</span>
              <strong>ReShade optimisé</strong> - Configuration incluse
            </li>
            <li class="feature-item">
              <span class="feature-icon">⚡</span>
              <strong>Patchs 60 FPS</strong> - Avec Deltatime
            </li>
            <li class="feature-item">
              <span class="feature-icon">🚫</span>
              <strong>Désactivations</strong> - Motion blur, aberration
            </li>
            <li class="feature-item">
              <span class="feature-icon">🔧</span>
              <strong>Correction bugs</strong> - Textures visage fixées
            </li>
            <li class="feature-item">
              <span class="feature-icon">📊</span>
              <strong>Optimisation</strong> - Performances maximales
            </li>
          </ul>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">
              ✅ Guide <strong>détaillé</strong> pour jouer à Bloodborne sur PC avec graphismes améliorés.
            </p>
            <p class="result-text">
              ✅ <strong>60 FPS stables</strong> et tous les bugs majeurs corrigés.
            </p>
            <p class="result-text">
              ✅ Expérience <strong>supérieure</strong> à la version PS4 originale.
            </p>
          </div>
        </div>
      </div>
    `,
    gallery: ['img_projects/bloodborne.png']
  },
  {
    id: 'demons-souls-rpcs3',
    title: "Demon's Souls - Emulator Installation Guide",
    description: "Installation guide for Demon's Souls via RPCS3 emulator with graphics mods and 60fps + bug fix. Guide complet pour jouer à Demon's Souls sur PC.",
    category: 'gaming',
    image: 'img_projects/demons_souls.png',
    tech: ['RPCS3', 'Modding', 'Emulation', 'PS3'],
    github: 'https://github.com/BastienLopez/Demons-s-Soules-RPCS3-60fps',
    detailedContent: `
      <div class="project-detail">
        <h2 class="project-title">⚔️ Demon's Souls - Guide Émulateur</h2>
        
        <div class="section">
          <h3 class="section-title">📋 Contexte du projet</h3>
          <p class="description">
            Guide complet d'installation de <strong>Demon's Souls (PS3) sur PC</strong> via l'émulateur RPCS3. 
            Inclut l'installation du firmware PS3, du jeu, des <strong>mods graphiques</strong> et des patchs <strong>60 FPS</strong> 
            pour une expérience optimale.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">⚙️ Technologies utilisées</h3>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-icon">🎮</span>
              <span class="tech-name">RPCS3</span>
              <p class="tech-desc">Émulateur PS3 pour PC</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">💿</span>
              <span class="tech-name">PS3 Firmware</span>
              <p class="tech-desc">Système d'exploitation PS3</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🖼️</span>
              <span class="tech-name">Mods graphiques</span>
              <p class="tech-desc">Textures HD, lighting</p>
            </div>
            <div class="tech-item">
              <span class="tech-icon">🔧</span>
              <span class="tech-name">Community Patches</span>
              <p class="tech-desc">60 FPS, QoL improvements</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">✨ Guide d'installation</h3>
          <ul class="features-list">
            <li class="feature-item">
              <span class="feature-icon">📥</span>
              <strong>Installation RPCS3</strong> - Configuration complète
            </li>
            <li class="feature-item">
              <span class="feature-icon">💿</span>
              <strong>Firmware PS3</strong> - Installation système
            </li>
            <li class="feature-item">
              <span class="feature-icon">🎮</span>
              <strong>Demon's Souls</strong> - BLES-00932 EU version
            </li>
            <li class="feature-item">
              <span class="feature-icon">🖼️</span>
              <strong>DSfix-ish HD</strong> - Textures haute définition
            </li>
            <li class="feature-item">
              <span class="feature-icon">📹</span>
              <strong>Patch caméra 60 FPS</strong> - Fluidité améliorée
            </li>
            <li class="feature-item">
              <span class="feature-icon">⚖️</span>
              <strong>Ascended Mod</strong> - Rééquilibrage & QoL
            </li>
            <li class="feature-item">
              <span class="feature-icon">🌐</span>
              <strong>Interface retraduite</strong> - FR/EN amélioré
            </li>
            <li class="feature-item">
              <span class="feature-icon">🚫</span>
              <strong>Désactivations</strong> - DoF, Motion Blur
            </li>
            <li class="feature-item">
              <span class="feature-icon">💡</span>
              <strong>Amélioration éclairage</strong> - Lumière et sons
            </li>
            <li class="feature-item">
              <span class="feature-icon">⚡</span>
              <strong>Optimisation</strong> - SPU, cache, performances
            </li>
          </ul>
        </div>

        <div class="section results">
          <h3 class="section-title">🎯 Résultats</h3>
          <div class="result-box success">
            <p class="result-text">
              ✅ Guide <strong>détaillé</strong> pour jouer à Demon's Souls sur PC.
            </p>
            <p class="result-text">
              ✅ <strong>Résolution 4K</strong>, textures HD et 60 FPS stables.
            </p>
            <p class="result-text">
              ✅ Version <strong>définitive</strong> du classique de FromSoftware.
            </p>
          </div>
        </div>
      </div>
    `,
    gallery: ['img_projects/demons_souls.png']
  }
];
