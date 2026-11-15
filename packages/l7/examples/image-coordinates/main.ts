// ImageLayer with parser coordinates: four corners place a tilted, non-rectangular picture
import { ImageLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { CENTER, mapImage } from '../../shared/raster-data.ts';
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

  // Corners start at the picture's upper left and run clockwise; they need not form a rectangle.
  const coordinates: [number, number][] = [
    [5, 48.5],
    [16, 47],
    [17.5, 44],
    [7, 43.2],
  ];
  const layer = new ImageLayer({});
  layer.source(mapImage(256), { parser: { type: 'image', coordinates } });
  scene.addLayer(layer);

  if (ctx.preview) drift(stage, scene, CENTER, 1.5);
  return () => stage.dispose();
};

export default mount;
