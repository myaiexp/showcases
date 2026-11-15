// color('type*v', (type, v) => ...): one colour from two fields
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
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
    .size(ctx.preview ? 14 : 22);
  scene.addLayer(layer);

  const set = (limit: number): void => {
    // Arguments arrive in the order the fields are written: type, then v.
    layer.color('type*v', (type: string, v: number) => (type === 'a' && v > limit ? '#ff4d4d' : '#4a6a8a'));
    scene.render();
  };
  set(50);
  if (stage.bar) slider(stage.bar, 'v over', [0, 100, 5], 50, set);
  else cycle(stage, scene, [50, 20, 80, 50], 1000, set);

  return () => stage.dispose();
};

export default mount;
