import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";

type DeferredSectionProps = {
  sectionId: string;
  children: ReactNode;
  loadingLabel: string;
};

const hashTargetsSection = (sectionId: string) => {
  if (typeof window === "undefined") return false;

  const hash = window.location.hash;
  if (hash === `#${sectionId}`) return true;

  return (
    (sectionId === "projects" && hash.startsWith("#project=")) ||
    (sectionId === "freelance" && hash === "#freelance-cases")
  );
};

const DeferredSection = ({ sectionId, children, loadingLabel }: DeferredSectionProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(() => hashTargetsSection(sectionId));

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || isLoaded) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setIsLoaded(true);
        observer.disconnect();
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [isLoaded]);

  useEffect(() => {
    const handleHashChange = () => {
      if (hashTargetsSection(sectionId)) setIsLoaded(true);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [sectionId]);

  useEffect(() => {
    if (!isLoaded || !hashTargetsSection(sectionId)) return;

    const frame = window.requestAnimationFrame(() => {
      wrapperRef.current?.scrollIntoView({ block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isLoaded, sectionId]);

  return (
    <div
      ref={wrapperRef}
      aria-busy={!isLoaded}
      className="min-h-[24rem]"
    >
      {isLoaded ? (
        <Suspense
          fallback={
            <div className="container mx-auto px-4 py-12 text-sm text-muted-foreground" role="status">
              {loadingLabel}
            </div>
          }
        >
          {children}
        </Suspense>
      ) : null}
    </div>
  );
};

export default DeferredSection;
