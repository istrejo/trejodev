import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface NavItem {
  label: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Sobre mí', path: '/about' },
  { label: 'Proyectos', path: '/projects' },
  { label: 'Stack', path: '/stack' },
  { label: 'Experiencia', path: '/experience' },
  { label: 'Contacto', path: '/contact' },
];

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav [class]="orientation() === 'vertical' ? 'flex flex-col gap-1' : 'flex items-center gap-6'">
      @for (item of items(); track item.path) {
        <a
          [routerLink]="item.path"
          routerLinkActive="!text-text after:scale-x-100"
          [routerLinkActiveOptions]="{ exact: item.path === '/' }"
          (click)="navClick.emit()"
          class="relative font-mono text-sm text-muted hover:text-text transition-colors duration-150 after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-px after:bg-accent-1 after:scale-x-0 after:origin-left after:transition-transform after:duration-200 hover:after:scale-x-100"
        >
          {{ item.label }}
        </a>
      }
    </nav>
  `,
})
export class Nav {
  items = input<NavItem[]>(NAV_ITEMS);
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  navClick = output<void>();
}
