export type ProjectGalleryItem = {
  src: string;
  title?: string;
  alt?: string;
};

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'emploi' | 'freelance' | 'opensource' | 'gaming';
  image: string;
  tech: string[];
  github?: string;
  demo?: string;
  detailedContent?: string;
  gallery?: Array<string | ProjectGalleryItem>;
  translations?: Partial<Record<'en', Pick<Project, 'title' | 'description' | 'detailedContent'>>>;
}
