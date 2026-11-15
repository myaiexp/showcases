// US population by state: autocolorscale by default, or pick a named colorscale
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { createStage } from '../../shared/stage.ts';

const scales = ['auto', 'Blues', 'Viridis', 'YlOrRd', 'Greens', 'Cividis'] as const;

const mount: Mount = async (el, ctx) => {
  const [, rows] = await Promise.all([loadGeoAssets(), csv('2014_usa_states.csv')]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: unpack(rows, 'Postal'),
        z: unpackNum(rows, 'Population'),
        text: unpack(rows, 'State'),
        autocolorscale: true,
        colorbar: { thickness: 12 },
      },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : '2014 US population by state' },
      geo: { scope: 'usa', showland: true, landcolor: '#2a2f3a', showlakes: true, lakecolor: '#0f1115', subunitcolor: '#0b0f16', countrycolor: '#0b0f16' },
    },
    stage.config,
  );

  const set = (v: string): Promise<void> => restyle(stage.div, v === 'auto' ? { autocolorscale: true } : { autocolorscale: false, colorscale: v });
  if (stage.bar) select(stage.bar, 'colorscale', scales, 'auto', (v) => void set(v));
  if (stage.preview) stage.every(1300, (i) => void set(pick(scales, i)));

  return () => stage.dispose();
};

export default mount;
