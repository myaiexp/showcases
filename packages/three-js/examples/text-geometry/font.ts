// A small block-letter font in typeface.json (FontData) form, built in code so nothing is fetched
import type { FontData } from 'three/addons/loaders/FontLoader.js';

// 5x7 bitmaps, top row first. '1' is a filled cell.
const BITMAPS: Record<string, string> = {
  A: '01110 10001 10001 11111 10001 10001 10001',
  B: '11110 10001 10001 11110 10001 10001 11110',
  C: '01110 10001 10000 10000 10000 10001 01110',
  D: '11110 10001 10001 10001 10001 10001 11110',
  E: '11111 10000 10000 11110 10000 10000 11111',
  F: '11111 10000 10000 11110 10000 10000 10000',
  G: '01110 10001 10000 10111 10001 10001 01111',
  H: '10001 10001 10001 11111 10001 10001 10001',
  I: '01110 00100 00100 00100 00100 00100 01110',
  J: '00111 00010 00010 00010 00010 10010 01100',
  K: '10001 10010 10100 11000 10100 10010 10001',
  L: '10000 10000 10000 10000 10000 10000 11111',
  M: '10001 11011 10101 10101 10001 10001 10001',
  N: '10001 11001 10101 10011 10001 10001 10001',
  O: '01110 10001 10001 10001 10001 10001 01110',
  P: '11110 10001 10001 11110 10000 10000 10000',
  Q: '01110 10001 10001 10001 10101 10010 01101',
  R: '11110 10001 10001 11110 10100 10010 10001',
  S: '01111 10000 10000 01110 00001 00001 11110',
  T: '11111 00100 00100 00100 00100 00100 00100',
  U: '10001 10001 10001 10001 10001 10001 01110',
  V: '10001 10001 10001 10001 10001 01010 00100',
  W: '10001 10001 10001 10101 10101 11011 10001',
  X: '10001 10001 01010 00100 01010 10001 10001',
  Y: '10001 10001 01010 00100 00100 00100 00100',
  Z: '11111 00001 00010 00100 01000 10000 11111',
  '0': '01110 10001 10011 10101 11001 10001 01110',
  '1': '00100 01100 00100 00100 00100 00100 01110',
  '2': '01110 10001 00001 00010 00100 01000 11111',
  '3': '11110 00001 00001 01110 00001 00001 11110',
  '4': '00010 00110 01010 10010 11111 00010 00010',
  '5': '11111 10000 11110 00001 00001 10001 01110',
  '6': '00110 01000 10000 11110 10001 10001 01110',
  '7': '11111 00001 00010 00100 01000 01000 01000',
  '8': '01110 10001 10001 01110 10001 10001 01110',
  '9': '01110 10001 10001 01111 00001 00010 01100',
  '!': '00100 00100 00100 00100 00100 00000 00100',
  '.': '00000 00000 00000 00000 00000 00000 00100',
  ' ': '00000 00000 00000 00000 00000 00000 00000',
};

export const SUPPORTED = Object.keys(BITMAPS).join('');

const CELL = 100; // font units per bitmap cell; the font's resolution is 1000

type Edge = { x0: number; y0: number; x1: number; y1: number };

// Trace the outline of the filled cells as closed loops, interior on the right of travel
// (clockwise for outer contours, as typeface.json fonts are). Output uses typeface.json's
// path syntax: "m x y" starts a contour and "l x y" draws a line.
function outline(rows: string[]): string {
  const filled = (c: number, r: number): boolean => rows[r]?.[c] === '1';
  const edges: Edge[] = [];
  rows.forEach((row, r) => {
    for (let c = 0; c < row.length; c++) {
      if (!filled(c, r)) continue;
      const x0 = c * CELL;
      const x1 = x0 + CELL;
      const y1 = (7 - r) * CELL;
      const y0 = y1 - CELL;
      if (!filled(c, r - 1)) edges.push({ x0, y0: y1, x1, y1 }); // top, left to right
      if (!filled(c + 1, r)) edges.push({ x0: x1, y0: y1, x1, y1: y0 }); // right, downwards
      if (!filled(c, r + 1)) edges.push({ x0: x1, y0, x1: x0, y1: y0 }); // bottom, right to left
      if (!filled(c - 1, r)) edges.push({ x0, y0, x1: x0, y1: y1 }); // left, upwards
    }
  });
  const used = new Set<Edge>();
  const parts: string[] = [];
  for (const start of edges) {
    if (used.has(start)) continue;
    const pts: [number, number][] = [];
    let edge: Edge | undefined = start;
    while (edge && !used.has(edge)) {
      used.add(edge);
      pts.push([edge.x0, edge.y0]);
      const here: Edge = edge;
      // Where two contours touch at a corner, prefer the right turn so they stay separate.
      const next: Edge[] = edges.filter((e) => !used.has(e) && e.x0 === here.x1 && e.y0 === here.y1);
      const turn = (e: Edge): number => (here.x1 - here.x0) * (e.y1 - e.y0) - (here.y1 - here.y0) * (e.x1 - e.x0);
      edge = next.sort((a, b) => turn(a) - turn(b))[0];
    }
    // Drop points in the middle of straight runs.
    const corners = pts.filter(([x, y], k) => {
      const [px, py] = pts[(k + pts.length - 1) % pts.length]!;
      const [nx, ny] = pts[(k + 1) % pts.length]!;
      return (x - px) * (ny - y) - (y - py) * (nx - x) !== 0;
    });
    parts.push(corners.map(([x, y], k) => `${k === 0 ? 'm' : 'l'} ${x} ${y}`).join(' '));
  }
  return parts.join(' ');
}

export function makeFontData(): FontData {
  const glyphs: FontData['glyphs'] = {};
  for (const [ch, bitmap] of Object.entries(BITMAPS)) {
    const o = outline(bitmap.split(' '));
    glyphs[ch] = { ha: 6 * CELL, x_min: 0, x_max: 5 * CELL, ...(o ? { o } : {}) };
  }
  return {
    glyphs,
    familyName: 'Block',
    ascender: 700,
    descender: 0,
    underlinePosition: -50,
    underlineThickness: 50,
    boundingBox: { yMin: 0, xMin: 0, yMax: 700, xMax: 500 },
    resolution: 1000,
    original_font_information: {},
  };
}
