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
          8+ años construyendo sistemas frontend de alta complejidad.
          Cada rol fue una decisión consciente hacia mayor criterio arquitectónico.
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
    { label: 'Años con Angular', value: '8+' },
    { label: 'Proyectos de arquitectura', value: '15+' },
    { label: 'Proyectos MFE entregados', value: '4' },
    { label: 'Migraciones AngularJS → Angular', value: '3' },
    { label: 'Equipos mentoreados', value: '6+' },
  ];

  readonly education: Education[] = [
    {
      institution: 'Universidad / Instituto (completar)',
      degree: 'Ingeniería / Licenciatura en Sistemas',
      period: '20XX — 20XX',
      description_es: 'Formación en ciencias de la computación, algoritmos y estructuras de datos.',
      description_en: 'Computer science education, algorithms and data structures.',
    },
    {
      institution: 'Platzi',
      degree: 'Frontend Development & Architecture',
      period: '2018 — presente',
      description_es: 'Especialización continua en Angular, arquitectura frontend y ecosistema JavaScript.',
      description_en: 'Continuous specialization in Angular, frontend architecture and JavaScript ecosystem.',
    },
  ];

  readonly jobs: TimelineJob[] = [
    {
      company: 'Digitalmente Studio',
      role: 'Founder & Frontend Architect',
      period: '2022 — presente',
      current: true,
      description_es:
        'Consultoría frontend especializada en Angular y arquitectura de sistemas. Proyectos de microfrontends, auditorías técnicas y mentoría de equipos.',
      description_en:
        'Frontend consultancy specialized in Angular and systems architecture. Microfrontend projects, technical audits and team mentoring.',
      tech: ['Angular', 'Nx', 'Module Federation', 'TypeScript', 'Docker', 'GitHub Actions'],
      highlights: [
        'Arquitectura MFE con Module Federation para plataforma eCommerce (4 equipos, 4 remotes)',
        'Migración AngularJS → Angular 17+ con SSR para plataforma SaaS legal',
        'Design systems con Storybook + Atomic Design para 3 clientes distintos',
        'CI/CD automatizado con GitHub Actions + Dokploy en infraestructura Hetzner',
      ],
    },
    {
      company: 'Empresa Tech (reemplazar con datos reales)',
      role: 'Senior Frontend Developer',
      period: '2020 — 2022',
      current: false,
      description_es:
        'Desarrollo de aplicaciones Angular a escala empresarial. Líder técnico del equipo frontend y referente de arquitectura.',
      description_en:
        'Enterprise-scale Angular application development. Frontend team technical lead and architecture reference.',
      tech: ['Angular', 'RxJS', 'TypeScript', 'NgRx', 'Jest', 'Cypress'],
      highlights: [
        'Lideré migración de arquitectura monolítica a feature-based con lazy loading',
        'Reduje el tiempo de carga inicial en un 60% con bundle optimization',
        'Implementé design system reutilizado por 3 productos del portafolio',
      ],
    },
    {
      company: 'Empresa anterior (reemplazar)',
      role: 'Frontend Developer',
      period: '2017 — 2020',
      current: false,
      description_es:
        'Desarrollo frontend con Angular y TypeScript. Primeros proyectos de arquitectura y equipos de producto.',
      description_en:
        'Frontend development with Angular and TypeScript. First architecture projects and product teams.',
      tech: ['Angular', 'TypeScript', 'SCSS', 'RxJS', 'Firebase'],
      highlights: [
        'Desarrollé 4 SPAs en Angular para clientes de retail y fintech',
        'Introduje TDD y testing con Jasmine/Karma en el equipo',
      ],
    },
  ];

  ngOnInit(): void {
    this.seo.set({
      title: 'Experiencia',
      description: '8+ años de trayectoria en arquitectura frontend: desde developer a fundador de consultoría. Cada rol fue una decisión consciente.',
      url: '/experience',
    });
  }
}
