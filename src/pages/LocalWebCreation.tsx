import { ArrowLeft, ArrowRight, Check, Globe2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceConditions from "@/components/ServiceConditions";
import { Button } from "@/components/ui/button";
import { getArticlePageDefinition } from "@/data/articles/pages";
import { getServicePage, serviceRelatedArticleSlugs } from "@/data/site-pages";
import { SITE_ORIGIN, useLanguage, useRouteMetadata, type PageMetadata } from "@/lib/i18n";

const localPageMetadata: Record<"fr" | "en", PageMetadata> = {
  fr: {
    title: "Création de sites internet à Reims | Bastien Lopez",
    description:
      "Création de sites internet à Reims pour entreprises, indépendants et PME : sites vitrines rapides, adaptés aux mobiles et structurés pour le SEO local.",
    path: "/creation-site-internet-reims",
    robots: "index, follow",
    keywords:
      "création site internet Reims, développeur web freelance Reims, site vitrine Reims, refonte site internet, SEO local",
    section: "Création de sites internet",
  },
  en: {
    title: "Website creation in Reims | Freelance web developer — Bastien Lopez",
    description:
      "Showcase websites for businesses and independent professionals in Reims, France and Europe, with responsive implementation and clear SEO foundations.",
    path: "/creation-site-internet-reims",
    robots: "index, follow",
    keywords:
      "website creation Reims, freelance web developer Reims, showcase website, local SEO",
    section: "Website creation",
  },
};

const localCopy = {
  fr: {
    eyebrow: "Création de sites internet · Reims",
    title: "Création de sites internet à Reims",
    description:
      "Je conçois des sites vitrines professionnels pour les entreprises, indépendants, artisans et petites équipes qui veulent présenter leur activité clairement et faciliter la prise de contact.",
    note:
      "Le projet est cadré autour de vos clients, de vos contenus et de l’action attendue. J’interviens à Reims, en France et à distance en Europe.",
    location: "Basé à Reims, France · interventions à distance en Europe",
    primaryCta: "Parler de votre site",
    secondaryCta: "Voir le périmètre complet",
    audiencesLabel: "Pour qui",
    audiencesTitle: "Une vitrine adaptée à votre activité",
    audiences: [
      "Indépendants et artisans qui ont besoin d’une présence en ligne claire.",
      "TPE et PME qui veulent structurer leur offre et leurs réalisations.",
      "Équipes qui reprennent un site existant et souhaitent le faire évoluer proprement.",
    ],
    methodLabel: "Méthode",
    methodTitle: "Une réalisation en trois étapes visibles",
    proofLabel: "Réalisations liées",
    proofTitle: "Voir des sites construits pour des activités réelles",
    proof: [
      ["Eloi CoachStéo", "/projets/eloi-coachsteo"],
      ["Clé de Voûte", "/projets/cledevoute"],
    ],
    faqLabel: "Questions fréquentes",
    faqTitle: "Avant de commencer",
    back: "Retour aux services freelance",
    freelance: "Services freelance",
    contact: "Parler du projet",
  },
  en: {
    eyebrow: "Website creation · Reims",
    title: "Website creation in Reims",
    description:
      "I build professional showcase websites for businesses, independent professionals and small teams that need a clear presentation and a direct path to contact.",
    note:
      "The project is scoped around your customers, content and expected action. I work in Reims, France and remotely across Europe.",
    location: "Based in Reims, France · remote work across Europe",
    primaryCta: "Discuss your website",
    secondaryCta: "See the full service scope",
    audiencesLabel: "Who it is for",
    audiencesTitle: "A showcase shaped around your business",
    audiences: [
      "Independent professionals and craftspeople who need a clear online presence.",
      "Small businesses that want to structure their offer and completed work.",
      "Teams taking over an existing site and looking for a controlled path forward.",
    ],
    methodLabel: "Method",
    methodTitle: "Three visible delivery steps",
    proofLabel: "Related work",
    proofTitle: "See websites built for real activities",
    proof: [
      ["Eloi CoachStéo", "/projets/eloi-coachsteo"],
      ["Clé de Voûte", "/projets/cledevoute"],
    ],
    faqLabel: "Frequently asked questions",
    faqTitle: "Before we start",
    back: "Back to freelance services",
    freelance: "Freelance services",
    contact: "Discuss the project",
  },
} as const;

const localRelatedArticleDefinitions = serviceRelatedArticleSlugs["sites-vitrines"]
  .map((slug) => getArticlePageDefinition(slug))
  .filter((article): article is NonNullable<ReturnType<typeof getArticlePageDefinition>> => Boolean(article));

const siteVitrineService = getServicePage("sites-vitrines");

if (!siteVitrineService) {
  throw new Error("The sites-vitrines service definition is required by the Reims landing page.");
}

const approachTitles = {
  fr: ["Cadrage", "Construction", "Mise en ligne"],
  en: ["Scope", "Build", "Release"],
} as const;

const localPageSchema = (isEnglish: boolean) => {
  const copy = isEnglish ? localCopy.en : localCopy.fr;
  const metadata = isEnglish ? localPageMetadata.en : localPageMetadata.fr;
  const url = `${SITE_ORIGIN}${metadata.path}`;
  const language = isEnglish ? "en-US" : "fr-FR";
  const faq = siteVitrineService.faq.map(({ question, answer }) => ({
    "@type": "Question",
    name: isEnglish ? question.en : question.fr,
    acceptedAnswer: { "@type": "Answer", text: isEnglish ? answer.en : answer.fr },
  }));
  const relatedArticles = localRelatedArticleDefinitions.map((article) => ({
    "@type": "TechArticle",
    "@id": `${SITE_ORIGIN}/notes/${article.slug}#article`,
    url: `${SITE_ORIGIN}/notes/${article.slug}`,
    name: isEnglish ? article.title.en : article.title.fr,
    inLanguage: language,
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: metadata.title,
        description: metadata.description,
        keywords: metadata.keywords,
        inLanguage: language,
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        about: { "@id": `${SITE_ORIGIN}/#person` },
        mainEntity: { "@id": `${url}#service` },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        url,
        name: isEnglish ? "Website creation in Reims" : "Création de sites internet à Reims",
        description: metadata.description,
        provider: { "@id": `${SITE_ORIGIN}/#person` },
        serviceType: [
          isEnglish ? "Showcase website" : "Site vitrine",
          isEnglish ? "Website redesign" : "Refonte de site internet",
          isEnglish ? "Local SEO foundations" : "Fondations SEO local",
        ],
        areaServed: [
          { "@type": "City", name: "Reims" },
          { "@type": "Country", name: "France" },
          { "@type": "Continent", name: "Europe" },
        ],
        audience: {
          "@type": "Audience",
          audienceType: isEnglish
            ? "Businesses, independent professionals and small teams"
            : "Entreprises, indépendants, artisans, TPE et PME",
        },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: url,
          availableLanguage: language,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: isEnglish ? "Website project scope" : "Périmètre d’un projet de site",
          itemListElement: siteVitrineService.deliverables.map((item, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: { "@type": "Service", name: isEnglish ? item.en : item.fr },
          })),
        },
        subjectOf: relatedArticles,
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
          { "@type": "ListItem", position: 2, name: copy.freelance, item: `${SITE_ORIGIN}/freelance` },
          { "@type": "ListItem", position: 3, name: copy.title, item: url },
        ],
      },
    ],
  };
};

const LocalWebCreation = () => {
  const { isEnglish } = useLanguage();
  const copy = isEnglish ? localCopy.en : localCopy.fr;
  const serviceAudience = isEnglish ? siteVitrineService.audience.en : siteVitrineService.audience.fr;
  const serviceDeliverables = siteVitrineService.deliverables;
  const serviceApproach = siteVitrineService.approach;
  const serviceOutcomes = siteVitrineService.outcomes;
  useRouteMetadata(localPageMetadata);

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <a href="#main-content" className="skip-link">
        {isEnglish ? "Skip to main content" : "Aller au contenu principal"}
      </a>
      <Navbar />
      <main id="main-content">
        <script type="application/ld+json">{JSON.stringify(localPageSchema(isEnglish))}</script>
        <article className="section-odd px-4 py-16 md:py-24">
          <div className="mx-auto w-full max-w-7xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
              <Link
                to="/freelance"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                {copy.back}
              </Link>
              <Link to="/freelance" className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground hover:text-primary">
                {copy.freelance}
              </Link>
            </div>

            <header className="grid gap-10 border-b border-border py-12 md:py-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-end">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">{copy.eyebrow}</p>
                <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">{copy.title}</h1>
                <div className="mt-6 h-px w-24 bg-primary" aria-hidden="true" />
                <p className="mt-7 max-w-3xl text-lg leading-8 text-foreground/85">{copy.description}</p>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">{copy.note}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-cta text-cta-foreground hover:bg-cta/90">
                    <Link to="/freelance#contact">
                      {copy.primaryCta}
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-border hover:border-primary hover:text-primary">
                    <a href="#local-scope">{copy.secondaryCta}</a>
                  </Button>
                </div>
              </div>
              <div className="border-l border-primary/60 pl-6 lg:max-w-sm lg:justify-self-end">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{isEnglish ? "Local service" : "Service local"}</p>
                <p className="mt-3 text-base leading-7 text-foreground/85">{serviceAudience}</p>
                <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {copy.location}
                </p>
              </div>
            </header>

            <ServiceConditions service={siteVitrineService} />

            <section className="grid border-b border-border lg:grid-cols-2" aria-label={isEnglish ? "Website audience and foundations" : "Public et fondations du site"}>
              <section className="py-10 lg:border-r lg:border-border lg:pr-10" aria-labelledby="local-audiences-title">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{copy.audiencesLabel}</p>
                <h2 id="local-audiences-title" className="mt-3 text-3xl font-bold tracking-tight">{copy.audiencesTitle}</h2>
                <ul className="mt-6 divide-y divide-border border-y border-border">
                  {copy.audiences.map((item) => (
                    <li key={item} className="flex gap-3 py-4 text-sm leading-6 text-foreground/80">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="py-10 lg:pl-10" aria-labelledby="local-foundations-title">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{isEnglish ? "Deliverables" : "Livrables"}</p>
                <h2 id="local-foundations-title" className="mt-3 text-3xl font-bold tracking-tight">{isEnglish ? "What you receive" : "Ce que vous recevez"}</h2>
                <ul className="mt-6 divide-y divide-border border-y border-border">
                  {serviceDeliverables.map((item) => (
                    <li key={item.fr} className="flex gap-3 py-4 text-sm leading-6 text-foreground/80">
                      <Globe2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{isEnglish ? item.en : item.fr}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </section>

            <section id="local-scope" className="mt-16" aria-labelledby="local-method-title">
              <div className="mb-7">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{copy.methodLabel}</p>
                <h2 id="local-method-title" className="mt-3 text-3xl font-bold tracking-tight">{copy.methodTitle}</h2>
              </div>
              <ol className="grid border-y border-border md:grid-cols-3">
                {serviceApproach.map((item, index) => (
                  <li key={item.fr} className={`py-7 md:px-6 md:py-8 ${index > 0 ? "border-t border-border md:border-l md:border-t-0" : ""}`}>
                    <p className="text-sm font-semibold tracking-[0.18em] text-primary">{String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-4 text-xl font-semibold">{approachTitles[isEnglish ? "en" : "fr"][index]}</h3>
                    <p className="mt-3 text-sm leading-6 text-foreground/75">{isEnglish ? item.en : item.fr}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-16" aria-labelledby="local-outcomes-title">
              <div className="mb-7">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{isEnglish ? "Outcomes" : "Résultats"}</p>
                <h2 id="local-outcomes-title" className="mt-3 text-3xl font-bold tracking-tight">{isEnglish ? "What the result should make easier" : "Ce que le résultat doit simplifier"}</h2>
              </div>
              <ul className="grid border-y border-border md:grid-cols-3">
                {serviceOutcomes.map((item, index) => (
                  <li key={item.fr} className={`flex gap-3 py-6 text-sm leading-6 text-foreground/80 md:px-6 ${index > 0 ? "border-t border-border md:border-l md:border-t-0" : ""}`}>
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{isEnglish ? item.en : item.fr}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-16" aria-labelledby="local-proof-title">
              <div className="mb-7">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{copy.proofLabel}</p>
                <h2 id="local-proof-title" className="mt-3 text-3xl font-bold tracking-tight">{copy.proofTitle}</h2>
              </div>
              <div className="divide-y divide-border border-y border-border">
                {copy.proof.map(([title, href], index) => (
                  <Link key={href} to={href} className="group flex items-center justify-between gap-5 py-5 transition-colors hover:text-primary">
                    <span className="flex items-center gap-4 font-semibold">
                      <span className="text-xs font-semibold tracking-[0.16em] text-primary">{String(index + 1).padStart(2, "0")}</span>
                      {title}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-16" aria-labelledby="local-notes-title" data-editorial-cluster="sites-vitrines">
                <div className="mb-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{isEnglish ? "Related notes" : "Notes liées"}</p>
                  <h2 id="local-notes-title" className="mt-3 text-3xl font-bold tracking-tight">{isEnglish ? "Prepare a professional website" : "Préparer un site professionnel"}</h2>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
                    {isEnglish
                      ? "Two notes to clarify scope, content and release before starting a new website or redesign."
                      : "Deux notes pour clarifier le périmètre, les contenus et la mise en ligne avant de lancer une création ou une refonte."}
                  </p>
                </div>
                <div className="divide-y divide-border border-y border-border">
                  {localRelatedArticleDefinitions.map((article) => (
                    <Link
                      key={article.slug}
                      to={`/notes/${article.slug}`}
                      className="group flex items-start justify-between gap-5 py-5 transition-colors hover:text-primary"
                    >
                      <span>
                        <span className="block font-semibold">{isEnglish ? article.title.en : article.title.fr}</span>
                        <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                          {isEnglish ? article.description.en : article.description.fr}
                        </span>
                      </span>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </section>

            <section className="mt-16" aria-labelledby="local-faq-title">
              <div className="mb-7">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{copy.faqLabel}</p>
                <h2 id="local-faq-title" className="mt-3 text-3xl font-bold tracking-tight">{copy.faqTitle}</h2>
              </div>
              <div className="divide-y divide-border border-y border-border">
                {siteVitrineService.faq.map(({ question, answer }, index) => (
                  <details key={question.fr} open={index === 0} className="group py-5 md:py-6">
                    <summary className="cursor-pointer list-none text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:text-lg">{isEnglish ? question.en : question.fr}</summary>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">{isEnglish ? answer.en : answer.fr}</p>
                  </details>
                ))}
              </div>
            </section>

            <div className="mt-16 flex flex-wrap items-center justify-center gap-4 border-t border-border pt-8">
              <Button asChild size="lg" className="bg-cta text-cta-foreground hover:bg-cta/90">
                <Link to="/freelance#contact">
                  {copy.contact}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border hover:border-primary hover:text-primary">
                <Link to="/freelance">{copy.back}</Link>
              </Button>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default LocalWebCreation;
