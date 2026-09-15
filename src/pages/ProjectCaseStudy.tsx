import { useEffect, useMemo, useRef, useState } from "react";
import DOMPurify from "dompurify";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFound from "@/pages/NotFound";
import { Button } from "@/components/ui/button";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { allProjects, type Project, type ProjectGalleryItem } from "@/data/projects";
import {
  getProjectPage,
  type ProjectPageDefinition,
} from "@/data/site-pages";
import { getEnglishDetailedContent } from "@/data/projects/englishDetails";
import { decorateDetailedContent, renderProjectMarkdown } from "@/lib/project-content";
import { SITE_ORIGIN, useLanguage, useRouteMetadata, type PageMetadata } from "@/lib/i18n";

type EnglishProjectCopy = Pick<Project, "title" | "description">;

const englishProjectCopy: Record<string, EnglishProjectCopy> = {
  "wallet-provider": {
    title: "Altme Wallet Provider",
    description:
      "Contribution to a digital-identity wallet product built around verifiable credentials and European interoperability.",
  },
  "n8n-reporting": {
    title: "n8n Automations — Reporting",
    description:
      "An n8n workflow that turns SocialPilot PDF exports into structured client community-management reports.",
  },
  "n8n-video-derush": {
    title: "n8n Automations — Video derush",
    description:
      "An n8n pipeline that turns raw footage into selected, transcribed and edit-ready sequences for Instagram and TikTok.",
  },
  "altme-wallet": {
    title: "Altme Wallet Platform",
    description:
      "Development and improvement of wallet-platform building blocks combining credentials, NFTs and cryptocurrency data.",
  },
};

const projectCategoryLabels: Record<Project["category"], { fr: string; en: string }> = {
  emploi: { fr: "Projet professionnel", en: "Professional project" },
  freelance: { fr: "Mission freelance", en: "Freelance project" },
  opensource: { fr: "Projet open source", en: "Open-source project" },
  gaming: { fr: "Projet gaming / mobile", en: "Gaming / mobile project" },
};

const resolveImage = (image?: string | null) => {
  if (!image) return "";
  if (image.startsWith("http") || image.startsWith("data:")) return image;
  return `${import.meta.env.BASE_URL}${image.replace(/^\/+/, "")}`;
};

const prepareDetailedContent = (content: string) => {
  const renderedContent = content.trimStart().startsWith("# ")
    ? renderProjectMarkdown(content)
    : content;

  return DOMPurify.sanitize(decorateDetailedContent(renderedContent));
};

const localizeProject = (project: Project, isEnglish: boolean) => {
  if (!isEnglish) return project;

  const englishDetails = getEnglishDetailedContent(project.id);
  return {
    ...project,
    ...(englishProjectCopy[project.id] ?? {}),
    ...(englishDetails ? { detailedContent: englishDetails } : {}),
  };
};

const getGalleryImages = (project: Project): ProjectGalleryItem[] =>
  project.gallery
    ?.map((image) => (typeof image === "string" ? { src: image } : image))
    .filter((image) => image.title || image.src !== project.image) ?? [];

const routeMetadata = (
  definition: ProjectPageDefinition | undefined,
  slug: string | undefined,
): Record<"fr" | "en", PageMetadata> => {
  if (!definition) {
    return {
      fr: {
        title: "Page introuvable — Bastien Lopez",
        description: "La page demandée n’existe pas dans le portfolio de Bastien Lopez.",
        path: `/projets/${slug ?? ""}`,
        robots: "noindex, follow",
      },
      en: {
        title: "Page not found — Bastien Lopez",
        description: "The requested page does not exist in Bastien Lopez’s portfolio.",
        path: `/projets/${slug ?? ""}`,
        robots: "noindex, follow",
      },
    };
  }

  return {
    fr: {
      title: `${definition.title.fr} — Étude de cas | Bastien Lopez`,
      description: definition.description.fr,
      path: `/projets/${definition.slug}`,
      robots: "index, follow",
    },
    en: {
      title: `${definition.title.en} — Case study | Bastien Lopez`,
      description: definition.description.en,
      path: `/projets/${definition.slug}`,
      robots: "index, follow",
    },
  };
};

const projectSchema = (
  definition: ProjectPageDefinition,
  projects: Project[],
  isEnglish: boolean,
) => {
  const url = `${SITE_ORIGIN}/projets/${definition.slug}`;
  const language = isEnglish ? "en-US" : "fr-FR";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${isEnglish ? definition.title.en : definition.title.fr} — ${isEnglish ? "Case study" : "Étude de cas"}`,
        description: isEnglish ? definition.description.en : definition.description.fr,
        inLanguage: language,
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        about: { "@id": `${SITE_ORIGIN}/#person` },
        mainEntity: { "@id": `${url}#case-study` },
      },
      {
        "@type": "CreativeWork",
        "@id": `${url}#case-study`,
        url,
        name: isEnglish ? definition.title.en : definition.title.fr,
        description: isEnglish ? definition.description.en : definition.description.fr,
        author: { "@id": `${SITE_ORIGIN}/#person` },
        about: projects.map((project) => project.title),
        keywords: Array.from(new Set(projects.flatMap((project) => project.tech))),
        inLanguage: language,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Bastien Lopez", item: `${SITE_ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: isEnglish ? "Projects" : "Projets", item: `${SITE_ORIGIN}/#projects` },
          { "@type": "ListItem", position: 3, name: isEnglish ? definition.title.en : definition.title.fr, item: url },
        ],
      },
    ],
  };
};

const ProjectCaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isEnglish } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const returnToFreelance = new URLSearchParams(location.search).get("from") === "freelance";
  const projectsReturnPath = returnToFreelance ? "/freelance#projects" : "/#projects";
  const definition = getProjectPage(slug);
  const metadata = useMemo(() => routeMetadata(definition, slug), [definition, slug]);
  useRouteMetadata(metadata);

  const projects = useMemo(
    () =>
      definition?.projectIds
        .map((projectId) => allProjects.find((project) => project.id === projectId))
        .filter((project): project is Project => Boolean(project)) ?? [],
    [definition],
  );
  const localizedProjects = useMemo(
    () => projects.map((project) => localizeProject(project, isEnglish)),
    [isEnglish, projects],
  );
  const [activeGallery, setActiveGallery] = useState<{ projectId: string; index: number } | null>(null);
  const galleryViewerRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (!definition || projects.length === 0) {
    return <NotFound />;
  }

  const intro = isEnglish ? definition.intro.en : definition.intro.fr;
  const activeProject = activeGallery
    ? localizedProjects.find((project) => project.id === activeGallery.projectId)
    : undefined;
  const activeGalleryImages = activeProject ? getGalleryImages(activeProject) : [];

  const showPreviousImage = () => {
    setActiveGallery((current) => {
      if (!current || activeGalleryImages.length === 0) return current;
      return {
        ...current,
        index: (current.index - 1 + activeGalleryImages.length) % activeGalleryImages.length,
      };
    });
  };

  const showNextImage = () => {
    setActiveGallery((current) => {
      if (!current || activeGalleryImages.length === 0) return current;
      return { ...current, index: (current.index + 1) % activeGalleryImages.length };
    });
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <a href="#main-content" className="skip-link">
        {isEnglish ? "Skip to main content" : "Aller au contenu principal"}
      </a>
      <Navbar />
      <main id="main-content">
        <script type="application/ld+json">
          {JSON.stringify(projectSchema(definition, localizedProjects, isEnglish))}
        </script>
        <article className="section-even px-4 py-16 md:py-20">
          <div className="mx-auto w-full max-w-7xl">
            <div className="space-y-20 md:space-y-28">
              {localizedProjects.map((project) => {
                const galleryImages = getGalleryImages(project);
                const techHighlights = project.tech;

                return (
                  <section key={project.id} aria-labelledby={`${project.id}-title`}>
                    {localizedProjects.length > 1 ? (
                      <h2 id={`${project.id}-title`} className="sr-only">{project.title}</h2>
                    ) : null}
                    <ProjectDetail
                      project={project}
                      techHighlights={techHighlights}
                      categoryLabel={projectCategoryLabels[project.category][isEnglish ? "en" : "fr"]}
                      galleryImages={galleryImages}
                      isEnglish={isEnglish}
                      isErpCaseStudy={false}
                      intro={intro}
                      resolveImage={resolveImage}
                      prepareDetailedContent={prepareDetailedContent}
                      onBack={() => navigate(projectsReturnPath)}
                      onOpenGallery={(index) => setActiveGallery({ projectId: project.id, index })}
                      detailRef={detailRef}
                    />
                    <div className="mx-auto mt-5 flex w-full max-w-5xl flex-wrap items-center gap-3 border-t border-border pt-5" data-contextual-cta>
                      <Button asChild className="bg-cta text-cta-foreground hover:bg-cta/90">
                        <Link to="/freelance#contact">
                          {isEnglish ? definition.cta.en : definition.cta.fr}
                          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                        </Link>
                      </Button>
                      {project.demo ? (
                        <Button asChild variant="outline" className="border-border text-foreground hover:border-primary hover:text-primary">
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                            {isEnglish ? "View production link" : "Voir le lien en production"}
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </section>
                );
              })}
            </div>

            <div className="mx-auto mt-16 flex max-w-5xl flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
              <p className="text-sm text-muted-foreground">
                {isEnglish
                  ? "Based in Reims, I work remotely with teams across France."
                  : "Basé à Reims, j’interviens à distance avec des équipes partout en France."}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="border-border hover:border-primary hover:text-primary"
                >
                  <Link to={projectsReturnPath} data-back-to-projects>
                    <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                    {isEnglish ? "Back to projects" : "Retour aux projets"}
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-border hover:border-primary hover:text-primary">
                  <Link to="/freelance">{isEnglish ? "See freelance services" : "Voir les services freelance"}</Link>
                </Button>
              </div>
            </div>
          </div>
        </article>
      </main>
      {activeGallery && activeProject && activeGalleryImages[activeGallery.index] ? (
        <ProjectGallery
          galleryImages={activeGalleryImages}
          activeGalleryIndex={activeGallery.index}
          projectTitle={activeProject.title}
          isEnglish={isEnglish}
          galleryViewerRef={galleryViewerRef}
          resolveImage={resolveImage}
          onClose={() => setActiveGallery(null)}
          onPrevious={showPreviousImage}
          onNext={showNextImage}
        />
      ) : null}
      <Footer />
    </div>
  );
};

export default ProjectCaseStudy;
