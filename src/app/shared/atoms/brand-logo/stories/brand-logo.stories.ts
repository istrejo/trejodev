import type { Meta, StoryObj } from '@storybook/angular';
import { BrandLogo } from '../brand-logo';

const meta: Meta<BrandLogo> = {
  title: 'Atoms/BrandLogo',
  component: BrandLogo,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export default meta;
type Story = StoryObj<BrandLogo>;

export const Default: Story = {};
