// style({ offsets: { field, value: callback } }): a per-point [x, y] offset
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { PARSER, grid } from '../../shared/layer-demo.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.6 }),
  });
  await stage.ready(scene);

  const base = grid(ctx.preview ? 5 : 8, 3, [10, 46], 3.8);
  const anchors = new PointLayer().source(base, PARSER).shape('simple').size(3).color('#ffffff');
  const layer = new PointLayer()
    .source(base, PARSER)
    .shape('circle')
    .size(ctx.preview ? 9 : 12)
    .color('#ff6b6b')
    .style({ offsets: { field: 'id', value: (id: number) => [Math.cos(id) * 0, Math.sin(id) * 0] } });
  scene.addLayer(anchors);
  scene.addLayer(layer);

  const set = (k: number): void => {
    layer.style({ offsets: { field: 'id', value: (id: number) => [Math.cos(id) * k, Math.sin(id) * k] } });
    scene.render();
  };
  if (stage.bar) slider(stage.bar, 'offset reach (px)', [0, 40, 2], 0, set);
  else stage.every(80, (i) => set(Math.round(20 - 20 * Math.cos(i / 10))));

  return () => stage.dispose();
};

export default mount;
