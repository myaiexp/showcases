// The world land under each of the named world projections
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { topojson, worldTopology } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const TYPES = [
  'azimuthal-equal-area',
  'azimuthal-equidistant',
  'conic-equal-area',
  'conic-equidistant',
  'equal-earth',
  'equirectangular',
  'gnomonic',
  'mercator',
  'orthographic',
  'stereographic',
  'transverse-mercator',
] as const;

const mount: Mount = async (el, ctx) => {
  const world = await worldTopology();
  const land = topojson.feature(world, world.objects.land);
  return mountPlot<{ type: (typeof TYPES)[number] }>(el, ctx, {
    initial: { type: 'equal-earth' },
    render: ({ type }, { width, height }) =>
      Plot.plot({
        width,
        height,
        projection: type,
        marks: [Plot.graticule(), Plot.geo(land, { fill: 'currentColor' }), Plot.sphere()],
      }),
    step: ({ type }) => ({ type: TYPES[(TYPES.indexOf(type) + 1) % TYPES.length] }),
    previewMs: 1500,
    controls: (bar, live) => {
      select(bar, 'projection', TYPES, live.state.type, (type) => live.set({ type }));
    },
  });
};

export default mount;
