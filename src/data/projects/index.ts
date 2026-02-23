import { emploiProjects } from './emploi';
import { freelanceProjects } from './freelance';
import { opensourceProjects } from './opensource';
import { mobileProjects } from './mobile';
import { gamingProjects } from './gaming';
import { browserProjects } from './browser';
import { Project } from './types';

export type { Project };

export const allProjects: Project[] = [
  ...emploiProjects,
  ...freelanceProjects,
  ...opensourceProjects,
  ...mobileProjects,
  ...gamingProjects,
  ...browserProjects,
];

export {
  emploiProjects,
  freelanceProjects,
  opensourceProjects,
  mobileProjects,
  gamingProjects,
  browserProjects,
};
