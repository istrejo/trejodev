import { Project } from './project.model';

export function getLocalizedProjectDescription(
  localeId: string,
  project: Pick<Project, 'description_es' | 'description_en'>,
): string {
  return localeId.startsWith('en') ? project.description_en : project.description_es;
}

export function getProjectSeoConfig(
  localeId: string,
  project: Pick<Project, 'title' | 'slug' | 'description_es' | 'description_en'>,
): { title: string; description: string; url: string } {
  return {
    title: project.title,
    description: getLocalizedProjectDescription(localeId, project),
    url: `/projects/${project.slug}`,
  };
}
