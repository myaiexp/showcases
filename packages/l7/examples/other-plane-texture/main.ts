// GeometryLayer plane with a mapTexture drawn in code
import { GeometryLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { terrainColors } from '../../shared/exp-textures.ts';
import { drift } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [13.4, 52.5], zoom: ctx.preview ? 10.2 : 11.5 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new GeometryLayer()
    .shape('plane')
    .style({ opacity: 1, width: 0.074, height: 0.061, center: [13.4, 52.5], mapTexture: terrainColors(256) });
  scene.addLayer(layer);

  if (ctx.preview) drift(stage, scene, [13.4, 52.5], 0.01);

  return () => stage.dispose();
};

export default mount;
