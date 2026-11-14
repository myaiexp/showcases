// Yearly bars with a missing year: interval 1 on x makes the gap visible
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const timeseries = [
  { year: 2014, population: 7295.290765 },
  { year: 2015, population: 7379.797139 },
  { year: 2016, population: 7464.022049 },
  { year: 2017, population: 7547.858925 },
  // 2018 is missing
  { year: 2019, population: 7713.4681 },
  { year: 2020, population: 7794.798739 },
];

const mount: Mount = (el, ctx) =>
  mountPlot<{ interval: boolean }>(el, ctx, {
    initial: { interval: true },
    render: ({ interval }, { width, height }) =>
      Plot.barY(timeseries, { x: 'year', y: 'population' }).plot({
        width,
        height,
        x: { tickFormat: '', interval: interval ? 1 : undefined },
      }),
    step: ({ interval }) => ({ interval: !interval }),
    controls: (bar, live) => {
      toggle(bar, 'interval: 1', live.state.interval, (interval) => live.set({ interval }));
    },
  });

export default mount;
