import type { Meta, StoryObj } from '@storybook/nextjs'

import { Movie } from '@/types/movies'

import HeroMovie from './index'

const mockMovie: Movie = {
  id: 872585,
  title: 'Oppenheimer',
  overview:
    'La historia del físico teórico J. Robert Oppenheimer y su papel en el desarrollo de la bomba atómica durante la Segunda Guerra Mundial.',
  poster_path: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
  backdrop_path: '/628Dep6AxEtDxjZoGP78TsOxYbK.jpg',
  vote_average: 7.1,
  original_name: 'Oppenheimer'
}

const meta = {
  title: 'Blocks/HeroMovie',
  component: HeroMovie,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
} satisfies Meta<typeof HeroMovie>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    movie: mockMovie,
    children: undefined
  }
}

export const WithCustomContent: Story = {
  args: {
    movie: mockMovie,
    children: (
      <div>
        <h1 className="text-5xl font-bold text-white mb-4">
          {mockMovie.title}
        </h1>
        <p className="text-xl text-white max-w-2xl">{mockMovie.overview}</p>
      </div>
    )
  }
}
