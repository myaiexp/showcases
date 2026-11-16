// Pure SDF maths, glyph packing and BMFont writers for offline text fonts.

/** Glyphs every generated font carries: ASCII 32-126 plus common Latin-1 and typographic marks. */
export const CHARSET: readonly number[] = [
  ...Array.from({ length: 95 }, (_, i) => 32 + i),
  ...[...'°×÷±µ·¡¿©®«»£€¢§¶áàâãåäæçéèêëíìîïñóòôõöøúùûüýÿÁÀÂÃÅÄÆÇÉÈÊËÍÌÎÏÑÓÒÔÕÖØÚÙÛÜÝß–—‘’“”•…']
    .map((c) => c.codePointAt(0)!),
];

const INF = 1e20;

/** 1-D squared Euclidean distance transform (Felzenszwalb/Huttenlocher) along one row or column of `grid`. */
function edt1d(grid: Float64Array, offset: number, stride: number, length: number,
  f: Float64Array, v: Uint16Array, z: Float64Array): void {
  // A line that is all one value (all 0, or all far) is already its own transform.
  const first = grid[offset]!;
  let flat = true;
  for (let q = 1; q < length; q++) if (grid[offset + q * stride] !== first) { flat = false; break; }
  if (flat) return;
  v[0] = 0;
  z[0] = -INF;
  z[1] = INF;
  f[0] = grid[offset]!;
  for (let q = 1, k = 0; q < length; q++) {
    f[q] = grid[offset + q * stride]!;
    const q2 = q * q;
    let s: number;
    do {
      const r = v[k]!;
      s = (f[q]! - f[r]! + q2 - r * r) / (q - r) / 2;
    } while (s <= z[k]! && --k > -1);
    k++;
    v[k] = q;
    z[k] = s;
    z[k + 1] = INF;
  }
  for (let q = 0, k = 0; q < length; q++) {
    while (z[k + 1]! < q) k++;
    const r = v[k]!;
    const d = q - r;
    grid[offset + q * stride] = f[r]! + d * d;
  }
}

/** 2-D squared distance transform in place: each cell becomes its squared distance to the nearest 0 cell. */
export function edt2d(grid: Float64Array, w: number, h: number): void {
  const n = Math.max(w, h);
  const f = new Float64Array(n);
  const v = new Uint16Array(n);
  const z = new Float64Array(n + 1);
  for (let x = 0; x < w; x++) edt1d(grid, x, w, h, f, v, z);
  for (let y = 0; y < h; y++) edt1d(grid, y * w, 1, w, f, v, z);
}

/**
 * Signed distance field from antialiased coverage (0 to 255 per pixel, row-major w*h).
 * Output bytes: 128 on the glyph edge, rising to 255 at `spread` pixels inside, falling to 0 at
 * `spread` pixels outside. Partial coverage places the edge at sub-pixel precision.
 */
/** Signed distance in pixels from each pixel to the coverage edge, positive outside. */
export function signedDistances(coverage: ArrayLike<number>, w: number, h: number): Float32Array {
  const outer = new Float64Array(w * h);
  const inner = new Float64Array(w * h);
  for (let i = 0; i < w * h; i++) {
    const a = coverage[i]! / 255;
    if (a === 1) {
      outer[i] = 0;
      inner[i] = INF;
    } else if (a === 0) {
      outer[i] = INF;
      inner[i] = 0;
    } else {
      const d = 0.5 - a;
      outer[i] = d > 0 ? d * d : 0;
      inner[i] = d < 0 ? d * d : 0;
    }
  }
  edt2d(outer, w, h);
  edt2d(inner, w, h);
  const out = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) out[i] = Math.sqrt(outer[i]!) - Math.sqrt(inner[i]!);
  return out;
}

/** Encodes signed distances as bytes: 128 on the edge, 255 at `spread` px inside, 0 at `spread` px outside. */
export function encodeDistances(signed: ArrayLike<number>, spread: number): Uint8Array {
  const out = new Uint8Array(signed.length);
  for (let i = 0; i < signed.length; i++) out[i] = Math.max(0, Math.min(255, Math.round(255 * (0.5 - signed[i]! / (2 * spread)))));
  return out;
}

export function signedDistanceField(coverage: ArrayLike<number>, w: number, h: number, spread: number): Uint8Array {
  return encodeDistances(signedDistances(coverage, w, h), spread);
}

export interface Rect { w: number; h: number }
export interface Placed { x: number; y: number }

/** Shelf-pack rects (1px gap) into the smallest square power-of-two page that holds them. */
export function packRects(rects: readonly Rect[]): { size: number; at: Placed[] } {
  let area = 0;
  for (const r of rects) area += (r.w + 1) * (r.h + 1);
  let size = 64;
  while (size * size < area * 1.1) size *= 2;
  const order = rects.map((_, i) => i).sort((a, b) => rects[b]!.h - rects[a]!.h || rects[b]!.w - rects[a]!.w);
  for (;; size *= 2) {
    const at: Placed[] = new Array(rects.length);
    let x = 0, y = 0, rowH = 0, ok = true;
    for (const i of order) {
      const r = rects[i]!;
      if (x + r.w > size) { x = 0; y += rowH + 1; rowH = 0; }
      if (y + r.h > size || r.w > size) { ok = false; break; }
      at[i] = { x, y };
      x += r.w + 1;
      rowH = Math.max(rowH, r.h);
    }
    if (ok) return { size, at };
  }
}

export interface BMChar {
  id: number; x: number; y: number; width: number; height: number;
  xoffset: number; yoffset: number; xadvance: number;
}

export interface BMFont {
  face: string;
  /** Size the glyphs were rendered at, in pixels. */
  size: number;
  lineHeight: number;
  base: number;
  scaleW: number;
  scaleH: number;
  /** Distance range in pixels either side of the edge. */
  spread: number;
  chars: BMChar[];
}

/** The font in BMFont text format (what parse-bmfont-ascii reads); only integers, as that parser expects. */
export function bmfontText(font: BMFont, pageFile: string): string {
  const p = font.spread;
  const lines = [
    `info face="${font.face}" size=${font.size} bold=0 italic=0 charset="" unicode=1 stretchH=100 smooth=1 aa=1 padding=${p},${p},${p},${p} spacing=0,0`,
    `common lineHeight=${font.lineHeight} base=${font.base} scaleW=${font.scaleW} scaleH=${font.scaleH} pages=1 packed=0`,
    `page id=0 file="${pageFile}"`,
    `chars count=${font.chars.length}`,
    ...font.chars.map((c) =>
      `char id=${c.id} x=${c.x} y=${c.y} width=${c.width} height=${c.height} xoffset=${c.xoffset} yoffset=${c.yoffset} xadvance=${c.xadvance} page=0 chnl=15`),
    'kernings count=0',
  ];
  return lines.join('\n') + '\n';
}

/**
 * The font as JSON in the shape msdf-bmfont writes. `yShift` is added to every yoffset: A-Frame
 * adds 30 to Roboto-msdf.json's glyphs, so that file is written with `yShift: -30`.
 */
export function bmfontJson(font: BMFont, pageFile: string, yShift = 0): string {
  return JSON.stringify({
    pages: [pageFile],
    chars: font.chars.map((c) => ({ ...c, yoffset: c.yoffset + yShift, page: 0, chnl: 15 })),
    info: { face: font.face, size: font.size, bold: 0, italic: 0, charset: [], unicode: 1, stretchH: 100, smooth: 1, aa: 1, padding: [0, 0, 0, 0], spacing: [0, 0] },
    common: { lineHeight: font.lineHeight, base: font.base, scaleW: font.scaleW, scaleH: font.scaleH, pages: 1, packed: 0 },
    distanceField: { fieldType: 'msdf', distanceRange: font.spread * 2 },
    kernings: [],
  });
}
