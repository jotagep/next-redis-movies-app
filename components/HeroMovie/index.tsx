import React from 'react'
import Image from 'next/image'
import { getImage } from '@/lib/moviesApi'

import Container from '@/components/Container'
import Spinner from '@/components/Spinner'
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
  classContainer = '',
}: Props) {
  if (!movie) {
    return <Spinner />
  }

  return (
    <div className={`${style.hero} pt-24 flex items-center h-screen relative`}>
      <Image
        fill={true}
        sizes="100vw"
        src={getImage(movie.backdrop_path, 'original')}
        alt={`Background from ${movie.title}`}
        className={style.image}
      />
      <Container className={`z-10 ${classContainer}`}>{children}</Container>
    </div>
  )
}
