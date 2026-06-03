import { describe, expect, it } from 'vitest';
import { PublicProjectRow, toProjectApiDetail, toProjectApiSummary } from './project-api';

const PROJECT_ROW: PublicProjectRow = {
  id: 'project-1',
  slug: 'ecommerce-mfe',
  title: 'eCommerce Microfrontend',
  description_es: 'Descripcion ES',
  description_en: 'Description EN',
  role: 'Frontend Architect',
  stack: ['Angular', 'Nx'],
  highlights_es: ['Shell + remotes'],
  highlights_en: ['Shell + remotes'],
  featured: true,
  display_order: 1,
  project_url: 'https://example.com',
  repo_url: 'https://github.com/example/repo',
  cover_path: 'projects/ecommerce-mfe/cover.webp',
  published: true,
};

describe('project API mapping', () => {
  it('should map a public row into the summary contract used by the frontend', () => {
    expect(toProjectApiSummary(PROJECT_ROW, 'https://cdn.example.com/cover.webp')).toEqual({
      _id: 'project-1',
      title: 'eCommerce Microfrontend',
      slug: 'ecommerce-mfe',
      description_es: 'Descripcion ES',
      description_en: 'Description EN',
      stack: ['Angular', 'Nx'],
      role: 'Frontend Architect',
      imageUrl: 'https://cdn.example.com/cover.webp',
      url: 'https://example.com',
      repo: 'https://github.com/example/repo',
      featured: true,
      order: 1,
    });
  });

  it('should preserve bilingual highlights in the detail contract', () => {
    expect(toProjectApiDetail(PROJECT_ROW)).toMatchObject({
      slug: 'ecommerce-mfe',
      highlights_es: ['Shell + remotes'],
      highlights_en: ['Shell + remotes'],
    });
  });

  it('should normalize nullable arrays and links', () => {
    const mapped = toProjectApiDetail({
      ...PROJECT_ROW,
      stack: null,
      highlights_es: null,
      highlights_en: null,
      project_url: null,
      repo_url: null,
    });

    expect(mapped.stack).toEqual([]);
    expect(mapped.highlights_es).toEqual([]);
    expect(mapped.highlights_en).toEqual([]);
    expect(mapped.url).toBeUndefined();
    expect(mapped.repo).toBeUndefined();
  });
});
