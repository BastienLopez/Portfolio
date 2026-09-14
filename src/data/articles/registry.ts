import { allArticles, type ArticleTranslation } from "./index";
import { articlePageDefinitions, getArticlePageDefinition } from "./pages";
import cultureTranslations from "./en/culture.json";
import devopsTranslations from "./en/devops.json";
import toolsTranslations from "./en/tools.json";
import architectureTranslations from "./en/architecture.json";
import freelanceTranslations from "./en/freelance.json";
import type { Article } from "./types";

export type LocalizedArticlePage = {
  definition: (typeof articlePageDefinitions)[number];
  article: Article;
  translation: ArticleTranslation;
};

const articlesById = new Map(allArticles.map((article) => [article.id, article]));
const translationsById = new Map<ArticleTranslation["id"], ArticleTranslation>([
  ...cultureTranslations,
  ...devopsTranslations,
  ...toolsTranslations,
  ...architectureTranslations,
  ...freelanceTranslations,
].map((translation) => [translation.id, translation]));

export const getArticlePage = (slug: string | undefined): LocalizedArticlePage | undefined => {
  const definition = getArticlePageDefinition(slug);
  if (!definition) return undefined;

  const article = articlesById.get(definition.id);
  const translation = translationsById.get(definition.id);
  if (!article || !translation) return undefined;

  return { definition, article, translation };
};
