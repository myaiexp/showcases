// Geo choropleth: county unemployment on a quantile scale, joined into properties
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csvStrings, topojson, usTopology } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const SCHEMES = ['blues', 'oranges', 'purples', 'ylgnbu'] as const;

const mount: Mount = async (el, ctx) => {
  const [us, unemployment] = await Promise.all([usTopology(), csvStrings('us-county-unemployment.csv')]);
  const rate = new Map(unemployment.map((d) => [d.id, +d.rate]));
  const counties = topojson
    .feature(us, us.objects.counties)
    .features.map((f) => ({ ...f, properties: { ...f.properties, unemployment: rate.get(String(f.id)) } }));
  return mountPlot<{ scheme: (typeof SCHEMES)[number] }>(el, ctx, {
    initial: { scheme: 'blues' },
    render: ({ scheme }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        projection: 'albers-usa',
        color: { type: 'quantile', n: 9, scheme, label: 'Unemployment (%)', legend: !preview },
        marks: [
          Plot.geo(counties, {
            // A field name that is not on the feature is looked up in its properties.
            fill: 'unemployment',
            title: (d) => `${d.properties.name} ${d.properties.unemployment}%`,
            tip: !preview,
          }),
        ],
      }),
    step: ({ scheme }) => ({ scheme: SCHEMES[(SCHEMES.indexOf(scheme) + 1) % SCHEMES.length] }),
    previewMs: 3200,
    controls: (bar, live) => select(bar, 'scheme', SCHEMES, live.state.scheme, (scheme) => live.set({ scheme })),
  });
};

export default mount;
