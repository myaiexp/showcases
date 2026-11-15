// style({ textOffset: [x, y] }): nudge labels in pixels
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
    .style({ textOffset: [0, 0] });
  scene.addLayer(dots);
  scene.addLayer(layer);

  const set = (x: number, y: number): void => {
    layer.style({ textOffset: [x, y] });
    scene.render();
  };
  if (stage.bar) {
    let x = 0;
    let y = 0;
    slider(stage.bar, 'x', [-40, 40, 1], 0, (v) => set((x = v), y));
    slider(stage.bar, 'y', [-40, 40, 1], 0, (v) => set(x, (y = v)));
  } else stage.frame((t) => set(Math.cos(t * 2) * 16, Math.sin(t * 2) * 16));

  return () => stage.dispose();
};

export default mount;
