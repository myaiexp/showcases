// World choropleth by country name (alcohol consumption) with an autocolorscale and a projection select
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { pick, relayout } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { createStage } from '../../shared/stage.ts';

const projections = ['robinson', 'natural earth', 'equirectangular', 'mollweide', 'winkel tripel', 'orthographic'] as const;

const mount: Mount = async (el, ctx) => {
  const [, rows] = await Promise.all([loadGeoAssets(), csv('2010_alcohol_consumption_by_country.csv')]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'choropleth',
        locationmode: 'country names',
        locations: unpack(rows, 'location'),
        z: unpackNum(rows, 'alcohol'),
        text: unpack(rows, 'location'),
        autocolorscale: true,
        colorbar: { thickness: 12 },
      },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Pure alcohol consumption<br>among adults (age 15+) in 2010' },
      geo: { projection: { type: 'robinson' } },
    },
    stage.config,
  );

  const set = (p: string): Promise<void> => relayout(stage.div, { 'geo.projection.type': p });
  if (stage.bar) select(stage.bar, 'geo.projection.type', projections, 'robinson', (v) => void set(v));
  if (stage.preview) stage.every(1500, (i) => void set(pick(projections, i)));

  return () => stage.dispose();
};

export default mount;
