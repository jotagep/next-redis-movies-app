import { verflixApi } from '@/lib/api'

import selectedMoviesReducer, {
  fetchDetailMovie,
  getSelectedMovieFailure,
  getSelectedMovieStart,
  getSelectedMovieSuccess
} from './selectedMoviesSlice'

import { mockMovieInfo } from '@/mocks/movies'

jest.mock('@/lib/api', () => ({
  verflixApi: {
    getMovieInfo: jest.fn()
  }
}))

describe('selectedMoviesSlice', () => {
  describe('reducers', () => {
    it('should handle initial state', () => {
      expect(selectedMoviesReducer(undefined, { type: 'unknown' })).toEqual({
        movies: {},
        isLoading: false,
        error: null
      })
    })

    it('should handle getSelectedMovieStart', () => {
      const actual = selectedMoviesReducer(undefined, getSelectedMovieStart())
      expect(actual.isLoading).toBe(true)
    })

    it('should handle getSelectedMovieSuccess', () => {
      const actual = selectedMoviesReducer(undefined, getSelectedMovieSuccess(mockMovieInfo))
      expect(actual.isLoading).toBe(false)
      expect(actual.movies[872585]).toEqual(mockMovieInfo)
      expect(actual.error).toBe(null)
    })

    it('should handle getSelectedMovieFailure', () => {
      const actual = selectedMoviesReducer(undefined, getSelectedMovieFailure('Error message'))
      expect(actual.isLoading).toBe(false)
      expect(actual.error).toBe('Error message')
    })

    it('should add movie to existing movies', () => {
      const initialState = {
        movies: { 123: mockMovieInfo },
        isLoading: false,
        error: null
      }
      const newMovie = { ...mockMovieInfo, id: 456 }
      const actual = selectedMoviesReducer(initialState, getSelectedMovieSuccess(newMovie))

      expect(actual.movies[123]).toEqual(mockMovieInfo)
      expect(actual.movies[456]).toEqual(newMovie)
    })

    it('should update existing movie', () => {
      const initialState = {
        movies: { 872585: mockMovieInfo },
        isLoading: false,
        error: null
      }
      const updatedMovie = { ...mockMovieInfo, title: 'Updated Title' }
      const actual = selectedMoviesReducer(initialState, getSelectedMovieSuccess(updatedMovie))

      expect(actual.movies[872585].title).toBe('Updated Title')
    })

    it('should preserve other movies when adding new one', () => {
      const movie1 = { ...mockMovieInfo, id: 1 }
      const movie2 = { ...mockMovieInfo, id: 2 }
      const movie3 = { ...mockMovieInfo, id: 3 }

      const initialState = {
        movies: { 1: movie1, 2: movie2 },
        isLoading: false,
        error: null
      }

      const actual = selectedMoviesReducer(initialState, getSelectedMovieSuccess(movie3))

      expect(Object.keys(actual.movies)).toHaveLength(3)
      expect(actual.movies[1]).toEqual(movie1)
      expect(actual.movies[2]).toEqual(movie2)
      expect(actual.movies[3]).toEqual(movie3)
    })
  })

  describe('async thunk', () => {
    it('should fetch movie detail successfully', async () => {
      const mockDispatch = jest.fn()
      ;(verflixApi.getMovieInfo as jest.Mock).mockResolvedValue(mockMovieInfo)

      await fetchDetailMovie(872585)(mockDispatch, jest.fn(), undefined)

      expect(mockDispatch).toHaveBeenCalledWith(getSelectedMovieStart())
      expect(verflixApi.getMovieInfo).toHaveBeenCalledWith(872585)
      expect(mockDispatch).toHaveBeenCalledWith(getSelectedMovieSuccess(mockMovieInfo))
    })

    it('should handle fetch error', async () => {
      const mockDispatch = jest.fn()
      const errorMessage = 'Failed to fetch movie'
      ;(verflixApi.getMovieInfo as jest.Mock).mockRejectedValue(new Error(errorMessage))

      await fetchDetailMovie(872585)(mockDispatch, jest.fn(), undefined)

      expect(mockDispatch).toHaveBeenCalledWith(getSelectedMovieStart())
      expect(mockDispatch).toHaveBeenCalledWith(getSelectedMovieFailure(errorMessage))
    })

    it('should fetch with correct movie id', async () => {
      const mockDispatch = jest.fn()
      const movieId = 123456
      ;(verflixApi.getMovieInfo as jest.Mock).mockResolvedValue(mockMovieInfo)

      await fetchDetailMovie(movieId)(mockDispatch, jest.fn(), undefined)

      expect(verflixApi.getMovieInfo).toHaveBeenCalledWith(movieId)
    })
  })
})
