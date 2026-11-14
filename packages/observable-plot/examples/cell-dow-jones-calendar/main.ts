// Cell calendar: week by weekday, one facet row per year
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('dji.csv');
  // Cards show the last six years so every cell stays visible at 200px.
  const dji = ctx.preview ? all.filter((d) => d.Date.getUTCFullYear() >= 2018) : all;
  const change = (i: number): number => {
    const [a, b] = [dji[i - 1], dji[i]];
    return a && b ? (b.Close - a.Close) / a.Close : NaN;
  };
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      padding: 0,
      x: { axis: null },
      y: { tickFormat: Plot.formatWeekday('en', 'narrow'), tickSize: 0 },
      fy: { tickFormat: '' },
      color: { scheme: 'PiYG' },
      marks: [
        Plot.cell(dji, {
          x: (d) => d3.utcWeek.count(d3.utcYear(d.Date), d.Date),
          y: (d) => d.Date.getUTCDay(),
          fy: (d) => d.Date.getUTCFullYear(),
          fill: (_d, i) => change(i),
          title: (_d, i) => (i > 0 ? (change(i) * 100).toFixed(1) : NaN),
          inset: 0.5,
        }),
      ],
    }),
  );
};

export default mount;
