// Scale updateWhenIdle: redraw on every frame, or once the map settles
import { Scale, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addControl, EUROPE_CENTER, europeZoom } from '../../shared/comp-demo.ts';
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

  // Two bars side by side: the left one follows the zoom live, the right one waits for the idle map.
  addControl(stage, scene, new Scale({ position: 'bottomleft', updateWhenIdle: false }));
  addControl(stage, scene, new Scale({ position: 'bottomright', updateWhenIdle: true }));
  const note = document.createElement('div');
  note.style.cssText =
    'position:absolute;left:0;right:0;bottom:44px;display:flex;justify-content:space-between;padding:0 10px;z-index:4;color:#cfe3f7;font:11px ui-monospace,monospace;pointer-events:none';
  note.innerHTML = '<span>updateWhenIdle: false</span><span>updateWhenIdle: true</span>';
  stage.container.append(note);
  stage.own(() => note.remove());

  const out = stage.readout();
  if (out) out.textContent = 'Scroll-zoom or drag: the left bar changes while you move, the right one only after you stop.';
  // Zoom in bursts with pauses, so the right bar visibly lags and then catches up.
  if (stage.preview) stage.every(60, (i) => scene.setZoom(2.5 + (Math.floor(i / 25) % 2 === 0 ? 0.9 * ((i % 25) / 25) : 0.9 * (1 - (i % 25) / 25))));

  return () => stage.dispose();
};

export default mount;
