// Node styling: nodeThreeObject returns nothing for most nodes (default sphere) and a mesh for hubs
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import { Mesh, MeshPhongMaterial, OctahedronGeometry, type Object3D } from 'three';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { degrees, randomTree, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Nodes under the threshold keep the default sphere.' });
  const data = randomTree(stage.preview ? 45 : 90, 31) as TData;
  const deg = degrees(data);
  let threshold = 4;

  const geometry = new OctahedronGeometry(8);
  const material = new MeshPhongMaterial({ color: '#ff5d73', emissive: '#7a1020', shininess: 80 });
  stage.onDispose(() => {
    geometry.dispose();
    material.dispose();
  });

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(data)
    .nodeLabel((n) => `${n.name}: ${deg.get(n.id) ?? 0} links`)
    // A falsy return means "use the default object for this node".
    .nodeThreeObject((n) => ((deg.get(n.id) ?? 0) >= threshold ? new Mesh(geometry, material) : (undefined as unknown as Object3D)));

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
  }

  if (stage.bar) {
    slider(stage.bar, 'hub threshold (links)', 2, 8, 1, threshold, (v) => {
      threshold = v;
      graph.nodeThreeObject(graph.nodeThreeObject());
    });
  }

  if (!stage.preview) fitOnce(graph);

  return stage.dispose;
};

export default mount;
