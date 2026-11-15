// TileDebugLayer: tile outlines and numbers, no data needed
import { Scene, TileDebugLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { drift } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 47], zoom: ctx.preview ? 3.4 : 4.2 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const debugLayer = new TileDebugLayer();
  scene.addLayer(debugLayer);

  if (ctx.preview) drift(stage, scene, [12, 47], 5);

  return () => stage.dispose();
};

export default mount;
