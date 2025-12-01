import React from 'react'
import { render, screen } from '@testing-library/react'

import { mockMovieInfo } from '@/mocks/movies'

import HeroDetail from './index'

jest.mock('@/components/HeroMovie', () => {
  return function HeroMovie({ movie, children, classContainer }: any) {
    return (
      <div data-testid="hero-movie" className={classContainer}>
        <div data-testid="hero-movie-title">{movie.title}</div>
        {children}
      </div>
    )
  }
})

jest.mock('@/components/MovieImage/MovieImage', () => {
  return function MovieImage({ src, alt, className }: any) {
    return <img src={src} alt={alt} className={className} data-testid="movie-image" />
  }
})

jest.mock('@/features/FavoriteMovies/FavoriteBox', () => {
  return function FavoriteBox({ movie, className }: any) {
    return (
      <div data-testid="favorite-box" className={className}>
        Favorite {movie.id}
      </div>
    )
  }
})

jest.mock('@/lib/moviesApi', () => ({
  moviesApi: {
    getImage: jest.fn((path, size) => `https://image.tmdb.org/t/p/${size}${path}`)
  }
}))

jest.mock('@/utils/currency', () => ({
  getBudget: jest.fn((budget) => `$${budget.toLocaleString()}`)
}))

describe('HeroDetail', () => {
  it('should render HeroMovie component', () => {
    render(<HeroDetail movie={mockMovieInfo} />)

    expect(screen.getByTestId('hero-movie')).toBeInTheDocument()
  })

  it('should render movie title', () => {
    render(<HeroDetail movie={mockMovieInfo} />)

    expect(screen.getByRole('heading', { name: 'Oppenheimer' })).toBeInTheDocument()
  })

  it('should render release date', () => {
    render(<HeroDetail movie={mockMovieInfo} />)

    expect(screen.getByText('2023-07-19')).toBeInTheDocument()
  })

  it('should render genres', () => {
    render(<HeroDetail movie={mockMovieInfo} />)

    expect(screen.getByText('Drama')).toBeInTheDocument()
    expect(screen.getByText('History')).toBeInTheDocument()
  })

  it('should render overview', () => {
    render(<HeroDetail movie={mockMovieInfo} />)

    expect(screen.getByText(mockMovieInfo.overview)).toBeInTheDocument()
  })

  it('should render runtime', () => {
    render(<HeroDetail movie={mockMovieInfo} />)

    expect(screen.getByText(/Duration:/)).toBeInTheDocument()
    expect(screen.getByText(/180min/)).toBeInTheDocument()
  })

  it('should render budget', () => {
    render(<HeroDetail movie={mockMovieInfo} />)

    expect(screen.getByText(/Budget:/)).toBeInTheDocument()
  })

  it('should render poster image', () => {
    render(<HeroDetail movie={mockMovieInfo} />)

    const image = screen.getByTestId('movie-image')
    expect(image).toHaveAttribute('alt', 'Poster of Oppenheimer')
  })

  it('should render cast members', () => {
    render(<HeroDetail movie={mockMovieInfo} />)

    expect(screen.getByText('Cillian Murphy')).toBeInTheDocument()
    expect(screen.getByText('J. Robert Oppenheimer')).toBeInTheDocument()
  })

  it('should render only first 6 cast members', () => {
    const movieWithManyCast = {
      ...mockMovieInfo,
      cast: [
        ...mockMovieInfo.cast,
        { name: 'Actor 7', character: 'Character 7' },
        { name: 'Actor 8', character: 'Character 8' }
      ]
    }
    render(<HeroDetail movie={movieWithManyCast} />)

    expect(screen.getByText('Josh Hartnett')).toBeInTheDocument()
    expect(screen.queryByText('Actor 7')).not.toBeInTheDocument()
  })

  it('should render FavoriteBox component', () => {
    render(<HeroDetail movie={mockMovieInfo} />)

    expect(screen.getByTestId('favorite-box')).toBeInTheDocument()
    expect(screen.getByText('Favorite 872585')).toBeInTheDocument()
  })

  it('should have section wrapper', () => {
    const { container } = render(<HeroDetail movie={mockMovieInfo} />)

    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('should render cast section title', () => {
    render(<HeroDetail movie={mockMovieInfo} />)

    expect(screen.getByText('Cast:')).toBeInTheDocument()
  })

  it('should render all genres', () => {
    render(<HeroDetail movie={mockMovieInfo} />)

    const genreElements = screen.getAllByRole('listitem')
    const genreItems = genreElements.filter((el) => el.textContent === 'Drama' || el.textContent === 'History')
    expect(genreItems.length).toBeGreaterThanOrEqual(2)
  })
})
