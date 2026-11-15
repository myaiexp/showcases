// control.show() and hide() toggle a control; getContainer() is its DOM node
import { Scale, Scene, Zoom } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addControl, EUROPE_CENTER, europeZoom } from '../../shared/comp-demo.ts';
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

  const zoom = addControl(stage, scene, new Zoom({ position: 'topright' }));
  addControl(stage, scene, new Scale({ position: 'bottomleft' }));
  const out = stage.readout();
  const report = (what: string): void => {
    if (!out) return;
    const box = zoom.getContainer();
    out.textContent = `${what}\ngetContainer(): <${box.tagName.toLowerCase()} class="${box.className}"> display: ${getComputedStyle(box).display}`;
  };
  report('zoom added');
  const hide = (): void => (zoom.hide(), report('zoom.hide()'));
  const show = (): void => (zoom.show(), report('zoom.show()'));
  if (stage.bar) {
    button(stage.bar, 'hide()', hide);
    button(stage.bar, 'show()', show);
  } else stage.every(1200, (i) => (i % 2 ? hide() : show()));

  return () => stage.dispose();
};

export default mount;
