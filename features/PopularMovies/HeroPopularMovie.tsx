import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/rootReducer'

import HeroMovie from '@/components/HeroMovie'
import ButtonLink from '@/components/ButtonLink'
import Spinner from '@/components/Spinner'
import FavoriteBox from '@/features/FavoriteMovies/FavoriteBox'

export default function HeroPopularMovie() {
  const movie = useSelector(
    (state: RootState) => state.popularMovies.movies[0],
    (last, next) => last?.id === next?.id
  )

  if (!movie)
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <Spinner />
      </div>
    )

  return (
    <section>
      <HeroMovie classContainer="w-1/2" movie={movie}>
        <span className="mr-4 text-xl">Most popular at the moment</span>
        <h2 className="text-title font-lead">{movie.title}</h2>
        <p className="mb-6">{movie.overview}</p>
        <div className="flex items-center">
          <ButtonLink to={`/movies/${movie.id}`}>See More</ButtonLink>
          <FavoriteBox
            className="w-10 h-10 p-2 ml-2 rounded border border-white transition-colors 
            hover:border-netflix hover:bg-netflix hover:cursor-pointer"
            movie={movie}
          />
        </div>
      </HeroMovie>
    </section>
  )
}
