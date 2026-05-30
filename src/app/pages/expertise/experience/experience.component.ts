import { Component, LOCALE_ID, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../core/services/seo.service';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import {
  TimelineItemComponent,
  TimelineJob,
} from '../../../shared/molecules/timeline-item/timeline-item.component';

interface Education {
  institution: string;
  degree: string;
  period: string;
  description_es: string;
  description_en: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [TimelineItemComponent, RevealDirective],
  styles: [`
    .page-title { animation: expSlideUp 500ms ease-out 80ms both; }
    .page-lead   { animation: expSlideUp 500ms ease-out 200ms both; }
    @keyframes expSlideUp {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `],
  template: `
    <!-- ═══ HEADER ══════════════════════════════════════════════════ -->
    <section class="border-b border-border">
      <div class="max-w-6xl mx-auto px-6 py-16 space-y-4">
        <span class="font-mono text-xs text-accent-1 tracking-widest uppercase"
          i18n="@@experience.eyebrow">Experiencia</span>
        <h1 class="page-title font-mono font-bold text-3xl sm:text-4xl text-text"
          i18n="@@experience.title">Trayectoria profesional.</h1>
        <p class="page-lead text-muted max-w-xl leading-relaxed"
          i18n="@@experience.lead">
          4+ años construyendo sistemas frontend distribuidos con Angular y microfrontends.
          Cada rol fue una decisión consciente hacia mayor impacto técnico.
        </p>
      </div>
    </section>

    <!-- ═══ LAYOUT ═══════════════════════════════════════════════════ -->
    <div class="max-w-6xl mx-auto px-6 py-12">
      <div class="grid md:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">

        <!-- Timeline -->
        <div appReveal>
          <h2 class="font-mono text-xs text-muted tracking-widest uppercase mb-8 border-b border-border pb-3"
            i18n="@@experience.jobs.title">Experiencia laboral</h2>

          @for (job of jobs; track job.company + job.period; let last = $last) {
            <app-timeline-item
              [job]="job"
              [last]="last"
              [locale]="localeId"
            />
          }
        </div>

        <!-- Sidebar: education + metrics -->
        <div class="space-y-8" appReveal [appRevealDelay]="120">

          <!-- Key metrics -->
          <div class="border border-border bg-surface p-6 space-y-4">
            <h3 class="font-mono text-xs text-muted tracking-widest uppercase"
              i18n="@@experience.metrics.title">En números</h3>
            @for (m of metrics; track m.label) {
              <div class="flex items-baseline justify-between gap-4">
                <span class="text-xs text-muted leading-snug">{{ m.label }}</span>
                <span class="font-mono font-bold text-accent-1 shrink-0">{{ m.value }}</span>
              </div>
            }
          </div>

          <!-- Education -->
          <div class="space-y-4">
            <h3 class="font-mono text-xs text-muted tracking-widest uppercase border-b border-border pb-3"
              i18n="@@experience.education.title">Formación</h3>
            @for (edu of education; track edu.institution) {
              <div class="space-y-1 pb-4 border-b border-border last:border-0 last:pb-0">
                <p class="font-mono text-sm font-medium text-text">{{ edu.degree }}</p>
                <p class="font-mono text-xs text-accent-1">{{ edu.institution }}</p>
                <p class="font-mono text-xs text-muted">{{ edu.period }}</p>
                <p class="text-xs text-muted/80 leading-relaxed mt-1">
                  {{ localeId.startsWith('en') ? edu.description_en : edu.description_es }}
                </p>
              </div>
            }
          </div>

          <!-- Remote work note -->
          <div class="border border-accent-2/20 bg-accent-2/5 p-4 space-y-1">
            <p class="font-mono text-xs text-accent-2" i18n="@@experience.remote.label">
              100% Remote
            </p>
            <p class="text-xs text-muted" i18n="@@experience.remote.desc">
              Trabajo remoto con equipos distribuidos globalmente desde 2020.
            </p>
          </div>

        </div>
      </div>
    </div>
  `,
})
export class ExperienceComponent implements OnInit {
  private readonly seo = inject(SeoService);
  readonly localeId = inject(LOCALE_ID);

  readonly metrics = [
    { label: 'Años con Angular (v8–21)', value: '4+' },
    { label: 'Micro frontends implementados', value: '7' },
    { label: 'Reducción de carga lograda', value: '80%' },
    { label: 'Lighthouse score alcanzado', value: '90%' },
    { label: 'Empresas / proyectos', value: '5+' },
  ];

  readonly education: Education[] = [
    {
      institution: 'IUTCM',
      degree: 'Técnico Superior en Informática',
      period: '2023 — 2025',
      description_es: 'Tecnólogo universitario en ciencias de la computación. Mérida, Venezuela.',
      description_en: 'Associate Degree in Computer Science. Mérida, Venezuela.',
    },
    {
      institution: 'Platzi',
      degree: 'Angular, SSR & AI-assisted Development',
      period: '2023 — 2026',
      description_es: 'Especialización continua: Angular 17, optimización con Lighthouse & SSR, autenticación, herramientas de IA (Claude Code, Cursor).',
      description_en: 'Continuous specialization: Angular 17, Lighthouse & SSR optimization, authentication, AI tools (Claude Code, Cursor).',
    },
  ];

  readonly jobs: TimelineJob[] = [
    {
      company: 'Rebel Quest Interactive',
      role: 'Senior Frontend Developer',
      period: 'May 2025 — Mar 2026',
      current: false,
      description_es:
        'Arquitectura y desarrollo de 7 micro frontends (4 Angular v18 + 3 React 18) con Webpack Module Federation para una plataforma de juegos distribuida. Equipo remoto desde Delaware, USA.',
      description_en:
        'Architecture and development of 7 micro frontends (4 Angular v18 + 3 React 18) with Webpack Module Federation for a distributed gaming platform. Remote team, Delaware, USA.',
      tech: ['Angular 18', 'React 18', 'Module Federation', 'Tailwind', 'PrimeNG', 'Storybook', 'Docker', 'Redux'],
      highlights: [
        'Diseñé e implementé arquitectura de 7 MFE con Webpack Module Federation, reduciendo tiempos de carga un 50%',
        'Contribuciones técnicas a 3 micro frontends React 18 integrados en la infraestructura principal Angular',
        'Componentes documentados con Storybook; UIs construidas con Tailwind CSS y PrimeNG',
        'Arquitectura AI-assisted con Claude Code y Cursor; ambientes distribuidos con Docker',
      ],
    },
    {
      company: 'Digitalmente Studio',
      role: 'Frontend Developer',
      period: '2022 — presente',
      current: true,
      description_es:
        'Consultoría frontend continua para agencia digital. Proyectos on-demand con Angular, React y desarrollo mobile con Ionic.',
      description_en:
        'Ongoing frontend consultancy for a digital agency. On-demand projects with Angular, React and mobile development with Ionic.',
      tech: ['Angular', 'React', 'Ionic', 'Firebase', 'Supabase', 'Google Cloud'],
      highlights: [
        'App mobile con Ionic + Angular para gestión de visitas de condominios con notificaciones push vía Firebase',
        'Desarrollo AI-assisted con Claude Code, Cursor y OpenAI Codex para acelerar entregas',
        'Proyectos con React Native, Supabase y Google Cloud para múltiples clientes',
      ],
    },
    {
      company: 'Beartrack',
      role: 'Frontend Developer',
      period: 'May 2024 — Ago 2024',
      current: false,
      description_es:
        'Desarrollo frontend para nueva versión de producto logístico multi-empresa e integración con PrestaShop. Santiago, Chile.',
      description_en:
        'Frontend development for a new version of a multi-company logistics product and PrestaShop integration. Santiago, Chile.',
      tech: ['Angular 18', 'TypeScript', 'PrimeNG', 'PrimeFlex'],
      highlights: [
        'Implementé nueva versión del producto logístico multi-empresa con Angular 18',
        'Integración con PrestaShop para app de e-commerce modular y escalable',
      ],
    },
    {
      company: 'CRSoporte',
      role: 'Frontend Developer',
      period: 'Dic 2023 — Abr 2024',
      current: false,
      description_es:
        'Interfaces web y mobile para personal médico y comerciantes. Reducción de tiempos de carga del 80% y mejora de Lighthouse de 50% a 90% en app logística para conductores. Costa Rica.',
      description_en:
        'Web and mobile interfaces for medical staff and merchants. 80% load time reduction and Lighthouse score improvement from 50% to 90% for a logistics app used by truck drivers. Costa Rica.',
      tech: ['Angular 16/17', 'Ionic', 'NgRx', 'PrimeNG', 'TypeScript', 'Tailwind'],
      highlights: [
        'Reducción de tiempos de carga en un 80% con NgRx y paginación eficiente',
        'Lighthouse performance de 50% → 90% en app logística para conductores de camión',
        'Interfaces web y mobile para personal médico y comerciantes con Angular 16/17 + Signals',
      ],
    },
    {
      company: 'Repsa Logistic',
      role: 'Frontend Developer',
      period: 'Jul 2023 — Nov 2023',
      current: false,
      description_es:
        'Nuevas features y refactor de app mobile y web para inspección de vehículos. Integración de lector QR con Ionic. Santiago, Chile.',
      description_en:
        'New features and refactor for a mobile and web vehicle inspection app. Ionic QR reader integration. Santiago, Chile.',
      tech: ['Angular 14', 'Ionic 6', 'TypeScript', 'Capacitor', 'Firebase', 'Google Cloud'],
      highlights: [
        'Desarrollo de nuevas funcionalidades para app de inspección vehicular mobile + web',
        'Integración del lector QR de Ionic para recuperación de datos de órdenes de inspección',
        'Refactor de código para mejorar performance y mantenibilidad',
      ],
    },
  ];

  ngOnInit(): void {
    this.seo.set({
      title: 'Experiencia',
      description: '4+ años construyendo sistemas frontend distribuidos: MFEs, Angular v8–21, reducción de carga del 80%, 5+ empresas en 4 países.',
      url: '/experience',
    });
  }
}
