export interface Article {
  id: string;
  title: string;
  category: 'culture' | 'devops' | 'tools' | 'architecture' | 'freelance';
  content: string;
}

export type ArticleCategory = Article['category'];
