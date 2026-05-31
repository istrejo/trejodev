import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  template: `
    <div class="min-h-screen flex items-center justify-center">
      <span class="font-mono text-muted text-sm">— blog / próximamente —</span>
    </div>
  `,
})
export class Blog implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.set({
      title: 'Blog',
      description: 'Artículos sobre arquitectura frontend, Angular, microfrontends y criterio técnico pragmático.',
      url: '/blog',
    });
  }
}
