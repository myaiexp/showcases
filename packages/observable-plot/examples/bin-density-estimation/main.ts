// Density with area and line: filter null keeps empty bins so shapes reach zero
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 3) : all;
  return mountPlot(el, ctx, {
    initial: { keepEmpty: true },
    render: ({ keepEmpty }, { width, height }) => {
      // filter: null in the outputs keeps empty bins; leaving it out drops them.
      const outputs = keepEmpty ? { y: 'count', filter: null } : { y: 'count' };
      return Plot.plot({
        width,
        height,
        y: { grid: true },
        marks: [
          Plot.areaY(olympians, Plot.binX<Plot.AreaYOptions>(outputs, { x: 'weight', fillOpacity: 0.2 })),
          Plot.lineY(olympians, Plot.binX<Plot.LineYOptions>(outputs, { x: 'weight' })),
          Plot.ruleY([0]),
        ],
      });
    },
    step: ({ keepEmpty }) => ({ keepEmpty: !keepEmpty }),
    previewMs: 2400,
    controls: (bar, live) => {
      toggle(bar, 'filter: null (keep empty bins)', live.state.keepEmpty, (keepEmpty) => live.set({ keepEmpty }));
    },
  });
};

export default mount;
