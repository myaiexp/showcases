// Letter frequency with vowels redrawn by a filtered bar with a red stroke
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const alphabet = await csv('alphabet.csv');
  return mountPlot<{ vowels: boolean }>(el, ctx, {
    initial: { vowels: true },
    render: ({ vowels }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [
          Plot.barY(alphabet, { x: 'letter', y: 'frequency' }),
          // The same bars again, but only for vowels, with options a channel cannot express.
          vowels
            ? Plot.barY(alphabet, { filter: (d) => /[aeiouy]/i.test(d.letter), x: 'letter', y: 'frequency', stroke: 'red', strokeWidth: 3, inset: -3 })
            : null,
        ],
      }),
    step: ({ vowels }) => ({ vowels: !vowels }),
    controls: (bar, live) => toggle(bar, 'filtered vowel bars', live.state.vowels, (vowels) => live.set({ vowels })),
  });
};

export default mount;
