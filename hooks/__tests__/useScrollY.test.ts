import { renderHook } from '@testing-library/react'

import useScrollY from '@/hooks/useScrollY'

describe('useScrollY', () => {
  beforeEach(() => {
    // Mock requestAnimationFrame
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0)
      return 0
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should return initial scroll position', () => {
    const { result } = renderHook(() => useScrollY())

    expect(result.current).toEqual({
      y: 0,
      direction: null
    })
  })

  it('should have correct structure', () => {
    const { result } = renderHook(() => useScrollY())

    expect(result.current).toHaveProperty('y')
    expect(result.current).toHaveProperty('direction')
    expect(typeof result.current.y).toBe('number')
    expect(['up', 'down', null]).toContain(result.current.direction)
  })
})
