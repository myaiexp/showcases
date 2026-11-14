// 14-day moving averages of San Francisco highs and lows with windowY
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const sftemp = await csv('sf-temperatures.csv');
  const windows = [1, 14, 60, 120];
  return mountPlot<{ k: number }>(el, ctx, {
    initial: { k: 14 },
    render: ({ k }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true, label: 'Temperature (°F)' },
        marks: [
          // One mark per line, so each can take its own options.
          Plot.line(sftemp, Plot.windowY(k, { x: 'date', y: 'low', stroke: '#4e79a7' })),
          Plot.line(sftemp, Plot.windowY(k, { x: 'date', y: 'high', stroke: '#e15759' })),
          Plot.ruleY([32]), // freezing
        ],
      }),
    step: ({ k }, i) => ({ k: windows[i % windows.length] ?? k }),
    previewMs: 3000,
    controls: (bar, live) => {
      slider(bar, 'window (days)', [1, 120, 1], live.state.k, (k) => live.set({ k }));
    },
  });
};

export default mount;
