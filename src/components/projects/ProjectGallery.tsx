import type { RefObject } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectGalleryItem } from "@/data/projects";
import { getImageManifestEntry, getImageSrcSet } from "@/lib/image-variants";

type ProjectGalleryProps = {
  galleryImages: ProjectGalleryItem[];
  activeGalleryIndex: number;
  projectTitle?: string;
  isEnglish: boolean;
  galleryViewerRef: RefObject<HTMLDivElement | null>;
  resolveImage: (image?: string | null) => string;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export const ProjectGallery = ({
  galleryImages,
  activeGalleryIndex,
  projectTitle,
  isEnglish,
  galleryViewerRef,
  resolveImage,
  onClose,
  onPrevious,
  onNext,
}: ProjectGalleryProps) => {
  const activeImage = galleryImages[activeGalleryIndex];
  if (!activeImage) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={
        isEnglish
          ? "Project screenshot viewer"
          : "Visionneuse de captures du projet"
      }
      onClick={onClose}
    >
      <div
        ref={galleryViewerRef}
        className="relative flex h-full w-full max-w-7xl items-center justify-center px-14 sm:px-20"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={resolveImage(activeImage.src)}
          srcSet={getImageSrcSet(activeImage.src, resolveImage)}
          alt={
            activeImage.alt ??
            `${projectTitle ?? "Projet"} — ${isEnglish ? "screenshot" : "capture"} ${activeGalleryIndex + 1}`
          }
          width={getImageManifestEntry(activeImage.src)?.width}
          height={getImageManifestEntry(activeImage.src)?.height}
          className="max-h-[85vh] max-w-full rounded-md border border-border bg-card object-contain shadow-lg"
        />
        <button
          data-gallery-close
          type="button"
          onClick={onClose}
          className="absolute right-0 top-0 rounded-md border border-border bg-card p-2 text-foreground shadow-lg transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={isEnglish ? "Close viewer" : "Fermer la visionneuse"}
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        {galleryImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={onPrevious}
              className="absolute left-1 rounded-md border border-border bg-card p-3 text-foreground shadow-lg transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:left-4"
              aria-label={
                isEnglish ? "Previous screenshot" : "Capture précédente"
              }
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onNext}
              className="absolute right-1 rounded-md border border-border bg-card p-3 text-foreground shadow-lg transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:right-4"
              aria-label={isEnglish ? "Next screenshot" : "Capture suivante"}
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </>
        )}
        <p className="absolute bottom-0 rounded-sm border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
          {activeGalleryIndex + 1} / {galleryImages.length} ·{" "}
          {activeImage.title ? `${activeImage.title} · ` : ""}
          {isEnglish ? "Use ← → or Esc" : "Utilisez ← → ou Échap"}
        </p>
      </div>
    </div>
  );
};
