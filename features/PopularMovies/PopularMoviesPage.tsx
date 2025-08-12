import React from 'react'

import GridPopularMovies from './GridPopularMovies'
import HeroPopularMovie from './HeroPopularMovie'
import LoadMore from './LoadMore'

export default function PopularMoviesPage() {
  return (
    <div>
      <HeroPopularMovie />
      <GridPopularMovies />
      <LoadMore />
    </div>
  )
}
