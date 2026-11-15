// setPitch tilts the map, so extruded columns stand up off the ground
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
    map: new Map({ center: [105, 30], zoom: ctx.preview ? 1.8 : 2.6 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  scene.addLayer(
    new PointLayer()
      .source(cityFeatures())
      .shape('cylinder')
      .size('pop', (pop: number) => [3, 3, pop * 2])
      .color('pop', ['#3f7fa5', '#ffd166', '#ff6b6b']),
  );
  const show = valuePanel(stage.container, 'br');
  const tilt = (deg: number): void => {
    scene.setPitch(deg);
    show({ 'getPitch()': scene.getPitch().toFixed(0) });
  };
  tilt(0);

  if (stage.bar) slider(stage.bar, 'setPitch', [0, 60, 1], 0, tilt);
  if (stage.preview) stage.frame((t) => tilt(30 + 30 * Math.sin(t * 0.9)));

  return () => stage.dispose();
};

export default mount;
