// style({ opacity: { field, value } }) on 3D point columns
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
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.6, pitch: 55 }),
  });
  await stage.ready(scene);

  const data = grid(ctx.preview ? 5 : 8, 4, [10, 46], 3.4);
  const layer = new PointLayer()
    .source(data, PARSER)
    .shape('cylinder')
    // [width, length, height]: the height reads the same v the opacity does.
    .size('v', (v: number) => [ctx.preview ? 8 : 12, ctx.preview ? 8 : 12, v * (ctx.preview ? 1.2 : 2)])
    .color('#7fb7ff')
    .style({ opacity: { field: 'v', value: [0.2, 1] } });
  scene.addLayer(layer);

  if (stage.preview) orbit(stage, scene, { pitch: 55, turn: 35 });

  return () => stage.dispose();
};

export default mount;
