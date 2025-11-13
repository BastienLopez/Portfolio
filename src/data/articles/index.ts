import { Article } from './types';
import { cultureArticles } from './culture';
import { devopsArticles } from './devops';
import { toolsArticles } from './tools';
import { architectureArticles } from './architecture';
import { freelanceArticles } from './freelance';

export const allArticles: Article[] = [
  ...cultureArticles,
  ...devopsArticles,
  ...toolsArticles,
  ...architectureArticles,
  ...freelanceArticles,
];

export type { Article, ArticleCategory } from './types';
export { cultureArticles, devopsArticles, toolsArticles, architectureArticles, freelanceArticles };
