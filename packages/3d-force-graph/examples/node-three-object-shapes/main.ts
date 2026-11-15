// Node styling: nodeThreeObject returns a mesh per node, a different geometry per group
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import { BoxGeometry, ConeGeometry, DodecahedronGeometry, Mesh, MeshLambertMaterial, TorusGeometry, type BufferGeometry } from 'three';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Four groups, four shapes.' });
  const data = clusters(4, stage.preview ? 6 : 9) as TData;

  // Geometries and materials are shared between the nodes of a group; free them with the stage.
  const geometries: BufferGeometry[] = [new BoxGeometry(1, 1, 1), new ConeGeometry(0.65, 1.3, 16), new TorusGeometry(0.6, 0.22, 10, 20), new DodecahedronGeometry(0.75)];
  const colors = ['#7aa2f7', '#ff9e64', '#9ece6a', '#f7768e'];
  const materials = colors.map((color) => new MeshLambertMaterial({ color }));
  stage.onDispose(() => {
    for (const d of [...geometries, ...materials]) d.dispose();
  });
  let sized = true;

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(data)
    .nodeLabel('name')
    .nodeThreeObject((n) => {
      const g = (n.group ?? 1) - 1;
      const mesh = new Mesh(geometries[g], materials[g]);
      mesh.scale.setScalar((sized ? 4 + (n.val ?? 1) * 2 : 8));
      return mesh;
    });

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
  }

  if (stage.bar) {
    checkbox(stage.bar, 'size from val', true, (v) => {
      sized = v;
      // Objects are built once per node: set the accessor again to rebuild them.
      graph.nodeThreeObject(graph.nodeThreeObject());
    });
  }

  if (!stage.preview) fitOnce(graph);

  return stage.dispose;
};

export default mount;
