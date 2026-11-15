// scale('t', { type: 'cat', domain, unknown }): the colour for values the scale has no entry for
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
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

  // Types a, b, c round-robin; the domain only lists a and b, so c has no colour.
  const layer = new PointLayer()
    .source(grid(ctx.preview ? 5 : 8, 3, [10, 46], 3.8), PARSER)
    .shape('circle')
    .size(ctx.preview ? 16 : 24)
    .scale('type', { type: 'cat', domain: ['a', 'b'], unknown: '#8a8f98' })
    .color('type', ['#ff6b6b', '#4ecdc4']);
  scene.addLayer(layer);

  const set = (on: boolean): void => {
    layer.scale('type', on ? { type: 'cat', domain: ['a', 'b'], unknown: '#8a8f98' } : { type: 'cat', domain: ['a', 'b'] });
    scene.render();
  };
  if (stage.bar) toggle(stage.bar, "unknown: '#8a8f98'", true, set);
  else cycle(stage, scene, [true, false], 1300, set);

  return () => stage.dispose();
};

export default mount;
