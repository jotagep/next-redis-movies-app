import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'

import GridPopularMovies from '@/features/PopularMovies/GridPopularMovies'
import popularMoviesReducer from '@/features/PopularMovies/popularMoviesSlice'

import { Movie } from '@/types/movies'

// Mock the GridMovie component
jest.mock('@/components/GridMovie', () => {
  return function MockGridMovie({
    movies,
    title
  }: {
    movies: any[]
    title: string
  }) {
    return (
      <div data-testid="grid-movie">
        <h2>{title}</h2>
        <div data-testid="movies-count">{movies.length} movies</div>
        {movies.map((movie) => (
          <div key={movie.id} data-testid={`movie-${movie.id}`}>
            {movie.title}
          </div>
        ))}
      </div>
    )
  }
})

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Hero Movie',
    backdrop_path: '/hero.jpg',
    poster_path: '/hero-poster.jpg',
    vote_average: 9.0,
    overview: 'Hero movie overview',
    original_name: 'Hero Movie'
  },
  {
    id: 2,
    title: 'Popular Movie 1',
    backdrop_path: '/movie1.jpg',
    poster_path: '/movie1-poster.jpg',
    vote_average: 8.5,
    overview: 'Popular movie 1 overview',
    original_name: 'Popular Movie 1'
  },
  {
    id: 3,
    title: 'Popular Movie 2',
    backdrop_path: '/movie2.jpg',
    poster_path: '/movie2-poster.jpg',
    vote_average: 7.5,
    overview: 'Popular movie 2 overview',
    original_name: 'Popular Movie 2'
  }
]

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      popularMovies: popularMoviesReducer
    },
    preloadedState: {
      popularMovies: {
        movies: mockMovies,
        isLoading: false,
        error: null,
        pagesLoaded: 1,
        ...initialState
      }
    }
  })
}

describe('GridPopularMovies', () => {
  it('renders popular movies grid excluding the first movie', () => {
    const store = createTestStore()

    render(
      <Provider store={store}>
        <GridPopularMovies />
      </Provider>
    )

    const gridMovie = screen.getByTestId('grid-movie')
    expect(gridMovie).toBeInTheDocument()

    const title = screen.getByText('Popular Movies')
    expect(title).toBeInTheDocument()

    const moviesCount = screen.getByTestId('movies-count')
    expect(moviesCount).toHaveTextContent('2 movies') // Excluding the first movie

    // Should not render the first movie (Hero Movie)
    expect(screen.queryByTestId('movie-1')).not.toBeInTheDocument()

    // Should render the rest of the movies
    expect(screen.getByTestId('movie-2')).toBeInTheDocument()
    expect(screen.getByTestId('movie-3')).toBeInTheDocument()
  })

  it('renders empty grid when no movies', () => {
    const store = createTestStore({ movies: [] })

    render(
      <Provider store={store}>
        <GridPopularMovies />
      </Provider>
    )

    const moviesCount = screen.getByTestId('movies-count')
    expect(moviesCount).toHaveTextContent('0 movies')
  })

  it('renders only one movie when there are two movies total', () => {
    const twoMovies = mockMovies.slice(0, 2)
    const store = createTestStore({ movies: twoMovies })

    render(
      <Provider store={store}>
        <GridPopularMovies />
      </Provider>
    )

    const moviesCount = screen.getByTestId('movies-count')
    expect(moviesCount).toHaveTextContent('1 movies')

    // Should not render the first movie
    expect(screen.queryByTestId('movie-1')).not.toBeInTheDocument()

    // Should render the second movie
    expect(screen.getByTestId('movie-2')).toBeInTheDocument()
  })
})
