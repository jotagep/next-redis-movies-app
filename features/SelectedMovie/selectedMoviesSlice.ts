import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchData } from '@/lib/moviesApi'

import type { AppThunk } from '@/store/store'

import { MovieInfo } from '@/types/movies'

interface SelectedMoviesState {
  movies: {
    [id: number]: MovieInfo
  }
  isLoading: boolean
  error: string | null
}

const initialState: SelectedMoviesState = {
  movies: {},
  isLoading: false,
  error: null
}

function startLoading(state: SelectedMoviesState) {
  state.isLoading = true
}

function loadingFailed(
  state: SelectedMoviesState,
  { payload }: PayloadAction<string>
) {
  state.isLoading = false
  state.error = payload
}

const selectedMoviesSlice = createSlice({
  name: 'selectedMovies',
  initialState: initialState,
  reducers: {
    getSelectedMovieStart: startLoading,
    getSelectedMovieSuccess: (
      state: SelectedMoviesState,
      { payload }: PayloadAction<MovieInfo>
    ) => {
      state.isLoading = false
      state.movies = { ...state.movies, [payload.id]: payload }
      state.error = null
    },
    getSelectedMovieFailure: loadingFailed
  }
})

export const {
  getSelectedMovieStart,
  getSelectedMovieSuccess,
  getSelectedMovieFailure
} = selectedMoviesSlice.actions

export default selectedMoviesSlice.reducer

export const fetchDetailMovie =
  (id: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(getSelectedMovieStart())
      const movieInfo = await fetchData<MovieInfo>('/api/movie?id=' + id)
      dispatch(getSelectedMovieSuccess(movieInfo))
    } catch (error: any) {
      dispatch(getSelectedMovieFailure(error.message))
    }
  }
