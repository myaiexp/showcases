// style({ stroke: { field, value } }): an outline colour read per point
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { PARSER, grid } from '../../shared/layer-demo.ts';
import { orbit } from '../../shared/point-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.6 }),
  });
  await stage.ready(scene);

  const layer = new PointLayer()
    .source(grid(ctx.preview ? 5 : 8, 4, [10, 46], 3.4), PARSER)
    .shape('circle')
    .size(ctx.preview ? 16 : 26)
    .color('#16324d')
    .style({ stroke: { field: 'type', value: ['#ff6b6b', '#ffd166', '#4ecdc4'] }, strokeWidth: 4 });
  scene.addLayer(layer);

  if (stage.preview) orbit(stage, scene, { turn: 20 });

  return () => stage.dispose();
};

export default mount;
