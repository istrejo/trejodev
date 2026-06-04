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
import { getLocalizedProjectDescription, getProjectSeoConfig } from '../../../core/models/project-seo';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink, Button, Tag, Icon],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetail {
  slug = input.required<string>();

  private readonly projectData = inject(ProjectDataService);
  private readonly seo = inject(SeoService);
  private readonly localeId = inject(LOCALE_ID);

  readonly loading = signal(true);
  readonly project = signal<Project | null>(null);
  readonly coverVisible = signal(false);

  readonly description = computed(() => {
    const p = this.project();
    if (!p) return '';
    return getLocalizedProjectDescription(this.localeId, p);
  });

  private readonly loadProjectEffect = effect((onCleanup) => {
    const slug = this.slug();

    this.loading.set(true);
    this.project.set(null);

    const subscription = this.projectData.getProjectBySlug(slug).subscribe({
      next: (project) => {
        this.project.set(project);
        this.loading.set(false);
        this.coverVisible.set(Boolean(project?.imageUrl));

        if (project) {
          this.seo.set(getProjectSeoConfig(this.localeId, project));
        }
      },
      error: () => {
        this.project.set(null);
        this.loading.set(false);
        this.coverVisible.set(false);
      },
    });

    onCleanup(() => subscription.unsubscribe());
  });
}
