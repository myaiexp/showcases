// A group transform on x and y: median traffic by hour and location, as cells
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const SCHEMES = ['YlGnBu', 'turbo', 'viridis', 'magma'] as const;

const mount: Mount = async (el, ctx) => {
  const traffic = await csv('traffic.csv');
  return mountPlot<{ scheme: (typeof SCHEMES)[number] }>(el, ctx, {
    initial: { scheme: 'YlGnBu' },
    render: ({ scheme }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginLeft: preview ? 90 : 120,
        padding: 0,
        y: { label: null },
        color: { scheme, legend: !preview, zero: true },
        marks: [
          Plot.cell(
            traffic,
            Plot.group(
              { fill: 'median' },
              { x: (d) => d.date.getUTCHours(), y: 'location', fill: 'vehicles', inset: 0.5, sort: { y: 'fill' } },
            ),
          ),
        ],
      }),
    step: ({ scheme }) => ({ scheme: SCHEMES[(SCHEMES.indexOf(scheme) + 1) % SCHEMES.length] }),
    previewMs: 2200,
    controls: (bar, live) => {
      select(bar, 'scheme', SCHEMES, live.state.scheme, (scheme) => live.set({ scheme }));
    },
  });
};

export default mount;
