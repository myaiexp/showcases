// Frame with fy: outline one facet to draw attention to it
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const SPECIES = ['Gentoo', 'Adelie', 'Chinstrap'] as const;

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot<{ species: (typeof SPECIES)[number] }>(el, ctx, {
    initial: { species: 'Gentoo' },
    render: ({ species }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marginLeft: 80,
        inset: 10,
        marks: [Plot.frame({ fy: species }), Plot.dot(penguins, { x: 'body_mass_g', fy: 'species' })],
      }),
    step: ({ species }) => ({ species: SPECIES[(SPECIES.indexOf(species) + 1) % SPECIES.length] }),
    controls: (bar, live) => select(bar, 'framed facet', SPECIES, live.state.species, (species) => live.set({ species })),
  });
};

export default mount;
