// HeatmapLayer shape('heatmap'): points blurred into a continuous heat surface
import { HeatmapLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { RAMP, XY, quakes } from '../../shared/heatmap-data.ts';
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

  const layer = new HeatmapLayer()
    .source(quakes(300), XY)
    .shape('heatmap')
    .size('mag', [0, 1])
    .style({ intensity: 2, radius: 20, rampColors: RAMP });
  scene.addLayer(layer);
  if (stage.preview) drift(stage, scene, [10, 48], 3);

  return () => stage.dispose();
};

export default mount;
