import React from 'react'
import { act, render, screen } from '@testing-library/react'

import MovieImage from '@/components/MovieImage/MovieImage'

jest.mock('next/image', () => {
  return function MockImage({ src, alt, onError, ...props }: any) {
    return <img src={src} alt={alt} data-testid="movie-image" onError={onError} {...props} />
  }
})

describe('MovieImage', () => {
  it('renders image with correct src and alt', () => {
    render(<MovieImage src="/test-image.jpg" alt="Test movie" width={300} height={200} />)

    const image = screen.getByTestId('movie-image')
    expect(image).toHaveAttribute('src', '/test-image.jpg')
    expect(image).toHaveAttribute('alt', 'Test movie')
    expect(image).toHaveAttribute('width', '300')
    expect(image).toHaveAttribute('height', '200')
  })

  it('handles image error by setting fallback src', async () => {
    render(<MovieImage src="/test-image.jpg" alt="Test movie" width={300} height={200} />)

    const image = screen.getByTestId('movie-image')

    // Simulate image error
    await act(async () => {
      image.dispatchEvent(new Event('error'))
    })

    expect(image).toHaveAttribute('src', '/no-image.svg')
  })

  it('passes through additional props', () => {
    render(<MovieImage src="/test-image.jpg" alt="Test movie" className="custom-class" />)

    const image = screen.getByTestId('movie-image')
    expect(image).toHaveClass('custom-class')
  })
})
