// style({ textOffset: { field, value } }): each label placed by an offset per category
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
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3.4 : 4 }),
  });
  await stage.ready(scene);

  const spots: Record<string, [number, number]> = { a: [0, -16], b: [0, 16], c: [26, 0] };
  const data = grid(ctx.preview ? 3 : 5, 3, [10, 46], 4.4);
  const dots = new PointLayer().source(data, PARSER).shape('simple').size(4).color('#ffffff');
  const labels = new PointLayer()
    .source(data, PARSER)
    .shape('name', 'text')
    .size(ctx.preview ? 11 : 14)
    .color('type', ['#ff6b6b', '#ffd166', '#4ecdc4'])
    .style({ textOffset: { field: 'type', value: (t: string) => spots[t] ?? [0, 0] } });
  scene.addLayer(dots);
  scene.addLayer(labels);

  if (stage.preview) orbit(stage, scene, { turn: 15 });

  return () => stage.dispose();
};

export default mount;
