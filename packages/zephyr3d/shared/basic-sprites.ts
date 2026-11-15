// Generated sprite and particle textures: an atlas, a marker, smoke, a flame ramp and a spark
import { fbm, type Painter } from './textures.ts';

function put(px: Uint8ClampedArray, i: number, r: number, g: number, b: number, a: number): void {
  px[i] = r;
  px[i + 1] = g;
  px[i + 2] = b;
  px[i + 3] = a;
}

function hue(h: number): [number, number, number] {
  const f = (n: number): number => 0.5 + 0.5 * Math.cos(2 * Math.PI * (h + n / 3));
  return [60 + 195 * f(0), 60 + 195 * f(2), 60 + 195 * f(1)];
}

/** A 4 x 4 atlas of coloured shapes (disc, ring, diamond, cross) on transparent ground; cell i is column i % 4, row floor(i / 4). */
export const spriteAtlas: Painter = (px, w, h) => {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const cx = Math.floor((x / w) * 4);
      const cy = Math.floor((y / h) * 4);
      const u = ((x / w) * 4 - cx) * 2 - 1;
      const v = ((y / h) * 4 - cy) * 2 - 1;
      const cell = cy * 4 + cx;
      const r = Math.hypot(u, v);
      let inside = false;
      switch (cx) {
        case 0:
          inside = r < 0.8;
          break;
        case 1:
          inside = r < 0.8 && r > 0.45;
          break;
        case 2:
          inside = Math.abs(u) + Math.abs(v) < 0.85;
          break;
        default:
          inside = Math.min(Math.abs(u), Math.abs(v)) < 0.22 && Math.max(Math.abs(u), Math.abs(v)) < 0.85;
      }
      const [cr, cg, cb] = hue(cell / 16);
      put(px, (y * w + x) * 4, cr, cg, cb, inside ? 255 : 0);
    }
  }
};

/** A map-marker style ring with a dot, white on transparent, so material colour shows through. */
export const marker: Painter = (px, w, h) => {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const r = Math.hypot((x + 0.5) / w - 0.5, (y + 0.5) / h - 0.5) * 2;
      const on = (r < 0.9 && r > 0.7) || r < 0.25 || (Math.abs((x + 0.5) / w - 0.5) < 0.03 && (y + 0.5) / h > 0.5);
      put(px, (y * w + x) * 4, 255, 255, 255, on ? 255 : 0);
    }
  }
};

/** Soft noisy smoke puff as an alpha map in the red channel (load as linear data). */
export const smokeAlpha: Painter = (px, w, h) => {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const v = y / h;
      const d = Math.hypot(u - 0.5, v - 0.5) * 2;
      const a = Math.max(0, 1 - d) ** 1.4 * (0.55 + 0.9 * fbm(u, v, 4, 5));
      const g = Math.min(1, a) * 255;
      put(px, (y * w + x) * 4, g, g, g, 255);
    }
  }
};

/** A sharp four-point spark as an alpha map (linear data). */
export const sparkAlpha: Painter = (px, w, h) => {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = (x + 0.5) / w - 0.5;
      const v = (y + 0.5) / h - 0.5;
      const star = Math.max(0, 1 - (Math.abs(u) * Math.abs(v)) ** 0.5 * 9) * Math.max(0, 1 - Math.hypot(u, v) * 2);
      const g = Math.min(1, star * 1.4) * 255;
      put(px, (y * w + x) * 4, g, g, g, 255);
    }
  }
};

/** Colour and alpha over normalised lifetime (u = 0..1): white-hot, orange, deep red, then clear. */
export const flameRamp: Painter = (px, w, h) => {
  const stops: [number, number, number, number][] = [
    [255, 250, 200, 0],
    [255, 230, 120, 255],
    [255, 140, 30, 230],
    [190, 40, 10, 120],
    [60, 10, 5, 0],
  ];
  for (let x = 0; x < w; x++) {
    const t = (x / (w - 1)) * (stops.length - 1);
    const i = Math.min(stops.length - 2, Math.floor(t));
    const f = t - i;
    const a = stops[i]!;
    const b = stops[i + 1]!;
    for (let y = 0; y < h; y++) put(px, (y * w + x) * 4, a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f, a[3] + (b[3] - a[3]) * f);
  }
};

/** A grey ramp: opaque at birth, fading to clear (for plain smoke). */
export const fadeRamp: Painter = (px, w, h) => {
  for (let x = 0; x < w; x++) {
    const t = x / (w - 1);
    const g = 210 - 90 * t;
    for (let y = 0; y < h; y++) put(px, (y * w + x) * 4, g, g, g, Math.min(255, 420 * (1 - t) * Math.min(1, t * 8 + 0.2)));
  }
};
