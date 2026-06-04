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
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly year = new Date().getFullYear();

  readonly socialLinks: SocialLink[] = [
    { icon: 'github', href: 'https://github.com/istrejo', label: 'GitHub' },
    { icon: 'linkedin', href: 'https://linkedin.com/in/alejandrotrejodev', label: 'LinkedIn' },
    { icon: 'mail', href: 'mailto:hola@digitalmente.studio', label: 'Email' },
  ];
}
