import { describe, expect, it } from 'vitest';
import { getLocalizedProjectDescription, getProjectSeoConfig } from './project-seo';

const PROJECT_FIXTURE = {
  title: 'Legalo App',
  slug: 'legalo-app',
  description_es: 'Descripcion en espanol',
  description_en: 'Description in English',
};

describe('project SEO helpers', () => {
  it('should return the spanish description for spanish locales', () => {
    expect(getLocalizedProjectDescription('es-MX', PROJECT_FIXTURE)).toBe('Descripcion en espanol');
  });

  it('should return the english description for english locales', () => {
    expect(getLocalizedProjectDescription('en-US', PROJECT_FIXTURE)).toBe('Description in English');
  });

  it('should build project SEO config for english locales', () => {
    expect(getProjectSeoConfig('en-US', PROJECT_FIXTURE)).toEqual({
      title: 'Legalo App',
      description: 'Description in English',
      url: '/projects/legalo-app',
    });
  });
});
