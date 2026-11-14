// differenceY of a series against zero, raw or as a 24-month moving average
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const gistemp = await csv('gistemp.csv');
  return mountPlot<{ smooth: boolean }>(el, ctx, {
    initial: { smooth: false },
    render: ({ smooth }, { width, height }) => {
      const options = { x: 'Date', y: 'Anomaly', positiveFill: 'red', negativeFill: 'blue', tip: true };
      return Plot.differenceY(gistemp, smooth ? Plot.windowY(12 * 2, options) : options).plot({ width, height, y: { grid: true } });
    },
    step: ({ smooth }) => ({ smooth: !smooth }),
    previewMs: 2800,
    after: (root, _live, size) => (size.preview ? sweepPointer(root) : undefined),
    controls: (bar, live) => {
      toggle(bar, '24-month moving average', live.state.smooth, (smooth) => live.set({ smooth }));
    },
  });
};

export default mount;
