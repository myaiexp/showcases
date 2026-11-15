// shape(field, [ids]) maps a category to one registered image each
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cityFeatures } from '../../shared/data.ts';
import { drift } from '../../shared/point-data.ts';
import { icon } from '../../shared/images.ts';
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
  await scene.addImage('icon-pin', icon('pin'));
  await scene.addImage('icon-star', icon('star'));
  await scene.addImage('icon-house', icon('house'));
  const layer = new PointLayer()
    .source(cityFeatures())
    .shape('continent', ['icon-pin', 'icon-star', 'icon-house'])
    .size(ctx.preview ? 18 : 26);
  scene.addLayer(layer);

  if (stage.preview) drift(stage, scene, [15, 30], 25);

  return () => stage.dispose();
};

export default mount;
