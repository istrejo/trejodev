export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  description_es: string;
  description_en: string;
  stack: string[];
  role: string;
  highlights: string[];
  imageUrl?: string;
  url?: string;
  repo?: string;
  featured: boolean;
  order: number;
}

export type ProjectSummary = Omit<Project, 'highlights'>;
