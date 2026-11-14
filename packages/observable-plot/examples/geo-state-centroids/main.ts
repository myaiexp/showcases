// Geo with x and y from the centroid transform: tips and red centroid dots
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { topojson, usTopology } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const us = await usTopology();
  const states = topojson.feature(us, us.objects.states);
  const nation = topojson.feature(us, us.objects.nation);
  return mountPlot<{ centroids: boolean }>(el, ctx, {
    initial: { centroids: true },
    render: ({ centroids }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        projection: 'albers-usa',
        marks: [
          // With tip on, the geo mark gets implicit x and y: the centroid of each geometry.
          Plot.geo(states, { strokeOpacity: 0.1, tip: !preview, title: 'name' }),
          Plot.geo(nation),
          centroids ? Plot.dot(states.features, Plot.centroid({ fill: 'red', stroke: 'var(--plot-background)' })) : null,
        ],
      }),
    step: ({ centroids }) => ({ centroids: !centroids }),
    controls: (bar, live) => toggle(bar, 'show centroids', live.state.centroids, (centroids) => live.set({ centroids })),
  });
};

export default mount;
