// Weight histograms: one stacked by sex, or small multiples faceted on fy
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const olympians = await csv('athletes.csv');
  return mountPlot(el, ctx, {
    initial: { facet: false },
    render: ({ facet }, { width, height }) =>
      facet
        ? Plot.plot({
            width,
            height,
            grid: true,
            marks: [Plot.rectY(olympians, Plot.binX<Plot.RectYOptions>({ y: 'count' }, { x: 'weight', fill: 'sex', fy: 'sex' })), Plot.ruleY([0])],
          })
        : // rectY with fill applies an implicit stack transform: the two sexes stack per bin.
          Plot.rectY(olympians, Plot.binX<Plot.RectYOptions>({ y: 'count' }, { x: 'weight', fill: 'sex' })).plot({ width, height }),
    step: ({ facet }) => ({ facet: !facet }),
    previewMs: 3000,
    controls: (bar, live) => {
      toggle(bar, 'facet by sex (fy)', live.state.facet, (facet) => live.set({ facet }));
    },
  });
};

export default mount;
