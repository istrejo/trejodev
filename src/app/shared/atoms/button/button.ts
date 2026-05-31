import { Component, computed, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [class]="classes()"
    >
      <ng-content />
    </button>
  `,
})
export class Button {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);

  classes = computed(() => {
    const base =
      'inline-flex items-center justify-center gap-2 font-mono font-medium transition-all duration-200 cursor-pointer border focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-40 disabled:cursor-not-allowed';

    const sizes: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-7 py-3.5 text-base',
    };

    const variants: Record<ButtonVariant, string> = {
      primary:
        'bg-accent-1 text-white border-accent-1 hover:bg-[#B8001F] hover:border-[#B8001F] focus-visible:outline-accent-1',
      secondary:
        'bg-transparent text-text border-border hover:border-accent-1 hover:text-accent-1 focus-visible:outline-accent-1',
      ghost:
        'bg-transparent text-muted border-transparent hover:text-text hover:bg-surface focus-visible:outline-accent-1',
    };

    return [base, sizes[this.size()], variants[this.variant()]].join(' ');
  });
}
