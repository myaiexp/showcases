// A stacked histogram: fill partitions bins, implicit or explicit stackY
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 3) : all;
  return mountPlot(el, ctx, {
    initial: { explicit: false },
    render: ({ explicit }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true },
        color: { legend: !height },
        marks: [
          explicit
            ? Plot.rectY(olympians, Plot.stackY(Plot.binX<Plot.RectYOptions>({ y: 'count' }, { x: 'weight', fill: 'sex' })))
            : Plot.rectY(olympians, Plot.binX<Plot.RectYOptions>({ y: 'count' }, { x: 'weight', fill: 'sex' })),
          Plot.ruleY([0]),
        ],
      }),
    controls: (bar, live) => {
      toggle(bar, 'explicit Plot.stackY', live.state.explicit, (explicit) => live.set({ explicit }));
    },
  });
};

export default mount;
