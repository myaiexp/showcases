// Dot sort option on a bubble map: biggest-first draws small counties on top
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csvStrings, thin, type Row, topojson, usTopology } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const [us, pop] = await Promise.all([usTopology(), csvStrings('us-county-population.csv')]);
  const population = new Map(pop.map((d) => [d.state + d.county, +d.population]));
  const all = topojson.feature(us, us.objects.counties).features.map((f) => ({
    ...f,
    properties: { ...f.properties, population: population.get(String(f.id)) },
  }));
  const counties = ctx.preview ? thin(all, 2) : all;
  const statemesh = topojson.mesh(us, us.objects.states);
  return mountPlot<{ sorted: boolean }>(el, ctx, {
    initial: { sorted: true },
    render: ({ sorted }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        projection: 'albers-usa',
        r: { range: [0, preview ? 12 : 30] },
        marks: [
          Plot.geo(statemesh, { strokeOpacity: 0.4 }),
          Plot.dot(
            counties,
            Plot.geoCentroid({
              r: (d: Row) => d.properties.population,
              fill: 'currentColor',
              stroke: 'var(--plot-background)',
              strokeWidth: 1,
              sort: sorted ? undefined : null,
            }),
          ),
        ],
      }),
    step: ({ sorted }) => ({ sorted: !sorted }),
    controls: (bar, live) => toggle(bar, 'default sort (largest first)', live.state.sorted, (sorted) => live.set({ sorted })),
  });
};

export default mount;
