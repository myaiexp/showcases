// Tick: a tickY strokes the top of each faint bar; a ruleY marks zero
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const alphabet = await csv('alphabet.csv');
  return mountPlot<{ width: number }>(el, ctx, {
    initial: { width: 2 },
    render: ({ width: strokeWidth }, { width, height }) =>
      Plot.plot({
        width,
        height,
        x: { label: null },
        y: { percent: true },
        marks: [
          Plot.barY(alphabet, { x: 'letter', y: 'frequency', fillOpacity: 0.2 }),
          Plot.tickY(alphabet, { x: 'letter', y: 'frequency', strokeWidth }),
          Plot.ruleY([0]),
        ],
      }),
    step: (_s, i) => ({ width: [1, 2, 4][i % 3] ?? 2 }),
    controls: (bar, live) => {
      slider(bar, 'tick strokeWidth', [1, 8, 0.5], live.state.width, (w) => live.set({ width: w }));
    },
  });
};

export default mount;
