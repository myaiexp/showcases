// A striped splat cylinder, 2 tall, for showing bends and twists
import * as THREE from 'three';
import type { PackedSplats } from '@sparkjsdev/spark';
import { rng } from '../../shared/subjects.ts';

export function pushPillar(splats: PackedSplats, count: number, radius = 0.35): void {
  const rand = rng(21);
  const center = new THREE.Vector3();
  const scales = new THREE.Vector3(0.03, 0.03, 0.012);
  const quat = new THREE.Quaternion();
  const color = new THREE.Color();
  const facing = new THREE.Vector3();
  const forward = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < count; i++) {
    const a = rand() * Math.PI * 2;
    const y = rand() * 2 - 1;
    center.set(Math.cos(a) * radius, y, Math.sin(a) * radius);
    // Flat splats lying on the surface: their local Z points out of the cylinder.
    facing.set(Math.cos(a), 0, Math.sin(a));
    quat.setFromUnitVectors(forward, facing);
    // Horizontal bands, with a differently coloured stripe down one side so the twist reads.
    const band = Math.floor((y + 1) * 5) % 2;
    color.setHSL(0.08 + 0.1 * band + (a < 0.5 ? 0.5 : 0), 0.75, 0.5 + 0.12 * band);
    splats.pushSplat(center, scales, quat, 1, color);
  }
}
