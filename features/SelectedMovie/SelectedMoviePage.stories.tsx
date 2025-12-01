import { mockMovieInfo } from '@/mocks/movies'

import SelectedMoviePage from './SelectedMoviePage'

export default {
  title: 'Features/SelectedMovie/SelectedMoviePage',
  component: SelectedMoviePage,
  parameters: {
    layout: 'fullscreen',
    reduxState: {
      selectedMovie: {
        movies: { [mockMovieInfo.id]: mockMovieInfo },
        isLoading: false,
        error: null
      }
    }
  }
}

export const Default = {
  args: {
    id: String(mockMovieInfo.id)
  }
}

export const Loading = {
  args: {
    id: String(mockMovieInfo.id)
  },
  parameters: {
    reduxState: {
      selectedMovie: {
        movies: {},
        isLoading: true,
        error: null
      }
    }
  }
}

export const NotFound = {
  args: {
    id: '999999'
  },
  parameters: {
    reduxState: {
      selectedMovie: {
        movies: {},
        isLoading: false,
        error: null
      }
    }
  }
}

export const WithError = {
  args: {
    id: String(mockMovieInfo.id)
  },
  parameters: {
    reduxState: {
      selectedMovie: {
        movies: {},
        isLoading: false,
        error: 'Failed to load movie'
      }
    }
  }
}
