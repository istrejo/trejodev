import {
  Component,
  LOCALE_ID,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../../shared/atoms/button/button';
import { Icon } from '../../../shared/atoms/icon/icon';
import { Tag } from '../../../shared/atoms/tag/tag';
import { ProjectDataService } from '../../../core/services/project-data.service';
import { SeoService } from '../../../core/services/seo.service';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink, Button, Tag, Icon],
  template: `
    <!-- Loading -->
    @if (loading()) {
      <div class="max-w-4xl mx-auto px-6 py-20 animate-pulse space-y-6">
        <div class="h-6 bg-border/40 rounded w-1/3"></div>
        <div class="h-10 bg-border/40 rounded w-2/3"></div>
        <div class="h-4 bg-border/40 rounded w-full"></div>
        <div class="h-4 bg-border/40 rounded w-5/6"></div>
        <div class="h-4 bg-border/40 rounded w-4/6"></div>
      </div>
    }

    <!-- Error / not found -->
    @if (!loading() && !project()) {
      <div class="max-w-4xl mx-auto px-6 py-20 text-center space-y-4">
        <p class="font-mono text-xl text-muted">Proyecto no encontrado.</p>
        <app-button variant="secondary">
          <a routerLink="/projects" class="contents">← Volver a proyectos</a>
        </app-button>
      </div>
    }

    <!-- Content -->
    @if (!loading() && project(); as p) {
      <!-- Hero -->
      <section class="border-b border-border">
        <div class="max-w-4xl mx-auto px-6 py-16 space-y-6">
          <a
            routerLink="/projects"
            class="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-text transition-colors duration-150"
          >
            <app-icon name="chevron-right" size="xs" class="rotate-180 inline-block" />
            Proyectos
          </a>

          @if (p.featured) {
            <span class="block font-mono text-xs text-accent-1 tracking-widest uppercase">Featured</span>
          }

          <h1 class="font-mono font-bold text-3xl sm:text-4xl text-text leading-tight">
            {{ p.title }}
          </h1>

          <p class="text-muted leading-relaxed max-w-2xl text-base">
            {{ description() }}
          </p>

          <!-- Links -->
          <div class="flex flex-wrap gap-3">
            @if (p.url) {
              <app-button variant="primary" size="sm">
                <a [href]="p.url" target="_blank" rel="noopener noreferrer" class="contents inline-flex items-center gap-2">
                  Ver demo <app-icon name="external-link" size="xs" />
                </a>
              </app-button>
            }
            @if (p.repo) {
              <app-button variant="secondary" size="sm">
                <a [href]="p.repo" target="_blank" rel="noopener noreferrer" class="contents inline-flex items-center gap-2">
                  Código <app-icon name="github" size="xs" />
                </a>
              </app-button>
            }
          </div>
        </div>
      </section>

      <!-- Image -->
      @if (p.imageUrl) {
        <div class="max-w-4xl mx-auto px-6 py-8">
          <img
            [src]="p.imageUrl"
            [alt]="p.title"
            class="w-full border border-border"
            loading="eager"
          />
        </div>
      }

      <!-- Details grid -->
      <div class="max-w-4xl mx-auto px-6 py-12 grid md:grid-cols-[1fr_280px] gap-12">

        <!-- Highlights -->
        <div class="space-y-6">
          <h2 class="font-mono font-semibold text-lg text-text">Highlights</h2>
          <ul class="space-y-3">
            @for (h of p.highlights; track h) {
              <li class="flex items-start gap-3 text-sm text-muted leading-relaxed">
                <span class="text-accent-1 font-mono mt-0.5 shrink-0">→</span>
                {{ h }}
              </li>
            }
          </ul>
        </div>

        <!-- Sidebar: tech + meta -->
        <div class="space-y-6">
          <div class="border border-border bg-surface p-5 space-y-4">
            <div>
              <span class="font-mono text-xs text-muted uppercase tracking-wider">Rol</span>
              <p class="font-mono text-sm text-text mt-1">{{ p.role }}</p>
            </div>
            <div>
              <span class="font-mono text-xs text-muted uppercase tracking-wider">Stack</span>
              <div class="flex flex-wrap gap-1.5 mt-2">
                @for (tech of p.stack; track tech) {
                  <app-tag>{{ tech }}</app-tag>
                }
              </div>
            </div>
          </div>
        </div>

      </div>
    }
  `,
})
export class ProjectDetail {
  slug = input.required<string>();

  private readonly projectData = inject(ProjectDataService);
  private readonly seo = inject(SeoService);
  private readonly localeId = inject(LOCALE_ID);

  readonly loading = signal(true);
  readonly project = signal<Project | null>(null);

  readonly description = computed(() => {
    const p = this.project();
    if (!p) return '';
    return this.localeId.startsWith('en') ? p.description_en : p.description_es;
  });

  private readonly loadProjectEffect = effect((onCleanup) => {
    const slug = this.slug();

    this.loading.set(true);
    this.project.set(null);

    const subscription = this.projectData.getProjectBySlug(slug).subscribe({
      next: (project) => {
        this.project.set(project);
        this.loading.set(false);

        if (project) {
          const description = this.localeId.startsWith('en')
            ? project.description_en
            : project.description_es;
          this.seo.set({ title: project.title, description, url: `/projects/${project.slug}` });
        }
      },
      error: () => {
        this.project.set(null);
        this.loading.set(false);
      },
    });

    onCleanup(() => subscription.unsubscribe());
  });
}
