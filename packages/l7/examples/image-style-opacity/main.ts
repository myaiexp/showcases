// ImageLayer style({ opacity }): one picture re-rendered as the opacity value changes
import { ImageLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { cycle } from '../../shared/polygon-data.ts';
import { CENTER, EXTENT, mapImage } from '../../shared/raster-data.ts';
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

  const layer = new ImageLayer({});
  layer.source(mapImage(256), { parser: { type: 'image', extent: EXTENT } }).style({ opacity: 1 });
  scene.addLayer(layer);

  const set = (v: number): void => {
    layer.style({ opacity: v });
    scene.render();
  };
  if (stage.bar) slider(stage.bar, 'opacity', [0, 1, 0.05], 1, set);
  else cycle(stage, scene, [1, 0.5, 0.15, 0.8] as const, 900, set);

  return () => stage.dispose();
};

export default mount;
