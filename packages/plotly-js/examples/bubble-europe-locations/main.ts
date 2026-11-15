// scattergeo bubbles placed by ISO-3 country code on a Europe-scoped map, sized and coloured per point
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { createStage } from '../../shared/stage.ts';

const scales = ['Greens', 'Blues', 'YlOrRd', 'Viridis', 'Portland'] as const;

const mount: Mount = async (el, ctx) => {
  await loadGeoAssets();
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scattergeo',
        mode: 'markers',
        locations: ['FRA', 'DEU', 'RUS', 'ESP'],
        marker: {
          size: [20, 30, 15, 10],
          color: [10, 20, 40, 50],
          cmin: 0,
          cmax: 50,
          colorscale: 'Greens',
          colorbar: { title: { text: 'Some rate' }, ticksuffix: '%', showticksuffix: 'last', thickness: 12 },
          line: { color: '#e6e8ee' },
        },
        name: 'europe data',
      },
    ],
    { template: stage.template, geo: { scope: 'europe', resolution: 50, fitbounds: false } },
    stage.config,
  );

  const set = (v: string): Promise<void> => restyle(stage.div, { 'marker.colorscale': v });
  if (stage.bar) select(stage.bar, 'marker.colorscale', scales, 'Greens', (v) => void set(v));
  if (stage.preview) stage.every(1300, (i) => void set(pick(scales, i)));

  return () => stage.dispose();
};

export default mount;
