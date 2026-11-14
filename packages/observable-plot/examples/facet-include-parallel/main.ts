// Top-level facet data: parallel (not identical) mark data needs facet: include
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  // Same length and order as penguins, but a different array.
  const derived = penguins.map((d) => ({ mass: d.body_mass_g, flipper: d.flipper_length_mm }));
  return mountPlot(el, ctx, {
    initial: { include: true },
    render: ({ include }, { width, height }) =>
      Plot.plot({
        width,
        height,
        grid: true,
        facet: { data: penguins, x: 'species' },
        marks: [
          Plot.frame(),
          // Without facet: true the derived array is not strictly equal to the facet data
          // so every facet repeats all of it.
          Plot.dot(derived, { x: 'mass', y: 'flipper', facet: include ? 'include' : 'auto', r: 2 }),
        ],
      }),
    step: ({ include }) => ({ include: !include }),
    previewMs: 2200,
    controls: (bar, live) => {
      toggle(bar, 'facet: include', live.state.include, (include) => live.set({ include }));
    },
  });
};

export default mount;
