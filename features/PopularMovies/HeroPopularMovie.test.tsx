import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'

import HeroPopularMovie from './HeroPopularMovie'
import popularMoviesReducer from './popularMoviesSlice'

import { mockMovieDetailed } from '@/mocks/movies'

// Mock the components
jest.mock('@/components/HeroMovie', () => {
  return function HeroMovie({ movie, children }: any) {
    return (
      <div data-testid="hero-movie">
        <div data-testid="hero-movie-title">{movie.title}</div>
        {children}
      </div>
    )
  }
})

jest.mock('@/components/ButtonLink/ButtonLink', () => {
  return function ButtonLink({ to, children }: any) {
    return (
      <a href={to} data-testid="button-link">
        {children}
      </a>
    )
  }
})

jest.mock('@/components/Spinner/Spinner', () => {
  return function Spinner() {
    return <div data-testid="spinner">Loading...</div>
  }
})

jest.mock('@/features/FavoriteMovies/FavoriteBox', () => {
  return function FavoriteBox({ movie }: any) {
    return <div data-testid="favorite-box">Favorite {movie.id}</div>
  }
})

const createMockStore = (movies: any[] = []) => {
  return configureStore({
    reducer: {
      popularMovies: popularMoviesReducer
    },
    preloadedState: {
      popularMovies: {
        movies,
        isLoading: false,
        error: null,
        pagesLoaded: 1
      }
    }
  })
}

describe('HeroPopularMovie', () => {
  it('should render spinner when there are no movies', () => {
    const store = createMockStore([])

    render(
      <Provider store={store}>
        <HeroPopularMovie />
      </Provider>
    )

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('should render the first movie as hero', () => {
    const store = createMockStore([mockMovieDetailed])

    render(
      <Provider store={store}>
        <HeroPopularMovie />
      </Provider>
    )

    expect(screen.getByTestId('hero-movie')).toBeInTheDocument()
    expect(screen.getByTestId('hero-movie-title')).toHaveTextContent('Oppenheimer')
  })

  it('should render movie title and overview', () => {
    const store = createMockStore([mockMovieDetailed])

    render(
      <Provider store={store}>
        <HeroPopularMovie />
      </Provider>
    )

    expect(screen.getAllByText('Oppenheimer')).toHaveLength(2)
    expect(screen.getByText(mockMovieDetailed.overview)).toBeInTheDocument()
  })

  it('should render "Most popular at the moment" text', () => {
    const store = createMockStore([mockMovieDetailed])

    render(
      <Provider store={store}>
        <HeroPopularMovie />
      </Provider>
    )

    expect(screen.getByText('Most popular at the moment')).toBeInTheDocument()
  })

  it('should render "See More" button with correct link', () => {
    const store = createMockStore([mockMovieDetailed])

    render(
      <Provider store={store}>
        <HeroPopularMovie />
      </Provider>
    )

    const button = screen.getByTestId('button-link')
    expect(button).toHaveTextContent('See More')
    expect(button).toHaveAttribute('href', '/movies/872585')
  })

  it('should render FavoriteBox component', () => {
    const store = createMockStore([mockMovieDetailed])

    render(
      <Provider store={store}>
        <HeroPopularMovie />
      </Provider>
    )

    expect(screen.getByTestId('favorite-box')).toBeInTheDocument()
    expect(screen.getByText('Favorite 872585')).toBeInTheDocument()
  })

  it('should have correct section wrapper', () => {
    const store = createMockStore([mockMovieDetailed])

    const { container } = render(
      <Provider store={store}>
        <HeroPopularMovie />
      </Provider>
    )

    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('should display spinner with loading container when no movie', () => {
    const store = createMockStore([])

    render(
      <Provider store={store}>
        <HeroPopularMovie />
      </Provider>
    )

    const spinnerContainer = screen.getByTestId('spinner').parentElement
    expect(spinnerContainer).toHaveClass('flex', 'min-h-screen', 'w-full', 'items-center', 'justify-center')
  })
})
