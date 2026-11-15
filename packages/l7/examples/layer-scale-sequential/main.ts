// scale('v', { type: 'sequential' }): a smooth ramp through five colours
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { PARSER, grid } from '../../shared/layer-demo.ts';
import { cycle } from '../../shared/point-data.ts';
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
    .size(ctx.preview ? 14 : 22)
    .scale('v', { type: 'sequential' })
    .color('v', ['#440154', '#3b528b', '#21918c', '#5ec962', '#fde725']);
  scene.addLayer(layer);

  const set = (type: 'sequential' | 'quantize'): void => {
    layer.scale('v', { type });
    scene.render();
  };
  if (stage.bar) select(stage.bar, 'type', ['sequential', 'quantize'] as const, 'sequential', set);
  else cycle(stage, scene, ['sequential', 'quantize'] as const, 1400, set);

  return () => stage.dispose();
};

export default mount;
