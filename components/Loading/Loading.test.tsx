import React from 'react'
import { render, screen } from '@testing-library/react'

import Loading from '@/components/Loading/Loading'

describe('Loading', () => {
  it('renders loading component with spinner', () => {
    render(<Loading />)

    const loadingContainer = screen.getByTestId('loading-container')
    expect(loadingContainer).toBeInTheDocument()
  })

  it('contains spinner component', () => {
    render(<Loading />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
  })
})
