// style({ padding }): the margin that decides which labels collide
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cityFeatures } from '../../shared/data.ts';
import { cycle } from '../../shared/point-data.ts';
import { slider } from '../../shared/controls.ts';
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
    .style({ padding: [1, 1] });
  scene.addLayer(layer);

  const set = (p: number): void => {
    layer.style({ padding: [p, p] });
    scene.render();
  };
  if (stage.bar) slider(stage.bar, 'padding', [0, 30, 1], 1, set);
  else cycle(stage, scene, [1, 8, 16, 24, 8], 900, set);

  return () => stage.dispose();
};

export default mount;
