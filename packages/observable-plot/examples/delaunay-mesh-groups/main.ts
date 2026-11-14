// delaunayMesh over all points, or one triangulation per species
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot<{ bySpecies: boolean }>(el, ctx, {
    initial: { bySpecies: true },
    render: ({ bySpecies }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [
          Plot.delaunayMesh(
            penguins,
            bySpecies
              ? { x: 'culmen_depth_mm', y: 'culmen_length_mm', z: 'species', stroke: 'species', strokeOpacity: 0.5 }
              : { x: 'culmen_depth_mm', y: 'culmen_length_mm' },
          ),
          Plot.dot(penguins, { x: 'culmen_depth_mm', y: 'culmen_length_mm', fill: 'species' }),
        ],
      }),
    step: ({ bySpecies }) => ({ bySpecies: !bySpecies }),
    previewMs: 2400,
    controls: (bar, live) => {
      toggle(bar, 'one mesh per species (z)', live.state.bySpecies, (bySpecies) => live.set({ bySpecies }));
    },
  });
};

export default mount;
