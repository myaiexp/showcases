// Density of store locations through an equal-area projection
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { thin, topojson, tsv, usTopology } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const SCHEMES = ['turbo', 'YlGnBu', 'viridis'] as const;
type Scheme = (typeof SCHEMES)[number];

const mount: Mount = async (el, ctx) => {
  const [all, us] = await Promise.all([tsv('walmarts.tsv'), usTopology()]);
  const walmarts = ctx.preview ? thin(all, 3) : all;
  const nation = topojson.feature(us, us.objects.nation);
  const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
  return mountPlot<{ scheme: Scheme }>(el, ctx, {
    initial: { scheme: 'turbo' },
    render: ({ scheme }, { width, height }) =>
      Plot.plot({
        width,
        height,
        projection: 'albers',
        color: { scheme },
        marks: [
          Plot.density(walmarts, { x: 'longitude', y: 'latitude', bandwidth: 10, fill: 'density' }),
          Plot.geo(statemesh, { strokeOpacity: 0.3 }),
          Plot.geo(nation),
          Plot.dot(walmarts, { x: 'longitude', y: 'latitude', r: 1, fill: 'currentColor' }),
        ],
      }),
    controls: (bar, live) => {
      select(bar, 'scheme', SCHEMES, live.state.scheme, (scheme) => live.set({ scheme }));
    },
  });
};

export default mount;
