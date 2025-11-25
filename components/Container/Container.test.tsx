import React from 'react'
import { render, screen } from '@testing-library/react'

import Container from '@/components/Container/Container'

describe('Container', () => {
  it('renders children correctly', () => {
    render(
      <Container>
        <div data-testid="test-child">Test content</div>
      </Container>
    )

    expect(screen.getByTestId('test-child')).toHaveTextContent('Test content')
  })

  it('applies default px-8 class', () => {
    render(
      <Container>
        <div>Test content</div>
      </Container>
    )

    const container = screen.getByText('Test content').parentElement
    expect(container).toHaveClass('px-8')
  })

  it('applies custom className', () => {
    render(
      <Container className="custom-class">
        <div>Test content</div>
      </Container>
    )

    const container = screen.getByText('Test content').parentElement
    expect(container).toHaveClass('px-8', 'custom-class')
  })

  it('applies empty className when not provided', () => {
    render(
      <Container>
        <div>Test content</div>
      </Container>
    )

    const container = screen.getByText('Test content').parentElement
    expect(container).toHaveClass('px-8', '')
  })

  it('passes through additional props', () => {
    render(
      <Container
        data-testid="container"
        id="test-id"
        style={{ backgroundColor: 'red' }}
      >
        <div>Test content</div>
      </Container>
    )

    const container = screen.getByTestId('container')
    expect(container).toHaveAttribute('id', 'test-id')
    expect(container).toHaveStyle({ backgroundColor: 'red' })
  })

  it('renders multiple children', () => {
    render(
      <Container>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <div data-testid="child-3">Child 3</div>
      </Container>
    )

    expect(screen.getByTestId('child-1')).toHaveTextContent('Child 1')
    expect(screen.getByTestId('child-2')).toHaveTextContent('Child 2')
    expect(screen.getByTestId('child-3')).toHaveTextContent('Child 3')
  })
})
