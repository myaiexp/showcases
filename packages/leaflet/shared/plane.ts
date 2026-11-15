// A plain SVG plane (y down, like Point) for geometry drawn without a map
import type { Stage } from './stage.ts';

export interface XY {
  x: number;
  y: number;
}

export interface Style {
  stroke?: string;
  fill?: string;
  width?: number;
  dash?: string;
  opacity?: number;
  /** Dot radius. */
  r?: number;
  /** Text size, in plane units. */
  size?: number;
  anchor?: 'start' | 'middle' | 'end';
}

export const INK = '#e5e7eb';
export const DIM = '#4b5563';
export const BLUE = '#60a5fa';
export const GREEN = '#34d399';
export const ORANGE = '#fb923c';
export const PINK = '#f472b6';
export const YELLOW = '#facc15';

const NS = 'http://www.w3.org/2000/svg';

export interface Draw {
  line(a: XY, b: XY, s?: Style): SVGElement;
  /** An open polyline, or a closed polygon with `close`. */
  poly(points: readonly XY[], s?: Style & { close?: boolean }): SVGElement;
  dot(p: XY, s?: Style): SVGElement;
  rect(min: XY, max: XY, s?: Style): SVGElement;
  text(p: XY, text: string, s?: Style): SVGElement;
  /** A line from `a` to `b` with a head at `b`. */
  arrow(a: XY, b: XY, s?: Style): SVGElement;
  clear(): void;
}

export interface Plane {
  svg: SVGSVGElement;
  /** Drawn once (axes, grids). */
  base: Draw;
  /** Cleared by `clear()` (everything that changes). */
  live: Draw;
  clear(): void;
}

function el<K extends string>(g: SVGElement, name: K, attrs: Record<string, string | number>): SVGElement {
  const e = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v));
  g.append(e);
  return e;
}

/** `fit` raises a text size (plane units) so it is never smaller than a readable size on screen. */
function draw(g: SVGElement, fit: (size: number) => number): Draw {
  const paint = (s: Style, fillDefault = 'none'): Record<string, string | number> => ({
    stroke: s.stroke ?? INK,
    'stroke-width': s.width ?? 1.5,
    'stroke-dasharray': s.dash ?? '',
    fill: s.fill ?? fillDefault,
    // With a fill, opacity tints the fill only: the outline stays sharp.
    opacity: s.fill && s.fill !== 'none' ? 1 : (s.opacity ?? 1),
    'fill-opacity': s.fill && s.fill !== 'none' ? (s.opacity ?? 1) : 1,
    'vector-effect': 'non-scaling-stroke',
  });
  const self: Draw = {
    line: (a, b, s = {}) => el(g, 'line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y, ...paint(s) }),
    poly(points, s = {}) {
      const pts = points.map((p) => `${p.x},${p.y}`).join(' ');
      return el(g, s.close ? 'polygon' : 'polyline', { points: pts, ...paint(s) });
    },
    dot: (p, s = {}) => el(g, 'circle', { cx: p.x, cy: p.y, r: s.r ?? 4, ...paint({ stroke: 'none', ...s, fill: s.fill ?? s.stroke ?? INK }) }),
    rect: (min, max, s = {}) =>
      el(g, 'rect', { x: Math.min(min.x, max.x), y: Math.min(min.y, max.y), width: Math.abs(max.x - min.x), height: Math.abs(max.y - min.y), ...paint(s) }),
    text(p, text, s = {}) {
      const size = fit(s.size ?? 10);
      const t = el(g, 'text', {
        x: p.x,
        y: p.y,
        fill: s.fill ?? s.stroke ?? INK,
        'font-size': size,
        'text-anchor': s.anchor ?? 'start',
        'font-family': 'ui-monospace, monospace',
        'paint-order': 'stroke',
        stroke: '#0b0f14',
        'stroke-width': size * 0.3,
        opacity: s.opacity ?? 1,
      });
      t.textContent = text;
      return t;
    },
    arrow(a, b, s = {}) {
      const grp = document.createElementNS(NS, 'g');
      g.append(grp);
      const h = draw(grp, fit);
      h.line(a, b, s);
      const ang = Math.atan2(b.y - a.y, b.x - a.x);
      const len = Math.min(8, Math.hypot(b.x - a.x, b.y - a.y) / 2);
      const wing = (d: number): XY => ({ x: b.x - len * Math.cos(ang + d), y: b.y - len * Math.sin(ang + d) });
      h.poly([wing(0.45), b, wing(-0.45)], s);
      return grp;
    },
    clear() {
      g.replaceChildren();
    },
  };
  return self;
}

/** Puts an SVG into the stage's map box. `view` is [x, y, width, height] in plane units. */
export function createPlane(stage: Stage, view: readonly [number, number, number, number]): Plane {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', view.join(' '));
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  svg.style.cssText = 'width:100%;height:100%;display:block;background:#0b0f14;border-radius:inherit';
  const baseG = document.createElementNS(NS, 'g');
  const liveG = document.createElementNS(NS, 'g');
  svg.append(baseG, liveG);
  stage.box.append(svg);
  const fit = (size: number): number => {
    const r = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;
    const scale = r.width > 0 && vb.width > 0 ? Math.min(r.width / vb.width, r.height / vb.height) : 0;
    return scale > 0 ? Math.max(size, (stage.preview ? 9 : 11) / scale) : size;
  };
  const live = draw(liveG, fit);
  return { svg, base: draw(baseG, fit), live, clear: () => live.clear() };
}

/** Faint grid lines every `step` units across `view`, with the axes labelled at the origin. */
export function gridLines(d: Draw, view: readonly [number, number, number, number], step: number): void {
  const [x0, y0, w, h] = view;
  for (let x = Math.ceil(x0 / step) * step; x <= x0 + w; x += step) d.line({ x, y: y0 }, { x, y: y0 + h }, { stroke: DIM, width: 0.6, opacity: x === 0 ? 1 : 0.5 });
  for (let y = Math.ceil(y0 / step) * step; y <= y0 + h; y += step) d.line({ x: x0, y }, { x: x0 + w, y }, { stroke: DIM, width: 0.6, opacity: y === 0 ? 1 : 0.5 });
}

/** A point moving round an ellipse, for cards: t in seconds. */
export function orbit(cx: number, cy: number, rx: number, ry: number, t: number, phase = 0): XY {
  return { x: cx + rx * Math.cos(t + phase), y: cy + ry * Math.sin(t + phase) };
}

/** Runs `frame(t)` every ~50 ms with t in seconds, until the stage ends. */
export function animate(stage: Stage, frame: (t: number) => void): void {
  const t0 = performance.now();
  stage.every(50, () => frame((performance.now() - t0) / 1000));
}
