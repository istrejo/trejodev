import { ProjectApiDetail, ProjectApiSummary } from '../app/core/models/project-api.model';

export interface PublicProjectRow {
  id: string;
  slug: string;
  title: string;
  description_es: string;
  description_en: string;
  role: string;
  stack: string[] | null;
  highlights_es: string[] | null;
  highlights_en: string[] | null;
  featured: boolean;
  display_order: number;
  project_url: string | null;
  repo_url: string | null;
  cover_path: string | null;
  published: boolean;
}

function normalizeArray(value: string[] | null): string[] {
  return value ?? [];
}

function normalizeLink(value: string | null): string | undefined {
  return value ?? undefined;
}

export function toProjectApiSummary(
  row: PublicProjectRow,
  imageUrl?: string,
): ProjectApiSummary {
  return {
    _id: row.id,
    title: row.title,
    slug: row.slug,
    description_es: row.description_es,
    description_en: row.description_en,
    stack: normalizeArray(row.stack),
    role: row.role,
    imageUrl,
    url: normalizeLink(row.project_url),
    repo: normalizeLink(row.repo_url),
    featured: row.featured,
    order: row.display_order,
  };
}

export function toProjectApiDetail(
  row: PublicProjectRow,
  imageUrl?: string,
): ProjectApiDetail {
  return {
    ...toProjectApiSummary(row, imageUrl),
    highlights_es: normalizeArray(row.highlights_es),
    highlights_en: normalizeArray(row.highlights_en),
  };
}
