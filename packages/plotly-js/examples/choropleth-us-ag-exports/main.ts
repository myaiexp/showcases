// US states shaded by 2011 agricultural exports; a select swaps the export category and rescales the colours
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { createStage } from '../../shared/stage.ts';

const cats = ['total exports', 'beef', 'pork', 'poultry', 'dairy', 'total fruits', 'total veggies', 'corn', 'wheat', 'cotton'] as const;

const mount: Mount = async (el, ctx) => {
  const [, rows] = await Promise.all([loadGeoAssets(), csv('2011_us_ag_exports.csv')]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });
  const col = (c: string): number[] => unpackNum(rows, c);

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: unpack(rows, 'code'),
        z: col('total exports'),
        text: unpack(rows, 'state'),
        zmin: 0,
        zmax: 17000,
        colorscale: [[0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'], [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'], [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']],
        colorbar: { title: { text: 'Millions USD' }, thickness: 12 },
        marker: { line: { color: '#0b0f16', width: 1.5 } },
      },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : '2011 US agriculture exports by state' },
      geo: { scope: 'usa', showlakes: true, lakecolor: '#0f1115' },
    },
    stage.config,
  );

  const set = (c: string): Promise<void> => restyle(stage.div, { z: [col(c)], zmax: Math.max(...col(c)), zmin: 0 });
  if (stage.bar) select(stage.bar, 'Category', cats, 'total exports', (v) => void set(v));
  if (stage.preview) stage.every(1300, (i) => void set(pick(cats, i)));

  return () => stage.dispose();
};

export default mount;
