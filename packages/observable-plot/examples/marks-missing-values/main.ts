// Missing and invalid data: lines break at gaps and dots with no radius vanish
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = (el, ctx) => {
  const random = d3.randomLcg(7);
  // A wave where some y values are null, undefined or NaN, and some radii are not positive.
  const data = d3.range(40).map((i) => {
    const y = Math.sin(i / 4) * 5 + (random() - 0.5);
    const bad = i % 9 === 5 ? null : i % 9 === 6 ? undefined : i % 13 === 11 ? NaN : y;
    return { i, y: bad, r: i % 7 === 3 ? 0 : 2 + (i % 5) };
  });
  return mountPlot<{ count: number }>(el, ctx, {
    initial: { count: 40 },
    render: ({ count }, { width, height }) =>
      Plot.plot({
        width,
        height,
        grid: true,
        // Line and area stop before an invalid point and resume at the next valid one.
        marks: [Plot.lineY(data.slice(0, count), { x: 'i', y: 'y' }), Plot.dot(data.slice(0, count), { x: 'i', y: 'y', r: 'r', fill: 'currentColor' })],
      }),
    step: (_s, i) => ({ count: 8 + ((i * 8) % 33) }),
    previewMs: 1200,
    controls: (bar, live) => {
      slider(bar, 'points: ', [8, 40, 1], 40, (count) => live.set({ count }));
    },
  });
};

export default mount;
