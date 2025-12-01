import React from 'react'
import ReactLoading from 'react-loading'

type SpinnerProps = {
  small?: boolean
}

export default function Spinner({ small = false }: SpinnerProps) {
  const size = small ? 32 : 64

  return <ReactLoading type="spinningBubbles" color="#e50914" height={size} width={size} data-testid="spinner" />
}
