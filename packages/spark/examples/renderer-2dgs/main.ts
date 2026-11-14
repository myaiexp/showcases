// enable2DGS: splats with one zero scale axis become oriented 2D discs
import * as THREE from 'three';
import { SplatMesh, type PackedSplats } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, checkbox, slider, overlay } from '../../shared/controls.ts';
import { rng } from '../../shared/subjects.ts';

/** Flat discs tiling a sphere, each facing outward: scale z is exactly 0. */
function pushDiscs(splats: PackedSplats, count: number): void {
  const rand = rng(8);
  const c = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const s = new THREE.Vector3();
  const q = new THREE.Quaternion();
  const col = new THREE.Color();
  const front = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < count; i++) {
    dir.set(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize();
    q.setFromUnitVectors(front, dir);
    s.set(0.09, 0.09, 0);
    col.setHSL((Math.atan2(dir.z, dir.x) / (Math.PI * 2) + 1) % 1, 0.75, 0.5 + 0.15 * dir.y);
    splats.pushSplat(c.copy(dir).multiplyScalar(0.9), s, q, 1, col);
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.5, 2.8], orbit: 0.3, spark: { enable2DGS: true, blurAmount: 3 } });
  stage.scene.add(new SplatMesh({ constructSplats: (s) => pushDiscs(s, ctx.preview ? 90 : 130) }));
  const label = overlay(el);

  let auto = true;
  let box: HTMLInputElement | null = null;
  if (!ctx.preview) {
    const bar = controlBar(el);
    box = checkbox(bar, 'enable2DGS', true, (v) => {
      auto = false;
      stage.spark.enable2DGS = v;
    });
    slider(bar, 'blurAmount', 0, 6, 0.1, 3, (v) => (stage.spark.blurAmount = v));
  }

  stage.run((time) => {
    // Flip every 3 seconds until the reader takes the checkbox.
    if (auto) {
      stage.spark.enable2DGS = Math.floor(time / 3) % 2 === 0;
      if (box) box.checked = stage.spark.enable2DGS;
    }
    label.textContent = `enable2DGS ${stage.spark.enable2DGS}`;
  });
  return () => stage.dispose();
};

export default mount;
