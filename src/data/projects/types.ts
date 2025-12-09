export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'emploi' | 'freelance' | 'opensource' | 'gaming' | 'browser';
  image: string;
  tech: string[];
  github?: string;
  demo?: string;
  detailedContent?: string;
  gallery?: string[];
}
