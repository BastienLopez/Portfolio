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
    sectionId === "projects" && hash.startsWith("#project=")
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

    const scrollToTarget = () => {
      const target = wrapperRef.current;
      if (!target) return;

      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      target.scrollIntoView({ block: "start" });
      root.style.scrollBehavior = previousScrollBehavior;
    };
    let secondFrame = 0;
    let settleTimer = 0;
    const frame = window.requestAnimationFrame(() => {
      scrollToTarget();
      secondFrame = window.requestAnimationFrame(scrollToTarget);
      settleTimer = window.setTimeout(scrollToTarget, 180);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(settleTimer);
    };
  }, [isLoaded, sectionId]);

  return (
    <div
      ref={wrapperRef}
      aria-busy={!isLoaded}
      className="min-h-[24rem] scroll-mt-20"
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
