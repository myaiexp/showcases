// choroplethmap shading NY, MA and VT: locations match the GeoJSON features' ids
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { darkMapStyle, landLayers, usStatesGeoJSON } from '../../shared/tiles.ts';

const scales = ['Viridis', 'Blues', 'Reds', 'YlGnBu', 'Portland'] as const;

const mount: Mount = async (el, ctx) => {
  // the docs fetch folium's us-states.json; plotly's own usa topojson gives the same features, id = state code
  const [states, land] = await Promise.all([usStatesGeoJSON(), landLayers({ detail: '50m' })]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [{ type: 'choroplethmap', locations: ['NY', 'MA', 'VT'], z: [-50, -10, -20], geojson: states as never, colorscale: 'Viridis' }],
    {
      template: stage.template,
      map: { style: darkMapStyle(), layers: land as never, center: { lon: -74, lat: 43 }, zoom: stage.preview ? 3 : 4.2 },
      margin: { t: 0, b: 0, l: 0, r: 0 },
    },
    stage.config,
  );

  const set = (v: string): Promise<void> => restyle(stage.div, { colorscale: v });
  if (stage.bar) select(stage.bar, 'colorscale', scales, 'Viridis', (v) => void set(v));
  if (stage.preview) stage.every(1400, (i) => void set(pick(scales, i)));

  return () => stage.dispose();
};

export default mount;
