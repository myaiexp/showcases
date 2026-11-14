// One short series drawn with each of the common curves
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const curves = ['linear', 'step', 'basis', 'catmull-rom'] as const;
type Curve = (typeof curves)[number];

const mount: Mount = (el, ctx) => {
  const values = [3, 7, 4, 9, 5, 2, 6, 8, 4, 7];
  return mountPlot<{ curve: Curve }>(el, ctx, {
    initial: { curve: 'linear' },
    render: ({ curve }, { width, height }) =>
      Plot.plot({
        width,
        height,
        grid: true,
        y: { domain: [0, 10] },
        marks: [Plot.dot(values, { x: (_d, i) => i, y: (d) => d, fill: 'currentColor', r: 2.5 }), Plot.lineY(values, { curve })],
      }),
    step: ({ curve }) => ({ curve: curves[(curves.indexOf(curve) + 1) % curves.length] ?? 'linear' }),
    previewMs: 2200,
    controls: (bar, live) => {
      select(bar, 'curve', curves, live.state.curve, (curve) => live.set({ curve }));
    },
  });
};

export default mount;
