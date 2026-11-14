// The dx and dy options: nudge a second set of bars by a pixel offset
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const alphabet = await csv('alphabet.csv');
  return mountPlot<{ dx: number; dy: number }>(el, ctx, {
    initial: { dx: 3, dy: -3 },
    render: ({ dx, dy }, { width, height }) =>
      Plot.plot({
        width,
        height,
        x: { padding: 0.3 },
        marks: [
          Plot.barY(alphabet, { x: 'letter', y: 'frequency', fillOpacity: 0.4 }),
          // dx and dy shift the whole mark, in pixels, as a transform.
          Plot.barY(alphabet, { x: 'letter', y: 'frequency', fill: 'orange', dx, dy }),
        ],
      }),
    step: (_s, i) => ({ dx: Math.round(8 * Math.cos(i)), dy: Math.round(8 * Math.sin(i)) }),
    previewMs: 1000,
    controls: (bar, live) => {
      slider(bar, 'dx: ', [-20, 20, 1], 3, (dx) => live.set({ dx }));
      slider(bar, 'dy: ', [-20, 20, 1], -3, (dy) => live.set({ dy }));
    },
  });
};

export default mount;
