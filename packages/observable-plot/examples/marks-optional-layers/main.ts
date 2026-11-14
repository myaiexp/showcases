// Layered marks and null marks: an area is drawn only while its box is checked
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot<{ area: boolean }>(el, ctx, {
    initial: { area: true },
    render: ({ area }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [
          Plot.ruleY([0]),
          // A null (or undefined) mark produces no output.
          area ? Plot.areaY(aapl, { x: 'Date', y: 'Close', fillOpacity: 0.2 }) : null,
          Plot.lineY(aapl, { x: 'Date', y: 'Close' }),
        ],
      }),
    step: ({ area }) => ({ area: !area }),
    controls: (bar, live) => {
      toggle(bar, 'show area', true, (area) => live.set({ area }));
    },
  });
};

export default mount;
