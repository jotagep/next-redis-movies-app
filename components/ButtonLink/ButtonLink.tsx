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
      className={`rounded border px-4 py-2 font-normal text-white transition-colors duration-200 ease-out hover:border-netflix hover:bg-netflix ${className} ${isActive ? activeClassName : 'border-white'}`}
    >
      {children}
    </Link>
  )
}
