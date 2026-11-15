// 2014 GDP by country code on a Mercator map, with a custom colorscale and a linear colorbar
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { toggle } from '../../shared/controls.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const [, rows] = await Promise.all([loadGeoAssets(), csv('2014_world_gdp_with_codes.csv')]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'choropleth',
        locations: unpack(rows, 'CODE'),
        z: unpackNum(rows, 'GDP (BILLIONS)'),
        text: unpack(rows, 'COUNTRY'),
        colorscale: [[0, 'rgb(5, 10, 172)'], [0.35, 'rgb(40, 60, 190)'], [0.5, 'rgb(70, 100, 245)'], [0.6, 'rgb(90, 120, 245)'], [0.7, 'rgb(106, 137, 247)'], [1, 'rgb(220, 220, 220)']],
        autocolorscale: false,
        reversescale: true,
        marker: { line: { color: 'rgb(180,180,180)', width: 0.5 } },
        zmin: 0,
        colorbar: { dtick: 5000, tick0: 0, tickmode: 'linear', tickprefix: '$', title: { text: 'GDP<br>Billions US$' }, thickness: 12 },
      },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : '2014 global GDP' },
      geo: { showframe: false, showcoastlines: false, projection: { type: 'mercator' } },
    },
    stage.config,
  );

  const set = (u: Record<string, unknown>): Promise<void> => relayout(stage.div, u);
  if (stage.bar) {
    toggle(stage.bar, 'showframe', false, (v) => void set({ 'geo.showframe': v }));
    toggle(stage.bar, 'showcoastlines', false, (v) => void set({ 'geo.showcoastlines': v }));
  }
  if (stage.preview) stage.every(1400, (i) => void set({ 'geo.showcoastlines': i % 2 === 1, 'geo.showframe': i % 2 === 1 }));

  return () => stage.dispose();
};

export default mount;
