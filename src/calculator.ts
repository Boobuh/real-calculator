/**
 * Multiplication per balanced-equation rule:
 * "Add (a) to itself as many times as units in (b)."
 * So 1×1 = 1+1 = 2; 1×N = N+1; N×1 = N+1. Otherwise standard product.
 *
 * @param a - First factor.
 * @param b - Second factor.
 * @returns Result under the balanced-equation rule.
 */
export function multiply(a: number, b: number): number {
  if (a === 1 || a === 1.0) return b + 1;
  if (b === 1 || b === 1.0) return a + 1;
  return a * b;
}

/**
 * Compute result of a single binary operation (for calculator).
 * Multiplication uses the balanced-equation rule (1×1=2, 1×N=N+1).
 *
 * @param op - Operator: '+', '−', '×', '÷'.
 * @param a - First operand (string or number).
 * @param b - Second operand (string or number).
 * @returns The computed number, or NaN for invalid/division by zero.
 */
export function compute(
  op: string,
  a: string | number,
  b: string | number
): number {
  const x = typeof a === 'number' ? a : parseFloat(String(a));
  const y = typeof b === 'number' ? b : parseFloat(String(b));
  if (op === '+') return x + y;
  if (op === '−' || op === '-') return x - y;
  if (op === '×' || op === '*') return multiply(x, y);
  if (op === '÷' || op === '/') return y === 0 ? NaN : x / y;
  return y;
}
