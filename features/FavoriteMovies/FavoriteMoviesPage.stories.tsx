import React from 'react'
import { Provider } from 'react-redux'

import FavoriteMoviesPage from './FavoriteMoviesPage'

const mockMovies = {
  1: {
    id: 1,
    title: 'Mock Movie 1',
    original_name: 'Mock Movie 1',
    vote_average: 8.1,
    overview: 'First mock movie.',
    poster_path: '/mock1.jpg',
    backdrop_path: '/mock1-bg.jpg'
  },
  2: {
    id: 2,
    title: 'Mock Movie 2',
    original_name: 'Mock Movie 2',
    vote_average: 7.9,
    overview: 'Second mock movie.',
    poster_path: '/mock2.jpg',
    backdrop_path: '/mock2-bg.jpg'
  },
  3: {
    id: 3,
    title: 'Mock Movie 3',
    original_name: 'Mock Movie 3',
    vote_average: 7.5,
    overview: 'Third mock movie.',
    poster_path: '/mock3.jpg',
    backdrop_path: '/mock3-bg.jpg'
  }
}

export default {
  title: 'Features/FavoriteMovies/FavoriteMoviesPage',
  component: FavoriteMoviesPage,
  parameters: {
    reduxState: {
      favoriteMovies: {
        movies: mockMovies
      }
    }
  }
}

export const Default = {}
