import { Redis, RedisConfigNodejs } from '@upstash/redis'

const redisConfig: RedisConfigNodejs = {
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
}

const redis = new Redis(redisConfig)

export const MAX_AGE = `300` // 5 minutes
export const EXPIRY_MS = `PX` // milliseconds

export default redis
