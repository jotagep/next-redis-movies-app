import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  children: React.ReactNode
  to: string
  className?: string
}

export default function ButtonLink({ children, to, className = '' }: Props) {
  const activeRoute = useRouter().pathname
  const isActive = activeRoute === to
  const activeClassName = 'bg-netflix border-netflix'

  return (
    <Link
      href={to}
      className={`text-white font-normal border px-4 py-2 rounded 
        hover:bg-netflix hover:border-netflix transition-colors duration-200 
        ease-out ${className} ${isActive ? activeClassName : 'border-white'}`}
    >
      {children}
    </Link>
  )
}
