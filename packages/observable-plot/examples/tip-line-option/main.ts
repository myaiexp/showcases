// Tip: the tip: true shorthand, or an explicit tip mark over pointerX
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot<{ explicit: boolean }>(el, ctx, {
    initial: { explicit: false },
    render: ({ explicit }, { width, height }) =>
      explicit
        ? Plot.plot({
            width,
            height,
            y: { grid: true },
            marks: [Plot.lineY(aapl, { x: 'Date', y: 'Close' }), Plot.tip(aapl, Plot.pointerX({ x: 'Date', y: 'Close' }))],
          })
        : Plot.lineY(aapl, { x: 'Date', y: 'Close', tip: true }).plot({ width, height, y: { grid: true } }),
    step: ({ explicit }) => ({ explicit: !explicit }),
    previewMs: 4000,
    after: (root, _live, size) => (size.preview ? sweepPointer(root, (t) => [0.1 + 0.8 * t, 0.5], 4000) : undefined),
    controls: (bar, live) => {
      toggle(bar, 'explicit Plot.tip + pointerX', live.state.explicit, (explicit) => live.set({ explicit }));
    },
  });
};

export default mount;
