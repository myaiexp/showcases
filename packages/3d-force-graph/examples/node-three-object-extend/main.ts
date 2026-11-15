// Node styling: nodeThreeObjectExtend keeps the default sphere and adds a sprite label above it
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { sprites } from '../../shared/sprites.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'extend: true puts the label on top of the sphere; false replaces the sphere.' });
  const make = sprites(stage);
  const colors = ['#7aa2f7', '#ff9e64', '#9ece6a'];

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(team() as TData)
    .nodeLabel('')
    .nodeColor((n) => colors[(n.group ?? 1) - 1]!)
    .nodeOpacity(0.9)
    .nodeThreeObject((n) => {
      const label = make.text(n.name ?? String(n.id), { color: '#ffffff', height: 5 });
      // Children sit in the node's own space: lift the label above the sphere.
      label.position.y = Math.cbrt(n.val ?? 1) * 4 + 5;
      return label;
    })
    .nodeThreeObjectExtend(true);

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(25));
    let on = true;
    // Start flipping after the camera has been fitted to the first layout.
    stage.after(3500, () =>
      stage.every(2200, () => {
        on = !on;
        graph.nodeThreeObjectExtend(on);
      }),
    );
  }

  if (stage.bar) checkbox(stage.bar, 'nodeThreeObjectExtend', true, (v) => graph.nodeThreeObjectExtend(v));

  if (!stage.preview) fitOnce(graph);

  return stage.dispose;
};

export default mount;
