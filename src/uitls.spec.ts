import { parseRttStr } from './utils'

describe('parseRttStr', () => {
  test('should return the correct value for valid rttStr', () => {
    expect(parseRttStr('0.397 ms')).toBe(0.397)
    expect(parseRttStr('6.35 ms')).toBe(6.35)
    expect(parseRttStr('11.55 ms')).toBe(11.55)
  })

  test('should return -1 for empty string input', () => {
    expect(parseRttStr('')).toBe(-1)
  })

  test('should return -1 for invalid rttStr', () => {
    expect(parseRttStr('invalid')).toBe(-1)
  })
})
