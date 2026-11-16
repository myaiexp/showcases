// Element reference helpers: centre a shape, sweep a property, caption
import { Text, type Leafer } from 'leafer-ui';
import { checkbox, select, slider } from './controls.ts';
import type { Stage } from './stage.ts';

/** Shape size in px: the docs draw 100, a card has room for 120 and the full view for 200. */
export const size = (stage: Pick<Stage, 'preview'>): number => (stage.preview ? 120 : 200);

/** Top-left that centres a `w` × `h` shape in the pane. */
export function mid(stage: Pick<Stage, 'width' | 'height'>, w: number, h = w): { x: number; y: number } {
  return { x: Math.round((stage.width - w) / 2), y: Math.round((stage.height - h) / 2) };
}

/**
 * Full view: a slider that calls `set(value)`. Card: no pointer, so a loop sweeps the value
 * between `min` and `max` every `period` seconds (snapped to `step`).
 */
export function drive(
  stage: Stage,
  label: string,
  [min, max, step]: readonly [number, number, number],
  value: number,
  set: (v: number) => void,
  period = 4,
  format?: (v: number) => string,
): void {
  set(value);
  if (stage.bar) {
    slider(stage.bar, label, min, max, step, value, set, format);
    return;
  }
  // A card pane is 260 x 200: a pixel-size range made for the full view stops at 80% of the pane height.
  const hi = max - min > 150 && min >= 0 && !label.startsWith('scroll') ? Math.min(max, stage.height * 0.8) : max;
  stage.loop((_dt, t) => {
    const u = 0.5 - 0.5 * Math.cos((t / period) * Math.PI * 2);
    set(Math.round((min + (hi - min) * u) / step) * step);
  });
}

/** Full view: a select. Card: cycles through the options every `ms`. */
export function pick<T extends string>(
  stage: Stage,
  label: string,
  options: readonly T[],
  set: (v: T) => void,
  ms = 1500,
  value: T = options[0]!,
): void {
  set(value);
  if (stage.bar) {
    select(stage.bar, label, options, set, value);
    return;
  }
  let i = options.indexOf(value);
  stage.every(ms, () => {
    i = (i + 1) % options.length;
    set(options[i]!);
  });
}

/** Full view: a checkbox. Card: flips every `ms`. */
export function toggle(stage: Stage, label: string, value: boolean, set: (v: boolean) => void, ms = 1500): void {
  set(value);
  if (stage.bar) {
    checkbox(stage.bar, label, value, set);
    return;
  }
  let v = value;
  stage.every(ms, () => {
    v = !v;
    set(v);
  });
}

/** A line of grey text along the bottom of the pane; assign `.text` to update it. */
export function caption(stage: Stage, leafer: Leafer, text = ''): Text {
  const t = new Text({
    x: 0,
    y: stage.height - (stage.preview ? 24 : 30),
    width: stage.width,
    text,
    fill: '#666',
    fontSize: stage.preview ? 11 : 14,
    textAlign: 'center',
    hittable: false,
  });
  leafer.add(t);
  return t;
}
