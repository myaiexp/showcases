// A striped splat tube along Y (-1..1) and the weights binding it to bones
import * as THREE from 'three';
import type { PackedSplats, SplatMesh, SplatSkinning } from '@sparkjsdev/spark';
import { rng } from '../../shared/subjects.ts';

export const NUM_BONES = 6;
/** Distance between neighbouring bones, in the tube's rest pose. */
export const SEGMENT = 2 / (NUM_BONES - 1);

export function pushWorm(splats: PackedSplats, count: number): void {
  const rand = rng(31);
  const center = new THREE.Vector3();
  const scales = new THREE.Vector3(0.035, 0.035, 0.012);
  const quat = new THREE.Quaternion();
  const color = new THREE.Color();
  const out = new THREE.Vector3();
  const forward = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < count; i++) {
    const y = rand() * 2 - 1;
    const a = rand() * Math.PI * 2;
    // Taper to a rounded head and tail.
    const radius = 0.2 * Math.sqrt(Math.max(0, 1 - Math.pow(Math.abs(y), 6)));
    center.set(Math.cos(a) * radius, y, Math.sin(a) * radius);
    out.set(Math.cos(a), 0, Math.sin(a));
    quat.setFromUnitVectors(forward, out);
    const ring = Math.floor((y + 1) * 7) % 2;
    color.setHSL(0.3 - 0.25 * (y + 1) * 0.5, 0.65, 0.4 + 0.15 * ring + 0.1 * Math.sin(a));
    splats.pushSplat(center, scales, quat, 1, color);
  }
}

/** Give every splat two bones: the pair of chain joints either side of its Y, with blended weights. */
export function bindToChain(mesh: SplatMesh, skinning: SplatSkinning): void {
  const indices = new THREE.Vector4();
  const weights = new THREE.Vector4();
  mesh.forEachSplat((i, center) => {
    const t = THREE.MathUtils.clamp((center.y + 1) / SEGMENT, 0, NUM_BONES - 1 - 1e-4);
    const lo = Math.floor(t);
    const w = t - lo;
    indices.set(lo, lo + 1, 0, 0);
    weights.set(1 - w, w, 0, 0);
    skinning.setSplatBones(i, indices, weights);
  });
  skinning.skinTexture.needsUpdate = true;
}
