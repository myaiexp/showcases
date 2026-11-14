// Mark order: the last mark in the list is drawn on top
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const alphabet = await csv('alphabet.csv');
  return mountPlot<{ swap: boolean }>(el, ctx, {
    initial: { swap: false },
    render: ({ swap }, { width, height }) => {
      const black = Plot.barY(alphabet, { x: 'letter', y: 'frequency', dx: 2, dy: 2 });
      const green = Plot.barY(alphabet, { x: 'letter', y: 'frequency', fill: 'green', dx: -2, dy: -2 });
      return Plot.plot({ width, height, x: { padding: 0.4 }, marks: swap ? [green, black] : [black, green] });
    },
    step: ({ swap }) => ({ swap: !swap }),
    controls: (bar, live) => {
      toggle(bar, 'draw green first', false, (swap) => live.set({ swap }));
    },
  });
};

export default mount;
