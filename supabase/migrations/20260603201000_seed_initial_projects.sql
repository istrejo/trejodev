insert into public.projects (
  slug,
  title,
  description_es,
  description_en,
  role,
  stack,
  highlights_es,
  highlights_en,
  featured,
  display_order,
  project_url,
  repo_url,
  cover_path,
  published
)
values
  (
    'ecommerce-mfe',
    'eCommerce Microfrontend',
    'Arquitectura de microfrontends con Module Federation, Nx y Angular para desacoplar releases, ownership y pipelines por equipo.',
    'Microfrontend architecture with Module Federation, Nx and Angular to decouple releases, ownership and delivery pipelines per team.',
    'Frontend Architect',
    array['Angular', 'Nx', 'Module Federation', 'TypeScript', 'Docker'],
    array[
      'Definicion de shell + remotes con ownership claro por vertical.',
      'CI/CD por equipo para publicar cambios sin coordinar deploys globales.',
      'Convenciones de UI compartidas para mantener consistencia sin perder autonomia.'
    ],
    array[
      'Defined a shell and remote topology with clear ownership by business vertical.',
      'Enabled team-level CI/CD so changes could ship without coordinating global deploys.',
      'Established shared UI conventions to preserve consistency without blocking autonomy.'
    ],
    true,
    1,
    null,
    null,
    null,
    true
  ),
  (
    'legalo-app',
    'Legalo App',
    'Plataforma legal SaaS con SSR, arquitectura hexagonal y estado basado en signals para mejorar mantenibilidad y rendimiento.',
    'Legal SaaS platform with SSR, hexagonal architecture and signals-based state focused on maintainability and performance.',
    'Senior Frontend Engineer',
    array['Angular', 'SSR', 'TypeScript', 'Hexagonal Architecture'],
    array[
      'Separacion de dominio y framework para reducir acoplamiento en features criticas.',
      'Render SSR para mejorar indexacion y tiempo hasta contenido util.',
      'Patrones de estado con signals para simplificar flujos de UI complejos.'
    ],
    array[
      'Separated domain and framework concerns to reduce coupling in critical features.',
      'Implemented SSR to improve indexing and time to useful content.',
      'Used signal-based state patterns to simplify complex UI flows.'
    ],
    true,
    2,
    null,
    null,
    null,
    true
  ),
  (
    'platzi-ratings',
    'Platzi Ratings',
    'Sistema de ratings y feedback con foco en trazabilidad de datos, moderacion y experiencia de uso para alto volumen.',
    'Ratings and feedback system focused on data traceability, moderation workflows and UX for high-volume usage.',
    'Frontend Lead',
    array['React', 'Node.js', 'PostgreSQL'],
    array[
      'Modelado de vistas para exponer senales claras sin sobrecargar al usuario.',
      'Integracion con backend para estados asincronicos y moderacion editorial.',
      'Optimizaciones de rendering para listas y paneles de alto trafico.'
    ],
    array[
      'Designed views that exposed clear signals without overwhelming the user.',
      'Integrated with backend workflows for asynchronous states and editorial moderation.',
      'Optimized rendering for high-traffic lists and operational dashboards.'
    ],
    false,
    3,
    null,
    null,
    null,
    true
  ),
  (
    'mastery-habits',
    'Mastery Habits',
    'Producto orientado a habitos y seguimiento personal con UI simple, loops de progreso y una base tecnica liviana.',
    'Habit tracking product with a simple UI, clear progress loops and a lightweight technical foundation.',
    'Product Engineer',
    array['Go', 'Bubbletea', 'SQLite'],
    array[
      'Priorizacion de flujo de uso por encima de features cosmeticas.',
      'Persistencia local y modelo de datos simple para iterar rapido.',
      'Experiencia minimalista centrada en foco y velocidad.'
    ],
    array[
      'Prioritized the usage flow over cosmetic feature work.',
      'Kept persistence local and the data model simple to iterate quickly.',
      'Built a minimalist experience centered on focus and speed.'
    ],
    false,
    4,
    null,
    null,
    null,
    true
  )
on conflict (slug) do update
set title = excluded.title,
    description_es = excluded.description_es,
    description_en = excluded.description_en,
    role = excluded.role,
    stack = excluded.stack,
    highlights_es = excluded.highlights_es,
    highlights_en = excluded.highlights_en,
    featured = excluded.featured,
    display_order = excluded.display_order,
    project_url = excluded.project_url,
    repo_url = excluded.repo_url,
    cover_path = excluded.cover_path,
    published = excluded.published;
