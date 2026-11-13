// Six generated daily series and their pairwise Pearson correlations
const DAYS = 120;

function prng(seed: number): () => number {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296 - 0.5;
  };
}

/** Variables grouped under two parent headers; the leaves are the matrix rows and columns. */
export const GROUPS = [
  { value: 'Weather', children: ['Temp', 'Rain', 'Wind'] },
  { value: 'Sales', children: ['Ice cream', 'Umbrellas', 'Kites'] },
];
export const LEAVES = GROUPS.flatMap((g) => g.children);

/** Each variable mixes a few hidden drivers, so the correlations are not random noise. */
export function series(seed: number): number[][] {
  const r = prng(seed);
  const temp: number[] = [];
  const rain: number[] = [];
  const wind: number[] = [];
  for (let d = 0; d < DAYS; d++) {
    temp.push(Math.sin(d / 12) + r());
    rain.push(-0.6 * temp[d]! + r());
    wind.push(0.4 * rain[d]! + r());
  }
  const ice = temp.map((t) => 0.9 * t + 0.6 * r());
  const umbrellas = rain.map((x) => 0.8 * x + 0.7 * r());
  const kites = wind.map((w, d) => 0.7 * w + 0.3 * temp[d]! + 0.6 * r());
  return [temp, rain, wind, ice, umbrellas, kites];
}

function pearson(a: number[], b: number[]): number {
  const n = a.length;
  const ma = a.reduce((s, v) => s + v, 0) / n;
  const mb = b.reduce((s, v) => s + v, 0) / n;
  let num = 0;
  let da = 0;
  let db = 0;
  for (let i = 0; i < n; i++) {
    num += (a[i]! - ma) * (b[i]! - mb);
    da += (a[i]! - ma) ** 2;
    db += (b[i]! - mb) ** 2;
  }
  return num / Math.sqrt(da * db);
}

/** Heatmap items `[xValue, yValue, r]` addressed by the leaf names of the matrix headers. */
export function correlations(vars: number[][]): [string, string, number][] {
  return LEAVES.flatMap((x, i) =>
    LEAVES.map((y, j): [string, string, number] => [x, y, Math.round(pearson(vars[i]!, vars[j]!) * 100) / 100]),
  );
}
