import { Component, input } from '@angular/core';
import { Tag } from '../../atoms/tag/tag';

export interface TimelineJob {
  company: string;
  role: string;
  period: string;
  current: boolean;
  description_es: string;
  description_en: string;
  tech: string[];
  highlights: string[];
}

@Component({
  selector: 'app-timeline-item',
  standalone: true,
  imports: [Tag],
  template: `
    <div class="flex gap-6">
      <!-- Timeline indicator -->
      <div class="flex flex-col items-center shrink-0">
        <div
          class="w-3 h-3 rounded-full border-2 mt-1.5 shrink-0 transition-colors duration-200"
          [class]="job().current
            ? 'bg-accent-1 border-accent-1'
            : 'bg-bg border-border'"
        ></div>
        @if (!last()) {
          <div class="w-px flex-1 bg-border mt-2 min-h-[3rem]"></div>
        }
      </div>

      <!-- Content -->
      <div class="pb-10 space-y-3 flex-1 min-w-0">
        <!-- Header -->
        <div class="flex flex-wrap items-start gap-x-3 gap-y-1">
          <div>
            <h3 class="font-mono font-semibold text-base text-text leading-snug">
              {{ job().role }}
            </h3>
            <p class="font-mono text-sm text-accent-1 mt-0.5">{{ job().company }}</p>
          </div>
          <div class="ml-auto shrink-0 flex items-center gap-2">
            @if (job().current) {
              <span class="font-mono text-xs text-accent-1 border border-accent-1/30 bg-accent-1/5 px-2 py-0.5">
                Actual
              </span>
            }
            <span class="font-mono text-xs text-muted">{{ job().period }}</span>
          </div>
        </div>

        <!-- Description -->
        <p class="text-sm text-muted leading-relaxed">{{ description() }}</p>

        <!-- Highlights -->
        @if (job().highlights.length > 0) {
          <ul class="space-y-1.5">
            @for (h of job().highlights; track h) {
              <li class="flex items-start gap-2 text-xs text-muted leading-relaxed">
                <span class="text-accent-1/60 shrink-0 mt-0.5">→</span>
                {{ h }}
              </li>
            }
          </ul>
        }

        <!-- Tech stack -->
        <div class="flex flex-wrap gap-1.5 pt-1">
          @for (tech of job().tech; track tech) {
            <app-tag>{{ tech }}</app-tag>
          }
        </div>
      </div>
    </div>
  `,
})
export class TimelineItem {
  job = input.required<TimelineJob>();
  last = input<boolean>(false);
  locale = input<string>('es');

  description() {
    const j = this.job();
    return this.locale().startsWith('en') ? j.description_en : j.description_es;
  }
}
