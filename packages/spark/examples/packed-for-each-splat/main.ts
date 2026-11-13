// Recolour a hill of disc splats by height or normal with forEachSplat
import * as THREE from 'three';
import { PackedSplats, SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, overlay, select } from '../../shared/controls.ts';
import { rng } from '../../shared/subjects.ts';

const height = (x: number, z: number): number => 0.45 * Math.sin(x * 1.8) * Math.cos(z * 1.5) + 0.12 * Math.sin(x * 4 + z * 3);

/** Discs lying on the surface, each rotated so its thin axis (local y) is the surface normal; plain grey. */
function pushHill(splats: PackedSplats, count: number): void {
  const rand = rng(21);
  const e = 0.01;
  const centre = new THREE.Vector3();
  const scales = new THREE.Vector3(0.05, 0.004, 0.05);
  const normal = new THREE.Vector3();
  const quat = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  const grey = new THREE.Color();
  for (let i = 0; i < count; i++) {
    const x = (rand() - 0.5) * 3;
    const z = (rand() - 0.5) * 3;
    centre.set(x, height(x, z), z);
    normal.set((height(x - e, z) - height(x + e, z)) / (2 * e), 1, (height(x, z - e) - height(x, z + e)) / (2 * e)).normalize();
    quat.setFromUnitVectors(up, normal);
    grey.setScalar(0.45 + 0.1 * rand());
    splats.pushSplat(centre, scales, quat, 1, grey);
  }
}

const MODES = ['original', 'height', 'normal', 'slope'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 2, 3.2], target: [0, 0, 0], orbit: 0.25 });
  const label = overlay(el);
  const packed = new PackedSplats();
  pushHill(packed, ctx.preview ? 7000 : 16000);
  const mesh = new SplatMesh({ packedSplats: packed });
  stage.scene.add(mesh);
  // Keep the untouched bytes so "original" is an exact restore.
  const backup = packed.packedArray!.slice();

  const up = new THREE.Vector3(0, 1, 0);
  const n = new THREE.Vector3();
  const tint = new THREE.Color();

  const apply = (mode: Mode): void => {
    if (mode === 'original') {
      packed.packedArray!.set(backup);
    } else {
      packed.forEachSplat((index, center, scales, quaternion, opacity) => {
        n.copy(up).applyQuaternion(quaternion);
        if (mode === 'height') tint.setHSL(0.66 - (center.y + 0.5) * 0.75, 0.85, 0.5);
        else if (mode === 'normal') tint.setRGB(n.x * 0.5 + 0.5, n.y * 0.5 + 0.5, n.z * 0.5 + 0.5);
        else tint.setHSL(0.08, 0.7, Math.max(0.05, n.y ** 3) * 0.7);
        packed.setSplat(index, center, scales, quaternion, opacity, tint);
      });
    }
    // The CPU array changed, so ask for the texture to be uploaded again.
    packed.needsUpdate = true;
    label.textContent = `${packed.numSplats} splats, colours: ${mode}`;
  };
  apply('original');

  let cardTimer = 0;
  if (ctx.preview) {
    let i = 0;
    cardTimer = window.setInterval(() => apply(MODES[++i % MODES.length]!), 1800);
  } else {
    const bar = controlBar(el);
    select(bar, 'colour by', MODES, apply);
  }

  stage.run();
  return () => {
    window.clearInterval(cardTimer);
    stage.dispose();
  };
};

export default mount;
