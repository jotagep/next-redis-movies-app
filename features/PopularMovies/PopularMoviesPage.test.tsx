import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'

import { mockMovieDetailed, mockMoviesList } from '@/mocks/movies'

import PopularMoviesPage from './PopularMoviesPage'
import popularMoviesReducer from './popularMoviesSlice'

// Mock the child components
jest.mock('./HeroPopularMovie', () => {
  return function HeroPopularMovie() {
    return <div data-testid="hero-popular-movie">Hero Popular Movie</div>
  }
})

jest.mock('./GridPopularMovies', () => {
  return function GridPopularMovies() {
    return <div data-testid="grid-popular-movies">Grid Popular Movies</div>
  }
})

jest.mock('./LoadMore', () => {
  return function LoadMore() {
    return <div data-testid="load-more">Load More</div>
  }
})

const createMockStore = (movies: any[] = [], isLoading: boolean = false, pagesLoaded: number = 1) => {
  return configureStore({
    reducer: {
      popularMovies: popularMoviesReducer
    },
    preloadedState: {
      popularMovies: {
        movies,
        isLoading,
        error: null,
        pagesLoaded
      }
    }
  })
}

describe('PopularMoviesPage', () => {
  it('should render all child components', () => {
    const store = createMockStore([mockMovieDetailed, ...mockMoviesList])

    render(
      <Provider store={store}>
        <PopularMoviesPage />
      </Provider>
    )

    expect(screen.getByTestId('hero-popular-movie')).toBeInTheDocument()
    expect(screen.getByTestId('grid-popular-movies')).toBeInTheDocument()
    expect(screen.getByTestId('load-more')).toBeInTheDocument()
  })

  it('should render HeroPopularMovie component', () => {
    const store = createMockStore([mockMovieDetailed])

    render(
      <Provider store={store}>
        <PopularMoviesPage />
      </Provider>
    )

    expect(screen.getByText('Hero Popular Movie')).toBeInTheDocument()
  })

  it('should render GridPopularMovies component', () => {
    const store = createMockStore([mockMovieDetailed, ...mockMoviesList])

    render(
      <Provider store={store}>
        <PopularMoviesPage />
      </Provider>
    )

    expect(screen.getByText('Grid Popular Movies')).toBeInTheDocument()
  })

  it('should render LoadMore component', () => {
    const store = createMockStore([mockMovieDetailed])

    render(
      <Provider store={store}>
        <PopularMoviesPage />
      </Provider>
    )

    expect(screen.getByText('Load More')).toBeInTheDocument()
  })

  it('should render with empty movies array', () => {
    const store = createMockStore([])

    render(
      <Provider store={store}>
        <PopularMoviesPage />
      </Provider>
    )

    expect(screen.getByTestId('hero-popular-movie')).toBeInTheDocument()
    expect(screen.getByTestId('grid-popular-movies')).toBeInTheDocument()
    expect(screen.getByTestId('load-more')).toBeInTheDocument()
  })

  it('should render when loading', () => {
    const store = createMockStore(mockMoviesList, true, 1)

    render(
      <Provider store={store}>
        <PopularMoviesPage />
      </Provider>
    )

    expect(screen.getByTestId('hero-popular-movie')).toBeInTheDocument()
    expect(screen.getByTestId('grid-popular-movies')).toBeInTheDocument()
    expect(screen.getByTestId('load-more')).toBeInTheDocument()
  })

  it('should have correct wrapper structure', () => {
    const store = createMockStore([mockMovieDetailed])

    const { container } = render(
      <Provider store={store}>
        <PopularMoviesPage />
      </Provider>
    )

    const wrapper = container.querySelector('div')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper?.children.length).toBe(3)
  })

  it('should render components in correct order', () => {
    const store = createMockStore([mockMovieDetailed, ...mockMoviesList])

    const { container } = render(
      <Provider store={store}>
        <PopularMoviesPage />
      </Provider>
    )

    const children = Array.from(container.querySelector('div')?.children || [])
    expect(children[0]).toHaveAttribute('data-testid', 'hero-popular-movie')
    expect(children[1]).toHaveAttribute('data-testid', 'grid-popular-movies')
    expect(children[2]).toHaveAttribute('data-testid', 'load-more')
  })
})
