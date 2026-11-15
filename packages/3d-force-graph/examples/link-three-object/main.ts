// Link styling: linkThreeObject adds a text sprite to each link; linkPositionUpdate keeps it at the middle
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { sprites } from '../../shared/sprites.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each link carries a sprite that stays at its midpoint.' });
  const make = sprites(stage);

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(team() as TData)
    .nodeLabel('name')
    .linkWidth(0.6)
    .linkOpacity(0.5)
    .linkThreeObject((l) => make.text(l.name!, { color: '#e0af68', background: 'rgba(0,0,17,0.6)', height: 4 }))
    // Extend: keep the default line and add the sprite next to it.
    .linkThreeObjectExtend(true)
    .linkPositionUpdate((sprite, { start, end }) => {
      sprite.position.set((start.x + end.x) / 2, (start.y + end.y) / 2, (start.z + end.z) / 2);
    });

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(25));
  } else {
    fitOnce(graph, 60);
  }

  return stage.dispose;
};

export default mount;
