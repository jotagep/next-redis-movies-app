import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getImage } from '@/lib/moviesApi'

import RatingBox from '@/components/RatingBox'
import FavoriteBox from '@/features/FavoriteMovies/FavoriteBox'
import Spinner from '@/components/Spinner'
import type { Movie } from '@/types/movies'

import style from './style.module.scss'

type Props = {
  movie: Movie
}

export default function CardMovie({ movie }: Props) {
  // Skeleton card
  if (!movie) return <Spinner />

  return (
    <Link href={`/movies/${movie.id}`} className={style.card}>
      <RatingBox className={style.rating} rate={movie.vote_average} />
      <FavoriteBox movie={movie} className={style.favorite} />
      {movie.backdrop_path ? (
        <Image
          fill={true}
          sizes="(max-width: 768px) 100vw, 25vw"
          src={getImage(movie.backdrop_path, 'w500')}
          alt={movie.title}
          className={style.image}
        />
      ) : (
        <Image
          fill={true}
          sizes="(max-width: 768px) 100vw, 25vw"
          src={getImage(movie.poster_path, 'w500')}
          alt={movie.title}
          className={style.image}
        />
      )}
    </Link>
  )
}
