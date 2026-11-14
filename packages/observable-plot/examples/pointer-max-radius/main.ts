// The pointer maxRadius option: how far a point can be focused
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const athletes = thin(all, ctx.preview ? 12 : 4);
  return mountPlot<{ maxRadius: number }>(el, ctx, {
    initial: { maxRadius: 20 },
    render: ({ maxRadius }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [
          Plot.dot(athletes, { x: 'weight', y: 'height', r: 2, fillOpacity: 0.5 }),
          Plot.dot(athletes, Plot.pointer({ x: 'weight', y: 'height', r: 5, stroke: 'red', strokeWidth: 2, maxRadius })),
          Plot.tip(athletes, Plot.pointer({ x: 'weight', y: 'height', maxRadius })),
        ],
      }),
    step: (_s, i) => ({ maxRadius: [20, 80, 5][i % 3] ?? 20 }),
    previewMs: 2400,
    after: (root, _live, size) =>
      size.preview ? sweepPointer(root, (t) => [0.2 + 0.6 * t, 0.5 + 0.3 * Math.sin(t * Math.PI * 4)], 2400) : undefined,
    controls: (bar, live) => {
      slider(bar, 'maxRadius (px)', [1, 200, 1], live.state.maxRadius, (maxRadius) => live.set({ maxRadius }));
    },
  });
};

export default mount;
