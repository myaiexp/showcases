// A torus of elongated flat splats, each rolled by a random angle about its normal
import * as THREE from 'three';
import type { PackedSplats } from '@sparkjsdev/spark';
import { rng } from '../../shared/subjects.ts';

export function pushRolledTorus(splats: PackedSplats, count: number): void {
  const rand = rng(57);
  const center = new THREE.Vector3();
  // Long in X, medium in Y, paper-thin in Z: three clearly different local axes.
  const scales = new THREE.Vector3(0.07, 0.03, 0.006);
  const quat = new THREE.Quaternion();
  const roll = new THREE.Quaternion();
  const color = new THREE.Color(0.8, 0.8, 0.8);
  const normal = new THREE.Vector3();
  const forward = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < count; i++) {
    const u = rand() * Math.PI * 2;
    const v = rand() * Math.PI * 2;
    normal.set(Math.cos(v) * Math.cos(u), Math.sin(v), Math.cos(v) * Math.sin(u));
    center.set(Math.cos(u) * 0.7, 0, Math.sin(u) * 0.7).addScaledVector(normal, 0.3);
    // Face Z along the normal first, then spin about it so the X axes point all ways.
    quat.setFromUnitVectors(forward, normal);
    roll.setFromAxisAngle(forward, rand() * Math.PI * 2);
    quat.multiply(roll);
    splats.pushSplat(center, scales, quat, 1, color);
  }
}
