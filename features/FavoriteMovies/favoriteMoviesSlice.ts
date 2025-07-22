import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Movie } from '@/types/movies'

interface FavoriteMoviesState {
  movies: {
    [idMovie: number]: Movie
  }
}

const getFavorites = (): FavoriteMoviesState => {
  const favorites = global.localStorage?.getItem('verflix_favorites')
  return favorites ? JSON.parse(favorites) : { movies: {} }
}
const setFavorites = (favorites: FavoriteMoviesState) => {
  global.localStorage?.setItem('verflix_favorites', JSON.stringify(favorites))
}

const initialState: FavoriteMoviesState = {
  movies: getFavorites().movies
}

const favoritePage = createSlice({
  name: 'favoriteMovies',
  initialState: initialState,
  reducers: {
    toggleFavorite: (
      state: FavoriteMoviesState,
      { payload }: PayloadAction<Movie>
    ) => {
      if (state.movies[payload.id]) {
        delete state.movies[payload.id]
      } else {
        state.movies = { ...state.movies, [payload.id]: payload }
      }
      setFavorites(state)
    }
  }
})

export const { toggleFavorite } = favoritePage.actions

export default favoritePage.reducer
