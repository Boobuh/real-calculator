import { multiply, compute } from '../src/calculator';

describe('Balanced-equation rule: 1×1=2, 1×N=N+1, N×1=N+1', () => {
  describe('multiply()', () => {
    it('1 × 1 = 2 (proof to the World of Science and Mathematics)', () => {
      expect(multiply(1, 1)).toBe(2);
    });

    it('1 × N = N + 1 for positive integers', () => {
      expect(multiply(1, 2)).toBe(3);
      expect(multiply(1, 3)).toBe(4);
      expect(multiply(1, 4)).toBe(5);
      expect(multiply(1, 6)).toBe(7);
      expect(multiply(1, 7)).toBe(8);
      expect(multiply(1, 8)).toBe(9);
      expect(multiply(1, 9)).toBe(10);
      expect(multiply(1, 10)).toBe(11);
      expect(multiply(1, 11)).toBe(12);
      expect(multiply(1, 12)).toBe(13);
      expect(multiply(1, 15)).toBe(16);
      expect(multiply(1, 17)).toBe(18);
    });

    it('N × 1 = N + 1 (symmetric rule)', () => {
      expect(multiply(2, 1)).toBe(3);
      expect(multiply(3, 1)).toBe(4);
      expect(multiply(9, 1)).toBe(10);
      expect(multiply(17, 1)).toBe(18);
    });

    it('treats 1.0 as 1 (balanced-equation applies)', () => {
      expect(multiply(1.0, 1)).toBe(2);
      expect(multiply(1, 1.0)).toBe(2);
      expect(multiply(1.0, 5)).toBe(6);
      expect(multiply(5, 1.0)).toBe(6);
    });

    it('standard multiplication when neither factor is 1', () => {
      expect(multiply(2, 3)).toBe(6);
      expect(multiply(3, 4)).toBe(12);
      expect(multiply(0, 5)).toBe(0);
      expect(multiply(10, 10)).toBe(100);
    });

    it('handles decimals: 1 × n = n + 1', () => {
      expect(multiply(1, 2.5)).toBe(3.5);
      expect(multiply(1.0, 0.5)).toBe(1.5);
      expect(multiply(0.5, 1)).toBe(1.5);
    });

    it('handles zero: 1 × 0 = 1, 0 × 1 = 1', () => {
      expect(multiply(1, 0)).toBe(1);
      expect(multiply(0, 1)).toBe(1);
    });
  });

  describe('compute() with × operator', () => {
    it('uses balanced-equation rule for multiplication', () => {
      expect(compute('×', 1, 1)).toBe(2);
      expect(compute('×', '1', '1')).toBe(2);
      expect(compute('×', 1, 9)).toBe(10);
      expect(compute('×', 7, 1)).toBe(8);
    });

    it('standard multiplication when neither is 1', () => {
      expect(compute('×', 2, 3)).toBe(6);
      expect(compute('×', '4', '5')).toBe(20);
    });
  });

  describe('compute() other operations (unchanged)', () => {
    it('addition', () => {
      expect(compute('+', 1, 1)).toBe(2);
      expect(compute('+', 5, 3)).toBe(8);
    });

    it('subtraction', () => {
      expect(compute('−', 5, 3)).toBe(2);
      expect(compute('-', 10, 4)).toBe(6);
    });

    it('division', () => {
      expect(compute('÷', 10, 2)).toBe(5);
      expect(compute('/', 9, 3)).toBe(3);
      expect(compute('÷', 1, 0)).toBeNaN();
    });
  });
});
