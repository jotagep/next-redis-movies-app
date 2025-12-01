import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { moviesApi } from '@/lib/moviesApi'

import { AppThunk } from '@/store/store'

import type { Movie } from '@/types/movies'

export interface PopularMoviesState {
  movies: Movie[]
  isLoading: boolean
  error: string | null
  pagesLoaded: number
}

const initialState: PopularMoviesState = {
  movies: [],
  isLoading: false,
  error: null,
  pagesLoaded: 0
}

function startLoading(state: PopularMoviesState) {
  state.isLoading = true
}

function loadingFailed(state: PopularMoviesState, { payload }: PayloadAction<string>) {
  state.isLoading = false
  state.error = payload
}

const popularMoviesSlice = createSlice({
  name: 'popularMovies',
  initialState: initialState,
  reducers: {
    getPopularMoviesStart: startLoading,
    getPopularMoviesSuccess: (state: PopularMoviesState, { payload }: PayloadAction<Movie[]>) => {
      state.isLoading = false
      state.movies = [...state.movies, ...payload]
      state.pagesLoaded = state.pagesLoaded + 1
      state.error = null
    },
    getPopularMoviesFailure: loadingFailed
  }
})

export const { getPopularMoviesStart, getPopularMoviesSuccess, getPopularMoviesFailure } = popularMoviesSlice.actions

export default popularMoviesSlice.reducer

export const fetchPopularMovies =
  (page: number = 1): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(getPopularMoviesStart())
      const movies = await moviesApi.getPopularMovies(page)
      dispatch(getPopularMoviesSuccess(movies))
    } catch (error: any) {
      dispatch(getPopularMoviesFailure(error.message))
    }
  }
