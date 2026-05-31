import { Component } from '@angular/core';
import { Icon } from '../../shared/atoms/icon/icon';

interface SocialLink {
  icon: 'github' | 'linkedin' | 'mail';
  href: string;
  label: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [Icon],
  template: `
    <footer class="border-t border-border mt-24">
      <div
        class="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div class="flex items-center gap-4">
          <img
            src="/logo.png"
            alt="Alejandro Trejo"
            class="h-7 w-auto opacity-40"
            style="filter: brightness(0) invert(1)"
            aria-hidden="true"
          >
          <p class="font-mono text-xs text-muted">&copy; {{ year }} Alejandro Trejo</p>
        </div>

        <div class="flex items-center gap-5">
          @for (link of socialLinks; track link.href) {
            <a
              [href]="link.href"
              target="_blank"
              rel="noopener noreferrer"
              [attr.aria-label]="link.label"
              class="text-muted hover:text-text transition-colors duration-150"
            >
              <app-icon [name]="link.icon" size="sm" />
            </a>
          }
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  readonly year = new Date().getFullYear();

  readonly socialLinks: SocialLink[] = [
    { icon: 'github', href: 'https://github.com/istrejo', label: 'GitHub' },
    { icon: 'linkedin', href: 'https://linkedin.com/in/alejandrotrejodev', label: 'LinkedIn' },
    { icon: 'mail', href: 'mailto:hola@digitalmente.studio', label: 'Email' },
  ];
}
