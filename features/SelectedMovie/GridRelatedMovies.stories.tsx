import { mockMoviesList } from '@/mocks/movies'

import GridRelatedMovies from './GridRelatedMovies'

export default {
  title: 'Features/SelectedMovie/GridRelatedMovies',
  component: GridRelatedMovies,
  parameters: {
    layout: 'fullscreen'
  }
}

export const Default = {
  args: {
    movies: mockMoviesList
  }
}

export const FewMovies = {
  args: {
    movies: mockMoviesList.slice(0, 2)
  }
}

export const ExactlyFour = {
  args: {
    movies: mockMoviesList.slice(0, 4)
  }
}

export const ManyMovies = {
  args: {
    movies: [...mockMoviesList, ...mockMoviesList]
  }
}

export const Empty = {
  args: {
    movies: []
  }
}
