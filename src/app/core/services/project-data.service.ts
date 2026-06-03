import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PROJECTS } from '../data/projects.data';
import { Project, ProjectSummary } from '../models/project.model';

const PROJECT_SUMMARIES: ProjectSummary[] = PROJECTS.map(({ highlights: _highlights, ...project }) => project);

@Injectable({ providedIn: 'root' })
export class ProjectDataService {
  getProjects(): Observable<ProjectSummary[]> {
    return of(PROJECT_SUMMARIES);
  }

  getFeaturedProjects(limit = 2): Observable<ProjectSummary[]> {
    return of(PROJECT_SUMMARIES.filter((project) => project.featured).slice(0, limit));
  }

  getProjectBySlug(slug: string): Observable<Project | null> {
    return of(PROJECTS.find((project) => project.slug === slug) ?? null);
  }
}
