// Labels with shape('name', 'text'): the first argument is the field to print
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cityFeatures } from '../../shared/data.ts';
import { drift } from '../../shared/point-data.ts';
import { worldLayers } from '../../shared/world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [15, 30], zoom: ctx.preview ? 1.2 : 1.9 }),
  });
  await stage.ready(scene);

  for (const l of worldLayers()) scene.addLayer(l);
  const layer = new PointLayer()
    .source(cityFeatures())
    .shape('name', 'text')
    .size(ctx.preview ? 11 : 14)
    .color('#ffffff')
    .style({ stroke: '#0b131c', strokeWidth: 1 });
  scene.addLayer(layer);

  if (stage.preview) drift(stage, scene, [15, 30], 25);

  return () => stage.dispose();
};

export default mount;
