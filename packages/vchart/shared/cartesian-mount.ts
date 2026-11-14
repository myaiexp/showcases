// Mount helper for examples whose chart redraws new values on a timer (card) or a button (full view)
import type { MountContext } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { button, controlBar, createChart, every, type Chart } from './chart.ts';

export interface DataMount {
  /** The chart spec; its data entry must have the id `dataId`, holding `next()`'s first result. */
  spec: ISpec;
  dataId?: string;
  /** Fresh values for the data entry. */
  next(): Record<string, unknown>[];
  /** Card only: ms between data refreshes. */
  previewMs?: number;
  /** Full view only: more controls; `alive()` is false once the example was cleaned up. */
  controls?(bar: HTMLElement, chart: Chart, alive: () => boolean): void;
  /** Called with the chart after the first render, in both views (a card may animate it itself). */
  setup?(chart: Chart, alive: () => boolean): (() => void) | void;
  /** Hide the "New data" button. */
  noButton?: boolean;
}

export function mountData(el: HTMLElement, ctx: MountContext, o: DataMount): () => void {
  const bar = ctx.preview ? null : controlBar(el);
  const chart = createChart(el, ctx, o.spec);
  let alive = true;
  const isAlive = (): boolean => alive;
  const refresh = (): void => {
    if (alive) void chart.vchart.updateData(o.dataId ?? 'data', o.next());
  };
  let stop: () => void = () => {};
  if (bar) {
    if (!o.noButton) button(bar, 'New data', refresh);
    o.controls?.(bar, chart, isAlive);
  } else if (!o.noButton) {
    stop = every(o.previewMs ?? 2200, refresh);
  }
  const stopSetup = o.setup?.(chart, isAlive);
  return () => {
    alive = false;
    stop();
    stopSetup?.();
    chart.release();
  };
}
