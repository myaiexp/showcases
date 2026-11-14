// Geo points sized by r: made-up quakes along plate edges, with the sort option
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { topojson, worldTopology } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

// Offline stand-in for the docs' live USGS feed: seeded quakes jittered along rough belts.
const BELTS: [number, number][][] = [
  [[-75, -45], [-72, -20], [-80, 0], [-92, 15], [-110, 25], [-125, 45], [-150, 60], [-175, 52]],
  [[140, 40], [150, 48], [160, 55], [170, 52]],
  [[100, -5], [120, -8], [140, -4], [160, -10], [-175, -20]],
  [[-30, 60], [-25, 30], [-15, 0], [-12, -35]],
];

function makeQuakes() {
  const rnd = d3.randomLcg(11);
  const norm = d3.randomNormal.source(rnd)(0, 3);
  return d3.range(220).map((i) => {
    const belt = BELTS[Math.floor(rnd() * BELTS.length)]!;
    const t = rnd() * (belt.length - 1);
    const a = belt[Math.floor(t)]!;
    const b = belt[Math.min(belt.length - 1, Math.floor(t) + 1)]!;
    const f = t % 1;
    const mag = Math.round((2.5 - Math.log(1 - rnd()) * 0.9) * 10) / 10;
    return {
      type: 'Feature' as const,
      properties: { mag, title: `M ${mag} quake ${i}` },
      geometry: { type: 'Point' as const, coordinates: [a[0] + (b[0] - a[0]) * f + norm(), a[1] + (b[1] - a[1]) * f + norm()] },
    };
  });
}

const mount: Mount = async (el, ctx) => {
  const world = await worldTopology();
  const land = topojson.feature(world, world.objects.land);
  const quakes = { type: 'FeatureCollection' as const, features: makeQuakes() };
  return mountPlot<{ sorted: boolean }>(el, ctx, {
    initial: { sorted: true },
    render: ({ sorted }, { width, height }) =>
      Plot.plot({
        width,
        height,
        projection: 'equirectangular',
        r: { transform: (r: number) => Math.pow(10, r), range: [0, 22] }, // magnitude to amplitude
        marks: [
          Plot.geo(land, { fill: 'currentColor', fillOpacity: 0.2 }),
          Plot.sphere(),
          Plot.geo(quakes, {
            r: 'mag',
            fill: 'red',
            fillOpacity: 0.2,
            stroke: 'red',
            title: 'title',
            sort: sorted ? undefined : null,
          }),
        ],
      }),
    step: ({ sorted }) => ({ sorted: !sorted }),
    controls: (bar, live) => toggle(bar, 'default sort (largest first)', live.state.sorted, (sorted) => live.set({ sorted })),
  });
};

export default mount;
