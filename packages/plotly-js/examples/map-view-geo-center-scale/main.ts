// geo.center and projection.scale give an outline map an explicit view, so it stops auto-fitting
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  await loadGeoAssets();
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });

  await Plotly.newPlot(
    stage.div,
    [{ type: 'choropleth', locations: ['BRA', 'ARG', 'CHL', 'PER', 'COL', 'BOL'], locationmode: 'ISO-3', z: [6, 5, 4, 3, 2, 1], colorscale: 'Blues', showscale: false }],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'An explicit centre and scale' },
      geo: { projection: { type: 'equirectangular', scale: 1.3 }, center: { lon: -60, lat: -15 }, showcountries: true, countrycolor: '#e6e8ee', resolution: 110 },
    },
    stage.config,
  );

  const view = (lon: number, lat: number, scale: number): Promise<void> =>
    relayout(stage.div, { 'geo.center': { lon, lat }, 'geo.projection.scale': scale });
  if (stage.bar) {
    const v = { lon: -60, lat: -15, scale: 1.3 };
    const go = (): Promise<void> => view(v.lon, v.lat, v.scale);
    slider(stage.bar, 'center lon', [-120, 0, 1], v.lon, (x) => void ((v.lon = x), go()));
    slider(stage.bar, 'center lat', [-60, 30, 1], v.lat, (x) => void ((v.lat = x), go()));
    slider(stage.bar, 'projection.scale', [0.6, 6, 0.1], v.scale, (x) => void ((v.scale = x), go()));
  }
  if (stage.preview) stage.every(300, (i) => void view(-60 + 15 * Math.sin(i / 8), -15 + 10 * Math.cos(i / 10), 1.6 + 0.8 * Math.sin(i / 6)));

  return () => stage.dispose();
};

export default mount;
