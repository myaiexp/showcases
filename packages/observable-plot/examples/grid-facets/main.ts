// gridFx and gridFy: grid lines drawn at facet positions, not inside the facets
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const GRIDS = ['gridFx', 'gridFy', 'both'] as const;

const mount: Mount = async (el, ctx) => {
  const penguins = (await csv('penguins.csv')).filter((d) => d.sex != null);
  return mountPlot<{ grid: (typeof GRIDS)[number] }>(el, ctx, {
    initial: { grid: 'both' },
    render: ({ grid }, { width, height }) =>
      Plot.plot({
        width,
        height,
        inset: 8,
        marks: [
          grid === 'gridFy' ? null : Plot.gridFx({ strokeDasharray: '5,3', strokeOpacity: 0.6 }),
          grid === 'gridFx' ? null : Plot.gridFy({ strokeDasharray: '5,3', strokeOpacity: 0.6 }),
          Plot.frame({ strokeOpacity: 0.3 }),
          Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', fx: 'species', fy: 'sex', r: 2 }),
        ],
      }),
    step: ({ grid }) => ({ grid: GRIDS[(GRIDS.indexOf(grid) + 1) % GRIDS.length] }),
    controls: (bar, live) => select(bar, 'grid', GRIDS, live.state.grid, (grid) => live.set({ grid })),
  });
};

export default mount;
