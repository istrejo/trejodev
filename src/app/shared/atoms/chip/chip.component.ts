import { Component, computed, input, model } from '@angular/core';

@Component({
  selector: 'app-chip',
  standalone: true,
  template: `
    <button
      type="button"
      [class]="classes()"
      (click)="selected.set(!selected())"
      [attr.aria-pressed]="selected()"
    >
      <ng-content />
    </button>
  `,
})
export class ChipComponent {
  selected = model<boolean>(false);
  disabled = input<boolean>(false);

  classes = computed(() => {
    const base =
      'inline-flex items-center px-3 py-1.5 text-xs font-mono border transition-all duration-150 cursor-pointer rounded-sm disabled:opacity-40 disabled:cursor-not-allowed';

    if (this.selected()) {
      return `${base} bg-accent-1/15 text-accent-1 border-accent-1/50`;
    }
    return `${base} bg-transparent text-muted border-border hover:border-accent-1/40 hover:text-text`;
  });
}
