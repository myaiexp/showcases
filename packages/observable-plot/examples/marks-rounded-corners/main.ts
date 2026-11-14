// Rounded corners: r for all corners, or one side or corner at a time
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const OPTIONS = ['r', 'rx1', 'rx2', 'ry1', 'ry2', 'rx1y1', 'rx1y2', 'rx2y1', 'rx2y2', 'rx', 'ry'] as const;
type Corner = (typeof OPTIONS)[number];

const mount: Mount = async (el, ctx) => {
  const alphabet = await csv('alphabet.csv');
  return mountPlot<{ option: Corner; radius: number }>(el, ctx, {
    initial: { option: 'r', radius: 8 },
    render: ({ option, radius }, { width, height }) =>
      Plot.barY(alphabet, { x: 'letter', y: 'frequency', fill: 'steelblue', [option]: radius }).plot({
        width,
        height,
        x: { padding: 0.2 },
      }),
    step: (_s, i) => ({ option: OPTIONS[i % OPTIONS.length], radius: 4 }),
    previewMs: 1400,
    controls: (bar, live) => {
      select(bar, 'option', OPTIONS, 'r', (option) => live.set({ option }));
      slider(bar, 'radius: ', [0, 20, 1], 8, (radius) => live.set({ radius }));
    },
  });
};

export default mount;
