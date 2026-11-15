// Popup closing: closeButton, closeButtonOffsets, closeOnClick and closeOnEsc
import { Popup, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addPopup, EUROPE_CENTER, europeZoom, eventLog } from '../../shared/comp-demo.ts';
import { button, toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
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

  const log = eventLog(stage, 4, 'Click the map, press Esc or use the X: whichever options are on close the popup.');
  const popup = addPopup(
    stage,
    scene,
    new Popup({ lngLat: { lng: 10, lat: ctx.preview ? 45 : 50 }, title: 'Close me', text: 'Hello', closeButton: true, closeButtonOffsets: [0, 0], closeOnClick: true, closeOnEsc: true }),
  );
  popup.on('close', () => log("event 'close'"));
  const state = { closeButton: true, closeOnClick: true, closeOnEsc: true, offset: false };
  const apply = (): void => {
    popup.setOptions({ closeButton: state.closeButton, closeOnClick: state.closeOnClick, closeOnEsc: state.closeOnEsc, closeButtonOffsets: state.offset ? [-14, 6] : [0, 0] });
  };
  if (stage.bar) {
    toggle(stage.bar, 'closeButton', true, (v) => ((state.closeButton = v), apply()));
    toggle(stage.bar, 'closeButtonOffsets [-14, 6]', false, (v) => ((state.offset = v), apply()));
    toggle(stage.bar, 'closeOnClick', true, (v) => ((state.closeOnClick = v), apply()));
    toggle(stage.bar, 'closeOnEsc', true, (v) => ((state.closeOnEsc = v), apply()));
    button(stage.bar, 'popup.open()', () => popup.open());
  } else {
    // Cards: pretend to be the user, closing with the X and reopening.
    stage.every(1300, (i) => {
      state.closeButton = i % 6 < 4;
      state.offset = i % 4 === 3;
      apply();
      if (i % 4 === 3) popup.close();
      else if (i % 4 === 0) popup.open();
    });
  }

  return () => stage.dispose();
};

export default mount;
