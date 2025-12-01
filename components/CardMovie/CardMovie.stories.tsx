import type { Meta, StoryObj } from '@storybook/nextjs'

import { mockMovieDetailed } from '@/mocks/movies'

import CardMovie from './index'

const meta = {
  title: 'UI/Organisms/CardMovie',
  component: CardMovie,
  parameters: {
    layout: 'padded',
    nextjs: {
      router: {
        pathname: '/'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof CardMovie>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    movie: mockMovieDetailed
  }
}

export const HighRating: Story = {
  args: {
    movie: {
      ...mockMovieDetailed,
      title: 'The Shawshank Redemption',
      vote_average: 9.3
    }
  }
}

export const LowRating: Story = {
  args: {
    movie: {
      ...mockMovieDetailed,
      title: 'Bad Movie',
      vote_average: 3.2
    }
  }
}

export const WithoutBackdrop: Story = {
  args: {
    movie: {
      ...mockMovieDetailed,
      backdrop_path: ''
    }
  }
}
