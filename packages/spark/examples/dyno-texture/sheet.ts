// A flat n x n sheet of splats in the XZ plane, 2 units across
import * as THREE from 'three';
import type { PackedSplats } from '@sparkjsdev/spark';

export function pushSheet(splats: PackedSplats, n: number): void {
  const center = new THREE.Vector3();
  const step = 2 / n;
  const scales = new THREE.Vector3(step * 0.6, step * 0.6, step * 0.6);
  const quat = new THREE.Quaternion();
  const color = new THREE.Color(0.5, 0.5, 0.5);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      center.set(-1 + (i + 0.5) * step, 0, -1 + (j + 0.5) * step);
      splats.pushSplat(center, scales, quat, 0.95, color);
    }
  }
}
