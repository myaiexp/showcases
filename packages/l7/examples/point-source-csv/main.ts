// source() with a csv parser: the same points from csv text
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { lattice, orbit } from '../../shared/point-data.ts';
import { pointCsv } from '../../shared/point-demo.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.4 }),
  });
  await stage.ready(scene);

  // The docs fetch a .csv; this builds the same kind of text (a header row, then one row per point).
  const csv = pointCsv(lattice(ctx.preview ? 4 : 6, 3));
  const layer = new PointLayer()
    .source(csv, { parser: { type: 'csv', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size('mag', [8, 28])
    .color('type', ['#ff6b6b', '#ffd166', '#4ecdc4']);
  scene.addLayer(layer);

  if (stage.preview) orbit(stage, scene);

  return () => stage.dispose();
};

export default mount;
