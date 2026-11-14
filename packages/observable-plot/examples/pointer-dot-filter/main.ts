// The pointer transform keeps only the nearest red dot
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  const red = { x: 'culmen_length_mm', y: 'culmen_depth_mm', fill: 'red', r: 8 };
  return mountPlot<{ pointered: boolean }>(el, ctx, {
    initial: { pointered: true },
    render: ({ pointered }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [
          Plot.dot(penguins, pointered ? Plot.pointer(red) : red),
          Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm' }),
        ],
      }),
    step: ({ pointered }, i) => ({ pointered: i % 4 === 3 ? !pointered : pointered }),
    previewMs: 2000,
    after: (root, _live, size) =>
      size.preview ? sweepPointer(root, (t) => [0.15 + 0.7 * t, 0.5 + 0.3 * Math.sin(t * Math.PI * 4)], 4000) : undefined,
    controls: (bar, live) => {
      toggle(bar, 'use Plot.pointer', live.state.pointered, (pointered) => live.set({ pointered }));
    },
  });
};

export default mount;
