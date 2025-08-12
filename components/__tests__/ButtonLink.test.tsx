import React from 'react'
import { render, screen } from '@testing-library/react'

import ButtonLink from '@/components/ButtonLink'

// Mock Next.js router
const mockUseRouter = jest.fn()

jest.mock('next/router', () => ({
  useRouter: () => mockUseRouter()
}))

describe('ButtonLink', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      pathname: '/'
    })
  })

  it('renders link with correct href and text', () => {
    render(<ButtonLink to="/test">Test Link</ButtonLink>)

    const link = screen.getByRole('link', { name: /test link/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
  })

  it('applies custom className', () => {
    render(
      <ButtonLink to="/test" className="custom-class">
        Test Link
      </ButtonLink>
    )

    const link = screen.getByRole('link')
    expect(link).toHaveClass('custom-class')
  })

  it('applies active styles when route matches', () => {
    mockUseRouter.mockReturnValue({
      pathname: '/test'
    })

    render(<ButtonLink to="/test">Test Link</ButtonLink>)

    const link = screen.getByRole('link')
    expect(link).toHaveClass('bg-netflix', 'border-netflix')
  })

  it('applies inactive styles when route does not match', () => {
    mockUseRouter.mockReturnValue({
      pathname: '/different'
    })

    render(<ButtonLink to="/test">Test Link</ButtonLink>)

    const link = screen.getByRole('link')
    expect(link).toHaveClass('border-white')
    expect(link).not.toHaveClass('bg-netflix', 'border-netflix')
  })
})
