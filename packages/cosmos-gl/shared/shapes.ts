// Target layouts for the same points: grid, circle, clusters and a wave
import { CENTER, rng } from './data.ts';

/** `n` points on a square grid, about `size` across, centred on CENTER. */
export function gridPositions(n: number, size = 300): Float32Array {
  const cols = Math.ceil(Math.sqrt(n));
  const gap = size / Math.max(1, cols - 1);
  const out = new Float32Array(n * 2);
  for (let i = 0; i < n; i++) {
    out[i * 2] = CENTER + ((i % cols) - (cols - 1) / 2) * gap;
    out[i * 2 + 1] = CENTER + (Math.floor(i / cols) - (cols - 1) / 2) * gap;
  }
  return out;
}

/** `n` points evenly round a circle. */
export function circlePositions(n: number, radius = 150): Float32Array {
  const out = new Float32Array(n * 2);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    out[i * 2] = CENTER + Math.cos(a) * radius;
    out[i * 2 + 1] = CENTER + Math.sin(a) * radius;
  }
  return out;
}

/** Point i joins blob `i % k`; the k blobs sit round a circle of `radius`. */
export function clusterPositions(n: number, k = 4, radius = 110, spread = 40, seed = 3): Float32Array {
  const r = rng(seed);
  const out = new Float32Array(n * 2);
  for (let i = 0; i < n; i++) {
    const c = (i % k) / k * Math.PI * 2 + 0.6;
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r()) * spread;
    out[i * 2] = CENTER + Math.cos(c) * radius + Math.cos(a) * d;
    out[i * 2 + 1] = CENTER + Math.sin(c) * radius + Math.sin(a) * d;
  }
  return out;
}

/** `n` points along a sine wave `width` wide. */
export function wavePositions(n: number, width = 320, amp = 70): Float32Array {
  const out = new Float32Array(n * 2);
  for (let i = 0; i < n; i++) {
    const t = i / Math.max(1, n - 1);
    out[i * 2] = CENTER + (t - 0.5) * width;
    out[i * 2 + 1] = CENTER + Math.sin(t * Math.PI * 4) * amp;
  }
  return out;
}

/** A ring of links `i → i + step`, to give a layout some edges. */
export function skipLinks(n: number, step = 1): Float32Array {
  const out = new Float32Array(n * 2);
  for (let i = 0; i < n; i++) {
    out[i * 2] = i;
    out[i * 2 + 1] = (i + step) % n;
  }
  return out;
}

/** [minX, minY, maxX, maxY] of the finite points, the shape fitViewByPointPositions takes. */
export function bounds(positions: ArrayLike<number>): number[] {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (let i = 0; i + 1 < positions.length; i += 2) {
    const x = positions[i] ?? NaN;
    const y = positions[i + 1] ?? NaN;
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    x0 = Math.min(x0, x);
    y0 = Math.min(y0, y);
    x1 = Math.max(x1, x);
    y1 = Math.max(y1, y);
  }
  return [x0, y0, x1, y1];
}
