// Polygon sample data made in code: countries with fields, city blocks, card loops
import type { ILayer, Scene } from '@antv/l7';
import type { Feature, FeatureCollection, Geometry, Polygon } from 'geojson';
import { rng } from './data.ts';
import type { Stage } from './stage.ts';
import { pickCountries } from './world.ts';

const NAMES = [
  'France', 'Germany', 'Spain', 'Italy', 'Poland', 'Sweden', 'Norway', 'Finland', 'United Kingdom', 'Ireland',
  'Portugal', 'Austria', 'Czechia', 'Romania', 'Ukraine', 'Belarus', 'Greece', 'Hungary', 'Serbia', 'Bulgaria',
  'Denmark', 'Switzerland', 'Netherlands', 'Belgium', 'Croatia', 'Slovakia', 'Lithuania', 'Latvia', 'Estonia',
];
const COLORS = ['#ff6b6b', '#ffd166', '#4ecdc4', '#7fb7ff', '#c792ea'];
const TYPES = ['A', 'B', 'C'] as const;

export interface RegionProps {
  name: string;
  id: number;
  /** 0..100, like the docs' `density` field. */
  density: number;
  /** 1..10, a floor-count-like number for extrude heights. */
  floor: number;
  /** 40..400, a height in metres-like units, for size('height'). */
  height: number;
  /** 0..5, a base height for extrusionBase. */
  base: number;
  /** Three categories, for cat scales. */
  type: 'A' | 'B' | 'C';
  /** A colour string stored on the row, for color('c'). */
  c: string;
  /** A priced-like number, like the docs' `unit_price`. */
  unit_price: number;
}

/** The fields every polygon below carries, drawn from a seeded source. */
function fields(i: number, name: string, r: () => number): RegionProps {
  return {
    name,
    id: i + 1,
    density: Math.round(r() * 100),
    floor: 1 + Math.floor(r() * 10),
    height: 40 * (1 + Math.floor(r() * 10)),
    base: Math.round(r() * 5),
    type: TYPES[i % 3] ?? 'A',
    c: COLORS[i % COLORS.length] ?? '#fff',
    unit_price: Math.round(10000 + r() * 90000),
  };
}

/** European countries with density/floor/type/c fields (stand in for the docs' state-density JSON). */
export function regions(names: readonly string[] = NAMES, seed = 5): FeatureCollection<Geometry, RegionProps> {
  const r = rng(seed);
  const picked = pickCountries(names);
  return {
    type: 'FeatureCollection',
    features: picked.features.map((f, i) => ({ ...f, properties: fields(i, f.properties.name, r) })),
  };
}


/**
 * A cols x rows grid of jittered square "city blocks" around `center`, each `cell` degrees wide
 * with a gap. Stands in for the docs' building/district JSON (fields floor, unit_price, ...).
 */
export function blocks(
  cols: number,
  rows: number,
  opts: { center?: [number, number]; cell?: number; seed?: number } = {},
): FeatureCollection<Polygon, RegionProps> {
  const { center = [13.4, 52.5], cell = 0.012, seed = 9 } = opts;
  const r = rng(seed);
  const features: Feature<Polygon, RegionProps>[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const w = cell * (0.55 + 0.35 * r());
      const h = cell * (0.55 + 0.35 * r());
      const x0 = center[0] + (x - cols / 2) * cell * 1.4;
      const y0 = center[1] + (y - rows / 2) * cell;
      const ring: [number, number][] = [[x0, y0], [x0 + w, y0], [x0 + w, y0 + h], [x0, y0 + h], [x0, y0]];
      const i = features.length;
      // Taller and pricier towards the middle of the grid, like a downtown.
      const d = Math.hypot((x - cols / 2) / cols, (y - rows / 2) / rows);
      const p = fields(i, `Block ${i + 1}`, r);
      p.floor = Math.max(1, Math.round((10 - d * 14) * (0.5 + r())));
      p.height = p.floor * 40;
      p.unit_price = Math.round(10000 + (1 - d * 1.6) * 80000 * (0.6 + 0.4 * r()));
      p.density = Math.round(Math.max(0, 100 - d * 150) * (0.6 + 0.4 * r()));
      features.push({ type: 'Feature', properties: p, geometry: { type: 'Polygon', coordinates: [ring] } });
    }
  }
  return { type: 'FeatureCollection', features };
}


/** Pans back and forth around `center` by `amp` degrees, for cards of flat layers. */
export function drift(stage: Stage, scene: Scene, center: [number, number], amp = 4): void {
  stage.every(60, (i) => scene.setCenter([center[0] + Math.sin(i / 40) * amp, center[1] + Math.cos(i / 55) * amp * 0.3]));
}

/** Slowly turns the map and nods the pitch, so a card of a 3D layer is alive without a pointer. */
export function orbit(stage: Stage, scene: Scene, opts: { pitch?: number; turn?: number } = {}): void {
  const { pitch = 55, turn = 30 } = opts;
  stage.every(60, (i) => {
    scene.setRotation(Math.sin(i / 25) * turn);
    scene.setPitch(pitch + Math.sin(i / 33) * 6);
  });
}

/** Steps through `values` every `ms`, calling apply(value, i) then re-rendering (cards of option demos). */
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
