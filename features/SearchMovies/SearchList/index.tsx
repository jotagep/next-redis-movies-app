import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { shallowEqual, useSelector } from 'react-redux'
import type { RootState } from '@/store/rootReducer'

import style from './style.module.scss'
import RatingBox from '@/components/RatingBox'
import { getImage } from '@/lib/moviesApi'

export default function SearchList() {
  const { movies, isFocused } = useSelector(
    (state: RootState) => state.searchMovie,
    shallowEqual
  )

  const show = isFocused && movies.length > 0

  useEffect(() => {
    if (show) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'scroll'
    }
  }, [show])

  return (
    <div className={`${style.list} ${show ? 'block' : 'hidden'}`}>
      <ul className="text-darkgray">
        {movies.map((item, i) => (
          <li className="border-b border-gray-200 hover:bg-gray-200" key={i}>
            <Link
              href={`/movies/${item.id}`}
              className="flex justify-between items-center py-4 px-8"
            >
              <div className="flex items-center">
                <Image
                  width={32}
                  height={48}
                  className="h-12"
                  src={getImage(item.poster_path, 'w500')}
                  alt={`Poster ${item.title}`}
                />
                <span className="font-bold ml-8">{item.title}</span>
              </div>
              <RatingBox
                className="text-white w-10 h-10"
                rate={item.vote_average}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
