// Dot symbol channel: species by shape, colour, or both
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const ENCODINGS = ['symbol and colour', 'symbol only', 'colour only'] as const;

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot<{ enc: (typeof ENCODINGS)[number] }>(el, ctx, {
    initial: { enc: 'symbol and colour' },
    render: ({ enc }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        grid: true,
        x: { label: 'Body mass (g)' },
        y: { label: 'Flipper length (mm)' },
        symbol: { legend: !preview },
        marks: [
          Plot.dot(penguins, {
            x: 'body_mass_g',
            y: 'flipper_length_mm',
            stroke: enc === 'symbol only' ? undefined : 'species',
            symbol: enc === 'colour only' ? undefined : 'species',
          }),
        ],
      }),
    step: ({ enc }) => ({ enc: ENCODINGS[(ENCODINGS.indexOf(enc) + 1) % ENCODINGS.length] }),
    controls: (bar, live) => select(bar, 'encode species by', ENCODINGS, live.state.enc, (enc) => live.set({ enc })),
  });
};

export default mount;
