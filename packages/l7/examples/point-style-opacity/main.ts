// style({ opacity }): the common style every shape accepts
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cities } from '../../shared/data.ts';
import { quakes, cycle } from '../../shared/point-data.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 49], zoom: ctx.preview ? 3.4 : 4 }),
  });
  await stage.ready(scene);

  const layer = new PointLayer()
    .source(quakes(ctx.preview ? 24 : 50, { spread: 2, around: cities.filter((c) => c.continent === 'Europe') }), { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size(ctx.preview ? 26 : 36)
    .color('#ff6b6b')
    .style({ opacity: 0.5 });
  scene.addLayer(layer);

  const set = (v: number): void => {
    layer.style({ opacity: v });
    scene.render();
  };
  if (stage.bar) slider(stage.bar, 'opacity', [0.05, 1, 0.05], 0.5, set);
  else cycle(stage, scene, [0.2, 0.5, 0.9, 0.5], 700, set);

  return () => stage.dispose();
};

export default mount;
