import { Component, LOCALE_ID, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../core/services/seo.service';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import {
  TimelineItem,
  TimelineJob,
} from '../../../shared/molecules/timeline-item/timeline-item';

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
  imports: [TimelineItem, RevealDirective],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience implements OnInit {
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
