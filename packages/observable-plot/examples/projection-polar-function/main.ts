// A projection function: a D3 azimuthal-equidistant map in polar aspect
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
    initial: { clipAngle: 40 },
    render: ({ clipAngle }, { width, height }) => {
      const side = height ?? width;
      return Plot.plot({
        width: Math.min(width, side),
        height: side,
        // projection may be a function of {width, height} that returns a D3 projection.
        projection: ({ width, height }) =>
          d3
            .geoAzimuthalEquidistant()
            .rotate([0, 90])
            .translate([width / 2, height / 2])
            .scale(Math.min(width, height))
            .clipAngle(clipAngle),
        marks: [Plot.graticule(), Plot.geo(land, { fill: 'currentColor' }), Plot.frame()],
      });
    },
    step: (_s, i) => ({ clipAngle: 40 + 15 * Math.sin(i * 0.7) }),
    previewMs: 500,
    controls: (bar, live) => {
      slider(bar, 'clipAngle', [15, 80, 1], live.state.clipAngle, (clipAngle) => live.set({ clipAngle }));
    },
  });
};

export default mount;
