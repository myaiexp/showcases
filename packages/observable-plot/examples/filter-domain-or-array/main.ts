// The filter option keeps every letter on the scale; Array.filter drops them
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, type Row } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const MODES = ['filter option', 'Array.filter'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const alphabet = await csv('alphabet.csv');
  const isVowel = (d: Row): boolean => /[aeiouy]/i.test(d.letter);
  return mountPlot<{ mode: Mode }>(el, ctx, {
    initial: { mode: 'filter option' },
    render: ({ mode }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [
          mode === 'filter option'
            ? // The index is filtered, not the channel values, so x keeps all 26 letters.
              Plot.barY(alphabet, { filter: isVowel, x: 'letter', y: 'frequency' })
            : Plot.barY(alphabet.filter(isVowel), { x: 'letter', y: 'frequency' }),
        ],
      }),
    step: ({ mode }) => ({ mode: mode === 'filter option' ? 'Array.filter' : 'filter option' }),
    previewMs: 2600,
    controls: (bar, live) => select(bar, 'filter by', MODES, live.state.mode, (mode) => live.set({ mode })),
  });
};

export default mount;
