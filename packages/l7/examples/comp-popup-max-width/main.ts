// Popup maxWidth: how wide the bubble may grow before its text wraps
import { Popup, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addPopup, EUROPE_CENTER, europeZoom } from '../../shared/comp-demo.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const TEXT = 'The Rhine rises in the Swiss Alps and runs about 1,230 km to the North Sea, past Basel, Cologne and Rotterdam.';

const CARD_TEXT = 'The Rhine runs 1,230 km to the North Sea.';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const popup = addPopup(stage, scene, new Popup({ lngLat: { lng: 6, lat: 49 }, title: 'Rhine', text: ctx.preview ? CARD_TEXT : TEXT, maxWidth: '240px', anchor: 'left', closeButton: false, closeOnClick: false }));
  const apply = (px: number): void => {
    // maxWidth is a CSS length string; the default is '240px'.
    popup.setOptions({ maxWidth: `${px}px` });
    const out = stage.readout();
    if (out) out.textContent = `maxWidth: '${px}px'`;
  };
  apply(240);
  if (stage.bar) slider(stage.bar, 'maxWidth (px)', [80, 400, 10], 240, apply);
  else stage.every(120, (i) => apply(Math.round(110 + 50 * Math.sin(i / 8))));

  return () => stage.dispose();
};

export default mount;
