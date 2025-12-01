import React from 'react'
import { Provider } from 'react-redux'
import * as reactRedux from 'react-redux'
import { render, screen, waitFor } from '@testing-library/react'

import LoadMore from './LoadMore'

// Mock the Spinner component
jest.mock('@/components/Spinner/Spinner', () => {
  return function Spinner() {
    return <div data-testid="spinner">Loading...</div>
  }
})

// Mock react-redux hooks
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}))

const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
})
window.IntersectionObserver = mockIntersectionObserver as any

const mockStore = {
  getState: jest.fn(),
  subscribe: jest.fn(),
  dispatch: jest.fn()
}

const mockDispatch = jest.fn()

describe('LoadMore', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(reactRedux.useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch)
  })

  it('should render the component with container', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({ isLoading: false, pagesLoaded: 1 })

    const { container } = render(
      <Provider store={mockStore as any}>
        <LoadMore />
      </Provider>
    )

    const loadMoreDiv = container.querySelector('.flex.h-16.justify-center')
    expect(loadMoreDiv).toBeInTheDocument()
  })

  it('should render spinner when loading', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({ isLoading: true, pagesLoaded: 1 })

    render(
      <Provider store={mockStore as any}>
        <LoadMore />
      </Provider>
    )

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('should not render spinner when not loading', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({ isLoading: false, pagesLoaded: 1 })

    render(
      <Provider store={mockStore as any}>
        <LoadMore />
      </Provider>
    )

    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
  })

  it('should setup IntersectionObserver on mount', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({ isLoading: false, pagesLoaded: 1 })

    render(
      <Provider store={mockStore as any}>
        <LoadMore />
      </Provider>
    )

    expect(mockIntersectionObserver).toHaveBeenCalled()
  })

  it('should fetch movies on mount if pagesLoaded is 0', async () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({ isLoading: false, pagesLoaded: 0 })

    render(
      <Provider store={mockStore as any}>
        <LoadMore />
      </Provider>
    )

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled()
    })
  })

  it('should not fetch movies on mount if pagesLoaded > 0', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({ isLoading: false, pagesLoaded: 2 })

    render(
      <Provider store={mockStore as any}>
        <LoadMore />
      </Provider>
    )

    expect(mockDispatch).not.toHaveBeenCalled()
  })

  it('should have correct container classes', () => {
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({ isLoading: true, pagesLoaded: 1 })

    const { container } = render(
      <Provider store={mockStore as any}>
        <LoadMore />
      </Provider>
    )

    const loadMoreDiv = container.querySelector('.flex.h-16.justify-center')
    expect(loadMoreDiv).toHaveClass('flex', 'h-16', 'justify-center')
  })

  it('should cleanup IntersectionObserver on unmount', () => {
    const unobserveMock = jest.fn()
    const observeMock = jest.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: observeMock,
      unobserve: unobserveMock,
      disconnect: jest.fn()
    })
    ;(reactRedux.useSelector as unknown as jest.Mock).mockReturnValue({ isLoading: false, pagesLoaded: 1 })

    const { unmount } = render(
      <Provider store={mockStore as any}>
        <LoadMore />
      </Provider>
    )

    unmount()

    expect(unobserveMock).toHaveBeenCalled()
  })
})
