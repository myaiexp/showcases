// Tests the A-Frame font stand-ins' distance field maths and BMFont writers.
import { realpathSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  CHARSET, bmfontJson, bmfontText, edt2d, packRects, signedDistanceField, type BMFont,
} from '../packages/aframe/shared/sdf.ts';

// The parser load-bmfont uses, resolved through aframe -> load-bmfont (pnpm does not hoist it).
const root = fileURLToPath(new URL('../node_modules/aframe/', import.meta.url));
const viaAframe = createRequire(realpathSync(root) + '/');
const viaLoader = createRequire(viaAframe.resolve('load-bmfont/package.json'));
const parseAscii = viaLoader('parse-bmfont-ascii') as (s: string) => {
  info: { face: string; size: number; padding: number[] };
  common: { lineHeight: number; base: number; scaleW: number; scaleH: number };
  pages: string[];
  chars: Array<Record<string, number>>;
  kernings: unknown[];
};

const font: BMFont = {
  face: 'aframe-inter', size: 40, lineHeight: 48, base: 38, scaleW: 128, scaleH: 64, spread: 6,
  chars: [
    { id: 65, x: 1, y: 2, width: 30, height: 40, xoffset: -6, yoffset: -3, xadvance: 25 },
    { id: 32, x: 0, y: 0, width: 0, height: 0, xoffset: 0, yoffset: 0, xadvance: 11 },
  ],
};

describe('edt2d', () => {
  it('gives squared distances to the nearest zero cell', () => {
    const g = new Float64Array(5 * 5).fill(1e20);
    g[2 * 5 + 2] = 0;
    edt2d(g, 5, 5);
    expect(g[2 * 5 + 2]).toBe(0);
    expect(g[2 * 5 + 4]).toBe(4);
    expect(g[0]).toBe(8);
  });
});

describe('signedDistanceField', () => {
  // 12x12 with a solid 4x4 square in the middle (columns/rows 4-7).
  const w = 12;
  const cov = new Uint8Array(w * w);
  for (let y = 4; y < 8; y++) for (let x = 4; x < 8; x++) cov[y * w + x] = 255;
  const sdf = signedDistanceField(cov, w, w, 6);
  const at = (x: number, y: number) => sdf[y * w + x]!;

  it('is above the 0.5 edge inside and below it outside', () => {
    expect(at(5, 5)).toBeGreaterThan(128);
    expect(at(0, 0)).toBeLessThan(128);
    expect(at(4, 4)).toBeGreaterThan(128);
    expect(at(3, 4)).toBeLessThan(128);
  });

  it('measures pixel centres from the edge', () => {
    // Pixel (3,5) is 1px (to the nearest covered centre) outside, (4,5) 1px inside.
    expect(at(3, 5)).toBe(Math.round(255 * (0.5 - 1 / 12)));
    expect(at(4, 5)).toBe(Math.round(255 * (0.5 + 1 / 12)));
    // Straight line: two pixels further out is 2 * 255/12 lower.
    expect(Math.abs(at(3, 5) - at(1, 5) - 2 * 255 / 12)).toBeLessThanOrEqual(1);
  });

  it('clamps beyond the spread', () => {
    const far = signedDistanceField(new Uint8Array(20 * 20), 20, 20, 6);
    expect(far[0]).toBe(0);
    const solid = signedDistanceField(new Uint8Array(20 * 20).fill(255), 20, 20, 6);
    expect(solid[210]).toBe(255);
  });

  it('places the edge by partial coverage', () => {
    // Half-covered pixel sits on the edge: exactly 0.5.
    const half = signedDistanceField(new Uint8Array([0, 0, 0, 255, 128, 0, 0, 0, 0]), 9, 1, 6);
    expect(Math.abs(half[4]! - 128)).toBeLessThanOrEqual(1);
  });
});

describe('packRects', () => {
  it('fits every rect inside a power-of-two page without overlap', () => {
    const rects = Array.from({ length: 120 }, (_, i) => ({ w: 20 + (i % 17), h: 30 + (i % 11) }));
    const { size, at } = packRects(rects);
    expect(size & (size - 1)).toBe(0);
    rects.forEach((r, i) => {
      expect(at[i]!.x + r.w).toBeLessThanOrEqual(size);
      expect(at[i]!.y + r.h).toBeLessThanOrEqual(size);
      for (let j = 0; j < i; j++) {
        const a = at[i]!, b = at[j]!, s = rects[j]!;
        const apart = a.x + r.w <= b.x || b.x + s.w <= a.x || a.y + r.h <= b.y || b.y + s.h <= a.y;
        expect(apart).toBe(true);
      }
    });
  });

  it('covers a charset of ~40x55 cells in a 512 page', () => {
    expect(packRects(CHARSET.map(() => ({ w: 36, h: 52 }))).size).toBeLessThanOrEqual(1024);
  });
});

describe('BMFont writers', () => {
  it('writes text that parse-bmfont-ascii reads back', () => {
    const parsed = parseAscii(bmfontText(font, 'DejaVu-sdf.png'));
    expect(parsed.pages).toEqual(['DejaVu-sdf.png']);
    expect(parsed.info.face).toBe('aframe-inter');
    expect(parsed.info.size).toBe(40);
    expect(parsed.common).toMatchObject({ lineHeight: 48, base: 38, scaleW: 128, scaleH: 64 });
    expect(parsed.chars).toHaveLength(2);
    expect(parsed.chars[0]).toMatchObject({ id: 65, x: 1, y: 2, width: 30, height: 40, xoffset: -6, yoffset: -3, xadvance: 25, page: 0 });
    expect(parsed.kernings).toEqual([]);
  });

  it('writes JSON with the page name and the yoffset shift', () => {
    const j = JSON.parse(bmfontJson(font, 'Roboto-msdf.png', -30));
    expect(j.pages).toEqual(['Roboto-msdf.png']);
    expect(j.common.base).toBe(38);
    expect(j.chars[0].yoffset).toBe(-33);
    // text.js adds 30 for Roboto-msdf.json URLs, restoring the metrics.
    expect(j.chars[0].yoffset + 30).toBe(font.chars[0]!.yoffset);
    expect(j.kernings).toEqual([]);
  });

  it('derives the image URL text.js looks up from the page name', () => {
    const fontUrl = 'https://cdn.aframe.example/fonts/DejaVu-sdf.fnt';
    const page = parseAscii(bmfontText(font, 'DejaVu-sdf.png')).pages[0]!;
    expect(fontUrl.slice(0, fontUrl.lastIndexOf('/') + 1) + page).toBe('https://cdn.aframe.example/fonts/DejaVu-sdf.png');
  });
});
