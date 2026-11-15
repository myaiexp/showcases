// Control position as an Element: the control renders inside your own DOM node
import { Scale, Scene, Zoom } from '@antv/l7';
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

  // Our own container, outside L7's eight slots, in the middle of the map.
  const slot = document.createElement('div');
  slot.style.cssText =
    'position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);z-index:4;display:flex;flex-direction:column;gap:6px;align-items:center;padding:6px 10px;border-radius:8px;background:rgba(10,16,24,.8);color:#cfe3f7;font:11px ui-monospace,monospace';
  slot.append('my own slot');
  stage.container.append(slot);
  stage.own(() => slot.remove());

  addControl(stage, scene, new Zoom({ position: slot }));
  addControl(stage, scene, new Scale({ position: slot }));

  const out = stage.readout();
  if (out) out.textContent = "new Zoom({ position: slotElement }): the control's DOM is appended to the element you pass";
  if (stage.preview) stage.every(70, (i) => scene.setZoom(2.5 + Math.sin(i / 14) * 0.9));

  return () => stage.dispose();
};

export default mount;
