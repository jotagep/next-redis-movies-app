import { ApiError, NetworkError, ValidationError } from './error'
import { moviesApi } from './moviesApi'

// Mock global fetch
global.fetch = jest.fn()

describe('MoviesService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getImage', () => {
    it('should return full image URL with default size', () => {
      const url = moviesApi.getImage('/poster.jpg')
      expect(url).toBe('https://image.tmdb.org/t/p/w500/poster.jpg')
    })

    it('should return full image URL with original size', () => {
      const url = moviesApi.getImage('/poster.jpg', 'original')
      expect(url).toBe('https://image.tmdb.org/t/p/original/poster.jpg')
    })

    it('should return default image if url is empty', () => {
      const url = moviesApi.getImage('')
      expect(url).toBe('/no-image.svg')
    })
  })

  describe('getPopularMovies', () => {
    it('should fetch popular movies successfully', async () => {
      const mockData = {
        results: [
          { id: 1, title: 'Movie 1' },
          { id: 2, title: 'Movie 2' }
        ]
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      })

      const result = await moviesApi.getPopularMovies(1)

      expect(result).toEqual(mockData.results)
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/movie/popular'),
        undefined
      )
    })
  })

  describe('getDetailMovie', () => {
    it('should fetch movie details successfully', async () => {
      const mockData = {
        id: 1,
        title: 'Movie 1',
        overview: 'Great movie'
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      })

      const result = await moviesApi.getDetailMovie(1)

      expect(result).toEqual(mockData)
    })

    it('should throw ValidationError if id is invalid', async () => {
      await expect(moviesApi.getDetailMovie(0)).rejects.toThrow(ValidationError)
      await expect(moviesApi.getDetailMovie(-1)).rejects.toThrow(
        ValidationError
      )
    })
  })

  describe('getRelatedMovies', () => {
    it('should fetch related movies successfully', async () => {
      const mockData = {
        results: [
          { id: 2, title: 'Related Movie 1' },
          { id: 3, title: 'Related Movie 2' }
        ]
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      })

      const result = await moviesApi.getRelatedMovies(1)

      expect(result).toEqual(mockData.results)
    })

    it('should throw ValidationError if id is invalid', async () => {
      await expect(moviesApi.getRelatedMovies(0)).rejects.toThrow(
        ValidationError
      )
    })
  })

  describe('getCastMovie', () => {
    it('should fetch cast successfully', async () => {
      const mockData = {
        cast: [
          { id: 1, name: 'Actor 1', character: 'Character 1' },
          { id: 2, name: 'Actor 2', character: 'Character 2' }
        ]
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      })

      const result = await moviesApi.getCastMovie(1)

      expect(result).toEqual(mockData.cast)
    })

    it('should throw ValidationError if id is invalid', async () => {
      await expect(moviesApi.getCastMovie(0)).rejects.toThrow(ValidationError)
    })
  })

  describe('getSearchMovie', () => {
    it('should search movies successfully', async () => {
      const mockData = {
        results: [
          { id: 1, title: 'Search Result 1' },
          { id: 2, title: 'Search Result 2' }
        ]
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      })

      const result = await moviesApi.getSearchMovie('test')

      expect(result).toEqual(mockData.results)
    })

    it('should throw ValidationError if search text is empty', async () => {
      await expect(moviesApi.getSearchMovie('')).rejects.toThrow(
        ValidationError
      )
      await expect(moviesApi.getSearchMovie('   ')).rejects.toThrow(
        ValidationError
      )
    })
  })

  describe('error handling', () => {
    it('should throw ApiError when API responds with error', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({ status_message: 'Resource not found' })
      })

      await expect(moviesApi.getPopularMovies(1)).rejects.toThrow(ApiError)
    })

    it('should throw NetworkError when fetch fails', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network failure')
      )

      await expect(moviesApi.getPopularMovies(1)).rejects.toThrow(NetworkError)
    })

    it('should throw ApiError with null data when response json parsing fails', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: async () => {
          throw new Error('Invalid JSON')
        }
      })

      try {
        await moviesApi.getPopularMovies(1)
      } catch (error: any) {
        expect(error).toBeInstanceOf(ApiError)
        expect(error.status).toBe(400)
        expect(error.data).toBeNull()
      }
    })
  })
})
