// MouseLocation: the cursor lng/lat; locationChange and getLocation()
import { MouseLocation, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addControl, EUROPE_CENTER, europeZoom, eventLog } from '../../shared/comp-demo.ts';
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

  const loc = addControl(stage, scene, new MouseLocation({ position: 'bottomleft' }));
  const log = eventLog(stage, 3, 'Move the pointer over the map.');
  loc.on('locationChange', (p: [number, number]) => log(`locationChange([${p.join(', ')}])  getLocation(): [${loc.getLocation().map((n) => n.toFixed(2)).join(', ')}]`));
  stage.own(() => loc.removeAllListeners());

  if (stage.preview) {
    // A fake pointer sweeps the map; the control reads its mousemove like a real one.
    const ghost = stage.ghost(scene);
    stage.every(250, (i) => ghost.move(40 + ((i * 17) % 190), 40 + Math.abs(Math.sin(i / 7)) * 110));
  }

  return () => stage.dispose();
};

export default mount;
