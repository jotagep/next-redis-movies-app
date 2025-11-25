import { ApiError, handleResponse } from '../error'

describe('ApiError', () => {
  it('should create an instance with correct properties', () => {
    const error = new ApiError(404, 'Not Found', {
      message: 'Resource not found'
    })
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(ApiError)
    expect(error.status).toBe(404)
    expect(error.statusText).toBe('Not Found')
    expect(error.data).toEqual({ message: 'Resource not found' })
    expect(error.message).toBe('API Error: 404 Not Found')
  })
})

describe('handleResponse', () => {
  it('should return json when response is ok', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ success: true })
    } as unknown as Response

    const result = await handleResponse(mockResponse)
    expect(result).toEqual({ success: true })
  })

  it('should throw ApiError when response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: jest.fn().mockResolvedValue({ error: 'Server exploded' })
    } as unknown as Response

    await expect(handleResponse(mockResponse)).rejects.toThrow(ApiError)

    try {
      await handleResponse(mockResponse)
    } catch (error: any) {
      expect(error).toBeInstanceOf(ApiError)
      expect(error.status).toBe(500)
      expect(error.statusText).toBe('Internal Server Error')
      expect(error.data).toEqual({ error: 'Server exploded' })
    }
  })

  it('should handle non-JSON error responses', async () => {
    const mockResponse = {
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      json: jest.fn().mockRejectedValue(new Error('Not JSON'))
    } as unknown as Response

    try {
      await handleResponse(mockResponse)
    } catch (error: any) {
      expect(error).toBeInstanceOf(ApiError)
      expect(error.status).toBe(400)
      expect(error.data).toBeNull()
    }
  })
})
