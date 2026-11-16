// Scaffolding for Appearance and Interaction examples: backdrop, cells, labels
import { Rect, Text, type Leafer } from 'leafer-ui';
import { slider } from './controls.ts';
import { cursorSvg } from './images.ts';
import type { Stage } from './stage.ts';

/** Light and dark bands behind a see-through element, so opacity, blends and alpha read at a glance. */
export function stripes(leafer: Leafer, stage: Pick<Stage, 'width' | 'height'>, band = 28): void {
  for (let x = 0, i = 0; x < stage.width; x += band, i++) {
    leafer.add(new Rect({ x, y: 0, width: band, height: stage.height, fill: i % 2 ? '#e4e0d6' : '#3b3f4a', hittable: false }));
  }
}

export interface Cell {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** `n` equal cells in `cols` columns, with `pad` px around each, filling the pane (minus `bottom` px for a caption). */
export function cells(stage: Pick<Stage, 'width' | 'height'>, n: number, cols: number, pad = 6, bottom = 0): Cell[] {
  const rows = Math.ceil(n / cols);
  const w = (stage.width - pad * (cols + 1)) / cols;
  const h = (stage.height - bottom - pad * (rows + 1)) / rows;
  return Array.from({ length: n }, (_, i) => ({ x: pad + (i % cols) * (w + pad), y: pad + Math.floor(i / cols) * (h + pad), w, h }));
}

/** A small grey caption at (x, y); returns it so a loop can change `.text`. */
export function note(leafer: Leafer, text: string, x: number, y: number, fontSize = 11, width?: number): Text {
  // With a width the caption gets a paper-coloured plate, so it stays readable over stripes.
  if (width) leafer.add(new Rect({ x, y: y - 2, width, height: fontSize + 5, fill: '#f7f5f0', hittable: false }));
  const t = new Text({ text, x, y, fontSize, fill: '#555', hittable: false, ...(width ? { width, textAlign: 'center' as const } : {}) });
  leafer.add(t);
  return t;
}

/** Linear 0..1..0 wave of time, `period` seconds long: for cards that sweep a value. */
export const wave = (t: number, period = 4): number => 0.5 - 0.5 * Math.cos((t / period) * Math.PI * 2);

export interface Knob {
  label: string;
  /** [min, max, step] of the slider. */
  range: readonly [number, number, number];
  /** The starting value, and the middle of the card's swing. */
  value: number;
  set: (v: number) => void;
  /** How far the card swings either side of `value` (default a quarter of the range). */
  swing?: number;
  /** Seconds per swing in a card (default varies per knob). */
  period?: number;
}

/** Full view: one slider per knob. Card: all knobs swing together around their values, so no combination degenerates. */
export function knobs(stage: Stage, list: Knob[]): void {
  for (const k of list) {
    k.set(k.value);
    if (stage.bar) slider(stage.bar, k.label, k.range[0], k.range[1], k.range[2], k.value, k.set);
  }
  if (stage.bar) return;
  stage.loop((_dt, t) => {
    list.forEach((k, i) => {
      const [min, max, step] = k.range;
      const swing = k.swing ?? (max - min) * 0.25;
      const v = k.value + swing * Math.sin((t / (k.period ?? 3 + i * 1.1)) * Math.PI * 2 + i);
      k.set(Math.round(Math.min(max, Math.max(min, v)) / step) * step);
    });
  });
}

/** `cursorSvg()` made safe for a cursor: Leafer writes `url(${url})` unquoted, so quotes and parentheses must be escaped. */
export function cursorUrl(): string {
  return cursorSvg().replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29');
}
