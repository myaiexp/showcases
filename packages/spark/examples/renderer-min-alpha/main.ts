// minAlpha: splats fainter than the threshold are skipped
import * as THREE from 'three';
import { SplatMesh, type PackedSplats } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, overlay } from '../../shared/controls.ts';
import { pingPong } from '../../renderer-kit/scenes.ts';
import { rng } from '../../shared/subjects.ts';

/** A helix of splats whose opacity climbs from nearly invisible to solid along its length. */
function pushHelix(splats: PackedSplats, count: number): void {
  const rand = rng(31);
  const c = new THREE.Vector3();
  const s = new THREE.Vector3();
  const q = new THREE.Quaternion();
  const col = new THREE.Color();
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const a = t * Math.PI * 10;
    const jitter = 0.08;
    c.set(Math.cos(a) * 0.8 + (rand() - 0.5) * jitter, (t - 0.5) * 2.2, Math.sin(a) * 0.8 + (rand() - 0.5) * jitter);
    // Opacity rises with t squared: the first third of the helix sits under 0.1.
    col.setHSL(0.6 - 0.55 * t, 0.85, 0.55);
    splats.pushSplat(c, s.setScalar(0.04), q, 0.01 + 0.99 * t * t, col);
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.2, 3.4], orbit: 0.3, spark: { minAlpha: 0.5 / 255 } });
  stage.scene.add(new SplatMesh({ constructSplats: (s) => pushHelix(s, ctx.preview ? 5000 : 9000) }));
  const label = overlay(el);

  let auto = true;
  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'minAlpha', 0, 1, 0.01, stage.spark.minAlpha, (v) => {
      auto = false;
      stage.spark.minAlpha = v;
    });
  }

  stage.run((time) => {
    // Rising threshold: the pale, low-opacity end of the helix disappears first.
    if (auto) stage.spark.minAlpha = pingPong(time, 9) * 0.8;
    label.textContent = `minAlpha ${stage.spark.minAlpha.toFixed(3)}`;
  });
  return () => stage.dispose();
};

export default mount;
