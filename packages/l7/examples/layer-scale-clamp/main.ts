// scale('v', { type: 'linear', domain: [30, 70], clamp }): what happens beyond the domain
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

  const layer = new PointLayer()
    .source(grid(ctx.preview ? 5 : 8, 4, [10, 46], 3.4), PARSER)
    .shape('circle')
    .size(ctx.preview ? 14 : 22)
    .scale('v', { type: 'linear', domain: [30, 70], clamp: true })
    .color('v', ['#2b83ba', '#ffffbf', '#d7191c']);
  scene.addLayer(layer);

  const set = (clamp: boolean): void => {
    layer.scale('v', { type: 'linear', domain: [30, 70], clamp });
    scene.render();
  };
  if (stage.bar) toggle(stage.bar, 'clamp', true, set);
  else cycle(stage, scene, [true, false], 1400, set);

  return () => stage.dispose();
};

export default mount;
