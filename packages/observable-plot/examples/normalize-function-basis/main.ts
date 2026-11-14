// Normalize transform with a function basis, via Plot.map and normalize
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { stocks } from '../../shared/normalize-stocks.ts';

const BASES = ['first (named)', 'mean of first 30 values', 'value nearest the median'] as const;
type Basis = (typeof BASES)[number];

const mount: Mount = async (el, ctx) => {
  const all = await stocks();
  return mountPlot<{ basis: Basis }>(el, ctx, {
    initial: { basis: 'mean of first 30 values' },
    render: ({ basis }, { width, height, preview }) => {
      // A basis function receives one series' values and returns the number to divide by.
      const fn =
        basis === 'first (named)'
          ? Plot.normalize('first')
          : basis === 'mean of first 30 values'
            ? Plot.normalize((v: number[]) => d3.mean(v.slice(0, 30)) ?? 1)
            : Plot.normalize((v: number[]) => d3.median(v) ?? 1);
      return Plot.plot({
        width,
        height,
        y: { type: 'log', grid: true, label: 'Close / basis' },
        color: { legend: !preview },
        marks: [Plot.ruleY([1]), Plot.line(all, Plot.map({ y: fn }, { x: 'Date', y: 'Close', stroke: 'Symbol' }))],
      });
    },
    step: ({ basis }) => ({ basis: BASES[(BASES.indexOf(basis) + 1) % BASES.length] ?? 'first (named)' }),
    controls: (bar, live) => {
      select(bar, 'basis', BASES, live.state.basis, (basis) => live.set({ basis }));
    },
  });
};

export default mount;
