// Scaffolding for the Animate plugin examples: a slide track, a live readout, an easing curve plot
import { Line, Path, Rect, type Leafer } from 'leafer-ui';
import { GREEN } from './event-kit.ts';
import { label } from './basics.ts';
import type { Stage } from './stage.ts';

export interface Track {
  rect: Rect;
  /** x the square rests at, and the x the examples slide it to. */
  from: number;
  to: number;
  /** Square size. */
  s: number;
}

/** One slide track across the pane (a faint line and a square at its left end). `y` is the track's centre. */
export function track(stage: Stage, leafer: Leafer, y = stage.height / 2, extra: Record<string, unknown> = {}): Track {
  const s = stage.preview ? 44 : 64;
  const from = 20;
  const to = stage.width - s - 20;
  leafer.add(new Line({ x: from, y, width: to - from + s, stroke: 'rgba(0,0,0,0.14)', strokeWidth: 2, hittable: false }));
  const rect = new Rect({ x: from, y: y - s / 2, width: s, height: s, cornerRadius: s / 4, fill: GREEN, ...extra });
  leafer.add(rect);
  return { rect, from, to, s };
}

/** A monospace readout along the bottom or top, refreshed every frame from `text()`. */
export function readout(stage: Stage, text: () => string, top = false): void {
  const say = label(stage, '', !top);
  stage.loop(() => say(text()));
}

/** Samples `fn(t)` for t in 0..1 and returns a path string inside the box (y up). */
export function curvePath(fn: (t: number) => number, x: number, y: number, w: number, h: number, steps = 60): string {
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    d += `${i ? 'L' : 'M'} ${(x + w * t).toFixed(1)} ${(y + h - h * fn(t)).toFixed(1)} `;
  }
  return d;
}

/** A framed plot of an easing function: faint box, the curve, returned so it can be redrawn. */
export function plot(
  leafer: Leafer,
  fn: (t: number) => number,
  box: { x: number; y: number; w: number; h: number },
  stroke = '#32cd79',
): Path {
  const { x, y, w, h } = box;
  leafer.add(new Rect({ x, y, width: w, height: h, stroke: 'rgba(0,0,0,0.18)', strokeWidth: 1, hittable: false }));
  const curve = new Path({ path: curvePath(fn, x, y, w, h), stroke, strokeWidth: 2, hittable: false });
  leafer.add(curve);
  return curve;
}
