// scale('big', { type: 'log' }) against linear, on values from 1 to 1000
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

  // big: 1..1000, evenly spread in the exponent.
  const data = grid(ctx.preview ? 5 : 8, 4, [10, 46], 3.4).map((r) => ({ ...r, big: Math.round(Math.exp((r.v / 100) * 6.9)) }));
  const layer = new PointLayer()
    .source(data, PARSER)
    .shape('circle')
    .size(ctx.preview ? 14 : 22)
    .scale('big', { type: 'log' })
    .color('big', ['#ffffb2', '#fd8d3c', '#800026']);
  scene.addLayer(layer);

  const set = (type: 'linear' | 'log'): void => {
    layer.scale('big', { type });
    scene.render();
  };
  if (stage.bar) select(stage.bar, 'type', ['linear', 'log'] as const, 'log', set);
  else cycle(stage, scene, ['log', 'linear'] as const, 1400, set);

  return () => stage.dispose();
};

export default mount;
