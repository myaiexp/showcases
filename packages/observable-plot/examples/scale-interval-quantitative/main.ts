// An interval on quantitative scales snaps values to a grid
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const random = d3.randomLcg(11);
const start = Date.UTC(2021, 5, 1);
const data = d3.range(40).map(() => ({ time: new Date(start + random() * 24 * 36e5), value: random() * 100 }));

const xIntervals = ['none', 'hour', '3 hours', 'day'] as const;
const yIntervals = ['none', '10', '25'] as const;
type XI = (typeof xIntervals)[number];
type YI = (typeof yIntervals)[number];

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { xi: 'hour' as XI, yi: 'none' as YI },
    render: ({ xi, yi }, { width, height }) =>
      Plot.plot({
        width,
        height,
        grid: true,
        x: xi === 'none' ? {} : { interval: xi },
        y: yi === 'none' ? {} : { interval: Number(yi) },
        marks: [Plot.dot(data, { x: 'time', y: 'value' })],
      }),
    step: (_s, i) => ({ xi: xIntervals[i % 4], yi: yIntervals[i % 3] }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'x interval ', xIntervals, live.state.xi, (xi) => live.set({ xi }));
      select(bar, 'y interval ', yIntervals, live.state.yi, (yi) => live.set({ yi }));
    },
  });

export default mount;
