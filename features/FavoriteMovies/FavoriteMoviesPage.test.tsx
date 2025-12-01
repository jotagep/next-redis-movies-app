import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { render, screen, waitFor } from '@testing-library/react'

import type { Movie } from '@/types/movies'

import FavoriteMoviesPage from './FavoriteMoviesPage'
import favoriteMoviesReducer from './favoriteMoviesSlice'

// Mock the components
jest.mock('@/components/Container/Container', () => {
  return function Container({ children }: { children: React.ReactNode }) {
    return <div data-testid="container">{children}</div>
  }
})

jest.mock('@/components/GridMovie/GridMovie', () => {
  return function GridMovie({ movies }: { movies: Movie[] }) {
    return <div data-testid="grid-movie">Grid with {movies.length} movies</div>
  }
})

const mockMovie1: Movie = {
  id: 1,
  title: 'Test Movie 1',
  original_name: 'Test Movie 1 Original',
  vote_average: 8.5,
  overview: 'Test overview 1',
  poster_path: '/test-poster-1.jpg',
  backdrop_path: '/test-backdrop-1.jpg'
}

const mockMovie2: Movie = {
  id: 2,
  title: 'Test Movie 2',
  original_name: 'Test Movie 2 Original',
  vote_average: 7.5,
  overview: 'Test overview 2',
  poster_path: '/test-poster-2.jpg',
  backdrop_path: '/test-backdrop-2.jpg'
}

const createMockStore = (initialFavorites: { [key: number]: Movie } = {}) => {
  return configureStore({
    reducer: {
      favoriteMovies: favoriteMoviesReducer
    },
    preloadedState: {
      favoriteMovies: {
        movies: initialFavorites
      }
    }
  })
}

describe('FavoriteMoviesPage', () => {
  beforeEach(() => {
    // Mock localStorage
    Storage.prototype.getItem = jest.fn(() => null)
    Storage.prototype.setItem = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render the page title', async () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <FavoriteMoviesPage />
      </Provider>
    )

    await waitFor(() => {
      expect(screen.getByText('Favorite Movies')).toBeInTheDocument()
    })
  })

  it('should render empty state when there are no favorite movies', async () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <FavoriteMoviesPage />
      </Provider>
    )

    await waitFor(() => {
      expect(screen.getByText('You have not favorite movies yet')).toBeInTheDocument()
    })
  })

  it('should render GridMovie when there are favorite movies', async () => {
    const store = createMockStore({
      [mockMovie1.id]: mockMovie1,
      [mockMovie2.id]: mockMovie2
    })

    render(
      <Provider store={store}>
        <FavoriteMoviesPage />
      </Provider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('grid-movie')).toBeInTheDocument()
      expect(screen.getByText('Grid with 2 movies')).toBeInTheDocument()
    })
  })

  it('should show movies after client-side hydration completes', async () => {
    const store = createMockStore({
      [mockMovie1.id]: mockMovie1
    })

    render(
      <Provider store={store}>
        <FavoriteMoviesPage />
      </Provider>
    )

    // After hydration, GridMovie should be shown
    await waitFor(() => {
      expect(screen.getByTestId('grid-movie')).toBeInTheDocument()
    })
  })

  it('should render Container components', async () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <FavoriteMoviesPage />
      </Provider>
    )

    await waitFor(() => {
      const containers = screen.getAllByTestId('container')
      expect(containers.length).toBeGreaterThan(0)
    })
  })

  it('should have correct section styling', () => {
    const store = createMockStore()
    const { container } = render(
      <Provider store={store}>
        <FavoriteMoviesPage />
      </Provider>
    )

    const section = container.querySelector('section')
    expect(section).toHaveClass('pt-24')
  })

  it('should render single favorite movie correctly', async () => {
    const store = createMockStore({
      [mockMovie1.id]: mockMovie1
    })

    render(
      <Provider store={store}>
        <FavoriteMoviesPage />
      </Provider>
    )

    await waitFor(() => {
      expect(screen.getByText('Grid with 1 movies')).toBeInTheDocument()
    })
  })
})
