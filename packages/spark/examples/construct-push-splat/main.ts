// A spiral galaxy pushed splat by splat inside a SplatMesh constructSplats callback
import * as THREE from 'three';
import { SplatMesh, type PackedSplats } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { rng } from '../../shared/subjects.ts';

function buildGalaxy(splats: PackedSplats, count: number, arms: number): void {
  const rand = rng(42);
  // One set of objects for every splat: pushSplat encodes them and keeps no reference.
  const center = new THREE.Vector3();
  const scales = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const color = new THREE.Color();
  for (let i = 0; i < count; i++) {
    const r = Math.pow(rand(), 0.6) * 1.6;
    const arm = Math.floor(rand() * arms);
    const angle = (arm / arms) * Math.PI * 2 + r * 2.4 + (rand() - 0.5) * 0.5 * (1.7 - r);
    const spread = 0.04 + 0.1 * r * rand();
    center.set(Math.cos(angle) * r, (rand() - 0.5) * 0.12 * (1.7 - r), Math.sin(angle) * r);
    center.x += (rand() - 0.5) * spread;
    center.z += (rand() - 0.5) * spread;
    // Flat discs lying in the galaxy plane.
    scales.set(0.012 + 0.01 * rand(), 0.003, 0.012 + 0.01 * rand());
    color.setHSL(0.6 - r * 0.35, 0.7, 0.75 - r * 0.25);
    splats.pushSplat(center, scales, quaternion, 0.6 + 0.4 * rand(), color);
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 1.6, 2.4] });
  let count = ctx.preview ? 20000 : 60000;
  let arms = 3;

  let galaxy: SplatMesh | null = null;
  const rebuild = (): void => {
    if (galaxy) {
      stage.scene.remove(galaxy);
      galaxy.dispose();
    }
    galaxy = new SplatMesh({ constructSplats: (splats) => buildGalaxy(splats, count, arms) });
    stage.scene.add(galaxy);
  };
  rebuild();

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'splats', 5000, 200000, 5000, count, (v) => ((count = v), rebuild()));
    slider(bar, 'arms', 1, 6, 1, arms, (v) => ((arms = v), rebuild()));
  }

  stage.run((_, dt) => {
    if (galaxy) galaxy.rotation.y -= dt * 0.15;
  });
  return () => stage.dispose();
};

export default mount;
