import { emploiProjects } from './emploi';
import { freelanceProjects } from './freelance';
import { opensourceProjects } from './opensource';
import { gamingProjects } from './gaming';
import { Project } from './types';

export type { Project };

export const allProjects: Project[] = [
  ...emploiProjects,
  ...freelanceProjects,
  ...opensourceProjects,
  ...gamingProjects
];

export {
  emploiProjects,
  freelanceProjects,
  opensourceProjects,
  gamingProjects
};
