// WARNING: These are placeholder testimonials for layout and should be
// replaced by real client feedback before deploying to production.
// Each entry can optionally include an `image` path pointing to
// `/images/testimonials/<file>` in `public/` or an import from `src/assets/`.

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company?: string;
  rating?: number; // optional 1-5
  service: string;
  text: string;
  image?: string | null; // optional path or null
};

export const testimonials: Testimonial[] = [
  {
    id: "t-placeholder-1",
    name: "Éloi V.",
    role: "Coach sportif & ostéopathe",
    service: "Site vitrine & optimisation SEO",
    text: "Un site clair, professionnel et rassurant, parfaitement aligné avec mon activité. Le rendu met mes services en valeur et instaure la confiance dès les premières secondes.",
    image: "/img_clients/eloi.png",
    rating: 5,
  },
  {
    id: "t-placeholder-2",
    name: "Antony",
    role: "Influenceur · Créateur de contenu",
    service: "MVP produit",
    text: "MVP livré rapidement — l'approche itérative nous a permis de valider notre hypothèse en quelques semaines.",
    image: "/img_clients/antony.png",
    rating: 4.8,
  },
  {
    id: "t-placeholder-3",
    name: "Luxury Auto",
    role: "Fondateur",
    service: "Site vitrine & optimisation SEO",
    text: "Le résultat correspond exactement à l’image haut de gamme que je souhaitais transmettre. Le site est élégant, fluide et met en valeur la qualité de nos prestations.",
    image: "/img_clients/luxury-auto.png",
    rating: 4.9,
  },
  {
    id: "t-placeholder-4",
    name: "José",
    role: "Gérant",
    service: "ERP sur mesure",
    text: "Solution robuste et évolutive, livrée dans les délais. Accompagnement professionnel pendant toute la durée du projet.",
    image: "/img_clients/jose.png",
    rating: 4.7,
  },
  {
    id: "t-placeholder-5",
    name: "Utilisateur d'Aqualis",
    role: "",
    service: "Application mobile",
    text: "Application très intuitive et apaisante — j'adore gérer mes poissons et mes aquariums au quotidien.",
    image: "/img_clients/user.png",
    rating: 4.6,
  },
  {
    id: "t-placeholder-6",
    name: "Marino",
    role: "Clé de Voûte · Gérant",
    service: "Site vitrine & optimisation SEO",
    text: "Très bon accompagnement du début à la fin. Le site met en avant notre savoir-faire de manière claire et professionnelle, avec une présentation qui correspond tout à fait à notre activité.",
    image: "/img_clients/marino.png",
    rating: 4.9,
  },

];

export function getRatingSummary() {
  const count = testimonials.length;
  const avg = testimonials.reduce((s, t) => s + t.rating, 0) / Math.max(1, count);
  return { count, avg: Math.round(avg * 10) / 10 };
}

export default testimonials;
