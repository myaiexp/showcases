// US airports as scattergeo markers coloured by February 2011 traffic, with a marker symbol select
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { createStage } from '../../shared/stage.ts';

const symbols = ['square', 'circle', 'diamond', 'triangle-up', 'star', 'hexagon', 'cross'] as const;
const scl: [number, string][] = [[0, 'rgb(5, 10, 172)'], [0.35, 'rgb(40, 60, 190)'], [0.5, 'rgb(70, 100, 245)'], [0.6, 'rgb(90, 120, 245)'], [0.7, 'rgb(106, 137, 247)'], [1, 'rgb(220, 220, 220)']];

const mount: Mount = async (el, ctx) => {
  const [, rows] = await Promise.all([loadGeoAssets(), csv('2011_february_us_airport_traffic.csv')]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scattergeo',
        locationmode: 'USA-states',
        lon: unpackNum(rows, 'long'),
        lat: unpackNum(rows, 'lat'),
        hoverinfo: 'text',
        text: unpack(rows, 'airport'),
        mode: 'markers',
        marker: {
          size: 8,
          opacity: 0.85,
          reversescale: true,
          autocolorscale: false,
          symbol: 'square',
          line: { width: 1, color: 'rgb(102,102,102)' },
          colorscale: scl,
          cmin: 0,
          color: unpackNum(rows, 'cnt'),
          colorbar: { title: { text: 'Incoming flights<br>Feb 2011' }, thickness: 12 },
        },
      },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Most trafficked US airports' },
      geo: { scope: 'usa', projection: { type: 'albers usa' }, showland: true, landcolor: '#2a2f3a', subunitcolor: '#4b5263', countrycolor: '#4b5263', countrywidth: 0.5, subunitwidth: 0.5 },
    },
    stage.config,
  );

  const set = (v: string): Promise<void> => restyle(stage.div, { 'marker.symbol': v });
  if (stage.bar) select(stage.bar, 'marker.symbol', symbols, 'square', (v) => void set(v));
  if (stage.preview) stage.every(1200, (i) => void set(pick(symbols, i)));

  return () => stage.dispose();
};

export default mount;
