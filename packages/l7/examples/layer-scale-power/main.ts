// scale('v', { type: 'power' }): a curved continuous mapping (the type is 'power', not 'pow')
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
    .size('v', [6, ctx.preview ? 16 : 26])
    .scale('v', { type: 'power' })
    .color('v', ['#f7fcb9', '#31a354', '#004529']);
  scene.addLayer(layer);

  const set = (type: 'linear' | 'power'): void => {
    layer.scale('v', { type });
    scene.render();
  };
  if (stage.bar) select(stage.bar, 'type', ['linear', 'power'] as const, 'power', set);
  else cycle(stage, scene, ['power', 'linear'] as const, 1400, set);

  return () => stage.dispose();
};

export default mount;
