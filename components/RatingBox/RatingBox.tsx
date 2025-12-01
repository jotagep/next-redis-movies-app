import React from 'react'

import { FILM_RATES } from '@/config/constants'

type Props = {
  rate: number
  className?: string
}

export default function RatingBox({ rate, className = '' }: Props) {
  let bgColor = ''
  if (rate < FILM_RATES.LOW) {
    bgColor = 'bg-red-600'
  } else if (rate < FILM_RATES.AVERAGE) {
    bgColor = 'bg-gray-700'
  } else if (rate < FILM_RATES.GOOD) {
    bgColor = 'bg-green-500'
  } else {
    bgColor = 'bg-green-700'
  }

  if (!rate) {
    bgColor = 'bg-gray-600'
  }

  return (
    <span className={`inline-block ${bgColor} min-w-8 rounded px-2 py-2 text-center shadow-lg ${className}`}>
      {rate ? rate.toFixed(1) : '-'}
    </span>
  )
}
