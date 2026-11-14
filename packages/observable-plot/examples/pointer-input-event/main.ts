// plot.value and input events from a pointer transform
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  let out: HTMLPreElement | null = null;
  const stop = mountPlot(el, ctx, {
    initial: {},
    render: (_s, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [
          Plot.lineY(aapl, { x: 'Date', y: 'Close' }),
          Plot.dot(aapl, Plot.pointerX({ x: 'Date', y: 'Close', r: 5, fill: 'red' })),
        ],
      }),
    after: (root, _live, size) => {
      const onInput = () => {
        const v = (root as Element & { value?: unknown[] | null }).value;
        const d = Array.isArray(v) ? v[0] : v;
        if (out) out.textContent = d ? JSON.stringify(d, null, 1) : 'plot.value: null';
      };
      root.addEventListener('input', onInput);
      const stopSweep = size.preview ? sweepPointer(root, (t) => [0.1 + 0.8 * t, 0.5], 5000) : undefined;
      return () => {
        root.removeEventListener('input', onInput);
        stopSweep?.();
      };
    },
  });
  if (!ctx.preview) {
    out = readout(el);
    out.textContent = 'Move the pointer over the chart: plot.value is the focused row.';
  }
  return () => {
    stop();
    out?.remove();
  };
};

export default mount;
