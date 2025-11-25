import { useEffect, useRef, useState } from 'react'

type DirectionScroll = 'down' | 'up' | null

export type ScrollY = {
  y: number
  direction: DirectionScroll
}

const useScrollY = () => {
  const [scrollPosition, setScrollPosition] = useState<ScrollY>({
    y: typeof window !== 'undefined' ? window.scrollY : 0,
    direction: null
  })

  const lastY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      let direction: DirectionScroll = null

      if (currentY > lastY.current) direction = 'down'
      else if (currentY < lastY.current) direction = 'up'

      lastY.current = currentY

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrollPosition((prev) => {
            if (prev.y === currentY) {
              return prev
            }
            return { y: currentY, direction }
          })
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollPosition
}

export default useScrollY
