import type { Meta, StoryObj } from '@storybook/nextjs'

import GridMovie from './GridMovie'

import { mockMoviesList } from '@/mocks/movies'

const meta = {
  title: 'UI/Organisms/GridMovie',
  component: GridMovie,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      router: {
        pathname: '/'
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof GridMovie>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    movies: mockMoviesList
  }
}

export const WithTitle: Story = {
  args: {
    movies: mockMoviesList,
    title: 'Popular Movies'
  }
}

export const WithCustomClass: Story = {
  args: {
    movies: mockMoviesList,
    title: 'Related Movies',
    className: 'bg-gray-900'
  }
}

export const FewMovies: Story = {
  args: {
    movies: mockMoviesList.slice(0, 4),
    title: 'Latest Releases'
  }
}

export const Empty: Story = {
  args: {
    movies: [],
    title: 'No Movies Available'
  }
}

export const Loading: Story = {
  args: {
    movies: undefined,
    title: 'Loading State'
  }
}
