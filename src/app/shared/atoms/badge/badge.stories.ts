import type { Meta, StoryObj } from '@storybook/angular';
import { BadgeComponent } from './badge.component';

const meta: Meta<BadgeComponent> = {
  title: 'Atoms/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['accent-1', 'accent-2', 'neutral'],
    },
  },
  render: (args) => ({
    props: args,
    template: `<app-badge [color]="color">Angular</app-badge>`,
  }),
};

export default meta;
type Story = StoryObj<BadgeComponent>;

export const Angular: Story = {
  args: { color: 'accent-1' },
};

export const Docker: Story = {
  args: { color: 'accent-2' },
  render: (args) => ({
    props: args,
    template: `<app-badge [color]="color">Docker</app-badge>`,
  }),
};

export const Neutral: Story = {
  args: { color: 'neutral' },
  render: (args) => ({
    props: args,
    template: `<app-badge [color]="color">TypeScript</app-badge>`,
  }),
};

export const AllColors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <app-badge color="accent-1">Angular</app-badge>
        <app-badge color="accent-2">Docker</app-badge>
        <app-badge color="neutral">TypeScript</app-badge>
        <app-badge color="neutral">RxJS</app-badge>
        <app-badge color="accent-1">MVP</app-badge>
        <app-badge color="accent-2">GDE</app-badge>
      </div>
    `,
  }),
};
