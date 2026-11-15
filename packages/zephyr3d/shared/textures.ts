// Stand-in textures drawn in code and encoded as PNG, so nothing fetches an image
/** Fills an RGBA pixel buffer of w×h. */
export type Painter = (px: Uint8ClampedArray, w: number, h: number) => void;

/** Encodes a painter's pixels as PNG bytes, ready for an in-memory VFS. */
export async function png(w: number, h: number, paint: Painter): Promise<ArrayBuffer> {
  const canvas = new OffscreenCanvas(w, h);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('no 2d context for a generated texture');
  const img = ctx.createImageData(w, h);
  paint(img.data, w, h);
  ctx.putImageData(img, 0, 0);
  const blob = await canvas.convertToBlob({ type: 'image/png' });
  return blob.arrayBuffer();
}

/** Smooth value noise in 0..1, tileable over `period` cells. */
export function noise2(x: number, y: number, period = 8, seed = 1): number {
  const hash = (i: number, j: number): number => {
    const a = (((i % period) + period) % period) * 374761393 + (((j % period) + period) % period) * 668265263 + seed * 1442695;
    const n = (a ^ (a >>> 13)) * 1274126177;
    return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
  };
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const fx = x - xi;
  const fy = y - yi;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const top = hash(xi, yi) * (1 - sx) + hash(xi + 1, yi) * sx;
  const bottom = hash(xi, yi + 1) * (1 - sx) + hash(xi + 1, yi + 1) * sx;
  return top * (1 - sy) + bottom * sy;
}

/** Four octaves of noise2, 0..1, tileable. */
export function fbm(u: number, v: number, period = 4, seed = 1): number {
  let sum = 0;
  let amp = 0.5;
  let p = period;
  for (let o = 0; o < 4; o++) {
    sum += amp * noise2(u * p, v * p, p, seed + o);
    amp *= 0.5;
    p *= 2;
  }
  return sum / 0.9375;
}

function put(px: Uint8ClampedArray, i: number, r: number, g: number, b: number, a = 255): void {
  px[i] = r;
  px[i + 1] = g;
  px[i + 2] = b;
  px[i + 3] = a;
}

/** A two-colour checkerboard of n×n squares. */
export function checker(n = 8, a: [number, number, number] = [230, 230, 230], b: [number, number, number] = [60, 70, 90]): Painter {
  return (px, w, h) => {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const c = (Math.floor((x * n) / w) + Math.floor((y * n) / h)) % 2 ? a : b;
        put(px, (y * w + x) * 4, c[0], c[1], c[2]);
      }
    }
  };
}

/** Brick height: 1 on a brick, falling to 0 in the mortar. 0..1 coordinates, tileable. */
export function brickHeight(u: number, v: number, rows = 8, cols = 4): number {
  const row = Math.floor(v * rows);
  const bu = u * cols + (row % 2 ? 0.5 : 0);
  const fu = bu - Math.floor(bu);
  const fv = v * rows - row;
  const edge = Math.min(fu * cols * 0.5, (1 - fu) * cols * 0.5, fv, 1 - fv);
  return Math.min(1, Math.max(0, (edge - 0.04) * 12)) * (0.85 + 0.15 * fbm(u, v, 8, 7));
}

/** Red-brown bricks in pale mortar (colour, sRGB). */
export const bricksAlbedo: Painter = (px, w, h) => {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const v = y / h;
      const hgt = brickHeight(u, v);
      const n = fbm(u, v, 8, 3);
      const brick: [number, number, number] = [150 + 60 * n, 70 + 30 * n, 50 + 20 * n];
      const mortar: [number, number, number] = [180, 175, 165];
      const t = Math.min(1, hgt * 3);
      put(px, (y * w + x) * 4, mortar[0] + (brick[0] - mortar[0]) * t, mortar[1] + (brick[1] - mortar[1]) * t, mortar[2] + (brick[2] - mortar[2]) * t);
    }
  }
};

/** A tangent-space normal map (data, so load it with linearColorSpace: true) from a height function. */
export function normalsFrom(height: (u: number, v: number) => number, strength = 2): Painter {
  return (px, w, h) => {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const u = x / w;
        const v = y / h;
        const dx = (height((x + 1) / w, v) - height((x - 1 + w) / w, v)) * strength;
        const dy = (height(u, (y + 1) / h) - height(u, (y - 1 + h) / h)) * strength;
        const len = Math.hypot(dx, dy, 1);
        put(px, (y * w + x) * 4, ((-dx / len) * 0.5 + 0.5) * 255, ((dy / len) * 0.5 + 0.5) * 255, ((1 / len) * 0.5 + 0.5) * 255);
      }
    }
  };
}

/** A grey-scale map of a 0..1 function (roughness, masks, heights: load as linear data). */
export function grey(fn: (u: number, v: number) => number): Painter {
  return (px, w, h) => {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const g = Math.max(0, Math.min(1, fn(x / w, y / h))) * 255;
        put(px, (y * w + x) * 4, g, g, g);
      }
    }
  };
}

/** A small planet: oceans, green-brown land and white poles, in equirectangular layout. */
export const planetAlbedo: Painter = (px, w, h) => {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const v = y / h;
      const land = fbm(u, v * 0.5, 4, 11);
      const lat = Math.abs(v - 0.5) * 2;
      const i = (y * w + x) * 4;
      if (lat > 0.85 - land * 0.1) put(px, i, 235, 240, 245);
      else if (land > 0.52) put(px, i, 70 + 120 * (land - 0.52), 120 - 40 * lat, 50);
      else put(px, i, 20, 50 + 60 * land, 110 + 80 * land);
    }
  }
};

/** A soft round sprite: white with alpha falling to 0 at the edge. */
export const softDot: Painter = (px, w, h) => {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const d = Math.hypot((x + 0.5) / w - 0.5, (y + 0.5) / h - 0.5) * 2;
      const a = Math.max(0, 1 - d);
      put(px, (y * w + x) * 4, 255, 255, 255, a * a * 255);
    }
  }
};

/** A horizontal colour ramp through the given stops (u = 0..1). */
export function ramp(stops: [number, number, number][]): Painter {
  return (px, w, h) => {
    for (let x = 0; x < w; x++) {
      const t = (x / (w - 1)) * (stops.length - 1);
      const i0 = Math.min(stops.length - 2, Math.floor(t));
      const f = t - i0;
      const a = stops[i0]!;
      const b = stops[i0 + 1]!;
      for (let y = 0; y < h; y++) put(px, (y * w + x) * 4, a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f);
    }
  };
}
