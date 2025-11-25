import type { Meta, StoryObj } from '@storybook/nextjs'

import HeartIcon from './HeartIcon'

const meta = {
  title: 'Features/FavoriteMovies/HeartIcon',
  component: HeartIcon,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1a1a1a' },
        { name: 'light', value: '#ffffff' }
      ]
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '48px', height: '48px' }}>
        <Story />
      </div>
    )
  ],
  argTypes: {
    isFavorite: {
      control: 'boolean',
      description: 'Si el icono está marcado como favorito'
    }
  }
} satisfies Meta<typeof HeartIcon>

export default meta
type Story = StoryObj<typeof meta>

export const NotFavorite: Story = {
  args: {
    isFavorite: false
  }
}

export const Favorite: Story = {
  args: {
    isFavorite: true
  }
}
