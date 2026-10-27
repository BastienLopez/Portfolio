export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company?: string;
  service: string;
  text: string;
  roleEn: string;
  serviceEn: string;
  textEn: string;
  image?: string | null; // optional path or null
  context?: Record<"fr" | "en", { need: string; delivery: string; outcome: string }>;
  highlightedMetrics?: Record<"fr" | "en", readonly string[]>;
};

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    context: {
      fr: { need: "Présenter une activité de coaching sportif et d’ostéopathie sans disperser les prestations.", delivery: "Site vitrine one-page, contenus hiérarchisés et parcours de contact adapté au mobile.", outcome: "Le client rapporte une hausse de 45 % des clients trouvés grâce à la présence en ligne, avec un site clair, professionnel et simple à utiliser. Période de comparaison et source analytique non publiées." },
      en: { need: "Present sports coaching and osteopathy services in one clear journey.", delivery: "A one-page website with structured content and a mobile-friendly contact journey.", outcome: "The client reports a 45% increase in clients found through the online presence, with a clear, professional and easy-to-use website. The comparison period and analytics source are not published." },
    },
    highlightedMetrics: { fr: ["45 %"], en: ["45%"] },
    name: "Éloi V.",
    role: "Coach sportif & ostéopathe",
    service: "Site vitrine & optimisation SEO",
    text: "Le site correspond exactement au besoin : clair, professionnel et simple à utiliser. Les échanges ont été fluides, avec des ajustements rapides après retour.",
    roleEn: "Sports coach & osteopath",
    serviceEn: "Showcase website & SEO optimisation",
    textEn: "The website matches the need exactly: clear, professional and easy to use. Communication was smooth, with quick adjustments after feedback.",
    image: "/img_clients/eloi-112.webp",
  },
  {
    id: "t-3",
    context: {
      fr: { need: "Centraliser les informations et faciliter le suivi quotidien de plusieurs micro-crèches.", delivery: "ERP sur mesure avec interface métier et droits d’accès par profil.", outcome: "Le gérant rapporte un gain hebdomadaire moyen de 15 % pour la gestion des professionnels et des crèches, avec une centralisation et un suivi quotidien simplifiés. La période de comparaison et la méthode de mesure ne sont pas publiées." },
      en: { need: "Centralise information and make daily tracking easier across several nurseries.", delivery: "A tailored ERP with a business interface and role-based access.", outcome: "The manager reports an average 15% weekly efficiency gain for professional and nursery management, with easier information centralisation and daily tracking. The comparison period and measurement method are not published." },
    },
    highlightedMetrics: { fr: ["15 %"], en: ["15%"] },
    name: "J. DM",
    role: "Gérant",
    service: "ERP sur mesure",
    text: "L’outil a permis de mieux centraliser les informations et de simplifier le suivi quotidien. L’interface est claire et adaptée aux besoins terrain.",
    roleEn: "Manager",
    serviceEn: "Custom ERP",
    textEn: "The tool made it easier to centralise information and simplify daily tracking. The interface is clear and adapted to field needs.",
    image: "/img_clients/jose-112.webp",
  },
  {
    id: "t-4",
    context: {
      fr: { need: "Présenter les prestations et réalisations d’une entreprise de maçonnerie et faciliter le contact.", delivery: "Site vitrine responsive, organisation des services et galerie de réalisations.", outcome: "Après la refonte, le client rapporte +60 % de trafic et +17 % de devis mensuels, avec un rendu jugé propre et adapté à l’activité. La période de comparaison et la source analytics ne sont pas publiées." },
      en: { need: "Present a masonry business, its services and completed work, with a clear contact path.", delivery: "A responsive showcase website with structured services and a project gallery.", outcome: "After the redesign, the client reports 60% more traffic and 17% more monthly quote requests, with a clean result suited to the business. The comparison period and analytics source are not published." },
    },
    highlightedMetrics: { fr: ["+60 %", "+17 %"], en: ["60%", "17%"] },
    name: "Marino",
    role: "Clé de Voûte · Gérant",
    service: "Site vitrine & optimisation SEO",
    text: "Le projet a été bien cadré dès le départ. Le rendu est propre, adapté à notre activité, et les modifications ont été intégrées efficacement.",
    roleEn: "Clé de Voûte · Manager",
    serviceEn: "Showcase website & SEO optimisation",
    textEn: "The project was well scoped from the start. The result is clean, suited to the business, and requested changes were integrated efficiently.",
    image: "/img_clients/marino-112.webp",
  },
  {
    id: "t-5",
    name: "ATS user anonymisé",
    role: " ",
    service: "Site ATS CV",
    text: "L’application répond bien au besoin initial : analyser rapidement un CV et obtenir un retour lisible. Le fonctionnement est simple, utile et efficace.",
    roleEn: "Anonymised user feedback",
    serviceEn: "CV ATS tool",
    textEn: "The application meets the initial need: analyse a CV quickly and get clear feedback. It is simple, useful and effective.",
    image: "/img_clients/user-112.webp",
  },

];

export default testimonials;
