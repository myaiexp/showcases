// Colour grades as functions, and LUT data and .cube / .3dl text generators
import type { LookupTexture } from 'postprocessing';

export type Rgb = [number, number, number];
export type Grade = (r: number, g: number, b: number) => Rgb;

const clamp = (v: number): number => Math.min(1, Math.max(0, v));
const luma = (r: number, g: number, b: number): number => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const mix = (a: number, b: number, t: number): number => a + (b - a) * t;

export const grades = {
  neutral: (r, g, b) => [r, g, b],
  'teal and orange': (r, g, b) => {
    const k = (luma(r, g, b) - 0.5) * 0.4;
    return [clamp(r + k), clamp(g + Math.abs(k) * -0.1 + 0.02), clamp(b - k)];
  },
  'bleach bypass': (r, g, b) => {
    const l = luma(r, g, b);
    const c = (v: number): number => clamp(mix(l, v, 0.4) * 1.0 + (mix(l, v, 0.4) - 0.5) * 0.35);
    return [c(r), c(g), c(b)];
  },
  'cross process': (r, g, b) => [r * r * (3 - 2 * r), g, clamp(0.15 + b * 0.7)],
  duotone: (r, g, b) => {
    const l = luma(r, g, b);
    return [mix(0.05, 1.0, l), mix(0.08, 0.78, l), mix(0.3, 0.25, l)];
  },
  night: (r, g, b) => [r * 0.35, g * 0.55, clamp(b * 0.95 + 0.04)],
  invert: (r, g, b) => [1 - r, 1 - g, 1 - b],
  'posterize 4': (r, g, b) => [Math.round(r * 3) / 3, Math.round(g * 3) / 3, Math.round(b * 3) / 3],
} satisfies Record<string, Grade>;

export type GradeName = keyof typeof grades;
export const gradeNames = Object.keys(grades) as GradeName[];

/** Rewrites a RGBA float LUT (red varies fastest, like `createNeutral`) with a grade. */
export function fillLut(lut: LookupTexture, grade: Grade): void {
  const size = lut.image.width;
  const data = lut.image.data as Float32Array;
  const s = 1 / (size - 1);
  for (let b = 0; b < size; b++) {
    for (let g = 0; g < size; g++) {
      for (let r = 0; r < size; r++) {
        const i = (r + g * size + b * size * size) * 4;
        const [R, G, B] = grade(r * s, g * s, b * s);
        data[i] = R;
        data[i + 1] = G;
        data[i + 2] = B;
        data[i + 3] = 1;
      }
    }
  }
  lut.needsUpdate = true;
}

/** Text of a .cube file: header lines, then one "r g b" line per grid point, red fastest. */
export function cubeText(size: number, grade: Grade, title: string, domainMax = 1): string {
  const lines = [`TITLE "${title}"`, `LUT_3D_SIZE ${size}`, 'DOMAIN_MIN 0.0 0.0 0.0', `DOMAIN_MAX ${domainMax.toFixed(3)} ${domainMax.toFixed(3)} ${domainMax.toFixed(3)}`];
  const s = domainMax / (size - 1);
  for (let b = 0; b < size; b++) {
    for (let g = 0; g < size; g++) {
      for (let r = 0; r < size; r++) {
        lines.push(grade(r * s, g * s, b * s).map((v) => clamp(v).toFixed(6)).join(' '));
      }
    }
  }
  return lines.join('\n');
}

/** Text of a .3dl file: a grid line, then 10-bit "r g b" lines with blue varying fastest. */
export function threeDlText(size: number, grade: Grade): string {
  const lines = [Array.from({ length: size }, (_, i) => i * 64).join(' ')];
  const s = 1 / (size - 1);
  for (let r = 0; r < size; r++) {
    for (let g = 0; g < size; g++) {
      for (let b = 0; b < size; b++) {
        lines.push(grade(r * s, g * s, b * s).map((v) => Math.round(clamp(v) * 1023)).join(' '));
      }
    }
  }
  return lines.join('\n');
}
