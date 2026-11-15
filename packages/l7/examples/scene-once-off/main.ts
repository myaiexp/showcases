// on, once and off: three click listeners with different lifetimes
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { cityFeatures } from '../../shared/data.ts';
import { eventBoard } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [20, 30], zoom: 1.6 }),
  });
  await stage.ready(scene);
  scene.setMapStatus({ doubleClickZoom: false });
  for (const l of worldLayers()) scene.addLayer(l);
  scene.addLayer(new PointLayer().source(cityFeatures()).shape('circle').size(5).color('#ffb347'));

  const flash = eventBoard(stage.container, ['on', 'once', 'on → off after 3']);
  let n = 0;
  scene.on('click', () => flash('on'));
  scene.once('click', () => flash('once'));
  const third = (): void => {
    flash('on → off after 3');
    if (++n === 3) scene.off('click', third);
  };
  scene.on('click', third);

  if (stage.bar) button(stage.bar, 'Re-arm once()', () => scene.once('click', () => flash('once')));
  if (stage.preview) {
    const ghost = stage.ghost(scene);
    ghost.move(130, 100);
    stage.every(1300, () => ghost.click());
  }

  return () => stage.dispose();
};

export default mount;
