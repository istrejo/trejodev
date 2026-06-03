import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, LOCALE_ID, REQUEST, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProjectApiDetail, ProjectApiSummary } from '../models/project-api.model';
import { Project, ProjectSummary } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectDataService {
  private readonly http = inject(HttpClient);
  private readonly localeId = inject(LOCALE_ID);
  private readonly request = inject(REQUEST, { optional: true });

  getProjects(): Observable<ProjectSummary[]> {
    return this.http.get<ProjectApiSummary[]>(this.apiUrl('/api/projects'));
  }

  getFeaturedProjects(limit = 2): Observable<ProjectSummary[]> {
    return this.http
      .get<ProjectApiSummary[]>(this.apiUrl('/api/projects/featured'))
      .pipe(map((projects) => projects.slice(0, limit)));
  }

  getProjectBySlug(slug: string): Observable<Project | null> {
    return this.http.get<ProjectApiDetail>(this.apiUrl(`/api/projects/${slug}`)).pipe(
      map((project) => this.toProject(project)),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of(null);
        }

        return throwError(() => error);
      }),
    );
  }

  private apiUrl(path: string): string {
    if (!this.request) {
      return path;
    }

    return new URL(path, this.request.url).toString();
  }

  private toProject(project: ProjectApiDetail): Project {
    return {
      ...project,
      highlights: this.localeId.startsWith('en') ? project.highlights_en : project.highlights_es,
    };
  }
}
