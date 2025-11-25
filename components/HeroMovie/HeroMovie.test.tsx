import React from 'react'
import { render, screen } from '@testing-library/react'

import HeroMovie from '@/components/HeroMovie'

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

// Mock the Container component
jest.mock('@/components/Container', () => {
  return function MockContainer({ children, className }: any) {
    return (
      <div data-testid="container" className={className}>
        {children}
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

describe('HeroMovie', () => {
  it('renders spinner when movie is null', () => {
    render(
      <HeroMovie movie={null as any}>
        <div>Test content</div>
      </HeroMovie>
    )

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('renders hero with movie backdrop image', () => {
    render(
      <HeroMovie movie={mockMovie}>
        <div>Test content</div>
      </HeroMovie>
    )

    const image = screen.getByTestId('movie-image')
    expect(image).toHaveAttribute('alt', 'Background from Test Movie')
    expect(image).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/original/test-backdrop.jpg'
    )
  })

  it('renders children content', () => {
    render(
      <HeroMovie movie={mockMovie}>
        <div data-testid="hero-content">Hero content</div>
      </HeroMovie>
    )

    expect(screen.getByTestId('hero-content')).toHaveTextContent('Hero content')
  })

  it('applies custom classContainer to container', () => {
    render(
      <HeroMovie movie={mockMovie} classContainer="custom-class">
        <div>Test content</div>
      </HeroMovie>
    )

    const container = screen.getByTestId('container')
    expect(container).toHaveClass('custom-class')
  })

  it('applies default hero classes', () => {
    render(
      <HeroMovie movie={mockMovie}>
        <div>Test content</div>
      </HeroMovie>
    )

    const heroDiv = screen.getByTestId('container').parentElement
    expect(heroDiv).toHaveClass(
      'pt-24',
      'flex',
      'items-center',
      'h-screen',
      'relative'
    )
  })

  it('applies image CSS class', () => {
    render(
      <HeroMovie movie={mockMovie}>
        <div>Test content</div>
      </HeroMovie>
    )

    const image = screen.getByTestId('movie-image')
    expect(image).toHaveClass('image')
  })

  it('applies hero CSS class', () => {
    render(
      <HeroMovie movie={mockMovie}>
        <div>Test content</div>
      </HeroMovie>
    )

    const heroDiv = screen.getByTestId('container').parentElement
    expect(heroDiv).toHaveClass('hero')
  })
})
