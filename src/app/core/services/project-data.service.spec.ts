import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { ProjectDataService } from './project-data.service';

describe('ProjectDataService', () => {
  let service: ProjectDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectDataService);
  });

  it('should return ordered project summaries', async () => {
    const projects = await firstValueFrom(service.getProjects());

    expect(projects.map((project) => project.slug)).toEqual([
      'ecommerce-mfe',
      'legalo-app',
      'platzi-ratings',
      'mastery-habits',
    ]);
    expect(projects.every((project) => 'highlights' in project)).toBe(false);
  });

  it('should return featured projects only', async () => {
    const projects = await firstValueFrom(service.getFeaturedProjects());

    expect(projects.map((project) => project.slug)).toEqual(['ecommerce-mfe', 'legalo-app']);
  });

  it('should resolve a project by slug', async () => {
    const project = await firstValueFrom(service.getProjectBySlug('legalo-app'));

    expect(project?.title).toBe('Legalo App');
    expect(project?.highlights.length).toBeGreaterThan(0);
  });

  it('should return null for an unknown slug', async () => {
    const project = await firstValueFrom(service.getProjectBySlug('missing-project'));

    expect(project).toBeNull();
  });
});
