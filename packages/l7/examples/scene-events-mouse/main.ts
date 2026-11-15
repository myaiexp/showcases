// Scene mouse events: mousemove, mousedown, mouseup, click, dblclick, contextmenu
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cityFeatures } from '../../shared/data.ts';
import { eventBoard } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const EVENTS = ['mousemove', 'mousedown', 'mouseup', 'click', 'dblclick', 'contextmenu'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [20, 30], zoom: 1.6 }),
  });
  await stage.ready(scene);
  // Double-click zoom would move the map on every dblclick; the event still fires without it.
  scene.setMapStatus({ doubleClickZoom: false });
  for (const l of worldLayers()) scene.addLayer(l);
  scene.addLayer(new PointLayer().source(cityFeatures()).shape('circle').size(5).color('#ffb347'));

  const flash = eventBoard(stage.container, EVENTS);
  for (const name of EVENTS) {
    scene.on(name, (e: { lngLat?: { lng: number; lat: number } }) =>
      flash(name, e.lngLat && name !== 'mousemove' ? `@${e.lngLat.lng.toFixed(0)},${e.lngLat.lat.toFixed(0)}` : undefined),
    );
  }

  if (stage.preview) {
    const ghost = stage.ghost(scene);
    stage.every(450, (i) => {
      const step = i % 8;
      if (step < 4) ghost.move(70 + step * 40, 110 + (step % 2) * 20);
      else if (step === 5) ghost.click();
      else if (step === 7) ghost.dblclick();
    });
  }

  return () => stage.dispose();
};

export default mount;
