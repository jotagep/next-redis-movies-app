import React from 'react'
import { render } from '@testing-library/react'

import HeartIcon from './HeartIcon'

describe('HeartIcon', () => {
  it('should render empty heart icon when isFavorite is false', () => {
    const { container } = render(<HeartIcon isFavorite={false} />)
    const svg = container.querySelector('svg')
    const path = svg?.querySelector('path')

    expect(svg).toBeInTheDocument()
    expect(path).toHaveAttribute(
      'd',
      'M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z'
    )
  })

  it('should render filled heart icon when isFavorite is true', () => {
    const { container } = render(<HeartIcon isFavorite={true} />)
    const svg = container.querySelector('svg')
    const path = svg?.querySelector('path')

    expect(svg).toBeInTheDocument()
    expect(path).toHaveAttribute(
      'd',
      'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
    )
  })

  it('should render empty heart icon by default when no prop is provided', () => {
    const { container } = render(<HeartIcon />)
    const svg = container.querySelector('svg')
    const path = svg?.querySelector('path')

    expect(svg).toBeInTheDocument()
    expect(path).toHaveAttribute(
      'd',
      'M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z'
    )
  })

  it('should have white fill color', () => {
    const { container } = render(<HeartIcon />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveStyle({ fill: '#fff' })
  })

  it('should have correct viewBox', () => {
    const { container } = render(<HeartIcon />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
  })
})
