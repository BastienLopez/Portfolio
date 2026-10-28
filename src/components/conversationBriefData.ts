export const BRIEF_EMAIL = "bastien.lopez40@gmail.com";
export const CONVERSATION_STEP_COUNT = 7;

export type Locale = "fr" | "en";
export type ProjectType = "website" | "business-tool" | "scoping";
export type ProblemChoice =
  | "no-site"
  | "old-site"
  | "not-enough-contacts"
  | "repetitive-tasks"
  | "tools-not-connected"
  | "manual-files"
  | "idea-without-start"
  | "technical-choice"
  | "advice-estimate"
  | "other";
export type OutcomeChoice =
  | "modern-site"
  | "more-contacts"
  | "improve-existing-site"
  | "automate-tasks"
  | "custom-business-tool"
  | "centralize-tools"
  | "define-project"
  | "estimate-budget"
  | "identify-solution"
  | "other";
export type BudgetChoice = "under-1000" | "1000-3000" | "3000-5000" | "over-5000" | "define-together" | "custom";
export type TimelineChoice = "as-soon-as-possible" | "within-month" | "one-to-three-months" | "no-deadline";
export type ExistingChoice = "yes" | "no";

export type ChoiceOption<T extends string> = {
  value: T;
  fr: string;
  en: string;
};

export type ConversationAnswers = {
  projectType: ProjectType | "";
  activity: string;
  problem: ProblemChoice | "";
  problemDetails: string;
  outcome: OutcomeChoice | "";
  outcomeDetails: string;
  budget: BudgetChoice | "";
  budgetCustom: string;
  timeline: TimelineChoice | "";
  existing: ExistingChoice | "";
  website: string;
  name: string;
  email: string;
};

export const createEmptyAnswers = (): ConversationAnswers => ({
  projectType: "",
  activity: "",
  problem: "",
  problemDetails: "",
  outcome: "",
  outcomeDetails: "",
  budget: "",
  budgetCustom: "",
  timeline: "",
  existing: "",
  website: "",
  name: "",
  email: "",
});

const isProjectType = (value: string | null): value is ProjectType =>
  value === "website" || value === "business-tool" || value === "scoping";

export const getContextualProjectType = (pathname: string, search: string): ProjectType | "" => {
  const requestedProjectType = new URLSearchParams(search).get("project");
  if (isProjectType(requestedProjectType)) return requestedProjectType;
  if (pathname === "/creation-site-internet-reims") return "website";
  if (pathname.startsWith("/services/")) return "business-tool";
  return "";
};

export const PROJECT_TYPES: ChoiceOption<ProjectType>[] = [
  { value: "website", fr: "Site professionnel / refonte", en: "Professional website / redesign" },
  { value: "business-tool", fr: "Outil métier / automatisation", en: "Business tool / automation" },
  { value: "scoping", fr: "J’ai besoin d’aide pour cadrer mon projet", en: "I need help defining the scope" },
];

const PROBLEMS_BY_PROJECT: Record<ProjectType, ChoiceOption<ProblemChoice>[]> = {
  website: [
    { value: "no-site", fr: "Je n’ai pas encore de site internet", en: "I do not have a website yet" },
    { value: "old-site", fr: "Mon site est vieillissant", en: "My website feels outdated" },
    { value: "not-enough-contacts", fr: "Mon site ne génère pas assez de contacts", en: "My website does not generate enough leads" },
    { value: "other", fr: "Autre problème", en: "Another problem" },
  ],
  "business-tool": [
    { value: "repetitive-tasks", fr: "Je perds du temps sur des tâches répétitives", en: "I lose time on repetitive tasks" },
    { value: "tools-not-connected", fr: "Mes outils ne communiquent pas entre eux", en: "My tools do not communicate with each other" },
    { value: "manual-files", fr: "J’utilise trop de fichiers Excel ou de processus manuels", en: "I rely too much on Excel files or manual processes" },
    { value: "other", fr: "Autre problème", en: "Another problem" },
  ],
  scoping: [
    { value: "idea-without-start", fr: "J’ai une idée mais je ne sais pas par où commencer", en: "I have an idea but do not know where to start" },
    { value: "technical-choice", fr: "Je ne sais pas quelle solution technique choisir", en: "I do not know which technical solution to choose" },
    { value: "advice-estimate", fr: "J’ai besoin de conseils ou d’une estimation", en: "I need advice or an estimate" },
    { value: "other", fr: "Autre problème", en: "Another problem" },
  ],
};

const OUTCOMES_BY_PROJECT: Record<ProjectType, ChoiceOption<OutcomeChoice>[]> = {
  website: [
    { value: "modern-site", fr: "Un site professionnel moderne", en: "A modern professional website" },
    { value: "more-contacts", fr: "Générer davantage de contacts", en: "Generate more leads" },
    { value: "improve-existing-site", fr: "Refaire et améliorer mon site actuel", en: "Rebuild and improve my current website" },
    { value: "other", fr: "Autre objectif", en: "Another objective" },
  ],
  "business-tool": [
    { value: "automate-tasks", fr: "Automatiser mes tâches répétitives", en: "Automate my repetitive tasks" },
    { value: "custom-business-tool", fr: "Créer un outil métier sur mesure", en: "Create a custom business tool" },
    { value: "centralize-tools", fr: "Centraliser mes données et mes outils", en: "Centralize my data and tools" },
    { value: "other", fr: "Autre objectif", en: "Another objective" },
  ],
  scoping: [
    { value: "define-project", fr: "Définir précisément mon projet", en: "Define my project precisely" },
    { value: "estimate-budget", fr: "Obtenir une estimation du budget", en: "Get a budget estimate" },
    { value: "identify-solution", fr: "Identifier la meilleure solution", en: "Identify the best solution" },
    { value: "other", fr: "Autre objectif", en: "Another objective" },
  ],
};

export const BUDGET_OPTIONS: ChoiceOption<BudgetChoice>[] = [
  { value: "under-1000", fr: "Moins de 1 000 €", en: "Less than €1,000" },
  { value: "1000-3000", fr: "1 000 à 3 000 €", en: "€1,000 to €3,000" },
  { value: "3000-5000", fr: "3 000 à 5 000 €", en: "€3,000 to €5,000" },
  { value: "over-5000", fr: "Plus de 5 000 €", en: "More than €5,000" },
  { value: "define-together", fr: "Je préfère définir le budget ensemble", en: "I prefer to define the budget together" },
];

export const TIMELINE_OPTIONS: ChoiceOption<TimelineChoice>[] = [
  { value: "as-soon-as-possible", fr: "Dès que possible", en: "As soon as possible" },
  { value: "within-month", fr: "Dans le mois", en: "Within the month" },
  { value: "one-to-three-months", fr: "Dans les 1 à 3 mois", en: "Within 1 to 3 months" },
  { value: "no-deadline", fr: "Pas de délai précis", en: "No specific deadline" },
];

export const EXISTING_OPTIONS: ChoiceOption<ExistingChoice>[] = [
  { value: "yes", fr: "Oui", en: "Yes" },
  { value: "no", fr: "Non", en: "No" },
];

export const getProblemOptions = (projectType: ProjectType | "") => projectType ? PROBLEMS_BY_PROJECT[projectType] : [];
export const getOutcomeOptions = (projectType: ProjectType | "") => projectType ? OUTCOMES_BY_PROJECT[projectType] : [];

export const getChoiceLabel = <T extends string>(options: readonly ChoiceOption<T>[], value: T | "", locale: Locale) => {
  if (!value) return "";
  return options.find((option) => option.value === value)?.[locale] ?? value;
};

export const normalizeWebsite = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

export const isHttpUrl = (value: string) => {
  const trimmed = value.trim();
  if (/^(?:javascript|data|vbscript):/i.test(trimmed)) return false;
  try {
    const parsed = new URL(trimmed);
    return (parsed.protocol === "http:" || parsed.protocol === "https:") && Boolean(parsed.hostname);
  } catch {
    return false;
  }
};

export type GmailComposeOptions = {
  subject: string;
  body?: string;
};

export const createGmailComposeUrl = ({ subject, body = "" }: GmailComposeOptions) => {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: BRIEF_EMAIL,
    su: subject,
  });

  if (body) params.set("body", body);

  return `https://mail.google.com/mail/u/0/?${params.toString()}`;
};

const fallback = (value: string, locale: Locale) => value.trim() || (locale === "en" ? "To be defined" : "À préciser");

export type BriefEmail = {
  subject: string;
  body: string;
  gmailUrl: string;
  values: {
    projectType: string;
    activity: string;
    problem: string;
    outcome: string;
    budget: string;
    timeline: string;
    website: string;
    name: string;
    email: string;
  };
};

export const createBriefEmail = (answers: ConversationAnswers, isEnglish = false): BriefEmail => {
  const locale: Locale = isEnglish ? "en" : "fr";
  const projectType = getChoiceLabel(PROJECT_TYPES, answers.projectType, locale) || (locale === "en" ? "Project to define" : "Projet à définir");
  const problem = answers.problem === "other"
    ? fallback(answers.problemDetails, locale)
    : getChoiceLabel(getProblemOptions(answers.projectType), answers.problem, locale) || (locale === "en" ? "Problem to define" : "Problème à préciser");
  const outcome = answers.outcome === "other"
    ? fallback(answers.outcomeDetails, locale)
    : getChoiceLabel(getOutcomeOptions(answers.projectType), answers.outcome, locale) || (locale === "en" ? "Objective to define" : "Objectif à préciser");
  const budget = answers.budget === "custom"
    ? fallback(answers.budgetCustom, locale)
    : getChoiceLabel(BUDGET_OPTIONS, answers.budget, locale) || (locale === "en" ? "To be defined" : "À définir");
  const website = answers.existing === "yes"
    ? (answers.website.trim() ? normalizeWebsite(answers.website) : (locale === "en" ? "Yes — link not provided" : "Oui — lien non renseigné"))
    : (locale === "en" ? "No" : "Non");
  const values = {
    projectType,
    activity: fallback(answers.activity, locale),
    problem,
    outcome,
    budget,
    timeline: getChoiceLabel(TIMELINE_OPTIONS, answers.timeline, locale) || (locale === "en" ? "To be defined" : "À définir"),
    website,
    name: fallback(answers.name, locale),
    email: fallback(answers.email, locale),
  };
  const subject = `${locale === "en" ? "New project request" : "Nouvelle demande de projet"} — ${projectType}`;
  const body = [
    locale === "en" ? "Freelance project brief" : "Brief de projet freelance",
    "",
    locale === "en" ? "Hello," : "Bonjour,",
    "",
    locale === "en" ? "I would like to present my project." : "Je souhaite vous présenter mon projet.",
    "",
    `${locale === "en" ? "Business / activity" : "Entreprise / activité"} : ${values.activity}`,
    `${locale === "en" ? "Name" : "Nom"} : ${values.name}`,
    `${locale === "en" ? "Email" : "Email"} : ${values.email}`,
    "",
    `${locale === "en" ? "Project type" : "Type de projet"} : ${values.projectType}`,
    `${locale === "en" ? "Current problem" : "Problème actuel"} : ${values.problem}`,
    `${locale === "en" ? "Expected result" : "Résultat attendu"} : ${values.outcome}`,
    `${locale === "en" ? "Budget" : "Budget"} : ${values.budget}`,
    `${locale === "en" ? "Timeline" : "Délai"} : ${values.timeline}`,
    `${locale === "en" ? "Existing website or tool" : "Site ou outil existant"} : ${values.website}`,
    "",
    locale === "en" ? "Best regards," : "Cordialement,",
    values.name,
  ].join("\n");
  return {
    subject,
    body,
    gmailUrl: createGmailComposeUrl({ subject, body }),
    values,
  };
};
