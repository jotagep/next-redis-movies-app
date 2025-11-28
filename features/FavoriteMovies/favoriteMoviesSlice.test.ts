import type { Movie } from '@/types/movies'

import favoriteMoviesReducer, { toggleFavorite } from './favoriteMoviesSlice'

import { mockMoviesList } from '@/mocks/movies'

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
          [mockMoviesList[0].id]: mockMoviesList[0]
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
      const state = favoriteMoviesReducer(initialState, toggleFavorite(mockMoviesList[0]))

      expect(state.movies[mockMoviesList[0].id]).toEqual(mockMoviesList[0])
      expect(mockSetItem).toHaveBeenCalledWith('verflix_favorites', JSON.stringify(state))
    })

    it('should remove a movie from favorites when it already exists', () => {
      const initialState = {
        movies: {
          [mockMoviesList[0].id]: mockMoviesList[0]
        }
      }
      const state = favoriteMoviesReducer(initialState, toggleFavorite(mockMoviesList[0]))

      expect(state.movies[mockMoviesList[0].id]).toBeUndefined()
      expect(mockSetItem).toHaveBeenCalledWith('verflix_favorites', JSON.stringify(state))
    })

    it('should add multiple movies to favorites', () => {
      const initialState = { movies: {} }
      let state = favoriteMoviesReducer(initialState, toggleFavorite(mockMoviesList[0]))
      state = favoriteMoviesReducer(state, toggleFavorite(mockMoviesList[1]))

      expect(state.movies[mockMoviesList[0].id]).toEqual(mockMoviesList[0])
      expect(state.movies[mockMoviesList[1].id]).toEqual(mockMoviesList[1])
      expect(Object.keys(state.movies)).toHaveLength(2)
    })

    it('should toggle same movie multiple times', () => {
      const initialState = { movies: {} }

      // Add movie
      let state = favoriteMoviesReducer(initialState, toggleFavorite(mockMoviesList[0]))
      expect(state.movies[mockMoviesList[0].id]).toEqual(mockMoviesList[0])

      // Remove movie
      state = favoriteMoviesReducer(state, toggleFavorite(mockMoviesList[0]))
      expect(state.movies[mockMoviesList[0].id]).toBeUndefined()

      // Add movie again
      state = favoriteMoviesReducer(state, toggleFavorite(mockMoviesList[0]))
      expect(state.movies[mockMoviesList[0].id]).toEqual(mockMoviesList[0])
    })

    it('should not affect other movies when toggling', () => {
      const initialState = {
        movies: {
          [mockMoviesList[0].id]: mockMoviesList[0],
          [mockMoviesList[1].id]: mockMoviesList[1]
        }
      }

      const state = favoriteMoviesReducer(initialState, toggleFavorite(mockMoviesList[0]))

      expect(state.movies[mockMoviesList[0].id]).toBeUndefined()
      expect(state.movies[mockMoviesList[1].id]).toEqual(mockMoviesList[1])
    })

    it('should call localStorage.setItem on every toggle', () => {
      const initialState = { movies: {} }
      favoriteMoviesReducer(initialState, toggleFavorite(mockMoviesList[0]))

      expect(mockSetItem).toHaveBeenCalledTimes(1)
      expect(mockSetItem).toHaveBeenCalledWith('verflix_favorites', expect.any(String))
    })

    it('should persist correct data structure to localStorage', () => {
      const initialState = { movies: {} }
      const state = favoriteMoviesReducer(initialState, toggleFavorite(mockMoviesList[0]))

      const expectedData = JSON.stringify(state)
      expect(mockSetItem).toHaveBeenCalledWith('verflix_favorites', expectedData)

      const parsedData = JSON.parse(expectedData)
      expect(parsedData).toEqual(state)
    })
  })

  describe('edge cases', () => {
    it('should handle movie with id 0', () => {
      const movieWithZeroId: Movie = { ...mockMoviesList[0], id: 0 }
      const initialState = { movies: {} }
      const state = favoriteMoviesReducer(initialState, toggleFavorite(movieWithZeroId))

      expect(state.movies[0]).toEqual(movieWithZeroId)
    })

    it('should handle movie with negative id', () => {
      const movieWithNegativeId: Movie = { ...mockMoviesList[0], id: -1 }
      const initialState = { movies: {} }
      const state = favoriteMoviesReducer(initialState, toggleFavorite(movieWithNegativeId))

      expect(state.movies[-1]).toEqual(movieWithNegativeId)
    })

    it('should preserve all movie properties', () => {
      const initialState = { movies: {} }
      const state = favoriteMoviesReducer(initialState, toggleFavorite(mockMoviesList[0]))

      const savedMovie = state.movies[mockMoviesList[0].id]
      expect(savedMovie.title).toBe(mockMoviesList[0].title)
      expect(savedMovie.original_name).toBe(mockMoviesList[0].original_name)
      expect(savedMovie.vote_average).toBe(mockMoviesList[0].vote_average)
      expect(savedMovie.overview).toBe(mockMoviesList[0].overview)
      expect(savedMovie.poster_path).toBe(mockMoviesList[0].poster_path)
      expect(savedMovie.backdrop_path).toBe(mockMoviesList[0].backdrop_path)
    })
  })
})
