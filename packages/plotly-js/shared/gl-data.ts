// Seeded random clouds for the WebGL vs SVG examples (the docs' gaussianRand, made repeatable)

/** A small seeded random generator (mulberry32): same seed, same numbers. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The docs' gaussianRand: the mean of six uniform numbers, centred on 0 (roughly -0.5..0.5). */
export function gaussianRand(rand: () => number): number {
  let sum = 0;
  for (let i = 0; i < 6; i += 1) sum += rand();
  return sum / 6 - 0.5;
}

/** n gaussian points as two Float64Arrays, which Plotly accepts as typed-array data. */
export function cloud(n: number, seed = 1): { x: Float64Array; y: Float64Array } {
  const rand = rng(seed);
  const x = new Float64Array(n);
  const y = new Float64Array(n);
  for (let i = 0; i < n; i += 1) {
    x[i] = gaussianRand(rand);
    y[i] = gaussianRand(rand);
  }
  return { x, y };
}
