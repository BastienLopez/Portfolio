import {
  CheckCircle2,
  ChevronDown,
  Clock3,
  Gauge,
  Layers,
  Layers3,
  PenSquare,
  ShieldCheck,
  Target,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";

const Freelance = () => {
  const { isEnglish } = useLanguage();

  const copy = isEnglish
    ? {
        heroTitle: "Websites, business applications, APIs and automation for SMEs",
        heroDescription:
          "I build websites, web applications and tailored tools to structure operations, make workflows reliable and reduce manual tasks.",
        heroNote: "Clear scoping, iterative development, clean production releases and optional maintenance.",
        needCta: "Describe my need",
        casesCta: "View project examples",
        fitTitle: "A good fit when...",
        whatTitle: "What I do in practice",
        labels: {
          need: "Need",
          solution: "Approach",
          expectedResult: "Expected outcome",
          result: "Outcome",
        },
        processSummaryTitle: "Delivery and guarantees",
        processSummaryText: "Scoping, follow-up, delivery and collaboration commitments.",
        processTitle: "How an engagement works",
        guaranteesTitle: "Guarantees",
        offersTitle: "Offers matched to your level of need",
        offersText: "Each offer can be adjusted after scoping to your business constraints and budget.",
        casesTitle: "Mission examples",
        casesText: "Anonymised generic cases to illustrate the approach and outcomes.",
      }
    : {
        heroTitle: "Sites vitrines, applications métier, API et automatisations pour PME/TPE",
        heroDescription:
          "Je conçois des sites vitrines, des applications web et des outils sur mesure pour structurer vos opérations, fiabiliser vos flux et réduire les tâches manuelles.",
        heroNote: "Cadrage clair, développement itératif, mise en production propre, maintenance possible.",
        needCta: "Décrire mon besoin",
        casesCta: "Voir des exemples de missions",
        fitTitle: "Bien adapté si...",
        whatTitle: "Ce que je fais concrètement",
        labels: {
          need: "Besoin",
          solution: "Solution",
          expectedResult: "Résultat attendu",
          result: "Résultat",
        },
        processSummaryTitle: "Déroulement et garanties",
        processSummaryText: "Cadrage, suivi, livraison et engagements de collaboration.",
        processTitle: "Comment se déroule une mission",
        guaranteesTitle: "Garanties",
        offersTitle: "Offres adaptées à votre niveau de besoin",
        offersText: "Chaque offre peut être ajustée après cadrage selon vos contraintes métier et budget.",
        casesTitle: "Exemples de missions",
        casesText: "Cas génériques anonymisés pour illustrer la démarche et les résultats obtenus.",
      };

  const businessTags = isEnglish
    ? ["Websites", "Web applications", "Business tools", "APIs & integrations", "Automation", "MVP", "Tailored ERP"]
    : ["Site vitrine", "Application web", "App métier", "API & intégrations", "Automatisation", "MVP", "ERP sur mesure"];

  const proofItems = isEnglish
    ? [
        { label: "Quick initial estimate", value: "Within 48h", note: "After a focused first exchange" },
        { label: "Engagement model", value: "One-off or ongoing", note: "Focused delivery or ongoing support" },
        { label: "Clear deliverables", value: "Documentation & handover", note: "Transferable output for your team" },
        { label: "Controlled execution", value: "Structured development", note: "Clear steps and regular follow-up" },
      ]
    : [
        { label: "Estimation initiale rapide", value: "Sous 48h", note: "Après un premier échange cadré" },
        { label: "Mode d'intervention", value: "Ponctuel ou continu", note: "Mission ciblée ou accompagnement" },
        { label: "Livrables clairs", value: "Documentation & passation", note: "Transmission exploitable par votre équipe" },
        { label: "Exécution maîtrisée", value: "Développement structuré", note: "Étapes claires et suivi régulier" },
      ];

  const qualificationItems = isEnglish
    ? [
        "Replace a manual process (spreadsheets, emails, rekeying)",
        "Centralise business data scattered across several tools",
        "Launch a useful MVP quickly",
        "Stabilise an existing tool without starting from scratch",
      ]
    : [
        "Remplacer un process manuel (Excel, e-mails, ressaisies)",
        "Centraliser des données métier dispersées",
        "Lancer un MVP utile rapidement",
        "Fiabiliser un outil existant sans repartir de zéro",
      ];

  const services = isEnglish
    ? [
        {
          need: "Build a clear online presence or structure a business digital need",
          solution: "Design a professional showcase website or web application aligned with your goals",
          result: "A more credible image, clearer customer journey and a foundation ready to evolve",
        },
        {
          need: "Centralise data scattered across several tools",
          solution: "Develop an API or back office to unify flows and business rules",
          result: "A reliable source of truth for decisions without wasted time",
        },
        {
          need: "Automate repetitive, low-value actions",
          solution: "Set up robust and traceable automations",
          result: "Time freed for work with higher business impact",
        },
        {
          need: "Secure and stabilise a fragile technical foundation",
          solution: "Industrialise delivery with a clean, maintainable architecture",
          result: "A durable foundation that can evolve without uncontrolled technical debt",
        },
      ]
    : [
        {
          need: "Créer une présence en ligne claire (site vitrine) ou structurer un besoin digital métier",
          solution: "Concevoir un site vitrine professionnel ou une application web adaptée à vos objectifs",
          result: "Une image plus crédible, plus de clarté pour vos clients et un socle prêt à évoluer",
        },
        {
          need: "Centraliser des données dispersées entre plusieurs outils",
          solution: "Développer une API ou un back-office pour unifier les flux et les règles métier",
          result: "Une source de vérité fiable pour piloter sans perte de temps",
        },
        {
          need: "Automatiser des actions répétitives à faible valeur",
          solution: "Mettre en place des automatisations robustes et traçables",
          result: "Du temps libéré pour les tâches à impact business",
        },
        {
          need: "Sécuriser et fiabiliser une base technique fragile",
          solution: "Industrialiser la mise en production avec une architecture propre et maintenable",
          result: "Un socle durable pour évoluer sans dette technique incontrôlée",
        },
      ];

  const processSteps = isEnglish
    ? [
        "Scope business priorities, constraints and the useful boundary",
        "Agree on a technical approach and a reasoned estimate",
        "Build iteratively with regular checkpoints",
        "Release cleanly, document the work and hand it over",
        "Provide optional maintenance and planned improvements",
      ]
    : [
        "Cadrage du besoin, des priorités métier et du périmètre utile",
        "Proposition technique et estimation argumentée",
        "Développement itératif avec points de suivi réguliers",
        "Mise en production propre, documentation et passation",
        "Maintenance optionnelle et évolutions planifiées",
      ];

  const guarantees = isEnglish
    ? [
        "Clear communication without unnecessary jargon",
        "Maintainable, documented and transferable code",
        "Security and sensitive data treated seriously",
        "Continuous visibility on progress and next steps",
      ]
    : [
        "Communication claire, sans jargon inutile",
        "Code maintenable, documenté et transmissible",
        "Sécurité et données sensibles prises au sérieux",
        "Visibilité continue sur l'avancement et les prochaines étapes",
      ];

  const packages = isEnglish
    ? [
        {
          title: "Starter",
          audience: "For whom: a founder or SME that needs to launch a useful first scope quickly",
          includes: [
            "Quick scoping and prioritisation",
            "Premium showcase website, focused MVP or key business module",
            "Usable delivery with a clean technical foundation",
          ],
          mode: "Collaboration model: fixed scope",
          delay: "Indicative timeline: 1 to 3 weeks",
        },
        {
          title: "Business",
          audience: "For whom: a company that wants to structure a complete and reliable business tool",
          includes: [
            "Complete business application (front end and back end)",
            "API, roles and permissions, dashboard and business logic",
            "Regular follow-up and iterative deliveries",
          ],
          mode: "Collaboration model: staged or iterative fixed scope",
          delay: "Indicative timeline: 4 to 8 weeks",
          highlighted: true,
        },
        {
          title: "ERP-Scale",
          audience: "For whom: an organisation with multi-process needs, system integrations and robustness requirements",
          includes: [
            "Tailored ERP and advanced workflows",
            "API integrations, sensitive data and auditability",
            "Long-term roadmap and technical governance",
          ],
          mode: "Collaboration model: daily rate or staged scope",
          delay: "Indicative timeline: 2 to 6 months",
        },
      ]
    : [
        {
          title: "Starter",
          audience: "Pour qui : porteur de projet ou PME qui doit lancer vite un premier périmètre utile",
          includes: ["Cadrage rapide et priorisation", "Site vitrine premium, MVP ciblé ou module métier clé", "Livraison exploitable avec base technique propre"],
          mode: "Mode de collaboration : forfait",
          delay: "Délai indicatif : 1 à 3 semaines",
        },
        {
          title: "Business",
          audience: "Pour qui : entreprise qui veut structurer un outil métier complet et fiable",
          includes: ["Application métier complète (front + back)", "API, rôles/droits, dashboard, logique métier", "Suivi régulier et livraisons itératives"],
          mode: "Mode de collaboration : forfait par lots ou forfait itératif",
          delay: "Délai indicatif : 4 à 8 semaines",
          highlighted: true,
        },
        {
          title: "ERP-Scale",
          audience: "Pour qui : structure avec besoins multi-process, intégrations SI et enjeux de robustesse",
          includes: ["ERP sur mesure et workflows avancés", "Intégrations API, données sensibles, auditabilité", "Plan d'évolution long terme et gouvernance technique"],
          mode: "Mode de collaboration : TJM ou forfait par lots",
          delay: "Délai indicatif : 2 à 6 mois",
        },
      ];

  const caseStudies = isEnglish
    ? [
        {
          title: "Showcase website to present a business",
          need: "Clarify the offer and strengthen online credibility.",
          solution: "Design a modern, responsive showcase website optimised for conversion.",
          result: "A professional, readable web presence ready to generate enquiries.",
        },
        {
          title: "Internal tool to replace spreadsheet tracking",
          need: "Data entry and validation scattered across files and emails.",
          solution: "Centralised business application with roles, status tracking and history.",
          result: "More reliable processes, fewer errors and better traceability.",
        },
        {
          title: "Weekly reporting automation",
          need: "Time-consuming manual reports every week.",
          solution: "Automated pipeline for collecting, consolidating and generating reports.",
          result: "Less operational time spent and earlier reporting.",
        },
        {
          title: "Business MVP to validate a need quickly",
          need: "Validate a product idea without committing a large budget.",
          solution: "MVP focused on the priority journey, with an architecture ready to evolve.",
          result: "Faster field feedback and better-informed product decisions.",
        },
      ]
    : [
        {
          title: "Création de site vitrine pour présenter une activité",
          need: "Clarifier l'offre et renforcer la crédibilité en ligne.",
          solution: "Conception d'un site vitrine moderne, responsive et optimisé pour la conversion.",
          result: "Une présence web professionnelle, lisible et prête à générer des prises de contact.",
        },
        {
          title: "Outil interne pour remplacer un suivi Excel",
          need: "Saisie et validation dispersées dans des fichiers et e-mails.",
          solution: "Application métier centralisée avec rôles, suivi d'état et historique.",
          result: "Processus plus fiable, moins d'erreurs et meilleure traçabilité.",
        },
        {
          title: "Automatisation de reporting hebdomadaire",
          need: "Rapports manuels chronophages chaque semaine.",
          solution: "Pipeline automatisé de collecte, consolidation et génération des rapports.",
          result: "Temps opérationnel réduit et reporting disponible plus tôt.",
        },
        {
          title: "MVP métier pour valider un besoin rapidement",
          need: "Valider une idée produit sans immobiliser un gros budget.",
          solution: "MVP ciblé sur le parcours prioritaire, architecture prête à évoluer.",
          result: "Premiers retours terrain plus vite et décisions produit mieux informées.",
        },
      ];

  const deliveryPrinciples = isEnglish
    ? [
        { title: "Clear scope", text: "Priorities, deliverables and constraints defined together." },
        { title: "Iterative delivery", text: "Regular checkpoints and visible progress." },
        { title: "Handover", text: "Documented, transferable deliverables for your team." },
        { title: "Optional support", text: "Follow-up, fixes and planned improvements when needed." },
      ]
    : [];

  return (
    <section id="freelance" className="relative bg-secondary/20 section-odd pb-8 pt-20 md:pb-12 md:pt-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 animate-fade-in text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">{copy.heroTitle}</h1>
            <div className="mx-auto mb-6 h-1 w-20 bg-primary" />
            <p className="mx-auto max-w-3xl text-base leading-7 text-foreground/85 md:text-lg md:leading-relaxed">{copy.heroDescription}</p>
            <p className="mx-auto mt-4 max-w-4xl text-sm text-foreground/75">{copy.heroNote}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {businessTags.map((tag) => (
                <span key={tag} className="rounded-md border border-border bg-secondary px-3 py-1 text-xs text-foreground/75">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild className="bg-cta text-cta-foreground hover:bg-cta/90">
                <a href="#contact" onClick={() => trackEvent("cta_click", { location: "freelance", cta: "contact" })}>
                  <PenSquare className="mr-2 h-4 w-4" />
                  {copy.needCta}
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="#freelance-cases" onClick={() => trackEvent("cta_click", { location: "freelance", cta: "cases" })}>
                  {copy.casesCta}
                </a>
              </Button>
            </div>
          </div>

          {isEnglish && (
            <div className="mb-12 space-y-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {deliveryPrinciples.map((item) => (
                    <Card key={item.title} className="border-border bg-transparent p-5 text-center shadow-none">
                    <p className="text-lg font-semibold text-foreground">{item.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
                  </Card>
                ))}
              </div>
              <Card className="border-border bg-transparent p-6 shadow-none md:p-8">
                <h3 className="text-2xl font-bold">Services and delivery approach</h3>
                <div className="mt-5 grid gap-5 text-sm leading-6 text-foreground/80 md:grid-cols-2">
                  <p><strong className="text-foreground">Websites and MVPs.</strong> Clear public-facing websites and focused product scopes for validating a concrete need.</p>
                  <p><strong className="text-foreground">Business applications and APIs.</strong> Tools to centralise business data, workflows and access rules.</p>
                  <p><strong className="text-foreground">Automation.</strong> API and workflow integrations that reduce repetitive manual operations.</p>
                  <p><strong className="text-foreground">Technical foundations.</strong> Maintainable code, Docker, CI/CD and documentation adapted to the scope.</p>
                </div>
              </Card>
              <Card className="border-border bg-transparent p-6 shadow-none md:p-8">
                <h3 className="text-2xl font-bold">How a project runs</h3>
                <ol className="mt-4 grid gap-2 text-sm text-foreground/80 md:grid-cols-2">
                  <li>1. Scope business priorities and useful boundaries.</li>
                  <li>2. Agree on a technical approach and estimate.</li>
                  <li>3. Build iteratively with regular checkpoints.</li>
                  <li>4. Deliver, document and hand over the work.</li>
                </ol>
              </Card>
            </div>
          )}

            <div className="mb-12 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {proofItems.map((item) => (
              <Card key={item.label} className="flex h-full min-w-0 flex-col border-border bg-transparent p-5 text-center shadow-none md:p-6">
                <p className="mb-1 text-2xl font-bold text-primary">{item.value}</p>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="mt-auto pt-2 text-xs text-foreground/60">{item.note}</p>
              </Card>
            ))}
          </div>

          <Card className="mb-12 border-border bg-transparent p-5 shadow-none md:p-6">
            <div className="mb-4 flex items-center gap-3">
              <Gauge className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-bold">{copy.fitTitle}</h3>
            </div>
            <ul className="grid gap-2 text-sm leading-6 text-foreground/80 md:grid-cols-2">
              {qualificationItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="mb-12 border-border bg-transparent p-5 shadow-none md:p-6">
            <div className="mb-6 flex items-center gap-3">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="text-2xl font-bold">{copy.whatTitle}</h3>
            </div>
            <div className="grid items-stretch gap-4 md:grid-cols-2">
              {services.map((service) => (
                <div key={service.need} className="flex h-full flex-col rounded-md border border-border bg-secondary/20 p-5 md:p-6">
                  <div className="space-y-4">
                    <div>
                      <p className="mb-1 text-xs uppercase tracking-wide text-foreground/60">{copy.labels.need}</p>
                      <p className="text-sm leading-6 text-foreground md:min-h-[72px]">{service.need}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs uppercase tracking-wide text-foreground/60">{copy.labels.solution}</p>
                      <p className="text-sm leading-6 text-foreground/85 md:min-h-[72px]">{service.solution}</p>
                    </div>
                  </div>
                  <div className="mt-auto border-t border-border/60 pt-4">
                    <p className="mb-1 text-xs uppercase tracking-wide text-foreground/60">{copy.labels.expectedResult}</p>
                    <p className="text-sm leading-6 text-primary">{service.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <details className="group mb-12 rounded-md border border-border bg-transparent">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 md:p-6">
              <span>
                <span className="block text-2xl font-bold">{copy.processSummaryTitle}</span>
                <span className="mt-1 block text-sm text-foreground/70">{copy.processSummaryText}</span>
              </span>
              <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" />
            </summary>
            <div className="grid items-stretch gap-6 border-t border-border p-5 md:p-6 lg:grid-cols-3">
              <Card className="h-full border-border bg-transparent p-5 shadow-none md:col-span-2 md:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <Layers className="h-5 w-5 text-primary" />
                  <h3 className="text-2xl font-bold">{copy.processTitle}</h3>
                </div>
                <ol className="space-y-3 leading-6 text-foreground/80">
                  {processSteps.map((step, index) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">{index + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </Card>

              <Card className="flex h-full flex-col border-border bg-transparent p-5 shadow-none md:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                  <h3 className="text-xl font-bold">{copy.guaranteesTitle}</h3>
                </div>
                <ul className="flex flex-1 flex-col justify-between gap-4 leading-7 text-foreground/80 md:gap-5">
                  {guarantees.map((item) => (
                    <li key={item} className="flex items-start gap-2 py-1">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </details>

          <div className="mb-6">
            <h3 className="mb-2 text-2xl font-bold md:text-3xl">{copy.offersTitle}</h3>
            <p className="text-foreground/70">{copy.offersText}</p>
          </div>

          <div className="mb-12 grid items-stretch gap-6 md:grid-cols-3">
            {packages.map((item) => (
              <Card
                key={item.title}
                className={
                  item.highlighted
                    ? "flex h-full flex-col border-primary bg-transparent p-5 shadow-none md:p-6"
                    : "flex h-full flex-col border-border bg-transparent p-5 shadow-none md:p-6"
                }
              >
                <div className="mb-3 flex min-h-[52px] items-start gap-2">
                  <Layers3 className="h-4 w-4 text-primary" />
                  <h4 className="text-xl font-semibold leading-snug">{item.title}</h4>
                </div>
                <p className="mb-3 text-sm leading-6 text-foreground/80 md:min-h-[72px]">{item.audience}</p>
                <ul className="mb-4 space-y-2">
                  {item.includes.map((line) => (
                    <li key={line} className="flex items-start gap-2 text-sm text-foreground/80">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="leading-6">{line}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto border-t border-border/60 pt-4">
                  <p className="mb-1 text-sm font-medium leading-6 text-primary">{item.mode}</p>
                  <p className="flex items-center gap-2 text-sm font-medium leading-6 text-accent">
                    <Clock3 className="h-4 w-4" />
                    {item.delay}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <details id="freelance-cases" className="group rounded-md border border-border bg-transparent">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 md:p-6">
              <span>
                <span className="block text-2xl font-bold md:text-3xl">{copy.casesTitle}</span>
                <span className="mt-1 block text-sm text-foreground/70">{copy.casesText}</span>
              </span>
              <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" />
            </summary>
            <div className="grid items-stretch gap-6 border-t border-border p-5 md:grid-cols-2 md:p-6 lg:grid-cols-4">
              {caseStudies.map((item) => (
                <Card key={item.title} className="flex h-full flex-col border-border bg-transparent p-5 shadow-none md:p-6">
                  <h4 className="mb-4 min-h-[72px] text-lg font-semibold leading-snug">{item.title}</h4>
                  <div className="flex flex-1 flex-col space-y-3 text-sm">
                    <div>
                      <p className="mb-1 text-xs uppercase tracking-wide text-foreground/60">{copy.labels.need}</p>
                      <p className="leading-6 text-foreground/85 md:min-h-[72px]">{item.need}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs uppercase tracking-wide text-foreground/60">{copy.labels.solution}</p>
                      <p className="leading-6 text-foreground/85 md:min-h-[96px]">{item.solution}</p>
                    </div>
                    <div className="mt-auto border-t border-border/60 pt-3">
                      <p className="mb-1 text-xs uppercase tracking-wide text-foreground/60">{copy.labels.result}</p>
                      <p className="leading-6 text-primary">{item.result}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
};

export default Freelance;
