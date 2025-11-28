import React from 'react'
import { useSelector } from 'react-redux'

import ButtonLink from '@/components/ButtonLink/ButtonLink'
import HeroMovie from '@/components/HeroMovie'
import Spinner from '@/components/Spinner/Spinner'

import FavoriteBox from '@/features/FavoriteMovies/FavoriteBox'

import type { RootState } from '@/store/rootReducer'

export default function HeroPopularMovie() {
  const movie = useSelector(
    (state: RootState) => state.popularMovies.movies[0],
    (last, next) => last?.id === next?.id
  )

  if (!movie)
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    )

  return (
    <section>
      <HeroMovie classContainer="w-1/2" movie={movie}>
        <span className="mr-4 text-xl">Most popular at the moment</span>
        <h2 className="font-lead text-title">{movie.title}</h2>
        <p className="mb-6">{movie.overview}</p>
        <div className="flex items-center">
          <ButtonLink to={`/movies/${movie.id}`}>See More</ButtonLink>
          <FavoriteBox
            className="ml-2 h-10 w-10 rounded border border-white p-2 transition-colors hover:cursor-pointer hover:border-netflix hover:bg-netflix"
            movie={movie}
          />
        </div>
      </HeroMovie>
    </section>
  )
}
