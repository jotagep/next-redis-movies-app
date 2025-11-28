import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import Spinner from '@/components/Spinner/Spinner'

import { RootState } from '@/store/rootReducer'
import { useAppDispatch } from '@/store/store'

import GridRelatedMovies from './GridRelatedMovies'
import HeroDetail from './HeroDetail'
import { fetchDetailMovie } from './selectedMoviesSlice'

export default function SelectedMoviePage({ id }: { id: string }) {
  const { movies, isLoading } = useSelector((state: RootState) => state.selectedMovie)

  const dispatch = useAppDispatch()

  const movieInfo = movies[parseInt(id)]

  useEffect(() => {
    if (!movieInfo) {
      dispatch(fetchDetailMovie(parseInt(id)))
    }
  }, [movieInfo, id, dispatch])

  if (!movieInfo || isLoading)
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    )

  return (
    <div>
      <HeroDetail movie={movieInfo} />
      <GridRelatedMovies movies={movieInfo && movieInfo.related_movies} />
    </div>
  )
}
