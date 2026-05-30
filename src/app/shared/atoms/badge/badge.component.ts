import { Component, computed, input } from '@angular/core';

export type BadgeColor = 'accent-1' | 'accent-2' | 'neutral';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `
    <span [class]="classes()">
      <ng-content />
    </span>
  `,
})
export class BadgeComponent {
  color = input<BadgeColor>('neutral');

  classes = computed(() => {
    const base =
      'inline-flex items-center px-2 py-0.5 text-xs font-mono font-medium rounded-sm border';

    const colors: Record<BadgeColor, string> = {
      'accent-1': 'bg-accent-1/10 text-accent-1 border-accent-1/30',
      'accent-2': 'bg-accent-2/10 text-accent-2 border-accent-2/30',
      neutral: 'bg-surface text-muted border-border',
    };

    return [base, colors[this.color()]].join(' ');
  });
}
