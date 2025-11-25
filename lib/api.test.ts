import { verflixApi } from './api'
import { NetworkError, ValidationError } from './error'

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
  })
})
