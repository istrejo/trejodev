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
  styles: [`
    .page-title { animation: listSlideUp 500ms ease-out 80ms both; }
    .page-filters { animation: listSlideUp 500ms ease-out 200ms both; }
    @keyframes listSlideUp {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `],
  template: `
    <!-- ═══ HEADER ══════════════════════════════════════════════════ -->
    <section class="border-b border-border">
      <div class="max-w-6xl mx-auto px-6 py-16 space-y-6">
        <span class="font-mono text-xs text-accent-1 tracking-widest uppercase">Proyectos</span>
        <h1 class="page-title font-mono font-bold text-3xl sm:text-4xl text-text">
          Trabajo real.<br>Decisiones reales.
        </h1>
        <p class="text-muted max-w-xl leading-relaxed">
          Proyectos seleccionados donde la arquitectura, el criterio técnico y
          el impacto en el negocio fueron lo primero.
        </p>
      </div>
    </section>

    <!-- ═══ FILTERS + GRID ══════════════════════════════════════════ -->
    <div class="max-w-6xl mx-auto px-6 py-12">

      <!-- Filter chips -->
      <div class="page-filters flex flex-wrap gap-2 mb-10">
        <app-chip
          [selected]="activeFilter() === 'all'"
          (click)="setFilter('all')"
        >Todos</app-chip>
        <app-chip
          [selected]="activeFilter() === 'featured'"
          (click)="setFilter('featured')"
        >Featured</app-chip>
        @for (tag of filterTags(); track tag) {
          <app-chip
            [selected]="activeFilter() === tag"
            (click)="setFilter(tag)"
          >{{ tag }}</app-chip>
        }
      </div>

      <!-- Loading state -->
      @if (loading()) {
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (i of skeletons; track i) {
            <div class="animate-pulse border border-border bg-surface p-6 space-y-4">
              <div class="aspect-video bg-border/40"></div>
              <div class="h-4 bg-border/40 rounded w-3/4"></div>
              <div class="h-3 bg-border/40 rounded w-full"></div>
              <div class="h-3 bg-border/40 rounded w-5/6"></div>
              <div class="flex gap-2 pt-2">
                <div class="h-5 w-16 bg-border/40 rounded-sm"></div>
                <div class="h-5 w-20 bg-border/40 rounded-sm"></div>
              </div>
            </div>
          }
        </div>
      }

      <!-- Empty filtered state -->
      @if (!loading() && filteredProjects().length === 0 && allProjects().length > 0) {
        <div class="py-16 text-center">
          <p class="font-mono text-sm text-muted">Sin proyectos para este filtro.</p>
        </div>
      }

      <!-- Empty state -->
      @if (!loading() && allProjects().length === 0) {
        <div class="border border-border bg-surface p-10 text-center space-y-3">
          <p class="font-mono text-sm text-muted">Todavia no hay proyectos publicados.</p>
          <p class="text-xs text-muted/60">
            El portfolio ya usa una fuente local propia y esta listo para sumar nuevos casos.
          </p>
        </div>
      }

      <!-- Projects grid -->
      @if (!loading() && filteredProjects().length > 0) {
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" appReveal>
          @for (project of filteredProjects(); track project._id) {
            <app-project-card [project]="project" />
          }
        </div>
      }

    </div>
  `,
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
