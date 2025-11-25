import React from 'react'
import { render, screen } from '@testing-library/react'

import GridMovie from '@/components/GridMovie/GridMovie'

import { Movie } from '@/types/movies'

// Mock the CardMovie component
jest.mock('@/components/CardMovie', () => {
  return function MockCardMovie({ movie }: { movie: Movie }) {
    return <div data-testid="card-movie">{movie.title}</div>
  }
})

// Mock the Container component
jest.mock('@/components/Container/Container', () => {
  return function MockContainer({ children, className }: any) {
    return (
      <div data-testid="container" className={className}>
        {children}
      </div>
    )
  }
})

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Movie 1',
    backdrop_path: '/backdrop1.jpg',
    poster_path: '/poster1.jpg',
    vote_average: 8.5,
    overview: 'Overview 1',
    original_name: 'Movie 1'
  },
  {
    id: 2,
    title: 'Movie 2',
    backdrop_path: '/backdrop2.jpg',
    poster_path: '/poster2.jpg',
    vote_average: 7.2,
    overview: 'Overview 2',
    original_name: 'Movie 2'
  }
]

describe('GridMovie', () => {
  it('renders spinner when movies is undefined', () => {
    render(<GridMovie movies={undefined} />)

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('renders movies grid without title', () => {
    render(<GridMovie movies={mockMovies} />)

    expect(screen.getByTestId('container')).toBeInTheDocument()
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument()

    const cardMovies = screen.getAllByTestId('card-movie')
    expect(cardMovies).toHaveLength(2)
    expect(cardMovies[0]).toHaveTextContent('Movie 1')
    expect(cardMovies[1]).toHaveTextContent('Movie 2')
  })

  it('renders movies grid with title', () => {
    render(<GridMovie movies={mockMovies} title="Test Title" />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Title')).toHaveClass(
      'text-lg',
      'uppercase',
      'mb-4'
    )
  })

  it('applies custom className to container', () => {
    render(<GridMovie movies={mockMovies} className="custom-class" />)

    const container = screen.getByTestId('container')
    expect(container).toHaveClass('custom-class')
  })

  it('renders movie links with correct hrefs', () => {
    render(<GridMovie movies={mockMovies} />)

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
    expect(links[0]).toHaveAttribute('href', '/movies/1')
    expect(links[1]).toHaveAttribute('href', '/movies/2')
  })

  it('renders empty grid when movies array is empty', () => {
    render(<GridMovie movies={[]} />)

    expect(screen.getByTestId('container')).toBeInTheDocument()
    expect(screen.queryByTestId('card-movie')).not.toBeInTheDocument()
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
  })
})
