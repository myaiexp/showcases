// size(20), size('v'), size('v', [min, max]) and size('v', callback) on one layer
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { PARSER, grid } from '../../shared/layer-demo.ts';
import { cycle } from '../../shared/point-data.ts';
import { createStage } from '../../shared/stage.ts';

const FORMS = ['size(20)', "size('v')", "size('v', [8, 30])", "size('v', callback)"] as const;

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
    .size(20)
    .color('#7fb7ff')
    .style({ opacity: 0.8 });
  scene.addLayer(layer);

  const set = (form: (typeof FORMS)[number]): void => {
    if (form === 'size(20)') layer.size(20);
    else if (form === "size('v')") layer.size('v');
    else if (form === "size('v', [8, 30])") layer.size('v', [8, 30]);
    else layer.size('v', (v: number) => (v > 50 ? 28 : 8));
    scene.render();
  };
  if (stage.bar) select(stage.bar, 'form', FORMS, FORMS[0], set);
  else cycle(stage, scene, FORMS, 1000, set);

  return () => stage.dispose();
};

export default mount;
