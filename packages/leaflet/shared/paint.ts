// Paints Natural Earth land into a canvas in any projection (the tile server's renderer)
import { intersects, worldFor, type Box, type Line } from './world.ts';

/** Map looks the pretend server knows, picked by the first path segment of a tile URL or WMS STYLES. */
export const STYLES = ['dark', 'light', 'terrain', 'vintage', 'night', 'grid'] as const;
export type Style = (typeof STYLES)[number];
/** What a tile can show; WMS picks them with LAYERS. */
export const PARTS = ['ocean', 'land', 'coast', 'borders', 'graticule', 'labels', 'tilegrid'] as const;
export type Part = (typeof PARTS)[number];

interface Palette {
  ocean: string;
  land: string | ((lat: number) => string);
  coast: string;
  border: string;
  grat: string;
  label: string;
  font: string;
}

const PALETTES: Record<Style, Palette> = {
  dark: { ocean: '#0f1720', land: '#232c38', coast: '#3f6079', border: '#46536a', grat: 'rgb(255 255 255 / 0.07)', label: '#8d9bb0', font: '600 11px system-ui, sans-serif' },
  light: { ocean: '#cadcec', land: '#f3efe4', coast: '#89acc8', border: '#c3b7a3', grat: 'rgb(0 0 0 / 0.08)', label: '#6d6655', font: '600 11px system-ui, sans-serif' },
  terrain: {
    ocean: '#1d4b68',
    land: (lat) => (Math.abs(lat) > 62 ? '#dfe7ea' : Math.abs(lat) > 45 ? '#557c45' : Math.abs(lat) > 18 ? '#9c8a58' : '#3e7a37'),
    coast: '#9fc4d8', border: 'rgb(0 0 0 / 0.3)', grat: 'rgb(255 255 255 / 0.1)', label: '#f1f1e8', font: '600 11px system-ui, sans-serif',
  },
  vintage: { ocean: '#cdbb8f', land: '#ecdfbd', coast: '#6c5634', border: '#9a7c52', grat: 'rgb(90 60 20 / 0.18)', label: '#5b4630', font: 'italic 600 12px Georgia, serif' },
  night: { ocean: '#04060a', land: '#0d1118', coast: '#e3b44a', border: '#5d4b22', grat: 'rgb(227 180 74 / 0.08)', label: '#b48c32', font: '600 11px system-ui, sans-serif' },
  grid: { ocean: '#101820', land: '#1f2833', coast: '#4b6a82', border: '#3a4656', grat: 'rgb(120 200 255 / 0.12)', label: '#7d8ba0', font: '600 11px system-ui, sans-serif' },
};

export interface PaintSpec {
  /** Image size in CSS pixels; the canvas is `scale` times that. */
  w: number;
  h: number;
  scale: number;
  /** Zoom-like detail level: picks the Natural Earth scale and when labels fit. */
  zoom: number;
  /** [lng, lat] to image pixels. */
  project: (lng: number, lat: number) => [number, number];
  /** The degrees the image covers (a little extra is fine). */
  bounds: Box;
  style: Style;
  parts: ReadonlySet<Part>;
  /** Drawn in the top-left corner when the `tilegrid` part is on, e.g. "z5 x17 y10". */
  note?: string;
}

function trace(ctx: CanvasRenderingContext2D, pts: Float64Array, project: PaintSpec['project'], close: boolean): void {
  for (let i = 0; i < pts.length; i += 2) {
    const [x, y] = project(pts[i] ?? 0, pts[i + 1] ?? 0);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  if (close) ctx.closePath();
}

function strokeLines(ctx: CanvasRenderingContext2D, all: Line[], spec: PaintSpec, color: string, width: number, dash: number[]): void {
  ctx.beginPath();
  for (const l of all) if (intersects(l.box, spec.bounds)) trace(ctx, l.pts, spec.project, false);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.setLineDash(dash);
  ctx.stroke();
  ctx.setLineDash([]);
}

const NICE = [45, 30, 15, 10, 5, 2, 1, 0.5, 0.25, 0.1, 0.05, 0.02, 0.01, 0.005, 0.002, 0.001];

function graticule(ctx: CanvasRenderingContext2D, spec: PaintSpec, color: string): void {
  const [s, w, n, e] = spec.bounds;
  const midLat = (s + n) / 2;
  const midLng = (w + e) / 2;
  const pxPerDeg = Math.abs(spec.project(midLng + 0.01, midLat)[0] - spec.project(midLng, midLat)[0]) / 0.01;
  const step = NICE.find((d) => d * pxPerDeg <= 140) ?? 0.001;
  ctx.beginPath();
  const lat0 = Math.max(-85, s);
  const lat1 = Math.min(85, n);
  for (let lng = Math.ceil(w / step) * step; lng <= e; lng += step) {
    for (let k = 0; k <= 8; k++) {
      const [x, y] = spec.project(lng, lat0 + ((lat1 - lat0) * k) / 8);
      if (k === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
  }
  for (let lat = Math.ceil(lat0 / step) * step; lat <= lat1; lat += step) {
    for (let k = 0; k <= 8; k++) {
      const [x, y] = spec.project(w + ((e - w) * k) / 8, lat);
      if (k === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
}

function labels(ctx: CanvasRenderingContext2D, spec: PaintSpec, pal: Palette): void {
  const world = worldFor(spec.zoom);
  ctx.font = pal.font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = pal.label;
  const [s, w, n, e] = spec.bounds;
  // Labels near the image count too, so a name cut by a tile edge is finished by its neighbour.
  const padLat = (n - s) * 0.6;
  const padLng = (e - w) * 0.6;
  for (const l of world.labels) {
    if (l.lat < s - padLat || l.lat > n + padLat || l.lng < w - padLng || l.lng > e + padLng) continue;
    const [x, y] = spec.project(l.lng, l.lat);
    const pxPerDeg = Math.abs(spec.project(l.lng + 1, l.lat)[0] - x);
    const width = ctx.measureText(l.name).width;
    if (l.span * pxPerDeg < width * 0.9 || l.span * pxPerDeg > 2600) continue;
    ctx.fillText(l.name, x, y);
  }
}

/** Paints one image. The context must be the canvas's own, freshly sized. */
export function paint(ctx: CanvasRenderingContext2D, spec: PaintSpec): void {
  const pal = PALETTES[spec.style];
  const has = (p: Part): boolean => spec.parts.has(p);
  ctx.save();
  ctx.scale(spec.scale, spec.scale);
  if (has('ocean')) {
    ctx.fillStyle = pal.ocean;
    ctx.fillRect(0, 0, spec.w, spec.h);
  }
  const world = worldFor(spec.zoom);
  if (has('land')) {
    const midLat = (spec.bounds[0] + spec.bounds[2]) / 2;
    if (typeof pal.land === 'function') {
      // A vertical gradient by latitude: ice near the poles, forest, desert, jungle.
      const g = ctx.createLinearGradient(0, spec.project(0, spec.bounds[2])[1], 0, spec.project(0, spec.bounds[0])[1]);
      const fill = pal.land;
      for (let k = 0; k <= 6; k++) g.addColorStop(k / 6, fill(spec.bounds[2] + ((spec.bounds[0] - spec.bounds[2]) * k) / 6));
      ctx.fillStyle = Number.isFinite(midLat) ? g : fill(0);
    } else {
      ctx.fillStyle = pal.land;
    }
    for (const shape of world.land) {
      if (!intersects(shape.box, spec.bounds)) continue;
      ctx.beginPath();
      for (const poly of shape.polys) for (const ring of poly) trace(ctx, ring, spec.project, true);
      ctx.fill('evenodd');
    }
  }
  if (has('graticule')) graticule(ctx, spec, pal.grat);
  if (has('borders')) strokeLines(ctx, world.borders, spec, pal.border, 0.8, [3, 2]);
  if (has('coast')) strokeLines(ctx, world.coast, spec, pal.coast, 1, []);
  if (has('labels') && spec.zoom >= 2) labels(ctx, spec, pal);
  if (has('tilegrid')) {
    ctx.strokeStyle = 'rgb(120 200 255 / 0.45)';
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, spec.w - 1, spec.h - 1);
    if (spec.note) {
      ctx.font = '600 12px ui-monospace, monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillStyle = 'rgb(120 200 255 / 0.9)';
      ctx.fillText(spec.note, 6, 6);
    }
  }
  ctx.restore();
}
