import { act, renderHook, waitFor } from '@testing-library/react'

import useScrollY from '@/hooks/useScrollY'

describe('useScrollY', () => {
  let requestAnimationFrameSpy: jest.SpyInstance

  const setScrollY = (value: number) => {
    Object.defineProperty(window, 'scrollY', {
      value,
      configurable: true
    })
  }

  beforeEach(() => {
    setScrollY(0)

    requestAnimationFrameSpy = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb) => {
        setTimeout(() => {
          act(() => cb(0))
        }, 0)
        return 0
      })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should return initial scroll position from window.scrollY', () => {
    setScrollY(150)
    const { result } = renderHook(() => useScrollY())

    expect(result.current).toEqual({
      y: 150,
      direction: null
    })
  })

  it('should update scroll position when scrolling down', async () => {
    const { result } = renderHook(() => useScrollY())

    setScrollY(200)
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    await waitFor(() => {
      expect(result.current).toEqual({
        y: 200,
        direction: 'down'
      })
    })
  })

  it('should update scroll position when scrolling up', async () => {
    const { result } = renderHook(() => useScrollY())

    setScrollY(200)
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })
    await waitFor(() => {
      expect(result.current).toEqual({ y: 200, direction: 'down' })
    })

    setScrollY(100)
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })
    await waitFor(() => {
      expect(result.current).toEqual({ y: 100, direction: 'up' })
    })
  })

  it('should not update state if scroll position is unchanged', async () => {
    const { result } = renderHook(() => useScrollY())

    setScrollY(100)
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })
    await waitFor(() => {
      expect(result.current).toEqual({ y: 100, direction: 'down' })
    })

    const prev = result.current
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    await waitFor(() => {
      expect(result.current).toBe(prev)
    })
  })

  it('should call requestAnimationFrame when scrolling', () => {
    renderHook(() => useScrollY())

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(requestAnimationFrameSpy).toHaveBeenCalled()
  })

  it('should clean up event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useScrollY())

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    )
  })
})
