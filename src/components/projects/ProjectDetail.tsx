import type { MouseEvent, RefObject } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project, ProjectGalleryItem } from "@/data/projects";
import { getImageManifestEntry, getImageSrcSet } from "@/lib/image-variants";
import { ProjectCaseStudySummary } from "./ProjectCaseStudySummary";
import { ProjectNavigation } from "./ProjectNavigation";

type ProjectDetailProps = {
  project: Project;
  techHighlights: string[];
  categoryLabel: string;
  galleryImages: ProjectGalleryItem[];
  isEnglish: boolean;
  isErpCaseStudy: boolean;
  resolveImage: (image?: string | null) => string;
  prepareDetailedContent: (content: string) => string;
  onBack: () => void;
  onOpenGallery: (index: number) => void;
  detailRef: RefObject<HTMLDivElement | null>;
};

export const ProjectDetail = ({
  project,
  techHighlights,
  categoryLabel,
  galleryImages,
  isEnglish,
  isErpCaseStudy,
  resolveImage,
  prepareDetailedContent,
  onBack,
  onOpenGallery,
  detailRef,
}: ProjectDetailProps) => {
  const detailedContentHtml = project.detailedContent
    ? prepareDetailedContent(project.detailedContent)
    : "";

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
      className="mx-auto w-full max-w-5xl scroll-mt-28"
    >
      <ProjectNavigation isEnglish={isEnglish} onBack={onBack} />

      <Card className="overflow-hidden rounded-md border border-border bg-card shadow-none">
        <CardHeader className="border-b border-border px-6 py-6 md:px-8">
          <div className="mb-3">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {categoryLabel}
            </span>
          </div>
          <CardTitle className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {project.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-8 pt-6 md:px-8 md:pt-8">
          {!isErpCaseStudy && (
            <div className="mb-6">
              <img
                src={resolveImage(project.image)}
                srcSet={getImageSrcSet(project.image, resolveImage)}
                alt={project.title}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 960px"
                width={getImageManifestEntry(project.image)?.width}
                height={getImageManifestEntry(project.image)?.height}
                className="max-h-96 w-full rounded-md border border-border bg-secondary/30 object-contain"
              />
            </div>
          )}

          {!isErpCaseStudy && galleryImages.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {isEnglish ? "Project screenshots" : "Captures du projet"}
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {galleryImages.map((image, index) => (
                  <button
                    key={`${image.src}-${image.title ?? index}`}
                    type="button"
                    onClick={() => onOpenGallery(index)}
                    className="group relative overflow-hidden rounded-md border border-border bg-secondary/30 text-left transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
                      className="w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <span className="block border-t border-border bg-card/95 px-3 py-2 text-xs font-medium text-foreground">
                      {image.title ??
                        (isEnglish ? "Open full screen" : "Agrandir la capture")}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8 flex min-w-0 flex-nowrap gap-2 overflow-hidden border-y border-border py-4">
            {techHighlights.map((tech) => (
              <span
                key={tech}
                title={tech}
                className="min-w-0 flex-1 truncate rounded-full border border-border/80 bg-secondary/70 px-3 py-1.5 text-center text-xs font-medium leading-5 text-foreground/80"
              >
                {tech}
              </span>
            ))}
          </div>

          <ProjectCaseStudySummary
            contentHtml={detailedContentHtml}
            description={project.description}
            isEnglish={isEnglish}
          />

          <div className="project-detail-content" onClick={handleDetailedContentClick}>
            {detailedContentHtml ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: detailedContentHtml,
                }}
              />
            ) : null}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6">
            {project.github && (
              <Button
                asChild
                size="default"
                variant="outline"
                className="min-w-40 flex-1 rounded-md border-border text-foreground hover:border-primary hover:bg-secondary"
              >
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" aria-hidden="true" />
                  {isEnglish ? "Source code" : "Code source"}
                </a>
              </Button>
            )}
            {project.demo && (
              <Button
                asChild
                size="default"
                className="min-w-40 flex-1 rounded-md bg-primary text-primary-foreground shadow-none hover:bg-primary/90"
              >
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                  {isEnglish ? "View project" : "Voir le projet"}
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
