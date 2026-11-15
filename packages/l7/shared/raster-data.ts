// Raster sample data made in code: elevation field, class map, bands, a drawn map image
import { drawImage } from './images.ts';

/** The extent the raster and image examples cover: [minLng, minLat, maxLng, maxLat]. */
export const EXTENT: [number, number, number, number] = [4, 43, 18, 49];
export const CENTER: [number, number] = [11, 46];

/** Smooth 0..1 terrain from a few seeded sine waves (rows run north to south, like a GeoTIFF). */
function terrain(w: number, h: number, seed: number): Float32Array {
  const waves = Array.from({ length: 7 }, (_, k) => {
    const a = Math.sin(seed * 12.9898 + k * 78.233) * 43758.5453;
    const f = (n: number): number => n - Math.floor(n);
    return { fx: 1.2 + f(a) * 5, fy: 1.2 + f(a * 7.3) * 5, ph: f(a * 3.1) * 6.28, amp: 1 / (1 + k * 0.6) };
  });
  const out = new Float32Array(w * h);
  let lo = Infinity;
  let hi = -Infinity;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let v = 0;
      for (const k of waves) v += k.amp * Math.sin((x / w) * k.fx * 3.14 + (y / h) * k.fy * 3.14 + k.ph);
      out[y * w + x] = v;
      lo = Math.min(lo, v);
      hi = Math.max(hi, v);
    }
  }
  for (let i = 0; i < out.length; i++) out[i] = ((out[i] ?? 0) - lo) / (hi - lo);
  return out;
}

export interface RasterSize {
  width: number;
  height: number;
}

/** An elevation-like Float32Array 0..max (default 8000, the docs' default domain), standing in for a DEM GeoTIFF. */
export function elevation(w: number, h: number, max = 8000, seed = 3): Float32Array {
  const t = terrain(w, h, seed);
  for (let i = 0; i < t.length; i++) t[i] = (t[i] ?? 0) ** 1.6 * max;
  return t;
}

/** An integer class map (values taken from `classes`), as a Uint8Array: for cat ramps. */
export function classMap(w: number, h: number, classes: readonly number[], seed = 8): Uint8Array {
  const t = terrain(w, h, seed);
  const out = new Uint8Array(w * h);
  for (let i = 0; i < out.length; i++) out[i] = classes[Math.min(classes.length - 1, Math.floor((t[i] ?? 0) * classes.length))] ?? 0;
  return out;
}

/**
 * Six Landsat-like bands (blue, green, red, nir, swir1, swir2 as indices 0..5) of a made-up
 * scene with water, forest and bare rock, each a Float32Array of reflectance-like values.
 */
export function bands(w: number, h: number, seed = 5): Float32Array[] {
  const rock = terrain(w, h, seed);
  const green = terrain(w, h, seed + 11);
  const bandCount = 6;
  const gain = [
    [0.4, 0.2, 0.1], // blue: water and rock reflect, forest less
    [0.5, 0.5, 0.2],
    [0.7, 0.3, 0.1],
    [0.2, 1.6, 0.3], // nir: forest is bright
    [0.4, 0.5, 0.9], // swir1
    [0.3, 0.3, 0.8], // swir2
  ];
  return Array.from({ length: bandCount }, (_, b) => {
    const [gr, gg, gw] = gain[b] ?? [0, 0, 0];
    const out = new Float32Array(w * h);
    for (let i = 0; i < out.length; i++) {
      const r = rock[i] ?? 0;
      const g = green[i] ?? 0;
      const water = r < 0.28 ? 1 : 0;
      out[i] = 800 + 6000 * ((gr ?? 0) * r * (1 - g) + (gg ?? 0) * g * (1 - water) + (gw ?? 0) * water * 0.4);
    }
    return out;
  });
}

/** A raw binary "file" holding bands as 16-bit values: stands in for the GeoTIFF the docs fetch. */
export function packFile(w: number, h: number, bs: readonly Float32Array[]): ArrayBuffer {
  const out = new Uint16Array(bs.length * w * h);
  bs.forEach((b, k) => b.forEach((v, i) => (out[k * w * h + i] = Math.min(65535, Math.round(v)))));
  return out.buffer;
}

/** Reads band `k` of a packFile() buffer: the `format` function of the documented parser. */
export function unpackBand(file: ArrayBuffer, w: number, h: number, k: number): { rasterData: Float32Array; width: number; height: number } {
  const all = new Uint16Array(file);
  return { rasterData: Float32Array.from(all.subarray(k * w * h, (k + 1) * w * h)), width: w, height: h };
}

/** A parchment "scanned map" with a coastline, contours and a compass: for image layers. */
export function mapImage(size = 256, hue = 0): string {
  return drawImage(size, (g, s) => {
    g.fillStyle = `hsl(${40 + hue},45%,78%)`;
    g.fillRect(0, 0, s, s);
    g.fillStyle = `hsl(${200 + hue},45%,62%)`;
    g.beginPath();
    g.moveTo(0, s * 0.7);
    g.bezierCurveTo(s * 0.3, s * 0.5, s * 0.5, s * 0.95, s, s * 0.6);
    g.lineTo(s, s);
    g.lineTo(0, s);
    g.fill();
    g.strokeStyle = `hsla(${25 + hue},40%,35%,.55)`;
    g.lineWidth = s / 128;
    for (let r = s * 0.08; r < s * 0.4; r += s * 0.06) {
      g.beginPath();
      g.ellipse(s * 0.4, s * 0.32, r * 1.3, r, 0.4, 0, Math.PI * 2);
      g.stroke();
    }
    g.strokeStyle = '#5b4630';
    g.lineWidth = s / 64;
    g.strokeRect(s / 64, s / 64, s - s / 32, s - s / 32);
    g.fillStyle = '#5b4630';
    g.beginPath();
    g.moveTo(s * 0.86, s * 0.1);
    g.lineTo(s * 0.9, s * 0.22);
    g.lineTo(s * 0.86, s * 0.19);
    g.lineTo(s * 0.82, s * 0.22);
    g.fill();
    g.font = `bold ${s / 14}px sans-serif`;
    g.fillText('N', s * 0.84, s * 0.31);
  });
}
