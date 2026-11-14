// Frame around faceted marks: facets read as separate panels with it on
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot<{ framed: boolean }>(el, ctx, {
    initial: { framed: true },
    render: ({ framed }, { width, height }) =>
      Plot.plot({
        width,
        height,
        grid: true,
        inset: 10,
        marks: [
          framed ? Plot.frame() : null,
          Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', fill: '#888', fillOpacity: 0.4 }),
          Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', fx: 'species' }),
        ],
      }),
    step: ({ framed }) => ({ framed: !framed }),
    controls: (bar, live) => toggle(bar, 'show frame', live.state.framed, (framed) => live.set({ framed })),
  });
};

export default mount;
