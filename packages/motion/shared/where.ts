// Where an element sits inside a card frame, as a scripted-pointer coordinate
import type { Point } from './pointer.ts';

/** The point (fx, fy) of `target`'s box, in px from the top-left of `frame`. Defaults to its centre. */
export function at(frame: HTMLElement, target: Element, fx = 0.5, fy = 0.5): Point {
  const f = frame.getBoundingClientRect();
  const r = target.getBoundingClientRect();
  return { x: r.left - f.left + r.width * fx, y: r.top - f.top + r.height * fy };
}
