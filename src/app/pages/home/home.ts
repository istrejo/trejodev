import { Component, LOCALE_ID, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectSummary } from '../../core/models/project.model';
import { ProjectDataService } from '../../core/services/project-data.service';
import { SeoService } from '../../core/services/seo.service';
import { Button } from '../../shared/atoms/button/button';
import { Tag } from '../../shared/atoms/tag/tag';
import { Icon } from '../../shared/atoms/icon/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';

const STACK_TAGS = [
  'Angular', 'TypeScript', 'RxJS', 'Nx', 'Storybook',
  'Microfrontends', 'Module Federation', 'Docker', 'CI/CD',
  'Hexagonal Architecture', 'SOLID', 'Tailwind',
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, Button, Tag, Icon, RevealDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private readonly projectData = inject(ProjectDataService);
  private readonly seo = inject(SeoService);
  private readonly localeId = inject(LOCALE_ID);

  readonly stackTags = STACK_TAGS;
  readonly projects = signal<ProjectSummary[]>([]);
  readonly projectsLoading = signal(true);

  readonly philosophy = [
    { label: 'Arquitectura > Framework', desc: 'El framework es un detalle de implementación.' },
    { label: 'Contexto > Tendencias', desc: 'Cada problema exige su propia solución.' },
    { label: 'Fundamentos > Atajos', desc: 'El conocimiento profundo escala, los atajos no.' },
  ];

  ngOnInit(): void {
    this.seo.set({
      title: 'Alejandro Trejo — Senior Frontend Developer',
      description: 'Senior Frontend Developer especializado en Angular, microfrontend architecture y criterio arquitectónico pragmático. Fundador de Digitalmente Studio.',
      url: '/',
    });

    this.projectData.getFeaturedProjects().subscribe({
      next: (projects) => {
        this.projects.set(projects);
        this.projectsLoading.set(false);
      },
      error: () => {
        this.projects.set([]);
        this.projectsLoading.set(false);
      },
    });
  }

  projectDescription(project: ProjectSummary): string {
    return this.localeId.startsWith('en') ? project.description_en : project.description_es;
  }
}
