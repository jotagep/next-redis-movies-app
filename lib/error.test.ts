import { ApiError, NetworkError, ValidationError } from './error'

describe('Error Classes', () => {
  describe('ApiError', () => {
    it('should create an instance with correct properties', () => {
      const error = new ApiError(404, 'Not Found', {
        message: 'Resource not found'
      })
      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(ApiError)
      expect(error.name).toBe('ApiError')
      expect(error.status).toBe(404)
      expect(error.statusText).toBe('Not Found')
      expect(error.data).toEqual({ message: 'Resource not found' })
      expect(error.message).toBe('API Error: 404 Not Found')
    })
  })

  describe('NetworkError', () => {
    it('should create an instance with correct properties', () => {
      const originalError = new Error('Connection timeout')
      const error = new NetworkError('Failed to fetch', originalError)

      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(NetworkError)
      expect(error.name).toBe('NetworkError')
      expect(error.message).toBe('Failed to fetch')
      expect(error.originalError).toBe(originalError)
    })
  })

  describe('ValidationError', () => {
    it('should create an instance with correct properties', () => {
      const error = new ValidationError('Invalid email format', 'email')

      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(ValidationError)
      expect(error.name).toBe('ValidationError')
      expect(error.message).toBe('Invalid email format')
      expect(error.field).toBe('email')
    })
  })
})
