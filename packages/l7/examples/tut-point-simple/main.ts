// Tilted map: 'simple' sprites face the camera, 'circle' lies flat
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
    map: new Map({ center: [20, 25], zoom: ctx.preview ? 0.5 : 1.4, pitch: 50 }),
  });
  await stage.ready(scene);

  for (const l of worldLayers()) scene.addLayer(l);
  const data = quakes(ctx.preview ? 70 : 350);
  const make = (shape: string) =>
    new PointLayer()
      .source(data, { parser: { type: 'json', x: 'lng', y: 'lat' } })
      .shape(shape)
      .size(15)
      .color('mag', (mag) => (mag > 4.5 ? '#5B8FF9' : '#5CCEA1'))
      .style({ opacity: 0.6, strokeWidth: 3 });
  const show = holder(scene);
  const shapes = ['simple', 'circle'];
  if (stage.bar) {
    show(make('simple'));
    select(stage.bar, 'shape', shapes, 'simple', (v) => show(make(v)));
  } else {
    cycle(stage, scene, shapes, 2000, (v) => show(make(v)));
    drift(stage, scene, [20, 25], 30);
  }

  return () => stage.dispose();
};

export default mount;
