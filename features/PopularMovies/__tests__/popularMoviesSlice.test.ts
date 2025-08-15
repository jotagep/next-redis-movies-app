import { configureStore } from '@reduxjs/toolkit'

import {
  fetchPopularMovies,
  getPopularMoviesFailure,
  getPopularMoviesStart,
  getPopularMoviesSuccess
} from '@/features/PopularMovies/popularMoviesSlice'

import rootReducer from '@/store/rootReducer'

import { Movie } from '@/types/movies'

// Mock the moviesApi module
jest.mock('@/lib/moviesApi', () => ({
  getPopularMovies: jest.fn()
}))

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Test Movie 1',
    backdrop_path: '/test1.jpg',
    poster_path: '/test1-poster.jpg',
    vote_average: 8.5,
    overview: 'Test overview 1',
    original_name: 'Test Movie 1'
  },
  {
    id: 2,
    title: 'Test Movie 2',
    backdrop_path: '/test2.jpg',
    poster_path: '/test2-poster.jpg',
    vote_average: 7.5,
    overview: 'Test overview 2',
    original_name: 'Test Movie 2'
  }
]

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      })
  })
}

describe('popularMoviesSlice', () => {
  let store = setupStore()

  beforeEach(() => {
    store = setupStore()
    jest.clearAllMocks()
  })

  describe('reducers', () => {
    it('should handle initial state', () => {
      const state = store.getState().popularMovies
      expect(state).toEqual({
        movies: [],
        isLoading: false,
        error: null,
        pagesLoaded: 0
      })
    })

    it('should handle getPopularMoviesStart', () => {
      store.dispatch(getPopularMoviesStart())
      const state = store.getState().popularMovies
      expect(state.isLoading).toBe(true)
    })

    it('should handle getPopularMoviesSuccess', () => {
      store.dispatch(getPopularMoviesSuccess(mockMovies))
      const state = store.getState().popularMovies
      expect(state.movies).toEqual(mockMovies)
      expect(state.isLoading).toBe(false)
      expect(state.error).toBe(null)
      expect(state.pagesLoaded).toBe(1)
    })

    it('should append movies on subsequent success calls', () => {
      const newMovies: Movie[] = [
        {
          id: 3,
          title: 'Test Movie 3',
          backdrop_path: '/test3.jpg',
          poster_path: '/test3-poster.jpg',
          vote_average: 9.0,
          overview: 'Test overview 3',
          original_name: 'Test Movie 3'
        }
      ]

      store.dispatch(getPopularMoviesSuccess(mockMovies))
      store.dispatch(getPopularMoviesSuccess(newMovies))

      const state = store.getState().popularMovies
      expect(state.movies).toEqual([...mockMovies, ...newMovies])
      expect(state.pagesLoaded).toBe(2)
    })

    it('should handle getPopularMoviesFailure', () => {
      const errorMessage = 'Failed to fetch movies'
      store.dispatch(getPopularMoviesFailure(errorMessage))
      const state = store.getState().popularMovies
      expect(state.isLoading).toBe(false)
      expect(state.error).toBe(errorMessage)
    })
  })

  describe('async thunk', () => {
    it('should fetch popular movies successfully', async () => {
      const { getPopularMovies } = require('@/lib/moviesApi')
      getPopularMovies.mockResolvedValue(mockMovies)

      await store.dispatch(fetchPopularMovies(1))

      const state = store.getState().popularMovies
      expect(state.movies).toEqual(mockMovies)
      expect(state.isLoading).toBe(false)
      expect(state.error).toBe(null)
      expect(getPopularMovies).toHaveBeenCalledWith(1)
    })

    it('should handle fetch error', async () => {
      const { getPopularMovies } = require('@/lib/moviesApi')
      const errorMessage = 'Network error'
      getPopularMovies.mockRejectedValue(new Error(errorMessage))

      await store.dispatch(fetchPopularMovies(1))

      const state = store.getState().popularMovies
      expect(state.isLoading).toBe(false)
      expect(state.error).toBe(errorMessage)
      expect(state.movies).toEqual([])
    })
  })
})
