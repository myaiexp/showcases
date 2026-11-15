// The bubble shape is not fixed: square, triangle and the rest work too
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { quakes, drift, cycle, holder } from '../../shared/point-data.ts';
import { select } from '../../shared/controls.ts';
import { worldLayers } from '../../shared/world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [20, 25], zoom: ctx.preview ? 0.5 : 1.4 }),
  });
  await stage.ready(scene);

  for (const l of worldLayers()) scene.addLayer(l);
  const make = (shape: string) =>
    new PointLayer()
      .source(quakes(ctx.preview ? 70 : 350), { parser: { type: 'json', x: 'lng', y: 'lat' } })
      .shape(shape)
      .size('mag', [1, 25])
      .color('mag', (mag) => (mag > 4.5 ? '#5B8FF9' : '#5CCEA1'))
      .style({ opacity: 0.5, strokeWidth: 1 });
  const show = holder(scene);
  const shapes = ['circle', 'square', 'triangle', 'hexagon', 'rhombus'];
  if (stage.bar) {
    show(make('square'));
    select(stage.bar, 'shape', shapes, 'square', (v) => show(make(v)));
  } else {
    cycle(stage, scene, shapes, 1500, (v) => show(make(v)));
    drift(stage, scene, [20, 25], 30);
  }

  return () => stage.dispose();
};

export default mount;
