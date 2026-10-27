import {
  BarChart3,
  BriefcaseBusiness,
  CheckCircle,
  Clock,
  Mail,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n";

const About = () => {
  const { isEnglish } = useLanguage();
  const stats = isEnglish
    ? [
        { label: "Years of experience", value: "7+", icon: Clock },
        { label: "Projects and builds", value: "30+", icon: BarChart3 },
        { label: "Working together", value: "Freelance", icon: BriefcaseBusiness },
      ]
    : [
        { label: "Années d'expérience", value: "7+", icon: Clock },
        { label: "Projets et réalisations", value: "30+", icon: BarChart3 },
        { label: "Mode d’intervention", value: "Freelance", icon: BriefcaseBusiness },
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
    <section id="about" className="relative section-odd py-14 md:py-16">
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
                      me<span className="text-primary"></span>
                    </span>
                  </>
                ) : (
                  <>
                    À propos
                    <span className="block">
                      de moi<span className="text-primary"></span>
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
                      <p
                        className={`break-normal font-semibold tracking-tight text-foreground ${
                          index === stats.length - 1 ? "text-3xl md:text-4xl" : "text-5xl md:text-6xl"
                        }`}
                      >
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
                      {isEnglish ? "Your projects" : "Vos projets"}
                    </p>
                    <p className="mt-2 text-lg font-semibold leading-7 text-foreground md:text-xl">
                      {isEnglish
                        ? "Websites, business tools and automation for small businesses and service organisations"
                        : "Sites, outils métier et automatisations pour les TPE, PME et structures de services"}
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

        </div>
      </div>
    </section>
  );
};

export default About;
