// LayerPopup events open, close, show, hide; show(), hide(), panToPopup()
import { LayerPopup, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addPopup, hoverTour, dots, EUROPE_CENTER, europeZoom, PLACES } from '../../shared/comp-demo.ts';
import { button } from '../../shared/controls.ts';
import { eventBoard } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    // Cards sit a little north so a bubble opening above a dot has room.
    map: new Map({ center: ctx.preview ? [11, 53] : EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = dots(PLACES, { name: 'places', size: 11 });
  scene.addLayer(layer);

  const flash = eventBoard(stage.container, ['open', 'close', 'show', 'hide']);
  const popup = addPopup(stage, scene, new LayerPopup({ items: [{ layer, fields: ['name', 'pop'] }], trigger: 'click' }));
  for (const name of ['open', 'close', 'show', 'hide']) popup.on(name, () => flash(name));
  stage.own(() => popup.removeAllListeners());
  const out = stage.readout();
  if (out) out.textContent = 'Click a dot to open the bubble, then use the buttons.';
  if (stage.bar) {
    button(stage.bar, 'show()', () => popup.show());
    button(stage.bar, 'hide()', () => popup.hide());
    button(stage.bar, 'panToPopup()', () => popup.panToPopup());
  }
  if (stage.preview) hoverTour(stage, scene, PLACES.map((p): [number, number] => [p.lng, p.lat]).slice(2, 8), { ms: 450, click: true });

  return () => stage.dispose();
};

export default mount;
