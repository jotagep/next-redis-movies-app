import React from 'react'

import HeroMovie from '@/components/HeroMovie'
import MovieImage from '@/components/MovieImage/MovieImage'

import FavoriteBox from '@/features/FavoriteMovies/FavoriteBox'

import { moviesApi } from '@/lib/moviesApi'

import { MovieInfo } from '@/types/movies'

import { getBudget } from '@/utils/currency'

import style from './style.module.scss'

type Props = {
  movie: MovieInfo
}

export default function HeroDetail({ movie }: Props) {
  return (
    <section>
      <HeroMovie classContainer="w-full -mt-32 relative" movie={movie}>
        <div className="flex rounded-lg bg-darkgray bg-opacity-75">
          <div className="relative flex-initial">
            <MovieImage
              className={style.poster}
              width={340}
              height={510}
              src={moviesApi.getImage(movie.poster_path, 'w500')}
              alt={`Poster of ${movie.original_name}`}
            />
          </div>
          <div className="flex-1 px-12 py-8">
            <span className="text-gray-400">{movie.release_date}</span>
            <h2 className="my-2 font-lead text-4xl">{movie.title}</h2>
            <ul className="mb-4 flex">
              {movie.genres.map((item, i) => (
                <li key={i} className="mr-2 rounded border border-white px-2 py-1">
                  {item.name}
                </li>
              ))}
            </ul>
            <p className="mb-4">{movie.overview}</p>
            <span className="mb-2 block">
              <b>Duration:</b> {movie.runtime}min
            </span>
            <span className="mb-2 block">
              <b>Budget:</b> {getBudget(movie.budget)}
            </span>
            <h4 className="mb-2 text-lg font-bold">Cast:</h4>
            <ul className="grid grid-cols-4 gap-2">
              {movie.cast?.slice(0, 6).map((item, i) => (
                <li className="" key={i}>
                  <span className="block">{item.character || '---'}</span>
                  <span className="text-gray-500">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <FavoriteBox movie={movie} className={style.favorite} />
      </HeroMovie>
    </section>
  )
}
