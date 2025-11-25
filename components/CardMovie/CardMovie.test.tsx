import React from 'react'
import { render, screen } from '@testing-library/react'

import CardMovie from '@/components/CardMovie'

import { Movie } from '@/types/movies'

// Mock the moviesApi module
jest.mock('@/lib/moviesApi', () => ({
  moviesApi: {
    getImage: jest.fn(
      (path, size) => `https://image.tmdb.org/t/p/${size}${path}`
    )
  }
}))

// Mock the MovieImage component
jest.mock('@/components/MovieImage', () => {
  return function MockMovieImage({ src, alt, className }: any) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        data-testid="movie-image"
      />
    )
  }
})

// Mock the RatingBox component
jest.mock('@/components/RatingBox', () => {
  return function MockRatingBox({ rate, className }: any) {
    return (
      <div data-testid="rating-box" className={className}>
        {rate}
      </div>
    )
  }
})

// Mock the FavoriteBox component
jest.mock('@/features/FavoriteMovies/FavoriteBox', () => {
  return function MockFavoriteBox({ movie, className }: any) {
    return (
      <div data-testid="favorite-box" className={className}>
        {movie.title}
      </div>
    )
  }
})

// Mock the Spinner component
jest.mock('@/components/Spinner', () => {
  return function MockSpinner() {
    return <div data-testid="spinner">Loading...</div>
  }
})

const mockMovie: Movie = {
  id: 123,
  title: 'Test Movie',
  backdrop_path: '/test-backdrop.jpg',
  poster_path: '/test-poster.jpg',
  vote_average: 8.5,
  overview: 'Test movie overview',
  original_name: 'Test Movie'
}

describe('CardMovie', () => {
  it('renders spinner when movie is null', () => {
    render(<CardMovie movie={null as any} />)

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('renders movie card with backdrop image', () => {
    render(<CardMovie movie={mockMovie} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/movies/123')

    const image = screen.getByTestId('movie-image')
    expect(image).toHaveAttribute('alt', 'Test Movie')
    expect(image).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w500/test-backdrop.jpg'
    )
  })

  it('renders movie card with poster image when no backdrop', () => {
    const movieWithoutBackdrop = { ...mockMovie, backdrop_path: '' }
    render(<CardMovie movie={movieWithoutBackdrop} />)

    const image = screen.getByTestId('movie-image')
    expect(image).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w500/test-poster.jpg'
    )
  })

  it('renders rating box with correct rate', () => {
    render(<CardMovie movie={mockMovie} />)

    const ratingBox = screen.getByTestId('rating-box')
    expect(ratingBox).toHaveTextContent('8.5')
  })

  it('renders favorite box', () => {
    render(<CardMovie movie={mockMovie} />)

    const favoriteBox = screen.getByTestId('favorite-box')
    expect(favoriteBox).toHaveTextContent('Test Movie')
  })

  it('applies correct CSS classes', () => {
    render(<CardMovie movie={mockMovie} />)

    const link = screen.getByRole('link')
    expect(link).toHaveClass('card')

    const ratingBox = screen.getByTestId('rating-box')
    expect(ratingBox).toHaveClass('rating')

    const favoriteBox = screen.getByTestId('favorite-box')
    expect(favoriteBox).toHaveClass('favorite')

    const image = screen.getByTestId('movie-image')
    expect(image).toHaveClass('image')
  })
})
