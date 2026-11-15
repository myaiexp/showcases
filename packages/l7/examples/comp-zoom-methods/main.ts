// zoom.zoomIn() and zoomOut(); the buttons disable at the map's min and max zoom
import { Scene, Zoom } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addControl, EUROPE_CENTER } from '../../shared/comp-demo.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    // A narrow range, so both limits are a few clicks away.
    map: new Map({ center: EUROPE_CENTER, zoom: 3, minZoom: 2, maxZoom: 5 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const zoom = addControl(stage, scene, new Zoom({ position: 'topright', showZoom: true }));
  const out = stage.readout();
  const report = (): void => {
    if (out) out.textContent = `map zoom ${scene.getZoom().toFixed(2)} in [2, 5]: the + button disables at 5, the - button at 2`;
  };
  scene.on('zoomend', report);
  stage.own(() => scene.off('zoomend', report));
  report();
  if (stage.bar) {
    button(stage.bar, 'zoomIn()', () => zoom.zoomIn());
    button(stage.bar, 'zoomOut()', () => zoom.zoomOut());
  } else {
    // Cards: in until the limit, then out until the other limit.
    let dir = 1;
    stage.every(700, () => {
      const z = scene.getZoom();
      if (z > 4.8) dir = -1;
      if (z < 2.2) dir = 1;
      if (dir > 0) zoom.zoomIn();
      else zoom.zoomOut();
    });
  }

  return () => stage.dispose();
};

export default mount;
