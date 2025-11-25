import React, { useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

import Container from '@/components/Container/Container'
import GridMovie from '@/components/GridMovie/GridMovie'

import type { RootState } from '@/store/rootReducer'

export default function FavoriteMoviesPage() {
  const [isClient, setIsClient] = useState(false)
  const movies = useSelector(
    (state: RootState) => state.favoriteMovies.movies,
    shallowEqual
  )

  useEffect(() => {
    setIsClient(true)
  }, [])

  const arrayMovies = Object.values(movies)

  return (
    <section className="pt-24">
      <Container>
        <h1 className="text-2xl mb-8">Favorite Movies</h1>
      </Container>
      {arrayMovies.length < 1 || !isClient ? (
        <Container>
          <div className="flex items-center justify-center py-20 rounded-lg border border-gray-800">
            <span className="text-lg">You have not favorite movies yet</span>
          </div>
        </Container>
      ) : (
        <GridMovie movies={arrayMovies} />
      )}
    </section>
  )
}
