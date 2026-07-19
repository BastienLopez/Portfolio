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
    text: "Le site correspond exactement au besoin : clair, professionnel et simple à utiliser. Les échanges ont été fluides, avec des ajustements rapides après retour.",
    image: "/img_clients/eloi.png",
  },
  {
    id: "t-2",
    name: "Luxury Auto",
    role: "Fondateur",
    service: "Site vitrine & optimisation SEO",
    text: "Le résultat donne une image plus professionnelle à l’activité. Le site est moderne, lisible, rapide, et met bien en valeur les prestations proposées.",
    image: "/img_clients/luxury-auto.png",
  },
  {
    id: "t-3",
    name: "José",
    role: "Gérant",
    service: "ERP sur mesure",
    text: "L’outil a permis de mieux centraliser les informations et de simplifier le suivi quotidien. L’interface est claire et adaptée aux besoins terrain.",
    image: "/img_clients/jose.png",
  },
  {
    id: "t-4",
    name: "Utilisateur Aqualis anonymisé",
    role: "Retour utilisateur anonymisé",
    service: "Application mobile",
    text: "Application très intuitive et apaisante — j'adore gérer mes poissons et mes aquariums au quotidien.",
    image: "/img_clients/user.png",
  },
  {
    id: "t-5",
    name: "Marino",
    role: "Clé de Voûte · Gérant",
    service: "Site vitrine & optimisation SEO",
    text: "Le projet a été bien cadré dès le départ. Le rendu est propre, adapté à notre activité, et les modifications ont été intégrées efficacement.",
    image: "/img_clients/marino.png",
  },
  {
    id: "t-6",
    name: "Utilisateur ATS anonymisé",
    role: "Retour utilisateur anonymisé",
    service: "Site ATS CV",
    text: "L’application répond bien au besoin initial : analyser rapidement un CV et obtenir un retour lisible. Le fonctionnement est simple, utile et efficace.",
    image: "/img_clients/user.png",
  },

];

export default testimonials;
