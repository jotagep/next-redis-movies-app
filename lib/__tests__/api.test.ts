import { verflixApi } from '../api'
import { NetworkError, ValidationError } from '../error'

// Mock global fetch
global.fetch = jest.fn()

describe('VerflixApi', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getMovieInfo', () => {
    it('should fetch movie info successfully', async () => {
      const mockData = {
        id: 1,
        title: 'Test Movie',
        cast: [{ id: 1, name: 'Actor 1' }],
        related: [{ id: 2, title: 'Related Movie' }]
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      })

      const result = await verflixApi.getMovieInfo(1)

      expect(result).toEqual(mockData)
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/movie?id=1')
      )
    })

    it('should throw ValidationError if id is invalid', async () => {
      await expect(verflixApi.getMovieInfo(0)).rejects.toThrow(ValidationError)
      await expect(verflixApi.getMovieInfo(-1)).rejects.toThrow(ValidationError)
    })

    it('should throw NetworkError when fetch fails', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network failure')
      )

      await expect(verflixApi.getMovieInfo(1)).rejects.toThrow(NetworkError)
    })

    it('should throw NetworkError with original error', async () => {
      const originalError = new Error('Connection refused')
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(originalError)

      try {
        await verflixApi.getMovieInfo(1)
      } catch (error: any) {
        expect(error).toBeInstanceOf(NetworkError)
        expect(error.message).toBe('Failed to fetch movie info')
        expect(error.originalError).toBe(originalError)
      }
    })

    it('should use custom API URL if provided', async () => {
      const originalUrl = process.env.NEXT_PUBLIC_API_URL
      process.env.NEXT_PUBLIC_API_URL = 'https://custom-api.com'

      // Force re-import to use new env variable
      jest.resetModules()
      const { verflixApi: customApi } = require('../api')

      const mockData = { id: 1, title: 'Test' }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      })

      await customApi.getMovieInfo(1)

      expect(global.fetch).toHaveBeenCalledWith(
        'https://custom-api.com/movie?id=1'
      )

      // Restore original URL
      if (originalUrl) {
        process.env.NEXT_PUBLIC_API_URL = originalUrl
      } else {
        delete process.env.NEXT_PUBLIC_API_URL
      }
    })

    it('should use default /api path if NEXT_PUBLIC_API_URL is not set', async () => {
      const mockData = { id: 1, title: 'Test' }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      })

      await verflixApi.getMovieInfo(1)

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/movie?id=1')
      )
    })
  })
})
