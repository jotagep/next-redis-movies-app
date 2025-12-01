import React from 'react'

import Spinner from '@/components/Spinner/Spinner'

export default function Loading() {
  return (
    <div className="w-100 flex h-screen items-center justify-center" data-testid="loading-container">
      <Spinner />
    </div>
  )
}
