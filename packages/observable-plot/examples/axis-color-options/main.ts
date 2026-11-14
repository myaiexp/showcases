// Axis color options: color sets both, stroke the ticks, fill the labels
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const MODES = ['color: red', 'stroke: identity', 'fill: red'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = (el, ctx) =>
  mountPlot<{ mode: Mode }>(el, ctx, {
    initial: { mode: MODES[0] },
    render: ({ mode }, { width, height }) => {
      const ticks = d3.ticks(0, 1, 10);
      const axis =
        mode === 'color: red'
          ? Plot.axisX(ticks, { color: 'red' }) // text fill and tick stroke
          : mode === 'stroke: identity'
            ? Plot.axisX(ticks, { stroke: Plot.identity, strokeWidth: 3, tickSize: 10 }) // tick stroke by value
            : Plot.axisX(ticks, { fill: 'red' }); // text fill
      return axis.plot({ width, height });
    },
    step: ({ mode }) => ({ mode: MODES[(MODES.indexOf(mode) + 1) % MODES.length] }),
    controls: (bar, live) => {
      select(bar, 'option', MODES, MODES[0], (mode) => live.set({ mode }));
    },
  });

export default mount;
