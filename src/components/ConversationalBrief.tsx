import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, Mail } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import {
  BUDGET_OPTIONS,
  CONVERSATION_STEP_COUNT,
  EXISTING_OPTIONS,
  PROJECT_TYPES,
  TIMELINE_OPTIONS,
  createBriefEmail,
  createEmptyAnswers,
  getContextualProjectType,
  getChoiceLabel,
  getOutcomeOptions,
  getProblemOptions,
  isHttpUrl,
  normalizeWebsite,
  type ChoiceOption,
  type ConversationAnswers,
  type ExistingChoice,
  type OutcomeChoice,
  type ProblemChoice,
  type ProjectType,
} from "./conversationBriefData";

type ConversationStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type BudgetPhase = "budget" | "timeline";
type ErrorMap = Partial<Record<"activity" | "problem" | "outcome" | "budget" | "website" | "name" | "email", string>>;

type ChoiceListProps<T extends string> = {
  group: string;
  options: readonly ChoiceOption<T>[];
  selected: T | "";
  isEnglish: boolean;
  onSelect: (value: T) => void;
};

const ChoiceList = <T extends string>({ group, options, selected, isEnglish, onSelect }: ChoiceListProps<T>) => (
  <div className="conversation-choice-list" role="group" aria-label={isEnglish ? "Possible answers" : "Réponses possibles"}>
    {options.map((option) => {
      const label = isEnglish ? option.en : option.fr;
      const isSelected = selected === option.value;
      return (
        <button
          key={option.value}
          type="button"
          className={`conversation-choice${isSelected ? " is-selected" : ""}`}
          data-choice-group={group}
          data-choice-value={option.value}
          aria-pressed={isSelected}
          onClick={() => onSelect(option.value)}
        >
          <span className="conversation-choice-indicator" aria-hidden="true">
            {isSelected && <Check />}
          </span>
          <span>{label}</span>
        </button>
      );
    })}
  </div>
);

type ConversationalBriefProps = { context: "contact" | "freelance-contact" };

const ConversationalBrief = ({ context }: ConversationalBriefProps) => {
  const { isEnglish } = useLanguage();
  const location = useLocation();
  const contextualProjectType = getContextualProjectType(location.pathname, location.search);
  const [step, setStep] = useState<ConversationStep>(() => contextualProjectType ? 2 : 1);
  const [budgetPhase, setBudgetPhase] = useState<BudgetPhase>("budget");
  const [answers, setAnswers] = useState<ConversationAnswers>(() => ({
    ...createEmptyAnswers(),
    projectType: contextualProjectType,
  }));
  const [errors, setErrors] = useState<ErrorMap>({});
  const [isSummary, setIsSummary] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "manual">("idle");
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const questionRef = useRef<HTMLHeadingElement>(null);
  const previewRef = useRef<HTMLTextAreaElement>(null);
  const hasMounted = useRef(false);
  const locale = isEnglish ? "en" : "fr";
  const briefEmail = createBriefEmail(answers, isEnglish);
  const emailHref = briefEmail.gmailUrl;

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    questionRef.current?.focus();
  }, [step, budgetPhase, isSummary]);

  const moveTo = (nextStep: ConversationStep, nextDirection: "forward" | "back" = "forward") => {
    setDirection(nextDirection);
    setStep(nextStep);
  };

  const updateAnswer = <K extends keyof ConversationAnswers>(field: K, value: ConversationAnswers[K]) => {
    setAnswers((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setCopyStatus("idle");
  };

  const chooseProjectType = (value: ProjectType) => {
    setAnswers((current) => current.projectType === value
      ? current
      : { ...current, projectType: value, problem: "", problemDetails: "", outcome: "", outcomeDetails: "" });
    setErrors({});
    moveTo(2);
  };

  const continueActivity = () => {
    if (!answers.activity.trim()) {
      setErrors((current) => ({ ...current, activity: isEnglish ? "Enter your activity or choose the option below." : "Indiquez votre activité ou choisissez l’option ci-dessous." }));
      return;
    }
    moveTo(3);
  };

  const skipActivity = () => {
    updateAnswer("activity", isEnglish ? "I do not have a business yet" : "Je n’ai pas encore d’entreprise");
    moveTo(3);
  };

  const chooseProblem = (problem: ProblemChoice) => {
    if (!problem) return;
    updateAnswer("problem", problem);
    if (problem !== "other") {
      updateAnswer("problemDetails", "");
      moveTo(4);
    }
  };

  const continueOtherProblem = () => {
    if (!answers.problemDetails.trim()) {
      setErrors((current) => ({ ...current, problem: isEnglish ? "Describe the problem briefly." : "Décrivez brièvement le problème." }));
      return;
    }
    moveTo(4);
  };

  const chooseOutcome = (outcome: OutcomeChoice) => {
    if (!outcome) return;
    updateAnswer("outcome", outcome);
    if (outcome !== "other") {
      updateAnswer("outcomeDetails", "");
      setBudgetPhase("budget");
      moveTo(5);
    }
  };

  const continueOtherOutcome = () => {
    if (!answers.outcomeDetails.trim()) {
      setErrors((current) => ({ ...current, outcome: isEnglish ? "Describe the expected objective briefly." : "Décrivez brièvement l’objectif attendu." }));
      return;
    }
    setBudgetPhase("budget");
    moveTo(5);
  };

  const chooseBudget = (value: ConversationAnswers["budget"]) => {
    if (!value) return;
    updateAnswer("budget", value);
    updateAnswer("budgetCustom", "");
    setDirection("forward");
    setBudgetPhase("timeline");
  };

  const continueCustomBudget = () => {
    updateAnswer("budget", answers.budgetCustom.trim() ? "custom" : "");
    setDirection("forward");
    setBudgetPhase("timeline");
  };

  const chooseTimeline = (value: ConversationAnswers["timeline"]) => {
    if (!value) return;
    updateAnswer("timeline", value);
    moveTo(6);
  };

  const chooseExisting = (value: ExistingChoice) => {
    updateAnswer("existing", value);
    if (value === "no") {
      updateAnswer("website", "");
      moveTo(7);
    }
  };

  const continueExisting = () => {
    if (answers.website.trim() && !isHttpUrl(normalizeWebsite(answers.website))) {
      setErrors((current) => ({ ...current, website: isEnglish ? "Use a valid http:// or https:// website." : "Utilisez un site valide en http:// ou https://." }));
      return;
    }
    moveTo(7);
  };

  const submitDetails = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: ErrorMap = {};
    if (!answers.name.trim()) nextErrors.name = isEnglish ? "Enter your name." : "Indiquez votre nom.";
    if (!answers.email.trim()) nextErrors.email = isEnglish ? "Enter your email." : "Indiquez votre email.";
    else if (!(event.currentTarget.elements.namedItem("email") as HTMLInputElement | null)?.checkValidity() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email.trim())) {
      nextErrors.email = isEnglish ? "Enter a valid email address." : "Indiquez une adresse email valide.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const firstInvalid = Object.keys(nextErrors)[0];
      (event.currentTarget.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }
    setIsSummary(true);
    trackEvent("brief_prepared", { location: context, project_type: answers.projectType });
  };

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(briefEmail.body);
      setCopyStatus("copied");
    } catch {
      previewRef.current?.focus();
      previewRef.current?.select();
      setCopyStatus("manual");
    }
  };

  const goBack = () => {
    setDirection("back");
    if (isSummary) {
      setIsSummary(false);
      setStep(7);
      return;
    }
    if (step === 1) return;
    if (step === 5 && budgetPhase === "timeline") {
      setBudgetPhase("budget");
      return;
    }
    const previousStep = (step - 1) as ConversationStep;
    if (previousStep === 5) setBudgetPhase("timeline");
    moveTo(previousStep, "back");
  };

  const progress = Array.from({ length: CONVERSATION_STEP_COUNT }, (_, index) => index + 1);
  const currentStep = isSummary ? CONVERSATION_STEP_COUNT : step;
  const stepLabel = isSummary
    ? (isEnglish ? "Summary" : "Récapitulatif")
    : `${isEnglish ? "Step" : "Étape"} ${currentStep} ${isEnglish ? "of" : "sur"} ${CONVERSATION_STEP_COUNT}`;
  const nextHint = isEnglish ? "Choose an answer" : "Sélectionnez une réponse";
  const problemOptions = getProblemOptions(answers.projectType);
  const outcomeOptions = getOutcomeOptions(answers.projectType);

  const renderQuestion = () => {
    if (step === 1) {
      return (
        <>
          <h3 ref={questionRef} tabIndex={-1} className="conversation-question">{isEnglish ? "What type of project do you have in mind?" : "Quel type de projet avez-vous en tête ?"}</h3>
          <ChoiceList group="project-type" options={PROJECT_TYPES} selected={answers.projectType} isEnglish={isEnglish} onSelect={chooseProjectType} />
        </>
      );
    }
    if (step === 2) {
      return (
        <>
          <h3 ref={questionRef} tabIndex={-1} className="conversation-question">{isEnglish ? "What is your business or activity?" : "Quelle est votre entreprise ou votre activité ?"}</h3>
          <div className="conversation-input-step">
            <label htmlFor="conversation-activity">{isEnglish ? "Your business or activity" : "Votre entreprise ou votre activité"}</label>
            <Input id="conversation-activity" name="activity" value={answers.activity} autoComplete="organization" placeholder={isEnglish ? "Example: independent coach, local company..." : "Exemple : coach indépendant, entreprise locale…"} aria-invalid={Boolean(errors.activity)} aria-describedby={errors.activity ? "conversation-activity-error" : undefined} onChange={(event) => updateAnswer("activity", event.currentTarget.value)} />
            {errors.activity && <p id="conversation-activity-error" className="conversation-error">{errors.activity}</p>}
            <div className="conversation-input-actions">
              <Button type="button" size="lg" onClick={continueActivity}>{isEnglish ? "Next" : "Suivant"}<ArrowRight aria-hidden="true" /></Button>
              <button type="button" className="conversation-skip" onClick={skipActivity}>{isEnglish ? "I do not have a business yet" : "Je n’ai pas encore d’entreprise"}</button>
            </div>
          </div>
        </>
      );
    }
    if (step === 3) {
      return (
        <>
          <h3 ref={questionRef} tabIndex={-1} className="conversation-question">{isEnglish ? "What is your main problem today?" : "Quel est votre principal problème aujourd’hui ?"}</h3>
          <ChoiceList group="problem" options={problemOptions} selected={answers.problem} isEnglish={isEnglish} onSelect={chooseProblem} />
          {answers.problem === "other" && (
            <div className="conversation-follow-up">
              <label htmlFor="conversation-problem-details">{isEnglish ? "Describe the problem" : "Décrivez le problème"}</label>
              <Textarea id="conversation-problem-details" name="problemDetails" value={answers.problemDetails} rows={3} maxLength={1000} aria-invalid={Boolean(errors.problem)} aria-describedby={errors.problem ? "conversation-problem-error" : undefined} onChange={(event) => updateAnswer("problemDetails", event.currentTarget.value)} />
              {errors.problem && <p id="conversation-problem-error" className="conversation-error">{errors.problem}</p>}
              <Button type="button" size="lg" onClick={continueOtherProblem}>{isEnglish ? "Next" : "Suivant"}<ArrowRight aria-hidden="true" /></Button>
            </div>
          )}
        </>
      );
    }
    if (step === 4) {
      return (
        <>
          <h3 ref={questionRef} tabIndex={-1} className="conversation-question">{isEnglish ? "What result would you like to achieve?" : "Quel résultat souhaitez-vous obtenir ?"}</h3>
          <ChoiceList group="outcome" options={outcomeOptions} selected={answers.outcome} isEnglish={isEnglish} onSelect={chooseOutcome} />
          {answers.outcome === "other" && (
            <div className="conversation-follow-up">
              <label htmlFor="conversation-outcome-details">{isEnglish ? "Describe the expected result" : "Décrivez l’objectif attendu"}</label>
              <Textarea id="conversation-outcome-details" name="outcomeDetails" value={answers.outcomeDetails} rows={3} maxLength={600} aria-invalid={Boolean(errors.outcome)} aria-describedby={errors.outcome ? "conversation-outcome-error" : undefined} onChange={(event) => updateAnswer("outcomeDetails", event.currentTarget.value)} />
              {errors.outcome && <p id="conversation-outcome-error" className="conversation-error">{errors.outcome}</p>}
              <Button type="button" size="lg" onClick={continueOtherOutcome}>{isEnglish ? "Next" : "Suivant"}<ArrowRight aria-hidden="true" /></Button>
            </div>
          )}
        </>
      );
    }
    if (step === 5 && budgetPhase === "budget") {
      return (
        <>
          <h3 ref={questionRef} tabIndex={-1} className="conversation-question">{isEnglish ? "Do you have a budget in mind?" : "Avez-vous un budget en tête ?"}</h3>
          <ChoiceList group="budget" options={BUDGET_OPTIONS} selected={answers.budget === "custom" ? "" : answers.budget} isEnglish={isEnglish} onSelect={chooseBudget} />
          <div className="conversation-custom-input">
            <label htmlFor="conversation-budget-custom">{isEnglish ? "Or specify a budget (optional)" : "Ou précisez un budget (facultatif)"}</label>
            <Input id="conversation-budget-custom" name="budgetCustom" value={answers.budgetCustom} placeholder={isEnglish ? "Example: to be defined together" : "Exemple : à définir ensemble"} onChange={(event) => updateAnswer("budgetCustom", event.currentTarget.value)} />
            <Button type="button" variant="outline" onClick={continueCustomBudget}>{isEnglish ? "Continue to timing" : "Passer au délai"}<ArrowRight aria-hidden="true" /></Button>
          </div>
        </>
      );
    }
    if (step === 5) {
      return (
        <>
          <h3 ref={questionRef} tabIndex={-1} className="conversation-question">{isEnglish ? "When would you like to start?" : "Quel délai avez-vous en tête ?"}</h3>
          <ChoiceList group="timeline" options={TIMELINE_OPTIONS} selected={answers.timeline} isEnglish={isEnglish} onSelect={chooseTimeline} />
        </>
      );
    }
    if (step === 6) {
      return (
        <>
          <h3 ref={questionRef} tabIndex={-1} className="conversation-question">{isEnglish ? "Do you already have a website or existing tool?" : "Avez-vous déjà un site internet ou un outil existant ?"}</h3>
          <ChoiceList group="existing" options={EXISTING_OPTIONS} selected={answers.existing} isEnglish={isEnglish} onSelect={chooseExisting} />
          {answers.existing === "yes" && (
            <div className="conversation-follow-up">
              <label htmlFor="conversation-website">{isEnglish ? "Website or tool link (optional)" : "Lien vers le site ou l’outil (facultatif)"}</label>
              <div className="conversation-url-field">
                <span aria-hidden="true">https://</span>
                <Input id="conversation-website" name="website" type="text" inputMode="url" value={answers.website} placeholder="siteweb.com" aria-invalid={Boolean(errors.website)} aria-describedby={errors.website ? "conversation-website-error" : undefined} onChange={(event) => updateAnswer("website", event.currentTarget.value.replace(/^https?:\/\//i, ""))} />
              </div>
              {errors.website && <p id="conversation-website-error" className="conversation-error">{errors.website}</p>}
              <Button type="button" size="lg" onClick={continueExisting}>{isEnglish ? "Next" : "Suivant"}<ArrowRight aria-hidden="true" /></Button>
            </div>
          )}
        </>
      );
    }
    return (
      <>
        <h3 ref={questionRef} tabIndex={-1} className="conversation-question">{isEnglish ? "How can I get back to you?" : "Comment puis-je vous recontacter ?"}</h3>
        <div className="conversation-fields">
          <div>
            <label htmlFor="conversation-name">{isEnglish ? "Your name" : "Votre nom"} *</label>
            <Input id="conversation-name" name="name" value={answers.name} autoComplete="name" required maxLength={120} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "conversation-name-error" : undefined} onChange={(event) => updateAnswer("name", event.currentTarget.value)} />
            {errors.name && <p id="conversation-name-error" className="conversation-error">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="conversation-email">{isEnglish ? "Your email" : "Votre adresse email"} *</label>
            <Input id="conversation-email" name="email" type="email" value={answers.email} autoComplete="email" required maxLength={254} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "conversation-email-error" : undefined} onChange={(event) => updateAnswer("email", event.currentTarget.value)} />
            {errors.email && <p id="conversation-email-error" className="conversation-error">{errors.email}</p>}
          </div>
        </div>
        <p className="conversation-privacy">{isEnglish ? "Your details are only used to reply to your request. Nothing is stored or sent by this site." : "Vos coordonnées servent uniquement à répondre à votre demande. Rien n’est stocké ni envoyé par ce site."}</p>
        <Button type="submit" size="lg" className="conversation-submit">{isEnglish ? "See my summary" : "Voir mon récapitulatif"}<ArrowRight aria-hidden="true" /></Button>
      </>
    );
  };

  const renderSummary = () => {
    const rows = [
      [isEnglish ? "Project type" : "Type de projet", briefEmail.values.projectType],
      [isEnglish ? "Business / activity" : "Entreprise / activité", briefEmail.values.activity],
      [isEnglish ? "Name" : "Nom", briefEmail.values.name],
      [isEnglish ? "Email" : "Email", briefEmail.values.email],
      [isEnglish ? "Current problem" : "Problème actuel", briefEmail.values.problem],
      [isEnglish ? "Expected result" : "Résultat attendu", briefEmail.values.outcome],
      [isEnglish ? "Budget" : "Budget", briefEmail.values.budget],
      [isEnglish ? "Timing" : "Délai", briefEmail.values.timeline],
      [isEnglish ? "Existing website or tool" : "Site ou outil existant", briefEmail.values.website],
    ];
    return (
      <div className="conversation-summary" data-conversation-summary>
        <h3 ref={questionRef} tabIndex={-1} className="conversation-question">{isEnglish ? "Your project is ready to share!" : "Votre projet est prêt à être partagé !"}</h3>
        <dl className="conversation-summary-list">
          {rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
        <div className="conversation-summary-actions">
          <Button type="button" variant="outline" onClick={() => { setIsSummary(false); setStep(7); setDirection("back"); }}>{isEnglish ? "Edit my answers" : "Modifier mes réponses"}</Button>
          <Button asChild size="lg" className="bg-cta text-cta-foreground hover:bg-cta/90">
            <a href={emailHref} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("cta_click", { location: context, cta: "email" })}><Mail aria-hidden="true" />{isEnglish ? "Prepare my email" : "Préparer mon email"}</a>
          </Button>
        </div>
        <Textarea ref={previewRef} id="conversation-preview" aria-label={isEnglish ? "Message to send" : "Message à envoyer"} value={briefEmail.body} readOnly rows={10} className="conversation-preview" />
        {copyStatus !== "idle" && <p className="conversation-help" role="status">{copyStatus === "copied" ? (isEnglish ? "Brief copied. Paste it into your email and send it." : "Brief copié. Collez-le dans votre email, puis envoyez-le.") : (isEnglish ? "Automatic copy is unavailable. The text is selected: copy it manually." : "La copie automatique est indisponible. Le texte est sélectionné : copiez-le manuellement.")}</p>}
        <Button type="button" variant="outline" onClick={() => void copyBrief()} className="conversation-copy"><Copy aria-hidden="true" />{isEnglish ? "Copy my message" : "Copier mon message"}</Button>
        <p className="conversation-no-send" role="status">{isEnglish ? "Gmail opens in a new tab with the recipient, subject and brief prefilled. Nothing is sent automatically." : "Gmail s’ouvre dans un nouvel onglet avec le destinataire, l’objet et le brief préremplis. Rien n’est envoyé automatiquement."}</p>
      </div>
    );
  };

  return (
    <form className="conversation-form" aria-label={isEnglish ? "Project conversation" : "Parlons de votre projet"} noValidate onSubmit={submitDetails}>
      <div className="conversation-header">
        <span>{isEnglish ? "LET’S TALK ABOUT YOUR PROJECT" : "PARLONS DE VOTRE PROJET"}</span>
        <span>{isEnglish ? "One question at a time" : "1 question à la fois"}</span>
      </div>
      <ol className="conversation-progress" aria-label={isEnglish ? "Conversation progress" : "Progression du parcours"}>
        {progress.map((item) => <li key={item} className={item < currentStep || isSummary ? "is-complete" : item === currentStep ? "is-current" : ""}><span>{isEnglish ? `Step ${item}` : `Étape ${item}`}</span></li>)}
      </ol>
      <div className="conversation-step-label">{stepLabel}</div>
      <div className={`conversation-panel conversation-panel-${direction}`} aria-live="polite">
        {isSummary ? renderSummary() : renderQuestion()}
      </div>
      <div className="conversation-footer">
        <button type="button" className="conversation-back" onClick={goBack} disabled={!isSummary && step === 1} aria-label={isEnglish ? "Go back" : "Revenir à la question précédente"}><ArrowLeft aria-hidden="true" />{isEnglish ? "Back" : "Retour"}</button>
        <span>{isSummary ? (isEnglish ? "Check your answers before opening your email" : "Vérifiez vos réponses avant d’ouvrir votre email") : nextHint}</span>
      </div>
    </form>
  );
};

export default ConversationalBrief;
