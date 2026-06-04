import { Component, LOCALE_ID, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../atoms/icon/icon';
import { Tag } from '../../atoms/tag/tag';
import { ProjectSummary } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink, Tag, Icon],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
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
