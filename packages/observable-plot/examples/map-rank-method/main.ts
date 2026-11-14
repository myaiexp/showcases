// Map transform, explicit form: rank, quantile and cumsum compared
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const METHODS = ['rank', 'quantile', 'cumsum'] as const;
type Method = (typeof METHODS)[number];

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot<{ method: Method }>(el, ctx, {
    initial: { method: 'rank' },
    render: ({ method }, { width, height }) =>
      // The explicit map form: one output channel, y, takes the named method.
      Plot.lineY(aapl, Plot.map({ y: method }, { x: 'Date', y: 'Close' })).plot({ width, height, y: { grid: true, label: `${method} of close` } }),
    step: ({ method }) => ({ method: METHODS[(METHODS.indexOf(method) + 1) % METHODS.length] ?? 'rank' }),
    previewMs: 2200,
    controls: (bar, live) => {
      select(bar, 'map method', METHODS, live.state.method, (method) => live.set({ method }));
    },
  });
};

export default mount;
