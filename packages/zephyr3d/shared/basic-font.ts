// A pixel font built in code as TrueType bytes, for FontFace and fetchFontAsset
/**
 * The text-rendering docs fetch Inter from a CDN. A gallery card must not fetch, so the font is
 * drawn here: a 5x7 bitmap alphabet whose pixels are merged into proper outlines, written as a
 * minimal TrueType file (head, hhea, maxp, OS/2, hmtx, cmap, loca, glyf, name, post). Both the
 * browser (FontFace) and the engine's own parser (FontAsset.fromBuffer) read it.
 */

const GLYPHS: Record<string, string[]> = {
  A: ['.XXX.', 'X...X', 'X...X', 'XXXXX', 'X...X', 'X...X', 'X...X'],
  B: ['XXXX.', 'X...X', 'X...X', 'XXXX.', 'X...X', 'X...X', 'XXXX.'],
  C: ['.XXXX', 'X....', 'X....', 'X....', 'X....', 'X....', '.XXXX'],
  D: ['XXXX.', 'X...X', 'X...X', 'X...X', 'X...X', 'X...X', 'XXXX.'],
  E: ['XXXXX', 'X....', 'X....', 'XXXX.', 'X....', 'X....', 'XXXXX'],
  F: ['XXXXX', 'X....', 'X....', 'XXXX.', 'X....', 'X....', 'X....'],
  G: ['.XXXX', 'X....', 'X....', 'X.XXX', 'X...X', 'X...X', '.XXXX'],
  H: ['X...X', 'X...X', 'X...X', 'XXXXX', 'X...X', 'X...X', 'X...X'],
  I: ['XXXXX', '..X..', '..X..', '..X..', '..X..', '..X..', 'XXXXX'],
  J: ['..XXX', '...X.', '...X.', '...X.', '...X.', 'X..X.', '.XX..'],
  K: ['X...X', 'X..X.', 'X.X..', 'XX...', 'X.X..', 'X..X.', 'X...X'],
  L: ['X....', 'X....', 'X....', 'X....', 'X....', 'X....', 'XXXXX'],
  M: ['X...X', 'XX.XX', 'X.X.X', 'X.X.X', 'X...X', 'X...X', 'X...X'],
  N: ['X...X', 'XX..X', 'X.X.X', 'X..XX', 'X...X', 'X...X', 'X...X'],
  O: ['.XXX.', 'X...X', 'X...X', 'X...X', 'X...X', 'X...X', '.XXX.'],
  P: ['XXXX.', 'X...X', 'X...X', 'XXXX.', 'X....', 'X....', 'X....'],
  Q: ['.XXX.', 'X...X', 'X...X', 'X...X', 'X.X.X', 'X..X.', '.XX.X'],
  R: ['XXXX.', 'X...X', 'X...X', 'XXXX.', 'X.X..', 'X..X.', 'X...X'],
  S: ['.XXXX', 'X....', 'X....', '.XXX.', '....X', '....X', 'XXXX.'],
  T: ['XXXXX', '..X..', '..X..', '..X..', '..X..', '..X..', '..X..'],
  U: ['X...X', 'X...X', 'X...X', 'X...X', 'X...X', 'X...X', '.XXX.'],
  V: ['X...X', 'X...X', 'X...X', 'X...X', 'X...X', '.X.X.', '..X..'],
  W: ['X...X', 'X...X', 'X...X', 'X.X.X', 'X.X.X', 'XX.XX', 'X...X'],
  X: ['X...X', 'X...X', '.X.X.', '..X..', '.X.X.', 'X...X', 'X...X'],
  Y: ['X...X', 'X...X', '.X.X.', '..X..', '..X..', '..X..', '..X..'],
  Z: ['XXXXX', '....X', '...X.', '..X..', '.X...', 'X....', 'XXXXX'],
  '0': ['.XXX.', 'X...X', 'X..XX', 'X.X.X', 'XX..X', 'X...X', '.XXX.'],
  '1': ['..X..', '.XX..', '..X..', '..X..', '..X..', '..X..', '.XXX.'],
  '2': ['.XXX.', 'X...X', '....X', '...X.', '..X..', '.X...', 'XXXXX'],
  '3': ['XXXX.', '....X', '....X', '.XXX.', '....X', '....X', 'XXXX.'],
  '4': ['...X.', '..XX.', '.X.X.', 'X..X.', 'XXXXX', '...X.', '...X.'],
  '5': ['XXXXX', 'X....', 'XXXX.', '....X', '....X', 'X...X', '.XXX.'],
  '6': ['..XX.', '.X...', 'X....', 'XXXX.', 'X...X', 'X...X', '.XXX.'],
  '7': ['XXXXX', '....X', '...X.', '..X..', '.X...', '.X...', '.X...'],
  '8': ['.XXX.', 'X...X', 'X...X', '.XXX.', 'X...X', 'X...X', '.XXX.'],
  '9': ['.XXX.', 'X...X', 'X...X', '.XXXX', '....X', '...X.', '.XX..'],
  '.': ['.....', '.....', '.....', '.....', '.....', '.XX..', '.XX..'],
  '!': ['..X..', '..X..', '..X..', '..X..', '..X..', '.....', '..X..'],
  '?': ['.XXX.', 'X...X', '....X', '...X.', '..X..', '.....', '..X..'],
  '-': ['.....', '.....', '.....', 'XXXXX', '.....', '.....', '.....'],
  ':': ['.....', '..X..', '.....', '.....', '.....', '..X..', '.....'],
  ' ': ['.....', '.....', '.....', '.....', '.....', '.....', '.....'],
};

const UNIT = 100; // font units per bitmap pixel
const EM = 1000;
const ADVANCE = 600;
const ASCENT = 800;
const DESCENT = -200;

type Pt = [number, number];

/** The outline of a bitmap as closed contours (clockwise, y up), merging touching pixels. */
function outline(rows: string[]): Pt[][] {
  const filled = (x: number, y: number): boolean => y >= 0 && y < rows.length && x >= 0 && x < 5 && rows[y]![x] === 'X';
  const edges = new Map<string, Pt[]>(); // start point -> end points
  const add = (a: Pt, b: Pt): void => {
    const k = `${a[0]},${a[1]}`;
    const list = edges.get(k) ?? [];
    list.push(b);
    edges.set(k, list);
  };
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < 5; x++) {
      if (!filled(x, y)) continue;
      const x0 = x * UNIT;
      const x1 = x0 + UNIT;
      const y1 = (rows.length - y) * UNIT; // top edge, y up
      const y0 = y1 - UNIT;
      if (!filled(x - 1, y)) add([x0, y0], [x0, y1]); // left side going up
      if (!filled(x, y - 1)) add([x0, y1], [x1, y1]); // top going right
      if (!filled(x + 1, y)) add([x1, y1], [x1, y0]); // right side going down
      if (!filled(x, y + 1)) add([x1, y0], [x0, y0]); // bottom going left
    }
  }
  const contours: Pt[][] = [];
  for (const startKey of [...edges.keys()]) {
    while ((edges.get(startKey)?.length ?? 0) > 0) {
      const start = startKey.split(',').map(Number) as Pt;
      const loop: Pt[] = [start];
      let cur = start;
      for (;;) {
        const list = edges.get(`${cur[0]},${cur[1]}`);
        const next = list?.pop();
        if (!next) break;
        if (next[0] === start[0] && next[1] === start[1]) break;
        loop.push(next);
        cur = next;
      }
      // Drop points in the middle of a straight run
      const pts = loop.filter((p, i) => {
        const a = loop[(i + loop.length - 1) % loop.length]!;
        const b = loop[(i + 1) % loop.length]!;
        return (p[0] - a[0]) * (b[1] - p[1]) !== (p[1] - a[1]) * (b[0] - p[0]);
      });
      contours.push(pts);
    }
  }
  return contours;
}

class Writer {
  private bytes: number[] = [];
  get length(): number {
    return this.bytes.length;
  }
  u8(v: number): this {
    this.bytes.push(v & 255);
    return this;
  }
  u16(v: number): this {
    return this.u8(v >> 8).u8(v);
  }
  i16(v: number): this {
    return this.u16(v & 0xffff);
  }
  u32(v: number): this {
    return this.u16(v >>> 16).u16(v & 0xffff);
  }
  tag(s: string): this {
    for (const c of s) this.u8(c.charCodeAt(0));
    return this;
  }
  pad4(): this {
    while (this.bytes.length % 4) this.u8(0);
    return this;
  }
  append(other: Writer): this {
    this.bytes.push(...other.bytes);
    return this;
  }
  data(): Uint8Array {
    return Uint8Array.from(this.bytes);
  }
}

function checksum(data: Uint8Array): number {
  let sum = 0;
  for (let i = 0; i < data.length; i += 4) {
    sum = (sum + (((data[i] ?? 0) << 24) | ((data[i + 1] ?? 0) << 16) | ((data[i + 2] ?? 0) << 8) | (data[i + 3] ?? 0))) >>> 0;
  }
  return sum;
}

/** The TrueType bytes of "Pixel Showcase": A-Z (lowercase maps to the same glyphs), 0-9 and ". ! ? - :". */
export function pixelFontBytes(): ArrayBuffer {
  const chars = Object.keys(GLYPHS); // glyph i + 1 is chars[i]; glyph 0 is .notdef
  const glyf = new Writer();
  const loca = new Writer();
  const hmtx = new Writer();
  let maxPoints = 0;
  let maxContours = 0;
  const addGlyph = (contours: Pt[][], advance: number): void => {
    loca.u32(glyf.length);
    hmtx.u16(advance).i16(contours.length ? Math.min(...contours.flat().map((p) => p[0])) : 0);
    if (!contours.length) return;
    const pts = contours.flat();
    maxPoints = Math.max(maxPoints, pts.length);
    maxContours = Math.max(maxContours, contours.length);
    glyf.i16(contours.length);
    glyf.i16(Math.min(...pts.map((p) => p[0]))).i16(Math.min(...pts.map((p) => p[1])));
    glyf.i16(Math.max(...pts.map((p) => p[0]))).i16(Math.max(...pts.map((p) => p[1])));
    let end = -1;
    for (const c of contours) {
      end += c.length;
      glyf.u16(end);
    }
    glyf.u16(0); // no instructions
    for (let i = 0; i < pts.length; i++) glyf.u8(1); // on-curve, 16-bit deltas
    let prev = 0;
    for (const p of pts) {
      glyf.i16(p[0] - prev);
      prev = p[0];
    }
    prev = 0;
    for (const p of pts) {
      glyf.i16(p[1] - prev);
      prev = p[1];
    }
    glyf.pad4();
  };
  addGlyph([], ADVANCE);
  for (const ch of chars) addGlyph(outline(GLYPHS[ch]!), ch === ' ' ? 400 : ADVANCE);
  loca.u32(glyf.length);
  const numGlyphs = chars.length + 1;

  // Code points: each char, plus the lowercase twin of each letter
  const map: [number, number][] = [];
  chars.forEach((ch, i) => {
    map.push([ch.charCodeAt(0), i + 1]);
    if (/[A-Z]/.test(ch)) map.push([ch.toLowerCase().charCodeAt(0), i + 1]);
  });
  map.sort((a, b) => a[0] - b[0]);
  const segs = map.length + 1;
  const cmap = new Writer().u16(0).u16(1).u16(3).u16(1).u32(12);
  const log2 = Math.floor(Math.log2(segs));
  cmap.u16(4).u16(16 + segs * 8).u16(0).u16(segs * 2).u16(2 ** (log2 + 1)).u16(log2).u16(segs * 2 - 2 ** (log2 + 1));
  for (const [code] of map) cmap.u16(code);
  cmap.u16(0xffff).u16(0);
  for (const [code] of map) cmap.u16(code);
  cmap.u16(0xffff);
  for (const [code, glyph] of map) cmap.i16(glyph - code);
  cmap.i16(1);
  for (let i = 0; i < segs; i++) cmap.u16(0);

  const head = new Writer()
    .u32(0x00010000).u32(0x00010000).u32(0).u32(0x5f0f3cf5).u16(0x000b).u16(EM)
    .u32(0).u32(0).u32(0).u32(0)
    .i16(0).i16(DESCENT).i16(5 * UNIT).i16(7 * UNIT)
    .u16(0).u16(8).i16(2).i16(1).i16(0);
  const hhea = new Writer()
    .u32(0x00010000).i16(ASCENT).i16(DESCENT).i16(0).u16(ADVANCE).i16(0).i16(0).i16(5 * UNIT)
    .i16(1).i16(0).i16(0).i16(0).i16(0).i16(0).i16(0).i16(0).u16(numGlyphs);
  const maxp = new Writer()
    .u32(0x00010000).u16(numGlyphs).u16(maxPoints).u16(maxContours).u16(0).u16(0)
    .u16(1).u16(0).u16(0).u16(0).u16(0).u16(0).u16(0).u16(0).u16(0);
  const os2 = new Writer().u16(4).i16(ADVANCE).u16(400).u16(5).u16(0);
  for (let i = 0; i < 10; i++) os2.i16(0);
  os2.i16(0); // family class
  for (let i = 0; i < 10; i++) os2.u8(0); // panose
  os2.u32(1).u32(0).u32(0).u32(0).tag('SHOW').u16(0x40).u16(0x20).u16(0x7a);
  os2.i16(ASCENT).i16(DESCENT).i16(0).u16(ASCENT).u16(-DESCENT).u32(1).u32(0);
  os2.i16(5 * UNIT).i16(7 * UNIT).u16(0x20).u16(0x20).u16(0);
  const names = ['Pixel Showcase', 'Regular', 'PixelShowcase-1', 'Pixel Showcase Regular', 'Version 1.0', 'PixelShowcase-Regular'];
  const nameIds = [1, 2, 3, 4, 5, 6];
  const name = new Writer().u16(0).u16(names.length).u16(6 + names.length * 12);
  const strings = new Writer();
  names.forEach((s, i) => {
    name.u16(3).u16(1).u16(0x409).u16(nameIds[i]!).u16(s.length * 2).u16(strings.length);
    for (const c of s) strings.u16(c.charCodeAt(0));
  });
  name.append(strings);
  const post = new Writer().u32(0x00030000).u32(0).i16(-100).i16(50).u32(1).u32(0).u32(0).u32(0).u32(0);

  const tables: [string, Writer][] = [
    ['OS/2', os2], ['cmap', cmap], ['glyf', glyf], ['head', head], ['hhea', hhea],
    ['hmtx', hmtx], ['loca', loca], ['maxp', maxp], ['name', name], ['post', post],
  ];
  const out = new Writer();
  const entry = 2 ** Math.floor(Math.log2(tables.length));
  out.u32(0x00010000).u16(tables.length).u16(entry * 16).u16(Math.log2(entry)).u16(tables.length * 16 - entry * 16);
  let offset = 12 + tables.length * 16;
  const bodies: Uint8Array[] = [];
  for (const [tag, w] of tables) {
    const padded = new Writer().append(w).pad4().data();
    out.tag(tag).u32(checksum(padded)).u32(offset).u32(w.length);
    bodies.push(padded);
    offset += padded.length;
  }
  const header = out.data();
  const file = new Uint8Array(offset);
  file.set(header, 0);
  let at = header.length;
  for (const b of bodies) {
    file.set(b, at);
    at += b.length;
  }
  return file.buffer;
}
