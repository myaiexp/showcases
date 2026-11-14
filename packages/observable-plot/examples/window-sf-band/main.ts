// A temperature band with rolling-mean lines whose window size k you can change
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const sftemp = await csv('sf-temperatures.csv');
  return mountPlot<{ k: number }>(el, ctx, {
    initial: { k: 7 },
    render: ({ k }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true, label: 'Temperature (°F)' },
        marks: [
          Plot.areaY(sftemp, { x: 'date', y1: 'low', y2: 'high', fillOpacity: 0.3 }),
          Plot.lineY(sftemp, Plot.windowY(k, { x: 'date', y: 'low', stroke: 'blue' })),
          Plot.lineY(sftemp, Plot.windowY(k, { x: 'date', y: 'high', stroke: 'red' })),
        ],
      }),
    step: (_s, i) => ({ k: [7, 28, 60, 100, 28, 1][i % 6] ?? 7 }),
    previewMs: 1600,
    controls: (bar, live) => {
      slider(bar, 'window size k', [1, 100, 1], live.state.k, (k) => live.set({ k }));
    },
  });
};

export default mount;
