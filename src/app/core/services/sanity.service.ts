import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Project, ProjectSummary } from '../models/project.model';
import { SANITY_CONFIG } from '../tokens/sanity.token';

const GROQ = {
  projects: `*[_type == "project"] | order(order asc) {
    _id, title, slug, description_es, description_en,
    stack, role, featured, order,
    "imageUrl": image.asset->url, url, repo
  }`,
  projectBySlug: `*[_type == "project" && slug.current == $slug][0] {
    _id, title, slug, description_es, description_en,
    stack, role, highlights, featured, order,
    "imageUrl": image.asset->url, url, repo
  }`,
};

@Injectable({ providedIn: 'root' })
export class SanityService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(SANITY_CONFIG);

  get isConfigured(): boolean {
    return !!this.config.projectId && this.config.projectId !== 'YOUR_PROJECT_ID';
  }

  private get apiUrl(): string {
    const { projectId, dataset, apiVersion } = this.config;
    return `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`;
  }

  private query<T>(groq: string, params?: Record<string, unknown>): Observable<T> {
    const httpParams: Record<string, string> = { query: groq };
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        httpParams[`$${k}`] = JSON.stringify(v);
      });
    }

    const headers: Record<string, string> = {};
    if (this.config.token) {
      headers['Authorization'] = `Bearer ${this.config.token}`;
    }

    return this.http
      .get<{ result: T }>(this.apiUrl, { params: httpParams, headers })
      .pipe(map((r) => r.result));
  }

  getProjects(): Observable<ProjectSummary[]> {
    if (!this.isConfigured) return of([]);
    return this.query<ProjectSummary[]>(GROQ.projects);
  }

  getProjectBySlug(slug: string): Observable<Project | null> {
    if (!this.isConfigured) return of(null);
    return this.query<Project | null>(GROQ.projectBySlug, { slug });
  }
}
