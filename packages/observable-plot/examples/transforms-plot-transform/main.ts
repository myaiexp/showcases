// Plot.transform composes a custom random sample after the filter option
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot(el, ctx, {
    initial: { keep: 0.5, seed: 1 },
    render: ({ keep, seed }, { width, height }) => {
      const random = d3.randomLcg(seed);
      return Plot.plot({
        width,
        height,
        grid: true,
        marks: [
          Plot.dot(
            penguins,
            // The basic filter runs first; the random sample then thins what is left.
            Plot.transform({ x: 'culmen_length_mm', y: 'culmen_depth_mm', stroke: 'species', filter: (d: any) => d.species !== 'Chinstrap' }, (data, facets) => ({
              data,
              facets: facets.map((I) => I.filter(() => random() < keep)),
            })),
          ),
        ],
      });
    },
    step: (_s, i) => ({ keep: 0.5, seed: i }),
    previewMs: 900,
    controls: (bar, live) => {
      slider(bar, 'keep', [0.05, 1, 0.05], live.state.keep, (keep) => live.set({ keep }));
      button(bar, 'resample', () => live.set({ seed: live.state.seed + 1 }));
    },
  });
};

export default mount;
