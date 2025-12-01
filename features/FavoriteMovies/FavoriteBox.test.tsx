import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render } from '@testing-library/react'

import type { Movie } from '@/types/movies'

import { mockMovieDetailed } from '@/mocks/movies'

import FavoriteBox from './FavoriteBox'
import favoriteMoviesReducer from './favoriteMoviesSlice'

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
        <FavoriteBox movie={mockMovieDetailed} />
      </Provider>
    )

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('should render with filled heart when movie is favorite', () => {
    const store = createMockStore({ [mockMovieDetailed.id]: mockMovieDetailed })
    const { container } = render(
      <Provider store={store}>
        <FavoriteBox movie={mockMovieDetailed} />
      </Provider>
    )

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('should toggle favorite when clicked', () => {
    const store = createMockStore()
    const { container } = render(
      <Provider store={store}>
        <FavoriteBox movie={mockMovieDetailed} />
      </Provider>
    )

    const favoriteBox = container.querySelector('div')
    expect(favoriteBox).toBeInTheDocument()

    // Click to add favorite
    fireEvent.click(favoriteBox!)

    // Check if movie is now in favorites
    const state = store.getState()
    expect(state.favoriteMovies.movies[mockMovieDetailed.id]).toEqual(mockMovieDetailed)
  })

  it('should remove favorite when clicked on already favorited movie', () => {
    const store = createMockStore({ [mockMovieDetailed.id]: mockMovieDetailed })
    const { container } = render(
      <Provider store={store}>
        <FavoriteBox movie={mockMovieDetailed} />
      </Provider>
    )

    const favoriteBox = container.querySelector('div')
    expect(favoriteBox).toBeInTheDocument()

    // Click to remove favorite
    fireEvent.click(favoriteBox!)

    // Check if movie is removed from favorites
    const state = store.getState()
    expect(state.favoriteMovies.movies[mockMovieDetailed.id]).toBeUndefined()
  })

  it('should apply custom className', () => {
    const store = createMockStore()
    const customClassName = 'custom-class'
    const { container } = render(
      <Provider store={store}>
        <FavoriteBox movie={mockMovieDetailed} className={customClassName} />
      </Provider>
    )

    const favoriteBox = container.querySelector('div')
    expect(favoriteBox).toHaveClass(customClassName)
  })

  it('should have empty className by default', () => {
    const store = createMockStore()
    const { container } = render(
      <Provider store={store}>
        <FavoriteBox movie={mockMovieDetailed} />
      </Provider>
    )

    const favoriteBox = container.querySelector('div')
    expect(favoriteBox?.className).toBe('')
  })
})
