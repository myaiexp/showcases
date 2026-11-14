// Diamond price boxplots by carat: Math.floor on x, or interval on fx
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const MODES = ['manual bins on x', 'fx with interval'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const all = await csv('diamonds.csv');
  const diamonds = ctx.preview ? thin(all, 6) : all;
  const tickFormat = (x: number): string => x.toFixed(1);
  return mountPlot<{ mode: Mode }>(el, ctx, {
    initial: { mode: MODES[0] },
    render: ({ mode }, { width, height }) =>
      mode === MODES[0]
        ? Plot.plot({
            width,
            height,
            marginLeft: 60,
            y: { grid: true, label: 'Price' },
            x: { interval: 0.5, label: 'Carats', labelAnchor: 'right', tickFormat },
            marks: [Plot.ruleY([0]), Plot.boxY(diamonds, { x: (d) => Math.floor(d.carat * 2) / 2, y: 'price' })],
          })
        : Plot.plot({
            width,
            height,
            marginLeft: 60,
            y: { grid: true, label: 'Price' },
            fx: { interval: 0.5, label: 'Carats', labelAnchor: 'right', tickFormat },
            marks: [Plot.ruleY([0]), Plot.boxY(diamonds, { fx: 'carat', y: 'price' })],
          }),
    step: ({ mode }) => ({ mode: mode === MODES[0] ? MODES[1] : MODES[0] }),
    previewMs: 3200,
    controls: (bar, live) => {
      select(bar, 'binning', MODES, MODES[0], (mode) => live.set({ mode }));
    },
  });
};

export default mount;
