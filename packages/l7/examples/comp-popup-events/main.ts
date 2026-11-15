// Popup events open, close, show and hide
import { Popup, Scene } from '@antv/l7';
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

  const flash = eventBoard(stage.container, ['open', 'close', 'show', 'hide']);
  const popup = new Popup({ lngLat: { lng: 10, lat: 50 }, text: 'Watch the chips', closeOnClick: false });
  for (const name of ['open', 'close', 'show', 'hide']) popup.on(name, () => flash(name));
  stage.own(() => popup.removeAllListeners());
  scene.addPopup(popup);
  stage.own(() => popup.remove());

  if (stage.bar) {
    button(stage.bar, 'popup.open()', () => popup.open());
    button(stage.bar, 'popup.close()', () => popup.close());
    button(stage.bar, 'popup.show()', () => popup.show());
    button(stage.bar, 'popup.hide()', () => popup.hide());
  } else {
    stage.every(800, (i) => {
      const step = i % 4;
      if (step === 1) popup.hide();
      else if (step === 2) popup.show();
      else if (step === 3) popup.close();
      else popup.open();
    });
  }

  return () => stage.dispose();
};

export default mount;
