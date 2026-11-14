// Hexgrid styling: stroke, strokeOpacity, and a frame in place of a fill
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const STROKES = ['red', 'currentColor', 'orange', 'steelblue'] as const;

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot<{ stroke: (typeof STROKES)[number] }>(el, ctx, {
    initial: { stroke: 'red' },
    render: ({ stroke }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [
          // hexgrid has no fill: a frame behind it gives the grid a coloured ground.
          Plot.frame({ fill: stroke, fillOpacity: 0.08, stroke: 'none' }),
          Plot.hexgrid({ stroke, strokeOpacity: 0.6 }),
          Plot.dot(penguins, Plot.hexbin<Plot.DotOptions>({ r: 'count' }, { x: 'body_mass_g', y: 'flipper_length_mm', fill: stroke, fillOpacity: 0.7 })),
        ],
      }),
    step: ({ stroke }) => ({ stroke: STROKES[(STROKES.indexOf(stroke) + 1) % STROKES.length] }),
    controls: (bar, live) => select(bar, 'stroke', STROKES, live.state.stroke, (stroke) => live.set({ stroke })),
  });
};

export default mount;
