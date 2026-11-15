// ImageLayer: a picture pinned to a longitude/latitude extent with parser type 'image'
import { ImageLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { CENTER, EXTENT, mapImage } from '../../shared/raster-data.ts';
import { drift } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: CENTER, zoom: ctx.preview ? 3.6 : 4.4 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  // The docs pass a JPG URL; a picture drawn on a canvas is a data: URL, so nothing is fetched.
  const layer = new ImageLayer({});
  layer.source(mapImage(256), {
    parser: { type: 'image', extent: EXTENT },
  });
  scene.addLayer(layer);

  if (ctx.preview) drift(stage, scene, CENTER, 1.5);
  return () => stage.dispose();
};

export default mount;
