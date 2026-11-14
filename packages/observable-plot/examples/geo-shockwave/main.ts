// Geo geometry channel: geodesic circles of growing radius from a volcano
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { topojson, worldTopology } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const RADII = [0.5, 179.5].concat(d3.range(10, 171, 10)).sort((a, b) => a - b);

const mount: Mount = async (el, ctx) => {
  const world = await worldTopology();
  const land = topojson.feature(world, world.objects.land);
  const circle = d3.geoCircle<unknown, number>().center([-175.38, -20.57]).radius((r) => r);
  return mountPlot<{ rings: number }>(el, ctx, {
    initial: { rings: RADII.length },
    render: ({ rings }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        projection: { type: 'equal-earth', rotate: [90, 0] },
        color: { legend: !preview, label: 'Distance from Tonga (km)', transform: (d: number) => 111.2 * d, zero: true },
        marks: [
          Plot.geo(land),
          // The geometry channel builds a GeoJSON circle from each radius in the data.
          Plot.geo(RADII.slice(0, rings), { geometry: circle, stroke: (r: number) => r, strokeWidth: 2 }),
          Plot.sphere(),
        ],
      }),
    step: ({ rings }) => ({ rings: rings >= RADII.length ? 1 : rings + 2 }),
    previewMs: 700,
    controls: (bar, live) => slider(bar, 'rings', [1, RADII.length, 1], live.state.rings, (rings) => live.set({ rings })),
  });
};

export default mount;
