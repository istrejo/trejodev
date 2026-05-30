import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ICONS, IconName } from './icon.registry';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-icon',
  standalone: true,
  // Render full SVG inside a <span> — domino (SSR) supports innerHTML on HTML elements,
  // but not setProperty on SVGSVGElement. This avoids the NotYetImplemented error.
  template: `<span [innerHTML]="svg()" style="display:inline-flex;line-height:0"></span>`,
})
export class IconComponent {
  name = input.required<IconName>();
  size = input<IconSize>('md');

  private readonly sanitizer = inject(DomSanitizer);

  private readonly sizes: Record<IconSize, number> = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  };

  svg = computed<SafeHtml>(() => {
    const px = this.sizes[this.size()];
    const paths = ICONS[this.name()] ?? '';
    return this.sanitizer.bypassSecurityTrustHtml(
      `<svg width="${px}" height="${px}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`
    );
  });
}
