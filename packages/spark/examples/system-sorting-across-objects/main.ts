// Three separate SplatMeshes interpenetrating, blended back-to-front as one sorted set of splats
import * as THREE from 'three';
import { SplatMesh, type PackedSplats } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, overlay } from '../../shared/controls.ts';
import { rng } from '../../shared/subjects.ts';

/** A translucent hollow sphere shell of soft splats in one colour. */
function pushShell(splats: PackedSplats, hue: number, count: number, seed: number): void {
  const rand = rng(seed);
  const center = new THREE.Vector3();
  const scales = new THREE.Vector3().setScalar(0.035);
  const quaternion = new THREE.Quaternion();
  const color = new THREE.Color();
  for (let i = 0; i < count; i++) {
    const z = rand() * 2 - 1;
    const phi = rand() * Math.PI * 2;
    const r = Math.sqrt(1 - z * z) * (0.8 + (rand() - 0.5) * 0.05);
    center.set(Math.cos(phi) * r, z * 0.8, Math.sin(phi) * r);
    color.setHSL(hue, 0.85, 0.45 + rand() * 0.2);
    splats.pushSplat(center, scales, quaternion, 0.35, color);
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.8, 3.6], orbit: 0.3 });
  const count = ctx.preview ? 6000 : 12000;
  const hues = [0.0, 0.33, 0.62];
  const shells = hues.map((hue, i) => {
    const shell = new SplatMesh({ constructSplats: (splats) => pushShell(splats, hue, count, i + 1) });
    stage.scene.add(shell);
    return shell;
  });
  let spread = 0.6;
  const place = (time: number): void => {
    shells.forEach((shell, i) => {
      const a = (i / shells.length) * Math.PI * 2 + time * 0.3;
      shell.position.set(Math.cos(a) * spread, Math.sin(a * 2) * 0.15, Math.sin(a) * spread);
    });
  };

  if (!ctx.preview) {
    overlay(el, `${shells.length} SplatMeshes, ${shells.length * count} splats, one sort`);
    const bar = controlBar(el);
    slider(bar, 'spread', 0, 1.4, 0.05, spread, (v) => (spread = v));
  }

  stage.run((time) => place(time));
  return () => stage.dispose();
};

export default mount;
