// choropleth with locationmode 'ISO-3': five countries by three-letter code, fitted automatically in v4
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { pick, relayout, restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { createStage } from '../../shared/stage.ts';

const scales = ['Viridis', 'Plasma', 'Blues', 'Reds', 'Cividis'] as const;

const mount: Mount = async (el, ctx) => {
  await loadGeoAssets();
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [{ type: 'choropleth', locations: ['USA', 'CAN', 'MEX', 'BRA', 'RUS'], locationmode: 'ISO-3', z: [100, 85, 72, 95, 68], colorscale: 'Viridis', colorbar: { thickness: 12 } }],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Choropleth with ISO-3 country codes' },
      // fitbounds defaults to 'locations' in v4; the USA and Russia cross the antimeridian, so the fit is wide
      geo: { projection: { type: 'natural earth' } },
    },
    stage.config,
  );

  const set = (v: string): Promise<void> => restyle(stage.div, { colorscale: v });
  if (stage.bar) {
    select(stage.bar, 'colorscale', scales, 'Viridis', (v) => void set(v));
    select(stage.bar, 'geo.fitbounds', ['locations', 'false'] as const, 'locations', (v) => void relayout(stage.div, { 'geo.fitbounds': v === 'false' ? false : v }));
  }
  if (stage.preview) stage.every(1400, (i) => void set(pick(scales, i)));

  return () => stage.dispose();
};

export default mount;
