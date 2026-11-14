// Helpers for the Self-adaption examples: resize a chart's container from code
import { every } from './chart.ts';

export type Axis = 'width' | 'height';

/** Sets a container's width or height in pixels; VChart's autoFit follows the container itself. */
export function setSize(container: HTMLElement, axis: Axis, px: number): void {
  container.style[axis] = `${px}px`;
}

/**
 * Toggles the container between `big` and `small` pixels on `axis` every `ms`, so the media
 * queries fire in a card without a pointer. Returns the stop function.
 */
export function shrinkLoop(container: HTMLElement, axis: Axis, big: number, small: number, ms = 2200): () => void {
  let small_ = false;
  return every(ms, () => {
    small_ = !small_;
    setSize(container, axis, small_ ? small : big);
  });
}

/** Seeded, fixed rows for the media query charts. */
export const ELEMENT_ROWS = [
  { type: 'oxygen', value: 46.6 },
  { type: 'silicon', value: 27.72 },
  { type: 'aluminum', value: 8.13 },
  { type: 'iron', value: 5 },
  { type: 'calcium', value: 3.63 },
  { type: 'sodium', value: 2.83 },
  { type: 'potassium', value: 2.59 },
  { type: 'others', value: 3.5 },
];

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const monthRows = MONTHS.map((month, i) => ({ month, sales: 18 + ((i * 19) % 37) }));
