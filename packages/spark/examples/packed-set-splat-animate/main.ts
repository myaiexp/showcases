// A rippling splat sheet rewritten each frame with setSplat and needsUpdate
import * as THREE from 'three';
import { PackedSplats, SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, overlay, slider } from '../../shared/controls.ts';
import { wrapInCard } from '../../shared/labels.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 1.5, 2.6], target: [0, 0, 0], orbit: 0.2 });
  const label = overlay(el);
  wrapInCard(label, ctx.preview);
  let side = ctx.preview ? 50 : 80;
  let packed = new PackedSplats();
  let mesh: SplatMesh | null = null;

  const build = (): void => {
    if (mesh) {
      stage.scene.remove(mesh);
      mesh.dispose(); // also disposes the PackedSplats it owns
    }
    packed = new PackedSplats();
    const zero = new THREE.Vector3();
    const size = new THREE.Vector3().setScalar((2 / side) * 0.7);
    const identity = new THREE.Quaternion();
    const white = new THREE.Color(1, 1, 1);
    // Allocate every splat once; the frame loop below only overwrites them.
    for (let i = 0; i < side * side; i++) packed.pushSplat(zero, size, identity, 1, white);
    mesh = new SplatMesh({ packedSplats: packed });
    stage.scene.add(mesh);
  };
  build();

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'splats (side x side)', 20, 170, 5, side, (v) => ((side = v), build()));
  }

  // Reused every frame: setSplat copies the numbers into the packed array and keeps no reference.
  const center = new THREE.Vector3();
  const scales = new THREE.Vector3();
  const quat = new THREE.Quaternion();
  const color = new THREE.Color();
  let shown = 0;

  stage.run((t) => {
    scales.setScalar((2 / side) * 0.7);
    const start = performance.now();
    for (let i = 0; i < side; i++) {
      for (let j = 0; j < side; j++) {
        const x = (i / (side - 1) - 0.5) * 2;
        const z = (j / (side - 1) - 0.5) * 2;
        const r = Math.hypot(x, z);
        const y = 0.16 * Math.sin(r * 10 - t * 3) / (1 + r * 2) + 0.05 * Math.sin(x * 5 + t) * Math.cos(z * 4 - t * 1.3);
        center.set(x, y, z);
        color.setHSL(0.58 - y * 1.6, 0.75, 0.5 + y);
        packed.setSplat(i * side + j, center, scales, quat, 1, color);
      }
    }
    // Tell three.js the array changed so it re-uploads the texture. Costly: fine for thousands of splats.
    packed.needsUpdate = true;
    const ms = performance.now() - start;
    if (t - shown > 0.5) {
      shown = t;
      label.textContent = `${side * side} setSplat calls per frame, ${ms.toFixed(1)} ms on the CPU`;
    }
  });
  return () => stage.dispose();
};

export default mount;
