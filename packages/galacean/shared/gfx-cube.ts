// Cube textures painted in code: shaded by direction, or with labelled faces
import { type Engine, TextureCube, type TextureCubeFace } from '@galacean/engine';

export type Rgb = [number, number, number];

/** Direction through the centre of texel (u, v) on a cube face, GL order +X -X +Y -Y +Z -Z (v grows downward). */
export function faceDirection(face: number, u: number, v: number): Rgb {
  const a = 2 * u - 1;
  const b = 2 * v - 1;
  const d: Rgb = [[1, -b, -a], [-1, -b, a], [a, 1, b], [a, -1, -b], [a, -b, 1], [-a, -b, -1]][face] as Rgb;
  const n = Math.hypot(...d);
  return [d[0] / n, d[1] / n, d[2] / n];
}

/** A TextureCube whose texels are `shade(x, y, z)` (sRGB 0..1) for the world direction they appear in (the skybox shader inverts x). */
export function shadedCube(engine: Engine, size: number, shade: (x: number, y: number, z: number) => Rgb): TextureCube {
  const cube = new TextureCube(engine, size, undefined, false, true);
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const g = canvas.getContext('2d')!;
  for (let face = 0; face < 6; face++) {
    const image = g.createImageData(size, size);
    for (let j = 0; j < size; j++) {
      for (let i = 0; i < size; i++) {
        const d = faceDirection(face, (i + 0.5) / size, (j + 0.5) / size);
        const c = shade(-d[0], d[1], d[2]);
        const o = (j * size + i) * 4;
        image.data[o] = Math.min(255, c[0] * 255);
        image.data[o + 1] = Math.min(255, c[1] * 255);
        image.data[o + 2] = Math.min(255, c[2] * 255);
        image.data[o + 3] = 255;
      }
    }
    g.putImageData(image, 0, 0);
    cube.setImageSource(face as TextureCubeFace, canvas);
  }
  return cube;
}

const NAMES = ['px  right', 'nx  left', 'py  top', 'ny  bottom', 'pz  front', 'nz  back'];
const TINTS = ['#c0504d', '#7a2f2d', '#4f9d5d', '#2b5a34', '#4a74c9', '#273f73'];

/** A TextureCube whose six faces are painted by `draw(g, size, faceIndex)`; the default labels each face. */
export function paintedCube(
  engine: Engine,
  size: number,
  draw: (g: CanvasRenderingContext2D, size: number, face: number) => void = labelFace,
): TextureCube {
  const cube = new TextureCube(engine, size, undefined, false, true);
  for (let face = 0; face < 6; face++) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    draw(canvas.getContext('2d')!, size, face);
    cube.setImageSource(face as TextureCubeFace, canvas);
  }
  return cube;
}

function labelFace(g: CanvasRenderingContext2D, size: number, face: number): void {
  g.fillStyle = TINTS[face]!;
  g.fillRect(0, 0, size, size);
  g.strokeStyle = 'rgba(255,255,255,0.5)';
  g.lineWidth = size / 32;
  g.strokeRect(size / 16, size / 16, size - size / 8, size - size / 8);
  g.fillStyle = '#fff';
  g.font = `bold ${size / 6}px sans-serif`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(NAMES[face]!, size / 2, size / 2);
}

/** A soft dusk sky: deep blue overhead, warm glow at the horizon, a dark ground, and a bright sun patch. */
export function duskSky(x: number, y: number, z: number): Rgb {
  const up = Math.max(0, y);
  const glow = Math.exp(-Math.abs(y) * 5);
  const sunAmount = Math.max(0, x * 0.6 + y * 0.35 - z * 0.72) ** 120;
  const base: Rgb = y >= 0 ? [0.1 + 0.05 * up, 0.18 + 0.2 * up, 0.35 + 0.4 * up] : [0.07, 0.07, 0.09];
  return [base[0] + glow * 0.7 + sunAmount, base[1] + glow * 0.32 + sunAmount * 0.9, base[2] + glow * 0.08 + sunAmount * 0.6];
}
