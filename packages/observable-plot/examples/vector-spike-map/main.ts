// A spike map of US county population with Plot.spike and geoCentroid
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';
import { loadCounties } from '../../shared/vector-counties.ts';

const mount: Mount = async (el, ctx) => {
  const { nation, statemesh, counties: all } = await loadCounties();
  const counties = ctx.preview ? thin(all, 3) : all;
  return mountPlot(el, ctx, {
    initial: { max: 200 },
    render: ({ max }, { width, height }) =>
      Plot.plot({
        width,
        height,
        projection: 'albers-usa',
        length: { range: [0, max] },
        marks: [
          Plot.geo(statemesh, { strokeOpacity: 0.5 }),
          Plot.geo(nation),
          Plot.spike(counties, Plot.geoCentroid({ length: (d) => d.properties.population, stroke: 'green' })),
        ],
      }),
    // The card grows and shrinks the tallest spike.
    step: (_s, i) => ({ max: [200, 60, 120, 280][i % 4] ?? 200 }),
    previewMs: 2000,
    controls: (bar, live) => {
      slider(bar, 'longest spike (px)', [20, 400, 10], live.state.max, (max) => live.set({ max }));
    },
  });
};

export default mount;
