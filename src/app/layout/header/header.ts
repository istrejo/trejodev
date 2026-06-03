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
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/80 backdrop-blur-sm">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <!-- Logo -->
        <app-brand-logo />

        <!-- Desktop nav -->
        <div class="hidden md:block">
          <app-nav orientation="horizontal" />
        </div>

        <!-- Right side: locale toggle + mobile trigger -->
        <div class="flex items-center gap-4">
          <button
            type="button"
            (click)="toggleLocale()"
            class="font-mono text-xs text-muted hover:text-text border border-border hover:border-accent-1/40 px-2 py-1 transition-all duration-150"
            [attr.aria-label]="'Cambiar idioma a ' + (isEs() ? 'English' : 'Español')"
          >
            {{ isEs() ? 'EN' : 'ES' }}
          </button>

          <!-- Hamburger (mobile only) -->
          <button
            type="button"
            class="md:hidden text-muted hover:text-text transition-colors duration-150"
            (click)="menuOpen.set(!menuOpen())"
            [attr.aria-expanded]="menuOpen()"
            aria-label="Toggle navigation"
          >
            @if (menuOpen()) {
              <app-icon name="close" size="md" />
            } @else {
              <app-icon name="menu" size="md" />
            }
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      @if (menuOpen()) {
        <div
          @mobileMenu
          class="md:hidden border-t border-border bg-surface px-6 py-4"
        >
          <app-nav orientation="vertical" (navClick)="menuOpen.set(false)" />
        </div>
      }
    </header>

    <!-- Spacer for fixed header -->
    <div class="h-16"></div>
  `,
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
