// The tip option: any mark derives a tip with the pointer transform on top
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

const MODES = ['true', 'x', 'y', 'xy'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const gistemp = await csv('gistemp.csv');
  return mountPlot<{ mode: Mode }>(el, ctx, {
    initial: { mode: 'true' },
    render: ({ mode }, { width, height }) =>
      // tip: true picks the pointing mode itself; 'x', 'y' and 'xy' choose pointerX, pointerY or pointer.
      Plot.dot(gistemp, { x: 'Date', y: 'Anomaly', tip: mode === 'true' ? true : mode }).plot({ width, height }),
    after: (root, _live, size) => (size.preview ? sweepPointer(root, (t) => [0.1 + 0.8 * t, 0.5]) : undefined),
    controls: (bar, live) => {
      select(bar, 'tip', MODES, 'true', (mode) => live.set({ mode }));
    },
  });
};

export default mount;
