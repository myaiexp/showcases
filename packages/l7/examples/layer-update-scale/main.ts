// layer.scale() again, then scene.render(): the same data under four scale types
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { PARSER, grid } from '../../shared/layer-demo.ts';
import { cycle } from '../../shared/point-data.ts';
import { createStage } from '../../shared/stage.ts';

const TYPES = ['linear', 'quantile', 'quantize', 'threshold'] as const;
type Kind = (typeof TYPES)[number];

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
    .color('v', ['#ffffcc', '#a1dab4', '#41b6c4', '#2c7fb8', '#253494'])
    .scale('v', { type: 'linear' });
  scene.addLayer(layer);

  const apply = (type: Kind): void => {
    // threshold wants a domain with one number fewer than the colors.
    layer.scale('v', type === 'threshold' ? { type, domain: [20, 40, 60, 80] } : { type });
    scene.render();
  };
  if (stage.bar) select(stage.bar, 'scale type', TYPES, 'linear', apply);
  else cycle(stage, scene, TYPES, 1100, apply);

  return () => stage.dispose();
};

export default mount;
