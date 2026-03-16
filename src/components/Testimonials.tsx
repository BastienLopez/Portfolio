import React, { useEffect, useRef, useState } from "react";
import testimonialsData, { Testimonial } from "@/data/testimonials";

// Lightweight testimonials horizontal scroller.
// - gentle auto-scroll via requestAnimationFrame
// - pauses on hover / pointer interaction
// - respects prefers-reduced-motion

const Avatar = ({ name, image }: { name: string; image?: string | null }) => {
  if (image) {
    return <img src={image} alt={name} className="w-20 h-20 rounded-full object-cover" />;
  }
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  return <div className="w-20 h-20 rounded-full bg-primary/15 text-primary flex items-center justify-center font-semibold">{initials}</div>;
};

export default function Testimonials(): JSX.Element {
  const listRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tickerRef = useRef<HTMLDivElement | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
    const handler = () => setIsReducedMotion(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // Use CSS animation for a more reliable continuous ticker
  useEffect(() => {
    const track = trackRef.current;
    const ticker = tickerRef.current;
    if (!track || !ticker) return;
    if (isReducedMotion) {
      ticker.style.animation = "none";
      return;
    }

    const speed = 45; // px per second (slower, smoother)
    // compute width of one sequence (half of duplicated content)
    const seqWidth = track.scrollWidth / 2 || 0;
    const duration = Math.max(10, seqWidth / speed); // ensure a minimum duration for elegance
    ticker.style.setProperty("--ticker-duration", `${duration}s`);
  }, [isReducedMotion, testimonialsData.length]);

  const loopedTestimonials = [...testimonialsData, ...testimonialsData];

  return (
    <section id="testimonials" className="relative py-16 md:py-24 w-screen left-1/2 -translate-x-1/2 overflow-hidden">
      {/* background full width + subtle grid like hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto mb-6">
            <h2 className="text-3xl md:text-4xl font-bold">Retours clients</h2>
          </div>
        </div>

        <div className="w-full">
          <div className="relative overflow-hidden">
            <div
              ref={listRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="relative overflow-hidden px-4 md:px-8"
              aria-label="Liste de témoignages"
            >
              <div ref={trackRef} className="w-max">
                <div
                  ref={tickerRef}
                  className={`ticker flex gap-6 md:gap-8 items-stretch py-4 pr-6 md:pr-10 ${isPaused ? " paused" : ""}`}
                >
                  {loopedTestimonials.map((t: Testimonial, idx) => (
                        <article
                          key={`${t.id}-${idx}`}
                          className="w-[340px] min-w-[340px] md:w-[420px] md:min-w-[420px] bg-card/95 border border-border rounded-2xl p-6 flex-shrink-0 shadow-lg"
                        >
                          <div className="mb-3 text-center">
                            <div className="text-sm text-foreground/70 uppercase tracking-wide font-medium">{t.service}</div>
                          </div>

                          <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-3 flex flex-col items-center">
                              <Avatar name={t.name} image={t.image} />
                              <div className="mt-3 text-center">
                                <div className="font-semibold text-sm leading-tight">{t.name}</div>
                                <div className="text-xs text-foreground/70 leading-5">{t.role}{t.company ? ` · ${t.company}` : ""}</div>
                              </div>
                            </div>

                            <div className="col-span-9 flex items-center justify-start pl-6">
                              <div className="max-w-[40ch]">
                                <p className="text-sm md:text-base text-foreground/85 leading-7 text-left">{t.text}</p>
                              </div>
                            </div>
                          </div>
                        </article>
              ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background/95 via-background/50 to-transparent"></div>
      <div className="hero-grid-fade pointer-events-none absolute inset-x-0 bottom-0 h-20"></div>

      <style>{`
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .ticker { display: flex; align-items: stretch; animation: ticker var(--ticker-duration, 20s) linear infinite; }
        .ticker.paused { animation-play-state: paused; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}
