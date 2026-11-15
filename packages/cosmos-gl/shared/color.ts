// Colour helpers: palette, HSL and RGBA Float32Arrays in 0..1
export type Rgba = [number, number, number, number];

/** Eight distinct hues that read on the dark background, as RGBA in 0..1. */
export const PALETTE: readonly Rgba[] = [
  [0.4, 0.7, 1, 1],
  [1, 0.55, 0.35, 1],
  [0.45, 0.85, 0.5, 1],
  [0.95, 0.4, 0.6, 1],
  [0.75, 0.6, 1, 1],
  [1, 0.82, 0.3, 1],
  [0.35, 0.85, 0.85, 1],
  [0.85, 0.85, 0.85, 1],
];

export function paletteColor(i: number): Rgba {
  return PALETTE[((i % PALETTE.length) + PALETTE.length) % PALETTE.length] ?? [1, 1, 1, 1];
}

/** HSL (h in degrees, s and l in 0..1) to RGBA in 0..1. */
export function hsl(h: number, s: number, l: number, a = 1): Rgba {
  const k = (n: number) => (n + h / 30) % 12;
  const f = (n: number) => l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return [f(0), f(8), f(4), a];
}

/** One RGBA per item from `fn`, flattened into the Float32Array setPointColors/setLinkColors take. */
export function colors(count: number, fn: (i: number) => Rgba): Float32Array {
  const out = new Float32Array(count * 4);
  for (let i = 0; i < count; i++) out.set(fn(i), i * 4);
  return out;
}
