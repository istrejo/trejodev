import { Component, LOCALE_ID, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../atoms/icon/icon';
import { Tag } from '../../atoms/tag/tag';
import { ProjectSummary } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink, Tag, Icon],
  styles: [`
    :host { display: block; height: 100%; }
    .card {
      transition: border-color 200ms, transform 200ms;
    }
    .card:hover {
      border-color: color-mix(in srgb, var(--color-accent-1) 40%, transparent);
      transform: translateY(-3px);
    }
  `],
  template: `
    <a
      [routerLink]="['/projects', project().slug]"
      class="card flex flex-col h-full border border-border bg-surface p-6 group"
    >
      <!-- Image or placeholder -->
      @if (project().imageUrl && imageVisible()) {
        <div class="mb-5 overflow-hidden aspect-video">
          <img
            [src]="project().imageUrl"
            [alt]="project().title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            (error)="imageVisible.set(false)"
          />
        </div>
      } @else {
        <div class="mb-5 aspect-video bg-bg border border-border flex items-center justify-center">
          <span class="font-mono text-xs text-muted/40 tracking-widest uppercase">
            {{ initials() }}
          </span>
        </div>
      }

      <!-- Content -->
      <div class="flex flex-col flex-1 gap-3">
        @if (project().featured) {
          <span class="font-mono text-xs text-accent-1 tracking-widest uppercase">Featured</span>
        }

        <h3 class="font-mono font-semibold text-base text-text leading-snug group-hover:text-accent-1 transition-colors duration-150">
          {{ project().title }}
        </h3>

        <p class="text-sm text-muted leading-relaxed flex-1">
          {{ description() }}
        </p>

        <!-- Stack tags -->
        <div class="flex flex-wrap gap-1.5 mt-auto pt-3">
          @for (tech of project().stack.slice(0, 4); track tech) {
            <app-tag>{{ tech }}</app-tag>
          }
          @if (project().stack.length > 4) {
            <span class="inline-flex items-center px-2 py-1 text-xs font-mono text-muted">
              +{{ project().stack.length - 4 }}
            </span>
          }
        </div>

        <!-- Links -->
        <div class="flex items-center gap-4 pt-3 border-t border-border">
          <span class="font-mono text-xs text-muted">{{ project().role }}</span>
          <div class="flex items-center gap-3 ml-auto">
            @if (project().url) {
              <a
                [href]="project().url"
                target="_blank"
                rel="noopener noreferrer"
                (click)="$event.stopPropagation()"
                class="text-muted hover:text-text transition-colors duration-150"
                aria-label="Ver demo"
              >
                <app-icon name="external-link" size="xs" />
              </a>
            }
            @if (project().repo) {
              <a
                [href]="project().repo"
                target="_blank"
                rel="noopener noreferrer"
                (click)="$event.stopPropagation()"
                class="text-muted hover:text-text transition-colors duration-150"
                aria-label="Ver código"
              >
                <app-icon name="github" size="xs" />
              </a>
            }
          </div>
        </div>
      </div>
    </a>
  `,
})
export class ProjectCard {
  project = input.required<ProjectSummary>();

  private readonly localeId = inject(LOCALE_ID);

  readonly imageVisible = signal(true);

  description = computed(() => {
    const p = this.project();
    return this.localeId.startsWith('en') ? p.description_en : p.description_es;
  });

  initials = computed(() =>
    this.project()
      .title.split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase()
  );
}
