import type { Meta, StoryObj } from '@storybook/nextjs'

import { MovieDetailed } from '@/types/movies'

import CardMovie from './index'

// Mock de una película de ejemplo
const mockMovie: MovieDetailed = {
  id: 872585,
  title: 'Oppenheimer',
  overview:
    'La historia del físico teórico J. Robert Oppenheimer y su papel en el desarrollo de la bomba atómica.',
  poster_path: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
  backdrop_path: '/628Dep6AxEtDxjZoGP78TsOxYbK.jpg',
  vote_average: 7.1,
  release_date: '2023-07-19',
  genres: [
    {
      id: 18,
      name: 'Drama'
    },
    {
      id: 36,
      name: 'History'
    }
  ],
  original_name: 'Oppenheimer',
  tagline: 'The World Will Never Be The Same',
  runtime: '180',
  budget: 100000000,
  revenue: 2000000000
}

const meta = {
  title: 'Blocks/CardMovie',
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
    movie: mockMovie
  }
}

export const HighRating: Story = {
  args: {
    movie: {
      ...mockMovie,
      title: 'The Shawshank Redemption',
      vote_average: 9.3
    }
  }
}

export const LowRating: Story = {
  args: {
    movie: {
      ...mockMovie,
      title: 'Bad Movie',
      vote_average: 3.2
    }
  }
}

export const WithoutBackdrop: Story = {
  args: {
    movie: {
      ...mockMovie,
      backdrop_path: ''
    }
  }
}
