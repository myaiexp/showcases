// Resize helpers: animate the width or height of a chart box so cards show responsive behaviour
import type { Stage } from './stage.ts';

/** Moves the box width between `lo` and `hi` percent on a sine, until the stage is disposed. */
export function breathe(stage: Stage, lo = 40, hi = 100, periodMs = 6000, target: HTMLElement = stage.box): void {
  const start = performance.now();
  const set = (): void => {
    const t = ((performance.now() - start) % periodMs) / periodMs;
    const k = 0.5 - 0.5 * Math.cos(t * Math.PI * 2);
    target.style.width = `${(lo + (hi - lo) * k).toFixed(1)}%`;
  };
  set();
  stage.every(100, set);
}

/** Steps the box width through `percents`, one every `ms`. */
export function steps(stage: Stage, percents: readonly number[], ms: number, target: HTMLElement = stage.box): void {
  stage.cycle(percents, ms, (p) => {
    target.style.width = `${p}%`;
  });
}
