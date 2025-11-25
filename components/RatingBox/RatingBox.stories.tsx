import type { Meta, StoryObj } from '@storybook/nextjs'

import RatingBox from './RatingBox'

const meta = {
  title: 'UI/RatingBox',
  component: RatingBox,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    rate: {
      control: { type: 'number', min: 0, max: 10, step: 0.1 },
      description: 'Puntuación de la película (0-10)'
    },
    className: {
      control: 'text',
      description: 'Clases CSS adicionales'
    }
  }
} satisfies Meta<typeof RatingBox>

export default meta
type Story = StoryObj<typeof meta>

export const Low: Story = {
  args: {
    rate: 3.5
  }
}

export const Medium: Story = {
  args: {
    rate: 6.0
  }
}

export const Good: Story = {
  args: {
    rate: 7.5
  }
}

export const Excellent: Story = {
  args: {
    rate: 9.2
  }
}

export const NoRating: Story = {
  args: {
    rate: 0
  }
}
