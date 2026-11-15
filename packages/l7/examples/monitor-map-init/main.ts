// debug: true and getLog('map'): when the map started initialising
import { Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { logTimeline } from '../../shared/debug-view.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [60, 40.7128], zoom: ctx.preview ? 0.8 : 2 }),
    // debug turns on the DebugService's logging from the start.
    debug: true,
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const debugService = scene.getDebugService();
  logTimeline(stage.container, "getLog('map')")(debugService.getLog('map'));

  if (stage.preview) stage.frame((t) => scene.setRotation((t * 10) % 360));

  return () => stage.dispose();
};

export default mount;
