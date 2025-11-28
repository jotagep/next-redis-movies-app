import SearchList from './index'

import { mockMoviesList } from '@/mocks/movies'

export default {
  title: 'Features/SearchMovies/SearchList',
  component: SearchList,
  parameters: {
    layout: 'fullscreen',
    reduxState: {
      searchMovie: {
        movies: mockMoviesList,
        isLoading: false,
        error: null,
        isFocused: true
      }
    }
  }
}

export const Default = {}

export const Hidden = {
  parameters: {
    reduxState: {
      searchMovie: {
        movies: mockMoviesList,
        isLoading: false,
        error: null,
        isFocused: false
      }
    }
  }
}

export const FewMovies = {
  parameters: {
    reduxState: {
      searchMovie: {
        movies: mockMoviesList.slice(0, 3),
        isLoading: false,
        error: null,
        isFocused: true
      }
    }
  }
}

export const NoMovies = {
  parameters: {
    reduxState: {
      searchMovie: {
        movies: [],
        isLoading: false,
        error: null,
        isFocused: true
      }
    }
  }
}

export const Loading = {
  parameters: {
    reduxState: {
      searchMovie: {
        movies: [],
        isLoading: true,
        error: null,
        isFocused: true
      }
    }
  }
}
