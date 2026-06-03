import '@angular/compiler';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { LOCALE_ID, REQUEST } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { firstValueFrom } from 'rxjs';
import { ProjectApiDetail, ProjectApiSummary } from '../models/project-api.model';
import { ProjectDataService } from './project-data.service';

const PROJECT_SUMMARIES: ProjectApiSummary[] = [
  {
    _id: '1',
    title: 'eCommerce Microfrontend',
    slug: 'ecommerce-mfe',
    description_es: 'Descripcion ES',
    description_en: 'Description EN',
    stack: ['Angular'],
    role: 'Frontend Architect',
    featured: true,
    order: 1,
  },
  {
    _id: '2',
    title: 'Legalo App',
    slug: 'legalo-app',
    description_es: 'Descripcion ES 2',
    description_en: 'Description EN 2',
    stack: ['SSR'],
    role: 'Senior Frontend Engineer',
    featured: true,
    order: 2,
  },
];

const PROJECT_DETAIL: ProjectApiDetail = {
  ...PROJECT_SUMMARIES[0],
  highlights_es: ['Arquitectura compartida'],
  highlights_en: ['Shared architecture'],
};

describe('ProjectDataService', () => {
  function configureTesting(localeId: string, request?: Request): ProjectDataService {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: LOCALE_ID, useValue: localeId },
        { provide: REQUEST, useValue: request ?? null },
      ],
    });

    return TestBed.inject(ProjectDataService);
  }

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should request project summaries from the internal API', async () => {
    const service = configureTesting('es-MX');
    const http = TestBed.inject(HttpTestingController);
    const resultPromise = firstValueFrom(service.getProjects());

    http.expectOne('/api/projects').flush(PROJECT_SUMMARIES);

    await expect(resultPromise).resolves.toEqual(PROJECT_SUMMARIES);
  });

  it('should apply the featured limit after reading the featured endpoint', async () => {
    const service = configureTesting('es-MX');
    const http = TestBed.inject(HttpTestingController);
    const resultPromise = firstValueFrom(service.getFeaturedProjects(1));

    http.expectOne('/api/projects/featured').flush(PROJECT_SUMMARIES);

    await expect(resultPromise).resolves.toEqual([PROJECT_SUMMARIES[0]]);
  });

  it('should map english highlights for project detail when locale is english', async () => {
    const service = configureTesting('en-US');
    const http = TestBed.inject(HttpTestingController);
    const resultPromise = firstValueFrom(service.getProjectBySlug('ecommerce-mfe'));

    http.expectOne('/api/projects/ecommerce-mfe').flush(PROJECT_DETAIL);

    await expect(resultPromise).resolves.toMatchObject({
      slug: 'ecommerce-mfe',
      highlights: ['Shared architecture'],
    });
  });

  it('should return null for a 404 detail response', async () => {
    const service = configureTesting('es-MX');
    const http = TestBed.inject(HttpTestingController);
    const resultPromise = firstValueFrom(service.getProjectBySlug('missing-project'));

    http.expectOne('/api/projects/missing-project').flush('Not found', {
      status: 404,
      statusText: 'Not Found',
    });

    await expect(resultPromise).resolves.toBeNull();
  });

  it('should build absolute API URLs during SSR using REQUEST', async () => {
    const service = configureTesting('es-MX', new Request('https://trejodev.com/projects'));
    const http = TestBed.inject(HttpTestingController);
    const resultPromise = firstValueFrom(service.getProjects());

    http.expectOne('https://trejodev.com/api/projects').flush(PROJECT_SUMMARIES);

    await expect(resultPromise).resolves.toEqual(PROJECT_SUMMARIES);
  });
});
