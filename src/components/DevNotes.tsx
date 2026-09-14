import { useRef, useState } from 'react';
import DOMPurify from 'dompurify';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Briefcase,
  FileText,
  Puzzle,
  Settings2,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import type { Article, ArticleCategory, ArticleTranslation } from '../data/articles';
import { articlePageDefinitions, getArticlePageDefinitionById } from '../data/articles/pages';
import { renderArticleContent } from '@/lib/article-content';
import { useLanguage } from '@/lib/i18n';
import { Link } from 'react-router-dom';

type SelectableCategory = Exclude<ArticleCategory, never>;
type LocalizedArticle = Article & { titleEn: string; contentEn: string };

const mergeTranslations = (articles: Article[], translations: ArticleTranslation[]): LocalizedArticle[] => {
  const translationsById = new Map(translations.map((translation) => [translation.id, translation]));

  return articles.map((article) => {
    const translation = translationsById.get(article.id);
    if (!translation) throw new Error(`Missing English translation for ${article.id}`);
    return { ...article, titleEn: translation.title, contentEn: translation.content };
  });
};

const articleLoaders: Record<SelectableCategory, () => Promise<LocalizedArticle[]>> = {
  culture: async () => {
    const [{ cultureArticles }, { default: translations }] = await Promise.all([
      import('../data/articles/culture'),
      import('../data/articles/en/culture.json'),
    ]);
    return mergeTranslations(cultureArticles, translations);
  },
  devops: async () => {
    const [{ devopsArticles }, { default: translations }] = await Promise.all([
      import('../data/articles/devops'),
      import('../data/articles/en/devops.json'),
    ]);
    return mergeTranslations(devopsArticles, translations);
  },
  tools: async () => {
    const [{ toolsArticles }, { default: translations }] = await Promise.all([
      import('../data/articles/tools'),
      import('../data/articles/en/tools.json'),
    ]);
    return mergeTranslations(toolsArticles, translations);
  },
  architecture: async () => {
    const [{ architectureArticles }, { default: translations }] = await Promise.all([
      import('../data/articles/architecture'),
      import('../data/articles/en/architecture.json'),
    ]);
    return mergeTranslations(architectureArticles, translations);
  },
  freelance: async () => {
    const [{ freelanceArticles }, { default: translations }] = await Promise.all([
      import('../data/articles/freelance'),
      import('../data/articles/en/freelance.json'),
    ]);
    return mergeTranslations(freelanceArticles, translations);
  },
};

const DevNotes = () => {
  const { isEnglish } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<SelectableCategory | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<LocalizedArticle | null>(null);
  const [articles, setArticles] = useState<LocalizedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const loadRequestRef = useRef(0);

  const categoryConfig: Record<SelectableCategory, { icon: LucideIcon; title: string }> = {
    culture: {
      icon: Brain,
      title: isEnglish ? 'Culture & methods' : 'Culture & Méthodes',
    },
    devops: {
      icon: Settings2,
      title: 'CI/CD & DevOps',
    },
    tools: {
      icon: Puzzle,
      title: isEnglish ? 'Tools & productivity' : 'Outils & Productivité',
    },
    architecture: {
      icon: Wrench,
      title: isEnglish ? 'Architecture & best practices' : 'Architecture & Bonnes pratiques',
    },
    freelance: {
      icon: Briefcase,
      title: isEnglish ? 'Project management & freelance' : 'Gestion de projet & Freelance',
    }
  };

  const filteredArticles = selectedCategory 
    ? articles.filter(article => article.category === selectedCategory)
    : [];

  const loadArticles = async (category: SelectableCategory) => {
    const requestId = ++loadRequestRef.current;
    setSelectedCategory(category);
    setSelectedArticle(null);
    setIsLoading(true);
    setLoadError(false);

    try {
      const loadedArticles = await articleLoaders[category]();
      if (requestId !== loadRequestRef.current) return;
      setArticles(loadedArticles);
    } catch {
      if (requestId !== loadRequestRef.current) return;
      setArticles([]);
      setLoadError(true);
    } finally {
      if (requestId === loadRequestRef.current) setIsLoading(false);
    }
  };

  const handleCategoryClick = (category: SelectableCategory) => {
    if (selectedCategory === category) {
      loadRequestRef.current += 1;
      setSelectedCategory(null);
      setSelectedArticle(null);
      setArticles([]);
      setLoadError(false);
      setIsLoading(false);
    } else {
      void loadArticles(category);
    }
  };

  const handleRetry = () => {
    if (selectedCategory) void loadArticles(selectedCategory);
  };

  const handleArticleClick = (article: LocalizedArticle) => {
    setSelectedArticle(article);
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
    window.requestAnimationFrame(() => {
      document.getElementById("devnotes")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  const SelectedCategoryIcon = selectedArticle
    ? categoryConfig[selectedArticle.category].icon
    : null;

  return (
    <section id="devnotes" className="py-20 px-4 w-full overflow-x-hidden section-even">
      <div className="container mx-auto max-w-6xl w-full">
        <div className="text-center mb-12 w-full">
          <h2 className="flex items-center justify-center gap-2 text-3xl md:text-4xl font-bold mb-4">
            <FileText className="h-7 w-7 text-primary md:h-8 md:w-8" aria-hidden="true" />
            <span>{isEnglish ? 'Selected dev notes' : 'Dev Notes sélectionnées'}</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-2 px-4">
            {isEnglish ? 'Technical notes on automation, AI, architecture and deployment, with access to all notes by topic.' : "Retours techniques autour de l'automatisation, de l'IA, de l'architecture et du déploiement, avec un accès à l'ensemble des notes par thème."}
          </p>
          {!selectedArticle && (
            <p className="text-sm md:text-md text-muted-foreground font-medium mb-8">
              {isEnglish ? 'Select a topic:' : 'Sélectionnez le topic souhaité :'}
            </p>
          )}
        </div>

        {/* Article Detail View */}
        {selectedArticle ? (
          <div className="max-w-4xl mx-auto w-full">
            <div className="sticky top-20 z-20 mb-6 flex border-y border-border bg-background/95 py-3 backdrop-blur-sm">
              <Button
                data-devnotes-back
                onClick={handleBackToList}
                variant="ghost"
                className="h-auto rounded-none px-0 text-sm text-muted-foreground hover:bg-transparent hover:text-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                {isEnglish ? 'Back to Dev Notes' : 'Retour aux Dev Notes'}
              </Button>
            </div>
            
            <Card className="border-border bg-transparent shadow-none">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl" aria-hidden="true">
                    {SelectedCategoryIcon ? (
                      <SelectedCategoryIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                    ) : null}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {categoryConfig[selectedArticle.category].title}
                  </span>
                </div>
                <CardTitle className="text-xl md:text-2xl">{isEnglish ? selectedArticle.titleEn : selectedArticle.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="devnotes-content prose prose-sm md:prose-lg max-w-none text-white dark:prose-invert
                    prose-headings:font-bold prose-headings:text-white
                    prose-h1:text-3xl prose-h1:mb-6 prose-h1:text-white
                    prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-primary
                    prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-white
                    prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2 prose-h4:text-white
                    prose-p:my-3 prose-p:leading-relaxed prose-p:text-white
                    prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline
                    prose-strong:text-primary
                    prose-code:bg-secondary prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-white
                    prose-pre:bg-slate-950 prose-pre:text-white prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-4
                    prose-li:my-0.5 prose-li:list-disc prose-li:ml-6 prose-li:text-white
                    prose-ul:my-3 prose-ul:list-disc prose-ul:pl-6
                    prose-ol:my-3 prose-ol:list-decimal prose-ol:pl-6
                    prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-white
                    prose-table:my-6 prose-table:w-full prose-table:border-collapse
                    prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-700 prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:text-white
                    prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-700 prose-td:p-3 prose-td:text-white
                    prose-img:rounded-lg prose-img:my-6
                    [&_ul]:my-3 [&_ul]:space-y-0
                    [&_li]:my-0.5 [&_li]:leading-relaxed">
                  {(isEnglish ? selectedArticle.contentEn : selectedArticle.content) ? (
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(renderArticleContent(isEnglish ? selectedArticle.contentEn : selectedArticle.content)) }} />
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            <section className="mb-12 border-y border-border py-6" aria-labelledby="featured-notes-title">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 id="featured-notes-title" className="text-xl font-semibold text-foreground">
                  {isEnglish ? "Browse the standalone notes" : "Lire les notes en page dédiée"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isEnglish ? "Stable URLs with the full article and related work." : "Des URLs stables avec l’article complet et les réalisations liées."}
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {articlePageDefinitions.map((definition) => (
                  <Link
                    key={definition.slug}
                    to={`/notes/${definition.slug}`}
                    className="group rounded-md border border-border bg-card/20 p-4 transition-colors hover:border-primary/70"
                  >
                    <span className="block text-sm font-semibold leading-6 text-foreground group-hover:text-primary">
                      {isEnglish ? definition.title.en : definition.title.fr}
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                      {isEnglish ? definition.description.en : definition.description.fr}
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Category Buttons */}
            <div className="w-full flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 mb-12 px-2">
              {Object.entries(categoryConfig).map(([key, config]) => (
                <Button
                  key={key}
                  onClick={() => void handleCategoryClick(key as SelectableCategory)}
                  variant={selectedCategory === key ? "default" : "outline"}
                  className={`w-full sm:w-auto text-sm md:text-base lg:text-lg px-4 md:px-5 lg:px-6 py-4 md:py-4 lg:py-5 transition-all ${
                    selectedCategory === key 
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border text-foreground hover:border-primary hover:text-primary'
                  }`}
                >
                  <config.icon className="mr-2 h-5 w-5" aria-hidden="true" />
                  <span>{config.title}</span>
                </Button>
              ))}
            </div>

            {/* Articles Grid */}
            {selectedCategory && isLoading && (
              <p className="text-center text-sm text-muted-foreground" aria-live="polite">{isEnglish ? 'Loading articles…' : 'Chargement des articles…'}</p>
            )}
            {selectedCategory && !isLoading && loadError && (
              <div className="mx-auto flex max-w-xl flex-col items-center gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-6 text-center" role="alert">
                <p className="text-sm text-foreground">
                  {isEnglish ? 'The articles could not be loaded.' : 'Les articles n’ont pas pu être chargés.'}
                </p>
                <Button type="button" variant="outline" onClick={handleRetry}>
                  {isEnglish ? 'Retry' : 'Réessayer'}
                </Button>
              </div>
            )}
            {selectedCategory && !isLoading && !loadError && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-in fade-in duration-500">
                {filteredArticles.map((article) => (
                  <Card 
                    key={article.id}
                    className="w-full border-border bg-transparent shadow-none transition-colors duration-200 hover:border-primary/60"
                  >
                    <CardHeader>
                      <CardTitle className="text-base md:text-lg leading-tight">
                        {isEnglish ? article.titleEn : article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {getArticlePageDefinitionById(article.id) ? (
                        <Button asChild variant="link" className="px-0">
                          <Link to={`/notes/${getArticlePageDefinitionById(article.id)?.slug}`}>
                            {isEnglish ? 'Open standalone page' : "Ouvrir la page dédiée"}
                            <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                          </Link>
                        </Button>
                      ) : (
                        <Button variant="link" className="px-0" onClick={() => handleArticleClick(article)}>
                          {isEnglish ? 'Read article' : "Lire l'article"}
                          <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default DevNotes;
