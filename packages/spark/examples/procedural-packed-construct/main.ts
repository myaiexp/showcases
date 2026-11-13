// A double helix built by a PackedSplats construct callback, then wrapped in a SplatMesh
import * as THREE from 'three';
import { PackedSplats, SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, readout } from '../../shared/controls.ts';
import { rng } from '../../shared/subjects.ts';

/** Two strands of splats winding round the Y axis, joined by rungs. */
function helix(splats: PackedSplats, turns: number, strandSplats: number): void {
  const rand = rng(5);
  const center = new THREE.Vector3();
  const scales = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const color = new THREE.Color();
  const height = 2.4;
  const radius = 0.5;
  const at = (t: number, strand: number, out: THREE.Vector3): THREE.Vector3 => {
    const angle = t * turns * Math.PI * 2 + strand * Math.PI;
    return out.set(Math.cos(angle) * radius, (t - 0.5) * height, Math.sin(angle) * radius);
  };
  for (let strand = 0; strand < 2; strand++) {
    for (let i = 0; i < strandSplats; i++) {
      const t = i / strandSplats;
      at(t, strand, center).add(new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).multiplyScalar(0.05));
      scales.setScalar(0.014);
      color.setHSL(strand ? 0.55 : 0.95, 0.8, 0.55);
      splats.pushSplat(center, scales, quaternion, 0.9, color);
    }
  }
  // A rung every few strand splats: a short line of splats between the two strands.
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const rungs = Math.round(turns * 12);
  for (let r = 0; r < rungs; r++) {
    const t = (r + 0.5) / rungs;
    at(t, 0, a);
    at(t, 1, b);
    for (let k = 0; k < 14; k++) {
      center.lerpVectors(a, b, (k + 0.5) / 14);
      scales.setScalar(0.01);
      color.setHSL(0.12 + 0.1 * (k / 14), 0.7, 0.6);
      splats.pushSplat(center, scales, quaternion, 0.9, color);
    }
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.3, 3.4], target: [0, 0, 0], orbit: 0.3 });
  let turns = 3;
  let density = ctx.preview ? 3000 : 6000;
  let mesh: SplatMesh | null = null;
  const status = ctx.preview ? null : readout(el);

  const rebuild = (): void => {
    if (mesh) {
      stage.scene.remove(mesh);
      mesh.dispose(); // also disposes the PackedSplats it was given
    }
    // The `construct` callback runs once when the PackedSplats is created.
    const splats = new PackedSplats({ construct: (s) => helix(s, turns, density) });
    mesh = new SplatMesh({ packedSplats: splats });
    stage.scene.add(mesh);
    if (status) status.textContent = `${splats.numSplats} splats pushed by construct()`;
  };
  rebuild();

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'turns', 1, 8, 1, turns, (v) => ((turns = v), rebuild()));
    slider(bar, 'splats per strand', 1000, 20000, 1000, density, (v) => ((density = v), rebuild()));
  }

  stage.run((time) => {
    if (mesh) mesh.rotation.z = Math.sin(time * 0.5) * 0.15;
  });
  return () => stage.dispose();
};

export default mount;
