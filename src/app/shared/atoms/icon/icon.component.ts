import { Component, computed, input } from '@angular/core';
import { ICONS, IconName } from './icon.registry';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg
      [attr.width]="px()"
      [attr.height]="px()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      [attr.aria-hidden]="true"
      [innerHTML]="path()"
    ></svg>
  `,
})
export class IconComponent {
  name = input.required<IconName>();
  size = input<IconSize>('md');

  private readonly sizes: Record<IconSize, number> = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  };

  px = computed(() => this.sizes[this.size()]);
  path = computed(() => ICONS[this.name()] ?? '');
}
