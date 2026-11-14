// Dot frameAnchor: with no x or y, the anchor places a dot within the frame
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const ANCHORS = ['top-left', 'top', 'top-right', 'left', 'middle', 'right', 'bottom-left', 'bottom', 'bottom-right'] as const;

const mount: Mount = (el, ctx) =>
  mountPlot<{ r: number }>(el, ctx, {
    initial: { r: 10 },
    render: ({ r }, { width, height }) =>
      Plot.plot({
        width,
        height,
        inset: 14,
        marks: [
          Plot.frame(),
          ...ANCHORS.map((frameAnchor) => Plot.dot([frameAnchor], { frameAnchor, r, fill: frameAnchor === 'middle' ? 'orange' : 'currentColor' })),
        ],
      }),
    step: ({ r }) => ({ r: r >= 22 ? 4 : r + 6 }),
    controls: (bar, live) => slider(bar, 'r (pixels)', [2, 30, 1], live.state.r, (r) => live.set({ r })),
  });

export default mount;
