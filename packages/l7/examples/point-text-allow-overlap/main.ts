// style({ textAllowOverlap }): hide colliding labels, or draw them all
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cityFeatures } from '../../shared/data.ts';
import { cycle } from '../../shared/point-data.ts';
import { toggle } from '../../shared/controls.ts';
import { worldLayers } from '../../shared/world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [15, 40], zoom: ctx.preview ? 2.4 : 3.2 }),
  });
  await stage.ready(scene);

  for (const l of worldLayers()) scene.addLayer(l);
  const layer = new PointLayer()
    .source(cityFeatures())
    .shape('name', 'text')
    .size(ctx.preview ? 10 : 13)
    .color('#ffd166')
    .style({ textAllowOverlap: false });
  scene.addLayer(layer);

  const set = (textAllowOverlap: boolean): void => {
    layer.style({ textAllowOverlap });
    scene.render();
  };
  if (stage.bar) toggle(stage.bar, 'textAllowOverlap', false, set);
  else cycle(stage, scene, [false, true], 1500, set);

  return () => stage.dispose();
};

export default mount;
