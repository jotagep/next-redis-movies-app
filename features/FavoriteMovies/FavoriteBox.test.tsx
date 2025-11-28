import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'

import type { Movie } from '@/types/movies'

import FavoriteBox from './FavoriteBox'
import favoriteMoviesReducer from './favoriteMoviesSlice'

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  original_name: 'Test Movie Original',
  vote_average: 8.5,
  overview: 'Test overview',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg'
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

describe('FavoriteBox', () => {
  beforeEach(() => {
    // Mock localStorage
    Storage.prototype.getItem = jest.fn(() => null)
    Storage.prototype.setItem = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render with empty heart when movie is not favorite', () => {
    const store = createMockStore()
    const { container } = render(
      <Provider store={store}>
        <FavoriteBox movie={mockMovie} />
      </Provider>
    )

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('should render with filled heart when movie is favorite', () => {
    const store = createMockStore({ [mockMovie.id]: mockMovie })
    const { container } = render(
      <Provider store={store}>
        <FavoriteBox movie={mockMovie} />
      </Provider>
    )

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('should toggle favorite when clicked', () => {
    const store = createMockStore()
    const { container } = render(
      <Provider store={store}>
        <FavoriteBox movie={mockMovie} />
      </Provider>
    )

    const favoriteBox = container.querySelector('div')
    expect(favoriteBox).toBeInTheDocument()

    // Click to add favorite
    fireEvent.click(favoriteBox!)

    // Check if movie is now in favorites
    const state = store.getState()
    expect(state.favoriteMovies.movies[mockMovie.id]).toEqual(mockMovie)
  })

  it('should remove favorite when clicked on already favorited movie', () => {
    const store = createMockStore({ [mockMovie.id]: mockMovie })
    const { container } = render(
      <Provider store={store}>
        <FavoriteBox movie={mockMovie} />
      </Provider>
    )

    const favoriteBox = container.querySelector('div')
    expect(favoriteBox).toBeInTheDocument()

    // Click to remove favorite
    fireEvent.click(favoriteBox!)

    // Check if movie is removed from favorites
    const state = store.getState()
    expect(state.favoriteMovies.movies[mockMovie.id]).toBeUndefined()
  })

  it('should apply custom className', () => {
    const store = createMockStore()
    const customClassName = 'custom-class'
    const { container } = render(
      <Provider store={store}>
        <FavoriteBox movie={mockMovie} className={customClassName} />
      </Provider>
    )

    const favoriteBox = container.querySelector('div')
    expect(favoriteBox).toHaveClass(customClassName)
  })

  it('should have empty className by default', () => {
    const store = createMockStore()
    const { container } = render(
      <Provider store={store}>
        <FavoriteBox movie={mockMovie} />
      </Provider>
    )

    const favoriteBox = container.querySelector('div')
    expect(favoriteBox?.className).toBe('')
  })
})
