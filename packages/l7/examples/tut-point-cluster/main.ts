// source(data, { cluster: true }): nearby points merge, point_count sizes them
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { quakes } from '../../shared/point-data.ts';
import { worldLayers } from '../../shared/world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [20, 30], zoom: ctx.preview ? 1.2 : 2 }),
  });
  await stage.ready(scene);

  for (const l of worldLayers()) scene.addLayer(l);
  const layer = new PointLayer()
    .source(quakes(ctx.preview ? 300 : 700, { spread: 5 }), { ...{ parser: { type: 'json', x: 'lng', y: 'lat' } }, cluster: true })
    .shape('circle')
    .scale('point_count', { type: 'quantile' })
    .size('point_count', [5, 10, 15, 20, 25])
    .active(true)
    .color('yellow')
    .style({ opacity: 0.5, strokeWidth: 1 });
  scene.addLayer(layer);

  // Cards step the zoom in and out so the clusters merge and split; each zoom level
  // re-clusters the source, so a per-frame zoom would rebuild it every frame.
  const zooms = [1.2, 2, 2.8, 3.6, 2.8, 2];
  if (stage.preview) stage.every(1500, (i) => scene.setZoomAndCenter(zooms[i % zooms.length]!, [20, 30]));

  return () => stage.dispose();
};

export default mount;
