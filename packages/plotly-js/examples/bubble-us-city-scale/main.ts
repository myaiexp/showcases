// 3,200 US cities as bubbles with size = population / scale; the slider is that divisor
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { usCities } from '../../shared/map-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const [, cities] = await Promise.all([loadGeoAssets(), usCities()]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });
  const sizes = (scale: number): number[] => cities.pop.map((p) => p / scale);

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scattergeo',
        locationmode: 'USA-states',
        lat: cities.lat,
        lon: cities.lon,
        hoverinfo: 'text',
        text: cities.name.map((n, i) => `${n} pop: ${cities.pop[i]}`),
        marker: { size: sizes(50000), color: '#f59e0b', opacity: 0.7, line: { color: '#0b0f16', width: 1 } },
      },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : '2014 US City Populations' },
      showlegend: false,
      geo: {
        scope: 'usa',
        projection: { type: 'albers usa' },
        showland: true,
        landcolor: '#2a2f3a',
        subunitwidth: 1,
        countrywidth: 1,
        subunitcolor: '#4b5263',
        countrycolor: '#4b5263',
      },
    },
    stage.config,
  );

  const set = (scale: number): Promise<void> => restyle(stage.div, { 'marker.size': [sizes(scale)] });
  if (stage.bar) slider(stage.bar, 'scale (population per pixel)', [20000, 200000, 5000], 50000, (v) => void set(v));
  if (stage.preview) stage.every(500, (i) => void set(30000 + 25000 * (1 + Math.sin(i / 3))));

  return () => stage.dispose();
};

export default mount;
