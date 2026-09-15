import { useEffect, useMemo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import { getProjectPagePath } from "@/data/site-pages";
import { getArticlePage } from "@/data/articles/registry";
import { estimateReadingMinutes } from "@/lib/article-content";
import { SITE_ORIGIN, useLanguage, useRouteMetadata, type PageMetadata } from "@/lib/i18n";
import RenderedArticleContent from "@/components/RenderedArticleContent";
import "./Article.css";

const categoryLabels: Record<string, { fr: string; en: string }> = {
  culture: { fr: "Culture & méthodes", en: "Culture & methods" },
  devops: { fr: "CI/CD & DevOps", en: "CI/CD & DevOps" },
  tools: { fr: "Outils & productivité", en: "Tools & productivity" },
  architecture: { fr: "Architecture", en: "Architecture" },
  freelance: { fr: "Gestion de projet & freelance", en: "Project management & freelance" },
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

  return {
    fr: {
      title: `${entry.definition.title.fr} — Dev Notes | Bastien Lopez`,
      description: entry.definition.description.fr,
      path: `/notes/${entry.definition.slug}`,
      robots: "index, follow",
    },
    en: {
      title: `${entry.definition.title.en} — Dev Notes | Bastien Lopez`,
      description: entry.definition.description.en,
      path: `/notes/${entry.definition.slug}`,
      robots: "index, follow",
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

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${url}#article`,
        url,
        headline: title,
        description,
        articleSection: entry.article.category,
        inLanguage: language,
        author: { "@id": `${SITE_ORIGIN}/#person` },
        publisher: { "@id": `${SITE_ORIGIN}/#person` },
        mainEntityOfPage: { "@id": `${url}#webpage` },
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
                aria-label={isEnglish ? "Back to Dev Notes" : "Retour aux Dev Notes"}
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

            <RenderedArticleContent
              className="devnotes-article-content prose prose-sm max-w-none md:prose-lg"
              content={content}
            />

            {entry.definition.relatedProjectSlugs.length > 0 ? (
              <section className="devnotes-related-work" aria-labelledby="article-related-work-title">
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
                    return <Link key={projectSlug} to={projectPath} className="devnotes-related-link">
                      <span>{projectSlug.replaceAll("-", " ")}</span>
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
