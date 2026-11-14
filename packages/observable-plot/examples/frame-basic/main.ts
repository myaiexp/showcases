// Frame mark on its own: the plot area outlined, with a stroke option
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const STROKES = ['currentColor', 'red', 'orange', 'steelblue'] as const;

const mount: Mount = (el, ctx) =>
  mountPlot<{ stroke: (typeof STROKES)[number] }>(el, ctx, {
    initial: { stroke: 'currentColor' },
    render: ({ stroke }, { width, height }) =>
      // A frame never takes data: its first argument is the options object.
      Plot.frame({ stroke }).plot({ width, height, x: { domain: [0, 1], grid: true } }),
    step: ({ stroke }) => ({ stroke: STROKES[(STROKES.indexOf(stroke) + 1) % STROKES.length] }),
    controls: (bar, live) => select(bar, 'stroke', STROKES, live.state.stroke, (stroke) => live.set({ stroke })),
  });

export default mount;
