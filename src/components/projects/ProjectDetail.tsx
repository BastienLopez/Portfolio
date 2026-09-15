import type { MouseEvent, RefObject } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project, ProjectGalleryItem } from "@/data/projects";
import { getImageManifestEntry, getImageSrcSet } from "@/lib/image-variants";
import { ProjectNavigation } from "./ProjectNavigation";

type ProjectDetailProps = {
  project: Project;
  techHighlights: string[];
  categoryLabel: string;
  galleryImages: ProjectGalleryItem[];
  isEnglish: boolean;
  isErpCaseStudy: boolean;
  intro?: string;
  resolveImage: (image?: string | null) => string;
  prepareDetailedContent: (content: string) => string;
  onBack: () => void;
  onOpenGallery: (index: number) => void;
  detailRef: RefObject<HTMLDivElement | null>;
};

const premiumHeroImages: Record<string, string> = {
  "wallet-provider": "img_projects/wallet_provider-phones.png",
  "altme-wallet": "img_projects/Altme_Discover.png",
  "altme-documentation": "img_projects/altme_doc.png",
  "teams-bot-mastra": "img_projects/bot-conversation-ia.png",
  "n8n-video-derush": "img_projects/n8n_derush.png",
  "n8n-reporting": "img_projects/n8n_reporting.png",
  "seo-geo-optimization": "img_projects/seo_geo.png",
};

export const ProjectDetail = ({
  project,
  techHighlights,
  categoryLabel,
  galleryImages,
  isEnglish,
  isErpCaseStudy,
  intro,
  resolveImage,
  prepareDetailedContent,
  onBack,
  onOpenGallery,
  detailRef,
}: ProjectDetailProps) => {
  const detailedContentHtml = project.detailedContent
    ? prepareDetailedContent(project.detailedContent)
    : "";
  const heroImage = premiumHeroImages[project.id] ?? project.image;

  const handleDetailedContentClick = (event: MouseEvent<HTMLDivElement>) => {
    const trigger = (event.target as HTMLElement).closest<HTMLButtonElement>(
      "[data-gallery-index]",
    );
    const index = Number(trigger?.dataset.galleryIndex);

    if (trigger && Number.isInteger(index) && galleryImages[index]) {
      onOpenGallery(index);
    }
  };

  return (
    <div
      ref={detailRef}
      tabIndex={-1}
      data-project-detail
      className="project-detail-shell scroll-mt-28"
    >
      <ProjectNavigation isEnglish={isEnglish} onBack={onBack} />

      <article className="project-detail-frame">
        <header className="project-detail-hero" data-project-detail-hero>
          <div className="project-detail-hero-copy">
            <p className="project-detail-eyebrow">
              <span className="project-detail-eyebrow-index">01</span>
              <span className="project-detail-eyebrow-line" aria-hidden="true" />
              <span>{categoryLabel}</span>
            </p>
            <h1 id={`${project.id}-title`}>{project.title}</h1>
            <p className="project-detail-summary">{project.description}</p>
            {intro ? <p className="project-detail-intro">{intro}</p> : null}
          </div>

          {!isErpCaseStudy && heroImage ? (
            <div className="project-detail-hero-media">
              <div className="project-detail-hero-glow" aria-hidden="true" />
              <img
                src={resolveImage(heroImage)}
                srcSet={getImageSrcSet(heroImage, resolveImage)}
                alt={project.title}
                loading="eager"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 55vw"
                width={getImageManifestEntry(heroImage)?.width}
                height={getImageManifestEntry(heroImage)?.height}
              />
            </div>
          ) : null}

          {techHighlights.length > 0 ? (
            <div
              className="project-detail-stack"
              data-project-detail-stack
              aria-label={isEnglish ? "Project technologies" : "Technologies du projet"}
            >
              {techHighlights.map((tech) => (
                <span key={tech} title={tech}>
                  {tech}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        {!isErpCaseStudy && galleryImages.length > 0 ? (
          <section
            className="project-detail-gallery"
            aria-labelledby={`${project.id}-gallery-title`}
          >
            <div className="project-detail-section-heading">
              <span className="project-detail-section-index">02</span>
              <span className="project-detail-section-line" aria-hidden="true" />
              <h2 id={`${project.id}-gallery-title`}>
                {isEnglish ? "Project captures" : "Captures du projet"}
              </h2>
            </div>
            <div className="project-detail-gallery-grid">
              {galleryImages.map((image, index) => (
                <button
                  key={`${image.src}-${image.title ?? index}`}
                  type="button"
                  onClick={() => onOpenGallery(index)}
                  className="group project-detail-gallery-item"
                  aria-label={`${isEnglish ? "Open" : "Ouvrir"} ${isEnglish ? "screenshot" : "la capture"} ${index + 1}`}
                >
                  <img
                    src={resolveImage(image.src)}
                    srcSet={getImageSrcSet(image.src, resolveImage)}
                    alt={
                      image.alt ??
                      `${project.title} — ${isEnglish ? "screenshot" : "capture"} ${index + 1}`
                    }
                    loading="lazy"
                    decoding="async"
                    width={getImageManifestEntry(image.src)?.width}
                    height={getImageManifestEntry(image.src)?.height}
                  />
                  <span>
                    {image.title ??
                      (isEnglish ? "Open full screen" : "Agrandir la capture")}
                  </span>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        <section
          className={`project-detail-content${galleryImages.length > 0 && !isErpCaseStudy ? " project-detail-content-with-gallery" : ""}`}
          aria-label={isEnglish ? "Project information" : "Informations du projet"}
          onClick={handleDetailedContentClick}
        >
          {detailedContentHtml ? (
            <div dangerouslySetInnerHTML={{ __html: detailedContentHtml }} />
          ) : (
            <div className="project-detail-empty">
              {isEnglish
                ? "Project details are being prepared."
                : "Les détails du projet sont en préparation."}
            </div>
          )}
        </section>

        <footer className="project-detail-actions">
          <p>
            {isEnglish
              ? "Want to discuss a similar product or technical challenge?"
              : "Un projet similaire ou un sujet technique à cadrer ?"}
          </p>
          <div>
            {project.github ? (
              <Button
                asChild
                size="default"
                variant="outline"
                className="border-border text-foreground hover:border-primary hover:text-primary"
              >
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                  {isEnglish ? "Source code" : "Code source"}
                </a>
              </Button>
            ) : null}
            {project.demo ? (
              <Button
                asChild
                size="default"
                className="bg-primary text-primary-foreground shadow-none hover:bg-primary/90"
              >
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                  {isEnglish ? "View project" : "Voir le projet"}
                </a>
              </Button>
            ) : null}
          </div>
        </footer>
      </article>
    </div>
  );
};
