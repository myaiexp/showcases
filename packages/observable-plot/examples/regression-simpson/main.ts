// Simpson's paradox: per-species trends rise, the pooled trend falls
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot<{ groups: boolean; pooled: boolean }>(el, ctx, {
    initial: { groups: true, pooled: true },
    render: ({ groups, pooled }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        grid: true,
        color: { legend: !preview },
        marks: [
          Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', fill: 'species' }),
          // stroke by species gives one regression per species; without it, one for all.
          groups ? Plot.linearRegressionY(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', stroke: 'species' }) : null,
          pooled ? Plot.linearRegressionY(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm' }) : null,
        ],
      }),
    step: ({ groups, pooled }) => (groups && pooled ? { pooled: false } : groups ? { groups: false, pooled: true } : { groups: true, pooled: true }),
    previewMs: 2500,
    controls: (bar, live) => {
      toggle(bar, 'one fit per species', live.state.groups, (groups) => live.set({ groups }));
      toggle(bar, 'pooled fit', live.state.pooled, (pooled) => live.set({ pooled }));
    },
  });
};

export default mount;
