// Popup autoPan and panToPopup(): the map follows the bubble into view
import { Popup, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addPopup, dots, EUROPE_CENTER, europeZoom, PLACES } from '../../shared/comp-demo.ts';
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
  scene.addLayer(dots(PLACES, { size: 6 }));

  // Lisbon, Oslo and Athens sit near the edges of the view: the popup would be cut off there.
  const stops = ['Lisbon', 'Oslo', 'Athens', 'Helsinki'].map((n) => PLACES.find((p) => p.name === n)).filter((p) => p !== undefined);
  let k = 0;
  const popup = addPopup(stage, scene, new Popup({ lngLat: stops[0] ?? { lng: 0, lat: 40 }, text: stops[0]?.name ?? '', autoPan: true, closeButton: false, closeOnClick: false }));
  const out = stage.readout();
  let auto = true;
  const next = (): void => {
    k = (k + 1) % stops.length;
    const p = stops[k];
    if (!p) return;
    popup.setLngLat({ lng: p.lng, lat: p.lat }).setText(p.name);
    if (out) out.textContent = `setLngLat(${p.name}), autoPan: ${auto}${auto ? ': the map pans so the bubble is in view' : ': the map stays put'}`;
  };
  if (stage.bar) {
    toggle(stage.bar, 'autoPan', true, (v) => {
      auto = v;
      popup.setOptions({ autoPan: v });
    });
    button(stage.bar, 'setLngLat(next place)', next);
    button(stage.bar, 'panToPopup()', () => popup.panToPopup());
  } else {
    stage.every(1600, (i) => {
      if (i % 2) next();
      else popup.panToPopup();
    });
  }

  return () => stage.dispose();
};

export default mount;
