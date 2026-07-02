export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company?: string;
  service: string;
  text: string;
  image?: string | null; // optional path or null
};

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Éloi V.",
    role: "Coach sportif & ostéopathe",
    service: "Site vitrine & optimisation SEO",
    text: "Un site clair, professionnel et rassurant, parfaitement aligné avec mon activité. Le rendu met mes services en valeur et instaure la confiance dès les premières secondes.",
    image: "/img_clients/eloi.png",
  },
  {
    id: "t-2",
    name: "Luxury Auto",
    role: "Fondateur",
    service: "Site vitrine & optimisation SEO",
    text: "Le résultat correspond exactement à l’image haut de gamme que je souhaitais transmettre. Le site est élégant, fluide et met en valeur la qualité de nos prestations.",
    image: "/img_clients/luxury-auto.png",
  },
  {
    id: "t-3",
    name: "José",
    role: "Gérant",
    service: "ERP sur mesure",
    text: "Solution robuste et évolutive, livrée dans les délais. Accompagnement professionnel pendant toute la durée du projet.",
    image: "/img_clients/jose.png",
  },
  {
    id: "t-4",
    name: "Utilisateur d'Aqualis",
    role: "",
    service: "Application mobile",
    text: "Application très intuitive et apaisante — j'adore gérer mes poissons et mes aquariums au quotidien.",
    image: "/img_clients/user.png",
  },
  {
    id: "t-5",
    name: "Marino",
    role: "Clé de Voûte · Gérant",
    service: "Site vitrine & optimisation SEO",
    text: "Très bon accompagnement du début à la fin. Le site met en avant notre savoir-faire de manière claire et professionnelle, avec une présentation qui correspond tout à fait à notre activité.",
    image: "/img_clients/marino.png",
  },

];

export default testimonials;
