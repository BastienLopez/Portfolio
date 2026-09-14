import {
  ArrowDown,
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  GitBranch,
  Layers3,
  MapPin,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import { Link } from "react-router-dom";

type Icon = typeof BriefcaseBusiness;

type Service = {
  number: string;
  slug?: string;
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
    title: "Des outils métier qui font avancer votre activité.",
    description:
      "Je conçois des sites vitrines, applications métier, des automatisations n8n et des APIs internes qui enlèvent les tâches répétitives et rendent le travail quotidien plus simple.",
    note:
      "J’interviens du cadrage à la mise en production, avec une documentation que votre équipe peut reprendre.",
    location: "Basé à Reims, j’interviens à distance partout en France.",
    primaryCta: "Parler du projet",
    secondaryCta: "Voir les réalisations",
    servicesTitle: "Ce que je prends en charge",
    servicesIntro:
      "Une grande partie de mes missions concerne des sites vitrines. Je prends aussi en charge des outils métier et des automatisations avec un périmètre clair et un livrable utilisable.",
    services: [
      {
        number: "01",
        slug: "sites-vitrines",
        title: "Sites vitrines & présence en ligne",
        description:
          "Je crée des sites vitrines clairs, rapides et responsive pour présenter une activité, ses services et ses réalisations.",
        deliverables: "Structure des pages, intégration, responsive, SEO/GEO de base et mise en ligne.",
        icon: Layers3,
      },
      {
        number: "02",
        slug: "applications-metier",
        title: "Applications métier",
        description:
          "ERP, back-office, portail interne ou tableau de bord : je transforme vos règles métier en parcours simples et utilisables.",
        deliverables: "Front, API, droits d’accès, données et suivi des cas réels.",
        icon: BriefcaseBusiness,
      },
      {
        number: "03",
        slug: "automatisations-n8n",
        title: "Automatisations & intégrations",
        description:
          "Je relie vos outils et vos données avec n8n, des APIs et des traitements documentés pour supprimer les ressaisies.",
        deliverables: "Workflows, reporting, notifications, contrôles et reprise sur erreur.",
        icon: Workflow,
      },
      {
        number: "04",
        title: "Reprise & évolution technique",
        description:
          "Je reprends un existant quand il faut corriger une dette, fiabiliser une livraison ou ajouter une fonctionnalité sans repartir de zéro.",
        deliverables: "Audit ciblé, plan d’action, corrections prioritaires et mise à niveau progressive.",
        icon: GitBranch,
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
        title: "Transmission & suivi",
        description:
          "Je documente les choix, les procédures et les limites, puis je peux accompagner les corrections ou évolutions prévues.",
      },
    ] satisfies ProcessStep[],
    projectsAnchor: "#projects",
    contactLocation: "freelance-hero",
  },
  en: {
    eyebrow: "Freelance · tailored development",
    title: "Business tools that move your work forward.",
    description:
      "I mainly build showcase websites, along with business applications, n8n automations and internal APIs that remove repetitive work and make daily operations easier.",
    note:
      "A large part of my freelance work concerns showcase websites. I work from scoping to production, with documentation your team can take over.",
    location: "Based in Reims, I work remotely with teams across France.",
    primaryCta: "Discuss the project",
    secondaryCta: "See selected work",
    servicesTitle: "What I can take on",
    servicesIntro:
      "A large part of my engagements concerns showcase websites. I also take on business tools and automations with a clear scope and a usable deliverable.",
    services: [
      {
        number: "01",
        slug: "sites-vitrines",
        title: "Showcase websites & online presence",
        description:
          "I build clear, fast and responsive showcase websites that present a business, its services and its work.",
        deliverables: "Page structure, implementation, responsive behaviour, baseline SEO/GEO and release.",
        icon: Layers3,
      },
      {
        number: "02",
        slug: "applications-metier",
        title: "Business applications",
        description:
          "ERP, back office, internal portal or dashboard: I turn business rules into clear, usable journeys.",
        deliverables: "Frontend, API, access rules, data and real-world workflow coverage.",
        icon: BriefcaseBusiness,
      },
      {
        number: "03",
        slug: "automatisations-n8n",
        title: "Automation & integrations",
        description:
          "I connect tools and data with n8n, APIs and documented processing to remove rekeying and repetitive work.",
        deliverables: "Workflows, reporting, notifications, checks and error recovery.",
        icon: Workflow,
      },
      {
        number: "04",
        title: "Technical takeover & evolution",
        description:
          "I take over an existing system when debt, delivery reliability or a new feature needs a controlled path forward.",
        deliverables: "Focused audit, action plan, priority fixes and staged improvements.",
        icon: GitBranch,
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
      className="section-odd relative overflow-hidden pb-16 md:pb-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[44rem] overflow-hidden sm:h-[48rem]" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>
        <div className="hero-grid-fade" />
      </div>

      <div className="container relative z-10 mx-auto w-full px-4 pt-24 md:pt-36">
        <div className="mx-auto max-w-7xl">
          <header className="max-w-4xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              {copy.eyebrow}
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              {copy.title}
            </h1>
            <div className="mt-7 h-px w-24 bg-primary/80" aria-hidden="true" />
            <p className="mt-7 max-w-3xl text-lg leading-8 text-foreground/85 md:text-xl">
              {copy.description}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
              {copy.note}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {copy.location}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="bg-cta text-cta-foreground hover:bg-cta/90">
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
                className="justify-start px-2 text-foreground/80 hover:text-primary"
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
                    className="grid gap-5 py-7 md:grid-cols-[5rem_minmax(13rem,0.7fr)_minmax(0,1fr)] md:items-start md:gap-8 md:py-9"
                  >
                    <div className="flex items-center gap-3 text-primary md:flex-col md:items-start md:gap-2">
                      <ServiceIcon className="h-5 w-5" aria-hidden="true" />
                      <span className="text-sm font-semibold tracking-[0.18em]">
                        {service.number}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold md:text-2xl">
                      {service.slug ? (
                        <Link to={`/services/${service.slug}`} className="transition-colors hover:text-primary">
                          {service.title}
                          <ArrowRight className="ml-2 inline-block h-4 w-4" aria-hidden="true" />
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

            <ol className="grid border-y border-border md:grid-cols-2 lg:grid-cols-4">
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
