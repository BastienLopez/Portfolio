import type { ReactNode } from "react";

type ProjectCaseStudySummaryProps = {
  contentHtml: string;
  description: string;
  isEnglish: boolean;
};

type ParsedSection = {
  heading: string;
  details: string[];
  paragraphs: string[];
  className: string;
  index: number;
  element: Element;
};

type CaseStudySummary = {
  overview: string[];
  tasks: string[];
  outcomes: string[];
  metrics: string[];
};

const normalizeText = (value: string) =>
  value
    .replace(/\s+/g, " ")
    .replace(/^[\s✅❌•→–—-]+/u, "")
    .trim();

const unique = (values: string[]) => {
  const seen = new Set<string>();

  return values.filter((value) => {
    const normalized = normalizeText(value);
    const key = normalized.toLocaleLowerCase();

    if (!normalized || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const textFromElement = (element: Element) => normalizeText(element.textContent ?? "");

const detailsFromSection = (section: Element) => {
  const paragraphs = Array.from(section.querySelectorAll(":scope > p, :scope > .result-box p"))
    .map(textFromElement)
    .filter(Boolean);
  const bullets = Array.from(section.querySelectorAll("li"))
    .map(textFromElement)
    .filter(Boolean);

  return {
    paragraphs: unique(paragraphs),
    details: unique([...bullets, ...paragraphs]),
  };
};

const parseSections = (contentHtml: string): ParsedSection[] => {
  if (typeof DOMParser === "undefined") return [];

  const document = new DOMParser().parseFromString(contentHtml, "text/html");

  return Array.from(document.querySelectorAll(".section"))
    .map((element, index) => {
      const headingElement = element.querySelector(":scope > h2, :scope > h3, :scope > h4");
      const heading = textFromElement(headingElement ?? element);
      const content = detailsFromSection(element);

      return {
        heading,
        ...content,
        className: element.className,
        index,
        element,
      };
    })
    .filter((section) => section.heading || section.details.length > 0);
};

const isContextSection = (section: ParsedSection) =>
  /contexte|context|présentation|presentation|overview|project context/.test(
    section.heading.toLocaleLowerCase(),
  );

const isOutcomeSection = (section: ParsedSection) =>
  /\bresults?\b|résultats?|outcome|impact|gains?|value|valeur|résultat/.test(
    `${section.className} ${section.heading}`.toLocaleLowerCase(),
  ) || /\bresults?\b|résultats?|outcome/.test(section.className.toLocaleLowerCase());

const isStatusSection = (section: ParsedSection) =>
  /statut|status|objectif|objective|limitation|limitation/.test(
    section.heading.toLocaleLowerCase(),
  );

const taskScore = (section: ParsedSection) => {
  const heading = section.heading.toLocaleLowerCase();

  if (/rôle|role|contribution/.test(heading)) return 100;
  if (/action|tâches?|workflow|périmètre|scope|implementation|mise en œuvre/.test(heading))
    return 90;
  if (/fonctionnal|features?|guide|installation|work delivered|travail réalisé/.test(heading))
    return 80;
  if (/architecture|qualité|quality|livraison|delivery|défis|challenges|tools?|outils/.test(heading))
    return 50;
  return 0;
};

const metricPattern =
  /\b\d+\+?(?:[.,]\d+)?\s*(?:%|fps|ans?|years?|jours?|days?|semaines?|weeks?|mois|months?|micro-?crèches?|nurseries?|profils?|profiles?|versions?|sources?|pages?|workflows?|mods?|établissements?|sites?)\b/i;

const metricDetails = (sections: ParsedSection[]) =>
  unique(
    sections
      .flatMap((section) => section.details)
      .filter((detail) => metricPattern.test(detail)),
  );

const metricsFromSections = (sections: ParsedSection[]) => {
  const metricSections = sections.filter(
    (section) =>
      /project-metrics|metrics-grid|metrics/.test(section.className.toLocaleLowerCase()) ||
      /chiffres|metrics?|indicateurs|numbers/.test(section.heading.toLocaleLowerCase()),
  );

  const gridMetrics = metricSections.flatMap((section) =>
    Array.from(section.element.querySelectorAll(":scope .metrics-grid > div"))
      .map((metric) =>
        unique(Array.from(metric.children).map(textFromElement)).join(" — "),
      )
      .filter(Boolean),
  );

  return gridMetrics.length > 0
    ? unique(gridMetrics)
    : metricDetails(sections.filter((section) => !isContextSection(section)));
};

const parseCaseStudy = (contentHtml: string, description: string): CaseStudySummary => {
  const sections = parseSections(contentHtml);
  const contextSection = sections.find(isContextSection);
  const outcomeSections = sections.filter(isOutcomeSection);
  const statusSections = sections.filter(isStatusSection);
  const rankedTaskSections = sections
    .map((section) => ({ section, score: taskScore(section) }))
    .filter(({ section, score }) => score > 0 && !isContextSection(section) && !isOutcomeSection(section))
    .sort((left, right) => right.score - left.score || left.section.index - right.section.index)
    .map(({ section }) => section);

  const taskSections = rankedTaskSections.length > 0
    ? rankedTaskSections
    : sections.filter((section) => !isContextSection(section) && !isOutcomeSection(section));

  return {
    overview: contextSection?.paragraphs.length
      ? contextSection.paragraphs.slice(0, 3)
      : [normalizeText(description)],
    tasks: unique(taskSections.flatMap((section) => section.details)).slice(0, 8),
    outcomes: unique(
      (outcomeSections.length > 0 ? outcomeSections : statusSections).flatMap(
        (section) => section.details,
      ),
    ).slice(0, 6),
    metrics: metricsFromSections(sections),
  };
};

const SummaryList = ({ items, emptyLabel }: { items: string[]; emptyLabel?: string }) => (
  <ul className="project-case-summary__list">
    {(items.length > 0 ? items : emptyLabel ? [emptyLabel] : []).map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

const SummarySection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section className="project-case-summary__section">
    <h3 className="project-case-summary__heading">{title}</h3>
    {children}
  </section>
);

export const ProjectCaseStudySummary = ({
  contentHtml,
  description,
  isEnglish,
}: ProjectCaseStudySummaryProps) => {
  const summary = parseCaseStudy(contentHtml, description);
  const labels = isEnglish
    ? {
        overview: "Project overview",
        tasks: "Work delivered",
        outcomes: "Outcomes & value",
        metrics: "Public metrics",
        noTasks: "See the detailed scope below.",
        noOutcomes: "No separate outcome is published for this project.",
      }
    : {
        overview: "Résumé du projet",
        tasks: "Tâches réalisées",
        outcomes: "Résultats & gains",
        metrics: "Métriques publiques",
        noTasks: "Le périmètre détaillé est présenté ci-dessous.",
        noOutcomes: "Aucun résultat distinct n’est publié pour cette fiche.",
      };

  return (
    <section className="project-case-summary" data-project-summary>
      <div className="project-case-summary__overview">
        <p className="project-case-summary__eyebrow">{labels.overview}</p>
        <div className="project-case-summary__overview-copy">
          {summary.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div
        className={`project-case-summary__grid${summary.metrics.length > 0 ? " has-metrics" : ""}`}
      >
        <SummarySection title={labels.tasks}>
          <SummaryList items={summary.tasks} emptyLabel={labels.noTasks} />
        </SummarySection>
        <SummarySection title={labels.outcomes}>
          <SummaryList items={summary.outcomes} emptyLabel={labels.noOutcomes} />
        </SummarySection>
        {summary.metrics.length > 0 ? (
          <SummarySection title={labels.metrics}>
            <SummaryList items={summary.metrics} />
          </SummarySection>
        ) : null}
      </div>
    </section>
  );
};
