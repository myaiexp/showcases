// Map transform: quantile ranks daily volume in [0, 1], smoothed with windowY
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot<{ smooth: boolean }>(el, ctx, {
    initial: { smooth: true },
    render: ({ smooth }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [
          Plot.ruleY([0, 1]),
          Plot.lineY(aapl, Plot.mapY('quantile', { x: 'Date', y: 'Volume', strokeOpacity: 0.2 })),
          smooth ? Plot.lineY(aapl, Plot.windowY(30, Plot.mapY('quantile', { x: 'Date', y: 'Volume' }))) : null,
        ],
      }),
    step: ({ smooth }) => ({ smooth: !smooth }),
    controls: (bar, live) => {
      toggle(bar, '30-day rolling mean (windowY)', live.state.smooth, (smooth) => live.set({ smooth }));
    },
  });
};

export default mount;
