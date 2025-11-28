import React from 'react'
import { Provider } from 'react-redux'

import FavoriteMoviesPage from './FavoriteMoviesPage'

import { mockMoviesList } from '@/mocks/movies'

export default {
  title: 'Features/FavoriteMovies/FavoriteMoviesPage',
  component: FavoriteMoviesPage,
  parameters: {
    reduxState: {
      favoriteMovies: {
        movies: mockMoviesList
      }
    }
  }
}

export const Default = {}
