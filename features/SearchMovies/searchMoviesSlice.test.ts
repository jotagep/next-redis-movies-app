import { moviesApi } from '@/lib/moviesApi'

import searchMoviesReducer, {
  fetchSearchMovie,
  getSearchMovieFailure,
  getSearchMovieStart,
  getSearchMovieSuccess,
  setEmptyMovies,
  setFocused
} from './searchMoviesSlice'

import { mockMoviesList } from '@/mocks/movies'

jest.mock('@/lib/moviesApi', () => ({
  moviesApi: {
    getSearchMovie: jest.fn()
  }
}))

describe('searchMoviesSlice', () => {
  describe('reducers', () => {
    it('should handle initial state', () => {
      expect(searchMoviesReducer(undefined, { type: 'unknown' })).toEqual({
        movies: [],
        isLoading: false,
        error: null,
        isFocused: false
      })
    })

    it('should handle getSearchMovieStart', () => {
      const actual = searchMoviesReducer(undefined, getSearchMovieStart())
      expect(actual.isLoading).toBe(true)
    })

    it('should handle getSearchMovieSuccess', () => {
      const actual = searchMoviesReducer(undefined, getSearchMovieSuccess(mockMoviesList))
      expect(actual.isLoading).toBe(false)
      expect(actual.movies).toEqual(mockMoviesList)
      expect(actual.error).toBe(null)
    })

    it('should handle getSearchMovieFailure', () => {
      const actual = searchMoviesReducer(undefined, getSearchMovieFailure('Error message'))
      expect(actual.isLoading).toBe(false)
      expect(actual.error).toBe('Error message')
    })

    it('should handle setFocused with true', () => {
      const actual = searchMoviesReducer(undefined, setFocused(true))
      expect(actual.isFocused).toBe(true)
    })

    it('should handle setFocused with false', () => {
      const initialState = {
        movies: mockMoviesList,
        isLoading: false,
        error: null,
        isFocused: true
      }
      const actual = searchMoviesReducer(initialState, setFocused(false))
      expect(actual.isFocused).toBe(false)
    })

    it('should handle setEmptyMovies', () => {
      const initialState = {
        movies: mockMoviesList,
        isLoading: false,
        error: null,
        isFocused: true
      }
      const actual = searchMoviesReducer(initialState, setEmptyMovies())
      expect(actual.movies).toEqual([])
    })

    it('should replace movies on success, not append', () => {
      const initialState = {
        movies: [mockMoviesList[0]],
        isLoading: false,
        error: null,
        isFocused: true
      }
      const newMovies = [mockMoviesList[1], mockMoviesList[2]]
      const actual = searchMoviesReducer(initialState, getSearchMovieSuccess(newMovies))
      expect(actual.movies).toEqual(newMovies)
      expect(actual.movies).toHaveLength(2)
    })
  })

  describe('async thunk', () => {
    it('should fetch search movies successfully', async () => {
      const mockDispatch = jest.fn()
      ;(moviesApi.getSearchMovie as jest.Mock).mockResolvedValue(mockMoviesList)

      await fetchSearchMovie('Oppenheimer')(mockDispatch, jest.fn(), undefined)

      expect(mockDispatch).toHaveBeenCalledWith(getSearchMovieStart())
      expect(moviesApi.getSearchMovie).toHaveBeenCalledWith('Oppenheimer')
      expect(mockDispatch).toHaveBeenCalledWith(getSearchMovieSuccess(mockMoviesList))
    })

    it('should handle fetch error', async () => {
      const mockDispatch = jest.fn()
      const errorMessage = 'Failed to fetch'
      ;(moviesApi.getSearchMovie as jest.Mock).mockRejectedValue(new Error(errorMessage))

      await fetchSearchMovie('test')(mockDispatch, jest.fn(), undefined)

      expect(mockDispatch).toHaveBeenCalledWith(getSearchMovieStart())
      expect(mockDispatch).toHaveBeenCalledWith(getSearchMovieFailure(errorMessage))
    })

    it('should search with correct query string', async () => {
      const mockDispatch = jest.fn()
      const searchText = 'Barbie'
      ;(moviesApi.getSearchMovie as jest.Mock).mockResolvedValue([])

      await fetchSearchMovie(searchText)(mockDispatch, jest.fn(), undefined)

      expect(moviesApi.getSearchMovie).toHaveBeenCalledWith(searchText)
    })
  })
})
