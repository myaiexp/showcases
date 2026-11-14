// County centroids as dots: planar centroid, spherical geoCentroid, or both
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { thin, topojson, usTopology } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const MODES = ['centroid', 'geoCentroid', 'both'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const us = await usTopology();
  const all = topojson.feature(us, us.objects.counties).features;
  const counties = ctx.preview ? thin(all, 2) : all;
  const nation = topojson.feature(us, us.objects.nation);
  return mountPlot<{ mode: Mode }>(el, ctx, {
    initial: { mode: 'centroid' },
    render: ({ mode }, { width, height }) =>
      Plot.plot({
        width,
        height,
        projection: 'albers-usa',
        marks: [
          Plot.geo(nation, { strokeOpacity: 0.4 }),
          // centroid works on projected shapes; geoCentroid on the sphere, then projects.
          mode !== 'geoCentroid' ? Plot.dot(counties, Plot.centroid({ r: 1.5, fill: 'orange' })) : null,
          mode !== 'centroid' ? Plot.dot(counties, Plot.geoCentroid({ r: mode === 'both' ? 0.8 : 1.5, fill: mode === 'both' ? 'steelblue' : 'currentColor' })) : null,
        ],
      }),
    step: ({ mode }) => ({ mode: MODES[(MODES.indexOf(mode) + 1) % MODES.length] ?? 'centroid' }),
    controls: (bar, live) => select(bar, 'transform', MODES, live.state.mode, (mode) => live.set({ mode })),
  });
};

export default mount;
