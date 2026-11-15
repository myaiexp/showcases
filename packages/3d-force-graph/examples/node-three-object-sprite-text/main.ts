// Node styling: nodeThreeObject returns a Sprite whose texture is a canvas with the node's name
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { sprites } from '../../shared/sprites.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The names are textured sprites: they always face the camera.' });
  const make = sprites(stage);
  const colors = ['#7aa2f7', '#ff9e64', '#9ece6a'];
  let size = 8;

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(team() as TData)
    .nodeLabel('')
    .nodeThreeObject((n) => make.text(n.name ?? String(n.id), { color: colors[(n.group ?? 1) - 1], height: size }));

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(30));
  }

  if (stage.bar) {
    slider(stage.bar, 'text height', 3, 16, 1, size, (v) => {
      size = v;
      graph.nodeThreeObject(graph.nodeThreeObject());
    });
  }

  if (!stage.preview) fitOnce(graph);

  return stage.dispose;
};

export default mount;
