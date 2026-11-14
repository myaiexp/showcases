// A lollipop chart: ruleX stems topped with dots, a stylish alternative to bars
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const alphabet = await csv('alphabet.csv');
  return mountPlot<{ r: number }>(el, ctx, {
    initial: { r: 4 },
    render: ({ r }, { width, height }) =>
      Plot.plot({
        width,
        height,
        x: { label: null, tickPadding: 6, tickSize: 0 },
        y: { percent: true },
        marks: [
          Plot.ruleX(alphabet, { x: 'letter', y: 'frequency', strokeWidth: 2 }),
          Plot.dot(alphabet, { x: 'letter', y: 'frequency', fill: 'currentColor', r }),
        ],
      }),
    step: ({ r }) => ({ r: r >= 8 ? 3 : r + 2.5 }),
    controls: (bar, live) => slider(bar, 'dot radius', [2, 10, 0.5], live.state.r, (r) => live.set({ r })),
  });
};

export default mount;
