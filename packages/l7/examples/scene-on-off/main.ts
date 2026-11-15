// on and off: one click listener stays, another removes itself after three clicks
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
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

  const flash = eventBoard(stage.container, ['on', 'on → off after 3']);
  let n = 0;
  scene.on('click', () => flash('on'));
  const third = (): void => {
    flash('on → off after 3');
    if (++n === 3) scene.off('click', third);
  };
  scene.on('click', third);

  if (stage.preview) {
    const ghost = stage.ghost(scene);
    ghost.move(130, 100);
    stage.every(1300, () => ghost.click());
  }

  return () => stage.dispose();
};

export default mount;
