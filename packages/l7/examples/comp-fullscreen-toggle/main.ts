// Fullscreen control: toggleFullscreen() and the fullscreenChange event
import { Fullscreen, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addControl, EUROPE_CENTER, europeZoom, eventLog } from '../../shared/comp-demo.ts';
import { button } from '../../shared/controls.ts';
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

  const full = addControl(stage, scene, new Fullscreen({ position: 'topright' }));
  const log = eventLog(stage, 5, 'Click the control, or the button, then press Esc to leave.');
  full.on('fullscreenChange', (isFullscreen: boolean) => log(`fullscreenChange(${isFullscreen})`));
  stage.own(() => full.removeAllListeners());
  if (stage.bar) button(stage.bar, 'toggleFullscreen()', () => void full.toggleFullscreen());
  // A card cannot go fullscreen without a user gesture: the map turns instead.
  if (stage.preview) stage.every(60, (i) => scene.setRotation(Math.sin(i / 40) * 25));

  return () => stage.dispose();
};

export default mount;
