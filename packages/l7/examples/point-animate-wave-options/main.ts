// animate({ enable, speed, rings }): shape the water-wave rings
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cities, cityFeatures } from '../../shared/data.ts';
import { cycle } from '../../shared/point-data.ts';
import { slider } from '../../shared/controls.ts';
import { worldLayers } from '../../shared/world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [15, 35], zoom: ctx.preview ? 1.4 : 2 }),
  });
  await stage.ready(scene);

  for (const l of worldLayers()) scene.addLayer(l);
  const layer = new PointLayer()
    .source(cityFeatures(cities.filter((c) => c.pop >= 10)))
    .shape('circle')
    .animate({ enable: true, speed: 1, rings: 3 })
    .size(ctx.preview ? 36 : 56)
    .color('#4ecdc4');
  scene.addLayer(layer);

  if (stage.bar) {
    let speed = 1;
    let rings = 3;
    slider(stage.bar, 'speed', [0.2, 4, 0.2], speed, (v) => layer.animate({ enable: true, speed: (speed = v), rings }));
    slider(stage.bar, 'rings', [1, 8, 1], rings, (v) => layer.animate({ enable: true, speed, rings: (rings = v) }));
  } else cycle(stage, scene, [3, 6, 2, 5], 2500, (rings) => layer.animate({ enable: true, speed: 1.5, rings }));

  return () => stage.dispose();
};

export default mount;
