import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  template: `
    <span class="inline-flex items-center px-2.5 py-1 text-xs font-mono text-muted bg-surface border border-border hover:border-accent-1/40 hover:text-text transition-colors duration-150 rounded-sm">
      <ng-content />
    </span>
  `,
})
export class TagComponent {}
