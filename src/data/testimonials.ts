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
};

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
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
    id: "t-2",
    name: "Luxury Auto",
    role: "Fondateur",
    service: "Site vitrine & optimisation SEO",
    text: "Le résultat donne une image plus professionnelle à l’activité. Le site est moderne, lisible, rapide, et met bien en valeur les prestations proposées.",
    roleEn: "Founder",
    serviceEn: "Showcase website & SEO optimisation",
    textEn: "The result gives the business a more professional image. The website is modern, clear and fast, and highlights the services effectively.",
    image: "/img_clients/luxury-auto-112.webp",
  },
  {
    id: "t-3",
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
