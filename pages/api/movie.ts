import type { NextApiRequest, NextApiResponse } from 'next'
import type { MovieInfo } from '@/types/movies'

import { getCastMovie, getDetailMovie, getRelatedMovies } from '@/lib/moviesApi'
import redis, { validateRedisConnection } from '@/lib/redis'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MovieInfo | void>
) {
  const { id } = req.query as { id: string }
  const idNumber = parseInt(id)

  if (!id || isNaN(idNumber)) {
    res.status(400).json()
  }

  let cachedMovie: MovieInfo | null = null
  try {
    const isValid = await validateRedisConnection()
    if (!isValid) {
      throw new Error('Redis connection failed')
    }
    cachedMovie = await redis.get<MovieInfo>(id)
  } catch (error) {
    console.log('Error getting cached movie.', (error as Error).message)
  }

  if (cachedMovie) {
    return res.status(200).json(cachedMovie)
  }

  const [movie, cast, related] = await Promise.all([
    getDetailMovie(idNumber),
    getCastMovie(idNumber),
    getRelatedMovies(idNumber),
  ])
  const movieInfo: MovieInfo = {
    ...movie,
    cast: cast,
    related_movies: related.slice(0, 4),
  }

  redis.set(id, movieInfo, { ex: 60 * 60 * 24 })
  res.status(200).json(movieInfo)
}
