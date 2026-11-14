// Warming stripes: a cell mark on an ordinal x scale with interval: 1
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { hadcrut } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await hadcrut();
  return mountPlot<{ interval: boolean; gap: boolean }>(el, ctx, {
    initial: { interval: true, gap: false },
    // Card: drop a decade of years in and out to show what the interval does with gaps.
    step: ({ gap }) => ({ gap: !gap }),
    previewMs: 2600,
    render: ({ interval, gap }, { width, height }) => {
      const data = gap ? all.filter((d) => d.year < 1950 || d.year >= 1970) : all;
      return Plot.plot({
        width,
        height,
        x: {
          ticks: d3.ticks(...(d3.extent(all, (d) => d.year) as [number, number]), 10),
          tickFormat: 'd',
          interval: interval ? 1 : undefined,
          label: null,
        },
        color: { scheme: 'BuRd' },
        marks: [Plot.cell(data, { x: 'year', fill: 'anomaly' })],
      });
    },
    controls: (bar, live) => {
      toggle(bar, 'interval: 1', live.state.interval, (interval) => live.set({ interval }));
      toggle(bar, 'remove 1950 to 1969', live.state.gap, (gap) => live.set({ gap }));
    },
  });
};

export default mount;
