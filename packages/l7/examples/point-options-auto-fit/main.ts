// new PointLayer({ autoFit: true }): zoom the map to the layer once it is ready
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cities, cityFeatures } from '../../shared/data.ts';
import { worldLayers } from '../../shared/world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [0, 0], zoom: ctx.preview ? 1 : 1.2 }),
  });
  await stage.ready(scene);

  for (const l of worldLayers()) scene.addLayer(l);
  const pacific = cities.filter((c) => ['Tokyo', 'Sydney', 'Auckland', 'Manila', 'Seoul', 'Osaka'].includes(c.name));
  const layer = new PointLayer({ autoFit: true })
    .source(cityFeatures(pacific))
    .shape('circle')
    .size(ctx.preview ? 8 : 12)
    .color('#ffd166');
  scene.addLayer(layer);

  return () => stage.dispose();
};

export default mount;
