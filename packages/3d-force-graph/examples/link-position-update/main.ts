// Link styling: linkPositionUpdate places a custom link object itself; returning true skips the default
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import { Mesh, MeshBasicMaterial, SphereGeometry } from 'three';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { randomTree, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The links are gone: each is now a bead that this callback moves along the old line.' });
  const geometry = new SphereGeometry(2.2, 12, 8);
  const material = new MeshBasicMaterial({ color: '#ffb454' });
  stage.onDispose(() => {
    geometry.dispose();
    material.dispose();
  });
  let moving = true;
  let order = 0;

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink & { phase?: number }>)
    .graphData(randomTree(stage.preview ? 36 : 70, 41) as TData)
    .nodeVal(1)
    .nodeOpacity(0.5)
    // No linkThreeObjectExtend: the bead replaces the default line.
    .linkThreeObject((l) => {
      l.phase = (order++ * 0.37) % 1;
      return new Mesh(geometry, material);
    })
    .linkPositionUpdate((bead, { start, end }, link) => {
      const wave = moving ? 0.5 - 0.5 * Math.cos(((performance.now() / 2500 + (link.phase ?? 0)) % 1) * Math.PI * 2) : 0.5;
      bead.position.set(start.x + (end.x - start.x) * wave, start.y + (end.y - start.y) * wave, start.z + (end.z - start.z) * wave);
      return true; // placed: skip the library's own positioning
    });

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
  } else {
    fitOnce(graph);
  }

  if (stage.bar) checkbox(stage.bar, 'beads travel', true, (v) => (moving = v));

  return stage.dispose;
};

export default mount;
