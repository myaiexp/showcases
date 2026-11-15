// GeoLocate: transform and getGeoLocation(), asked only on your click
import { GeoLocate, Scene } from '@antv/l7';
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

  const log = eventLog(stage, 6, 'The browser asks for your location only when you click. Nothing here reads it by itself.');
  const geo = addControl(
    stage,
    scene,
    new GeoLocate({
      position: 'topright',
      // The docs convert WGS84 to GCJ02 here; this one just logs what the browser gave and rounds it.
      transform: ([lng, lat]) => {
        log(`transform([${lng.toFixed(3)}, ${lat.toFixed(3)}]) called`);
        return [Math.round(lng * 100) / 100, Math.round(lat * 100) / 100];
      },
    }),
  );
  if (stage.bar) {
    button(stage.bar, 'getGeoLocation()', () => {
      geo.getGeoLocation().then(
        ([lng, lat]) => log(`getGeoLocation() -> [${lng.toFixed(4)}, ${lat.toFixed(4)}] (WGS84, before transform)`),
        (err: unknown) => log(`getGeoLocation() rejected: ${err instanceof Error ? err.message : JSON.stringify((err as { message?: string })?.message ?? err)}`),
      );
    });
  }
  // A card never asks: the map just drifts.
  if (stage.preview) stage.every(60, (i) => scene.setCenter([EUROPE_CENTER[0] + Math.sin(i / 50) * 8, EUROPE_CENTER[1]]));

  return () => stage.dispose();
};

export default mount;
