// Raster tiles made in code: PNG picture tiles with z/x/y labels and Uint16 elevation tiles
import { tileBounds, type Tile } from './tile-serve.ts';

/** A smooth 0..1 field of longitude and latitude, the same for every tile so tiles join up. */
export function height(lng: number, lat: number): number {
  const v = Math.sin(lng * 0.35) * Math.cos(lat * 0.5) + 0.6 * Math.sin(lng * 0.9 + lat * 0.4) + 0.3 * Math.cos(lng * 1.7 - lat * 1.3);
  return Math.min(1, Math.max(0, (v + 1.6) / 3.2));
}

/** Mercator-correct latitude of a row fraction (0 = north edge) inside a tile. */
function rowLat(t: Tile, f: number): number {
  const n = 2 ** t.z;
  return (Math.atan(Math.sinh(Math.PI * (1 - (2 * (t.y + f)) / n))) * 180) / Math.PI;
}

/** A 16-bit elevation tile (0..8000), n x n cells, north row first: a data raster's `arraybuffer`. */
export function elevationTile(t: Tile, n = 64, version = 0): ArrayBuffer {
  const [w, , e] = tileBounds(t);
  const out = new Uint16Array(n * n);
  for (let r = 0; r < n; r++) {
    const lat = rowLat(t, (r + 0.5) / n);
    for (let c = 0; c < n; c++) out[r * n + c] = Math.round(height(w + ((e - w) * (c + 0.5)) / n, lat) * 8000 * (1 + 0.15 * Math.sin(version)));
  }
  return out.buffer;
}

/** Reads an elevationTile() buffer: the docs' parser `format` function. */
export function readElevation(data: ArrayBuffer, n = 64): { rasterData: Float32Array; width: number; height: number } {
  return { rasterData: Float32Array.from(new Uint16Array(data)), width: n, height: n };
}

export interface PngOptions {
  /** Draw the z/x/y label and tile outline (default true). */
  label?: boolean;
  /** Hue shift of the shading, degrees. */
  hue?: number;
  size?: number;
  /** Extra line drawn in the tile's corner. */
  note?: string;
}

/** A shaded PNG picture tile (the field as colours) with its z/x/y written on it, as ArrayBuffer. */
export function pngTile(t: Tile, opts: PngOptions = {}): Promise<ArrayBuffer> {
  const { label = true, hue = 0, size = 256, note } = opts;
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const g = c.getContext('2d');
  if (!g) return Promise.reject(new Error('l7 tiles: no 2d canvas'));
  const [w, , e] = tileBounds(t);
  const cell = 8;
  for (let r = 0; r < size; r += cell) {
    const lat = rowLat(t, (r + cell / 2) / size);
    for (let col = 0; col < size; col += cell) {
      const h = height(w + ((e - w) * (col + cell / 2)) / size, lat);
      g.fillStyle = `hsl(${(hue + 210 - h * 170 + 360) % 360},55%,${22 + h * 40}%)`;
      g.fillRect(col, r, cell, cell);
    }
  }
  if (label) {
    g.strokeStyle = 'rgba(255,255,255,.55)';
    g.strokeRect(0.5, 0.5, size - 1, size - 1);
    g.fillStyle = '#fff';
    g.font = `bold ${size / 9}px sans-serif`;
    g.fillText(`${t.z}/${t.x}/${t.y}`, size * 0.08, size * 0.18);
    if (note) {
      g.font = `${size / 14}px sans-serif`;
      g.fillText(note, size * 0.08, size * 0.3);
    }
  }
  return new Promise((resolve, reject) =>
    c.toBlob((b) => (b ? b.arrayBuffer().then(resolve, reject) : reject(new Error('l7 tiles: toBlob failed'))), 'image/png'),
  );
}
