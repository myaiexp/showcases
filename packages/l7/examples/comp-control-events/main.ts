// Control events add, remove, show and hide, each lighting a chip as it fires
import { Scene, Zoom } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { EUROPE_CENTER, europeZoom } from '../../shared/comp-demo.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { eventBoard } from '../../shared/scene-board.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const flash = eventBoard(stage.container, ['add', 'remove', 'show', 'hide']);
  const zoom = new Zoom({ position: 'bottomright' });
  for (const name of ['add', 'remove', 'show', 'hide']) zoom.on(name, () => flash(name));
  stage.own(() => zoom.removeAllListeners());

  let added = false;
  const add = (): void => {
    scene.addControl(zoom);
    added = true;
  };
  const remove = (): void => {
    scene.removeControl(zoom);
    added = false;
  };
  stage.own(() => added && scene.removeControl(zoom));
  add();
  if (stage.bar) {
    button(stage.bar, 'scene.addControl(zoom)', () => !added && add());
    button(stage.bar, 'scene.removeControl(zoom)', () => added && remove());
    button(stage.bar, 'zoom.show()', () => added && zoom.show());
    button(stage.bar, 'zoom.hide()', () => added && zoom.hide());
  } else {
    // Cards: hide, show, remove, add, round and round.
    stage.every(900, (i) => {
      const step = i % 4;
      if (step === 1) zoom.hide();
      else if (step === 2) zoom.show();
      else if (step === 3) remove();
      else add();
    });
  }

  return () => stage.dispose();
};

export default mount;
