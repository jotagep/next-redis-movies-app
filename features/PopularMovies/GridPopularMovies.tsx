import React from 'react'
import { useSelector } from 'react-redux'

import GridMovie from '@/components/GridMovie'

import type { RootState } from '@/store/rootReducer'

export default function GridPopularMovies() {
  const movies = useSelector(
    (state: RootState) => state.popularMovies.movies,
    (prev, next) => prev.length === next.length
  )
  const [_, ...restMovies] = movies

  return (
    <section className="-mt-20 relative">
      <GridMovie movies={restMovies} title="Popular Movies" />
    </section>
  )
}
