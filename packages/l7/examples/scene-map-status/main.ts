// setMapStatus switches map interactions on and off: drag, zoom, rotate, double-click zoom
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { cityFeatures } from '../../shared/data.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [20, 30], zoom: ctx.preview ? 1 : 2 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  scene.addLayer(new PointLayer().source(cityFeatures()).shape('circle').size(5).color('#ffb347'));

  const status = { dragEnable: true, zoomEnable: true, rotateEnable: true, doubleClickZoom: true, keyboardEnable: true };
  const show = valuePanel(stage.container, 'br');
  const apply = (): void => {
    scene.setMapStatus(status);
    show(Object.fromEntries(Object.entries(status).map(([k, v]) => [k, v ? 'on' : 'off'])));
  };
  apply();

  if (stage.bar) {
    for (const key of Object.keys(status) as (keyof typeof status)[]) {
      toggle(stage.bar, key, true, (v) => {
        status[key] = v;
        apply();
      });
    }
  }
  // Cards: a ghost tries to drag the map; it only moves while dragEnable is on.
  if (stage.preview) {
    const ghost = stage.ghost(scene);
    stage.every(1600, (i) => {
      status.dragEnable = i % 4 < 2;
      apply();
      const dir = i % 2 ? 1 : -1;
      void ghost.drag([[130 - 40 * dir, 100], [130, 100], [130 + 40 * dir, 100]], 120);
    });
  }

  return () => stage.dispose();
};

export default mount;
