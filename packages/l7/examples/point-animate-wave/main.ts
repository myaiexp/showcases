// animate(true) on a flat shape: points become spreading rings
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cities, cityFeatures } from '../../shared/data.ts';
import { toggle } from '../../shared/controls.ts';
import { worldLayers } from '../../shared/world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [15, 35], zoom: ctx.preview ? 1.4 : 2 }),
  });
  await stage.ready(scene);

  for (const l of worldLayers()) scene.addLayer(l);
  const layer = new PointLayer()
    .source(cityFeatures(cities.filter((c) => c.pop >= 10)))
    .shape('circle')
    .animate(true)
    .size(ctx.preview ? 36 : 56)
    .color('#ffa842');
  scene.addLayer(layer);

  if (stage.bar) toggle(stage.bar, 'animate', true, (on) => layer.animate(on));

  return () => stage.dispose();
};

export default mount;
