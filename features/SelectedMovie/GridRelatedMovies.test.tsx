import React from 'react'
import { render, screen } from '@testing-library/react'

import { mockMoviesList } from '@/mocks/movies'

import GridRelatedMovies from './GridRelatedMovies'

jest.mock('@/components/GridMovie/GridMovie', () => {
  return function GridMovie({ movies, title }: any) {
    return (
      <div data-testid="grid-movie">
        <h2>{title}</h2>
        <div>Movies count: {movies.length}</div>
      </div>
    )
  }
})

describe('GridRelatedMovies', () => {
  it('should render GridMovie with recommended movies', () => {
    render(<GridRelatedMovies movies={mockMoviesList} />)

    expect(screen.getByTestId('grid-movie')).toBeInTheDocument()
    expect(screen.getByText('Recommmended Movies')).toBeInTheDocument()
  })

  it('should render only first 4 movies', () => {
    render(<GridRelatedMovies movies={mockMoviesList} />)

    expect(screen.getByText('Movies count: 4')).toBeInTheDocument()
  })

  it('should render null when movies array is empty', () => {
    const { container } = render(<GridRelatedMovies movies={[]} />)

    expect(container.firstChild).toBeNull()
  })

  it('should render movies when less than 4', () => {
    const twoMovies = mockMoviesList.slice(0, 2)
    render(<GridRelatedMovies movies={twoMovies} />)

    expect(screen.getByTestId('grid-movie')).toBeInTheDocument()
    expect(screen.getByText('Movies count: 2')).toBeInTheDocument()
  })

  it('should have correct section classes', () => {
    const { container } = render(<GridRelatedMovies movies={mockMoviesList} />)

    const section = container.querySelector('section')
    expect(section).toHaveClass('relative')
  })

  it('should slice movies array correctly', () => {
    const manyMovies = [...mockMoviesList, ...mockMoviesList]
    render(<GridRelatedMovies movies={manyMovies} />)

    expect(screen.getByText('Movies count: 4')).toBeInTheDocument()
  })

  it('should render with exactly 4 movies', () => {
    const fourMovies = mockMoviesList.slice(0, 4)
    render(<GridRelatedMovies movies={fourMovies} />)

    expect(screen.getByTestId('grid-movie')).toBeInTheDocument()
    expect(screen.getByText('Movies count: 4')).toBeInTheDocument()
  })
})
