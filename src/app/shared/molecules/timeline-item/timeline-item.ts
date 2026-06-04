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
  templateUrl: './timeline-item.html',
  styleUrl: './timeline-item.scss',
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
