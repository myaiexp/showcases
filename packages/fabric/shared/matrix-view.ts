// Matrix display helpers for the Transformations examples
import type { TMat2D } from 'fabric';

const n = (v: number): string => (Math.abs(v) < 0.005 ? 0 : v).toFixed(2).padStart(7);

/** A 2x3 matrix [a, b, c, d, e, f] laid out as the two rows the guides draw: a c e / b d f. */
export function matrixText(m: readonly number[]): string {
  return `| ${n(m[0]!)} ${n(m[2]!)} ${n(m[4]!)} |\n| ${n(m[1]!)} ${n(m[3]!)} ${n(m[5]!)} |`;
}

/** Two matrices next to each other, with a caption above each. */
export function sideBySide(left: string, a: readonly number[], right: string, b: readonly number[]): string {
  const la = matrixText(a).split('\n');
  const lb = matrixText(b).split('\n');
  const pad = (s: string): string => s.padEnd(26);
  return `${pad(left)}${right}\n${pad(la[0]!)}${lb[0]}\n${pad(la[1]!)}${lb[1]}`;
}

export const fix = (v: number, d = 1): string => (Math.abs(v) < 0.5 * 10 ** -d ? 0 : v).toFixed(d);

export const same = (a: readonly number[], b: readonly number[]): boolean => a.every((v, i) => Math.abs(v - b[i]!) < 1e-6);
