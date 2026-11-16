// Event log and labelled lanes for the animation and event examples
import { Ellipse, Line, PointerEvent, Rect, Text, type Leafer } from 'leafer-ui';
import { eventLog } from './controls.ts';
import type { Stage } from './stage.ts';

export const GREEN = '#32cd79';
export const GOLD = '#FEB027';
export const RED = '#FF4B4B';

/**
 * A log line sink: in the full view an event log under the controls, in a card a few monospace
 * lines over the pane (newest first). Redraws at most once per frame.
 */
export function logger(stage: Stage, max = stage.preview ? 5 : 9): (line: string) => void {
  if (stage.bar) return eventLog(stage.box, max);
  const div = document.createElement('div');
  div.style.cssText = `position:absolute;left:8px;top:6px;right:8px;z-index:4;pointer-events:none;
    font:10px/1.35 ui-monospace,monospace;color:#7a7a7a;white-space:pre;overflow:hidden`;
  stage.view.append(div);
  const lines: string[] = [];
  let raf = 0;
  stage.onDispose(() => cancelAnimationFrame(raf));
  return (line) => {
    lines.unshift(line);
    lines.length = Math.min(lines.length, max);
    if (!raf)
      raf = requestAnimationFrame(() => {
        raf = 0;
        div.textContent = lines.join('\n');
      });
  };
}

export interface Lanes {
  /** Top y of lane i (a 40-px band). */
  y(i: number): number;
  /** x where a shape starts and the furthest x it should reach. */
  left: number;
  right: number;
  /** Lane height. */
  h: number;
  /** Shape size inside a lane. */
  s: number;
}

/** Horizontal lanes with a name on the left of each, for animations that slide a shape along x. */
export function lanes(stage: Stage, leafer: Leafer, names: readonly string[]): Lanes {
  const h = Math.min(stage.preview ? 40 : 56, Math.floor((stage.height - 20) / names.length));
  const s = Math.round(h * 0.6);
  const top = Math.round((stage.height - h * names.length) / 2);
  const left = stage.preview ? 88 : 150;
  const right = stage.width - s - 12;
  names.forEach((name, i) => {
    const y = top + i * h;
    leafer.add(new Line({ x: 8, y: y + h, width: stage.width - 16, stroke: 'rgba(0,0,0,0.12)', hittable: false }));
    leafer.add(
      new Text({ x: 8, y: y + h / 2 - 7, text: name, fontSize: stage.preview ? 10 : 12, fill: '#666', hittable: false }),
    );
  });
  return { y: (i) => top + i * h + Math.round((h - s) / 2), left, right, h, s };
}

/** A lane's moving square. */
export function runner(l: Lanes, i: number, extra: Record<string, unknown> = {}): Rect {
  return new Rect({ x: l.left, y: l.y(i), width: l.s, height: l.s, cornerRadius: l.s / 4, fill: GREEN, ...extra });
}

/** A card/full-view replay timer: calls `go()` at once and every `ms`. */
export function replay(stage: Stage, ms: number, go: () => void): void {
  go();
  stage.every(ms, go);
}

export interface Probe {
  x: number;
  y: number;
}

/**
 * A moving test point with a red marker. Full view: it follows the pointer over the pane.
 * Card: it wanders along a Lissajous curve. `on(point)` runs at every move (world coordinates).
 */
export function probe(
  stage: Stage,
  leafer: Leafer,
  on: (p: Probe) => void,
  area = { x: 0.1, y: 0.15, w: 0.8, h: 0.6 },
): Ellipse {
  const dot = new Ellipse({ width: 10, height: 10, around: 'center', fill: RED, stroke: 'white', strokeWidth: 2, hittable: false });
  leafer.add(dot);
  const put = (x: number, y: number): void => {
    dot.set({ x, y });
    on({ x, y });
  };
  const { width: w, height: h } = stage;
  if (stage.bar) {
    put(w / 2, h / 2);
    leafer.on(PointerEvent.MOVE, (e: PointerEvent) => put(e.x, e.y));
  } else {
    stage.loop((_dt, t) => put(w * (area.x + area.w * (0.5 + 0.5 * Math.sin(t * 0.9))), h * (area.y + area.h * (0.5 + 0.5 * Math.sin(t * 1.3 + 1)))));
  }
  return dot;
}
