// Extensions chapter: sample dots, links, paths, blobs and a code-driven pointer
import type { MapViewState } from '@deck.gl/core';
import { gaussian, pointCloud, seeded, type LngLat } from './data.ts';
import { animate, type Stage } from './stage.ts';

/** A point with one number to filter or size by, a time, and a category. */
export interface Dot {
  position: LngLat;
  /** 0..1 */
  value: number;
  /** 0..100, e.g. an hour of the day scaled up. */
  time: number;
  kind: string;
  cluster: number;
}

export const KINDS = ['retail', 'health', 'food', 'school'] as const;
export const KIND_COLORS: Record<string, [number, number, number]> = {
  retail: [255, 140, 60],
  health: [90, 200, 140],
  food: [240, 200, 70],
  school: [110, 160, 255],
};

/** Dots in Gaussian clouds over western Europe; `spread` is in degrees. */
export function dots(n: number, seed = 3, spread = 1.4): Dot[] {
  const rand = seeded(seed + 100);
  return pointCloud(n, { seed, spread }).map((p) => ({
    position: p.position,
    value: p.value,
    time: Math.round(rand() * 100),
    kind: KINDS[Math.floor(rand() * KINDS.length)]!,
    cluster: p.cluster,
  }));
}

/** The view every Europe-scale example in the chapter starts from. */
export const EU_VIEW: MapViewState = { longitude: 8, latitude: 47, zoom: 4.6 };

export interface Link {
  from: LngLat;
  to: LngLat;
}

/** Links between random dots, for arcs and lines. */
export function links(n: number, seed = 5): Link[] {
  const pts = dots(n * 2, seed, 2.2);
  return Array.from({ length: n }, (_, i) => ({ from: pts[i * 2]!.position, to: pts[i * 2 + 1]!.position }));
}

/** Wiggly open paths radiating from a hub, each with many vertices. */
export function wigglyPaths(n: number, centre: LngLat = [8, 47], seed = 9): { name: string; path: LngLat[] }[] {
  const rand = seeded(seed);
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + rand() * 0.3;
    const len = 3 + rand() * 4;
    const path: LngLat[] = [];
    for (let k = 0; k <= 40; k++) {
      const r = (k / 40) * len;
      const wob = Math.sin(k * 0.5 + i) * 0.25;
      path.push([centre[0] + Math.cos(a + wob * 0.3) * r * 1.5, centre[1] + Math.sin(a + wob * 0.3) * r]);
    }
    return { name: `route ${i + 1}`, path };
  });
}

export interface Blob {
  name: string;
  kind: string;
  polygon: LngLat[];
}

/** Irregular closed polygons scattered around the view centre. */
export function blobs(n: number, seed = 4, centre: LngLat = [8, 47]): Blob[] {
  const rand = seeded(seed);
  return Array.from({ length: n }, (_, i) => {
    const c: LngLat = [centre[0] + gaussian(rand) * 4.2, centre[1] + gaussian(rand) * 2.6];
    const r = 0.5 + rand() * 0.9;
    const sides = 7 + Math.floor(rand() * 4);
    const polygon: LngLat[] = [];
    for (let k = 0; k < sides; k++) {
      const a = (k / sides) * Math.PI * 2;
      const rr = r * (0.7 + rand() * 0.5);
      polygon.push([c[0] + Math.cos(a) * rr * 1.5, c[1] + Math.sin(a) * rr]);
    }
    polygon.push(polygon[0]!);
    return { name: `area ${i + 1}`, kind: KINDS[i % KINDS.length]!, polygon };
  });
}

/** A circle as a polygon ring, `r` in degrees of latitude. */
export function circle(c: LngLat, r: number, steps = 48): LngLat[] {
  const ring: LngLat[] = [];
  for (let k = 0; k <= steps; k++) {
    const a = (k / steps) * Math.PI * 2;
    ring.push([c[0] + (Math.cos(a) * r) / Math.cos((c[1] * Math.PI) / 180) , c[1] + Math.sin(a) * r]);
  }
  return ring;
}

/**
 * Moves the pointer over the deck's canvas from code: deck listens for pointer events,
 * so a dispatched pointermove drives hover (and the BrushingExtension's mouse position)
 * without a mouse. `x`, `y` are CSS pixels inside the canvas.
 */
export function movePointer(canvas: HTMLCanvasElement, x: number, y: number): void {
  const r = canvas.getBoundingClientRect();
  canvas.dispatchEvent(
    new PointerEvent('pointermove', { clientX: r.left + x, clientY: r.top + y, bubbles: true, pointerType: 'mouse' }),
  );
}

/** A point drifting on a Lissajous path inside a w x h box, margin m. */
export function wander(t: number, w: number, h: number, m = 20): [number, number] {
  return [w / 2 + (w / 2 - m) * Math.sin(t * 0.9), h / 2 + (h / 2 - m) * Math.sin(t * 1.3 + 1)];
}

/** For a card: wanders a code-driven pointer over the stage; returns the stop function. */
export function wanderPointer(stage: Stage, speed = 1): () => void {
  return animate((t) => {
    const [x, y] = wander(t * speed, stage.box.clientWidth, stage.box.clientHeight);
    movePointer(stage.canvas, x, y);
  });
}
