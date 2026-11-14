// The built-in spatial interpolators on the same survey samples
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const methods = ['none', 'nearest', 'barycentric', 'random-walk'] as const;
type Method = (typeof methods)[number];

const mount: Mount = async (el, ctx) => {
  const ca55 = await csv('ca55-south.csv');
  return mountPlot<{ method: Method }>(el, ctx, {
    initial: { method: 'nearest' },
    render: ({ method }, { width, height, preview }) =>
      Plot.raster(ca55, {
        x: 'LONGITUDE',
        y: 'LATITUDE',
        fill: 'MAG_IGRF90',
        interpolate: method,
        // Coarse pixels keep the random walk quick; a card gets coarser still.
        pixelSize: preview ? 4 : 2,
      }).plot({ width, height, color: { type: 'diverging' } }),
    step: ({ method }) => ({ method: methods[(methods.indexOf(method) + 1) % methods.length] ?? 'nearest' }),
    previewMs: 3000,
    controls: (bar, live) => {
      select(bar, 'interpolate', methods, live.state.method, (method) => live.set({ method }));
    },
  });
};

export default mount;
