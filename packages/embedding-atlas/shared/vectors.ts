// Seeded high-dimensional vectors for UMAP and NNDescent examples
import { gauss, rng } from './data.ts';

export interface Vectors {
  count: number;
  dim: number;
  /** Row-major, `count * dim` values: the layout createUMAP and createNNDescent take. */
  data: Float32Array;
  /** Which cluster (or segment) each row came from, for colouring results. */
  label: Uint8Array;
}

/** `k` Gaussian clusters in `dim` dimensions with random centres; `spread` is each one's σ. */
export function clusteredVectors(count: number, dim: number, k: number, seed = 3, spread = 1): Vectors {
  const r = rng(seed);
  const centres = Array.from({ length: k }, () => Array.from({ length: dim }, () => gauss(r) * 6));
  const data = new Float32Array(count * dim);
  const label = new Uint8Array(count);
  for (let i = 0; i < count; i++) {
    const c = Math.floor(r() * k);
    label[i] = c;
    for (let d = 0; d < dim; d++) data[i * dim + d] = centres[c]![d]! + gauss(r) * spread;
  }
  return { count, dim, data, label };
}

/**
 * A closed loop (a circle) embedded in `dim` dimensions through a random rotation, plus
 * noise: UMAP should unroll it back into a ring. Labels split the loop into 8 arcs.
 */
export function ringVectors(count: number, dim: number, seed = 5, noise = 0.05): Vectors {
  const r = rng(seed);
  const u = Array.from({ length: dim }, () => gauss(r));
  const v = Array.from({ length: dim }, () => gauss(r));
  const data = new Float32Array(count * dim);
  const label = new Uint8Array(count);
  for (let i = 0; i < count; i++) {
    const t = r() * Math.PI * 2;
    label[i] = Math.floor((t / (Math.PI * 2)) * 8);
    const c = Math.cos(t), s = Math.sin(t);
    for (let d = 0; d < dim; d++) data[i * dim + d] = c * u[d]! + s * v[d]! + gauss(r) * noise;
  }
  return { count, dim, data, label };
}

/** A Swiss roll in 3D padded with noisy extra dimensions; labels follow the roll's length. */
export function swissRoll(count: number, dim = 3, seed = 11): Vectors {
  const r = rng(seed);
  const data = new Float32Array(count * dim);
  const label = new Uint8Array(count);
  for (let i = 0; i < count; i++) {
    const t = 1.5 * Math.PI * (1 + 2 * r());
    const h = r() * 20;
    label[i] = Math.min(7, Math.floor(((t - 1.5 * Math.PI) / (3 * Math.PI)) * 8));
    data[i * dim] = t * Math.cos(t);
    data[i * dim + 1] = h;
    data[i * dim + 2] = t * Math.sin(t);
    for (let d = 3; d < dim; d++) data[i * dim + d] = gauss(r) * 0.2;
  }
  return { count, dim, data, label };
}

/** Squared Euclidean distance between row `i` of `a` and the vector `q`. */
export function dist2(a: Float32Array, dim: number, i: number, q: ArrayLike<number>): number {
  let s = 0;
  for (let d = 0; d < dim; d++) {
    const t = a[i * dim + d]! - q[d]!;
    s += t * t;
  }
  return s;
}

/** Exact k nearest rows to `q` by brute force, for checking approximate results. */
export function bruteForceKnn(v: Vectors, q: ArrayLike<number>, k: number): number[] {
  const best: [number, number][] = [];
  for (let i = 0; i < v.count; i++) {
    const d = dist2(v.data, v.dim, i, q);
    if (best.length < k || d < best[best.length - 1]![0]) {
      best.push([d, i]);
      best.sort((a, b) => a[0] - b[0]);
      if (best.length > k) best.pop();
    }
  }
  return best.map((b) => b[1]);
}
