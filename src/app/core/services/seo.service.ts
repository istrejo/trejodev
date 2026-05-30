import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface SeoConfig {
  title: string;
  description: string;
  url?: string;
}

const BASE_TITLE = 'Alejandro Trejo — Senior Frontend Developer';
const BASE_URL = 'https://trejodev.com';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  set(config: SeoConfig): void {
    const fullTitle = config.title === BASE_TITLE
      ? BASE_TITLE
      : `${config.title} — Alejandro Trejo`;

    const url = config.url ? `${BASE_URL}${config.url}` : BASE_URL;

    this.title.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: config.description });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:image', content: `${BASE_URL}/og-image.png` });

    // Twitter / X
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: `${BASE_URL}/og-image.png` });
  }
}
