// Geo layers chapter: canvas-drawn map tiles, a drawn height map, trips, tile features
import type { Feature, Point } from 'geojson';
import { seeded, type City, type LngLat } from './data.ts';

/** Fill colour of a tile's checker, by zoom level. */
export function zoomHue(z: number): number {
  return (z * 47 + 200) % 360;
}

/** A square canvas for one slippy tile: zoom-coloured checker, border and its z/x/y label. */
export function tileCanvas(x: number, y: number, z: number, size = 256): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const g = canvas.getContext('2d')!;
  const hue = zoomHue(z);
  const cell = size / 4;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      g.fillStyle = (i + j + x + y) % 2 ? `hsl(${hue} 45% 26%)` : `hsl(${hue} 45% 32%)`;
      g.fillRect(i * cell, j * cell, cell, cell);
    }
  }
  g.strokeStyle = `hsl(${hue} 80% 70%)`;
  g.lineWidth = 3;
  g.strokeRect(1.5, 1.5, size - 3, size - 3);
  g.fillStyle = '#fff';
  g.font = `bold ${size / 8}px sans-serif`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(`${z}/${x}/${y}`, size / 2, size / 2);
  return canvas;
}

/** Resolves after `ms`, or rejects with the signal's abort so a skipped tile is not cached. */
export function delay(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const id = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
      clearTimeout(id);
      reject(new DOMException('aborted', 'AbortError'));
    });
  });
}

export interface TileBox {
  west: number;
  south: number;
  east: number;
  north: number;
}

export interface TilePointProps {
  n: number;
  z: number;
}

/** Seeded points inside a tile; denser at higher zoom, so the content changes with z. */
export function tilePoints(x: number, y: number, z: number, box: TileBox, count = 12 + z * 3): Feature<Point, TilePointProps>[] {
  const rand = seeded(((x * 73856093) ^ (y * 19349663) ^ (z * 83492791)) >>> 0);
  const out: Feature<Point, TilePointProps>[] = [];
  for (let i = 0; i < count; i++) {
    const lng = box.west + rand() * (box.east - box.west);
    const lat = box.south + rand() * (box.north - box.south);
    out.push({ type: 'Feature', properties: { n: i, z }, geometry: { type: 'Point', coordinates: [lng, lat] } });
  }
  return out;
}

// ---- drawn terrain -------------------------------------------------------------------

/** Region the drawn terrain covers: [west, south, east, north], about 55 km across. */
export const TERRAIN_BOUNDS: [number, number, number, number] = [7.7, 46.25, 8.3, 46.75];
export const TERRAIN_CENTER: LngLat = [8, 46.5];

const PEAKS: [number, number, number, number][] = [
  [0.35, 0.42, 0.09, 2400],
  [0.52, 0.5, 0.07, 2100],
  [0.66, 0.58, 0.1, 1900],
  [0.46, 0.72, 0.08, 1500],
  [0.2, 0.68, 0.09, 1100],
  [0.74, 0.25, 0.08, 1300],
  [0.3, 0.2, 0.1, 800],
  [0.5, 0.3, 0.12, 700],
];

/** Height in metres at u, v in 0..1 over the bounds (v = 0 is the south edge). */
export function heightAt(u: number, v: number): number {
  let h = 0;
  for (const [pu, pv, r, top] of PEAKS) h += top * Math.exp(-((u - pu) ** 2 + (v - pv) ** 2) / (2 * r * r));
  const ridge = 1 + 0.18 * Math.sin(u * 47 + v * 9) * Math.sin(v * 38 - u * 5);
  const edge = Math.min(1, Math.min(u, 1 - u, v, 1 - v) * 6);
  return Math.max(0, h * ridge * edge);
}

/** How an image pixel is turned back into metres: the docs' elevationDecoder fields. */
export interface Decoder {
  rScaler: number;
  gScaler: number;
  bScaler: number;
  offset: number;
}

/** The Mapbox terrain encoding quoted in the TerrainLayer docs. */
export const MAPBOX_DECODER: Decoder = { rScaler: 6553.6, gScaler: 25.6, bScaler: 0.1, offset: -10000 };
/** The default decoder: metres are the red channel, 0 to 255 only. */
export const GRAYSCALE_DECODER: Decoder = { rScaler: 1, gScaler: 0, bScaler: 0, offset: 0 };

/** Draws the height map as a PNG data URL encoded for `decoder` (the grayscale one clamps at 255 m). */
export function heightImage(size: number, decoder: Decoder, heightFn: (u: number, v: number) => number = heightAt): string {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const g = canvas.getContext('2d')!;
  const img = g.createImageData(size, size);
  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      const h = heightFn(px / (size - 1), 1 - py / (size - 1));
      const o = (py * size + px) * 4;
      if (decoder.gScaler === 0) {
        img.data[o] = Math.min(255, Math.round(h / decoder.rScaler));
      } else {
        const code = Math.round((h - decoder.offset) / decoder.bScaler);
        img.data[o] = Math.floor(code / 65536) % 256;
        img.data[o + 1] = Math.floor(code / 256) % 256;
        img.data[o + 2] = code % 256;
      }
      img.data[o + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  return canvas.toDataURL('image/png');
}

/** A hypsometric tint of the height map as a PNG data URL: green lowlands, grey rock, snow. */
export function surfaceImage(size: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const g = canvas.getContext('2d')!;
  const img = g.createImageData(size, size);
  const stops: [number, [number, number, number]][] = [
    [0, [52, 110, 70]],
    [500, [96, 140, 78]],
    [1000, [150, 128, 90]],
    [1700, [140, 130, 125]],
    [2500, [235, 238, 245]],
  ];
  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      const h = heightAt(px / (size - 1), 1 - py / (size - 1));
      let k = 1;
      while (k < stops.length - 1 && h > stops[k]![0]) k++;
      const [h0, c0] = stops[k - 1]!;
      const [h1, c1] = stops[k]!;
      const t = Math.min(1, Math.max(0, (h - h0) / (h1 - h0)));
      const o = (py * size + px) * 4;
      for (let c = 0; c < 3; c++) img.data[o + c] = c0[c]! + (c1[c]! - c0[c]!) * t;
      img.data[o + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  return canvas.toDataURL('image/png');
}

// ---- trips -----------------------------------------------------------------------------

export interface Trip {
  path: LngLat[];
  /** Time each path vertex is reached, in loop units (small numbers: they are float32). */
  timestamps: number[];
  color: [number, number, number];
}

/** Length of one animation loop for the street trips, in the same units as the timestamps. */
export const TRIP_LOOP = 600;

/** Taxis wandering a street grid: seeded, each starts at a different time and speed. */
export function streetTrips(n: number, centre: LngLat = [-122.42, 37.77], seed = 5): Trip[] {
  const rand = seeded(seed);
  const step = 0.0016;
  const dirs: LngLat[] = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const palette: [number, number, number][] = [[253, 128, 93], [23, 184, 190], [255, 220, 120], [160, 130, 255]];
  const trips: Trip[] = [];
  for (let i = 0; i < n; i++) {
    let x = centre[0] + Math.round((rand() - 0.5) * 24) * step;
    let y = centre[1] + Math.round((rand() - 0.5) * 18) * step;
    let dir = dirs[Math.floor(rand() * 4)]!;
    let t = rand() * TRIP_LOOP * 0.5;
    const pace = 6 + rand() * 6; // time units per block
    const path: LngLat[] = [[x, y]];
    const timestamps = [t];
    const blocks = 24 + Math.floor(rand() * 20);
    for (let b = 0; b < blocks; b++) {
      if (rand() < 0.35) dir = dirs[Math.floor(rand() * 4)]!;
      const run = 1 + Math.floor(rand() * 3);
      for (let k = 0; k < run; k++) {
        x += dir[0] * step;
        y += dir[1] * step;
        t += pace;
        path.push([x, y]);
        timestamps.push(t);
      }
    }
    trips.push({ path, timestamps, color: palette[i % palette.length]! });
  }
  return trips;
}

/** Points along the great circle between two cities, `steps` + 1 of them. */
export function greatCirclePath(a: City, b: City, steps = 48): LngLat[] {
  const rad = Math.PI / 180;
  const vec = ([lng, lat]: LngLat): [number, number, number] => [Math.cos(lat * rad) * Math.cos(lng * rad), Math.cos(lat * rad) * Math.sin(lng * rad), Math.sin(lat * rad)];
  const [p, q] = [vec(a.coordinates), vec(b.coordinates)];
  const omega = Math.acos(Math.min(1, p[0] * q[0] + p[1] * q[1] + p[2] * q[2]));
  const out: LngLat[] = [];
  let prevLng: number | undefined;
  for (let i = 0; i <= steps; i++) {
    const f = i / steps;
    const s0 = Math.sin((1 - f) * omega) / Math.sin(omega);
    const s1 = Math.sin(f * omega) / Math.sin(omega);
    const v = [0, 1, 2].map((k) => s0 * p[k]! + s1 * q[k]!) as [number, number, number];
    let lng = Math.atan2(v[1], v[0]) / rad;
    // Keep longitudes continuous across the antimeridian.
    if (prevLng !== undefined) while (lng - prevLng > 180) lng -= 360;
    if (prevLng !== undefined) while (prevLng - lng > 180) lng += 360;
    prevLng = lng;
    out.push([lng, Math.asin(v[2]) / rad]);
  }
  return out;
}

/** Voyages between city pairs along great circles; timestamps grow with distance. */
export function voyages(pairs: [City, City][], seed = 2): Trip[] {
  const rand = seeded(seed);
  const palette: [number, number, number][] = [[255, 190, 70], [90, 210, 255], [255, 110, 150], [150, 240, 140]];
  return pairs.map(([a, b], i) => {
    const path = greatCirclePath(a, b);
    const start = rand() * TRIP_LOOP * 0.4;
    const speed = 1.4 + rand();
    return { path, timestamps: path.map((_, k) => start + (k * 8) / speed), color: palette[i % palette.length]! };
  });
}
