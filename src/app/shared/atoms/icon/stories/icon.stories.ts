import type { Meta, StoryObj } from '@storybook/angular';
import { IconComponent } from '../icon.component';

const meta: Meta<IconComponent> = {
  title: 'Atoms/Icon',
  component: IconComponent,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'github',
        'linkedin',
        'mail',
        'external-link',
        'menu',
        'close',
        'chevron-right',
        'chevron-down',
        'arrow-right',
        'copy',
        'check',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  render: (args) => ({
    props: args,
    template: `<app-icon [name]="name" [size]="size" style="color: var(--color-text)" />`,
  }),
};

export default meta;
type Story = StoryObj<IconComponent>;

export const Github: Story = {
  args: { name: 'github', size: 'md' },
};

export const ExternalLink: Story = {
  args: { name: 'external-link', size: 'md' },
};

export const AllIcons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; color: var(--color-text)">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <app-icon name="github" size="lg" />
          <span style="font-size: 10px; color: var(--color-muted); font-family: monospace">github</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <app-icon name="linkedin" size="lg" />
          <span style="font-size: 10px; color: var(--color-muted); font-family: monospace">linkedin</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <app-icon name="mail" size="lg" />
          <span style="font-size: 10px; color: var(--color-muted); font-family: monospace">mail</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <app-icon name="external-link" size="lg" />
          <span style="font-size: 10px; color: var(--color-muted); font-family: monospace">external-link</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <app-icon name="arrow-right" size="lg" />
          <span style="font-size: 10px; color: var(--color-muted); font-family: monospace">arrow-right</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <app-icon name="menu" size="lg" />
          <span style="font-size: 10px; color: var(--color-muted); font-family: monospace">menu</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <app-icon name="close" size="lg" />
          <span style="font-size: 10px; color: var(--color-muted); font-family: monospace">close</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <app-icon name="check" size="lg" />
          <span style="font-size: 10px; color: var(--color-muted); font-family: monospace">check</span>
        </div>
      </div>
    `,
  }),
};
