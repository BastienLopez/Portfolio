import {
  ArrowDown,
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Layers3,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import { Link } from "react-router-dom";
import { getServicePage } from "@/data/site-pages";
import ServiceConditions from "@/components/ServiceConditions";

type Icon = typeof BriefcaseBusiness;

type Service = {
  number: string;
  slug?: string;
  href?: string;
  title: string;
  description: string;
  deliverables: string;
  icon: Icon;
};

type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

const pageCopy = {
  fr: {
    eyebrow: "Freelance · développement sur mesure",
    title: "Développeur web freelance à Reims — sites internet et outils métier",
    description:
      "J’aide les TPE, PME et structures de services à présenter leur activité en ligne et à réduire leurs tâches répétitives. Deux offres : un site professionnel, ou un outil métier avec les automatisations utiles.",
    note:
      "J’interviens du cadrage à la mise en production, avec une documentation que votre équipe peut reprendre.",
    location: "Basé à Reims, en France, j’interviens à distance en France et en Europe et je crée des sites internet professionnels et des outils métier pour les entreprises.",
    localLandingCta: "Création de sites internet à Reims",
    primaryCta: "Décrire mon projet",
    secondaryCta: "Voir les réalisations",
    servicesTitle: "Deux offres pour votre entreprise",
    servicesIntro:
      "Choisissez votre point de départ : rendre votre activité plus lisible sur le web, ou simplifier le travail de votre équipe. Chaque mission commence par un périmètre, des livrables et un devis.",
    services: [
      {
        number: "01",
        slug: "sites-vitrines",
        href: "/creation-site-internet-reims",
        title: "Création ou refonte de site professionnel",
        description:
          "Je crée des sites vitrines clairs, rapides et adaptés aux mobiles pour présenter une activité, ses services et ses réalisations.",
        deliverables: "Structure des pages, intégration, adaptation mobile, SEO/GEO de base et mise en ligne.",
        icon: Layers3,
      },
      {
        number: "02",
        slug: "applications-metier",
        href: "/services/applications-metier",
        title: "Outil métier ou automatisation",
        description:
          "Pour les équipes qui jonglent entre fichiers, outils et ressaisies : je construis un outil adapté ou je relie l’existant pour simplifier un parcours quotidien.",
        deliverables: "Application interne ou workflow, connexions aux outils, droits d’accès, contrôles et documentation selon le besoin.",
        icon: BriefcaseBusiness,
      },
    ] satisfies Service[],
    processTitle: "Comment je travaille",
    processIntro:
      "Chaque mission avance par étapes visibles. Le périmètre reste ajustable, les décisions sont écrites et la livraison est testable.",
    process: [
      {
        number: "01",
        title: "Cadrage",
        description:
          "Nous clarifions le besoin, les utilisateurs, les contraintes et le périmètre utile avant de choisir une solution.",
      },
      {
        number: "02",
        title: "Construction",
        description:
          "Je livre par lots courts avec des points de validation réguliers pour garder le produit proche du terrain.",
      },
      {
        number: "03",
        title: "Mise en production",
        description:
          "Les contrôles, la configuration et le déploiement sont préparés pour que le résultat soit réellement utilisable.",
      },
      {
        number: "04",
        title: "Transmission et suivi",
        description:
          "Je documente les choix, les procédures et les limites, puis je peux accompagner les corrections ou évolutions prévues.",
      },
    ] satisfies ProcessStep[],
    projectsAnchor: "#projects",
    contactLocation: "freelance-hero",
  },
  en: {
    eyebrow: "Freelance · tailored development",
    title: "Professional websites and business tools",
    description:
      "I help small businesses and service organisations present their work online and reduce repetitive tasks. Two services: a professional website, or a business tool with useful automation.",
    note:
      "From scoping to release, with documentation your team can take over.",
    location: "Based in Reims, France, I work remotely with teams across France and Europe.",
    localLandingCta: "Website creation in Reims",
    primaryCta: "Describe my project",
    secondaryCta: "See selected work",
    servicesTitle: "Two services for your business",
    servicesIntro:
      "Choose a starting point: make your business clearer online, or simplify your team's work. Each engagement starts with a scope, deliverables and a quotation.",
    services: [
      {
        number: "01",
        slug: "sites-vitrines",
        href: "/creation-site-internet-reims",
        title: "Professional website creation or redesign",
        description:
          "I build clear, fast and responsive showcase websites that present a business, its services and its work.",
        deliverables: "Page structure, implementation, responsive behaviour, baseline SEO/GEO and release.",
        icon: Layers3,
      },
      {
        number: "02",
        slug: "applications-metier",
        href: "/services/applications-metier",
        title: "Business tool or automation",
        description:
          "For teams juggling files, tools and repeated data entry: I build a focused tool or connect existing systems to simplify a daily workflow.",
        deliverables: "Internal application or workflow, integrations, permissions, checks and documentation according to your need.",
        icon: BriefcaseBusiness,
      },
    ] satisfies Service[],
    processTitle: "How I work",
    processIntro:
      "Each engagement moves through visible steps. Scope stays adjustable, decisions are written down and delivery can be tested.",
    process: [
      {
        number: "01",
        title: "Scope",
        description:
          "We clarify the need, users, constraints and useful boundary before choosing an approach.",
      },
      {
        number: "02",
        title: "Build",
        description:
          "I deliver in short increments with regular checkpoints so the product stays close to real use.",
      },
      {
        number: "03",
        title: "Release",
        description:
          "Checks, configuration and deployment are prepared so the result is ready for actual use.",
      },
      {
        number: "04",
        title: "Handover & follow-up",
        description:
          "I document decisions, procedures and limits, then can support planned fixes or improvements.",
      },
    ] satisfies ProcessStep[],
    projectsAnchor: "#projects",
    contactLocation: "freelance-hero",
  },
} as const;

const Freelance = () => {
  const { isEnglish } = useLanguage();
  const copy = isEnglish ? pageCopy.en : pageCopy.fr;

  return (
    <section
      id="freelance"
      className="section-odd relative overflow-hidden pb-12 md:pb-14"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[44rem] overflow-hidden sm:h-[48rem]" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute inset-0 opacity-20">
          <div
            className="hero-grid-background absolute inset-0"
          />
        </div>
        <div className="hero-grid-fade" />
      </div>

      <div className="container relative z-10 mx-auto w-full px-4 pt-28 md:pt-36">
        <div className="mx-auto max-w-7xl">
          <header className="max-w-5xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              {copy.eyebrow}
            </p>
            <h1 className="max-w-5xl text-3xl font-bold leading-tight tracking-tight md:text-6xl">
              {isEnglish ? (
                copy.title
              ) : (
                <>
                  <span className="block">Développeur web freelance à Reims</span>
                  <span className="block">Sites internet et outils métier</span>
                </>
              )}
            </h1>
            <div className="mt-7 h-px w-24 bg-primary/80" aria-hidden="true" />
            <p className="mt-5 max-w-3xl text-base leading-7 text-foreground/85 md:text-xl md:leading-8">
              {copy.description}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">{copy.note}</p>
            <p className="mt-4 inline-flex items-start gap-2 text-sm font-medium text-primary">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {copy.location}
            </p>
            <div data-freelance-actions className="mt-6 flex flex-wrap items-center gap-3 sm:gap-x-6">
              <Button asChild size="lg" className="h-auto min-h-11 max-w-full whitespace-normal bg-cta px-5 py-3 text-cta-foreground hover:bg-cta/90">
                <a
                  href="#contact"
                  onClick={() =>
                    trackEvent("cta_click", {
                      location: copy.contactLocation,
                      cta: "contact",
                    })
                  }
                >
                  {copy.primaryCta}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="h-auto min-h-11 max-w-full justify-start whitespace-normal px-2 py-3 text-foreground/80 hover:text-primary"
              >
                <a
                  href={copy.projectsAnchor}
                  onClick={() =>
                    trackEvent("cta_click", {
                      location: copy.contactLocation,
                      cta: "projects",
                    })
                  }
                >
                  {copy.secondaryCta}
                  <ArrowDown className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Link
                to="/creation-site-internet-reims"
                className="inline-flex max-w-full items-center gap-2 px-2 py-2 text-sm font-semibold text-primary underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                {copy.localLandingCta}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
            </div>
          </header>

          <section
            id="freelance-services"
            className="mt-24 md:mt-36"
            aria-labelledby="freelance-services-title"
          >
            <div className="mb-8 max-w-3xl">
              <div className="mb-4 flex items-center gap-3 text-primary">
                <Layers3 className="h-5 w-5" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.24em]">
                  {isEnglish ? "Scope" : "Périmètre"}
                </p>
              </div>
              <h2
                id="freelance-services-title"
                className="text-3xl font-bold tracking-tight md:text-4xl"
              >
                {copy.servicesTitle}
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
                {copy.servicesIntro}
              </p>
            </div>

            <ol className="divide-y divide-border border-y border-border">
              {copy.services.map((service) => {
                const ServiceIcon = service.icon;

                return (
                  <li
                    key={service.number}
                    className="grid gap-5 py-7 md:grid-cols-[4rem_minmax(0,0.75fr)_minmax(0,1fr)] md:items-start md:gap-5 md:py-9"
                  >
                    <div className="flex items-center gap-3 text-primary md:flex-col md:items-start md:gap-2">
                      <ServiceIcon className="h-5 w-5" aria-hidden="true" />
                      <span className="text-sm font-semibold tracking-[0.18em]">
                        {service.number}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold md:text-2xl">
                      {service.slug ? (
                        <Link
                          to={service.href ?? `/services/${service.slug}`}
                          className="inline-flex max-w-full items-center gap-2 transition-colors hover:text-primary"
                        >
                          <span>{service.title}</span>
                          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                        </Link>
                      ) : service.title}
                    </h3>
                    <div className="max-w-2xl">
                      <p className="text-base leading-7 text-foreground/85">
                        {service.description}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {service.deliverables}
                      </p>
                      <ServiceConditions service={getServicePage(service.slug)} headingAs="h4" />
                      {service.slug === "applications-metier" ? (
                        <Link
                          to="/services/automatisations-n8n"
                          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-foreground"
                        >
                          {isEnglish
                            ? "See the dedicated n8n automation service"
                            : "Voir la page dédiée aux automatisations n8n"}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          <section
            id="freelance-process"
            className="mt-24 md:mt-36"
            aria-labelledby="freelance-process-title"
          >
            <div className="mb-8 max-w-3xl">
              <div className="mb-4 flex items-center gap-3 text-primary">
                <Code2 className="h-5 w-5" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.24em]">
                  {isEnglish ? "Method" : "Méthode"}
                </p>
              </div>
              <h2
                id="freelance-process-title"
                className="text-3xl font-bold tracking-tight md:text-4xl"
              >
                {copy.processTitle}
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
                {copy.processIntro}
              </p>
            </div>

            <ol className="grid border-t border-border md:grid-cols-2 lg:grid-cols-4">
              {copy.process.map((step, index) => (
                <li
                  key={step.number}
                  className={`py-7 md:px-6 md:py-8 ${index > 0 ? "border-t border-border md:border-l md:border-t-0" : ""} ${index === 2 ? "lg:border-l" : ""}`}
                >
                  <p className="text-sm font-semibold tracking-[0.18em] text-primary">
                    {step.number}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-foreground/75">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Freelance;
