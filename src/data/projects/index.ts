import { emploiProjects } from './emploi';
import { freelanceProjects } from './freelance';
import { opensourceProjects } from './opensource';
import { gamingProjects } from './gaming';
import { browserProjects } from './browser';
import { Project } from './types';

export type { Project };

export const allProjects: Project[] = [
  ...emploiProjects,
  ...freelanceProjects,
  ...opensourceProjects,
  ...gamingProjects,
  ...browserProjects,
];

export {
  emploiProjects,
  freelanceProjects,
  opensourceProjects,
  gamingProjects,
  browserProjects,
};
