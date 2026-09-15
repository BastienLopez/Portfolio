import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle,
  Clock,
  FileText,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n";

const About = () => {
  const { isEnglish } = useLanguage();
  const stats = isEnglish
    ? [
        { label: "Years of experience", value: "7+", icon: Clock },
        { label: "Projects and builds", value: "30+", icon: BarChart3 },
        { label: "Working modes", value: "Permanent & freelance", icon: BriefcaseBusiness },
      ]
    : [
        { label: "Années d'expérience", value: "7+", icon: Clock },
        { label: "Projets et réalisations", value: "30+", icon: BarChart3 },
        { label: "Modes d’intervention", value: "CDI & freelance", icon: BriefcaseBusiness },
      ];

  const trustPoints = isEnglish
    ? [
        "Clear scope",
        "Incremental delivery with business priorities",
        "Readable, documented and transferable code",
        "Straightforward and fluid communication",
      ]
    : [
        "Cadrage clair",
        "Livraisons progressives avec priorités métier",
        "Code lisible, documenté et transmissible",
        "Communication simple et fluide",
      ];

  return (
    <section id="about" className="relative section-odd py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(15rem,0.8fr)_minmax(0,2fr)] lg:items-start lg:gap-14">
            <div className="pt-1">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.36em] text-primary">
                {isEnglish ? "About" : "À propos"}
              </p>
              <h2 className="max-w-xs text-5xl font-semibold leading-[0.98] tracking-tight text-foreground md:text-6xl">
                {isEnglish ? (
                  <>
                    About
                    <span className="block">
                      me<span className="text-primary">.</span>
                    </span>
                  </>
                ) : (
                  <>
                    À propos
                    <span className="block">
                      de moi<span className="text-primary">.</span>
                    </span>
                  </>
                )}
              </h2>
            </div>

            <div className="min-w-0">
              <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.label}
                      className={`min-w-0 px-0 py-5 sm:px-6 sm:py-2 ${
                        index === 0 ? "pt-0 sm:pl-0" : ""
                      } ${index === stats.length - 1 ? "pb-0 sm:pr-0" : ""}`}
                    >
                      <Icon className="mb-5 h-7 w-7 text-primary" aria-hidden="true" />
                      <p className="break-words text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
                        {stat.value}
                      </p>
                      <p className="mt-2 max-w-[12rem] text-sm leading-6 text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              <Card className="mt-8 border border-border bg-card/20 p-5 shadow-none md:p-6">
                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      {isEnglish ? "Available for" : "Disponible pour"}
                    </p>
                    <p className="mt-2 text-lg font-semibold leading-7 text-foreground md:text-xl">
                      {isEnglish
                        ? "Remote/full-remote permanent roles or focused freelance projects"
                        : "CDI remote/full remote ou missions freelance ciblées"}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="mt-12 border-y border-border py-8 md:mt-14">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {isEnglish ? "How I work" : "Ma façon de travailler"}
            </p>
            <ul className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
              {trustPoints.map((point, index) => (
                <li
                  key={point}
                  className={`flex items-start gap-3 text-sm leading-6 text-foreground/85 lg:px-6 ${
                    index > 0 ? "lg:border-l lg:border-border" : "lg:pl-0"
                  } ${index === trustPoints.length - 1 ? "lg:pr-0" : ""}`}
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-10 sm:grid-cols-3">
            <Button
              asChild
              variant="outline"
              className="w-full justify-center gap-2 border-border text-foreground hover:border-emerald-300 hover:bg-emerald-300/10 hover:text-emerald-300"
            >
              <a href="https://github.com/BastienLopez" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" aria-hidden="true" />
                <span>GitHub</span>
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-center gap-2 border-border text-foreground hover:border-blue-400 hover:bg-blue-400/10 hover:text-blue-400"
            >
              <a href="https://www.linkedin.com/in/bastien-lopez-fullstack/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" aria-hidden="true" />
                <span>LinkedIn</span>
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-center gap-2 border-muted-foreground text-foreground hover:border-emerald-300 hover:bg-emerald-300/10 hover:text-emerald-300"
            >
              <a href="/CV_LOPEZ_BASTIEN_FREELANCE.pdf" download>
                <FileText className="h-5 w-5" aria-hidden="true" />
                <span>{isEnglish ? "View my résumé" : "Voir mon CV"}</span>
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
