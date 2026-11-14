// Tip: paired x1/x2 and y1/y2 show a range and a length, even for mirrored stacks
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const olympians = await csv('athletes.csv');
  return mountPlot<{ mirrored: boolean }>(el, ctx, {
    initial: { mirrored: false },
    render: ({ mirrored }, { width, height }) =>
      mirrored
        ? // Males count +1 and females -1, so the stack runs both ways from zero.
          Plot.rectY(olympians, Plot.binX<Plot.RectYOptions>({ y: 'sum' }, { x: 'weight', y: (d) => (d.sex === 'male' ? 1 : -1), fill: 'sex', tip: true })).plot({
            width,
            height,
            y: { label: 'Frequency' },
          })
        : Plot.rectY(olympians, Plot.binX<Plot.RectYOptions>({ y: 'count' }, { x: 'weight', fill: 'sex', tip: true })).plot({ width, height }),
    step: ({ mirrored }) => ({ mirrored: !mirrored }),
    previewMs: 4000,
    after: (root, _live, size) => (size.preview ? sweepPointer(root, (t) => [0.15 + 0.5 * t, 0.7], 4000) : undefined),
    controls: (bar, live) => {
      toggle(bar, 'mirror the histogram', live.state.mirrored, (mirrored) => live.set({ mirrored }));
    },
  });
};

export default mount;
