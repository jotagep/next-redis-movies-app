import { validateRedisConnection } from './redis'

// Mock @upstash/redis
jest.mock('@upstash/redis', () => ({
  Redis: jest.fn().mockImplementation(() => ({
    ping: jest.fn()
  }))
}))

describe('Redis Module', () => {
  let originalEnv: NodeJS.ProcessEnv

  beforeEach(() => {
    originalEnv = { ...process.env }
    jest.clearAllMocks()
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('validateRedisConnection', () => {
    it('should return false if Redis is not activated', async () => {
      process.env.UPSTASH_REDIS_REST_URL = 'https://redis.url'
      process.env.UPSTASH_REDIS_REST_TOKEN = 'token'
      process.env.REDIS_CACHE_ACTIVATE = 'false'

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

      const result = await validateRedisConnection()

      expect(result).toBe(false)
      expect(consoleSpy).toHaveBeenCalledWith('Redis is not activated')

      consoleSpy.mockRestore()
    })

    it('should return true if Redis connection is successful', async () => {
      process.env.UPSTASH_REDIS_REST_URL = 'https://redis.url'
      process.env.UPSTASH_REDIS_REST_TOKEN = 'token'
      process.env.REDIS_CACHE_ACTIVATE = 'true'

      const { Redis } = require('@upstash/redis')
      const mockPing = jest.fn().mockResolvedValue('PONG')
      Redis.mockImplementation(() => ({
        ping: mockPing
      }))

      jest.resetModules()
      const { validateRedisConnection: validate } = require('./redis')

      const result = await validate()

      expect(result).toBe(true)
    })

    it('should return false and log error if Redis connection fails', async () => {
      process.env.UPSTASH_REDIS_REST_URL = 'https://redis.url'
      process.env.UPSTASH_REDIS_REST_TOKEN = 'token'
      process.env.REDIS_CACHE_ACTIVATE = 'true'

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

      // Re-import to get new Redis instance
      jest.resetModules()

      // Mock failed ping after resetModules
      jest.mock('@upstash/redis', () => ({
        Redis: jest.fn().mockImplementation(() => ({
          ping: jest.fn().mockRejectedValue(new Error('Connection failed'))
        }))
      }))

      const { validateRedisConnection: validate } = require('./redis')

      const result = await validate()

      expect(result).toBe(false)
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error conectando a Redis:', 'Connection failed')

      consoleErrorSpy.mockRestore()
    })
  })
})
