import { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    _id: 'ecommerce-mfe',
    title: 'eCommerce Microfrontend',
    slug: 'ecommerce-mfe',
    description_es:
      'Arquitectura de microfrontends con Module Federation, Nx y Angular para desacoplar releases, ownership y pipelines por equipo.',
    description_en:
      'Microfrontend architecture with Module Federation, Nx and Angular to decouple releases, ownership and delivery pipelines per team.',
    stack: ['Angular', 'Nx', 'Module Federation', 'TypeScript', 'Docker'],
    role: 'Frontend Architect',
    highlights: [
      'Definicion de shell + remotes con ownership claro por vertical.',
      'CI/CD por equipo para publicar cambios sin coordinar deploys globales.',
      'Convenciones de UI compartidas para mantener consistencia sin perder autonomia.',
    ],
    featured: true,
    order: 1,
  },
  {
    _id: 'legalo-app',
    title: 'Legalo App',
    slug: 'legalo-app',
    description_es:
      'Plataforma legal SaaS con SSR, arquitectura hexagonal y estado basado en signals para mejorar mantenibilidad y rendimiento.',
    description_en:
      'Legal SaaS platform with SSR, hexagonal architecture and signals-based state focused on maintainability and performance.',
    stack: ['Angular', 'SSR', 'TypeScript', 'Hexagonal Architecture'],
    role: 'Senior Frontend Engineer',
    highlights: [
      'Separacion de dominio y framework para reducir acoplamiento en features criticas.',
      'Render SSR para mejorar indexacion y tiempo hasta contenido util.',
      'Patrones de estado con signals para simplificar flujos de UI complejos.',
    ],
    featured: true,
    order: 2,
  },
  {
    _id: 'platzi-ratings',
    title: 'Platzi Ratings',
    slug: 'platzi-ratings',
    description_es:
      'Sistema de ratings y feedback con foco en trazabilidad de datos, moderacion y experiencia de uso para alto volumen.',
    description_en:
      'Ratings and feedback system focused on data traceability, moderation workflows and UX for high-volume usage.',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    role: 'Frontend Lead',
    highlights: [
      'Modelado de vistas para exponer senales claras sin sobrecargar al usuario.',
      'Integracion con backend para estados asincronicos y moderacion editorial.',
      'Optimizaciones de rendering para listas y paneles de alto trafico.',
    ],
    featured: false,
    order: 3,
  },
  {
    _id: 'mastery-habits',
    title: 'Mastery Habits',
    slug: 'mastery-habits',
    description_es:
      'Producto orientado a habitos y seguimiento personal con UI simple, loops de progreso y una base tecnica liviana.',
    description_en:
      'Habit tracking product with a simple UI, clear progress loops and a lightweight technical foundation.',
    stack: ['Go', 'Bubbletea', 'SQLite'],
    role: 'Product Engineer',
    highlights: [
      'Priorizacion de flujo de uso por encima de features cosmeticas.',
      'Persistencia local y modelo de datos simple para iterar rapido.',
      'Experiencia minimalista centrada en foco y velocidad.',
    ],
    featured: false,
    order: 4,
  },
];
