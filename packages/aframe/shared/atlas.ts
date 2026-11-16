// Renders a typeface into a signed-distance glyph atlas with Canvas 2D.
import { CHARSET, encodeDistances, packRects, signedDistances, type BMChar, type BMFont } from './sdf.ts';

/** Glyph render size in pixels and distance range either side of the edge. */
const SIZE = 32;
const SPREAD = 5;
/**
 * The msdf shader divides by fwidth(distance), which is 0 wherever neighbouring texels hold
 * the same value. Some GL implementations (Chrome's SwiftShader) then draw the glyph's whole
 * quad edge. Encoding the msdf copy over a wider range keeps every texel inside a glyph cell
 * off the 0 and 255 rails (a cell corner is about 7 px from the ink), so nothing is flat there.
 */
const MSDF_SPREAD = 8;

export interface FaceSpec {
  /** CSS font-family list for the 2D context. */
  family: string;
  weight: number;
}

export interface Atlas {
  font: BMFont;
  /** Atlas for A-Frame's sdf shader, which reads alpha (high inside). */
  png: Blob;
  /** Same atlas for the msdf shader, which reads rgb and negates it by default (low inside). */
  pngMsdf?: Blob;
}

interface Cell { id: number; text: string; left: number; asc: number; w: number; h: number; adv: number }

function canvas(w: number, h: number): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

/** Builds one atlas; `msdf` also encodes it in the msdf shader's polarity (the distances are computed once). */
export async function buildAtlas(spec: FaceSpec, msdf = false): Promise<Atlas> {
  const css = `${spec.weight} ${SIZE}px ${spec.family}`;
  const probe = canvas(1, 1).getContext('2d')!;
  probe.font = css;
  const m = probe.measureText('Hg');
  const ascent = m.fontBoundingBoxAscent ?? SIZE * 0.95;
  const descent = m.fontBoundingBoxDescent ?? SIZE * 0.25;

  // Measure every glyph into a padded cell.
  const cells: Cell[] = [];
  const blanks: Cell[] = [];
  for (const id of CHARSET) {
    const text = String.fromCodePoint(id);
    const t = probe.measureText(text);
    const left = Math.ceil(t.actualBoundingBoxLeft);
    const asc = Math.ceil(t.actualBoundingBoxAscent);
    const inkW = left + Math.ceil(t.actualBoundingBoxRight);
    const inkH = asc + Math.ceil(t.actualBoundingBoxDescent);
    const cell = { id, text, left, asc, w: inkW + 2 * SPREAD, h: inkH + 2 * SPREAD, adv: Math.round(t.width) };
    (id === 32 || inkW <= 0 || inkH <= 0 ? blanks : cells).push(cell);
  }

  const { size, at } = packRects(cells);

  // Draw all coverage into one canvas, then read it back once.
  const cov = canvas(size, size);
  const cctx = cov.getContext('2d', { willReadFrequently: true })!;
  cctx.font = css;
  cctx.fillStyle = '#fff';
  cctx.textBaseline = 'alphabetic';
  cells.forEach((c, i) => cctx.fillText(c.text, at[i]!.x + SPREAD + c.left, at[i]!.y + SPREAD + c.asc));
  const src = cctx.getImageData(0, 0, size, size).data;

  const dist = new Uint8Array(size * size); // 0 outside everywhere a glyph cell is not
  const wide = msdf ? new Uint8Array(size * size) : null;
  const base = Math.round(ascent);
  const chars: BMChar[] = [];
  const cover: number[] = [];
  cells.forEach((c, i) => {
    const { x, y } = at[i]!;
    cover.length = c.w * c.h;
    for (let r = 0; r < c.h; r++) {
      for (let q = 0; q < c.w; q++) cover[r * c.w + q] = src[((y + r) * size + x + q) * 4 + 3]!;
    }
    const signed = signedDistances(cover, c.w, c.h);
    const sdf = encodeDistances(signed, SPREAD);
    const sdfWide = wide ? encodeDistances(signed, MSDF_SPREAD) : null;
    for (let r = 0; r < c.h; r++) {
      for (let q = 0; q < c.w; q++) {
        dist[(y + r) * size + x + q] = sdf[r * c.w + q]!;
        if (wide) wide[(y + r) * size + x + q] = sdfWide![r * c.w + q]!;
      }
    }
    chars.push({ id: c.id, x, y, width: c.w, height: c.h, xoffset: -(SPREAD + c.left),
      yoffset: base - (SPREAD + c.asc), xadvance: c.adv });
  });
  for (const c of blanks) {
    chars.push({ id: c.id, x: 0, y: 0, width: 0, height: 0, xoffset: 0, yoffset: 0, xadvance: c.adv });
  }
  chars.sort((a, b) => a.id - b.id);

  return {
    png: await toPng(size, dist, false),
    pngMsdf: wide ? await toPng(size, wide, true) : undefined,
    font: { face: spec.family, size: SIZE, lineHeight: Math.round(ascent + descent), base,
      scaleW: size, scaleH: size, spread: SPREAD, chars },
  };
}

/** Distances to PNG: sdf puts them in alpha (rgb white); msdf puts 1 - d in opaque rgb. */
function toPng(size: number, dist: Uint8Array, msdf: boolean): Promise<Blob> {
  const px = new Uint8ClampedArray(size * size * 4);
  for (let i = 0; i < dist.length; i++) {
    const d = dist[i]!;
    const o = i * 4;
    if (msdf) { px[o] = px[o + 1] = px[o + 2] = 255 - d; px[o + 3] = 255; }
    else { px[o] = px[o + 1] = px[o + 2] = 255; px[o + 3] = d; }
  }
  const page = canvas(size, size);
  page.getContext('2d')!.putImageData(new ImageData(px, size, size), 0, 0);
  return new Promise<Blob>((res, rej) =>
    page.toBlob((b) => (b ? res(b) : rej(new Error('PNG encoding failed'))), 'image/png'));
}
