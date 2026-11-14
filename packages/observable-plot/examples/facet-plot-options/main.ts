// The facet plot option: grid, label and margin apply to the fx and fy axes only
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot(el, ctx, {
    initial: { grid: true, label: true, marginRight: 80 },
    render: ({ grid, label, marginRight }, { width, height }) =>
      Plot.plot({
        width,
        height,
        facet: { grid, marginRight, ...(label ? {} : { label: null }) },
        marks: [
          Plot.frame(),
          Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', fx: 'sex', fy: 'species', r: 1.5 }),
        ],
      }),
    step: (_s, i) => ({ grid: i % 2 === 0, label: i % 4 < 2, marginRight: 40 + ((i * 20) % 60) }),
    previewMs: 1500,
    controls: (bar, live) => {
      toggle(bar, 'facet grid', live.state.grid, (grid) => live.set({ grid }));
      toggle(bar, 'facet labels', live.state.label, (label) => live.set({ label }));
      slider(bar, 'facet marginRight', [0, 140, 1], live.state.marginRight, (marginRight) => live.set({ marginRight }));
    },
  });
};

export default mount;
