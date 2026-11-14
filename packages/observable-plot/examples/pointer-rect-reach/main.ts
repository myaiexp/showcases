// Pointing histogram rects: pointerX versus two-dimensional reach
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, type Row } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

const MODES = ['xy', 'x'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  const x = (d: Row) => Math.log10(d.Volume);
  return mountPlot<{ mode: Mode }>(el, ctx, {
    initial: { mode: 'xy' },
    render: ({ mode }, { width, height }) =>
      Plot.plot({
        width,
        height,
        x: { label: 'Daily volume (log₁₀)' },
        marks: [
          Plot.rectY(aapl, Plot.binX<Plot.RectYOptions>({ y: 'count' }, { x, thresholds: 40, tip: mode })),
          // The red dots mark each rect's centroid, where two-dimensional pointing is reliable.
          Plot.dot(aapl, Plot.stackY(Plot.binX<Plot.DotOptions>({ y: 'count' }, { x, thresholds: 40, stroke: 'red' }))),
        ],
      }),
    step: (_s, i) => ({ mode: MODES[i % 2] ?? 'xy' }),
    previewMs: 3000,
    after: (root, _live, size) =>
      size.preview ? sweepPointer(root, (t) => [0.1 + 0.8 * t, 0.2 + 0.5 * Math.abs(Math.sin(t * Math.PI * 3))], 3000) : undefined,
    controls: (bar, live) => {
      select(bar, 'tip', MODES, live.state.mode, (mode) => live.set({ mode }));
    },
  });
};

export default mount;
