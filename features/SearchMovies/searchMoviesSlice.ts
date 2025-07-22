import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getSearchMovie } from '@/lib/moviesApi'
import { AppThunk } from '@/store/store'
import { Movie } from '@/types/movies'

interface SearchMovieState {
  movies: Movie[]
  isLoading: boolean
  error: string | null
  isFocused: boolean
}

const initialState: SearchMovieState = {
  movies: [],
  isLoading: false,
  error: null,
  isFocused: false
}

function startLoading(state: SearchMovieState) {
  state.isLoading = true
}

function loadingFailed(
  state: SearchMovieState,
  { payload }: PayloadAction<string>
) {
  state.isLoading = false
  state.error = payload
}

const searchMovies = createSlice({
  name: 'searchMovies',
  initialState: initialState,
  reducers: {
    getSearchMovieStart: startLoading,
    setFocused: (
      state: SearchMovieState,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isFocused = payload
    },
    setEmptyMovies: (state: SearchMovieState) => {
      state.movies = []
    },
    getSearchMovieSuccess: (
      state: SearchMovieState,
      { payload }: PayloadAction<Movie[]>
    ) => {
      state.isLoading = false
      state.movies = payload
      state.error = null
    },
    getSearchMovieFailure: loadingFailed
  }
})

export const {
  getSearchMovieStart,
  setFocused,
  setEmptyMovies,
  getSearchMovieSuccess,
  getSearchMovieFailure
} = searchMovies.actions

export default searchMovies.reducer

export const fetchSearchMovie =
  (text: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(getSearchMovieStart())
      const movies = await getSearchMovie(text)
      dispatch(getSearchMovieSuccess(movies))
    } catch (error: any) {
      dispatch(getSearchMovieFailure(error.message))
    }
  }
