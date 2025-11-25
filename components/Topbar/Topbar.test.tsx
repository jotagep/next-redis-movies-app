import React from 'react'
import { render, screen } from '@testing-library/react'

import Topbar, { TOPBAR_ANIMATION_HEIGHT } from '@/components/Topbar'

// Mock the useScrollY hook
jest.mock('@/hooks/useScrollY', () => ({
  __esModule: true,
  default: jest.fn()
}))

// Mock the ButtonLink component
jest.mock('@/components/ButtonLink/ButtonLink', () => {
  return function MockButtonLink({ to, children }: any) {
    return (
      <a href={to} data-testid="button-link">
        {children}
      </a>
    )
  }
})

// Mock the Container component
jest.mock('@/components/Container/Container', () => {
  return function MockContainer({ children, className }: any) {
    return (
      <div data-testid="container" className={className}>
        {children}
      </div>
    )
  }
})

// Mock the SearchBar component
jest.mock('@/features/SearchMovies/SearchBar', () => {
  return function MockSearchBar() {
    return <div data-testid="search-bar">Search Bar</div>
  }
})

const mockUseScrollY = require('@/hooks/useScrollY').default

describe('Topbar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders topbar with default state (no scroll)', () => {
    mockUseScrollY.mockReturnValue({ y: 0 })

    render(<Topbar />)

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass('header')
    expect(header).not.toHaveClass('header-full')
  })

  it('renders topbar with full state when scrolled past threshold', () => {
    mockUseScrollY.mockReturnValue({ y: TOPBAR_ANIMATION_HEIGHT + 50 })

    render(<Topbar />)

    const header = screen.getByRole('banner')
    expect(header).toHaveClass('header', 'header-full')
  })

  it('renders logo link', () => {
    mockUseScrollY.mockReturnValue({ y: 0 })

    render(<Topbar />)

    const logoLink = screen.getByRole('link', { name: /verflix/i })
    expect(logoLink).toHaveAttribute('href', '/')
    expect(screen.getByText('Verflix')).toHaveClass('title')
  })

  it('renders search bar', () => {
    mockUseScrollY.mockReturnValue({ y: 0 })

    render(<Topbar />)

    expect(screen.getByTestId('search-bar')).toBeInTheDocument()
  })

  it('renders favorites button', () => {
    mockUseScrollY.mockReturnValue({ y: 0 })

    render(<Topbar />)

    const favoritesButton = screen.getByTestId('button-link')
    expect(favoritesButton).toHaveAttribute('href', '/favorites')
    expect(favoritesButton).toHaveTextContent('Favorites')
  })

  it('renders navigation structure correctly', () => {
    mockUseScrollY.mockReturnValue({ y: 0 })

    render(<Topbar />)

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()

    const list = screen.getByRole('list')
    expect(list).toHaveClass(
      'h-full',
      'flex',
      'items-center',
      'justify-between'
    )

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(3)
  })

  it('applies container with correct classes', () => {
    mockUseScrollY.mockReturnValue({ y: 0 })

    render(<Topbar />)

    const container = screen.getByTestId('container')
    expect(container).toHaveClass('h-full')
  })
})
