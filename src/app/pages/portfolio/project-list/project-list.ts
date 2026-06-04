import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ProjectCard } from '../../../shared/molecules/project-card/project-card';
import { Chip } from '../../../shared/atoms/chip/chip';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { ProjectDataService } from '../../../core/services/project-data.service';
import { SeoService } from '../../../core/services/seo.service';
import { ProjectSummary } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ProjectCard, Chip, RevealDirective],
  templateUrl: './project-list.html',
  styleUrl: './project-list.scss',
})
export class ProjectList implements OnInit {
  private readonly projectData = inject(ProjectDataService);
  private readonly seo = inject(SeoService);

  readonly loading = signal(true);
  readonly allProjects = signal<ProjectSummary[]>([]);
  readonly activeFilter = signal<string>('all');

  readonly skeletons = [1, 2, 3, 4, 5, 6];

  readonly filterTags = computed(() => {
    const tags = new Set<string>();
    this.allProjects().forEach((p) => p.stack.slice(0, 3).forEach((t) => tags.add(t)));
    return [...tags].slice(0, 6);
  });

  readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    const projects = this.allProjects();
    if (filter === 'all') return projects;
    if (filter === 'featured') return projects.filter((p) => p.featured);
    return projects.filter((p) => p.stack.includes(filter));
  });

  ngOnInit(): void {
    this.seo.set({
      title: 'Proyectos',
      description: 'Portfolio de proyectos Angular: microfrontends, migraciones, design systems y arquitecturas de alta complejidad.',
      url: '/projects',
    });
    this.load();
  }

  load(): void {
    this.loading.set(true);

    this.projectData.getProjects().subscribe({
      next: (projects) => {
        this.allProjects.set(projects);
        this.loading.set(false);
      },
      error: () => {
        this.allProjects.set([]);
        this.loading.set(false);
      },
    });
  }

  setFilter(filter: string): void {
    this.activeFilter.set(filter);
  }
}
