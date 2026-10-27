import type { ServicePageDefinition } from "@/data/site-pages";
import { useLanguage } from "@/lib/i18n";

export default function ServiceConditions({ service, headingAs: Heading = "h2" }: { service: ServicePageDefinition | undefined; headingAs?: "h2" | "h4" }) {
  const { locale, isEnglish } = useLanguage();
  if (!service?.conditions) return null;

  return (
    <div className="mt-6" data-service-conditions>
      <Heading className="text-base font-semibold text-foreground">{isEnglish ? "Scope, budget and next step" : "Périmètre, budget et prochaine étape"}</Heading>
      <dl className="mt-3 divide-y divide-border border-t border-border text-sm leading-6">
        {service.conditions.map(({ label, value }) => (
          <div key={label.fr} className="py-3">
            <dt className="font-semibold text-foreground">{label[locale]}</dt>
            <dd className="mt-1 text-muted-foreground">{value[locale]}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
