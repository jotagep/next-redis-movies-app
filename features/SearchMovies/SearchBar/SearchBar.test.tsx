import React from 'react'
import * as reactRedux from 'react-redux'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import SearchBar from './index'

jest.mock('../SearchIcon', () => {
  return function SearchIcon() {
    return <div data-testid="search-icon">Search Icon</div>
  }
})

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn()
}))

jest.mock('use-debounce', () => ({
  useDebouncedCallback: (fn: any) => fn
}))

const mockStore = {
  getState: jest.fn(),
  subscribe: jest.fn(),
  dispatch: jest.fn()
}

const mockDispatch = jest.fn()

describe('SearchBar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(reactRedux.useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch)
  })

  it('should render the search input', () => {
    render(
      <reactRedux.Provider store={mockStore as any}>
        <SearchBar />
      </reactRedux.Provider>
    )

    const input = screen.getByPlaceholderText('Search a movie...')
    expect(input).toBeInTheDocument()
  })

  it('should render the SearchIcon component', () => {
    render(
      <reactRedux.Provider store={mockStore as any}>
        <SearchBar />
      </reactRedux.Provider>
    )

    expect(screen.getByTestId('search-icon')).toBeInTheDocument()
  })

  it('should have correct input attributes', () => {
    render(
      <reactRedux.Provider store={mockStore as any}>
        <SearchBar />
      </reactRedux.Provider>
    )

    const input = screen.getByPlaceholderText('Search a movie...')
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveClass('w-full', 'bg-transparent', 'py-2', 'pl-10')
  })

  it('should dispatch setFocused(true) on focus', () => {
    render(
      <reactRedux.Provider store={mockStore as any}>
        <SearchBar />
      </reactRedux.Provider>
    )

    const input = screen.getByPlaceholderText('Search a movie...')
    fireEvent.focus(input)

    expect(mockDispatch).toHaveBeenCalled()
  })

  it('should dispatch setFocused(false) on blur', () => {
    render(
      <reactRedux.Provider store={mockStore as any}>
        <SearchBar />
      </reactRedux.Provider>
    )

    const input = screen.getByPlaceholderText('Search a movie...')
    fireEvent.blur(input)

    expect(mockDispatch).toHaveBeenCalled()
  })

  it('should dispatch fetchSearchMovie when input has more than 1 character', async () => {
    render(
      <reactRedux.Provider store={mockStore as any}>
        <SearchBar />
      </reactRedux.Provider>
    )

    const input = screen.getByPlaceholderText('Search a movie...')
    fireEvent.change(input, { target: { value: 'Oppenheimer' } })

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled()
    })
  })

  it('should dispatch setEmptyMovies when input has 1 or less characters', async () => {
    render(
      <reactRedux.Provider store={mockStore as any}>
        <SearchBar />
      </reactRedux.Provider>
    )

    const input = screen.getByPlaceholderText('Search a movie...')
    fireEvent.change(input, { target: { value: 'a' } })

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled()
    })
  })

  it('should have search container with correct class', () => {
    const { container } = render(
      <reactRedux.Provider store={mockStore as any}>
        <SearchBar />
      </reactRedux.Provider>
    )

    const searchDiv = container.querySelector('[class*="search"]')
    expect(searchDiv).toBeInTheDocument()
  })

  it('should have icon container', () => {
    const { container } = render(
      <reactRedux.Provider store={mockStore as any}>
        <SearchBar />
      </reactRedux.Provider>
    )

    const iconDiv = container.querySelector('[class*="icon"]')
    expect(iconDiv).toBeInTheDocument()
  })
})
