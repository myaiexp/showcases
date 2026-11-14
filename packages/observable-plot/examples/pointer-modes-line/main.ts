// Pointing modes on a line: xy, x and y
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

const MODES = ['xy', 'x', 'y'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot<{ mode: Mode }>(el, ctx, {
    initial: { mode: 'x' },
    render: ({ mode }, { width, height }) => Plot.lineY(aapl, { x: 'Date', y: 'Close', tip: mode }).plot({ width, height }),
    step: (_s, i) => ({ mode: MODES[i % 3] ?? 'x' }),
    previewMs: 3000,
    after: (root, _live, size) =>
      size.preview ? sweepPointer(root, (t) => [0.1 + 0.8 * t, 0.3 + 0.4 * Math.sin(t * Math.PI * 2)], 3000) : undefined,
    controls: (bar, live) => {
      select(bar, 'tip', MODES, live.state.mode, (mode) => live.set({ mode }));
    },
  });
};

export default mount;
