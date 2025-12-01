import { mockMoviesList } from '@/mocks/movies'

import HeroPopularMovie from './HeroPopularMovie'

export default {
  title: 'Features/PopularMovies/HeroPopularMovie',
  component: HeroPopularMovie,
  parameters: {
    layout: 'fullscreen',
    reduxState: {
      popularMovies: {
        movies: mockMoviesList,
        isLoading: false,
        pagesLoaded: 1
      }
    }
  }
}

export const Default = {}

export const Loading = {
  parameters: {
    reduxState: {
      popularMovies: {
        movies: [],
        isLoading: true,
        pagesLoaded: 0
      }
    }
  }
}

export const WithDifferentMovie = {
  parameters: {
    reduxState: {
      popularMovies: {
        movies: [mockMoviesList[1], ...mockMoviesList.slice(2)],
        isLoading: false,
        pagesLoaded: 1
      }
    }
  }
}
