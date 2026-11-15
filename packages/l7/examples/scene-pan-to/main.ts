// panTo moves the map to a coordinate without changing the zoom
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { cities, cityFeatures } from '../../shared/data.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const STOPS = ['Berlin', 'Istanbul', 'Cairo', 'Lagos', 'Madrid', 'London'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [13.4, 52.52], zoom: 3 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  scene.addLayer(new PointLayer().source(cityFeatures()).shape('circle').size(7).color('#ffb347').style({ stroke: '#fff', strokeWidth: 1 }));
  const show = valuePanel(stage.container, 'br');
  const go = (name: (typeof STOPS)[number]): void => {
    const c = cities.find((city) => city.name === name);
    if (!c) return;
    scene.panTo([c.lng, c.lat]);
    show({ panTo: `${name} [${c.lng}, ${c.lat}]` });
  };
  go('Berlin');

  if (stage.bar) select(stage.bar, 'panTo', STOPS, 'Berlin', go);
  if (stage.preview) stage.every(1500, (i) => go(STOPS[i % STOPS.length]!));

  return () => stage.dispose();
};

export default mount;
