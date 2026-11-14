// Data maps generated in code for PBR examples: height, normal, mask, noise
import * as pc from 'playcanvas';

/** A height function over the unit square: u and v in 0..1 (wrapping), result 0..1. */
export type HeightFn = (u: number, v: number) => number;

const hash = (x: number, y: number): number => {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

/** Smooth value noise that tiles every `period` cells. */
export function tileNoise(u: number, v: number, period: number): number {
  const x = u * period;
  const y = v * period;
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const h = (i: number, j: number): number => hash(((i % period) + period) % period, ((j % period) + period) % period);
  const top = h(x0, y0) * (1 - sx) + h(x0 + 1, y0) * sx;
  const bottom = h(x0, y0 + 1) * (1 - sx) + h(x0 + 1, y0 + 1) * sx;
  return top * (1 - sy) + bottom * sy;
}

/** Rounded bricks, 1 on a brick and 0 in the mortar, with a little grain. */
export const bricks: HeightFn = (u, v) => {
  const rows = 6;
  const cols = 3;
  const row = Math.floor(v * rows);
  const x = (u * cols + (row % 2) * 0.5) % 1;
  const y = (v * rows) % 1;
  const edge = Math.min(x, 1 - x, y, 1 - y);
  const round = Math.min(1, Math.max(0, (edge - 0.04) / 0.1));
  return round * (0.85 + 0.15 * tileNoise(u, v, 24));
};

/** A field of soft round bumps. */
export const bumps: HeightFn = (u, v) => 0.5 + 0.25 * Math.sin(u * Math.PI * 12) * Math.sin(v * Math.PI * 12) + 0.25 * tileNoise(u, v, 16);

/** Fine ridges running along u, like brushed metal grooves. */
export const grooves: HeightFn = (u, v) => 0.5 + 0.4 * Math.sin(v * Math.PI * 80) * (0.7 + 0.3 * tileNoise(u, v, 8));

const dataTexture = (device: pc.GraphicsDevice, size: number, name: string, fill: (u: number, v: number, out: number[]) => void, srgb = false): pc.Texture => {
  const bytes = new Uint8Array(size * size * 4);
  const px = [0, 0, 0, 1];
  for (let j = 0; j < size; j++) {
    for (let i = 0; i < size; i++) {
      px[3] = 1;
      fill((i + 0.5) / size, (j + 0.5) / size, px);
      for (let c = 0; c < 4; c++) bytes[(j * size + i) * 4 + c] = Math.round(Math.min(1, Math.max(0, px[c]!)) * 255);
    }
  }
  return new pc.Texture(device, {
    name,
    width: size,
    height: size,
    format: srgb ? pc.PIXELFORMAT_SRGBA8 : pc.PIXELFORMAT_RGBA8,
    mipmaps: true,
    minFilter: pc.FILTER_LINEAR_MIPMAP_LINEAR,
    magFilter: pc.FILTER_LINEAR,
    addressU: pc.ADDRESS_REPEAT,
    addressV: pc.ADDRESS_REPEAT,
    levels: [bytes],
  });
};

/** A grey-scale data map (not sRGB) from a height function: use for height, AO, gloss, metalness, opacity. */
export function scalarMap(device: pc.GraphicsDevice, fn: HeightFn, size = 256, name = 'scalar-map'): pc.Texture {
  return dataTexture(device, size, name, (u, v, o) => {
    o[0] = o[1] = o[2] = fn(u, v);
  });
}

/** A colour map (sRGB) from a function returning r, g, b in 0..1. */
export function colorMap(device: pc.GraphicsDevice, fn: (u: number, v: number, out: number[]) => void, size = 256, name = 'color-map'): pc.Texture {
  return dataTexture(device, size, name, fn, true);
}

/** A tangent-space normal map made from a height function; `strength` scales the slope. */
export function normalMap(device: pc.GraphicsDevice, fn: HeightFn, strength = 4, size = 256, name = 'normal-map'): pc.Texture {
  const h = 1 / size;
  return dataTexture(device, size, name, (u, v, o) => {
    const dx = (fn(u + h, v) - fn(u - h, v)) * strength;
    const dy = (fn(u, v + h) - fn(u, v - h)) * strength;
    const len = Math.hypot(dx, dy, 1);
    o[0] = (-dx / len) * 0.5 + 0.5;
    o[1] = (-dy / len) * 0.5 + 0.5;
    o[2] = (1 / len) * 0.5 + 0.5;
  });
}
