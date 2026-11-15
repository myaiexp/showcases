// setRotation turns the map clockwise around the container's centre
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { cityFeatures } from '../../shared/data.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 48], zoom: ctx.preview ? 2 : 3 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  scene.addLayer(new PointLayer().source(cityFeatures()).shape('triangle').size(9).color('#ffd166'));
  const show = valuePanel(stage.container, 'br');
  const rotate = (deg: number): void => {
    scene.setRotation(deg);
    show({ rotation: `${Math.round(deg)}°` });
  };
  rotate(0);

  if (stage.bar) slider(stage.bar, 'setRotation', [0, 360, 1], 0, rotate);
  if (stage.preview) stage.frame((t) => rotate((t * 30) % 360));

  return () => stage.dispose();
};

export default mount;
