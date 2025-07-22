import React from 'react'
import Link from 'next/link'

import Container from '@/components/Container'
import CardMovie from '@/components/CardMovie'
import { Movie } from '@/types/movies'

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
  if (!movies) {
    return <span>Loading...</span>
  }

  return (
    <Container className={className}>
      {title && <h3 className="text-lg uppercase mb-4">{title}</h3>}
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
    </Container>
  )
}
