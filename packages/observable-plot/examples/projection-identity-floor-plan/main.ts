// Identity projection for planar geometry, and reflect-y for y-up coordinates
import * as Plot from '@observablehq/plot';
import type * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { json } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const TYPES = ['identity', 'reflect-y'] as const;

const mount: Mount = async (el, ctx) => {
  const westport = await json<d3.GeoPermissibleObjects>('westport-house.json');
  return mountPlot<{ type: (typeof TYPES)[number] }>(el, ctx, {
    initial: { type: 'identity' },
    render: ({ type }, { width, height }) =>
      Plot.geo(westport).plot({ width, height, projection: { type, domain: westport } }),
    step: ({ type }) => ({ type: type === 'identity' ? 'reflect-y' : 'identity' }),
    previewMs: 2200,
    controls: (bar, live) => {
      select(bar, 'type', TYPES, live.state.type, (type) => live.set({ type }));
    },
  });
};

export default mount;
