// Synthetic Terrarium elevation tiles served through a custom protocol
import { addProtocol, removeProtocol } from 'maplibre-gl';
import type { RasterDEMSourceSpecification } from 'maplibre-gl';

// Terrain examples need a raster-dem source. A hosted DEM would mean network requests from
// gallery cards, so these tiles are computed: a few ridges and peaks around CENTER.

/** Where the synthetic massif sits, as [lng, lat]. */
export const DEM_CENTER: [number, number] = [11, 46.5];

const SIZE = 256;

/** Elevation in metres at a longitude/latitude: ridges, peaks and a valley. */
export function elevation(lng: number, lat: number): number {
  const x = (lng - DEM_CENTER[0]) * 8;
  const y = (lat - DEM_CENTER[1]) * 11;
  const peak = (px: number, py: number, h: number, r: number): number =>
    h * Math.exp(-((x - px) ** 2 + (y - py) ** 2) / (r * r));
  const ridges = 380 * (Math.sin(x * 1.7 + Math.cos(y * 1.3)) + Math.sin(y * 2.1 - x * 0.6));
  const massif =
    peak(0, 0, 2600, 2.4) +
    peak(-2.5, 1.2, 1900, 1.4) +
    peak(2.2, -1.6, 2100, 1.6) +
    peak(1, 2.5, 1400, 1.2);
  const valley = -700 * Math.exp(-((y + x * 0.4 - 0.2) ** 2) / 0.5);
  // Ridged octaves (1 - |sin|, squared) at rising frequency give sharp crests and gullies.
  let detail = 0;
  let amp = 700;
  let freq = 1.4;
  for (let k = 0; k < 4; k++) {
    const a = k * 1.1;
    const along = x * Math.cos(a) + y * Math.sin(a);
    const across = y * Math.cos(a) - x * Math.sin(a);
    const u = freq * along + k * 2.3 + 0.8 * Math.sin(freq * 0.5 * across);
    detail += amp * (1 - Math.abs(Math.sin(u))) ** 2;
    amp *= 0.5;
    freq *= 2.1;
  }
  const fade = Math.exp(-(x * x + y * y) / 60);
  const height = massif + (ridges + valley + detail * (0.4 + massif / 2600)) * fade;
  return Math.max(0, 200 + height * fade);
}

/** Elevation is sampled every STEP pixels and interpolated between, to keep tiles cheap. */
const STEP = 2;
const GRID = SIZE / STEP + 1;

const tileLng = (x: number, n: number): number => (x / n) * 360 - 180;
const tileLat = (y: number, n: number): number =>
  (Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / n))) * 180) / Math.PI;

/** Heights on a GRID×GRID lattice across one tile (tile edges included). */
function sampleGrid(z: number, x: number, y: number): Float32Array {
  const n = 2 ** z;
  const grid = new Float32Array(GRID * GRID);
  for (let gy = 0; gy < GRID; gy++) {
    const lat = tileLat(y + gy / (GRID - 1), n);
    for (let gx = 0; gx < GRID; gx++) {
      grid[gy * GRID + gx] = elevation(tileLng(x + gx / (GRID - 1), n), lat);
    }
  }
  return grid;
}

/** One 256px tile's pixels, each height packed into RGB (Terrarium). */
function renderTile(z: number, x: number, y: number): ImageData {
  const grid = sampleGrid(z, x, y);
  const img = new ImageData(SIZE, SIZE);
  for (let py = 0; py < SIZE; py++) {
    const gy = Math.min(Math.floor(py / STEP), GRID - 2);
    const fy = py / STEP - gy;
    for (let px = 0; px < SIZE; px++) {
      const gx = Math.min(Math.floor(px / STEP), GRID - 2);
      const fx = px / STEP - gx;
      const a = grid[gy * GRID + gx] ?? 0;
      const b = grid[gy * GRID + gx + 1] ?? 0;
      const c = grid[(gy + 1) * GRID + gx] ?? 0;
      const d = grid[(gy + 1) * GRID + gx + 1] ?? 0;
      const h = (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
      // Terrarium: height = (R * 256 + G + B / 256) - 32768
      const v = h + 32768;
      const i = (py * SIZE + px) * 4;
      img.data[i] = Math.floor(v / 256);
      img.data[i + 1] = Math.floor(v) % 256;
      img.data[i + 2] = Math.floor((v % 1) * 256);
      img.data[i + 3] = 255;
    }
  }
  return img;
}

// Terrain and hillshade sources ask for the same tiles; compute each one once.
const cache = new Map<string, ImageData>();
const CACHE_MAX = 150;

function cachedTile(z: number, x: number, y: number): ImageData {
  const key = `${z}/${x}/${y}`;
  let tile = cache.get(key);
  if (!tile) {
    tile = renderTile(z, x, y);
    if (cache.size >= CACHE_MAX) cache.delete(cache.keys().next().value ?? '');
    cache.set(key, tile);
  }
  return tile;
}

let users = 0;
const PROTOCOL = 'synthetic-dem';

/**
 * Registers the `synthetic-dem://` protocol (shared by every mounted terrain example) and
 * returns a source spec using it plus a release function for the example's cleanup.
 */
export function syntheticDem(): { source: RasterDEMSourceSpecification; release: () => void } {
  if (users++ === 0) {
    addProtocol(PROTOCOL, async (params) => {
      const match = /(\d+)\/(\d+)\/(\d+)/.exec(params.url);
      if (!match) throw new Error(`bad tile url ${params.url}`);
      const [z, x, y] = match.slice(1).map(Number) as [number, number, number];
      // addProtocol accepts a decoded ImageBitmap, which skips a PNG encode and decode.
      // A new bitmap per request: MapLibre may transfer it to a worker, detaching it.
      const bitmap = await createImageBitmap(cachedTile(z, x, y), {
        premultiplyAlpha: 'none',
        colorSpaceConversion: 'none',
      });
      return { data: bitmap };
    });
  }
  let released = false;
  return {
    source: {
      type: 'raster-dem',
      tiles: [`${PROTOCOL}://{z}/{x}/{y}`],
      tileSize: SIZE,
      encoding: 'terrarium',
      maxzoom: 10,
    },
    release: () => {
      if (released) return;
      released = true;
      if (--users > 0) return;
      removeProtocol(PROTOCOL);
      cache.clear();
    },
  };
}
