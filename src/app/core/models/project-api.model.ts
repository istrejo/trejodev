import { Project, ProjectSummary } from './project.model';

export interface ProjectApiSummary extends ProjectSummary {}

export interface ProjectApiDetail extends Omit<Project, 'highlights'> {
  highlights_es: string[];
  highlights_en: string[];
}
