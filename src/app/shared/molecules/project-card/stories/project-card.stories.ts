import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';
import { ProjectCard } from '../project-card';
import { ProjectSummary } from '../../../../core/models/project.model';

const MOCK_PROJECT: ProjectSummary = {
  _id: '1',
  title: 'eCommerce Microfrontend',
  slug: { current: 'ecommerce-mfe' },
  description_es: 'Arquitectura de microfrontends con Module Federation, Nx y Angular — shell + 4 remotes independientes con CI/CD por equipo.',
  description_en: 'Microfrontend architecture with Module Federation, Nx and Angular — shell + 4 independent remotes with per-team CI/CD.',
  stack: ['Angular', 'Nx', 'Module Federation', 'TypeScript', 'Docker'],
  role: 'Frontend Architect',
  featured: true,
  order: 1,
  url: 'https://example.com',
  repo: 'https://github.com/aletrejo/example',
};

const MOCK_NO_IMAGE: ProjectSummary = {
  ...MOCK_PROJECT,
  _id: '2',
  title: 'Legalo App',
  slug: { current: 'legalo-app' },
  description_es: 'Plataforma legal SaaS — arquitectura hexagonal, signals-based state, SSR y rendimiento optimizado.',
  description_en: 'Legal SaaS platform — hexagonal architecture, signals-based state, SSR and optimized performance.',
  stack: ['Angular', 'SSR', 'TypeScript', 'Hexagonal Architecture'],
  featured: false,
  order: 2,
  url: undefined,
  repo: undefined,
};

const meta: Meta<ProjectCard> = {
  title: 'Molecules/ProjectCard',
  component: ProjectCard,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({ providers: [provideRouter([])] }),
  ],
  argTypes: {
    project: { control: 'object' },
  },
  render: (args) => ({
    props: args,
    template: `<div style="max-width: 380px"><app-project-card [project]="project" /></div>`,
  }),
};

export default meta;
type Story = StoryObj<ProjectCard>;

export const Featured: Story = {
  args: { project: MOCK_PROJECT },
};

export const NoImage: Story = {
  args: { project: MOCK_NO_IMAGE },
};

export const Grid: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; max-width: 1100px">
        <app-project-card [project]="p1" />
        <app-project-card [project]="p2" />
        <app-project-card [project]="p3" />
      </div>
    `,
    props: {
      p1: MOCK_PROJECT,
      p2: { ...MOCK_NO_IMAGE, title: 'Platzi Ratings', slug: { current: 'platzi-ratings' }, stack: ['React', 'Node.js', 'PostgreSQL'] },
      p3: { ...MOCK_NO_IMAGE, title: 'Mastery Habits', slug: { current: 'mastery-habits' }, stack: ['Go', 'Bubbletea', 'SQLite'] },
    },
  }),
};
