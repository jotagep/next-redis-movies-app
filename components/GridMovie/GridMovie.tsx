import React from 'react'
import Link from 'next/link'

import CardMovie from '@/components/CardMovie'
import Container from '@/components/Container/Container'

import { Movie } from '@/types/movies'

import Spinner from '../Spinner/Spinner'

type Props = {
  movies: Movie[] | undefined
  title?: string
  className?: string
}

export default function GridMovie({ movies, title = '', className = '' }: Props) {
  return (
    <Container className={className}>
      {title && <h3 className="mb-4 text-lg uppercase">{title}</h3>}
      {!movies ? (
        <div className="flex h-32 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <ul className="grid grid-cols-4 gap-4">
          {movies.map((item, i) => (
            <li className="mb-6" key={i}>
              <div>
                <CardMovie movie={item} />
                <Link href={`/movies/${item.id}`} className="mt-2 flex justify-center text-center">
                  {item.title}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Container>
  )
}
