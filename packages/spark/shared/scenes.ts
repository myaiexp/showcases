// Sample splat scenes: blob shells, plus an easing helper
import * as THREE from 'three';
import type { PackedSplats } from '@sparkjsdev/spark';
import { rng } from './subjects.ts';

const center = new THREE.Vector3();
const scales = new THREE.Vector3();
const quat = new THREE.Quaternion();
const color = new THREE.Color();

export interface BlobShellOptions {
  count?: number;
  radius?: number;
  /** Each splat's scale (a sphere of this radius, one standard deviation). */
  scale?: number;
  opacity?: number;
  seed?: number;
  /** Added to every splat's hue, 0..1. */
  hue?: number;
}

/**
 * A hollow sphere of round, same-size splats, coloured by direction. Big splats make
 * kernel and blur options easy to see; small ones read as a solid ball.
 */
export function pushBlobShell(splats: PackedSplats, opts: BlobShellOptions = {}): void {
  const { count = 1500, radius = 0.9, scale = 0.08, opacity = 0.9, seed = 5, hue = 0 } = opts;
  const rand = rng(seed);
  const dir = new THREE.Vector3();
  for (let i = 0; i < count; i++) {
    dir.set(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize();
    center.copy(dir).multiplyScalar(radius);
    scales.setScalar(scale);
    color.setHSL((hue + 0.5 + Math.atan2(dir.z, dir.x) / (Math.PI * 2)) % 1, 0.7, 0.45 + 0.2 * dir.y);
    splats.pushSplat(center, scales, quat, opacity, color);
  }
}

/** A tiny hash-free ease: 0..1..0 over `period` seconds, for card sweeps. */
export function pingPong(time: number, period: number): number {
  return 0.5 - 0.5 * Math.cos((time / period) * Math.PI * 2);
}
