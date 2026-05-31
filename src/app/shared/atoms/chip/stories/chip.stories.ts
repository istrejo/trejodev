import type { Meta, StoryObj } from '@storybook/angular';
import { Chip } from '../chip';

const meta: Meta<Chip> = {
  title: 'Atoms/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `<app-chip [selected]="selected" [disabled]="disabled">Angular</app-chip>`,
  }),
};

export default meta;
type Story = StoryObj<Chip>;

export const Unselected: Story = {
  args: { selected: false, disabled: false },
};

export const Selected: Story = {
  args: { selected: true, disabled: false },
};

export const Disabled: Story = {
  args: { selected: false, disabled: true },
};

export const FilterGroup: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <app-chip [selected]="true">All</app-chip>
        <app-chip>Angular</app-chip>
        <app-chip>TypeScript</app-chip>
        <app-chip>Architecture</app-chip>
        <app-chip>Microfrontends</app-chip>
        <app-chip>RxJS</app-chip>
      </div>
    `,
  }),
};
