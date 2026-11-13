// Seeded sample splat objects: a torus knot, a butterfly stand-in, a garden
import * as THREE from 'three';
import type { PackedSplats } from '@sparkjsdev/spark';

/** The splat file the docs' quick start loads. Full views only: cards never fetch it. */
export const BUTTERFLY_URL = 'https://sparkjs.dev/assets/splats/butterfly.spz';

/** mulberry32: a small seeded PRNG, so every sample object looks the same on every mount. */
export function rng(seed = 1): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Reused for every pushSplat: Spark encodes them into 16 bytes and keeps no reference.
const center = new THREE.Vector3();
const scales = new THREE.Vector3();
const quat = new THREE.Quaternion();
const color = new THREE.Color();

/** A (2,3) torus knot, about 2 units across, its tube surface covered in rainbow splats. */
export function pushTorusKnot(splats: PackedSplats, count = 30000, seed = 3): void {
  const rand = rng(seed);
  const p = 2;
  const q = 3;
  const point = (t: number, out: THREE.Vector3): THREE.Vector3 => {
    const r = 0.6 + 0.25 * Math.cos(q * t);
    return out.set(r * Math.cos(p * t), r * Math.sin(p * t), 0.25 * Math.sin(q * t));
  };
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  const n1 = new THREE.Vector3();
  const n2 = new THREE.Vector3();
  for (let i = 0; i < count; i++) {
    const t = rand() * Math.PI * 2;
    point(t, a);
    point(t + 0.001, b);
    tangent.subVectors(b, a).normalize();
    n1.set(0, 0, 1).cross(tangent).normalize();
    n2.crossVectors(tangent, n1);
    const phi = rand() * Math.PI * 2;
    center
      .copy(a)
      .addScaledVector(n1, Math.cos(phi) * 0.12)
      .addScaledVector(n2, Math.sin(phi) * 0.12);
    scales.setScalar(0.008 + rand() * 0.008);
    color.setHSL(t / (Math.PI * 2), 0.75, 0.55 + 0.15 * Math.sin(phi));
    splats.pushSplat(center, scales, quat, 0.9, color);
  }
}

/**
 * A butterfly drawn from Temple Fay's butterfly curve, wings in the XY plane facing +Z,
 * about 1.5 units across. Cards use it where the full view loads the real butterfly.spz.
 */
export function pushButterfly(splats: PackedSplats, count = 24000, seed = 7): void {
  const rand = rng(seed);
  const edge = (theta: number): number =>
    Math.exp(Math.sin(theta)) - 2 * Math.cos(4 * theta) + Math.sin((2 * theta - Math.PI) / 24) ** 5;
  for (let i = 0; i < count; i++) {
    const theta = rand() * Math.PI * 2;
    const max = Math.abs(edge(theta));
    const rad = Math.sqrt(rand()) * max;
    const x = Math.sin(theta) * rad * 0.2;
    const y = Math.cos(theta) * rad * 0.2 - 0.1;
    const body = Math.abs(x) < 0.025;
    const f = rad / Math.max(max, 1e-3);
    center.set(x, y, body ? (rand() - 0.5) * 0.04 : Math.abs(x) * 0.25 * f);
    scales.set(0.016, 0.016, 0.003);
    if (body) color.setRGB(0.12, 0.1, 0.08);
    else if (f > 0.9) color.setRGB(0.08, 0.06, 0.05);
    else color.setHSL(0.07 + 0.55 * f * f, 0.85, 0.35 + 0.3 * (1 - f));
    splats.pushSplat(center, scales, quat, 0.95, color);
  }
}

/**
 * A round patch of ground with grass, flowers and three small trees, 4 units across,
 * sitting on y = 0. A busy target for edits, lights and modifiers.
 */
export function pushGarden(splats: PackedSplats, count = 40000, seed = 11): void {
  const rand = rng(seed);
  const trees = [
    [-0.9, -0.4],
    [0.8, -0.7],
    [0.2, 0.9],
  ] as const;
  const groundCount = Math.floor(count * 0.6);
  for (let i = 0; i < groundCount; i++) {
    const r = Math.sqrt(rand()) * 2;
    const a = rand() * Math.PI * 2;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const flower = rand() < 0.08;
    const h = flower ? 0.05 + rand() * 0.1 : rand() * 0.04;
    center.set(x, h, z);
    scales.set(0.02, flower ? 0.015 : 0.008, 0.02);
    if (flower) color.setHSL([0.0, 0.13, 0.8, 0.92][Math.floor(rand() * 4)]!, 0.8, 0.6);
    else color.setHSL(0.25 + rand() * 0.08, 0.55, 0.22 + rand() * 0.12);
    splats.pushSplat(center, scales, quat, 1, color);
  }
  const perTree = Math.floor((count - groundCount) / trees.length);
  for (const [tx, tz] of trees) {
    for (let i = 0; i < perTree; i++) {
      const trunk = i < perTree * 0.15;
      if (trunk) {
        center.set(tx + (rand() - 0.5) * 0.08, rand() * 0.7, tz + (rand() - 0.5) * 0.08);
        scales.set(0.02, 0.03, 0.02);
        color.setHSL(0.07, 0.45, 0.2 + rand() * 0.08);
      } else {
        const dir = new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize();
        center.set(tx, 0.95, tz).addScaledVector(dir, 0.38 * Math.cbrt(rand()));
        scales.setScalar(0.025);
        color.setHSL(0.28 + rand() * 0.07, 0.6, 0.25 + rand() * 0.15);
      }
      splats.pushSplat(center, scales, quat, 1, color);
    }
  }
}
