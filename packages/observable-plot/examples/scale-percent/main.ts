// The percent scale option: proportions as percentages
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const gistemp = await csv('gistemp.csv');
  return mountPlot(el, ctx, {
    initial: { percent: true },
    render: ({ percent }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { percent }, // converts the proportion in [0, 1] to a percent in [0, 100]
        color: { scheme: 'BuRd' },
        marks: [
          Plot.rectY(gistemp, Plot.binX<Plot.RectYOptions>({ y: 'proportion', fill: 'x' }, { x: 'Anomaly', fill: 'Anomaly' })),
          Plot.ruleY([0]),
        ],
      }),
    step: ({ percent }) => ({ percent: !percent }),
    controls: (bar, live) => toggle(bar, 'percent ', live.state.percent, (percent) => live.set({ percent })),
  });
};

export default mount;
