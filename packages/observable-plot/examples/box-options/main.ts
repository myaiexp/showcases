// Box options: fill styles the bar; stroke, strokeWidth and r the rest
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const COLORS = ['currentColor', 'steelblue', 'tomato', 'seagreen'] as const;
type State = { fill: string; stroke: string; strokeWidth: number; r: number };

const mount: Mount = async (el, ctx) => {
  const morley = await csv('morley.csv');
  return mountPlot<State>(el, ctx, {
    initial: { fill: 'steelblue', stroke: 'currentColor', strokeWidth: 1, r: 3 },
    render: ({ fill, stroke, strokeWidth, r }, { width, height }) =>
      Plot.plot({
        width,
        height,
        x: { grid: true, inset: 6 },
        marks: [Plot.boxX(morley, { x: 'Speed', y: 'Expt', fill, fillOpacity: 0.6, stroke, strokeWidth, r })],
      }),
    step: (_s, i) => ({
      fill: COLORS[i % COLORS.length],
      stroke: COLORS[(i + 2) % COLORS.length],
      strokeWidth: [1, 3, 2, 1][i % 4],
      r: [3, 6, 2, 5][i % 4],
    }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'fill', COLORS, 'steelblue', (fill) => live.set({ fill }));
      select(bar, 'stroke', COLORS, 'currentColor', (stroke) => live.set({ stroke }));
      slider(bar, 'strokeWidth', [1, 6, 1], 1, (strokeWidth) => live.set({ strokeWidth }));
      slider(bar, 'r', [1, 8, 1], 3, (r) => live.set({ r }));
    },
  });
};

export default mount;
