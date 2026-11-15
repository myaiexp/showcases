// control.setOptions(partial) moves a live control; getOptions() reads it back
import { Scene, Zoom } from '@antv/l7';
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

  // The docs' example: a Zoom at 'leftbottom' that onPositionChange sends to 'topright'.
  const zoom = addControl(stage, scene, new Zoom({ position: 'leftbottom' }));
  const out = stage.readout();
  const show = (): void => {
    if (!out) return;
    const { position, zoomInTitle, zoomOutTitle, showZoom, name } = zoom.getOptions();
    out.textContent = `getOptions(): ${JSON.stringify({ name, position, zoomInTitle, zoomOutTitle, showZoom })}`;
  };
  const sendTo = (position: 'topright' | 'leftbottom'): void => {
    zoom.setOptions({ position });
    show();
  };
  show();
  if (stage.bar) {
    button(stage.bar, "setOptions({ position: 'topright' })", () => sendTo('topright'));
    button(stage.bar, "setOptions({ position: 'leftbottom' })", () => sendTo('leftbottom'));
    button(stage.bar, "setOptions({ zoomInTitle: 'Closer' })", () => {
      zoom.setOptions({ zoomInTitle: 'Closer' });
      show();
    });
  } else stage.every(1500, (i) => sendTo(i % 2 ? 'topright' : 'leftbottom'));

  return () => stage.dispose();
};

export default mount;
