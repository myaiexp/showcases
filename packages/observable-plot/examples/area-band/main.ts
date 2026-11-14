// Temperature band: areaY with y1 and y2, optionally smoothed with windowY
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const sftemp = await csv('sf-temperatures.csv');
  return mountPlot(el, ctx, {
    initial: { k: 1 },
    render: ({ k }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { label: 'Temperature (°F)', grid: true },
        // y1 and y2 are different fields, so there is no stack: the area spans low to high.
        marks: [Plot.areaY(sftemp, Plot.windowY({ k, reduce: 'mean' }, { x: 'date', y1: 'low', y2: 'high' }))],
      }),
    step: ({ k }) => ({ k: k === 1 ? 14 : k === 14 ? 30 : 1 }),
    previewMs: 2400,
    controls: (bar, live) => slider(bar, 'window k (days)', [1, 40, 1], live.state.k, (k) => live.set({ k })),
  });
};

export default mount;
