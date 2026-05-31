import type { Meta, StoryObj } from '@storybook/angular';
import { Tag } from '../tag';

const meta: Meta<Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
  render: () => ({
    template: `<app-tag>Angular</app-tag>`,
  }),
};

export default meta;
type Story = StoryObj<Tag>;

export const Default: Story = {
  render: () => ({
    template: `<app-tag>Angular</app-tag>`,
  }),
};

export const StackGroup: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <app-tag>Angular</app-tag>
        <app-tag>TypeScript</app-tag>
        <app-tag>RxJS</app-tag>
        <app-tag>Tailwind</app-tag>
        <app-tag>Docker</app-tag>
        <app-tag>Nx</app-tag>
        <app-tag>Storybook</app-tag>
      </div>
    `,
  }),
};
