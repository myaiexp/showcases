// Map events: movestart, mapmove, moveend, zoomstart, zoomchange, zoomend
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cityFeatures } from '../../shared/data.ts';
import { eventBoard } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const EVENTS = ['movestart', 'mapmove', 'moveend', 'zoomstart', 'zoomchange', 'zoomend'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [20, 30], zoom: 2 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  scene.addLayer(new PointLayer().source(cityFeatures()).shape('circle').size(5).color('#ffb347'));

  const flash = eventBoard(stage.container, EVENTS);
  for (const name of EVENTS) scene.on(name, () => flash(name));

  // Cards alternate a pan and a zoom; in the full view, drag and scroll yourself.
  if (stage.preview) stage.every(1400, (i) => (i % 2 ? scene.panBy(60 * (i % 4 === 1 ? 1 : -1), 0) : scene.setZoom(i % 4 ? 2 : 2.6)));

  return () => stage.dispose();
};

export default mount;
