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
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  items = input<NavItem[]>(NAV_ITEMS);
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  navClick = output<void>();
}
