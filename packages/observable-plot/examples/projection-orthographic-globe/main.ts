// Orthographic globe: land, sphere and dots, rotated by longitude
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { tsv, topojson, worldTopology } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const [world, walmarts] = await Promise.all([worldTopology(), tsv('walmarts.tsv')]);
  const land = topojson.feature(world, world.objects.land);
  return mountPlot(el, ctx, {
    initial: { longitude: -98 },
    render: ({ longitude }, { width, height }) =>
      Plot.plot({
        width,
        height: height ?? Math.min(width, 520),
        // The projection's rotate option turns the globe under the frame.
        projection: { type: 'orthographic', rotate: [-longitude, -30] },
        marks: [
          Plot.geo(land, { fill: 'currentColor', fillOpacity: 0.2 }),
          Plot.sphere(),
          Plot.dot(walmarts, { x: 'longitude', y: 'latitude', r: 2, stroke: 'red', fill: 'red', fillOpacity: 0.2 }),
        ],
      }),
    step: ({ longitude }) => ({ longitude: ((longitude + 40 + 180) % 360) - 180 }),
    previewMs: 600,
    controls: (bar, live) => {
      slider(bar, 'longitude', [-180, 180, 1], live.state.longitude, (longitude) => live.set({ longitude }));
    },
  });
};

export default mount;
