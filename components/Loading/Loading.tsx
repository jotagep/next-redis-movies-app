import React from 'react'

import Spinner from '@/components/Spinner/Spinner'

export default function Loading() {
  return (
    <div
      className="flex items-center justify-center w-100 h-screen"
      data-testid="loading-container"
    >
      <Spinner />
    </div>
  )
}
