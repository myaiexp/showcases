// layer.on('inited' | 'add' | 'remove'): the layer's life in the scene
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { PARSER, grid } from '../../shared/layer-demo.ts';
import { eventBoard } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const NAMES = ['inited', 'add', 'remove'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.8 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const flash = eventBoard(stage.container, NAMES);
  const layer = new PointLayer()
    .source(grid(ctx.preview ? 4 : 6, 3, [10, 46], 4), PARSER)
    .shape('circle')
    .size(ctx.preview ? 14 : 20)
    .color('type', ['#ff6b6b', '#ffd166', '#4ecdc4']);
  for (const name of NAMES) layer.on(name, () => flash(name));

  let added = false;
  const add = (): void => {
    if (added) return;
    scene.addLayer(layer);
    added = true;
  };
  const remove = (): void => {
    if (!added) return;
    scene.removeLayer(layer);
    added = false;
  };
  add();
  if (stage.bar) {
    button(stage.bar, 'scene.addLayer(layer)', add);
    button(stage.bar, 'scene.removeLayer(layer)', remove);
  } else stage.every(1500, (i) => (i % 2 ? remove() : add()));

  return () => stage.dispose();
};

export default mount;
