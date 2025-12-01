import SearchBar from './index'

export default {
  title: 'Features/SearchMovies/SearchBar',
  component: SearchBar,
  parameters: {
    reduxState: {
      searchMovie: {
        movies: [],
        isLoading: false,
        error: null,
        isFocused: false
      }
    }
  }
}

export const Default = {}

export const Focused = {
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
