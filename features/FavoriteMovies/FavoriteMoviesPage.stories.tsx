import React from 'react'
import { Provider } from 'react-redux'

import { mockMoviesList } from '@/mocks/movies'

import FavoriteMoviesPage from './FavoriteMoviesPage'

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
