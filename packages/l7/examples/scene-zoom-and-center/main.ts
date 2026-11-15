// setZoomAndCenter jumps the camera to a new zoom and centre in one call
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { cities, cityFeatures } from '../../shared/data.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const STOPS = ['World', 'Tokyo', 'Cairo', 'São Paulo', 'London', 'Sydney'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [20, 20], zoom: 1 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  scene.addLayer(new PointLayer().source(cityFeatures()).shape('circle').size('pop', [3, 14]).color('#ffb347'));
  const show = valuePanel(stage.container, 'br');

  const go = (stop: (typeof STOPS)[number]): void => {
    const city = cities.find((c) => c.name === stop);
    const zoom = city ? 5 : 0.8;
    const center: [number, number] = city ? [city.lng, city.lat] : [20, 20];
    scene.setZoomAndCenter(zoom, center);
    show({ zoom: String(zoom), center: center.map((v) => v.toFixed(1)).join(', ') });
  };
  go('World');

  if (stage.bar) select(stage.bar, 'Go to', STOPS, 'World', go);
  if (stage.preview) stage.every(1500, (i) => go(STOPS[i % STOPS.length]!));

  return () => stage.dispose();
};

export default mount;
