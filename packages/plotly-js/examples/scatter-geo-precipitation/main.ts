// 10,000 translucent precipitation points on a conic conformal map; opacity and size reveal the density
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { precipitation } from '../../shared/map-kit.ts';
import { createStage } from '../../shared/stage.ts';

const scl: [number, string][] = [[0, 'rgb(150,0,90)'], [0.125, 'rgb(0, 0, 200)'], [0.25, 'rgb(0, 25, 255)'], [0.375, 'rgb(0, 152, 255)'], [0.5, 'rgb(44, 255, 150)'], [0.625, 'rgb(151, 255, 0)'], [0.75, 'rgb(255, 234, 0)'], [0.875, 'rgb(255, 111, 0)'], [1, 'rgb(255, 0, 0)']];

const mount: Mount = async (el, ctx) => {
  const [, rain] = await Promise.all([loadGeoAssets(), precipitation()]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 520 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scattergeo',
        mode: 'markers',
        text: rain.z.map(String),
        lon: rain.lon,
        lat: rain.lat,
        marker: {
          color: rain.z,
          colorscale: scl,
          cmin: 0,
          cmax: 1.4,
          reversescale: true,
          opacity: 0.2,
          size: 2,
          colorbar: { thickness: 10, title: { side: 'right' }, outlinecolor: 'rgba(68,68,68,0)', ticks: 'outside', ticklen: 3, showticksuffix: 'last', ticksuffix: ' in', dtick: 0.1 },
        },
        name: 'NA Precipitation',
      },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'North America Precipitation' },
      geo: {
        scope: 'north america',
        fitbounds: false,
        showland: true,
        landcolor: '#2a2f3a',
        subunitcolor: '#4b5263',
        countrycolor: '#4b5263',
        showlakes: true,
        lakecolor: '#0f1115',
        showsubunits: true,
        showcountries: true,
        resolution: 50,
        projection: { type: 'conic conformal', rotation: { lon: -100 } },
        lonaxis: { showgrid: true, gridwidth: 0.5, range: [-140, -55], dtick: 5 },
        lataxis: { showgrid: true, gridwidth: 0.5, range: [20, 60], dtick: 5 },
      },
    },
    stage.config,
  );

  const set = (u: Record<string, unknown>): Promise<void> => restyle(stage.div, u);
  if (stage.bar) {
    slider(stage.bar, 'marker.opacity', [0.05, 1, 0.05], 0.2, (v) => void set({ 'marker.opacity': v }));
    slider(stage.bar, 'marker.size', [1, 10, 0.5], 2, (v) => void set({ 'marker.size': v }));
  }
  if (stage.preview) stage.every(500, (i) => void set({ 'marker.opacity': 0.1 + 0.4 * (1 + Math.sin(i / 3)) / 2, 'marker.size': 2 + (i % 8 < 4 ? 0 : 1.5) }));

  return () => stage.dispose();
};

export default mount;
