import React from 'react'
import * as reactRedux from 'react-redux'
import { render, screen } from '@testing-library/react'

import { mockMoviesList } from '@/mocks/movies'

import SearchList from './index'

jest.mock('next/link', () => {
  return function Link({ children, href, className }: any) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }
})

jest.mock('@/components/MovieImage/MovieImage', () => {
  return function MovieImage({ src, alt }: any) {
    return <img src={src} alt={alt} data-testid="movie-image" />
  }
})

jest.mock('@/components/RatingBox/RatingBox', () => {
  return function RatingBox({ rate }: any) {
    return <div data-testid="rating-box">Rating: {rate}</div>
  }
})

jest.mock('@/lib/moviesApi', () => ({
  moviesApi: {
    getImage: jest.fn((path, size) => `https://image.tmdb.org/t/p/${size}${path}`)
  }
}))

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

describe('SearchList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    document.body.style.overflowY = 'scroll'
  })

  it('should render nothing when not focused', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({
      movies: mockMoviesList,
      isFocused: false
    })

    const { container } = render(
      <reactRedux.Provider store={mockStore as any}>
        <SearchList />
      </reactRedux.Provider>
    )

    const list = container.querySelector('[class*="list"]')
    expect(list).toHaveClass('hidden')
  })

  it('should render nothing when movies array is empty', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({
      movies: [],
      isFocused: true
    })

    const { container } = render(
      <reactRedux.Provider store={mockStore as any}>
        <SearchList />
      </reactRedux.Provider>
    )

    const list = container.querySelector('[class*="list"]')
    expect(list).toHaveClass('hidden')
  })

  it('should render list when focused and has movies', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({
      movies: mockMoviesList,
      isFocused: true
    })

    const { container } = render(
      <reactRedux.Provider store={mockStore as any}>
        <SearchList />
      </reactRedux.Provider>
    )

    const list = container.querySelector('[class*="list"]')
    expect(list).toHaveClass('block')
  })

  it('should render all movies in the list', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({
      movies: mockMoviesList,
      isFocused: true
    })

    render(
      <reactRedux.Provider store={mockStore as any}>
        <SearchList />
      </reactRedux.Provider>
    )

    expect(screen.getByText('Oppenheimer')).toBeInTheDocument()
    expect(screen.getByText('Barbie')).toBeInTheDocument()
  })

  it('should render MovieImage for each movie', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({
      movies: mockMoviesList.slice(0, 2),
      isFocused: true
    })

    render(
      <reactRedux.Provider store={mockStore as any}>
        <SearchList />
      </reactRedux.Provider>
    )

    const images = screen.getAllByTestId('movie-image')
    expect(images).toHaveLength(2)
  })

  it('should render RatingBox for each movie', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({
      movies: mockMoviesList.slice(0, 2),
      isFocused: true
    })

    render(
      <reactRedux.Provider store={mockStore as any}>
        <SearchList />
      </reactRedux.Provider>
    )

    const ratings = screen.getAllByTestId('rating-box')
    expect(ratings).toHaveLength(2)
  })

  it('should render links to movie detail pages', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({
      movies: [mockMoviesList[0]],
      isFocused: true
    })

    render(
      <reactRedux.Provider store={mockStore as any}>
        <SearchList />
      </reactRedux.Provider>
    )

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/movies/872585')
  })

  it('should set body overflow hidden when list is shown', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({
      movies: mockMoviesList,
      isFocused: true
    })

    render(
      <reactRedux.Provider store={mockStore as any}>
        <SearchList />
      </reactRedux.Provider>
    )

    expect(document.body.style.overflowY).toBe('hidden')
  })

  it('should set body overflow scroll when list is hidden', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({
      movies: [],
      isFocused: false
    })

    render(
      <reactRedux.Provider store={mockStore as any}>
        <SearchList />
      </reactRedux.Provider>
    )

    expect(document.body.style.overflowY).toBe('scroll')
  })

  it('should have correct list item classes', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({
      movies: [mockMoviesList[0]],
      isFocused: true
    })

    const { container } = render(
      <reactRedux.Provider store={mockStore as any}>
        <SearchList />
      </reactRedux.Provider>
    )

    const listItem = container.querySelector('li')
    expect(listItem).toHaveClass('border-b', 'border-gray-200', 'hover:bg-gray-200')
  })

  it('should render link with correct href', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({
      movies: [mockMoviesList[0]],
      isFocused: true
    })

    const { container } = render(
      <reactRedux.Provider store={mockStore as any}>
        <SearchList />
      </reactRedux.Provider>
    )

    const link = container.querySelector('a')
    expect(link).toHaveAttribute('href', '/movies/872585')
    expect(link).toHaveClass('flex', 'items-center', 'justify-between', 'px-8', 'py-4')
  })
})
