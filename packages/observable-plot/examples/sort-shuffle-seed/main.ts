// Shuffle transform: a seed fixes the random draw order of overlapping penguins
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot<{ seed: number }>(el, ctx, {
    initial: { seed: 1 },
    render: ({ seed }, { width, height, preview }) => {
      const o = { x: 'culmen_length_mm', y: 'culmen_depth_mm', fill: 'species', r: preview ? 9 : 14, fillOpacity: 0.9, stroke: 'var(--plot-background)' };
      return Plot.plot({ width, height, grid: true, color: { legend: !preview }, marks: [Plot.dot(penguins, Plot.shuffle({ seed, ...o }))] });
    },
    step: ({ seed }) => ({ seed: seed + 1 }),
    previewMs: 1800,
    controls: (bar, live) => {
      const s = slider(bar, 'seed', [1, 99, 1], live.state.seed, (seed) => live.set({ seed }));
      button(bar, 'next seed', () => {
        const seed = live.state.seed >= 99 ? 1 : live.state.seed + 1;
        s.value = String(seed);
        s.dispatchEvent(new Event('input'));
      });
    },
  });
};

export default mount;
