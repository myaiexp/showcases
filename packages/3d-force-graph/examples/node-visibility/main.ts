// Node styling: nodeVisibility hides a whole team; linkVisibility hides the links that touched it
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { endId, team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Untick a team: its nodes and their links disappear.' });
  const data = team() as TData;
  const groupOf = new Map(data.nodes.map((n) => [n.id, n.group!]));
  const colors = ['#7aa2f7', '#ff9e64', '#9ece6a'];
  const hidden = new Set<number>();

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(data)
    .nodeColor((n) => colors[n.group! - 1]!)
    .nodeVisibility((n) => !hidden.has(n.group!))
    .linkVisibility((l) => !hidden.has(groupOf.get(endId(l.source))!) && !hidden.has(groupOf.get(endId(l.target))!))
    .linkOpacity(0.5)
    .nodeLabel('name');
  const apply = (): void => {
    // Both accessors read `hidden`, so set them again to digest.
    graph.nodeVisibility(graph.nodeVisibility()).linkVisibility(graph.linkVisibility());
  };

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
    let i = 0;
    stage.every(1400, () => {
      const g = (i++ % 4) + 1; // teams 1..3, then none hidden
      hidden.clear();
      if (g <= 3) hidden.add(g);
      apply();
    });
  }

  if (stage.bar) {
    for (const g of [1, 2, 3]) {
      checkbox(stage.bar, `team ${g}`, true, (on) => {
        if (on) hidden.delete(g);
        else hidden.add(g);
        apply();
      });
    }
  }

  if (!stage.preview) fitOnce(graph);

  return stage.dispose;
};

export default mount;
