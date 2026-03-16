import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Développeur Full Stack Freelance\nSites vitrines, applications métier,\nAPI et automatisation";
  
  useEffect(() => {
    let index = 0;
    const TYPING_INTERVAL = 70;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, TYPING_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
      
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Title with typing effect */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Bastien Lopez
            </h1>
            <div className="min-h-[96px] md:min-h-[128px] flex items-start justify-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl leading-tight font-medium whitespace-pre-line text-primary supports-[background-clip:text]:bg-gradient-to-r supports-[background-clip:text]:from-primary supports-[background-clip:text]:via-accent supports-[background-clip:text]:to-primary supports-[background-clip:text]:bg-clip-text supports-[background-clip:text]:text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
                {typedText}
                <span className="animate-pulse">|</span>
              </h2>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            En tant que développeur freelance, je conçois des outils web sur mesure pour aider les PME/TPE à gagner du temps, fiabiliser leurs flux
            et centraliser leurs opérations métier.
          </p>

          <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Portails internes, back-offices, API et automatisations. Approche progressive, code maintenable,
            communication claire.
          </p>

          {/* Reassurance line */}
          <div className="flex flex-wrap justify-center gap-3 py-3">
            {[
              "Applications métier",
              "API & automatisation",
              "MVP / outils internes",
              "Accompagnement technique",
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-background font-semibold"
            >
              <a href="#contact" onClick={() => trackEvent("cta_click", { location: "hero", cta: "contact" })}>Parler de votre projet</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              <a href="#projects" onClick={() => trackEvent("cta_click", { location: "hero", cta: "projects" })}>Voir mes réalisations</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <a href="#freelance" className="text-muted-foreground hover:text-primary transition-colors">
          <ChevronDown className="w-8 h-8" />
        </a>
      </div>

      {/* Bottom fade to blend hero into next section */}
      <div className="hero-grid-fade" />

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
