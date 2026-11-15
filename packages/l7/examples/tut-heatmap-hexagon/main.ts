// Tutorial hexagon heat map: CSV points summed into honeycomb columns, height from a callback
import { HeatmapLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { CSV_XY, TEAL, csvOf, quakes } from '../../shared/heatmap-data.ts';
import { orbit } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [10, 48],
      zoom: ctx.preview ? 2.5 : 3.5,
      pitch: 43,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  // Stands in for the CSV the docs download: lng, lat and a value column v.
  const text = csvOf(quakes(300));
  const layer = new HeatmapLayer({})
    .source(text, { ...CSV_XY, transforms: [{ type: 'hexagon', size: 250000, field: 'v', method: 'sum' }] })
    .size('sum', (sum: number) => sum * 150)
    .shape('hexagonColumn')
    .style({ coverage: 0.8, angle: 0 })
    .color('sum', TEAL);
  scene.addLayer(layer);
  if (stage.preview) orbit(stage, scene, { pitch: 43, turn: 20 });

  return () => stage.dispose();
};

export default mount;
