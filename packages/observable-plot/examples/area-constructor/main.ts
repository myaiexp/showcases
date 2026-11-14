// The general area constructor: x1, y1 and y2, with an optional x2 shear
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot(el, ctx, {
    initial: { days: 0 },
    render: ({ days }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true },
        // area is for when baseline and topline share neither x nor y; x2 shifts the topline.
        marks: [Plot.area(aapl, { x1: 'Date', x2: (d) => d3.utcDay.offset(d.Date, days), y1: 0, y2: 'Close' })],
      }),
    step: ({ days }) => ({ days: days === 0 ? 120 : days === 120 ? -120 : 0 }),
    previewMs: 2200,
    controls: (bar, live) => slider(bar, 'x2 offset (days)', [-300, 300, 10], live.state.days, (days) => live.set({ days })),
  });
};

export default mount;
