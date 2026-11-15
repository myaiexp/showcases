// clusterOptions: radius, minZoom and maxZoom of the aggregation
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { quakes, cycle, holder } from '../../shared/point-data.ts';
import { slider } from '../../shared/controls.ts';
import { worldLayers } from '../../shared/world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [20, 30], zoom: ctx.preview ? 1.8 : 2.4 }),
  });
  await stage.ready(scene);

  for (const l of worldLayers()) scene.addLayer(l);
  const data = quakes(ctx.preview ? 300 : 700, { spread: 5 });
  const make = (radius: number) =>
    new PointLayer()
      .source(data, { ...{ parser: { type: 'json', x: 'lng', y: 'lat' } }, cluster: true, clusterOptions: { radius, minZoom: 0, maxZoom: 16 } })
      .shape('circle')
      .scale('point_count', { type: 'quantile' })
      .size('point_count', [5, 10, 15, 20, 25])
      .color('#ffd166')
      .style({ opacity: 0.55, strokeWidth: 1 });
  const show = holder(scene);
  if (stage.bar) {
    show(make(40));
    slider(stage.bar, 'radius', [10, 120, 10], 40, (v) => show(make(v)));
  } else cycle(stage, scene, [20, 60, 110, 60], 1600, (r) => show(make(r)));

  return () => stage.dispose();
};

export default mount;
