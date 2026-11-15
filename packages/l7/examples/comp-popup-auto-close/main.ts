// Popup autoClose: showing one bubble closes the others, unless switched off
import { Popup, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addPopup, dots, EUROPE_CENTER, europeZoom, PLACES } from '../../shared/comp-demo.ts';
import { toggle } from '../../shared/controls.ts';
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

  const names = ['Madrid', 'Berlin', 'Rome', 'Warsaw'];
  const popups = names.map((n) => {
    const p = PLACES.find((x) => x.name === n);
    return new Popup({ lngLat: { lng: p?.lng ?? 0, lat: p?.lat ?? 0 }, text: n, autoClose: true, closeButton: false, closeOnClick: false, anchor: 'bottom' });
  });
  let auto = true;
  let k = 0;
  const openNext = (): void => {
    const popup = popups[k++ % popups.length];
    if (!popup) return;
    popup.setOptions({ autoClose: auto });
    addPopup(stage, scene, popup);
    const out = stage.readout();
    if (out) out.textContent = `autoClose: ${auto}. Each tick adds the next popup; with autoClose on, the earlier ones close.`;
  };
  if (stage.bar) toggle(stage.bar, 'autoClose', true, (v) => (auto = v));
  openNext();
  stage.every(1100, (i) => {
    // Cards flip the option every lap so both behaviours show.
    if (stage.preview && i % popups.length === 0) auto = !auto;
    openNext();
  });

  return () => stage.dispose();
};

export default mount;
