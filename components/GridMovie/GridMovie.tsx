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

export default function GridMovie({
  movies,
  title = '',
  className = ''
}: Props) {
  return (
    <Container className={className}>
      {title && <h3 className="text-lg uppercase mb-4">{title}</h3>}
      {!movies ? (
        <div className="flex justify-center items-center h-32">
          <Spinner />
        </div>
      ) : (
        <ul className="grid grid-cols-4 gap-4">
          {movies.map((item, i) => (
            <li className="mb-6" key={i}>
              <div>
                <CardMovie movie={item} />
                <Link
                  href={`/movies/${item.id}`}
                  className="flex justify-center text-center mt-2"
                >
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
