import React from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { useAppDispatch } from '@/store/store'

import SearchIcon from '../SearchIcon'
import {
  fetchSearchMovie,
  setEmptyMovies,
  setFocused
} from '../searchMoviesSlice'

import style from './style.module.scss'

export default function SearchBar() {
  const dispatch = useAppDispatch()

  const handleOnChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value
      if (text.length > 1) {
        dispatch(fetchSearchMovie(text))
      } else {
        dispatch(setEmptyMovies())
      }
    },
    200
  )

  const handleOnFocus = () => {
    dispatch(setFocused(true))
  }
  const handleOnBlur = (e: any) => {
    e.preventDefault()
    dispatch(setFocused(false))
  }

  return (
    <div className={style.search}>
      <div className={style.icon}>
        <SearchIcon />
      </div>
      <div className="flex-1">
        <input
          className="w-full py-2 pl-10 bg-transparent"
          type="text"
          placeholder="Search a movie..."
          onFocus={handleOnFocus}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
      </div>
    </div>
  )
}
