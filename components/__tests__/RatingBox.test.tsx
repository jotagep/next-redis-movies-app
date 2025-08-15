import React from 'react'
import { render, screen } from '@testing-library/react'

import RatingBox from '@/components/RatingBox'

describe('RatingBox', () => {
  it('renders with red background for rate less than 5.0', () => {
    render(<RatingBox rate={4.5} />)

    const ratingBox = screen.getByText('4.5')
    expect(ratingBox).toHaveClass('bg-red-600')
  })

  it('renders with gray background for rate between 5.0 and 6.5', () => {
    render(<RatingBox rate={6.0} />)

    const ratingBox = screen.getByText('6.0')
    expect(ratingBox).toHaveClass('bg-gray-700')
  })

  it('renders with green background for rate between 6.5 and 8.0', () => {
    render(<RatingBox rate={7.5} />)

    const ratingBox = screen.getByText('7.5')
    expect(ratingBox).toHaveClass('bg-green-500')
  })

  it('renders with dark green background for rate 8.0 or higher', () => {
    render(<RatingBox rate={9.2} />)

    const ratingBox = screen.getByText('9.2')
    expect(ratingBox).toHaveClass('bg-green-700')
  })

  it('renders with gray background and dash for rate 0', () => {
    render(<RatingBox rate={0} />)

    const ratingBox = screen.getByText('-')
    expect(ratingBox).toHaveClass('bg-gray-600')
  })

  it('renders with gray background and dash for undefined rate', () => {
    render(<RatingBox rate={undefined as any} />)

    const ratingBox = screen.getByText('-')
    expect(ratingBox).toHaveClass('bg-gray-600')
  })

  it('applies custom className', () => {
    render(<RatingBox rate={8.5} className="custom-class" />)

    const ratingBox = screen.getByText('8.5')
    expect(ratingBox).toHaveClass('custom-class')
  })

  it('formats rate to one decimal place', () => {
    render(<RatingBox rate={7.123} />)

    const ratingBox = screen.getByText('7.1')
    expect(ratingBox).toBeInTheDocument()
  })
})
