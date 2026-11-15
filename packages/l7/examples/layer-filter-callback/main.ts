// filter('type', (type) => boolean): draw only the rows the callback accepts
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
    .color('type', ['#ff6b6b', '#ffd166', '#4ecdc4']);
  scene.addLayer(layer);

  const shown = new Set(['a', 'b', 'c']);
  const apply = (): void => {
    layer.filter('type', (type: string) => shown.has(type));
    scene.render();
  };
  apply();
  if (stage.bar) {
    for (const t of ['a', 'b', 'c']) toggle(stage.bar, `type ${t}`, true, (on) => (on ? shown.add(t) : shown.delete(t), apply()));
  } else {
    cycle(stage, scene, [['a', 'b', 'c'], ['a'], ['b', 'c'], ['c', 'a']], 1000, (keep) => {
      shown.clear();
      for (const t of keep) shown.add(t);
      apply();
    });
  }

  return () => stage.dispose();
};

export default mount;
