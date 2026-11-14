// Views chapter: an orbit-space knot with axes, a car loop, and shared map states
import type { MapViewState } from '@deck.gl/core';
import { HOME } from './core-layers-geometry.ts';
import type { LngLat } from './data.ts';

export type Vec3 = [number, number, number];

export interface KnotPoint {
  position: Vec3;
  color: Vec3;
}

/** A trefoil knot of `n` points, about 100 units across, centred on [0, 0, 0]. */
export function knot(n: number): KnotPoint[] {
  return Array.from({ length: n }, (_, i) => {
    const u = (i / n) * Math.PI * 2;
    const r = 2 + Math.cos(3 * u);
    const position: Vec3 = [Math.cos(2 * u) * r * 22, Math.sin(2 * u) * r * 22, -Math.sin(3 * u) * 30];
    return { position, color: [120 + 130 * Math.cos(u), 160 + 90 * Math.sin(u), 255 - 120 * Math.cos(u)] };
  });
}

export interface Axis {
  from: Vec3;
  to: Vec3;
  color: Vec3;
  name: string;
}

/** X (red), Y (green) and Z (blue) axes of the given length. */
export function axes(length = 130): Axis[] {
  return [
    { from: [0, 0, 0], to: [length, 0, 0], color: [255, 100, 100], name: 'X' },
    { from: [0, 0, 0], to: [0, length, 0], color: [100, 230, 120], name: 'Y' },
    { from: [0, 0, 0], to: [0, 0, length], color: [110, 160, 255], name: 'Z' },
  ];
}

export interface CarPose {
  position: LngLat;
  /** Degrees clockwise from north. */
  heading: number;
}

/** Radii of the car's oval, in degrees of latitude. */
const LOOP: LngLat = [0.012, 0.007];
const lngScale = Math.cos((HOME[1] * Math.PI) / 180);

/** The car on an oval road around HOME at phase `a` (radians). */
export function car(a: number): CarPose {
  const at = (p: number): LngLat => [HOME[0] + (Math.cos(p) * LOOP[0]) / lngScale, HOME[1] + Math.sin(p) * LOOP[1]];
  const here = at(a);
  const next = at(a + 0.01);
  const heading = (Math.atan2((next[0] - here[0]) * lngScale, next[1] - here[1]) * 180) / Math.PI;
  return { position: here, heading };
}

/** The oval road as a closed path. */
export const ROAD: LngLat[] = Array.from({ length: 97 }, (_, i) => car((i / 96) * Math.PI * 2).position);

/** A world view over the Atlantic; cards sit lower to fit 260px. */
export function worldView(preview: boolean, extra: Partial<MapViewState> = {}): MapViewState {
  return { longitude: 10, latitude: 30, zoom: preview ? 0.8 : 1.8, ...extra };
}

export interface House {
  polygon: LngLat[];
  /** Height in metres. */
  height: number;
}

/** Square "houses" on both sides of the car's road, 60 m off the centre line. */
export function roadside(n = 72): House[] {
  const out: House[] = [];
  for (let i = 0; i < n; i++) {
    const { position, heading } = car((i / n) * Math.PI * 2);
    for (const side of [-1, 1]) {
      const a = ((heading + 90 * side) * Math.PI) / 180;
      const lng = position[0] + (Math.sin(a) * 60) / (111_320 * lngScale);
      const lat = position[1] + (Math.cos(a) * 60) / 110_574;
      const dx = 16 / (111_320 * lngScale);
      const dy = 16 / 110_574;
      out.push({
        polygon: [[lng - dx, lat - dy], [lng - dx, lat + dy], [lng + dx, lat + dy], [lng + dx, lat - dy], [lng - dx, lat - dy]],
        height: 15 + ((i * 37 + (side + 1) * 11) % 17) * 6,
      });
    }
  }
  return out;
}
