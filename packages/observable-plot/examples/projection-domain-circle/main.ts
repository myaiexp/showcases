// Projection domain: zoom an azimuthal map to a GeoJSON circle, with inset
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { topojson, worldTopology } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const world = await worldTopology();
  const land = topojson.feature(world, world.objects.land);
  return mountPlot(el, ctx, {
    initial: { radius: 30 },
    render: ({ radius }, { width, height }) => {
      const circle = d3.geoCircle().center([9, 34]).radius(radius)();
      return Plot.plot({
        width,
        height,
        // domain fits the circle to the frame; inset pads it by 10 pixels.
        projection: { type: 'azimuthal-equidistant', rotate: [-9, -34], domain: circle, inset: 10 },
        marks: [
          Plot.graticule(),
          Plot.geo(land, { fill: 'currentColor', fillOpacity: 0.3 }),
          Plot.geo(circle, { stroke: 'red', strokeWidth: 2 }),
          Plot.frame(),
        ],
      });
    },
    step: (_s, i) => ({ radius: 30 + 20 * Math.sin(i * 0.8) }),
    previewMs: 500,
    controls: (bar, live) => {
      slider(bar, 'radius', [10, 50, 0.1], live.state.radius, (radius) => live.set({ radius }));
    },
  });
};

export default mount;
