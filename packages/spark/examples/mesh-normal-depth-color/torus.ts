// A torus of flat splats lying on its surface, so each has a clear normal
import * as THREE from 'three';
import type { PackedSplats } from '@sparkjsdev/spark';
import { rng } from '../../shared/subjects.ts';

export function pushFlatTorus(splats: PackedSplats, count: number): void {
  const rand = rng(41);
  const center = new THREE.Vector3();
  const scales = new THREE.Vector3(0.04, 0.04, 0.008);
  const quat = new THREE.Quaternion();
  const color = new THREE.Color(0.8, 0.8, 0.8);
  const normal = new THREE.Vector3();
  const forward = new THREE.Vector3(0, 0, 1);
  const major = 0.7;
  const minor = 0.3;
  for (let i = 0; i < count; i++) {
    const u = rand() * Math.PI * 2; // around the ring
    const v = rand() * Math.PI * 2; // around the tube
    normal.set(Math.cos(v) * Math.cos(u), Math.sin(v), Math.cos(v) * Math.sin(u));
    center.set(Math.cos(u) * major, 0, Math.sin(u) * major).addScaledVector(normal, minor);
    // The splat's thin local Z axis points along the surface normal.
    quat.setFromUnitVectors(forward, normal);
    splats.pushSplat(center, scales, quat, 1, color);
  }
}
