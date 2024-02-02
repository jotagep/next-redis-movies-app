import type { NextApiRequest, NextApiResponse } from 'next'
import type { MovieInfo } from '@/types/movies'

import { getCastMovie, getDetailMovie, getRelatedMovies } from '@/lib/moviesApi'
import redis from '@/lib/redis'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MovieInfo | void>
) {
  const { id } = req.query as { id: string }
  const idNumber = parseInt(id)

  if (!id || isNaN(idNumber)) {
    res.status(400).json()
  }
  const cachedMovie = await redis.get<MovieInfo>(id)

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
    related_movies: related,
  }

  redis.set(id, movieInfo)
  res.status(200).json(movieInfo)
}
