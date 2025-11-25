import React from 'react'

import Container from '@/components/Container/Container'
import MovieImage from '@/components/MovieImage/MovieImage'
import Spinner from '@/components/Spinner/Spinner'

import { moviesApi } from '@/lib/moviesApi'

import { Movie } from '@/types/movies'

import style from './style.module.scss'

type Props = {
  movie: Movie
  children: React.ReactNode
  classContainer?: string
}

export default function HeroMovie({
  movie,
  children,
  classContainer = ''
}: Props) {
  if (!movie) {
    return <Spinner />
  }

  return (
    <div className={`${style.hero} pt-24 flex items-center h-screen relative`}>
      <MovieImage
        fill={true}
        sizes="100vw"
        src={moviesApi.getImage(movie.backdrop_path, 'original')}
        alt={`Background from ${movie.title}`}
        className={style.image}
      />
      <Container className={`z-10 ${classContainer}`}>{children}</Container>
    </div>
  )
}
