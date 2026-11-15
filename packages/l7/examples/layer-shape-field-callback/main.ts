// shape('v', (v) => 'circle' | 'triangle'): a shape chosen per row
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
    .size(ctx.preview ? 14 : 22)
    .color('v', ['#4ecdc4', '#ff6b6b'])
    .shape('v', (v: number) => (v > 50 ? 'circle' : 'triangle'));
  scene.addLayer(layer);

  const set = (limit: number): void => {
    layer.shape('v', (v: number) => (v > limit ? 'circle' : 'triangle'));
    scene.render();
  };
  if (stage.bar) slider(stage.bar, 'circle above', [0, 100, 5], 50, set);
  else cycle(stage, scene, [50, 20, 80, 50], 1100, set);

  return () => stage.dispose();
};

export default mount;
