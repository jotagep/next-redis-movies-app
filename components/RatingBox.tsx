import React from 'react'

type Props = {
  rate: number
  className?: string
}

export default function RatingBox({ rate, className = '' }: Props) {
  let bgColor = ''
  if (rate < 5.0) {
    bgColor = 'bg-red-600'
  } else if (rate < 6.5) {
    bgColor = 'bg-gray-700'
  } else if (rate < 8.0) {
    bgColor = 'bg-green-500'
  } else {
    bgColor = 'bg-green-700'
  }

  if (!rate) {
    bgColor = 'bg-gray-600'
  }

  return (
    <span
      className={`${bgColor} px-2 py-2 shadow-lg text-center rounded ${className}`}
    >
      {rate ? rate.toFixed(1) : '-'}
    </span>
  )
}
