import { useLanguage } from "@/lib/i18n";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import "./SectionTimeline.css";

const TIMELINE_POINT_COUNT = 50;
const HEADER_OFFSET = 80;

type TimelineSection = {
  id: string;
  label: string;
  element: HTMLElement;
  scrollProgress: number;
  pointIndex: number;
};

const sectionIdsByPath: Record<string, string[]> = {
  "/": ["hero", "about", "projects", "skills", "devnotes", "contact"],
  "/freelance": [
    "freelance",
    "freelance-services",
    "freelance-process",
    "projects",
    "testimonials",
    "freelance-faq",
    "contact",
  ],
};

const labelsById: Record<string, { fr: string; en: string }> = {
  hero: { fr: "Accueil", en: "Home" },
  about: { fr: "À propos", en: "About" },
  projects: { fr: "Projets", en: "Projects" },
  skills: { fr: "Compétences", en: "Skills" },
  devnotes: { fr: "Dev Notes", en: "Dev Notes" },
  contact: { fr: "Contact", en: "Contact" },
  freelance: { fr: "Accueil freelance", en: "Freelance home" },
  "freelance-services": { fr: "Offres", en: "Services" },
  "freelance-process": { fr: "Méthode", en: "Process" },
  testimonials: { fr: "Avis clients", en: "Client feedback" },
  "freelance-faq": { fr: "Des questions ? ", en: "FAQ" },
};

const timelinePoints = Array.from({ length: TIMELINE_POINT_COUNT }, (_, index) => ({
  index,
  progress: index / (TIMELINE_POINT_COUNT - 1),
}));

const normalizePath = (pathname: string) => pathname.replace(/\/+$/, "") || "/";

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(maximum, Math.max(minimum, value));

const getScrollableHeight = () =>
  Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

const getScrollProgress = () => {
  const scrollableHeight = getScrollableHeight();
  return scrollableHeight > 0 ? clamp(window.scrollY / scrollableHeight) : 0;
};

const getFallbackLabel = (element: HTMLElement, isEnglish: boolean) => {
  const labelledBy = element.getAttribute("aria-labelledby");
  const labelledElement = labelledBy ? document.getElementById(labelledBy) : null;
  const heading = labelledElement ?? element.querySelector<HTMLElement>("h1, h2, h3");
  const label = heading?.textContent?.replace(/\s+/g, " ").trim() ?? "";

  if (label) return label.replace(/[.!?]+$/, "");

  return element.id || (isEnglish ? "Section" : "Section");
};

const getAvailablePointIndex = (rawIndex: number, usedIndexes: Set<number>) => {
  for (let distance = 0; distance < TIMELINE_POINT_COUNT; distance += 1) {
    const candidates = distance === 0 ? [rawIndex] : [rawIndex - distance, rawIndex + distance];
    const available = candidates.find(
      (candidate) => candidate >= 0 && candidate < TIMELINE_POINT_COUNT && !usedIndexes.has(candidate),
    );

    if (available !== undefined) return available;
  }

  return clamp(rawIndex, 0, TIMELINE_POINT_COUNT - 1);
};

const getTimelineSections = (pathname: string, isEnglish: boolean): TimelineSection[] => {
  const main = document.querySelector<HTMLElement>("main");
  if (!main) return [];

  const normalizedPath = normalizePath(pathname);
  const configuredIds = sectionIdsByPath[normalizedPath];
  const detectedChildren = Array.from(main.children).filter(
    (element): element is HTMLElement =>
      element instanceof HTMLElement &&
      (element.tagName === "SECTION" || element.tagName === "ARTICLE"),
  );
  const elements = configuredIds
    ? configuredIds
        .map((id) => document.getElementById(id))
        .filter((element): element is HTMLElement => Boolean(element && main.contains(element)))
    : detectedChildren.length > 0
      ? detectedChildren
      : Array.from(main.querySelectorAll<HTMLElement>("section[id], article[id]"));

  const seenIds = new Set<string>();
  const usedPointIndexes = new Set<number>();
  const fallbackPath = normalizedPath === "/" ? "home" : normalizedPath.slice(1).replace(/[^a-z0-9]+/gi, "-");
  const scrollableHeight = getScrollableHeight();

  return elements.reduce<TimelineSection[]>((sections, element, index) => {
    if (!element.id) element.id = "timeline-" + (fallbackPath || "page") + "-" + (index + 1);
    if (seenIds.has(element.id)) return sections;
    seenIds.add(element.id);

    const knownLabel =
      element.id === "projects" && normalizedPath === "/freelance"
        ? { fr: "Réalisations", en: "Selected work" }
        : labelsById[element.id];
    const label = knownLabel ? (isEnglish ? knownLabel.en : knownLabel.fr) : getFallbackLabel(element, isEnglish);
    const sectionTop = element.getBoundingClientRect().top + window.scrollY;
    const scrollProgress = scrollableHeight > 0 ? clamp(sectionTop / scrollableHeight) : 0;
    const rawPointIndex = Math.round(scrollProgress * (TIMELINE_POINT_COUNT - 1));
    const pointIndex = getAvailablePointIndex(rawPointIndex, usedPointIndexes);

    usedPointIndexes.add(pointIndex);
    sections.push({ id: element.id, label, element, scrollProgress, pointIndex });
    return sections;
  }, []);
};

const sameSections = (previous: TimelineSection[], next: TimelineSection[]) =>
  previous.length === next.length &&
  previous.every((section, index) => {
    const nextSection = next[index];
    return (
      section.id === nextSection.id &&
      section.label === nextSection.label &&
      section.element === nextSection.element &&
      section.pointIndex === nextSection.pointIndex
    );
  });

const SectionTimeline = () => {
  const { pathname, search } = useLocation();
  const { isEnglish } = useLanguage();
  const timelineRef = useRef<HTMLElement | null>(null);
  const [sections, setSections] = useState<TimelineSection[]>([]);
  const [activeId, setActiveId] = useState("");
  const [currentPointIndex, setCurrentPointIndex] = useState(0);

  useEffect(() => {
    let refreshFrame = 0;

    const refresh = () => {
      refreshFrame = 0;
      const nextSections = getTimelineSections(pathname, isEnglish);

      setSections((previous) => (sameSections(previous, nextSections) ? previous : nextSections));
      setActiveId((current) =>
        nextSections.some((section) => section.id === current) ? current : nextSections[0]?.id ?? "",
      );
    };

    const scheduleRefresh = () => {
      if (refreshFrame) return;
      refreshFrame = window.requestAnimationFrame(refresh);
    };

    scheduleRefresh();
    const root = document.getElementById("root") ?? document.body;
    const mutationObserver = new MutationObserver(scheduleRefresh);
    mutationObserver.observe(root, { childList: true, subtree: true });

    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleRefresh);
    resizeObserver?.observe(document.documentElement);
    window.addEventListener("resize", scheduleRefresh);

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      mutationObserver.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", scheduleRefresh);
    };
  }, [isEnglish, pathname]);

  useEffect(() => {
    if (sections.length === 0) return;

    const updateFromPosition = () => {
      const scrollProgress = getScrollProgress();
      const nextPointIndex = Math.round(scrollProgress * (TIMELINE_POINT_COUNT - 1));
      const markerPosition = window.scrollY + window.innerHeight * 0.38;
      let currentSection = sections[0];

      for (const section of sections) {
        const sectionTop = section.element.getBoundingClientRect().top + window.scrollY;
        if (sectionTop <= markerPosition) currentSection = section;
      }

      const timeline = timelineRef.current;
      if (timeline) {
        timeline.dataset.scrollProgress = scrollProgress.toFixed(4);
        timeline.style.setProperty("--timeline-scroll-progress", String(scrollProgress));
      }

      setCurrentPointIndex((current) => (current === nextPointIndex ? current : nextPointIndex));
      setActiveId((current) => (current === currentSection.id ? current : currentSection.id));
    };

    let scrollFrame = 0;
    const scheduleUpdate = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        updateFromPosition();
      });
    };

    updateFromPosition();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleUpdate);
    resizeObserver?.observe(document.documentElement);
    const main = document.querySelector("main");
    if (main) resizeObserver?.observe(main);

    return () => {
      window.cancelAnimationFrame(scrollFrame);
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [sections]);

  const navigateToSection = (event: MouseEvent<HTMLElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: reducedMotion ? "auto" : "smooth" });
    window.history.replaceState(null, "", window.location.pathname + window.location.search + "#" + id);
  };

  const navigateToProgress = (event: MouseEvent<HTMLButtonElement>, progress: number) => {
    event.preventDefault();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: progress * getScrollableHeight(),
      behavior: reducedMotion ? "auto" : "smooth",
    });
    window.history.replaceState(null, "", pathname + search);
  };

  if (sections.length === 0) return null;

  const activeSection = sections.find((section) => section.id === activeId) ?? sections[0];
  const sectionByPoint = new Map(sections.map((section) => [section.pointIndex, section]));

  return (
    <nav
      ref={timelineRef}
      className="section-timeline"
      aria-label={isEnglish ? "Page sections" : "Sections de la page"}
      data-scroll-progress="0"
    >
      <span className="section-timeline-current sr-only" aria-live="polite">
        {activeSection.label}
      </span>
      <div className="section-timeline-track">
        {timelinePoints.map((point) => {
          const section = sectionByPoint.get(point.index);
          const isPassed = point.index <= currentPointIndex;
          const isCurrent = point.index === currentPointIndex;
          const isSectionActive = section?.id === activeSection.id;
          const isBeforeSection = sectionByPoint.has(point.index + 1);
          const isAfterSection = sectionByPoint.has(point.index - 1);
          const isTwoBeforeSection = sectionByPoint.has(point.index + 2);
          const isTwoAfterSection = sectionByPoint.has(point.index - 2);
          const className = [
            "section-timeline-link",
            isPassed ? "is-passed" : "",
            isCurrent ? "is-current" : "",
            isTwoBeforeSection ? "is-two-before-section" : "",
            isBeforeSection ? "is-before-section" : "",
            isAfterSection ? "is-after-section" : "",
            isTwoAfterSection ? "is-two-after-section" : "",
            isSectionActive ? "is-active is-section-active" : "",
          ]
            .filter(Boolean)
            .join(" ");

          const label =
            section?.label ??
            (isEnglish
              ? "Scroll to " + Math.round(point.progress * 100) + "%"
              : "Aller à " + Math.round(point.progress * 100) + " %");

          if (section) {
            return (
              <a
                key={point.index}
                className={className}
                href={"#" + section.id}
                aria-label={label}
                aria-current={isSectionActive ? "location" : undefined}
                data-point-index={point.index}
                data-section-id={section.id}
                data-section-progress={section.scrollProgress.toFixed(4)}
                style={{ zIndex: timelinePoints.length - point.index }}
                onClick={(event) => navigateToSection(event, section.id)}
              >
                <span className="section-timeline-link-label" aria-hidden="true">
                  {section.label}
                </span>
                <span className="section-timeline-mark" aria-hidden="true" />
              </a>
            );
          }

          return (
            <button
              key={point.index}
              className={className}
              type="button"
              aria-label={label}
              data-point-index={point.index}
              data-point-progress={point.progress.toFixed(4)}
              style={{ zIndex: timelinePoints.length - point.index }}
              onClick={(event) => navigateToProgress(event, point.progress)}
            >
              <span className="section-timeline-mark" aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default SectionTimeline;
