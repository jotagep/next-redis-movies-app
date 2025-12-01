import React from 'react'

import GridMovie from '@/components/GridMovie/GridMovie'

import { Movie } from '@/types/movies'

type Props = {
  classname?: string
  movies: Movie[]
}

export default function GridRelatedMovies({ classname = '', movies }: Props) {
  const recommendedMovies = movies.slice(0, 4)

  if (!recommendedMovies.length) return null

  return (
    <section className={`relative ${classname}`}>
      <GridMovie movies={recommendedMovies} title="Recommmended Movies" />
    </section>
  )
}
