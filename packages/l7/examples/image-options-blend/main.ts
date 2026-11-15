// ImageLayer options.blend: two overlapping pictures combined by each blend mode
import { ImageLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { cycle } from '../../shared/polygon-data.ts';
import { CENTER, mapImage } from '../../shared/raster-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const MODES = ['normal', 'additive', 'subtractive', 'max'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: CENTER, zoom: ctx.preview ? 3.6 : 4.4 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const base = new ImageLayer({ zIndex: 1 }).source(mapImage(256), {
    parser: { type: 'image', extent: [4, 43, 14, 49] },
  });
  scene.addLayer(base);
  const top = new ImageLayer({ zIndex: 2, blend: 'additive' }).source(mapImage(256, 150), {
    parser: { type: 'image', extent: [8, 44, 18, 48] },
  });
  scene.addLayer(top);
  const apply = (blend: (typeof MODES)[number]): void => {
    top.setBlend(blend);
    scene.render();
  };
  if (stage.bar) select(stage.bar, 'blend', MODES, 'additive', apply);
  else cycle(stage, scene, MODES, 1400, apply);

  return () => stage.dispose();
};

export default mount;
