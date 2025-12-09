import { Project } from './types';

const gameAsset = (file: string) => `${import.meta.env.BASE_URL}images/games/${file}`;

export const browserProjects: Project[] = [
  {
    id: 'browser-snake',
    title: 'Snake Canvas',
    description: 'Serpent minimaliste en canvas 2D avec collisions rapides.',
    category: 'browser',
    image: gameAsset('snake-card.svg'),
    tech: ['TypeScript', 'Canvas 2D', 'State Machine'],
  },
  {
    id: 'browser-2048',
    title: '2048 React',
    description: 'Version reactive du puzzle 2048 avec fusion animee.',
    category: 'browser',
    image: gameAsset('2048-card.svg'),
    tech: ['React', 'TypeScript', 'Game Logic'],
  },
  {
    id: 'browser-flappy',
    title: 'Flappy GitHub',
    description: 'Runner vertical theme GitHub avec tuyaux style Mario.',
    category: 'browser',
    image: gameAsset('flappy-card.svg'),
    tech: ['Canvas 2D', 'Physics Loop', 'TypeScript'],
  },
  {
    id: 'browser-memory',
    title: 'Memory Match',
    description: 'Jeu de paires responsive avec animations et tracking des coups.',
    category: 'browser',
    image: gameAsset('memory-card.svg'),
    tech: ['React', 'Animations', 'State Machine'],
  },
  {
    id: 'browser-breakout',
    title: 'Breakout Canvas',
    description: 'Casse-briques retro avec collisions en temps reel et bonus.',
    category: 'browser',
    image: gameAsset('breakout-card.svg'),
    tech: ['Canvas 2D', 'Physics', 'TypeScript'],
  },
  {
    id: 'browser-tetris',
    title: 'Tetris Blocks',
    description: 'Implementation moderne avec rotations fluides et systeme de lignes.',
    category: 'browser',
    image: gameAsset('tetris-card.svg'),
    tech: ['React', 'Canvas Grid', 'Game Loop'],
  },
];
