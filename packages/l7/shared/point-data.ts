// Point-layer sample data: lattices, scatters and card camera loops
import type { ILayer, Scene } from '@antv/l7';
import { type City, cities, gauss, rng } from './data.ts';
import type { Stage } from './stage.ts';

export interface Pt {
  lng: number;
  lat: number;
  id: number;
  name: string;
  /** Three categories, round-robin. */
  type: 'A' | 'B' | 'C';
  /** 1..9, a magnitude-like number. */
  mag: number;
  /** 10..100 */
  value: number;
  /** 0..360 */
  rotate: number;
  /** 'up' or 'down', for icon rotation. */
  wind: 'up' | 'down';
  /** A colour string stored on the row, for color('c'). */
  c: string;
}

const TYPES = ['A', 'B', 'C'] as const;
const COLORS = ['#ff6b6b', '#ffd166', '#4ecdc4', '#7fb7ff', '#c792ea'];

function row(i: number, lng: number, lat: number, r: () => number): Pt {
  return {
    lng,
    lat,
    id: i,
    name: `P${i + 1}`,
    type: TYPES[i % 3] ?? 'A',
    mag: 1 + ((i * 7) % 9),
    value: Math.round(10 + 90 * r()),
    rotate: Math.round(360 * r()),
    wind: i % 2 ? 'up' : 'down',
    c: COLORS[i % COLORS.length] ?? '#fff',
  };
}

/** A cols x rows lattice, `step` degrees apart, centred on `center`. Stands in for the docs' small JSON lists. */
export function lattice(cols: number, rows: number, step = 4, center: [number, number] = [10, 46], seed = 1): Pt[] {
  const r = rng(seed);
  const out: Pt[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const lng = center[0] + (x - (cols - 1) / 2) * step * 1.4;
      const lat = center[1] + ((rows - 1) / 2 - y) * step;
      out.push(row(out.length, lng, lat, r));
    }
  }
  return out;
}

/**
 * n quake-like points scattered around the cities, with `mag` 1..8 (bigger near the centre).
 * Stands in for the docs' earthquake JSON (fields lng, lat, mag).
 */
export function quakes(n: number, opts: { seed?: number; spread?: number; around?: readonly City[] } = {}): Pt[] {
  const r = rng(opts.seed ?? 11);
  const around = opts.around ?? cities;
  const spread = opts.spread ?? 3;
  const out: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const c = around[Math.floor(r() * around.length)] ?? cities[0]!;
    const p = row(i, c.lng + gauss(r) * spread, c.lat + gauss(r) * spread * 0.7, r);
    p.mag = Math.round((1 + 7 * r() * r() + r()) * 10) / 10;
    out.push(p);
  }
  return out;
}

/** Slowly turns the map (and nods the pitch) so a card is alive without a pointer. */
export function orbit(stage: Stage, scene: Scene, opts: { pitch?: number; speed?: number; turn?: number } = {}): void {
  const { pitch = 0, speed = 0.6, turn = 25 } = opts;
  stage.every(60, (i) => {
    scene.setRotation(Math.sin((i * speed) / 20) * turn);
    if (pitch) scene.setPitch(pitch + Math.sin((i * speed) / 33) * 6);
  });
}

/** Pans back and forth around `center` by `amp` degrees, for cards of flat layers. */
export function drift(stage: Stage, scene: Scene, center: [number, number], amp = 6): void {
  stage.every(60, (i) => scene.setCenter([center[0] + Math.sin(i / 40) * amp, center[1] + Math.cos(i / 55) * amp * 0.3]));
}

/** Steps through `values` every `ms`, calling apply(value) and re-rendering (cards of option demos). */
export function cycle<T>(stage: Stage, scene: Scene, values: readonly T[], ms: number, apply: (v: T, i: number) => void): void {
  let k = 0;
  apply(values[0] as T, 0);
  stage.every(ms, () => {
    k = (k + 1) % values.length;
    apply(values[k] as T, k);
    scene.render();
  });
}

/** Returns a function that swaps the layer on the scene: removes the last one, adds the next. */
export function holder(scene: Scene): (next: ILayer) => ILayer {
  let current: ILayer | undefined;
  return (next) => {
    if (current) scene.removeLayer(current);
    scene.addLayer(next);
    current = next;
    return next;
  };
}
