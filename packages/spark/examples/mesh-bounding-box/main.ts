// getBoundingBox(true) against getBoundingBox(false), both drawn as Box3Helpers
import * as THREE from 'three';
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay } from '../../shared/controls.ts';
import { rng } from '../../shared/subjects.ts';

const N = 500;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.8, 3.6], orbit: 0.25 });
  const rand = rng(9);
  // Fixed random directions: every frame the same unit vectors get stretched differently.
  const dirs = Array.from({ length: N }, () => new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize());
  const hues = dirs.map(() => rand());
  const center = new THREE.Vector3();
  const scales = new THREE.Vector3();
  const quat = new THREE.Quaternion();
  const color = new THREE.Color();

  const blob = new SplatMesh({
    constructSplats: (splats) => {
      for (let i = 0; i < N; i++) splats.pushSplat(center.set(0, 0, 0), scales.setScalar(0.05), quat, 1, color.set(1, 1, 1));
    },
  });
  stage.scene.add(blob);

  // Both boxes are in the mesh's object space, so they are children and turn with it.
  const centersBox = new THREE.Box3Helper(new THREE.Box3(), 0xffd24a);
  const fullBox = new THREE.Box3Helper(new THREE.Box3(), 0xff4a6a);
  blob.add(centersBox, fullBox);

  const label = overlay(el);
  const size = new THREE.Vector3();
  const fmt = (b: THREE.Box3): string => b.getSize(size).toArray().map((v) => v.toFixed(2)).join(' x ');

  stage.run((time, dt) => {
    const splats = blob.packedSplats;
    if (!blob.isInitialized || !splats) return;
    blob.rotation.y += dt * 0.2;
    // Flat, big splats on a pulsing ellipsoid, each tilted to face outward-ish.
    const stretch = 1 + 0.35 * Math.sin(time * 1.1);
    for (let i = 0; i < N; i++) {
      center.copy(dirs[i]!).multiply(scales.set(1.0 * stretch, 0.55 / stretch, 0.8));
      quat.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dirs[i]!);
      scales.set(0.13, 0.13, 0.02);
      color.setHSL(hues[i]!, 0.7, 0.55);
      splats.setSplat(i, center, scales, quat, 0.9, color);
    }
    splats.needsUpdate = true;
    blob.updateVersion();
    // centers_only = true reads just the splat centres; false adds each splat's own extent.
    centersBox.box.copy(blob.getBoundingBox(true));
    fullBox.box.copy(blob.getBoundingBox(false));
    label.textContent = `getBoundingBox(true)   ${fmt(centersBox.box)}\ngetBoundingBox(false)  ${fmt(fullBox.box)}`;
  });
  return () => {
    centersBox.dispose();
    fullBox.dispose();
    stage.dispose();
  };
};

export default mount;
