import React from 'react'
import Link from 'next/link'
import useScrollY from '@/hooks/useScrollY'

import Container from '@/components/Container'
import ButtonLink from '@/components/ButtonLink'
import SearchBar from '@/features/SearchMovies/SearchBar'

import style from './style.module.scss'

const TOPBAR_ANIMATION_HEIGHT = 150

export default function Topbar() {
  const scroll = useScrollY()

  const changeTopbar = scroll.y > TOPBAR_ANIMATION_HEIGHT

  return (
    <header
      className={`${style.header} ${changeTopbar ? style['header-full'] : ''}`}
    >
      <Container className="h-full">
        <nav className="h-full">
          <ul className="h-full flex items-center text-lg justify-between">
            <li>
              <Link href="/">
                <span className={style.title}>Redflix</span>
              </Link>
            </li>
            <li>
              <SearchBar />
            </li>
            <li>
              <ButtonLink to={'/favorites'}>Favorites</ButtonLink>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  )
}
