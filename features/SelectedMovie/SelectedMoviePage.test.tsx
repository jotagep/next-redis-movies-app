import React from 'react'
import * as reactRedux from 'react-redux'
import { render, screen } from '@testing-library/react'

import SelectedMoviePage from './SelectedMoviePage'

import { mockMovieInfo } from '@/mocks/movies'

jest.mock('@/components/Spinner/Spinner', () => {
  return function Spinner() {
    return <div data-testid="spinner">Loading...</div>
  }
})

jest.mock('./HeroDetail', () => {
  return function HeroDetail({ movie }: any) {
    return <div data-testid="hero-detail">Hero Detail: {movie.title}</div>
  }
})

jest.mock('./GridRelatedMovies', () => {
  return function GridRelatedMovies({ movies }: any) {
    return <div data-testid="grid-related">Related: {movies.length}</div>
  }
})

// Mock react-redux hooks
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}))

const mockStore = {
  getState: jest.fn(),
  subscribe: jest.fn(),
  dispatch: jest.fn()
}

const mockDispatch = jest.fn()

describe('SelectedMoviePage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(reactRedux.useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch)
  })

  it('should render spinner when loading', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({
      movies: {},
      isLoading: true
    })

    render(
      <reactRedux.Provider store={mockStore as any}>
        <SelectedMoviePage id="872585" />
      </reactRedux.Provider>
    )

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('should render spinner when movie is not loaded', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({
      movies: {},
      isLoading: false
    })

    render(
      <reactRedux.Provider store={mockStore as any}>
        <SelectedMoviePage id="872585" />
      </reactRedux.Provider>
    )

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('should render HeroDetail when movie is loaded', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({
      movies: { 872585: mockMovieInfo },
      isLoading: false
    })

    render(
      <reactRedux.Provider store={mockStore as any}>
        <SelectedMoviePage id="872585" />
      </reactRedux.Provider>
    )

    expect(screen.getByTestId('hero-detail')).toBeInTheDocument()
    expect(screen.getByText('Hero Detail: Oppenheimer')).toBeInTheDocument()
  })

  it('should render GridRelatedMovies when movie is loaded', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({
      movies: { 872585: mockMovieInfo },
      isLoading: false
    })

    render(
      <reactRedux.Provider store={mockStore as any}>
        <SelectedMoviePage id="872585" />
      </reactRedux.Provider>
    )

    expect(screen.getByTestId('grid-related')).toBeInTheDocument()
  })

  it('should dispatch fetchDetailMovie when movie is not in state', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({
      movies: {},
      isLoading: false
    })

    render(
      <reactRedux.Provider store={mockStore as any}>
        <SelectedMoviePage id="872585" />
      </reactRedux.Provider>
    )

    expect(mockDispatch).toHaveBeenCalled()
  })

  it('should not dispatch fetchDetailMovie when movie is already in state', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({
      movies: { 872585: mockMovieInfo },
      isLoading: false
    })

    render(
      <reactRedux.Provider store={mockStore as any}>
        <SelectedMoviePage id="872585" />
      </reactRedux.Provider>
    )

    expect(mockDispatch).not.toHaveBeenCalled()
  })

  it('should render spinner with correct container classes', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({
      movies: {},
      isLoading: true
    })

    render(
      <reactRedux.Provider store={mockStore as any}>
        <SelectedMoviePage id="872585" />
      </reactRedux.Provider>
    )

    const spinnerContainer = screen.getByTestId('spinner').parentElement
    expect(spinnerContainer).toHaveClass('flex', 'min-h-screen', 'w-full', 'items-center', 'justify-center')
  })

  it('should parse id string to number', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({
      movies: { 123: mockMovieInfo },
      isLoading: false
    })

    render(
      <reactRedux.Provider store={mockStore as any}>
        <SelectedMoviePage id="123" />
      </reactRedux.Provider>
    )

    expect(screen.getByTestId('hero-detail')).toBeInTheDocument()
  })

  it('should have wrapper div', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({
      movies: { 872585: mockMovieInfo },
      isLoading: false
    })

    const { container } = render(
      <reactRedux.Provider store={mockStore as any}>
        <SelectedMoviePage id="872585" />
      </reactRedux.Provider>
    )

    const wrapper = container.querySelector('div')
    expect(wrapper).toBeInTheDocument()
  })
})
