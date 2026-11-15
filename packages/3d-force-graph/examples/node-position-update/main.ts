// Node styling: nodePositionUpdate positions each node object itself; a truthy return skips the default
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import { BoxGeometry, Mesh, MeshLambertMaterial } from 'three';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Cubes spin in place and bob; untick "take over" to see the default placement win.' });
  const data = clusters(3, stage.preview ? 8 : 12) as TData;
  const colors = ['#7aa2f7', '#ff9e64', '#9ece6a'];
  const geometry = new BoxGeometry(1, 1, 1);
  const materials = colors.map((color) => new MeshLambertMaterial({ color }));
  stage.onDispose(() => {
    geometry.dispose();
    for (const m of materials) m.dispose();
  });
  let takeOver = true;

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(data)
    .nodeLabel('name')
    .nodeThreeObject((n) => {
      const cube = new Mesh(geometry, materials[(n.group ?? 1) - 1]);
      cube.scale.setScalar(6 + (n.val ?? 1) * 1.5);
      return cube;
    })
    .nodePositionUpdate((obj, { x, y, z }, node) => {
      const t = performance.now() / 1000;
      obj.rotation.x = t * 1.2 + (node.index ?? 0);
      obj.rotation.y = t * 0.8;
      if (!takeOver) return false; // falsy: the library sets the position as usual
      obj.position.set(x, y + Math.sin(t * 2 + (node.index ?? 0)) * 5, z);
      return true; // truthy: the position is ours
    });

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
  }

  if (stage.bar) checkbox(stage.bar, 'take over (return true)', true, (v) => (takeOver = v));

  if (!stage.preview) fitOnce(graph);

  return stage.dispose;
};

export default mount;
