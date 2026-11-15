// style({ textAnchor: { field, value } }): an anchor per continent
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
    map: new Map({ center: [15, 30], zoom: ctx.preview ? 1.4 : 2 }),
  });
  await stage.ready(scene);

  for (const l of worldLayers()) scene.addLayer(l);
  const dots = new PointLayer().source(cityFeatures()).shape('simple').size(4).color('#ffffff');
  const layer = new PointLayer()
    .source(cityFeatures())
    .shape('name', 'text')
    .size(ctx.preview ? 10 : 13)
    .color('#ffd166')
    .style({
      textAnchor: { field: 'continent', value: ['top', 'bottom', 'left', 'right', 'top-left', 'bottom-right'] },
    });
  scene.addLayer(dots);
  scene.addLayer(layer);

  if (stage.preview) drift(stage, scene, [15, 30], 25);

  return () => stage.dispose();
};

export default mount;
