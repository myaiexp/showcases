// Under a projection the line mark draws geodesics: great circles between cities
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { topojson, worldTopology } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const TYPES = ['equirectangular', 'mercator', 'orthographic', 'azimuthal-equidistant'] as const;
const CITIES = [
  { name: 'Helsinki', longitude: 24.94, latitude: 60.17 },
  { name: 'New York', longitude: -74, latitude: 40.71 },
  { name: 'Tokyo', longitude: 139.69, latitude: 35.69 },
  { name: 'Sydney', longitude: 151.21, latitude: -33.87 },
];
const ROUTES = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
].flatMap(([a, b], route) => [CITIES[a!]!, CITIES[b!]!].map((c) => ({ ...c, route })));

const mount: Mount = async (el, ctx) => {
  const world = await worldTopology();
  const land = topojson.feature(world, world.objects.land);
  return mountPlot<{ type: (typeof TYPES)[number] }>(el, ctx, {
    initial: { type: 'orthographic' },
    render: ({ type }, { width, height }) =>
      Plot.plot({
        width,
        height: height ?? Math.min(width, 520),
        projection: type === 'orthographic' ? { type, rotate: [-80, -30] } : type,
        color: { type: 'categorical' },
        marks: [
          Plot.sphere(),
          Plot.geo(land, { fill: 'currentColor', fillOpacity: 0.2 }),
          Plot.line(ROUTES, { x: 'longitude', y: 'latitude', z: 'route', stroke: 'red', strokeWidth: 2 }),
          Plot.dot(CITIES, { x: 'longitude', y: 'latitude', fill: 'currentColor' }),
          Plot.text(CITIES, { x: 'longitude', y: 'latitude', text: 'name', dy: -8, stroke: 'var(--plot-background)', fill: 'currentColor' }),
        ],
      }),
    step: ({ type }) => ({ type: TYPES[(TYPES.indexOf(type) + 1) % TYPES.length] }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'projection', TYPES, live.state.type, (type) => live.set({ type }));
    },
  });
};

export default mount;
