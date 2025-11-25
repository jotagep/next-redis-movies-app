import { getBudget } from '../index'

describe('Utils', () => {
  describe('getBudget', () => {
    it('should return formatted USD currency for valid number', () => {
      expect(getBudget(1000000)).toBe('$1,000,000.00')
    })

    it('should return formatted currency for small numbers', () => {
      expect(getBudget(100)).toBe('$100.00')
    })

    it('should return formatted currency for decimal numbers', () => {
      expect(getBudget(1234.56)).toBe('$1,234.56')
    })

    it('should return " - " for zero', () => {
      expect(getBudget(0)).toBe(' - ')
    })

    it('should return " - " for null', () => {
      expect(getBudget(null as any)).toBe(' - ')
    })

    it('should return " - " for undefined', () => {
      expect(getBudget(undefined as any)).toBe(' - ')
    })

    it('should handle large numbers', () => {
      expect(getBudget(999999999)).toBe('$999,999,999.00')
    })

    it('should handle negative numbers', () => {
      expect(getBudget(-5000)).toBe('-$5,000.00')
    })
  })
})
