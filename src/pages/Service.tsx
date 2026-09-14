import { useEffect, useMemo } from "react";
import { ArrowRight, Check, Database, LayoutTemplate, MapPin, Workflow } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFound from "@/pages/NotFound";
import { Button } from "@/components/ui/button";
import {
  getProjectPagePath,
  getServicePage,
  getServicePagePath,
  type ServicePageDefinition,
} from "@/data/site-pages";
import { allProjects } from "@/data/projects";
import { SITE_ORIGIN, useLanguage, useRouteMetadata, type PageMetadata } from "@/lib/i18n";

const metadataFor = (
  definition: ServicePageDefinition | undefined,
  slug: string | undefined,
): Record<"fr" | "en", PageMetadata> => {
  if (!definition) {
    return {
      fr: {
        title: "Page introuvable — Bastien Lopez",
        description: "La page demandée n’existe pas dans le portfolio de Bastien Lopez.",
        path: `/services/${slug ?? ""}`,
        robots: "noindex, follow",
      },
      en: {
        title: "Page not found — Bastien Lopez",
        description: "The requested page does not exist in Bastien Lopez’s portfolio.",
        path: `/services/${slug ?? ""}`,
        robots: "noindex, follow",
      },
    };
  }

  return {
    fr: {
      title: `${definition.title.fr} — Bastien Lopez`,
      description: definition.description.fr,
      path: getServicePagePath(definition.slug),
      robots: "index, follow",
    },
    en: {
      title: `${definition.title.en} — Bastien Lopez`,
      description: definition.description.en,
      path: getServicePagePath(definition.slug),
      robots: "index, follow",
    },
  };
};

const serviceSchema = (definition: ServicePageDefinition, isEnglish: boolean) => {
  const url = `${SITE_ORIGIN}${getServicePagePath(definition.slug)}`;
  const language = isEnglish ? "en-US" : "fr-FR";
  const title = isEnglish ? definition.title.en : definition.title.fr;
  const description = isEnglish ? definition.description.en : definition.description.fr;
  const faq = definition.faq.map((item) => ({
    "@type": "Question",
    name: isEnglish ? item.question.en : item.question.fr,
    acceptedAnswer: {
      "@type": "Answer",
      text: isEnglish ? item.answer.en : item.answer.fr,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: language,
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        about: { "@id": `${SITE_ORIGIN}/#person` },
        mainEntity: { "@id": `${url}#service` },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        url,
        name: title,
        description: isEnglish ? definition.intro.en : definition.intro.fr,
        provider: { "@id": `${SITE_ORIGIN}/#person` },
        areaServed: [
          { "@type": "City", name: "Reims" },
          { "@type": "Country", name: "France" },
        ],
        serviceType: title,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        url,
        inLanguage: language,
        mainEntity: faq,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Bastien Lopez", item: `${SITE_ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: isEnglish ? "Services" : "Services", item: `${SITE_ORIGIN}/freelance` },
          { "@type": "ListItem", position: 3, name: title, item: url },
        ],
      },
    ],
  };
};

const serviceSignature = {
  "sites-vitrines": {
    icon: LayoutTemplate,
    fr: {
      label: "Un site qui se lit comme votre activité",
      items: ["Structure", "Mobile", "Performance", "Publication"],
    },
    en: {
      label: "A site that reads like your business",
      items: ["Structure", "Mobile", "Performance", "Release"],
    },
  },
  "applications-metier": {
    icon: Database,
    fr: {
      label: "Un outil construit autour des règles de l’équipe",
      items: ["Rôles", "Données", "Parcours", "Transmission"],
    },
    en: {
      label: "A tool built around the team’s rules",
      items: ["Roles", "Data", "Journeys", "Handover"],
    },
  },
  "automatisations-n8n": {
    icon: Workflow,
    fr: {
      label: "Un flux visible de l’entrée à la reprise",
      items: ["Source", "n8n", "Contrôles", "Sortie", "Reprise"],
    },
    en: {
      label: "A visible flow from intake to recovery",
      items: ["Source", "n8n", "Checks", "Output", "Recovery"],
    },
  },
} as const;

const Service = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isEnglish } = useLanguage();
  const definition = getServicePage(slug);
  const metadata = useMemo(() => metadataFor(definition, slug), [definition, slug]);
  useRouteMetadata(metadata);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (!definition) {
    return <NotFound />;
  }

  const title = isEnglish ? definition.title.en : definition.title.fr;
  const description = isEnglish ? definition.description.en : definition.description.fr;
  const intro = isEnglish ? definition.intro.en : definition.intro.fr;
  const audience = isEnglish ? definition.audience.en : definition.audience.fr;
  const signature = serviceSignature[definition.slug as keyof typeof serviceSignature];
  const signatureCopy = signature?.[isEnglish ? "en" : "fr"];
  const SignatureIcon = signature?.icon;

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <a href="#main-content" className="skip-link">
        {isEnglish ? "Skip to main content" : "Aller au contenu principal"}
      </a>
      <Navbar />
      <main id="main-content">
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema(definition, isEnglish))}
        </script>
        <article className="section-odd px-4 py-20 md:py-28">
          <div className="mx-auto w-full max-w-6xl">
            <nav aria-label={isEnglish ? "Breadcrumb" : "Fil d’Ariane"} className="mb-10 text-sm text-muted-foreground">
              <Link to="/" className="transition-colors hover:text-primary">Bastien Lopez</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <Link to="/freelance" className="transition-colors hover:text-primary">{isEnglish ? "Freelance services" : "Services freelance"}</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span className="text-foreground/80">{title}</span>
            </nav>

            <header className="mx-auto max-w-4xl text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                {isEnglish ? "Freelance service" : "Service freelance"}
              </p>
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{title}</h1>
              <div className="mx-auto mt-6 h-1 w-20 bg-primary" aria-hidden="true" />
              <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-foreground/85">{description}</p>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-muted-foreground">{intro}</p>
              <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {isEnglish ? "Based in Reims · remote across France" : "Basé à Reims · interventions à distance partout en France"}
              </p>
            </header>

            {signature && signatureCopy && SignatureIcon ? (
              <section className="mt-12 border-y border-border py-6" aria-labelledby="service-signature-title">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
                  <div className="flex items-center gap-3">
                    <SignatureIcon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <h2 id="service-signature-title" className="text-lg font-semibold">{signatureCopy.label}</h2>
                  </div>
                  <ol className="grid flex-1 gap-2 sm:grid-cols-4 lg:grid-cols-5">
                    {signatureCopy.items.map((item, index) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="text-xs font-semibold tracking-[0.16em] text-primary">{String(index + 1).padStart(2, "0")}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            ) : null}

            <div className="mt-16 grid gap-6 lg:grid-cols-2">
              <section className="rounded-xl border border-border bg-card p-6 md:p-8" aria-labelledby="service-audience-title">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{isEnglish ? "For whom" : "Pour qui"}</p>
                <h2 id="service-audience-title" className="mt-3 text-2xl font-semibold">{isEnglish ? "A clear starting point" : "Un point de départ clair"}</h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">{audience}</p>
              </section>
              <section className="rounded-xl border border-border bg-card p-6 md:p-8" aria-labelledby="service-deliverables-title">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{isEnglish ? "Deliverables" : "Livrables"}</p>
                <h2 id="service-deliverables-title" className="mt-3 text-2xl font-semibold">{isEnglish ? "What you receive" : "Ce que vous recevez"}</h2>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-foreground/80">
                  {definition.deliverables.map((item) => (
                    <li key={item.fr} className="flex gap-3">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{isEnglish ? item.en : item.fr}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <section className="rounded-xl border border-border bg-card p-6 md:p-8" aria-labelledby="service-approach-title">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{isEnglish ? "Approach" : "Intervention"}</p>
                <h2 id="service-approach-title" className="mt-3 text-2xl font-semibold">{isEnglish ? "How the work moves" : "Comment la mission avance"}</h2>
                <ol className="mt-5 space-y-4">
                  {definition.approach.map((item, index) => (
                    <li key={item.fr} className="flex gap-4 border-t border-border pt-4 text-sm leading-6 text-foreground/80">
                      <span className="text-sm font-semibold tracking-[0.16em] text-primary">{String(index + 1).padStart(2, "0")}</span>
                      <span>{isEnglish ? item.en : item.fr}</span>
                    </li>
                  ))}
                </ol>
              </section>
              <section className="rounded-xl border border-border bg-card p-6 md:p-8" aria-labelledby="service-outcomes-title">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{isEnglish ? "Value delivered" : "Valeur produite"}</p>
                <h2 id="service-outcomes-title" className="mt-3 text-2xl font-semibold">{isEnglish ? "What the result should make easier" : "Ce que le résultat doit simplifier"}</h2>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-foreground/80">
                  {definition.outcomes.map((item) => (
                    <li key={item.fr} className="flex gap-3">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{isEnglish ? item.en : item.fr}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="mt-16" aria-labelledby="service-proof-title">
              <div className="mb-7">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{isEnglish ? "Related work" : "Réalisations liées"}</p>
                <h2 id="service-proof-title" className="mt-3 text-3xl font-bold tracking-tight">{isEnglish ? "See the work behind the service" : "Voir les réalisations derrière le service"}</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {definition.relatedProjectSlugs.map((projectSlug) => {
                  const project = allProjects.find((entry) => entry.id === projectSlug);
                  const routeMap: Record<string, string> = {
                    cledevoute: "/freelance#projects",
                    "eloi-coachsteo": "/freelance#projects",
                    "erp-micro-creches": "/#projects",
                    "altme-wallet-platform": "/projets/altme-wallet-platform",
                    "automatisations-n8n-reporting": "/projets/automatisations-n8n-reporting",
                    "automatisations-n8n-derush-video": "/projets/automatisations-n8n-derush-video",
                  };
                  const route = routeMap[projectSlug] ?? getProjectPagePath(projectSlug);
                  if (!route) return null;
                  const label = project?.title ?? ({
                    "altme-wallet-platform": "Altme Wallet Platform",
                    "automatisations-n8n-reporting": "Automatisations n8n — Reporting",
                    "automatisations-n8n-derush-video": "Automatisations n8n — Dérush vidéo",
                  }[projectSlug] ?? projectSlug);

                  return (
                    <Link key={projectSlug} to={route} className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/70">
                      <span className="flex items-center justify-between gap-4 font-semibold">
                        {label}
                        <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>

            <section className="mt-16" aria-labelledby="service-faq-title">
              <div className="mb-7">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">FAQ</p>
                <h2 id="service-faq-title" className="mt-3 text-3xl font-bold tracking-tight">{isEnglish ? "Questions before we start" : "Questions avant de commencer"}</h2>
              </div>
              <div className="divide-y divide-border border-y border-border">
                {definition.faq.map((item, index) => (
                  <details key={item.question.fr} open={index === 0} className="group py-5 md:py-6">
                    <summary className="cursor-pointer list-none text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:text-lg">
                      {isEnglish ? item.question.en : item.question.fr}
                    </summary>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">{isEnglish ? item.answer.en : item.answer.fr}</p>
                  </details>
                ))}
              </div>
            </section>

            <div className="mt-16 flex flex-wrap items-center justify-center gap-4 border-t border-border pt-8">
              <Button asChild size="lg" className="bg-cta text-cta-foreground hover:bg-cta/90">
                <Link to="/freelance#contact">
                  {isEnglish ? "Discuss your project" : "Parler de votre projet"}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border hover:border-primary hover:text-primary">
                <Link to="/freelance">{isEnglish ? "Back to freelance services" : "Retour aux services freelance"}</Link>
              </Button>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Service;
