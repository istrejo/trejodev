import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  LOCALE_ID,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { Icon } from '../../shared/atoms/icon/icon';
import { BrandLogo } from '../../shared/atoms/brand-logo/brand-logo';
import { Nav } from '../nav/nav';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Nav, Icon, BrandLogo],
  animations: [
    trigger('mobileMenu', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-8px)' }),
        animate('180ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('120ms ease-in', style({ opacity: 0, transform: 'translateY(-8px)' })),
      ]),
    ]),
  ],
  templateUrl: './header.html',
})
export class Header implements OnDestroy {
  private readonly localeId = inject(LOCALE_ID);
  private readonly doc = inject(DOCUMENT);

  menuOpen = signal(false);
  isEs = signal(this.localeId === 'es' || this.localeId === 'es-AR');

  toggleLocale(): void {
    if (typeof this.doc.defaultView === 'undefined' || !this.doc.defaultView) return;
    const win = this.doc.defaultView;
    const current = this.isEs() ? 'es' : 'en';
    const next = this.isEs() ? 'en' : 'es';
    const href = win.location.href;
    // Locale builds served at /{locale}/ prefix in production
    if (href.includes(`/${current}/`)) {
      win.location.href = href.replace(`/${current}/`, `/${next}/`);
    } else {
      // Dev: just toggle visual state (localize builds required for real switch)
      this.isEs.set(!this.isEs());
    }
  }

  ngOnDestroy(): void {
    this.menuOpen.set(false);
  }
}
