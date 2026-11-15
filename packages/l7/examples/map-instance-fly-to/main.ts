// scene.map is the map engine itself: its own flyTo arcs the camera between cities
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { cities, cityFeatures } from '../../shared/data.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

/** The part of @antv/l7-map's Map (its d.ts, camera.d.ts) used here; scene.map is typed unknown. */
interface EngineMap {
  flyTo(options: { center: [number, number]; zoom: number; pitch?: number; speed?: number }): unknown;
  getBearing(): number;
}

const STOPS = ['Helsinki', 'Cairo', 'Mumbai', 'Tokyo', 'Sydney', 'Lima'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [24.94, 60.17], zoom: 4 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  scene.addLayer(new PointLayer().source(cityFeatures()).shape('circle').size(6).color('#ffb347').style({ stroke: '#fff', strokeWidth: 1 }));

  // The docs: map methods L7 doesn't wrap can be called on scene.map directly.
  const engine = scene.map as EngineMap;
  const show = valuePanel(stage.container, 'br');
  const fly = (name: (typeof STOPS)[number]): void => {
    const c = cities.find((city) => city.name === name);
    if (!c) return;
    engine.flyTo({ center: [c.lng, c.lat], zoom: 4, pitch: 30, speed: 1.4 });
    show({ 'scene.map.flyTo': name });
  };

  if (stage.bar) select(stage.bar, 'flyTo', STOPS, 'Helsinki', fly);
  if (stage.preview) stage.every(3500, (i) => fly(STOPS[i % STOPS.length]!));

  return () => stage.dispose();
};

export default mount;
