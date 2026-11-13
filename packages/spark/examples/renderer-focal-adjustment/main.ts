// focalAdjustment rescales projected splats; clipXY culls edge centers
import * as THREE from 'three';
import { SplatMesh, type PackedSplats } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, overlay } from '../../shared/controls.ts';
import { pingPong } from '../../shared/scenes.ts';
import { rng } from '../../shared/subjects.ts';

type Mode = 'focalAdjustment' | 'clipXY';

/** A jittered grid of colourful splats on a wall 2 units ahead, wider than the view. */
function pushWall(splats: PackedSplats): void {
  const rand = rng(17);
  const c = new THREE.Vector3();
  const s = new THREE.Vector3();
  const q = new THREE.Quaternion();
  const col = new THREE.Color();
  for (let gx = -11; gx <= 11; gx++) {
    for (let gy = -5; gy <= 5; gy++) {
      c.set(gx * 0.3 + (rand() - 0.5) * 0.15, gy * 0.3 + (rand() - 0.5) * 0.15, -2 + (rand() - 0.5) * 0.3);
      col.setHSL(0.5 + gx * 0.025 + gy * 0.02, 0.7, 0.5);
      splats.pushSplat(c, s.setScalar(0.09), q, 0.95, col);
    }
  }
}

const mount: Mount = (el, ctx) => {
  // The camera faces a wall of splats that overfills the frame, so centres near the
  // frame edge are the ones clipXY decides about.
  const stage = createStage(el, ctx, {
    position: [0, 0, 0],
    target: [0, 0, -2],
    orbit: false,
    spark: { focalAdjustment: 1, clipXY: 1.4 },
  });
  stage.scene.add(new SplatMesh({ constructSplats: pushWall }));
  const label = overlay(el);

  let auto = true;
  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'focalAdjustment', 0.5, 3, 0.05, 1, (v) => {
      auto = false;
      stage.spark.focalAdjustment = v;
    });
    slider(bar, 'clipXY', 0.4, 2, 0.05, 1.4, (v) => {
      auto = false;
      stage.spark.clipXY = v;
    });
  }

  stage.run((time) => {
    stage.camera.position.x = Math.sin(time * 0.5) * 0.4;
    stage.camera.lookAt(0, 0, -2);
    if (auto) {
      // 8 seconds on each option while the other rests at its default.
      const mode: Mode = Math.floor(time / 8) % 2 === 0 ? 'focalAdjustment' : 'clipXY';
      const t = pingPong(time, 8);
      stage.spark.focalAdjustment = mode === 'focalAdjustment' ? 0.6 + t * 2 : 1;
      stage.spark.clipXY = mode === 'clipXY' ? 1.4 - t * 1 : 1.4;
    }
    label.textContent = `focalAdjustment ${stage.spark.focalAdjustment.toFixed(2)}\nclipXY ${stage.spark.clipXY.toFixed(2)}`;
  });
  return () => stage.dispose();
};

export default mount;
