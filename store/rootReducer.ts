import { combineReducers } from '@reduxjs/toolkit'

import favoriteMoviesSlice from '@/features/FavoriteMovies/favoriteMoviesSlice'
import popularMoviesSlice from '@/features/PopularMovies/popularMoviesSlice'
import searchMovieSlice from '@/features/SearchMovies/searchMoviesSlice'
import selectedMovieSlice from '@/features/SelectedMovie/selectedMoviesSlice'

const rootReducer = combineReducers({
  popularMovies: popularMoviesSlice,
  favoriteMovies: favoriteMoviesSlice,
  selectedMovie: selectedMovieSlice,
  searchMovie: searchMovieSlice
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
