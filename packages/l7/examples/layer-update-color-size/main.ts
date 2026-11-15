// layer.color(field) and layer.size(field) again, then scene.render()
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { PARSER, grid } from '../../shared/layer-demo.ts';
import { cycle } from '../../shared/point-data.ts';
import { createStage } from '../../shared/stage.ts';

const FIELDS = ['v', 'delta', 'id'] as const;
type Field = (typeof FIELDS)[number];

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
    .size('v', ctx.preview ? [6, 16] : [8, 24])
    .color('v', ['#2b83ba', '#ffffbf', '#d7191c']);
  scene.addLayer(layer);

  const state = { color: 'v' as Field, size: 'v' as Field };
  const apply = (): void => {
    layer.color(state.color, ['#2b83ba', '#ffffbf', '#d7191c']);
    layer.size(state.size, ctx.preview ? [6, 16] : [8, 24]);
    scene.render();
  };
  if (stage.bar) {
    select(stage.bar, 'color field', FIELDS, 'v', (f) => ((state.color = f), apply()));
    select(stage.bar, 'size field', FIELDS, 'v', (f) => ((state.size = f), apply()));
  } else {
    cycle(stage, scene, [['v', 'v'], ['delta', 'v'], ['v', 'id'], ['id', 'delta']] as const, 1000, ([c, s]) => {
      state.color = c;
      state.size = s;
      apply();
    });
  }

  return () => stage.dispose();
};

export default mount;
