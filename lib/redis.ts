import { Redis, RedisConfigNodejs } from '@upstash/redis'

const redisConfig: RedisConfigNodejs = {
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string
}

const redis = new Redis(redisConfig)

const activateRedis = process.env.REDIS_CACHE_ACTIVATE === 'true'

export async function validateRedisConnection() {
  if (!redisConfig.url || !redisConfig.token || !activateRedis) {
    console.log('Redis is not activated')
    return false
  }

  try {
    await redis.ping()
    return true
  } catch (error) {
    console.error('Error conectando a Redis:', (error as Error).message)
    return false
  }
}

export const MAX_AGE = `300` // 5 minutes
export const EXPIRY_MS = `PX` // milliseconds

export default redis
