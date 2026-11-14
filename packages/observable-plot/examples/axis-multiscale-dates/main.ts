// Weeks, months and years on one time axis, from three axisX marks
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      x: { round: true, nice: d3.utcWeek },
      y: { inset: 6 },
      marks: [
        Plot.frame({ fill: 'currentColor', fillOpacity: 0.1 }),
        Plot.frame({ anchor: 'bottom' }),
        Plot.axisX({ ticks: 'year', tickSize: 28, tickPadding: -11, tickFormat: '  %Y', textAnchor: 'start' }),
        Plot.axisX({ ticks: 'month', tickSize: 16, tickPadding: -11, tickFormat: '  %b', textAnchor: 'start' }),
        Plot.gridX({ ticks: 'week', stroke: 'var(--plot-background)', strokeOpacity: 1, insetBottom: -0.5 }),
        Plot.line(aapl.slice(-340, -10), { x: 'Date', y: 'Close', curve: 'step' }),
      ],
    }),
  );
};

export default mount;
