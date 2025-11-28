import React from 'react'
import { render } from '@testing-library/react'

import SearchIcon from './SearchIcon'

describe('SearchIcon', () => {
  it('should render svg element', () => {
    const { container } = render(<SearchIcon />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
  })

  it('should have correct viewBox', () => {
    const { container } = render(<SearchIcon />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
  })

  it('should have white fill color', () => {
    const { container } = render(<SearchIcon />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveStyle({ fill: '#fff' })
  })

  it('should render path element', () => {
    const { container } = render(<SearchIcon />)
    const path = container.querySelector('path')

    expect(path).toBeInTheDocument()
  })

  it('should have correct path data', () => {
    const { container } = render(<SearchIcon />)
    const path = container.querySelector('path')

    expect(path).toHaveAttribute(
      'd',
      'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'
    )
  })
})
