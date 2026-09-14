import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";

const Hero = () => {
  const { isEnglish } = useLanguage();
  const profession = isEnglish
    ? "Full-Stack AI & Automation Developer"
    : "Développeur Full-Stack IA & Automatisation";
  const supportingText = isEnglish
    ? "Business applications, APIs and n8n workflows"
    : "Applications métier, APIs et workflows n8n";
  const animatedText = `${profession}\n${supportingText}`;
  const [typedText, setTypedText] = useState(animatedText);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setTypedText(animatedText);
      setTypingComplete(true);
      return;
    }

    let index = 0;
    setTypedText("");
    setTypingComplete(false);
    const TYPING_INTERVAL = 50;

    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(animatedText.slice(0, index));

      if (index >= animatedText.length) {
        window.clearInterval(timer);
        setTypingComplete(true);
      }
    }, TYPING_INTERVAL);

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
      
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 pb-8 pt-24 sm:pb-10 sm:pt-28 lg:translate-y-7 lg:pb-0 lg:pt-20">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          {/* Title with typing effect */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="block">Bastien Lopez</span>
              <span className="mt-3 block bg-[length:200%_auto] text-2xl font-medium leading-tight text-primary supports-[background-clip:text]:bg-gradient-to-r supports-[background-clip:text]:from-primary supports-[background-clip:text]:via-accent supports-[background-clip:text]:to-primary supports-[background-clip:text]:bg-clip-text supports-[background-clip:text]:text-transparent md:text-4xl lg:text-5xl">
                {typedProfession}
              </span>
            </h1>
            <div className="flex items-start justify-center">
              <h2
                data-hero-title
                data-typing-complete={typingComplete ? "true" : "false"}
                aria-label={supportingText}
                className="bg-[length:200%_auto] text-2xl font-medium leading-tight text-primary supports-[background-clip:text]:bg-gradient-to-r supports-[background-clip:text]:from-primary supports-[background-clip:text]:via-accent supports-[background-clip:text]:to-primary supports-[background-clip:text]:bg-clip-text supports-[background-clip:text]:text-transparent md:text-3xl lg:text-4xl whitespace-pre-line animate-[shimmer_3s_linear_infinite]"
              >
                <span aria-hidden="true">{typedSupportingText}</span>
                {!typingComplete && <span className="animate-pulse" aria-hidden="true">|</span>}
              </h2>
            </div>
          </div>

          {/* Subtitle */}
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {isEnglish
              ? 'I create internal tools and automations that simplify day-to-day work.'
              : 'Je crée des outils internes et des automatisations qui simplifient le travail quotidien.'}
          </p>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {isEnglish
              ? 'Over 7 years of experience and more than 30 projects completed.'
              : 'Plus de 7 ans d’expérience et plus de 30 projets réalisés.'}
          </p>

          {/* Reassurance line */}
          <div className="flex flex-wrap justify-center gap-3 py-3">
            {[
              ...(isEnglish
                ? ["Business applications", "APIs & AI workflows", "Technical support"]
                : ["Applications métier", "APIs & workflows IA", "Accompagnement technique"]),
            ].map((item) => (
              <span
                key={item}
                className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium hover:border-primary transition-colors"
              >
                {item}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col flex-wrap items-center justify-center gap-4 pt-6 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="w-full max-w-full whitespace-normal bg-blue-600 px-3 text-center font-semibold text-white hover:bg-blue-500 sm:w-auto sm:max-w-none sm:whitespace-nowrap sm:px-8"
            >
              <a href="#projects" onClick={() => trackEvent("cta_click", { location: "hero", cta: "projects" })}>{isEnglish ? 'View key projects' : 'Voir mes projets clés'}</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full max-w-full whitespace-normal px-3 text-center border-accent text-foreground hover:bg-accent/10 hover:text-foreground sm:w-auto sm:max-w-none sm:whitespace-nowrap sm:px-8"
            >
              <a href="#contact" onClick={() => trackEvent("cta_click", { location: "hero", cta: "contact" })}>{isEnglish ? 'Contact me' : 'Me contacter'}</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full max-w-full whitespace-normal px-3 text-center border-accent text-cyan-300 hover:bg-accent/10 hover:text-cyan-200 sm:w-auto sm:max-w-none sm:whitespace-nowrap sm:px-8"
            >
              <a href="/freelance" onClick={() => trackEvent("cta_click", { location: "hero", cta: "freelance" })}>{isEnglish ? 'My freelance services' : 'Mes services freelance'}</a>
            </Button>

          </div>

          {/* Keep the scroll affordance in the document flow so it cannot cover the CTAs. */}
          <div className="mt-8 flex justify-center sm:mt-10 lg:mt-8">
            <a href="#about" className="animate-bounce text-muted-foreground transition-colors hover:text-primary" aria-label={isEnglish ? 'Go to the about section' : 'Aller à la section à propos'}>
              <ChevronDown className="h-8 w-8" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade to blend hero into next section */}
      <div className="hero-grid-fade" />

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-bounce, .animate-fade-in, .animate-pulse {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
