// 1D curve chart and 2D heat plane that follow an optimization iterate
import { type Num, type Var } from '@penrose/core';
import { evaluator } from './opt-eval.ts';
import { INK, el, label, linear, makeSvg, num } from './opt-svg.ts';
import type { Stage } from './stage.ts';

export interface Chart1D {
  svg: SVGSVGElement;
  /** Layer under the ball: bands, markers. */
  layer: SVGGElement;
  sx: (x: number) => number;
  sy: (y: number) => number;
  /** Moves the ball to x, on the curve, and leaves a dot behind. */
  move(x: number): void;
  /** Value of the plotted curve at x. */
  at(x: number): number;
  /** Clears the trail and the readout. */
  reset(): void;
}

export interface Chart1DOptions {
  /** The variable that runs along the x axis. */
  x: Var;
  /** The expression plotted. */
  curve: Num;
  domain: [number, number];
  /** Top of the plot; default the larger end value. */
  top?: number;
  readout?: (x: number, y: number) => string;
}

const W = 320;
const H = 200;

/**
 * Plots `curve` as a function of one Var, evaluating it through shared/opt-eval.ts.
 * Every other Var in the expression keeps its starting value.
 */
export async function chart1d(stage: Stage, o: Chart1DOptions): Promise<Chart1D> {
  const f = await evaluator([o.x], [o.curve]);
  const at = (x: number): number => f([x])[0]!;
  const [x0, x1] = o.domain;
  const samples: [number, number][] = [];
  for (let i = 0; i <= 120; i++) {
    const x = x0 + ((x1 - x0) * i) / 120;
    samples.push([x, at(x)]);
  }
  const top = o.top ?? Math.max(1e-6, samples[0]![1], samples[120]![1]);
  const sx = linear(x0, x1, 24, W - 16);
  const sy = (y: number): number => linear(0, top, H - 34, 18)(Math.max(-0.05 * top, Math.min(y, 1.1 * top)));
  const svg = makeSvg(stage, W, H);
  const layer = el('g', {}, svg);
  el('line', { x1: 14, x2: W - 8, y1: sy(0), y2: sy(0), stroke: INK.axis, 'stroke-width': 1 }, svg);
  el(
    'polyline',
    {
      points: samples.map(([x, y]) => `${sx(x).toFixed(1)},${sy(y).toFixed(1)}`).join(' '),
      fill: 'none',
      stroke: INK.fixed,
      'stroke-width': 2,
    },
    svg,
  );
  for (const x of [x0, x1]) label(svg, sx(x), H - 18, String(x), { 'text-anchor': 'middle', fill: INK.axis });
  const trail = el('g', {}, svg);
  const ball = el('circle', { r: 6, fill: INK.iterate, stroke: '#fff', 'stroke-width': 1.5 }, svg);
  const out = label(svg, 14, H - 4, '');
  let dots = 0;
  const chart: Chart1D = {
    svg,
    layer,
    sx,
    sy,
    at,
    move(x) {
      const y = at(x);
      // The previous position stays behind as a small dot.
      if (dots > 0 || ball.getAttribute('cx')) {
        el('circle', { cx: ball.getAttribute('cx') ?? 0, cy: ball.getAttribute('cy') ?? 0, r: 2.5, fill: INK.iterate, opacity: 0.45 }, trail);
        dots++;
      }
      ball.setAttribute('cx', sx(x).toFixed(1));
      ball.setAttribute('cy', sy(y).toFixed(1));
      out.textContent = (o.readout ?? ((a, b) => `x = ${num(a)}   energy = ${num(b)}`))(x, y);
    },
    reset() {
      trail.replaceChildren();
      ball.removeAttribute('cx');
      ball.removeAttribute('cy');
      out.textContent = '';
      dots = 0;
    },
  };
  return chart;
}

export interface Plane {
  svg: SVGSVGElement;
  layer: SVGGElement;
  sx: (x: number) => number;
  sy: (y: number) => number;
  /** Moves the marker to (a, b) and extends the path from the last position. */
  move(a: number, b: number): void;
  reset(): void;
}

export interface PlaneOptions {
  a: Var;
  b: Var;
  /** Heat map of this energy; omit for a plain grid. */
  energy?: Num;
  x: [number, number];
  y: [number, number];
}

const PW = 320;
const PH = 240;

/** A heat map of an energy over two Vars, with the iterate's path drawn over it. */
export async function plane(stage: Stage, o: PlaneOptions): Promise<Plane> {
  const [x0, x1] = o.x;
  const [y0, y1] = o.y;
  const sx = linear(x0, x1, 8, PW - 8);
  const sy = linear(y0, y1, PH - 8, 8);
  const svg = makeSvg(stage, PW, PH);
  el('rect', { x: 8, y: 8, width: PW - 16, height: PH - 16, fill: '#f3f1ea' }, svg);
  if (o.energy) {
    const f = await evaluator([o.a, o.b], [o.energy]);
    const nx = 32;
    const ny = 24;
    const cells: number[] = [];
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        const a = x0 + ((i + 0.5) / nx) * (x1 - x0);
        const b = y0 + ((j + 0.5) / ny) * (y1 - y0);
        cells.push(f([a, b])[0]!);
      }
    }
    const lo = Math.min(...cells);
    const hi = Math.max(...cells);
    const heat = el('g', {}, svg);
    cells.forEach((e, k) => {
      // Square root keeps the valley floor readable next to the steep walls.
      const t = Math.sqrt(Math.max(0, (e - lo) / (hi - lo || 1)));
      const i = k % nx;
      const j = Math.floor(k / nx);
      el(
        'rect',
        {
          x: (8 + (i * (PW - 16)) / nx).toFixed(1),
          y: (PH - 8 - ((j + 1) * (PH - 16)) / ny).toFixed(1),
          width: ((PW - 16) / nx + 0.4).toFixed(1),
          height: ((PH - 16) / ny + 0.4).toFixed(1),
          fill: `hsl(215 55% ${(96 - 46 * t).toFixed(0)}%)`,
        },
        heat,
      );
    });
  }
  const layer = el('g', {}, svg);
  const path = el('polyline', { fill: 'none', stroke: INK.iterate, 'stroke-width': 1.5, 'stroke-dasharray': '3 2' }, svg);
  const dots = el('g', {}, svg);
  const mark = el('circle', { r: 6, fill: INK.iterate, stroke: '#fff', 'stroke-width': 1.5 }, svg);
  const points: string[] = [];
  return {
    svg,
    layer,
    sx,
    sy,
    move(a, b) {
      const p = `${sx(a).toFixed(1)},${sy(b).toFixed(1)}`;
      if (points[points.length - 1] !== p) points.push(p);
      el('circle', { cx: sx(a).toFixed(1), cy: sy(b).toFixed(1), r: 2.5, fill: INK.iterate, opacity: 0.5 }, dots);
      path.setAttribute('points', points.join(' '));
      mark.setAttribute('cx', sx(a).toFixed(1));
      mark.setAttribute('cy', sy(b).toFixed(1));
    },
    reset() {
      points.length = 0;
      path.setAttribute('points', '');
      dots.replaceChildren();
      mark.removeAttribute('cx');
    },
  };
}
