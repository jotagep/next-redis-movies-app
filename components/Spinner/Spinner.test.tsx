import React from 'react'
import { render, screen } from '@testing-library/react'

import Spinner from '@/components/Spinner/Spinner'

// Mock react-loading
jest.mock('react-loading', () => {
  return function MockReactLoading({
    type,
    color,
    'data-testid': testId
  }: any) {
    return <div data-testid={testId} data-type={type} data-color={color} />
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
})
