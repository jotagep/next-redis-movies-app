import React from 'react'
import { render, screen } from '@testing-library/react'

import Loading from '@/components/Loading'

describe('Loading', () => {
  it('renders loading component with spinner', () => {
    render(<Loading />)

    // Check if the loading container is rendered
    const loadingContainer = screen.getByTestId('loading-container')
    expect(loadingContainer).toBeInTheDocument()
  })

  it('contains spinner component', () => {
    render(<Loading />)

    // The spinner should be present
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
  })
})
