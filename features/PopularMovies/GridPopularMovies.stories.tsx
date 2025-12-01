import { mockMoviesList } from '@/mocks/movies'

import GridPopularMovies from './GridPopularMovies'

export default {
  title: 'Features/PopularMovies/GridPopularMovies',
  component: GridPopularMovies,
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

export const FewMovies = {
  parameters: {
    reduxState: {
      popularMovies: {
        movies: mockMoviesList.slice(0, 4),
        isLoading: false,
        pagesLoaded: 1
      }
    }
  }
}

export const ManyMovies = {
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

export const OnlyOneMovie = {
  parameters: {
    reduxState: {
      popularMovies: {
        movies: [mockMoviesList[0]],
        isLoading: false,
        pagesLoaded: 1
      }
    }
  }
}
