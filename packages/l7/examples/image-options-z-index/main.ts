// ImageLayer options.zIndex: the larger value draws on top, whichever layer was added first
import { ImageLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { cycle } from '../../shared/polygon-data.ts';
import { CENTER, mapImage } from '../../shared/raster-data.ts';
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

  const warm = new ImageLayer({ name: 'warm', zIndex: 1 }).source(mapImage(256), {
    parser: { type: 'image', extent: [4, 43, 14, 49] },
  });
  const cool = new ImageLayer({ name: 'cool', zIndex: 0 }).source(mapImage(256, 150), {
    parser: { type: 'image', extent: [8, 44, 18, 48] },
  });
  scene.addLayer(warm);
  scene.addLayer(cool);

  // zIndex lives in the layer's options: updateLayerConfig re-sorts the queue.
  const top = (name: 'warm' | 'cool'): void => {
    warm.updateLayerConfig({ zIndex: name === 'warm' ? 1 : 0 });
    cool.updateLayerConfig({ zIndex: name === 'cool' ? 1 : 0 });
    scene.render();
  };
  if (stage.bar) select(stage.bar, 'on top', ['warm', 'cool'] as const, 'warm', top);
  else cycle(stage, scene, ['warm', 'cool'] as const, 1200, top);

  return () => stage.dispose();
};

export default mount;
