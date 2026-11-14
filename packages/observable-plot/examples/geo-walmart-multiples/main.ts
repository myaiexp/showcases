// Geo faceted by decade: Walmart openings as map small multiples (fy interval)
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { topojson, tsv, usTopology } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const [us, rows] = await Promise.all([usTopology(), tsv('walmarts.tsv')]);
  const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
  const nation = topojson.feature(us, us.objects.nation);
  const walmarts = {
    type: 'FeatureCollection' as const,
    features: rows.map((d) => ({
      type: 'Feature' as const,
      properties: { date: d.date },
      geometry: { type: 'Point' as const, coordinates: [d.longitude, d.latitude] },
    })),
  };
  return mountPlot<{ r: number }>(el, ctx, {
    initial: { r: 1.5 },
    render: ({ r }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        margin: 0,
        padding: 0,
        projection: 'albers',
        fy: { interval: '10 years' },
        marks: [
          Plot.geo(statemesh, { strokeOpacity: 0.2 }),
          Plot.geo(nation),
          Plot.geo(walmarts, { fy: 'date', r, fill: 'blue', tip: !preview, title: 'date' }),
          Plot.axisFy({ frameAnchor: 'top', dy: 30, tickFormat: (d: Date) => `${d.getUTCFullYear()}’s` }),
        ],
      }),
    step: ({ r }) => ({ r: r >= 3 ? 0.8 : r + 0.7 }),
    controls: (bar, live) => slider(bar, 'dot radius', [0.5, 4, 0.1], live.state.r, (r) => live.set({ r })),
  });
};

export default mount;
