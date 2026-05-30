import { Component } from '@angular/core';
import { IconComponent } from '../../shared/atoms/icon/icon.component';

interface SocialLink {
  icon: 'github' | 'linkedin' | 'mail';
  href: string;
  label: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IconComponent],
  template: `
    <footer class="border-t border-border mt-24">
      <div class="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">

        <p class="font-mono text-xs text-muted">
          &copy; {{ year }} Alejandro Trejo &mdash; Digitalmente Studio
        </p>

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
export class FooterComponent {
  readonly year = new Date().getFullYear();

  readonly socialLinks: SocialLink[] = [
    { icon: 'github', href: 'https://github.com/aletrejo', label: 'GitHub' },
    { icon: 'linkedin', href: 'https://linkedin.com/in/aletrejo', label: 'LinkedIn' },
    { icon: 'mail', href: 'mailto:hola@digitalmente.studio', label: 'Email' },
  ];
}
