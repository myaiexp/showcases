// State centroids with pointer tips naming the state under the cursor
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { topojson, usTopology } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const us = await usTopology();
  const statemesh = topojson.mesh(us, us.objects.states);
  const nation = topojson.feature(us, us.objects.nation);
  const states = topojson.feature(us, us.objects.states).features;
  return mountPlot(el, ctx, {
    initial: {},
    render: (_s, { width, height }) =>
      Plot.plot({
        width,
        height,
        projection: 'albers-usa',
        marks: [
          Plot.geo(statemesh, { strokeOpacity: 0.2 }),
          Plot.geo(nation),
          Plot.dot(states, Plot.centroid({ fill: 'red', stroke: 'var(--plot-background)' })),
          // pointer picks the nearest centroid; the tip reads the state name from its feature.
          Plot.tip(states, Plot.pointer(Plot.centroid({ title: (d) => d.properties.name }))),
        ],
      }),
    after: (root, _live, size) => (size.preview ? sweepPointer(root, (t) => [0.1 + 0.8 * t, 0.3 + 0.35 * Math.sin(t * 6.3)]) : undefined),
  });
};

export default mount;
