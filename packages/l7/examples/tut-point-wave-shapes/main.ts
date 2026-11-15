// circle, triangle and square all ripple the same way
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cities } from '../../shared/data.ts';
import { quakes, cycle, holder } from '../../shared/point-data.ts';
import { select } from '../../shared/controls.ts';
import { worldLayers } from '../../shared/world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [95, 30], zoom: ctx.preview ? 1.8 : 2.6 }),
  });
  await stage.ready(scene);

  for (const l of worldLayers()) scene.addLayer(l);
  const data = quakes(ctx.preview ? 12 : 30, { spread: 4, around: cities.filter((c) => c.continent === 'Asia') });
  const make = (shape: string) => new PointLayer().source(data, { parser: { type: 'json', x: 'lng', y: 'lat' } }).shape(shape).animate(true).size(40).color('#4ecdc4');
  const show = holder(scene);
  const shapes = ['circle', 'triangle', 'square'];
  if (stage.bar) {
    show(make('circle'));
    select(stage.bar, 'shape', shapes, 'circle', (v) => show(make(v)));
  } else cycle(stage, scene, shapes, 2200, (v) => show(make(v)));

  return () => stage.dispose();
};

export default mount;
