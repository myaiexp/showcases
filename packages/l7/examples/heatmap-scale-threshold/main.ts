// HeatmapLayer scale threshold: grid cell colours mapped through a threshold scale
import { HeatmapLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { BLUES, XY, quakes } from '../../shared/heatmap-data.ts';
import { drift } from '../../shared/polygon-data.ts';
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
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const data = quakes(300);
  const layer = new HeatmapLayer()
    .source(data, { ...XY, transforms: [{ type: 'grid', size: 250000, field: 'v', method: 'sum' }] })
    .shape('square')
    .style({ coverage: 1, angle: 0 })
    .color('count', ['#4ecdc4', '#ffd166', '#ff6b6b'])
    .scale('count', { type: 'threshold', domain: [3, 8] });
  scene.addLayer(layer);
  if (stage.preview) drift(stage, scene, [10, 48], 3);

  return () => stage.dispose();
};

export default mount;
