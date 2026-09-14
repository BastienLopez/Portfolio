import { ArrowUpRight, Quote } from "lucide-react";
import { Testimonial } from "@/data/testimonials";
import testimonialsData from "@/data/testimonials";
import { useLanguage } from "@/lib/i18n";

const selectedTestimonialIds = ["t-1", "t-3", "t-4"] as const;

const testimonialProjectLinks: Record<string, string> = {
  "t-1": "/freelance#project=eloi-coachsteo",
  "t-3": "/freelance#project=erp-micro-creches",
  "t-4": "/freelance#project=cledevoute",
};

const testimonialProjectLabels: Record<string, { fr: string; en: string }> = {
  "t-1": { fr: "Projet associé : Eloi CoachStéo", en: "Related project: Eloi CoachSteo" },
  "t-3": { fr: "Projet associé : ERP Micro-Crèches", en: "Related project: Multi-Nursery ERP" },
  "t-4": { fr: "Projet associé : Clé de Voûte", en: "Related project: Clé de Voûte" },
};

const Avatar = ({ name, image }: { name: string; image?: string | null }) => {
  const resolveImage = (img?: string | null) => {
    if (!img) return undefined;
    if (img.startsWith("http") || img.startsWith("data:")) return img;
    const normalized = img.replace(/^\/+/, "");
    return import.meta.env.BASE_URL + normalized;
  };

  const resolved = resolveImage(image ?? undefined);
  if (resolved) {
    return (
      <img
        src={resolved}
        alt=""
        className="h-14 w-14 rounded-full object-cover"
        loading="lazy"
        decoding="async"
      />
    );
  }

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary"
      aria-hidden="true"
    >
      {initials}
    </div>
  );
};

export default function Testimonials(): JSX.Element {
  const { isEnglish } = useLanguage();
  const testimonials = selectedTestimonialIds
    .map((id) => testimonialsData.find((testimonial) => testimonial.id === id))
    .filter((testimonial): testimonial is Testimonial => Boolean(testimonial));

  return (
    <section
      id="testimonials"
      className="section-odd relative w-full overflow-hidden py-20 md:py-28"
      aria-labelledby="testimonials-title"
    >
      <div className="container relative z-10 mx-auto w-full px-4">
        <header className="mb-10 flex max-w-4xl items-start gap-4">
          <Quote className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              {isEnglish ? "Selected feedback" : "Retours sélectionnés"}
            </p>
            <h2 id="testimonials-title" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {isEnglish
                ? "What clients and users say"
                : "Retours clients et utilisateurs anonymisés"}
            </h2>
          </div>
        </header>

        <div className="grid border-y border-border md:grid-cols-3">
          {testimonials.map((testimonial, index) => {
            const service = isEnglish ? testimonial.serviceEn : testimonial.service;
            const role = isEnglish ? testimonial.roleEn : testimonial.role;
            const text = isEnglish ? testimonial.textEn : testimonial.text;
            const projectLink = testimonialProjectLinks[testimonial.id];
            const projectLabel = testimonialProjectLabels[testimonial.id]?.[isEnglish ? "en" : "fr"];

            return (
              <article
                key={testimonial.id}
                data-testimonial-slide="true"
                aria-label={`${index + 1} / ${testimonials.length}`}
                className={`flex min-h-[18rem] flex-col py-8 md:px-6 md:py-9 ${index > 0 ? "border-t border-border md:border-l md:border-t-0" : ""}`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {service}
                </p>
                {projectLabel && (
                  <p className="mt-2 text-xs text-muted-foreground">{projectLabel}</p>
                )}
                <div className="mt-6 flex items-start gap-4">
                  <Avatar name={testimonial.name} image={testimonial.image} />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{role}</p>
                  </div>
                </div>
                <blockquote className="mt-6 flex-1 text-base leading-7 text-foreground/85">
                  “{text}”
                </blockquote>
                {projectLink && (
                  <a
                    href={projectLink}
                    className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {isEnglish ? "Open related project" : "Voir le projet associé"}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
