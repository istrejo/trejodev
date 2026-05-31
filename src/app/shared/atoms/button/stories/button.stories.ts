import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from '../button';

const meta: Meta<Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    disabled: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [size]="size" [type]="type" [disabled]="disabled">Click me</app-button>`,
  }),
};

export default meta;
type Story = StoryObj<Button>;

export const Primary: Story = {
  args: { variant: 'primary', size: 'md', disabled: false },
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md', disabled: false },
};

export const Ghost: Story = {
  args: { variant: 'ghost', size: 'md', disabled: false },
};

export const Small: Story = {
  args: { variant: 'primary', size: 'sm', disabled: false },
};

export const Large: Story = {
  args: { variant: 'primary', size: 'lg', disabled: false },
};

export const Disabled: Story = {
  args: { variant: 'primary', size: 'md', disabled: true },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <app-button variant="primary" size="md">Primary</app-button>
        <app-button variant="secondary" size="md">Secondary</app-button>
        <app-button variant="ghost" size="md">Ghost</app-button>
      </div>
    `,
  }),
};
