// A 3D scatter, a histogram and an orthographic globe in one figure, all from the volcano database
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { relayout } from '../../shared/basic-util.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const [rows] = await Promise.all([csv('volcano_db.csv'), loadGeoAssets()]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 560 });
  const elev = unpackNum(rows, 'Elev');
  const marker = { color: elev, colorscale: 'Reds', opacity: 0.8 };

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scatter3d',
        mode: 'markers',
        x: unpack(rows, 'Status'),
        y: unpack(rows, 'Type'),
        z: elev,
        text: unpack(rows, 'Country'),
        hoverinfo: 'x+y+z+text',
        showlegend: false,
        marker: { size: 2, color: elev, colorscale: 'Reds', line: { color: 'transparent' } },
      },
      { type: 'histogram', x: elev, hoverinfo: 'x+y', showlegend: false, xaxis: 'x2', yaxis: 'y2', marker: { color: 'red' } },
      {
        type: 'scattergeo',
        geo: 'geo3',
        lon: unpackNum(rows, 'Longitude'),
        lat: unpackNum(rows, 'Latitude'),
        hoverinfo: 'text',
        text: unpack(rows, 'Elev'),
        mode: 'markers',
        showlegend: false,
        marker: { size: 4, ...marker, symbol: 'circle', line: { width: 1 } },
      },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Volcano Database: Elevation' },
      margin: stage.preview ? { l: 0, r: 0, t: 0, b: 0 } : { l: 20, r: 20, t: 50, b: 30 },
      annotations: stage.preview ? [] : [{ x: 0, y: 0, xref: 'paper', yref: 'paper', text: 'Source: NOAA', showarrow: false }],
      geo3: {
        domain: { x: [0, 0.45], y: [0.02, 0.98] },
        scope: 'world',
        fitbounds: false,
        projection: { type: 'orthographic' },
        showland: true,
        showocean: true,
        showlakes: true,
        oceancolor: 'rgb(6,66,115)',
        lakecolor: 'rgb(127,205,255)',
        countrywidth: 0.5,
        subunitwidth: 0.5,
      },
      scene: {
        domain: { x: [0.55, 1], y: [0, 0.6] },
        xaxis: { title: { text: 'Status' }, showticklabels: false, showgrid: true },
        yaxis: { title: { text: 'Type' }, showticklabels: false, showgrid: true },
        zaxis: { title: { text: 'Elev' }, showgrid: true },
      },
      yaxis2: { anchor: 'x2', domain: [0.7, 1], showgrid: false },
      xaxis2: { tickangle: 45, anchor: 'y2', ticksuffix: 'm', domain: [0.6, 1] },
    },
    stage.config,
  );

  // The globe turns and the 3D scene orbits, in cards only.
  if (stage.preview) {
    stage.every(100, (i) => {
      const a = 0.8 + i * 0.03;
      void relayout(stage.div, { 'geo3.projection.rotation.lon': (i * 3) % 360, 'scene.camera.eye': { x: 2 * Math.cos(a), y: 2 * Math.sin(a), z: 0.8 } });
    });
  }
  return () => stage.dispose();
};

export default mount;
