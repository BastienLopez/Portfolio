import { lazy, Suspense, useEffect, useMemo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import {
  getProjectPage,
  getProjectPagePath,
  getPublicServicePagePath,
  getServicePage,
} from "@/data/site-pages";
import { getArticlePage } from "@/data/articles/registry";
import { estimateReadingMinutes } from "@/lib/article-content";
import { SITE_ORIGIN, useLanguage, useRouteMetadata, type PageMetadata } from "@/lib/i18n";
import "./Article.css";

const RenderedArticleContent = lazy(() => import("@/components/RenderedArticleContent"));

const categoryLabels: Record<string, { fr: string; en: string }> = {
  culture: { fr: "Culture & méthodes", en: "Culture & methods" },
  devops: { fr: "CI/CD & DevOps", en: "CI/CD & DevOps" },
  tools: { fr: "Outils & productivité", en: "Tools & productivity" },
  architecture: { fr: "Architecture", en: "Architecture" },
  freelance: { fr: "Gestion de projet & freelance", en: "Project management & freelance" },
};

const categoryKeywords: Record<string, { fr: string; en: string }> = {
  culture: { fr: "culture technique, méthodes de développement", en: "engineering culture, development methods" },
  devops: { fr: "CI/CD, DevOps, déploiement et observabilité", en: "CI/CD, DevOps, deployment and observability" },
  tools: { fr: "outils développeur, productivité et sécurité", en: "developer tools, productivity and security" },
  architecture: { fr: "architecture logicielle et bonnes pratiques", en: "software architecture and best practices" },
  freelance: { fr: "gestion de projet et développement freelance", en: "project management and freelance development" },
};

const metadataFor = (
  entry: ReturnType<typeof getArticlePage>,
  slug: string | undefined,
): Record<"fr" | "en", PageMetadata> => {
  if (!entry) {
    return {
      fr: {
        title: "Page introuvable — Bastien Lopez",
        description: "La page demandée n’existe pas dans le portfolio de Bastien Lopez.",
        path: `/notes/${slug ?? ""}`,
        robots: "noindex, follow",
      },
      en: {
        title: "Page not found — Bastien Lopez",
        description: "The requested page does not exist in Bastien Lopez’s portfolio.",
        path: `/notes/${slug ?? ""}`,
        robots: "noindex, follow",
      },
    };
  }

  const section = categoryLabels[entry.article.category]?.fr ?? entry.article.category;
  const sectionEn = categoryLabels[entry.article.category]?.en ?? entry.article.category;
  const keywords = categoryKeywords[entry.article.category];

  return {
    fr: {
      title: `${entry.definition.title.fr} — Dev Notes | Bastien Lopez`,
      description: entry.definition.description.fr,
      path: `/notes/${entry.definition.slug}`,
      robots: "index, follow",
      keywords: keywords?.fr,
      section,
    },
    en: {
      title: `${entry.definition.title.en} — Dev Notes | Bastien Lopez`,
      description: entry.definition.description.en,
      path: `/notes/${entry.definition.slug}`,
      robots: "index, follow",
      keywords: keywords?.en,
      section: sectionEn,
    },
  };
};

const articleSchema = (
  entry: NonNullable<ReturnType<typeof getArticlePage>>,
  isEnglish: boolean,
) => {
  const url = `${SITE_ORIGIN}/notes/${entry.definition.slug}`;
  const title = isEnglish ? entry.translation.title : entry.article.title;
  const description = isEnglish ? entry.definition.description.en : entry.definition.description.fr;
  const language = isEnglish ? "en-US" : "fr-FR";
  const category = categoryLabels[entry.article.category]?.[isEnglish ? "en" : "fr"] ?? entry.article.category;
  const keywords = categoryKeywords[entry.article.category]?.[isEnglish ? "en" : "fr"] ?? category;
  const relatedService = entry.definition.relatedServiceSlug
    ? getServicePage(entry.definition.relatedServiceSlug)
    : undefined;
  const relatedServicePath = relatedService
    ? getPublicServicePagePath(relatedService.slug)
    : undefined;
  const content = isEnglish ? entry.translation.content : entry.article.content;
  const wordCount = content
    .replace(/<[^>]*>/g, " ")
    .replace(/[#*_\u0060>-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${url}#article`,
        url,
        headline: title,
        description,
        articleSection: category,
        keywords,
        wordCount,
        timeRequired: `PT${estimateReadingMinutes(content)}M`,
        isAccessibleForFree: true,
        inLanguage: language,
        author: { "@id": `${SITE_ORIGIN}/#person` },
        publisher: { "@id": `${SITE_ORIGIN}/#person` },
        mainEntityOfPage: { "@id": `${url}#webpage` },
        ...(relatedServicePath
          ? { isRelatedTo: { "@id": `${SITE_ORIGIN}${relatedServicePath}#service` } }
          : {}),
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: language,
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        about: { "@id": `${SITE_ORIGIN}/#person` },
        mainEntity: { "@id": `${url}#article` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Bastien Lopez", item: `${SITE_ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: "Dev Notes", item: `${SITE_ORIGIN}/#devnotes` },
          { "@type": "ListItem", position: 3, name: title, item: url },
        ],
      },
    ],
  };
};

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isEnglish } = useLanguage();
  const entry = useMemo(() => getArticlePage(slug), [slug]);
  const metadata = useMemo(() => metadataFor(entry, slug), [entry, slug]);
  useRouteMetadata(metadata);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (!entry) return <NotFound />;

  const title = isEnglish ? entry.translation.title : entry.article.title;
  const description = isEnglish ? entry.definition.description.en : entry.definition.description.fr;
  const category = categoryLabels[entry.article.category]?.[isEnglish ? "en" : "fr"] ?? entry.article.category;
  const content = isEnglish ? entry.translation.content : entry.article.content;
  const readingMinutes = estimateReadingMinutes(content);
  const relatedService = entry.definition.relatedServiceSlug
    ? getServicePage(entry.definition.relatedServiceSlug)
    : undefined;

  return (
    <div className="devnotes-article-page min-h-screen w-full text-foreground">
      <a href="#main-content" className="skip-link">
        {isEnglish ? "Skip to main content" : "Aller au contenu principal"}
      </a>
      <main id="main-content">
        <script type="application/ld+json">
          {JSON.stringify(articleSchema(entry, isEnglish))}
        </script>
        <article className="devnotes-article-section">
          <div className="devnotes-article-shell">
            <nav aria-label={isEnglish ? "Article navigation" : "Navigation de l’article"}>
              <Link
                to="/#devnotes"
                aria-label={isEnglish ? "Back to articles" : "Retour aux articles"}
                className="devnotes-article-back"
              >
                <ArrowLeft aria-hidden="true" />
                <span>{isEnglish ? "Back to articles" : "Retour aux articles"}</span>
              </Link>
            </nav>

            <header className="devnotes-article-header">
              <p className="devnotes-article-eyebrow">
                <span className="devnotes-article-eyebrow-line" aria-hidden="true" />
                <span>DEV NOTE</span>
              </p>
              <h1>{title}</h1>
              <span className="devnotes-article-title-rule" aria-hidden="true" />
              <p className="devnotes-article-description">{description}</p>
              <div className="devnotes-article-meta" aria-label={isEnglish ? "Article metadata" : "Métadonnées de l’article"}>
                <span>{category}</span>
                <span className="devnotes-article-meta-separator" aria-hidden="true" />
                <span>
                  {isEnglish ? `READING TIME: ${readingMinutes} MIN` : `TEMPS DE LECTURE : ${readingMinutes} MIN`}
                </span>
              </div>
            </header>

              <Suspense
                fallback={null}
              >
                <RenderedArticleContent
                  className="devnotes-article-content prose prose-sm max-w-none md:prose-lg"
                  content={content}
                />
              </Suspense>

            {relatedService ? (
              <section className="devnotes-related-work" aria-labelledby="article-related-service-title" data-editorial-service-link>
                <div className="devnotes-related-heading">
                  <h2 id="article-related-service-title">
                    <span className="devnotes-related-heading-line" aria-hidden="true" />
                    {isEnglish ? "Related freelance service" : "Service freelance associé"}
                  </h2>
                </div>
                <Link
                  to={getPublicServicePagePath(relatedService.slug)}
                  className="devnotes-related-link"
                >
                  <span>
                    <span className="block font-semibold">{isEnglish ? relatedService.title.en : relatedService.title.fr}</span>
                    <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                      {isEnglish ? relatedService.description.en : relatedService.description.fr}
                    </span>
                  </span>
                  <ArrowRight aria-hidden="true" />
                </Link>
              </section>
            ) : null}

            {entry.definition.relatedProjectSlugs.length > 0 ? (
              <section className="devnotes-related-work" aria-labelledby="article-related-work-title" data-editorial-case-links>
                <div className="devnotes-related-heading">
                  <h2 id="article-related-work-title">
                    <span className="devnotes-related-heading-line" aria-hidden="true" />
                    {isEnglish ? "Related work" : "Réalisations liées"}
                  </h2>
                  <Link to="/#projects" className="devnotes-related-all-link">
                    {isEnglish ? "View all projects" : "Voir tous les projets"}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
                <div className="devnotes-related-links">
                  {entry.definition.relatedProjectSlugs.map((projectSlug) => {
                    const projectPath = getProjectPagePath(projectSlug);
                    if (!projectPath) return null;
                    const project = getProjectPage(projectSlug);
                    const projectTitle = project
                      ? (isEnglish ? project.title.en : project.title.fr)
                      : projectSlug.replaceAll("-", " ");
                    return <Link key={projectSlug} to={projectPath} className="devnotes-related-link">
                      <span>{projectTitle}</span>
                      <ArrowRight aria-hidden="true" />
                    </Link>;
                  })}
                </div>
              </section>
            ) : null}

            <div className="devnotes-article-footer">
              <p>{isEnglish ? "Want to discuss a related topic?" : "Envie d’échanger sur un sujet proche ?"}</p>
              <Link to="/freelance#contact" className="devnotes-article-footer-link">
                {isEnglish ? "Discuss a project" : "Parler d’un projet"}
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default Article;
