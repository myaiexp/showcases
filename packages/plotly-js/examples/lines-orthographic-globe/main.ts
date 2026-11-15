// Contour lines on an orthographic globe: nine scattergeo line traces, a rotation you can turn
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { csv, unpackNum } from '../../shared/data.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { createStage } from '../../shared/stage.ts';

const scl = ['rgb(213,62,79)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,139)', 'rgb(255,255,191)', 'rgb(230,245,152)', 'rgb(171,221,164)', 'rgb(102,194,165)', 'rgb(50,136,189)'];

const mount: Mount = async (el, ctx) => {
  const [, rows] = await Promise.all([loadGeoAssets(), csv('globe_contours.csv')]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });

  await Plotly.newPlot(
    stage.div,
    scl.map((color, i) => ({
      type: 'scattergeo' as const,
      lon: unpackNum(rows, `lon-${i}`),
      lat: unpackNum(rows, `lat-${i}`),
      mode: 'lines' as const,
      line: { width: 2, color },
    })),
    {
      template: stage.template,
      margin: { t: 10, b: 10, l: 10, r: 10 },
      showlegend: false,
      geo: {
        projection: { type: 'orthographic', rotation: { lon: -100, lat: 40 } },
        showocean: true,
        oceancolor: '#12304a',
        showland: true,
        landcolor: '#6b4a24',
        showlakes: true,
        lakecolor: '#12304a',
        showcountries: true,
        lonaxis: { showgrid: true, gridcolor: '#666666' },
        lataxis: { showgrid: true, gridcolor: '#666666' },
      },
    },
    stage.config,
  );

  const turn = (lon: number, lat: number): Promise<void> => relayout(stage.div, { 'geo.projection.rotation': { lon, lat } });
  if (stage.bar) {
    let lon = -100;
    let lat = 40;
    slider(stage.bar, 'Rotation lon', [-180, 180, 1], lon, (v) => void turn((lon = v), lat));
    slider(stage.bar, 'Rotation lat', [-90, 90, 1], lat, (v) => void turn(lon, (lat = v)));
  }
  if (stage.preview) stage.every(120, (i) => void turn(-100 + i * 4, 40));

  return () => stage.dispose();
};

export default mount;
