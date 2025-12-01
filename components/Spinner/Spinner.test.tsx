import React from 'react'
import { render, screen } from '@testing-library/react'

import Spinner from '@/components/Spinner/Spinner'

jest.mock('react-loading', () => {
  return function MockReactLoading({ type, color, width, height, 'data-testid': testId }: any) {
    return <div data-testid={testId} data-type={type} data-color={color} data-width={width} data-height={height} />
  }
})

describe('Spinner', () => {
  it('renders with correct props', () => {
    render(<Spinner />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveAttribute('data-type', 'spinningBubbles')
    expect(spinner).toHaveAttribute('data-color', '#e50914')
  })

  it('renders with default size (64px) when small prop is false', () => {
    render(<Spinner />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveAttribute('data-width', '64')
    expect(spinner).toHaveAttribute('data-height', '64')
  })

  it('renders with small size (32px) when small prop is true', () => {
    render(<Spinner small={true} />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveAttribute('data-width', '32')
    expect(spinner).toHaveAttribute('data-height', '32')
  })
})
