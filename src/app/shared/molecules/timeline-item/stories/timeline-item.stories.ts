import type { Meta, StoryObj } from '@storybook/angular';
import { TimelineItem, TimelineJob } from '../timeline-item';

const MOCK_JOB: TimelineJob = {
  company: 'Digitalmente Studio',
  role: 'Founder & Frontend Architect',
  period: '2022 — presente',
  current: true,
  description_es: 'Consultoría frontend especializada en Angular y arquitectura de sistemas. Proyectos de microfrontends, auditorías técnicas y mentoría de equipos.',
  description_en: 'Frontend consultancy specialized in Angular and systems architecture. Microfrontend projects, technical audits and team mentoring.',
  tech: ['Angular', 'Nx', 'Module Federation', 'TypeScript', 'Docker'],
  highlights: [
    'Arquitectura MFE para eCommerce con 4 equipos independientes',
    'Migración AngularJS → Angular 17+ para plataforma SaaS',
    'CI/CD con GitHub Actions + Dokploy para múltiples clientes',
  ],
};

const MOCK_PAST: TimelineJob = {
  company: 'Tech Company',
  role: 'Senior Frontend Developer',
  period: '2019 — 2022',
  current: false,
  description_es: 'Desarrollo de aplicaciones Angular a escala empresarial. Líder técnico del equipo frontend de 6 personas.',
  description_en: 'Enterprise-scale Angular application development. Technical lead for a 6-person frontend team.',
  tech: ['Angular', 'RxJS', 'TypeScript', 'Jest'],
  highlights: ['Implementé design system reutilizado por 3 productos'],
};

const meta: Meta<TimelineItem> = {
  title: 'Molecules/TimelineItem',
  component: TimelineItem,
  tags: ['autodocs'],
  argTypes: {
    last: { control: 'boolean' },
    locale: { control: 'select', options: ['es', 'en'] },
  },
  render: (args) => ({
    props: args,
    template: `<div style="max-width: 640px; padding: 1rem"><app-timeline-item [job]="job" [last]="last" [locale]="locale" /></div>`,
  }),
};

export default meta;
type Story = StoryObj<TimelineItem>;

export const Current: Story = {
  args: { job: MOCK_JOB, last: false, locale: 'es' },
};

export const Past: Story = {
  args: { job: MOCK_PAST, last: true, locale: 'es' },
};

export const FullTimeline: Story = {
  render: () => ({
    template: `
      <div style="max-width: 640px; padding: 1.5rem">
        <app-timeline-item [job]="current" [last]="false" locale="es" />
        <app-timeline-item [job]="past" [last]="true" locale="es" />
      </div>
    `,
    props: { current: MOCK_JOB, past: MOCK_PAST },
  }),
};
