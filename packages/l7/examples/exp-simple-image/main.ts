// Map version 'SIMPLE': an ImageLayer placed by plane coordinates
import { ImageLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { planImage, sway } from '../../shared/exp-simple.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [500, 500], pitch: 0, zoom: ctx.preview ? 0.7 : 1.9, version: 'SIMPLE', mapSize: 1000, maxZoom: 5, minZoom: 0, pitchEnabled: false, rotateEnabled: false } as never),
  });
  await stage.ready(scene);

  const imageLayer = new ImageLayer({}).source(planImage(), {
    parser: { type: 'image', extent: [360, 400, 640, 600] },
  });
  scene.addLayer(imageLayer);

  if (ctx.preview) sway(stage, scene, [500, 500], 40);

  return () => stage.dispose();
};

export default mount;
