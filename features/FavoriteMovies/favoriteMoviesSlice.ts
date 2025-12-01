import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { Movie } from '@/types/movies'

import { STORAGE_FAVORITES_KEY } from '@/config/constants'

interface FavoriteMoviesState {
  movies: {
    [idMovie: number]: Movie
  }
}

const getFavorites = (): FavoriteMoviesState => {
  const favorites = global.localStorage?.getItem(STORAGE_FAVORITES_KEY)
  return favorites ? JSON.parse(favorites) : { movies: {} }
}
const setFavorites = (favorites: FavoriteMoviesState) => {
  global.localStorage?.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(favorites))
}

const initialState: FavoriteMoviesState = {
  movies: getFavorites().movies
}

const favoriteMoviesSlice = createSlice({
  name: 'favoriteMovies',
  initialState: initialState,
  reducers: {
    toggleFavorite: (state: FavoriteMoviesState, { payload }: PayloadAction<Movie>) => {
      if (state.movies[payload.id]) {
        delete state.movies[payload.id]
      } else {
        state.movies = { ...state.movies, [payload.id]: payload }
      }
      setFavorites(state)
    }
  }
})

export const { toggleFavorite } = favoriteMoviesSlice.actions

export default favoriteMoviesSlice.reducer
