// The size channel always gives dots: Volume drives r on a closing-price series
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot(el, ctx, {
    initial: { size: true },
    render: ({ size }, { width, height }) =>
      (size ? Plot.auto(aapl, { x: 'Date', y: 'Close', size: 'Volume' }) : Plot.auto(aapl, { x: 'Date', y: 'Close' })).plot({ width, height }),
    step: ({ size }) => ({ size: !size }),
    previewMs: 2800,
    controls: (bar, live) => toggle(bar, 'size: "Volume"', live.state.size, (size) => live.set({ size })),
  });
};

export default mount;
