// Window strict: drop the noisy truncated windows at the start of the series
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const sftemp = await csv('sf-temperatures.csv');
  return mountPlot<{ strict: boolean }>(el, ctx, {
    initial: { strict: true },
    render: ({ strict }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true, label: 'Temperature (°F)' },
        marks: [
          Plot.lineY(sftemp, { x: 'date', y: 'low', strokeOpacity: 0.3 }),
          Plot.lineY(sftemp, Plot.windowY({ k: 28, anchor: 'end', strict }, { x: 'date', y: 'low' })),
        ],
      }),
    step: ({ strict }) => ({ strict: !strict }),
    previewMs: 2400,
    controls: (bar, live) => {
      toggle(bar, 'strict', live.state.strict, (strict) => live.set({ strict }));
    },
  });
};

export default mount;
