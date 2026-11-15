// style({ opacity: { field, value } }) on an image layer: icons with their own opacity
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { icon } from '../../shared/images.ts';
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
  await scene.addImage('marker', icon('pin'));

  const data = grid(ctx.preview ? 5 : 8, 3, [10, 46], 3.8);
  const layer = new PointLayer()
    .source(data, PARSER)
    .shape('marker')
    .size(ctx.preview ? 20 : 30)
    .style({ opacity: { field: 'v', value: [0.15, 1] } });
  scene.addLayer(layer);

  if (stage.preview) orbit(stage, scene, { turn: 20 });

  return () => stage.dispose();
};

export default mount;
