// Fractional waffles: partial cells, and round as true, Math.floor or Math.ceil
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const ROUNDS = ['off', 'true', 'floor', 'ceil'] as const;
const MODES = { off: false, true: true, floor: Math.floor, ceil: Math.ceil } as const;
const data = [
  { fruit: 'figs', count: 12.4 },
  { fruit: 'plums', count: 8.5 },
  { fruit: 'limes', count: 15.7 },
  { fruit: 'kiwis', count: 5.2 },
];

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { round: 'off' as (typeof ROUNDS)[number] },
    render: ({ round }, { width, height }) =>
      Plot.waffleY(data, { x: 'fruit', y: 'count', fill: 'fruit', round: MODES[round], gap: 2, rx: 2 }).plot({
        width,
        height: height ?? 380,
        x: { label: null },
        color: { legend: false },
      }),
    step: ({ round }) => ({ round: ROUNDS[(ROUNDS.indexOf(round) + 1) % ROUNDS.length] ?? 'off' }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'round', ROUNDS, live.state.round, (round) => live.set({ round }));
    },
  });

export default mount;
