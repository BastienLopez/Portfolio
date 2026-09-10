import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";

const Legal = () => {
  const { isEnglish } = useLanguage();

  return (
    <main className="min-h-screen bg-background px-4 py-12 text-foreground md:py-20">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {isEnglish ? "Back to the portfolio" : "Retour au portfolio"}
        </Link>

        <header className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            {isEnglish ? "Legal information" : "Informations légales"}
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {isEnglish ? "Legal notice" : "Mentions légales"}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            {isEnglish ? "Last updated: 10 September 2026." : "Dernière mise à jour : 10 septembre 2026."}
          </p>
        </header>

        <div className="space-y-8 text-sm leading-7 text-foreground/80">
          <section className="rounded-xl border border-border bg-card p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              {isEnglish ? "Publisher" : "Éditeur du site"}
            </h2>
            <dl className="grid gap-3 sm:grid-cols-[minmax(0,10rem)_1fr]">
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
            <p className="mt-5 text-muted-foreground">
              {isEnglish
                ? "Business registration details, when required for a service, are provided on the corresponding quote and invoice."
                : "Les informations d’immatriculation de l’activité, lorsqu’elles sont requises pour une prestation, figurent sur le devis et la facture correspondants."}
            </p>
          </section>

          <section className="rounded-xl border border-border bg-card p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              {isEnglish ? "Hosting" : "Hébergement"}
            </h2>
            <p>
              OVHcloud (OVH SAS)
              <br />
              2 rue Kellermann
              <br />
              59100 Roubaix, France
            </p>
            <p className="mt-4">
              <a
                className="text-primary underline-offset-4 hover:underline"
                href="https://www.ovhcloud.com/fr/terms-and-conditions/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {isEnglish ? "OVHcloud legal information" : "Mentions légales OVHcloud"}
              </a>
            </p>
          </section>

          <section className="rounded-xl border border-border bg-card p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              {isEnglish ? "Audience measurement and data" : "Mesure d’audience et données"}
            </h2>
            <p>
              {isEnglish
                ? "The domain is monitored through Google Search Console for search visibility. This site has no account, contact form or user content submission, and this version does not load a client-side audience measurement script."
                : "Le domaine est suivi dans Google Search Console pour sa visibilité dans les résultats de recherche. Ce site ne propose ni compte, ni formulaire de contact, ni dépôt de contenu utilisateur, et cette version ne charge pas de script de mesure d’audience côté navigateur."}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Legal;
