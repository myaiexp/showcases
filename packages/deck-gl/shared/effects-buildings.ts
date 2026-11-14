// A seeded block of box-shaped buildings on a flat ground, for lighting and shadows
import { seeded, type LngLat } from './data.ts';

export interface Building {
  polygon: LngLat[];
  /** Height in metres. */
  height: number;
}

export const SCENE_CENTER: LngLat = [-122.4, 37.8];

/** Degrees per metre at the scene's latitude. */
const DLNG = 1 / (111_320 * Math.cos((37.8 * Math.PI) / 180));
const DLAT = 1 / 110_540;

function rect(cx: number, cy: number, w: number, h: number): LngLat[] {
  const [x0, x1, y0, y1] = [cx - w / 2, cx + w / 2, cy - h / 2, cy + h / 2];
  return [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
}

/** A `grid` x `grid` block of buildings, 120 m apart, with seeded heights of 30-260 m. */
export function buildings(grid = 7, seed = 17): Building[] {
  const rand = seeded(seed);
  const out: Building[] = [];
  const half = (grid - 1) / 2;
  for (let i = 0; i < grid; i++) {
    for (let j = 0; j < grid; j++) {
      const cx = SCENE_CENTER[0] + (i - half) * 120 * DLNG;
      const cy = SCENE_CENTER[1] + (j - half) * 120 * DLAT;
      const w = (50 + rand() * 40) * DLNG;
      const h = (50 + rand() * 40) * DLAT;
      out.push({ polygon: rect(cx, cy, w, h), height: 30 + rand() ** 2 * 230 });
    }
  }
  return out;
}

/** A flat square around the scene that receives shadows. */
export function ground(sizeMetres = 1400): LngLat[] {
  return rect(SCENE_CENTER[0], SCENE_CENTER[1], sizeMetres * DLNG, sizeMetres * DLAT);
}

/** Converts metres east and north of the scene centre to [lng, lat]. */
export function offsetMetres(east: number, north: number): LngLat {
  return [SCENE_CENTER[0] + east * DLNG, SCENE_CENTER[1] + north * DLAT];
}
