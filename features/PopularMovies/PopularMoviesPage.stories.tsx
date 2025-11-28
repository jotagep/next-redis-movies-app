import PopularMoviesPage from './PopularMoviesPage'

import { mockMoviesList } from '@/mocks/movies'

export default {
  title: 'Features/PopularMovies/PopularMoviesPage',
  component: PopularMoviesPage,
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
        movies: mockMoviesList,
        isLoading: true,
        pagesLoaded: 1
      }
    }
  }
}

export const InitialLoad = {
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

export const MultiplePages = {
  parameters: {
    reduxState: {
      popularMovies: {
        movies: [...mockMoviesList, ...mockMoviesList, ...mockMoviesList],
        isLoading: false,
        pagesLoaded: 3
      }
    }
  }
}
