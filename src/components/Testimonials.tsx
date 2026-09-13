import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Testimonial } from "@/data/testimonials";
import testimonialsData from "@/data/testimonials";
import { useLanguage } from "@/lib/i18n";

const Avatar = ({ name, image }: { name: string; image?: string | null }) => {
  const resolveImage = (img?: string | null) => {
    if (!img) return undefined;
    if (img.startsWith("http") || img.startsWith("data:")) return img;
    const normalized = img.replace(/^\/+/, "");
    return import.meta.env.BASE_URL + normalized;
  };

  const resolved = resolveImage(image ?? undefined);
  if (resolved) {
    return <img src={resolved} alt="" className="h-20 w-20 rounded-full object-cover" />;
  }

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary"
      aria-hidden="true"
    >
      {initials}
    </div>
  );
};

export default function Testimonials(): JSX.Element {
  const { isEnglish } = useLanguage();
  const tickerRef = useRef<HTMLDivElement | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const isPaused = isReducedMotion || isManuallyPaused;

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setIsReducedMotion(motionQuery.matches);

    updateMotionPreference();
    motionQuery.addEventListener?.("change", updateMotionPreference);
    return () => motionQuery.removeEventListener?.("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    const updateDuration = () => {
      const sequenceWidth = ticker.scrollWidth / 2;
      if (!sequenceWidth) return;

      const speed = 45;
      const duration = Math.max(20, sequenceWidth / speed);
      ticker.style.setProperty("--ticker-duration", `${duration}s`);
    };

    const frame = window.requestAnimationFrame(updateDuration);
    const resizeObserver = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(updateDuration);

    resizeObserver?.observe(ticker);
    window.addEventListener("load", updateDuration);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener("load", updateDuration);
    };
  }, [isEnglish]);

  const loopedTestimonials = [...testimonialsData, ...testimonialsData];
  const pauseLabel = isReducedMotion
    ? (isEnglish ? "Automatic scrolling disabled" : "Défilement automatique désactivé")
    : isManuallyPaused
      ? (isEnglish ? "Resume testimonial scrolling" : "Reprendre le défilement des témoignages")
      : (isEnglish ? "Pause testimonial scrolling" : "Mettre en pause le défilement des témoignages");

  return (
    <section
      id="testimonials"
      className="section-odd relative w-full overflow-hidden py-16 md:py-24"
    >
      <div className="relative z-10 w-full">
        <div className="container mx-auto w-full px-4">
          <div className="mx-auto mb-5 flex w-full flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-bold md:text-4xl">
              {isEnglish ? "Client and anonymised user feedback" : "Retours clients et utilisateurs anonymisés"}
            </h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsManuallyPaused((paused) => !paused)}
              disabled={isReducedMotion}
              aria-label={pauseLabel}
            >
              {isPaused ? <Play className="mr-2 h-4 w-4" aria-hidden="true" /> : <Pause className="mr-2 h-4 w-4" aria-hidden="true" />}
              {isReducedMotion
                ? (isEnglish ? "Reduced motion" : "Mouvement réduit")
                : isManuallyPaused
                  ? (isEnglish ? "Resume" : "Reprendre")
                  : (isEnglish ? "Pause" : "Mettre en pause")}
            </Button>
          </div>
        </div>

        <div
          className="testimonials-viewport relative left-1/2 w-screen -translate-x-1/2 overflow-hidden"
          role="region"
          aria-roledescription="carousel"
          aria-label={isEnglish ? "Client testimonials" : "Témoignages clients"}
        >
          <div className="w-max px-4 md:px-8">
            <div
              ref={tickerRef}
              className={`ticker flex items-stretch gap-6 py-4 pr-6 md:gap-8 md:pr-10${isPaused ? " paused" : ""}`}
            >
              {loopedTestimonials.map((testimonial: Testimonial, index) => {
                const isClone = index >= testimonialsData.length;
                const service = isEnglish ? testimonial.serviceEn : testimonial.service;
                const role = isEnglish ? testimonial.roleEn : testimonial.role;
                const text = isEnglish ? testimonial.textEn : testimonial.text;

                return (
                  <article
                    key={`${testimonial.id}-${index}`}
                    data-testimonial-slide={!isClone ? "true" : undefined}
                    aria-hidden={isClone ? "true" : undefined}
                    aria-roledescription={isClone ? undefined : "slide"}
                    aria-label={isClone ? undefined : `${index + 1} / ${testimonialsData.length}`}
                    className="testimonial-slide flex min-h-[240px] flex-shrink-0 flex-col rounded-2xl border border-border bg-card/95 p-6 shadow-none"
                  >
                    <div className="mb-3 text-center text-sm font-medium uppercase tracking-wide text-foreground/70">
                      {service}
                    </div>

                    <div className="grid flex-1 grid-cols-[6rem_minmax(0,1fr)] items-start gap-4">
                      <div className="flex flex-col items-center">
                        <Avatar name={testimonial.name} image={testimonial.image} />
                        <div className="mt-3 w-full text-center">
                          <div className="text-sm font-semibold leading-tight">{testimonial.name}</div>
                          <div className="text-xs leading-4 text-foreground/70">{role}</div>
                        </div>
                      </div>

                      <p className="text-left text-sm leading-6 text-foreground/85 md:text-base">{text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
