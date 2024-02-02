import React from 'react'

import HeroPopularMovie from './HeroPopularMovie'
import GridPopularMovies from './GridPopularMovies'
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
