// ImageLayer options.autoFit: the map flies to the picture once the layer has initialised
import { ImageLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { mapImage } from '../../shared/raster-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  // The map starts on the whole world; the picture sits over Japan.
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [0, 20], zoom: ctx.preview ? 0.2 : 1.2 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new ImageLayer({ autoFit: true }).source(mapImage(256, 90), {
    parser: { type: 'image', extent: [130, 31, 142, 38] },
  });
  scene.addLayer(layer);

  return () => stage.dispose();
};

export default mount;
