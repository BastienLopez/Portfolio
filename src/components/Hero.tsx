import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";

const HERO_TYPING_INTERVAL_MS = 45;

const Hero = () => {
  const { isEnglish } = useLanguage();
  const profession = isEnglish
    ? "Freelance web developer"
    : "Développeur web Freelance";
  const supportingText = isEnglish
    ? "Professional websites and business tools"
    : "Sites professionnels et outils métier";
  const animatedText = `${profession}\n${supportingText}`;
  const [typedText, setTypedText] = useState(animatedText);
  const [typingComplete, setTypingComplete] = useState(true);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    if (motionQuery.matches || mobileQuery.matches) {
      setTypedText(animatedText);
      setTypingComplete(true);
      return;
    }

    let index = 0;
    setTypedText("");
    setTypingComplete(false);
    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(animatedText.slice(0, index));

      if (index >= animatedText.length) {
        window.clearInterval(timer);
        setTypingComplete(true);
      }
    }, HERO_TYPING_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [animatedText]);

  const typedProfession = typedText.slice(0, profession.length);
  const typedSupportingText = typedText.startsWith(`${profession}\n`)
    ? typedText.slice(profession.length + 1)
    : "";

  return (
    <section id="hero" className="hero-section relative flex items-start justify-center overflow-hidden lg:items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>

      {/* Subtle grid: a static visual anchor for the hero composition. */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 pb-8 pt-24 sm:pb-10 lg:pb-6 lg:pt-20">
        <div className="hero-content mx-auto flex max-w-4xl flex-col gap-5 text-center lg:max-w-6xl lg:gap-6">
          {/* Keep the positioning message visible in the initial HTML while animating after mount. */}
          <div className="hero-heading flex flex-col gap-4">
            <h1 className="text-[2.5rem] md:text-7xl font-bold tracking-tight">
              <span className="block">Bastien Lopez</span>
              <span className="hero-profession mt-3 block min-h-[1.15em] bg-[length:200%_auto] text-2xl font-medium leading-tight text-primary supports-[background-clip:text]:bg-gradient-to-r supports-[background-clip:text]:from-primary supports-[background-clip:text]:via-accent supports-[background-clip:text]:to-primary supports-[background-clip:text]:bg-clip-text supports-[background-clip:text]:text-transparent md:text-4xl lg:whitespace-nowrap lg:text-[clamp(2.5rem,3.5vw,3rem)]">
                {typedProfession}
              </span>
            </h1>
            <div className="flex items-start justify-center">
              <h2
                data-hero-title
                data-typing-complete={typingComplete ? "true" : "false"}
                aria-label={supportingText}
                className="min-h-[1.2em] bg-[length:200%_auto] text-2xl font-medium leading-tight text-primary supports-[background-clip:text]:bg-gradient-to-r supports-[background-clip:text]:from-primary supports-[background-clip:text]:via-accent supports-[background-clip:text]:to-primary supports-[background-clip:text]:bg-clip-text supports-[background-clip:text]:text-transparent md:text-3xl lg:text-4xl whitespace-pre-line"
              >
                <span aria-hidden="true">{typedSupportingText}</span>
                {!typingComplete && <span className="animate-pulse" aria-hidden="true">|</span>}
              </h2>
            </div>
          </div>

          {/* Subtitle */}
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground md:text-xl">
            {isEnglish
              ? 'I help small businesses and service organisations present their work online and simplify repetitive tasks.'
              : 'J’aide les TPE, PME et structures de services à présenter leur activité en ligne et à simplifier leurs tâches répétitives.'}
          </p>
          <p className="mx-auto max-w-3xl text-base leading-7 text-foreground/80 md:text-lg">
            {isEnglish
              ? 'Based in Reims, France, I work remotely with clients across Europe, creating professional websites and business tools for companies.'
              : 'Basé à Reims, en France, j’interviens à distance en Europe et je crée des sites internet professionnels et des outils métier pour les entreprises.'}
          </p>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {isEnglish
              ? 'Over 7 years of experience and more than 30 projects completed.'
              : 'Plus de 7 ans d’expérience et plus de 30 projets réalisés.'}
          </p>

          {/* Reassurance line */}
          <div data-hero-badges className="flex flex-wrap justify-center gap-3 py-3">
            {[
              ...(isEnglish
                ? ["Professional websites", "Business tools & automation"]
                : ["Sites professionnels", "Outils métier & automatisation"]),
            ].map((item) => (
              <span
                key={item}
                className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium hover:border-primary transition-colors"
              >
                {item}
              </span>
            ))}
          </div>

          <div data-hero-actions className="flex flex-col flex-wrap items-center justify-center gap-4 pt-4 sm:flex-row">
            <Button asChild size="lg" className="h-auto min-h-11 w-full max-w-full whitespace-normal bg-blue-600 px-6 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-500 sm:w-auto">
              <a href="#projects" onClick={() => trackEvent("cta_click", { location: "hero", cta: "projects" })}>{isEnglish ? 'View key projects' : 'Voir mes projets clés'}</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-auto min-h-11 w-full max-w-full whitespace-normal border-accent px-6 py-2.5 text-center text-sm text-foreground hover:bg-accent/10 hover:text-foreground sm:w-auto">
              <a href="#contact" onClick={() => trackEvent("cta_click", { location: "hero", cta: "contact" })}>{isEnglish ? 'Describe my project' : 'Décrire mon projet'}</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-auto min-h-11 w-full max-w-full whitespace-normal border-accent px-6 py-2.5 text-center text-sm text-cyan-300 hover:bg-accent/10 hover:text-cyan-200 sm:w-auto">
              <a href="/freelance" onClick={() => trackEvent("cta_click", { location: "hero", cta: "freelance" })}>{isEnglish ? 'My freelance services' : 'Mes services freelance'}</a>
            </Button>
          </div>

          {/* Keep the scroll affordance in the document flow so it cannot cover the CTAs. */}
          <div className="hero-scroll flex justify-center">
            <a href="#about" className="text-muted-foreground transition-colors hover:text-primary" aria-label={isEnglish ? 'Go to the about section' : 'Aller à la section à propos'}>
              <ChevronDown className="h-8 w-8" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade to blend hero into next section */}
      <div className="hero-grid-fade" />

    </section>
  );
};

export default Hero;
