// style({ rotation }): turn the labels
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cities, cityFeatures } from '../../shared/data.ts';
import { slider } from '../../shared/controls.ts';
import { worldLayers } from '../../shared/world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [15, 50], zoom: ctx.preview ? 2.4 : 3.2 }),
  });
  await stage.ready(scene);

  for (const l of worldLayers()) scene.addLayer(l);
  const spots = cityFeatures(cities.filter((c) => c.continent === 'Europe'));
  const dots = new PointLayer().source(spots).shape('simple').size(4).color('#ffffff');
  const layer = new PointLayer()
    .source(spots)
    .shape('name', 'text')
    .size(13)
    .color('#ffd166')
    .style({ rotation: 0, textAllowOverlap: true });
  scene.addLayer(dots);
  scene.addLayer(layer);

  const set = (rotation: number): void => {
    layer.style({ rotation });
    scene.render();
  };
  if (stage.bar) slider(stage.bar, 'rotation', [0, 360, 5], 0, set);
  else stage.frame((t) => set((t * 40) % 360));

  return () => stage.dispose();
};

export default mount;
