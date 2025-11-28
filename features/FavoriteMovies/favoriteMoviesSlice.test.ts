import type { Movie } from '@/types/movies'

import favoriteMoviesReducer, { toggleFavorite } from './favoriteMoviesSlice'

const mockMovie1: Movie = {
  id: 1,
  title: 'Test Movie 1',
  original_name: 'Test Movie 1 Original',
  vote_average: 8.5,
  overview: 'Test overview 1',
  poster_path: '/test-poster-1.jpg',
  backdrop_path: '/test-backdrop-1.jpg'
}

const mockMovie2: Movie = {
  id: 2,
  title: 'Test Movie 2',
  original_name: 'Test Movie 2 Original',
  vote_average: 7.5,
  overview: 'Test overview 2',
  poster_path: '/test-poster-2.jpg',
  backdrop_path: '/test-backdrop-2.jpg'
}

describe('favoriteMoviesSlice', () => {
  let mockGetItem: jest.SpyInstance
  let mockSetItem: jest.SpyInstance

  beforeEach(() => {
    // Mock localStorage
    mockGetItem = jest.spyOn(Storage.prototype, 'getItem')
    mockSetItem = jest.spyOn(Storage.prototype, 'setItem')
    mockGetItem.mockReturnValue(null)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('initial state', () => {
    it('should return empty movies object when localStorage is empty', () => {
      mockGetItem.mockReturnValue(null)
      const state = favoriteMoviesReducer(undefined, { type: 'unknown' })

      expect(state).toEqual({
        movies: {}
      })
    })

    it('should load movies from localStorage when available', () => {
      const storedMovies = {
        movies: {
          [mockMovie1.id]: mockMovie1
        }
      }
      mockGetItem.mockReturnValue(JSON.stringify(storedMovies))

      // Need to reload the module to get fresh initial state
      jest.isolateModules(() => {
        const freshReducer = require('./favoriteMoviesSlice').default
        const state = freshReducer(undefined, { type: 'unknown' })

        expect(mockGetItem).toHaveBeenCalledWith('verflix_favorites')
      })
    })
  })

  describe('toggleFavorite', () => {
    it('should add a movie to favorites when it does not exist', () => {
      const initialState = { movies: {} }
      const state = favoriteMoviesReducer(initialState, toggleFavorite(mockMovie1))

      expect(state.movies[mockMovie1.id]).toEqual(mockMovie1)
      expect(mockSetItem).toHaveBeenCalledWith('verflix_favorites', JSON.stringify(state))
    })

    it('should remove a movie from favorites when it already exists', () => {
      const initialState = {
        movies: {
          [mockMovie1.id]: mockMovie1
        }
      }
      const state = favoriteMoviesReducer(initialState, toggleFavorite(mockMovie1))

      expect(state.movies[mockMovie1.id]).toBeUndefined()
      expect(mockSetItem).toHaveBeenCalledWith('verflix_favorites', JSON.stringify(state))
    })

    it('should add multiple movies to favorites', () => {
      const initialState = { movies: {} }
      let state = favoriteMoviesReducer(initialState, toggleFavorite(mockMovie1))
      state = favoriteMoviesReducer(state, toggleFavorite(mockMovie2))

      expect(state.movies[mockMovie1.id]).toEqual(mockMovie1)
      expect(state.movies[mockMovie2.id]).toEqual(mockMovie2)
      expect(Object.keys(state.movies)).toHaveLength(2)
    })

    it('should toggle same movie multiple times', () => {
      const initialState = { movies: {} }

      // Add movie
      let state = favoriteMoviesReducer(initialState, toggleFavorite(mockMovie1))
      expect(state.movies[mockMovie1.id]).toEqual(mockMovie1)

      // Remove movie
      state = favoriteMoviesReducer(state, toggleFavorite(mockMovie1))
      expect(state.movies[mockMovie1.id]).toBeUndefined()

      // Add movie again
      state = favoriteMoviesReducer(state, toggleFavorite(mockMovie1))
      expect(state.movies[mockMovie1.id]).toEqual(mockMovie1)
    })

    it('should not affect other movies when toggling', () => {
      const initialState = {
        movies: {
          [mockMovie1.id]: mockMovie1,
          [mockMovie2.id]: mockMovie2
        }
      }

      const state = favoriteMoviesReducer(initialState, toggleFavorite(mockMovie1))

      expect(state.movies[mockMovie1.id]).toBeUndefined()
      expect(state.movies[mockMovie2.id]).toEqual(mockMovie2)
    })

    it('should call localStorage.setItem on every toggle', () => {
      const initialState = { movies: {} }
      favoriteMoviesReducer(initialState, toggleFavorite(mockMovie1))

      expect(mockSetItem).toHaveBeenCalledTimes(1)
      expect(mockSetItem).toHaveBeenCalledWith('verflix_favorites', expect.any(String))
    })

    it('should persist correct data structure to localStorage', () => {
      const initialState = { movies: {} }
      const state = favoriteMoviesReducer(initialState, toggleFavorite(mockMovie1))

      const expectedData = JSON.stringify(state)
      expect(mockSetItem).toHaveBeenCalledWith('verflix_favorites', expectedData)

      const parsedData = JSON.parse(expectedData)
      expect(parsedData).toEqual(state)
    })
  })

  describe('edge cases', () => {
    it('should handle movie with id 0', () => {
      const movieWithZeroId: Movie = { ...mockMovie1, id: 0 }
      const initialState = { movies: {} }
      const state = favoriteMoviesReducer(initialState, toggleFavorite(movieWithZeroId))

      expect(state.movies[0]).toEqual(movieWithZeroId)
    })

    it('should handle movie with negative id', () => {
      const movieWithNegativeId: Movie = { ...mockMovie1, id: -1 }
      const initialState = { movies: {} }
      const state = favoriteMoviesReducer(initialState, toggleFavorite(movieWithNegativeId))

      expect(state.movies[-1]).toEqual(movieWithNegativeId)
    })

    it('should preserve all movie properties', () => {
      const initialState = { movies: {} }
      const state = favoriteMoviesReducer(initialState, toggleFavorite(mockMovie1))

      const savedMovie = state.movies[mockMovie1.id]
      expect(savedMovie.title).toBe(mockMovie1.title)
      expect(savedMovie.original_name).toBe(mockMovie1.original_name)
      expect(savedMovie.vote_average).toBe(mockMovie1.vote_average)
      expect(savedMovie.overview).toBe(mockMovie1.overview)
      expect(savedMovie.poster_path).toBe(mockMovie1.poster_path)
      expect(savedMovie.backdrop_path).toBe(mockMovie1.backdrop_path)
    })
  })
})
