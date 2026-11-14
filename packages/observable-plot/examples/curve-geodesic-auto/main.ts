// The auto curve follows great circles under a projection; linear is straight
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { topojson, worldTopology } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

// Longitude, latitude of three cities, flown in sequence.
const route = [
  { city: 'San Francisco', lon: -122.4, lat: 37.8 },
  { city: 'London', lon: -0.1, lat: 51.5 },
  { city: 'Tokyo', lon: 139.7, lat: 35.7 },
  { city: 'Sydney', lon: 151.2, lat: -33.9 },
];

const mount: Mount = async (el, ctx) => {
  const world = await worldTopology();
  const land = topojson.feature(world, world.objects.land);
  return mountPlot<{ auto: boolean }>(el, ctx, {
    initial: { auto: true },
    render: ({ auto }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginTop: 24,
        title: preview ? `curve: ${auto ? 'auto' : 'linear'}` : undefined,
        projection: 'equal-earth',
        marks: [
          Plot.sphere(),
          Plot.geo(land, { fill: 'currentColor', fillOpacity: 0.15 }),
          Plot.line(route, { x: 'lon', y: 'lat', curve: auto ? 'auto' : 'linear', stroke: 'orange', strokeWidth: 2 }),
          Plot.dot(route, { x: 'lon', y: 'lat', fill: 'orange' }),
          preview ? null : Plot.text(route, { x: 'lon', y: 'lat', text: 'city', dy: -8, stroke: 'var(--bg)', fill: 'currentColor' }),
        ],
      }),
    step: ({ auto }) => ({ auto: !auto }),
    previewMs: 2400,
    controls: (bar, live) => {
      toggle(bar, 'curve: auto (off = linear)', live.state.auto, (auto) => live.set({ auto }));
    },
  });
};

export default mount;
