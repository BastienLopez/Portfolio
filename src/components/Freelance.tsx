import {
  CheckCircle2,
  ChevronDown,
  Clock3,
  Cpu,
  FileCheck2,
  FileText,
  Gauge,
  HelpCircle,
  Layers,
  Layers3,
  MessageSquare,
  PenSquare,
  ShieldCheck,
  Target,
  Rocket,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import Testimonials from "@/components/Testimonials";

const Freelance = () => {
  const businessTags = [
    "Site vitrine",
    "Application web",
    "App métier",
    "API & intégrations",
    "Automatisation",
    "MVP",
    "ERP sur mesure",
  ];

  const proofItems = [
    {
      label: "Estimation initiale rapide",
      value: "Sous 48h",
      note: "Après un premier échange cadré",
    },
    {
      label: "Mode d'intervention",
      value: "Ponctuel ou continu",
      note: "Mission ciblée ou accompagnement",
    },
    {
      label: "Livrables clairs",
      value: "Documentation & passation",
      note: "Transmission exploitable par votre équipe",
    },
    {
      label: "Exécution maîtrisée",
      value: "Développement structuré",
      note: "Étapes claires et suivi régulier",
    },
  ];

  const qualificationItems = [
    "Remplacer un process manuel (Excel, e-mails, ressaisies)",
    "Centraliser des données métier dispersées",
    "Lancer un MVP utile rapidement",
    "Fiabiliser un outil existant sans repartir de zéro",
  ];

  const services = [
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

  const processSteps = [
    "Cadrage du besoin, des priorités métier et du périmètre utile",
    "Proposition technique et estimation argumentée",
    "Développement itératif avec points de suivi réguliers",
    "Mise en production propre, documentation et passation",
    "Maintenance optionnelle et évolutions planifiées",
  ];

  const guarantees = [
    "Communication claire, sans jargon inutile",
    "Code maintenable, documenté et transmissible",
    "Sécurité et données sensibles prises au sérieux",
    "Visibilité continue sur l'avancement et les prochaines étapes",
  ];

  const packages = [
    {
      title: "Starter",
      audience: "Pour qui: porteur de projet ou PME qui doit lancer vite un premier périmètre utile",
      includes: [
        "Cadrage rapide et priorisation",
        "Site vitrine premium, MVP ciblé ou module métier clé",
        "Livraison exploitable avec base technique propre",
      ],
      mode: "Mode de collaboration: forfait",
      delay: "Délai indicatif: 1 à 3 semaines",
    },
    {
      title: "Business",
      audience: "Pour qui: entreprise qui veut structurer un outil métier complet et fiable",
      includes: [
        "Application métier complète (front + back)",
        "API, rôles/droits, dashboard, logique métier",
        "Suivi régulier et livraisons itératives",
      ],
      mode: "Mode de collaboration: forfait par lots ou forfait itératif",
      delay: "Délai indicatif: 4 à 8 semaines",
      highlighted: true,
    },
    {
      title: "ERP-Scale",
      audience: "Pour qui: structure avec besoins multi-process, intégrations SI et enjeux de robustesse",
      includes: [
        "ERP sur mesure et workflows avancés",
        "Intégrations API, données sensibles, auditabilité",
        "Plan d'évolution long terme et gouvernance technique",
      ],
      mode: "Mode de collaboration: TJM ou forfait par lots",
      delay: "Délai indicatif: 2 à 6 mois",
    },
  ];

  const caseStudies = [
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

  const stackGroups = [
    "Front-end: React, Next.js, TypeScript",
    "Back-end: Python (FastAPI/Flask), Node.js",
    "Data: PostgreSQL, MongoDB, collecte automatisée de données",
    "DevOps: Docker, GitHub Actions, CI/CD",
    "Architecture: APIs REST, sécurité applicative",
    "IA: TensorFlow, PyTorch, CUDA, RL, NLP",
  ];

  const faqItems = [
    {
      question: "Quels sont les délais habituels ?",
      answer:
        "Le délai dépend du périmètre. Une mission ciblée peut être livrée en quelques jours, un MVP en quelques semaines, et un ERP léger sur plusieurs lots. Un planning réaliste est donné dès le cadrage.",
    },
    {
      question: "Comment fonctionne la facturation ?",
      answer:
        "Selon le besoin, je propose du TJM, du forfait ou un découpage par lots. Le mode est fixé en amont avec jalons, livrables et visibilité budget.",
    },
    {
      question: "À qui appartient le code ?",
      answer:
        "Le code livré est transférable au client selon les termes du devis ou du contrat. La passation et la documentation sont prévues pour garantir l'autonomie.",
    },
    {
      question: "Proposes-tu de la maintenance ?",
      answer:
        "Oui. Je peux assurer un accompagnement post-livraison: correctifs, évolutions, optimisation performance et suivi technique.",
    },
    {
      question: "Peux-tu reprendre un projet existant ?",
      answer:
        "Oui, après un audit rapide de l'existant (code, dette technique, infra, risques). L'objectif est de sécuriser la reprise avant d'ajouter de nouvelles fonctionnalités.",
    },
    {
      question: "Peux-tu signer un NDA ?",
      answer:
        "Oui, je peux signer un NDA avant partage des informations sensibles afin de protéger votre projet et vos données.",
    },
  ];

  return (
    <section id="freelance" className="py-20 md:py-32 relative bg-secondary/20 section-odd">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Sites vitrines, applications métier, API et automatisations pour PME/TPE
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
            <p className="text-base md:text-lg text-foreground/85 max-w-3xl mx-auto leading-7 md:leading-relaxed">
              Je conçois des sites vitrines, des applications web et des outils sur mesure pour
              structurer vos opérations, fiabiliser vos flux et réduire les tâches manuelles.
            </p>
            <p className="text-sm text-foreground/75 mt-4 max-w-4xl mx-auto">
              Cadrage clair, développement itératif, mise en production propre, maintenance possible.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {businessTags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs bg-primary/15 text-primary border border-primary/20">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="bg-cta hover:bg-cta/90 text-cta-foreground">
                <a href="#contact" onClick={() => trackEvent("cta_click", { location: "freelance", cta: "contact" })}>
                  <PenSquare className="w-4 h-4 mr-2" />
                  Décrire mon besoin
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="#freelance-cases" onClick={() => trackEvent("cta_click", { location: "freelance", cta: "cases" })}>
                  Voir des exemples de missions
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {proofItems.map((item) => (
              <Card key={item.label} className="p-5 md:p-6 bg-card border-border text-center h-full flex flex-col">
                <p className="text-2xl font-bold text-primary mb-1">{item.value}</p>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-foreground/60 mt-auto pt-2">{item.note}</p>
              </Card>
            ))}
          </div>

          <Card className="p-5 md:p-6 bg-card border-border mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Gauge className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Bien adapté si...</h3>
            </div>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-foreground/80 leading-6">
              {qualificationItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-5 md:p-6 bg-card border-border mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="text-2xl font-bold">Ce que je fais concrètement</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4 items-stretch">
              {services.map((service, index) => (
                <div key={index} className="rounded-lg border border-border bg-secondary/20 p-5 md:p-6 h-full flex flex-col">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-foreground/60 mb-1">Besoin</p>
                      <p className="text-sm text-foreground leading-6 md:min-h-[72px]">{service.need}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-foreground/60 mb-1">Solution</p>
                      <p className="text-sm text-foreground/85 leading-6 md:min-h-[72px]">{service.solution}</p>
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-border/60">
                    <p className="text-xs uppercase tracking-wide text-foreground/60 mb-1">Résultat attendu</p>
                    <p className="text-sm text-primary leading-6">{service.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6 mb-12 items-stretch">
            <Card className="p-5 md:p-6 bg-card border-border lg:col-span-2 h-full">
              <div className="flex items-center gap-3 mb-5">
                <Layers className="w-5 h-5 text-primary" />
                <h3 className="text-2xl font-bold">Comment se déroule une mission</h3>
              </div>
              <ol className="space-y-3 text-foreground/80 leading-6">
                {processSteps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-primary/15 text-primary text-xs font-semibold flex items-center justify-center mt-0.5">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </Card>

            <Card className="p-5 md:p-6 bg-card border-border h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-5 h-5 text-accent" />
                <h3 className="text-xl font-bold">Garanties</h3>
              </div>
              <ul className="flex-1 flex flex-col justify-between gap-4 md:gap-5 text-foreground/80 leading-7">
                {guarantees.map((item) => (
                  <li key={item} className="flex items-start gap-2 py-1">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Offres adaptées à votre niveau de besoin</h3>
            <p className="text-foreground/70">Chaque offre peut être ajustée après cadrage selon vos contraintes métier et budget.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12 items-stretch">
            {packages.map((item) => (
              <Card
                key={item.title}
                className={`p-5 md:p-6 bg-card transition-colors h-full flex flex-col ${
                  item.highlighted ? "border-primary shadow-lg shadow-primary/10" : "border-border hover:border-primary"
                }`}
              >
                <div className="flex items-start gap-2 mb-3 min-h-[52px]">
                  <Layers3 className="w-4 h-4 text-primary" />
                  <h4 className="text-xl font-semibold leading-snug">{item.title}</h4>
                </div>
                <p className="text-sm text-foreground/80 mb-3 leading-6 md:min-h-[72px]">{item.audience}</p>
                <ul className="space-y-2 mb-4">
                  {item.includes.map((line) => (
                    <li key={line} className="text-sm text-foreground/80 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                      <span className="leading-6">{line}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4 border-t border-border/60">
                  <p className="text-primary font-medium text-sm mb-1 leading-6">{item.mode}</p>
                  <p className="text-accent font-medium text-sm flex items-center gap-2 leading-6">
                    <Clock3 className="w-4 h-4" />
                    {item.delay}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div id="freelance-cases" className="mb-6">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Exemples de missions</h3>
            <p className="text-foreground/70">Cas génériques anonymisés pour illustrer la démarche et les résultats obtenus.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 items-stretch">
            {caseStudies.map((item) => (
              <Card key={item.title} className="p-5 md:p-6 bg-card border-border h-full flex flex-col">
                <h4 className="text-lg font-semibold leading-snug min-h-[72px] mb-4">{item.title}</h4>
                <div className="space-y-3 text-sm flex-1 flex flex-col">
                  <div>
                    <p className="text-foreground/60 uppercase tracking-wide text-xs mb-1">Besoin</p>
                    <p className="text-foreground/85 leading-6 md:min-h-[72px]">{item.need}</p>
                  </div>
                  <div>
                    <p className="text-foreground/60 uppercase tracking-wide text-xs mb-1">Solution</p>
                    <p className="text-foreground/85 leading-6 md:min-h-[96px]">{item.solution}</p>
                  </div>
                  <div className="mt-auto pt-3 border-t border-border/60">
                    <p className="text-foreground/60 uppercase tracking-wide text-xs mb-1">Résultat</p>
                    <p className="text-primary leading-6">{item.result}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-5 md:p-6 bg-card border-border mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-bold">Stack cible</h3>
            </div>
            <p className="text-sm text-foreground/70 mb-4">
              Socle technique sélectionné pour la fiabilité, l'évolutivité et la maintenance dans le temps.
            </p>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-foreground/80 leading-6">
              {stackGroups.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Testimonials />

          <Card className="p-5 md:p-6 bg-card border-border mb-12">
            <div className="flex items-center gap-3 mb-5">
              <HelpCircle className="w-5 h-5 text-primary" />
              <h3 className="text-2xl font-bold">Mini FAQ Freelance</h3>
            </div>
            <div className="space-y-3">
              {faqItems.map((item, index) => (
                <details
                  key={item.question}
                  open={index === 0}
                  className="group rounded-lg border border-border bg-secondary/20 px-4 py-3"
                >
                  <summary className="cursor-pointer list-none font-medium text-foreground flex items-center justify-between gap-3">
                    {item.question}
                    <ChevronDown className="w-4 h-4 text-primary transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="text-foreground/75 text-sm mt-3 leading-6">{item.answer}</p>
                </details>
              ))}
            </div>
          </Card>

          <Card className="p-5 md:p-6 bg-card border-primary/40 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-primary" />
              <Gauge className="w-5 h-5 text-cta" />
              <MessageSquare className="w-5 h-5 text-primary" />
              <Rocket className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Parlons de votre projet</h3>
            <p className="text-foreground/80 max-w-2xl mx-auto mb-6 leading-7">
              Décrivez votre besoin en quelques lignes. Vous recevez une estimation initiale,
              un plan d'action et un mode de collaboration adapté.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="bg-cta hover:bg-cta/90 text-cta-foreground">
                <a href="#contact" onClick={() => trackEvent("cta_click", { location: "freelance_bottom", cta: "estimate" })}>
                  Obtenir une estimation initiale
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="#contact" onClick={() => trackEvent("cta_click", { location: "freelance_bottom", cta: "contact" })}>
                  Décrire mon besoin
                </a>
              </Button>
            </div>
            <p className="text-xs text-foreground/60 mt-4 flex items-center justify-center gap-2">
              <FileCheck2 className="w-3.5 h-3.5" />
              Premier échange sans engagement.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Freelance;