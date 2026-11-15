// choroplethmap from a hand-written GeoJSON Feature, drawn under or over a scattermap marker
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { darkMapStyle, landLayers } from '../../shared/tiles.ts';

const mount: Mount = async (el, ctx) => {
  const land = await landLayers({ detail: '50m' });
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [
      { type: 'scattermap', lon: [-86], lat: [34], marker: { size: 20, color: 'purple' } },
      {
        type: 'choroplethmap',
        locations: ['AL'],
        z: [10],
        coloraxis: 'coloraxis',
        geojson: {
          type: 'Feature',
          id: 'AL',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-86, 35], [-85, 34], [-85, 32], [-85, 32], [-85, 32], [-85, 32], [-85, 31], [-86, 31], [-87, 31], [-87, 31],
                [-88, 30], [-88, 30], [-88, 30], [-88, 30], [-88, 34], [-88, 35],
              ],
            ],
          },
        } as never,
      },
    ],
    {
      template: stage.template,
      map: { style: darkMapStyle(), layers: land as never, center: { lon: -86, lat: 33 }, zoom: 5 },
      coloraxis: { showscale: false, colorscale: 'Viridis' },
      margin: { t: 0, b: 0, l: 0, r: 0 },
    },
    stage.config,
  );

  // `below: ''` inserts the polygons above every other layer, marker included
  const order = ['trace order (marker on top)', 'below: "" (polygon on top)'] as const;
  const set = (v: string): Promise<void> => restyle(stage.div, { below: v === order[1] ? '' : null }, 1);
  if (stage.bar) select(stage.bar, 'choroplethmap.below', order, order[0], (v) => void set(v));
  if (stage.preview) stage.every(1500, (i) => void set(order[i % 2]!));

  return () => stage.dispose();
};

export default mount;
