// Popup followCursor: the bubble tracks the pointer, and lngLat is ignored
import { Popup, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addPopup, EUROPE_CENTER, europeZoom } from '../../shared/comp-demo.ts';
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

  const popup = addPopup(stage, scene, new Popup({ followCursor: true, text: 'I follow the cursor', closeButton: false, closeOnClick: false, offsets: [0, -8] }));
  const label = (e: { lngLat: { lng: number; lat: number } }): void => void popup.setText(`${e.lngLat.lng.toFixed(1)}, ${e.lngLat.lat.toFixed(1)}`);
  scene.on('mousemove', label);
  stage.own(() => scene.off('mousemove', label));
  const out = stage.readout();
  if (out) out.textContent = 'followCursor: true. Move the pointer over the map.';
  if (stage.preview) {
    const ghost = stage.ghost(scene);
    stage.every(220, (i) => ghost.move(60 + ((i * 13) % 150), 50 + Math.abs(Math.sin(i / 6)) * 100));
  }

  return () => stage.dispose();
};

export default mount;
