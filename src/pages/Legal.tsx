import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_ORIGIN, useLanguage, usePageMetadata } from "@/lib/i18n";

const legalSchema = (isEnglish: boolean) => {
  const url = `${SITE_ORIGIN}/mentions-legales`;
  const title = isEnglish ? "Legal notice — Bastien Lopez" : "Mentions légales — Bastien Lopez";
  const description = isEnglish
    ? "Legal, hosting and audience measurement information for Bastien Lopez’s portfolio."
    : "Informations légales, hébergement et mesure d’audience du portfolio de Bastien Lopez.";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: isEnglish ? "en-US" : "fr-FR",
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        about: { "@id": `${SITE_ORIGIN}/#person` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Bastien Lopez", item: `${SITE_ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: isEnglish ? "Legal notice" : "Mentions légales", item: url },
        ],
      },
    ],
  };
};

const Legal = () => {
  const { isEnglish } = useLanguage();
  usePageMetadata('legal');

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <a href="#main-content" className="skip-link">
        {isEnglish ? "Skip to main content" : "Aller au contenu principal"}
      </a>
      <Navbar />
      <main id="main-content">
        <script type="application/ld+json">{JSON.stringify(legalSchema(isEnglish))}</script>
        <article className="section-odd px-4 py-20 md:py-28">
          <div className="mx-auto w-full max-w-7xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
              <Link
                to="/"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                {isEnglish ? "Back to the portfolio" : "Retour au portfolio"}
              </Link>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {isEnglish ? "Legal information" : "Informations légales"}
              </p>
            </div>

            <header className="border-b border-border py-12 md:py-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                {isEnglish ? "Site information" : "Informations du site"}
              </p>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                {isEnglish ? "Legal notice" : "Mentions légales"}
              </h1>
              <div className="mt-6 h-px w-24 bg-primary" aria-hidden="true" />
              <p className="mt-6 text-base text-muted-foreground">
                {isEnglish ? "Last updated: 10 September 2026." : "Dernière mise à jour : 10 septembre 2026."}
              </p>
            </header>

            <div className="divide-y divide-border border-b border-border text-sm leading-7 text-foreground/85">
              <section className="grid gap-6 py-9 md:grid-cols-[minmax(12rem,0.32fr)_minmax(0,1fr)] md:gap-12 md:py-12" aria-labelledby="legal-publisher-title">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-primary">01</p>
                  <h2 id="legal-publisher-title" className="mt-3 text-2xl font-semibold text-foreground">
                    {isEnglish ? "Publisher" : "Éditeur du site"}
                  </h2>
                </div>
                <div>
                  <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-[minmax(0,10rem)_1fr]">
                    <dt className="font-medium text-foreground">{isEnglish ? "Name" : "Nom"}</dt>
                    <dd>Bastien Lopez</dd>
                    <dt className="font-medium text-foreground">{isEnglish ? "Activity" : "Activité"}</dt>
                    <dd>{isEnglish ? "Independent full-stack developer" : "Développeur full-stack indépendant"}</dd>
                    <dt className="font-medium text-foreground">{isEnglish ? "Location" : "Localisation"}</dt>
                    <dd>{isEnglish ? "Reims, France · remote work" : "Reims, France · interventions à distance"}</dd>
                    <dt className="font-medium text-foreground">Email</dt>
                    <dd>
                      <a className="text-primary underline-offset-4 hover:underline" href="mailto:bastien.lopez40@gmail.com">
                        bastien.lopez40@gmail.com
                      </a>
                    </dd>
                  </dl>
                  <p className="mt-6 max-w-3xl text-muted-foreground">
                    {isEnglish
                      ? "Business registration details, when required for a service, are provided on the corresponding quote and invoice."
                      : "Les informations d’immatriculation de l’activité, lorsqu’elles sont requises pour une prestation, figurent sur le devis et la facture correspondants."}
                  </p>
                </div>
              </section>

              <section className="grid gap-6 py-9 md:grid-cols-[minmax(12rem,0.32fr)_minmax(0,1fr)] md:gap-12 md:py-12" aria-labelledby="legal-hosting-title">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-primary">02</p>
                  <h2 id="legal-hosting-title" className="mt-3 text-2xl font-semibold text-foreground">
                    {isEnglish ? "Hosting" : "Hébergement"}
                  </h2>
                </div>
                <div>
                  <p>
                    OVHcloud (OVH SAS)
                    <br />
                    2 rue Kellermann
                    <br />
                    59100 Roubaix, France
                  </p>
                  <p className="mt-5">
                    <a
                      className="text-primary underline-offset-4 hover:underline"
                      href="https://www.ovhcloud.com/fr/terms-and-conditions/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {isEnglish ? "OVHcloud legal information" : "Mentions légales OVHcloud"}
                    </a>
                  </p>
                </div>
              </section>

              <section className="grid gap-6 py-9 md:grid-cols-[minmax(12rem,0.32fr)_minmax(0,1fr)] md:gap-12 md:py-12" aria-labelledby="legal-data-title">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-primary">03</p>
                  <h2 id="legal-data-title" className="mt-3 text-2xl font-semibold text-foreground">
                    {isEnglish ? "Audience measurement and data" : "Mesure d’audience et données"}
                  </h2>
                </div>
                <p className="max-w-3xl">
                  {isEnglish
                    ? "The domain is monitored through Google Search Console for search visibility. This site has no account, contact form or user content submission, and this version does not load a client-side audience measurement script."
                    : "Le domaine est suivi dans Google Search Console pour sa visibilité dans les résultats de recherche. Ce site ne propose ni compte, ni formulaire de contact, ni dépôt de contenu utilisateur, et cette version ne charge pas de script de mesure d’audience côté navigateur."}
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;
