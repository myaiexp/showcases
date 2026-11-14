// Select transform: selectMinY and selectMaxY label the extreme closes
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot<{ min: boolean; max: boolean }>(el, ctx, {
    initial: { min: true, max: true },
    render: ({ min, max }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true },
        marks: [
          Plot.ruleY([0]),
          Plot.line(aapl, { x: 'Date', y: 'Close' }),
          min ? Plot.text(aapl, Plot.selectMinY({ x: 'Date', y: 'Close', text: 'Close', frameAnchor: 'top', dy: 6 })) : null,
          max ? Plot.text(aapl, Plot.selectMaxY({ x: 'Date', y: 'Close', text: 'Close', frameAnchor: 'bottom', dy: -6 })) : null,
        ],
      }),
    step: (_s, i) => ({ min: i % 3 !== 2, max: i % 3 !== 1 }),
    controls: (bar, live) => {
      toggle(bar, 'selectMinY', live.state.min, (min) => live.set({ min }));
      toggle(bar, 'selectMaxY', live.state.max, (max) => live.set({ max }));
    },
  });
};

export default mount;
