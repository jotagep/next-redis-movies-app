import React from 'react'

import GridMovie from '@/components/GridMovie'
import { Movie } from '@/types/movies'

type Props = {
  movies: Movie[]
}

export default function GridRelatedMovies({ movies }: Props) {
  const recommendedMovies = movies.slice(0, 4)

  if (!recommendedMovies.length) return null

  return (
    <section className="-mt-20 relative">
      <GridMovie movies={recommendedMovies} title="Recommmended Movies" />
    </section>
  )
}
