import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { ButtonComponent } from '../../shared/atoms/button/button.component';
import { TagComponent } from '../../shared/atoms/tag/tag.component';
import { IconComponent } from '../../shared/atoms/icon/icon.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

interface Principle {
  number: string;
  title: string;
  body: string;
}

interface ApproachStep {
  label: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, ButtonComponent, TagComponent, IconComponent, RevealDirective],
  styles: [`
    .about-hero-title { animation: aboutSlideUp 600ms ease-out 80ms both; }
    .about-hero-line  { animation: aboutSlideUp 400ms ease-out 220ms both; }
    .about-hero-body  { animation: aboutSlideUp 500ms ease-out 320ms both; }
    .about-hero-tags  { animation: aboutSlideUp 500ms ease-out 440ms both; }

    @keyframes aboutSlideUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `],
  template: `
    <!-- ═══ HERO ════════════════════════════════════════════════════ -->
    <section class="border-b border-border">
      <div class="max-w-6xl mx-auto px-6 py-24">
        <div class="grid md:grid-cols-[1.2fr_0.8fr] gap-16 items-start">
          <div class="space-y-6">
            <span class="inline-block font-mono text-xs text-accent-1 tracking-widest uppercase"
              i18n="@@about.eyebrow">Sobre mí</span>

            <h1 class="about-hero-title font-mono font-bold text-3xl sm:text-4xl lg:text-5xl text-text leading-[1.1]"
              i18n="@@about.hero.title">
              Decisiones técnicas<br>
              <span class="text-accent-1">correctas.</span>
            </h1>

            <div class="about-hero-line w-12 h-px bg-accent-1"></div>

            <p class="about-hero-body text-muted leading-relaxed max-w-md text-base"
              i18n="@@about.hero.body">
              Angular specialist con 4+ años construyendo sistemas frontend distribuidos
              para equipos remotos en múltiples países. Especializado en Micro Frontend
              architectures con Module Federation, NgRx / SignalStore y Angular v8–21.
              Mi propuesta de valor no es el framework — es la decisión técnica correcta
              según el contexto real del negocio.
            </p>

            <div class="about-hero-tags flex flex-wrap gap-2">
              @for (tag of expertiseTags; track tag) {
                <app-tag>{{ tag }}</app-tag>
              }
            </div>
          </div>

          <!-- Sidebar stat card -->
          <div class="hidden md:block space-y-4 pt-4">
            @for (stat of stats; track stat.label) {
              <div class="border border-border bg-surface p-5">
                <div class="font-mono font-bold text-2xl text-accent-1">{{ stat.value }}</div>
                <div class="font-mono text-xs text-muted mt-1">{{ stat.label }}</div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ FILOSOFÍA ════════════════════════════════════════════════ -->
    <section class="max-w-6xl mx-auto px-6 py-20" appReveal>
      <div class="mb-12">
        <span class="font-mono text-xs text-accent-1 tracking-widest uppercase"
          i18n="@@about.philosophy.eyebrow">Filosofía</span>
        <h2 class="font-mono font-bold text-2xl text-text mt-2"
          i18n="@@about.philosophy.title">
          Cómo pienso sobre los problemas.
        </h2>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        @for (p of principles; track p.number) {
          <div class="border border-border bg-surface p-6 space-y-3 hover:border-accent-1/30 transition-colors duration-200">
            <span class="font-mono text-xs text-accent-1/60">{{ p.number }}</span>
            <h3 class="font-mono font-semibold text-base text-text">{{ p.title }}</h3>
            <p class="text-sm text-muted leading-relaxed">{{ p.body }}</p>
          </div>
        }
      </div>
    </section>

    <!-- ═══ MI APPROACH ══════════════════════════════════════════════ -->
    <section class="border-t border-border" appReveal [appRevealDelay]="80">
      <div class="max-w-6xl mx-auto px-6 py-20">
        <div class="grid md:grid-cols-[0.9fr_1.1fr] gap-16 items-start">

          <div class="space-y-4 md:sticky md:top-24">
            <span class="font-mono text-xs text-accent-1 tracking-widest uppercase"
              i18n="@@about.approach.eyebrow">Mi approach</span>
            <h2 class="font-mono font-bold text-2xl text-text leading-snug"
              i18n="@@about.approach.title">
              Arquitectura pragmática.<br>Sin dogmas.
            </h2>
            <p class="text-muted text-sm leading-relaxed"
              i18n="@@about.approach.body">
              No existe la arquitectura perfecta — existe la arquitectura correcta
              para cada contexto. Mi proceso siempre empieza por entender el negocio,
              no por elegir el patrón.
            </p>
          </div>

          <div class="space-y-0">
            @for (step of approachSteps; track step.label; let last = $last) {
              <div class="flex gap-5" [class.pb-8]="!last">
                <div class="flex flex-col items-center">
                  <div class="w-2 h-2 rounded-full bg-accent-1 shrink-0 mt-1.5"></div>
                  @if (!last) {
                    <div class="w-px flex-1 bg-border mt-2"></div>
                  }
                </div>
                <div class="pb-2 space-y-1">
                  <span class="font-mono text-sm font-medium text-text">{{ step.label }}</span>
                  <p class="text-sm text-muted leading-relaxed">{{ step.description }}</p>
                </div>
              </div>
            }
          </div>

        </div>
      </div>
    </section>

    <!-- ═══ DIGITALMENTE STUDIO ══════════════════════════════════════ -->
    <section class="border-t border-border bg-surface" appReveal [appRevealDelay]="60">
      <div class="max-w-6xl mx-auto px-6 py-20">
        <div class="grid md:grid-cols-2 gap-16 items-center">

          <div class="space-y-5">
            <div class="space-y-1">
              <span class="font-mono text-xs text-accent-1 tracking-widest uppercase">Consultoría</span>
              <h2 class="font-mono font-bold text-2xl text-text"
                i18n="@@about.studio.title">Digitalmente Studio</h2>
            </div>
            <p class="text-muted leading-relaxed"
              i18n="@@about.studio.body">
              Opero bajo mi entidad de consultoría para proyectos donde el criterio
              arquitectónico es crítico. Trabajo de forma remota con equipos y empresas
              que necesitan más que un developer — necesitan un arquitecto que entienda
              el negocio antes de tocar el código.
            </p>
            <div class="flex flex-wrap gap-3 pt-2">
              <app-button variant="primary">
                <a routerLink="/contact" class="contents" i18n="@@about.studio.cta.primary">
                  Trabajemos juntos
                </a>
              </app-button>
              <app-button variant="ghost">
                <a routerLink="/projects" class="contents" i18n="@@about.studio.cta.secondary">
                  Ver proyectos
                </a>
              </app-button>
            </div>
          </div>

          <div class="space-y-4">
            @for (service of services; track service.title) {
              <div class="flex items-start gap-4 p-4 border border-border hover:border-accent-1/30 transition-colors duration-150">
                <app-icon name="chevron-right" size="xs" class="text-accent-1 shrink-0 mt-0.5" />
                <div>
                  <span class="font-mono text-sm font-medium text-text">{{ service.title }}</span>
                  <p class="text-xs text-muted mt-0.5">{{ service.description }}</p>
                </div>
              </div>
            }
          </div>

        </div>
      </div>
    </section>

    <!-- ═══ QUOTE ════════════════════════════════════════════════════ -->
    <section class="border-t border-border" appReveal [appRevealDelay]="60">
      <div class="max-w-6xl mx-auto px-6 py-20">
        <blockquote class="max-w-2xl mx-auto text-center space-y-4">
          <p class="font-mono text-xl sm:text-2xl text-text leading-relaxed"
            i18n="@@about.quote.text">
            "El objetivo no es escribir el mejor código.<br>
            Es construir el sistema correcto."
          </p>
          <footer class="font-mono text-xs text-muted" i18n="@@about.quote.author">
            — Alejandro Trejo, Digitalmente Studio
          </footer>
        </blockquote>
      </div>
    </section>
  `,
})
export class AboutComponent implements OnInit {
  private readonly seo = inject(SeoService);
  readonly expertiseTags = [
    'Angular', 'TypeScript', 'Nx', 'Module Federation',
    'Hexagonal Architecture', 'Clean Architecture', 'SOLID', 'RxJS',
  ];

  readonly stats = [
    { value: '4+', label: 'años con Angular (v8–21)' },
    { value: '7', label: 'micro frontends implementados' },
    { value: '80%', label: 'reducción de carga (CRSoporte)' },
    { value: '100%', label: 'trabajo remoto' },
  ];

  readonly principles: Principle[] = [
    {
      number: '01',
      title: 'El framework es un detalle',
      body: 'Angular, React, Vue — son herramientas. La arquitectura correcta es independiente del framework que usés.',
    },
    {
      number: '02',
      title: 'El contexto siempre gana',
      body: 'No existe el patrón universal. Microservicios, monolito, MFE — cada solución tiene su contexto correcto.',
    },
    {
      number: '03',
      title: 'Los fundamentos escalan',
      body: 'SOLID, DDD, patrones de diseño — estas cosas no caducan. Las tendencias sí. Invertí en lo que dura.',
    },
  ];

  readonly approachSteps: ApproachStep[] = [
    {
      label: 'Entender el negocio primero',
      description: 'Antes de abrir el editor, entiendo qué problema real resuelve el sistema. El código sirve al negocio, no al revés.',
    },
    {
      label: 'Definir restricciones reales',
      description: 'Equipo, tiempo, deuda técnica, escala esperada — las restricciones reales definen la arquitectura posible.',
    },
    {
      label: 'Elegir la solución más simple que funcione',
      description: 'No la más elegante. No la más nueva. La que el equipo pueda mantener y escalar con el menor riesgo.',
    },
    {
      label: 'Documentar las decisiones, no el código',
      description: 'El código explica el QUÉ. Las Architecture Decision Records explican el POR QUÉ — lo que realmente importa.',
    },
    {
      label: 'Iterar con evidencia',
      description: 'Las decisiones arquitectónicas se validan con datos, no con intuición. Medí, iterá, ajustá.',
    },
  ];

  readonly services = [
    { title: 'Arquitectura Frontend', description: 'Diseño de sistemas Angular escalables desde cero.' },
    { title: 'Auditoría técnica', description: 'Review de codebase existente con plan de mejora concreto.' },
    { title: 'Migración Angular', description: 'AngularJS → Angular moderno, arquitectura limpia.' },
    { title: 'Mentoría técnica', description: 'Acompañamiento de equipos en transición a mejores prácticas.' },
  ];

  ngOnInit(): void {
    this.seo.set({
      title: 'Sobre mí',
      description: '4+ años construyendo sistemas frontend distribuidos con Angular v8–21, MFEs y Module Federation. Mi propuesta de valor es la decisión técnica correcta según el contexto real.',
      url: '/about',
    });
  }
}
