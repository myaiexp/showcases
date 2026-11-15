// style({ opacity: { field, value } }) on a line layer: a fade per route
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { EUROPE, PARSER, rows } from '../../shared/line-data.ts';
import { cycle } from '../../shared/point-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 50], zoom: ctx.preview ? 2.4 : 3.3 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const data = rows('Berlin', ctx.preview ? 10 : 16, EUROPE);
  const layer = new LineLayer()
    .source(data, PARSER)
    .shape('line')
    .size(ctx.preview ? 3 : 4)
    .color('#ffd166')
    .style({ opacity: { field: 'count', value: [0.15, 1] } });
  scene.addLayer(layer);

  const RANGES = ['[0.1, 1]', '[0.5, 1]', '[1, 0.1]'] as const;
  const set = (range: (typeof RANGES)[number]): void => {
    // Going back to a plain number after a mapping leaves a polygon layer blank in 2.29.1, so every state here is a mapping.
    layer.style({ opacity: { field: 'count', value: JSON.parse(range) as number[] } });
    scene.render();
  };
  if (stage.bar) select(stage.bar, 'value', RANGES, RANGES[0], set);
  else cycle(stage, scene, RANGES, 1300, set);

  return () => stage.dispose();
};

export default mount;
