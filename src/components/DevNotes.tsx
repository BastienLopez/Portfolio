import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Briefcase,
  Puzzle,
  Settings2,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { Button } from './ui/button';
import type { Article, ArticleCategory, ArticleTranslation } from '../data/articles';
import { articlePageDefinitions, getArticlePageDefinitionById } from '../data/articles/pages';
import { estimateReadingMinutes } from '@/lib/article-content';
import { useLanguage } from '@/lib/i18n';
import { Link, useNavigate } from 'react-router-dom';
import RenderedArticleContent from '@/components/RenderedArticleContent';
import './DevNotes.css';
import '../pages/Article.css';

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
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<SelectableCategory | null>('freelance');
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

  const loadArticles = useCallback(async (category: SelectableCategory) => {
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
  }, []);

  useEffect(() => {
    void loadArticles('freelance');
  }, [loadArticles]);

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

  const handleStandaloneNavigate = (slug: string) => {
    navigate(`/notes/${slug}`);
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

  return (
    <section
      id="devnotes"
      aria-labelledby={selectedArticle ? undefined : 'devnotes-title'}
      aria-label={selectedArticle ? (isEnglish ? 'Dev Note' : 'Dev Note') : undefined}
      className={`devnotes-section px-4 w-full overflow-x-hidden section-even ${selectedArticle ? 'devnotes-inline-section' : 'py-20'}`}
    >
      <div className="container mx-auto max-w-6xl w-full">
        {!selectedArticle && (
          <header className="devnotes-hero text-center mb-12 w-full">
            <div className="devnotes-eyebrow" aria-hidden="true">
              <span className="devnotes-eyebrow-line" />
              <span>NOTES</span>
              <span className="devnotes-eyebrow-line" />
            </div>
            <h2 id="devnotes-title" className="text-3xl md:text-4xl font-bold mb-4">
              {isEnglish ? 'Selected dev notes' : 'Dev Notes sélectionnées'}
            </h2>
            <p className="devnotes-hero-description text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-2 px-4">
              {isEnglish ? 'Technical notes on automation, AI, architecture and deployment, with access to all notes by topic.' : "Retours techniques autour de l'automatisation, de l'IA, de l'architecture et du déploiement, avec un accès à l'ensemble des notes par thème."}
            </p>
            <p className="devnotes-prompt text-sm text-muted-foreground font-medium">
              {isEnglish ? 'Select a topic:' : 'Sélectionnez le topic souhaité :'}
            </p>
          </header>
        )}

        {/* Article Detail View */}
        {selectedArticle ? (
          <div className="devnotes-article-shell w-full">
            <nav aria-label={isEnglish ? 'Article navigation' : 'Navigation de l’article'}>
              <Button
                data-devnotes-back
                onClick={handleBackToList}
                variant="ghost"
                className="devnotes-article-back h-auto rounded-none px-0 py-0 text-sm hover:bg-transparent"
              >
                <ArrowLeft aria-hidden="true" />
                <span>{isEnglish ? 'Back to articles' : 'Retour aux articles'}</span>
              </Button>
            </nav>

            <header className="devnotes-article-header">
              <p className="devnotes-article-eyebrow">
                <span className="devnotes-article-eyebrow-line" aria-hidden="true" />
                <span>DEV NOTE</span>
              </p>
              <h1>{isEnglish ? selectedArticle.titleEn : selectedArticle.title}</h1>
              <span className="devnotes-article-title-rule" aria-hidden="true" />
              <div className="devnotes-article-meta" aria-label={isEnglish ? 'Article metadata' : 'Métadonnées de l’article'}>
                <span>{categoryConfig[selectedArticle.category].title}</span>
                <span className="devnotes-article-meta-separator" aria-hidden="true" />
                <span>
                  {isEnglish
                    ? `READING TIME: ${estimateReadingMinutes(selectedArticle.contentEn)} MIN`
                    : `TEMPS DE LECTURE : ${estimateReadingMinutes(selectedArticle.content)} MIN`}
                </span>
              </div>
            </header>

            <RenderedArticleContent
              className="devnotes-content devnotes-article-content prose prose-sm max-w-none md:prose-lg"
              content={isEnglish ? selectedArticle.contentEn : selectedArticle.content}
            />
          </div>
        ) : (
          <>
            <section className="devnotes-featured mb-10" aria-labelledby="featured-notes-title">
              <div className="devnotes-section-heading-row">
                <div className="devnotes-section-heading">
                  <span className="devnotes-heading-line" aria-hidden="true" />
                  <h3 id="featured-notes-title">{isEnglish ? "Browse the standalone notes" : "Lire les notes en page dédiée"}</h3>
                </div>
                <p>{isEnglish ? "Stable URLs with the full article and related work." : "Des URLs stables avec l’article complet et les réalisations liées."}</p>
              </div>
              <div className="devnotes-featured-grid">
                {articlePageDefinitions.map((definition, index) => (
                  <article key={definition.slug} className="devnotes-featured-item">
                    <span className="devnotes-featured-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <div className="devnotes-featured-copy">
                      <div className="devnotes-featured-title-row">
                        <span className="devnotes-heading-line" aria-hidden="true" />
                        <h4>{isEnglish ? definition.title.en : definition.title.fr}</h4>
                      </div>
                      <p>{isEnglish ? definition.description.en : definition.description.fr}</p>
                      <Link to={`/notes/${definition.slug}`} className="devnotes-link">
                        {isEnglish ? 'Read article' : "Lire l'article"}
                        <ArrowRight aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="devnotes-explorer mb-10" aria-labelledby="topics-title">
              <div className="devnotes-eyebrow devnotes-explorer-title">
                <span className="devnotes-eyebrow-line" aria-hidden="true" />
                <span id="topics-title">{isEnglish ? 'EXPLORE BY TOPIC' : 'EXPLORER PAR SUJET'}</span>
                <span className="devnotes-eyebrow-line" aria-hidden="true" />
              </div>
              <div className="devnotes-category-grid">
              {Object.entries(categoryConfig).map(([key, config]) => (
                <Button
                  key={key}
                  type="button"
                  onClick={() => void handleCategoryClick(key as SelectableCategory)}
                  variant="outline"
                  aria-pressed={selectedCategory === key}
                  className={`devnotes-category-button ${selectedCategory === key ? 'is-active' : ''}`}
                >
                  <config.icon className="h-4 w-4" aria-hidden="true" />
                  <span>{config.title}</span>
                </Button>
              ))}
              </div>
            </section>

            {selectedCategory && isLoading && (
              <p className="devnotes-status text-sm text-muted-foreground" aria-live="polite">{isEnglish ? 'Loading articles…' : 'Chargement des articles…'}</p>
            )}
            {selectedCategory && !isLoading && loadError && (
              <div className="devnotes-status devnotes-error" role="alert">
                <p className="text-sm text-foreground">
                  {isEnglish ? 'The articles could not be loaded.' : 'Les articles n’ont pas pu être chargés.'}
                </p>
                <Button type="button" variant="outline" onClick={handleRetry}>
                  {isEnglish ? 'Retry' : 'Réessayer'}
                </Button>
              </div>
            )}
            {selectedCategory && !isLoading && !loadError && (
              <section className="devnotes-theme-section" aria-labelledby="theme-notes-title">
                <div className="devnotes-section-heading-row">
                  <div className="devnotes-section-heading">
                    <span className="devnotes-heading-line" aria-hidden="true" />
                    <h3 id="theme-notes-title">{isEnglish ? 'Notes by topic' : 'Notes par thème'}</h3>
                  </div>
                  <p>{isEnglish ? 'Advice, methods and field notes for managing projects with confidence.' : "Conseils, méthodes et retours d’expérience pour mieux gérer vos projets."}</p>
                </div>
                <div className="devnotes-theme-grid animate-in fade-in duration-500">
                  {filteredArticles.map((article) => {
                    const definition = getArticlePageDefinitionById(article.id);
                    return (
                      <article key={article.id} className="devnotes-theme-card">
                        <h4>{isEnglish ? article.titleEn : article.title}</h4>
                        {definition ? (
                          <Button type="button" variant="link" className="devnotes-link" onClick={() => handleStandaloneNavigate(definition.slug)}>
                            {isEnglish ? 'Open standalone page' : "Ouvrir la page dédiée"}
                            <ArrowRight aria-hidden="true" />
                          </Button>
                        ) : (
                          <Button type="button" variant="link" className="devnotes-link" onClick={() => handleArticleClick(article)}>
                            {isEnglish ? 'Read article' : "Lire l'article"}
                            <ArrowRight aria-hidden="true" />
                          </Button>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default DevNotes;
