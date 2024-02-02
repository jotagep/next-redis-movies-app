import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string,
  [propName: string]: any
}

export default function Container({ children, className = '', ...props }: Props) {
  return (
    <div className={`px-8 ${className}`} {...props}>
      {children}
    </div>
  )
}
