// Twenty-five instances of one LoD PackedSplats, all drawn from a single shared budget
import * as THREE from 'three';
import { PackedSplats, SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, overlay, slider } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    position: [0, 0.6, 0],
    orbit: false,
    spark: { lodSplatCount: ctx.preview ? 15000 : 60000 },
  });
  const { camera } = stage;
  const per = ctx.preview ? 20000 : 50000;
  // One PackedSplats with one LoD tree; each SplatMesh is an independently placed instance.
  const knotSplats = new PackedSplats({ construct: (s) => pushTorusKnot(s, per) });
  knotSplats.initialized.then(() => knotSplats.createLodSplats());
  const side = 5;
  for (let i = 0; i < side * side; i++) {
    const mesh = new SplatMesh({ packedSplats: knotSplats });
    mesh.position.set(((i % side) - 2) * 2.4, 0.4, (Math.floor(i / side) - 2) * 2.4);
    mesh.rotation.set(Math.PI / 2, 0, i * 0.7);
    stage.scene.add(mesh);
  }
  const status = overlay(el);

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'lodSplatCount (k)', 5, 500, 5, 60, (v) => (stage.spark.lodSplatCount = v * 1000));
  }

  const look = new THREE.Vector3();
  stage.run((time) => {
    // Glide low over the field: near knots get the detail, far ones share what's left.
    const a = time * 0.15;
    camera.position.set(Math.cos(a) * 4, 0.9, Math.sin(a) * 4);
    camera.lookAt(look.set(Math.cos(a + 0.9) * 2, 0.3, Math.sin(a + 0.9) * 2));
    const drawn = (stage.spark.geometry as THREE.InstancedBufferGeometry).instanceCount;
    status.textContent = `25 instances × ${per.toLocaleString()} splats · ${drawn.toLocaleString()} drawn`;
  });
  // Each SplatMesh.dispose() also disposes the PackedSplats it points at; repeats are no-ops.
  return () => stage.dispose();
};

export default mount;
