import { useEffect, useMemo } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n";

const FreelanceFaq = () => {
  const { isEnglish } = useLanguage();
  const faqItems = useMemo(() => (isEnglish
    ? [
        {
          question: "What are the usual timelines?",
          answer:
            "It depends on the scope. A focused task can take days, an MVP a few weeks, and a light ERP several delivery stages. A realistic plan is defined during scoping.",
        },
        {
          question: "How does billing work?",
          answer:
            "Depending on the need, I can work on a daily rate, a fixed-price scope or staged delivery. The format is agreed upfront with milestones and deliverables.",
        },
        {
          question: "Who owns the code?",
          answer:
            "Delivered code can be transferred to the client under the terms of the quotation or contract. Handover and documentation are planned for team autonomy.",
        },
        {
          question: "Do you offer maintenance?",
          answer:
            "Yes. I can provide post-delivery support: fixes, improvements, performance optimisation and technical follow-up.",
        },
        {
          question: "Can you take over an existing project?",
          answer:
            "Yes, after a quick review of the existing code, technical debt, infrastructure and risks. The goal is to secure the handover before adding features.",
        },
        {
          question: "Can you sign an NDA?",
          answer:
            "Yes, I can sign an NDA before sensitive information is shared to protect your project and data.",
        },
      ]
    : [
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
            "Oui. Je peux assurer un accompagnement post-livraison : correctifs, évolutions, optimisation performance et suivi technique.",
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
      ]), [isEnglish]);

  useEffect(() => {
    const schemaId = "freelance-faq-schema";
    document.getElementById(schemaId)?.remove();

    const schema = document.createElement("script");
    schema.id = schemaId;
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://bastienlopez.fr/freelance#faq",
      url: "https://bastienlopez.fr/freelance",
      inLanguage: isEnglish ? "en-US" : "fr-FR",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
    document.head.appendChild(schema);

    return () => {
      if (document.getElementById(schemaId) === schema) schema.remove();
    };
  }, [faqItems, isEnglish]);

  return (
    <section className="section-odd relative overflow-hidden px-4 py-12 md:py-16" aria-labelledby="freelance-faq-title">
      <div className="relative z-10 mx-auto max-w-6xl">
        <Card className="border-border bg-card p-5 md:p-6">
          <div className="mb-5 flex items-center gap-3">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h2 id="freelance-faq-title" className="text-2xl font-bold">
              {isEnglish ? "Frequently asked questions" : "Mini FAQ Freelance"}
            </h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <details
                key={item.question}
                open={index === 0}
                className="group rounded-lg border border-border bg-secondary/20 px-4 py-3"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-medium text-foreground">
                  {item.question}
                  <ChevronDown className="h-4 w-4 text-primary transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-6 text-foreground/75">{item.answer}</p>
              </details>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FreelanceFaq;
