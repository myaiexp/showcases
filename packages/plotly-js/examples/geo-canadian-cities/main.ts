// scattergeo markers and labels on a North America geo subplot, zoomed to Canada
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  await loadGeoAssets();
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scattergeo',
        mode: stage.preview ? 'markers' : 'markers+text',
        text: ['Montreal', 'Toronto', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Halifax', 'Victoria', 'Winnipeg', 'Regina'],
        lon: [-73.57, -79.24, -123.06, -114.1, -113.28, -75.43, -63.57, -123.21, -97.13, -104.6],
        lat: [45.5, 43.4, 49.13, 51.1, 53.34, 45.24, 44.64, 48.25, 49.89, 50.45],
        marker: {
          size: 7,
          color: ['#bebada', '#fdb462', '#fb8072', '#d9d9d9', '#bc80bd', '#b3de69', '#8dd3c7', '#80b1d3', '#fccde5', '#ffffb3'],
          line: { width: 1 },
        },
        name: 'Canadian cities',
        textposition: ['top right', 'top left', 'top center', 'bottom right', 'top right', 'top left', 'bottom right', 'bottom left', 'top right', 'top right'],
      },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Canadian cities' },
      margin: stage.preview ? { l: 0, r: 0, t: 0, b: 0 } : undefined,
      geo: {
        scope: 'north america',
        resolution: 50,
        lonaxis: { range: [-130, -55] },
        lataxis: { range: [40, 70] },
        showrivers: true,
        rivercolor: '#3d5a80',
        showlakes: true,
        lakecolor: '#1b2a3d',
        showland: true,
        landcolor: '#2b3140',
        countrycolor: '#6b7280',
        countrywidth: 1.5,
        subunitcolor: '#4b5263',
      },
    },
    stage.config,
  );

  return () => stage.dispose();
};

export default mount;
