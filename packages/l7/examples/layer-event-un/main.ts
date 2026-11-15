// layer.on('unclick' | 'unmousemove' | 'unpick' ...): events for pointer actions that miss the layer
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { PARSER, targets, tour } from '../../shared/layer-demo.ts';
import { eventBoard } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const NAMES = ['unmousemove', 'unmousedown', 'unmouseup', 'unclick', 'uncontextmenu', 'unpick'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3.2 : 4 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const { data, stops, gap } = targets(ctx.preview);
  const layer = new PointLayer().source(data, PARSER).shape('circle').size(ctx.preview ? 14 : 20).color('#8a8f98');
  scene.addLayer(layer);

  const flash = eventBoard(stage.container, NAMES);
  for (const name of NAMES) layer.on(name, () => flash(name));

  // Cards: the pointer rests on empty map between the points and clicks there.
  if (stage.preview) tour(stage, scene, [gap, stops[0], gap, stops[1]].filter((p): p is [number, number] => !!p), { clickEvery: 1 });

  return () => stage.dispose();
};

export default mount;
