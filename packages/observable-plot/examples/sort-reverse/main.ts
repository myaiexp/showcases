// Reverse transform: flip the mark index so the last penguins are drawn first
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot<{ reversed: boolean }>(el, ctx, {
    initial: { reversed: true },
    render: ({ reversed }, { width, height, preview }) => {
      const o = { x: 'culmen_length_mm', y: 'culmen_depth_mm', fill: 'species', r: preview ? 9 : 14, fillOpacity: 0.9, stroke: 'var(--plot-background)' };
      return Plot.plot({
        width,
        height,
        grid: true,
        color: { legend: !preview },
        marks: [Plot.dot(penguins, reversed ? Plot.reverse(o) : o)],
      });
    },
    step: ({ reversed }) => ({ reversed: !reversed }),
    controls: (bar, live) => {
      toggle(bar, 'reverse', live.state.reversed, (reversed) => live.set({ reversed }));
    },
  });
};

export default mount;
