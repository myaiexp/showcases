// Contour of a 10 by 10 grid, with the numbers drawn by a text mark
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const VIEWS = ['numbers only', 'contours under numbers'] as const;
type View = (typeof VIEWS)[number];

const grid = { width: 10, height: 10, values: d3.cross(d3.range(10), d3.range(10), (x, y) => x * y) };

const mount: Mount = async (el, ctx) =>
  mountPlot<{ view: View }>(el, ctx, {
    initial: { view: 'numbers only' },
    render: ({ view }, { width, height }) => {
      const text = (fill: string | typeof Plot.identity) =>
        Plot.text(grid.values, {
          text: Plot.identity,
          fill,
          x: (_d: number, i: number) => (i % grid.width) + 0.5,
          y: (_d: number, i: number) => Math.floor(i / grid.width) + 0.5,
        });
      if (view === 'numbers only') {
        return Plot.plot({
          width,
          height,
          grid: true,
          x: { domain: [0, grid.width], label: 'column' },
          y: { domain: [0, grid.height], label: 'row' },
          marks: [text(Plot.identity)],
        });
      }
      return Plot.plot({
        width,
        height,
        marks: [Plot.contour(grid.values, { width: grid.width, height: grid.height, fill: Plot.identity, interval: 5 }), text('white')],
      });
    },
    step: ({ view }) => ({ view: VIEWS[(VIEWS.indexOf(view) + 1) % VIEWS.length] }),
    previewMs: 2800,
    controls: (bar, live) => {
      select(bar, 'view', VIEWS, live.state.view, (view) => live.set({ view }));
    },
  });

export default mount;
