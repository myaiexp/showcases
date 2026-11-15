// Tutorial wall: a fence standing on a boundary
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { ring } from '../../shared/line-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [10,48],
      zoom: ctx.preview ? 3 : 4.2,
      pitch: 55,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new LineLayer().source(ring([10, 48], 5)).size(40).shape('wall').style({ opacity: 1, sourceColor: '#0DCCFF', targetColor: 'rgba(255,255,255, 0)' });
  scene.addLayer(layer);
  if (stage.preview) stage.frame((t) => scene.setRotation(Math.sin(t / 2.5) * 40));

  return () => stage.dispose();
};

export default mount;
