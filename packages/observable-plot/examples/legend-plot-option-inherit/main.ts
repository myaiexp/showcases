// A top-level legend plot option is inherited by scales that set no legend
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const MODES = ['inherit: true', 'color: false', 'symbol: false', 'both false'] as const;

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot<{ mode: (typeof MODES)[number] }>(el, ctx, {
    initial: { mode: 'inherit: true' },
    render: ({ mode }, { width, height }) =>
      Plot.plot({
        width,
        height: height && height - 62, // leaves room for the legend in a card
        grid: true,
        legend: true,
        // A scale's own legend option wins over the plot-level one.
        color: mode === 'color: false' || mode === 'both false' ? { legend: false } : {},
        symbol: mode === 'symbol: false' || mode === 'both false' ? { legend: false } : {},
        marks: [
          Plot.dot(penguins, { x: 'body_mass_g', y: 'flipper_length_mm', stroke: 'sex', symbol: 'island' }),
        ],
      }),
    step: ({ mode }) => ({ mode: MODES[(MODES.indexOf(mode) + 1) % MODES.length] }),
    previewMs: 2200,
    controls: (bar, live) => {
      select(bar, 'scale legends', MODES, live.state.mode, (mode) => live.set({ mode }));
    },
  });
};

export default mount;
