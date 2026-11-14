// Select transform with functions: nearest-to-median and every tenth point
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { stocks } from '../../shared/normalize-stocks.ts';

const MODES = ['nearest the median', 'every tenth point', 'minimum, as a function'] as const;
type Mode = (typeof MODES)[number];

// A selector function returns a subset of the series index I; V holds the channel values.
function selectorMedian(I: number[], V: number[]): number[] {
  const median = d3.median(I, (i) => V[i] ?? 0) ?? 0;
  const i = d3.least(I, (j) => Math.abs((V[j] ?? 0) - median));
  return i === undefined ? [] : [i];
}
const selectorSample = (I: number[]): number[] => I.filter((_, j) => j % 10 === 0);
const selectorMin = (I: number[], V: number[]): number[] => {
  const i = d3.least(I, (j) => V[j] ?? 0);
  return i === undefined ? [] : [i];
};

const mount: Mount = async (el, ctx) => {
  const all = await stocks();
  const o = { x: 'Date', y: 'Close', z: 'Symbol', fill: 'Symbol', r: 3 } as const;
  return mountPlot<{ mode: Mode }>(el, ctx, {
    initial: { mode: 'nearest the median' },
    render: ({ mode }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true },
        marks: [
          Plot.line(all, { x: 'Date', y: 'Close', stroke: 'Symbol', strokeOpacity: 0.4 }),
          Plot.dot(
            all,
            mode === 'every tenth point'
              ? Plot.select({ y: selectorSample }, { ...o })
              : Plot.select({ y: mode === 'nearest the median' ? selectorMedian : selectorMin }, { ...o }),
          ),
        ],
      }),
    step: ({ mode }) => ({ mode: MODES[(MODES.indexOf(mode) + 1) % MODES.length] ?? 'nearest the median' }),
    controls: (bar, live) => {
      select(bar, 'selector function', MODES, live.state.mode, (mode) => live.set({ mode }));
    },
  });
};

export default mount;
