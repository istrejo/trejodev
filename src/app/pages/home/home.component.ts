import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/atoms/button/button.component';
import { TagComponent } from '../../shared/atoms/tag/tag.component';
import { IconComponent } from '../../shared/atoms/icon/icon.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

const STACK_TAGS = [
  'Angular', 'TypeScript', 'RxJS', 'Nx', 'Storybook',
  'Microfrontends', 'Module Federation', 'Docker', 'CI/CD',
  'Hexagonal Architecture', 'SOLID', 'Tailwind',
];

const FEATURED_PROJECTS = [
  {
    title: 'eCommerce Microfrontend',
    description: 'Arquitectura de microfrontends con Module Federation, Nx y Angular — shell + 4 remotes independientes.',
    tags: ['Angular', 'Nx', 'Module Federation'],
    slug: 'ecommerce-mfe',
  },
  {
    title: 'Legalo App',
    description: 'Plataforma legal SaaS — arquitectura hexagonal, signals-based state, SSR.',
    tags: ['Angular', 'SSR', 'TypeScript'],
    slug: 'legalo-app',
  },
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ButtonComponent, TagComponent, IconComponent, RevealDirective],
  styles: [`
    .hero-eyebrow  { animation: heroSlideUp 500ms ease-out  80ms both; }
    .hero-title    { animation: heroSlideUp 600ms ease-out 180ms both; }
    .hero-divider  { animation: heroSlideUp 400ms ease-out 300ms both; }
    .hero-tagline  { animation: heroSlideUp 500ms ease-out 360ms both; }
    .hero-sub      { animation: heroSlideUp 500ms ease-out 460ms both; }
    .hero-ctas     { animation: heroSlideUp 500ms ease-out 560ms both; }
    .hero-visual   { animation: heroFadeIn  700ms ease-out 300ms both; }

    @keyframes heroSlideUp {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes heroFadeIn {
      from { opacity: 0; transform: translateY(10px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0)   scale(1); }
    }

    .code-block {
      font-family: var(--font-code);
      font-size: 0.78rem;
      line-height: 1.7;
      color: var(--color-muted);
    }
    .code-key   { color: #BB9AF7; }
    .code-str   { color: #9ECE6A; }
    .code-arr   { color: var(--color-accent-2); }
    .code-cmnt  { color: #4a4a6a; font-style: italic; }

    .project-card-hover {
      transition: border-color 200ms, transform 200ms;
    }
    .project-card-hover:hover {
      border-color: color-mix(in srgb, var(--color-accent-1) 40%, transparent);
      transform: translateY(-2px);
    }
  `],
  template: `
    <!-- ═══ HERO ═══════════════════════════════════════════════════ -->
    <section class="min-h-[calc(100vh-4rem)] flex items-center">
      <div class="max-w-6xl mx-auto px-6 w-full py-16">
        <div class="grid md:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">

          <!-- Left: text content -->
          <div class="space-y-6">
            <div class="hero-eyebrow">
              <span class="inline-flex items-center gap-2 font-mono text-xs text-accent-1 border border-accent-1/30 bg-accent-1/5 px-3 py-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-accent-1 animate-pulse"></span>
                Senior Frontend Developer · Angular Specialist
              </span>
            </div>

            <h1 class="hero-title font-mono font-bold text-text leading-[1.1] tracking-tight">
              <span class="block text-4xl sm:text-5xl lg:text-6xl">Alejandro</span>
              <span class="block text-4xl sm:text-5xl lg:text-6xl text-accent-1">Trejo</span>
            </h1>

            <div class="hero-divider w-12 h-px bg-accent-1"></div>

            <p class="hero-tagline text-lg sm:text-xl text-text font-medium leading-snug max-w-md">
              No vendo frameworks.<br>
              <span class="text-muted">Vendo decisiones técnicas correctas.</span>
            </p>

            <p class="hero-sub font-mono text-xs text-muted tracking-wide">
              Angular&nbsp;&nbsp;·&nbsp;&nbsp;Microfrontend Architecture&nbsp;&nbsp;·&nbsp;&nbsp;Criterio Pragmático
            </p>

            <div class="hero-ctas flex flex-wrap gap-3">
              <app-button variant="primary" size="lg">
                <a routerLink="/projects" class="contents">Ver proyectos</a>
              </app-button>
              <app-button variant="secondary" size="lg">
                <a routerLink="/contact" class="contents">Contacto</a>
              </app-button>
            </div>
          </div>

          <!-- Right: code visual (breaks slightly out of line) -->
          <div class="hero-visual hidden md:block md:translate-y-[-1rem]">
            <div class="border border-border bg-surface rounded-sm overflow-hidden shadow-2xl">
              <!-- fake window bar -->
              <div class="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-bg">
                <span class="w-2.5 h-2.5 rounded-full bg-border"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-border"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-border"></span>
                <span class="ml-3 font-mono text-xs text-muted">approach.ts</span>
              </div>
              <!-- code content -->
              <pre class="code-block p-5 m-0 overflow-hidden"><code><span class="code-cmnt">// No magic. No shortcuts.</span>
<span class="code-key">const</span> approach = &#123;
  <span class="code-key">priority</span>: <span class="code-str">'decisions'</span>,
  <span class="code-key">over</span>:     <span class="code-str">'frameworks'</span>,

  <span class="code-key">architecture</span>: <span class="code-arr">[</span>
    <span class="code-str">'hexagonal'</span>,
    <span class="code-str">'screaming'</span>,
    <span class="code-str">'clean'</span>,
  <span class="code-arr">]</span>,

  <span class="code-key">stack</span>: <span class="code-arr">[</span>
    <span class="code-str">'Angular'</span>, <span class="code-str">'Nx'</span>,
    <span class="code-str">'TypeScript'</span>, <span class="code-str">'RxJS'</span>,
    <span class="code-str">'Microfrontends'</span>,
  <span class="code-arr">]</span>,

  <span class="code-key">philosophy</span>: <span class="code-str">'context&nbsp;wins'</span>,
&#125;

<span class="code-cmnt">// Digitalmente Studio</span></code></pre>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ═══ ABOUT TEASER ═══════════════════════════════════════════ -->
    <section class="max-w-6xl mx-auto px-6 py-20" appReveal>
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="space-y-4">
          <span class="font-mono text-xs text-accent-1 tracking-widest uppercase">Sobre mí</span>
          <h2 class="font-mono font-bold text-2xl text-text leading-tight">
            El framework no es<br>la solución.
          </h2>
          <p class="text-muted leading-relaxed max-w-sm">
            15+ años tomando decisiones técnicas basadas en el contexto real del negocio,
            no en tendencias. La arquitectura correcta depende de cada problema — no existe
            una talla única.
          </p>
          <a
            routerLink="/about"
            class="inline-flex items-center gap-2 font-mono text-sm text-accent-1 hover:gap-3 transition-all duration-150"
          >
            Mi filosofía
            <app-icon name="arrow-right" size="sm" />
          </a>
        </div>
        <div class="border border-border bg-surface p-8 space-y-3">
          @for (item of philosophy; track item.label) {
            <div class="flex items-start gap-3">
              <span class="font-mono text-accent-1 text-xs mt-1 shrink-0">→</span>
              <div>
                <span class="font-mono text-sm text-text">{{ item.label }}</span>
                <p class="text-xs text-muted mt-0.5">{{ item.desc }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ═══ PROJECTS TEASER ═════════════════════════════════════════ -->
    <section class="max-w-6xl mx-auto px-6 py-20 border-t border-border" appReveal [appRevealDelay]="100">
      <div class="flex items-end justify-between mb-10">
        <div>
          <span class="font-mono text-xs text-accent-1 tracking-widest uppercase">Proyectos</span>
          <h2 class="font-mono font-bold text-2xl text-text mt-2">Trabajo real. Decisiones reales.</h2>
        </div>
        <a
          routerLink="/projects"
          class="hidden md:inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-text transition-colors duration-150"
        >
          Ver todos <app-icon name="arrow-right" size="sm" />
        </a>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        @for (project of projects; track project.slug) {
          <a
            [routerLink]="['/projects', project.slug]"
            class="block border border-border bg-surface p-6 project-card-hover"
          >
            <h3 class="font-mono font-medium text-text mb-2">{{ project.title }}</h3>
            <p class="text-sm text-muted leading-relaxed mb-4">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2">
              @for (tag of project.tags; track tag) {
                <app-tag>{{ tag }}</app-tag>
              }
            </div>
          </a>
        }
      </div>

      <div class="mt-6 md:hidden">
        <app-button variant="ghost" size="sm">
          <a routerLink="/projects" class="contents">Ver todos los proyectos</a>
        </app-button>
      </div>
    </section>

    <!-- ═══ STACK TEASER ════════════════════════════════════════════ -->
    <section class="max-w-6xl mx-auto px-6 py-20 border-t border-border" appReveal [appRevealDelay]="150">
      <div class="flex items-end justify-between mb-10">
        <div>
          <span class="font-mono text-xs text-accent-1 tracking-widest uppercase">Stack</span>
          <h2 class="font-mono font-bold text-2xl text-text mt-2">Herramientas con criterio.</h2>
        </div>
        <a
          routerLink="/stack"
          class="hidden md:inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-text transition-colors duration-150"
        >
          Stack completo <app-icon name="arrow-right" size="sm" />
        </a>
      </div>

      <div class="flex flex-wrap gap-2.5">
        @for (tag of stackTags; track tag) {
          <app-tag>{{ tag }}</app-tag>
        }
      </div>
    </section>
  `,
})
export class HomeComponent {
  readonly stackTags = STACK_TAGS;
  readonly projects = FEATURED_PROJECTS;

  readonly philosophy = [
    { label: 'Arquitectura > Framework', desc: 'El framework es un detalle de implementación.' },
    { label: 'Contexto > Tendencias', desc: 'Cada problema exige su propia solución.' },
    { label: 'Fundamentos > Atajos', desc: 'El conocimiento profundo escala, los atajos no.' },
  ];
}
