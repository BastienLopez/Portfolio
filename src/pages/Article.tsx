import { useEffect, useMemo } from "react";
import DOMPurify from "dompurify";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFound from "@/pages/NotFound";
import { Button } from "@/components/ui/button";
import { getProjectPagePath } from "@/data/site-pages";
import { getArticlePage } from "@/data/articles/registry";
import { renderArticleContent } from "@/lib/article-content";
import { SITE_ORIGIN, useLanguage, useRouteMetadata, type PageMetadata } from "@/lib/i18n";

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

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <a href="#main-content" className="skip-link">
        {isEnglish ? "Skip to main content" : "Aller au contenu principal"}
      </a>
      <Navbar />
      <main id="main-content">
        <script type="application/ld+json">
          {JSON.stringify(articleSchema(entry, isEnglish))}
        </script>
        <article className="section-even px-4 py-20 md:py-28">
          <div className="mx-auto w-full max-w-5xl">
            <nav aria-label={isEnglish ? "Breadcrumb" : "Fil d’Ariane"} className="mb-10 text-sm text-muted-foreground">
              <Link to="/" className="transition-colors hover:text-primary">Bastien Lopez</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <Link to="/#devnotes" className="transition-colors hover:text-primary">Dev Notes</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span className="text-foreground/80">{title}</span>
            </nav>

            <header className="border-b border-border pb-10">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">{category}</p>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">{title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground/85">{description}</p>
            </header>

            <div
              className="devnotes-content prose prose-sm mt-10 max-w-none text-foreground dark:prose-invert md:prose-lg prose-headings:font-bold prose-headings:text-foreground prose-h2:text-2xl prose-h2:text-primary prose-h3:text-xl prose-h3:text-foreground prose-p:text-foreground/85 prose-strong:text-primary prose-a:text-primary prose-code:bg-secondary prose-code:text-foreground prose-pre:bg-slate-950 prose-pre:text-white prose-li:text-foreground/85"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(renderArticleContent(content)) }}
            />

            {entry.definition.relatedProjectSlugs.length > 0 ? (
              <section className="mt-12 border-y border-border py-7" aria-labelledby="article-related-work-title">
                <h2 id="article-related-work-title" className="text-xl font-semibold">
                  {isEnglish ? "Related work" : "Réalisations liées"}
                </h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {entry.definition.relatedProjectSlugs.map((projectSlug) => {
                    const projectPath = getProjectPagePath(projectSlug);
                    if (!projectPath) return null;
                    return (
                      <Button key={projectSlug} asChild variant="outline" className="border-border hover:border-primary hover:text-primary">
                        <Link to={projectPath}>
                          {projectSlug.replaceAll("-", " ")}
                          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </section>
            ) : null}

            <div className="mt-10 flex flex-wrap gap-3 border-t border-border pt-7">
              <Button asChild variant="outline" className="border-border hover:border-primary hover:text-primary">
                <Link to="/#devnotes">
                  <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                  {isEnglish ? "Back to Dev Notes" : "Retour aux Dev Notes"}
                </Link>
              </Button>
              <Button asChild className="bg-cta text-cta-foreground hover:bg-cta/90">
                <Link to="/freelance#contact">
                  {isEnglish ? "Discuss a project" : "Parler d’un projet"}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Article;
