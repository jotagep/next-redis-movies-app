import React from 'react'
import { Provider } from 'react-redux'

import LoadMore from './LoadMore'

import { mockMoviesList } from '@/mocks/movies'

export default {
  title: 'Features/PopularMovies/LoadMore',
  component: LoadMore,
  parameters: {
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

export const InitialState = {
  parameters: {
    reduxState: {
      popularMovies: {
        movies: [],
        isLoading: false,
        pagesLoaded: 0
      }
    }
  }
}
