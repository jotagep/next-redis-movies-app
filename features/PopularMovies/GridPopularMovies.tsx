import React from 'react'
import { useSelector } from 'react-redux'

import GridMovie from '@/components/GridMovie/GridMovie'

import type { RootState } from '@/store/rootReducer'

type GridPopularMoviesProps = {
  classname?: string
}

export default function GridPopularMovies({ classname = '' }: GridPopularMoviesProps) {
  const movies = useSelector(
    (state: RootState) => state.popularMovies.movies,
    (prev, next) => prev.length === next.length
  )
  const [_, ...restMovies] = movies

  return (
    <section className={`relative ${classname}`}>
      <GridMovie movies={restMovies} title="Popular Movies" />
    </section>
  )
}
