import type { Meta, StoryObj } from '@storybook/nextjs'

import { mockMovieDetailed } from '@/mocks/movies'

import HeroMovie from './index'

const meta = {
  title: 'UI/Organisms/HeroMovie',
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
    movie: mockMovieDetailed,
    children: undefined
  }
}

export const WithCustomContent: Story = {
  args: {
    movie: mockMovieDetailed,
    children: (
      <div>
        <h1 className="mb-4 text-5xl font-bold text-white">{mockMovieDetailed.title}</h1>
        <p className="max-w-2xl text-xl text-white">{mockMovieDetailed.overview}</p>
      </div>
    )
  }
}
