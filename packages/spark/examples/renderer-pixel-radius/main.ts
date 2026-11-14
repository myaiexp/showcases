// minPixelRadius culls far, tiny splats; maxPixelRadius caps huge near ones
import * as THREE from 'three';
import { SplatMesh, type PackedSplats } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, overlay } from '../../shared/controls.ts';
import { pingPong } from '../../shared/scenes.ts';
import { rng } from '../../shared/subjects.ts';

const quat = new THREE.Quaternion();

/** A 6 x 30 unit checkered road of tiny splats, plus a few giant ones right by the camera. */
function pushScene(splats: PackedSplats, count: number): void {
  const rand = rng(21);
  const c = new THREE.Vector3();
  const s = new THREE.Vector3();
  const col = new THREE.Color();
  for (let i = 0; i < count; i++) {
    const x = (rand() - 0.5) * 6;
    const z = -rand() * 30;
    const check = (Math.floor(x * 1.5) + Math.floor(z * 0.5)) & 1;
    col.setHSL(check ? 0.08 : 0.58, 0.7, check ? 0.55 : 0.45);
    splats.pushSplat(c.set(x, 0, z), s.set(0.018, 0.004, 0.018), quat, 0.95, col);
  }
  const giants: [number, number, number, number][] = [
    [-0.9, 0.4, 0.4, 0.0],
    [0.9, 0.5, 0.2, 0.33],
    [0, 0.25, -0.7, 0.66],
  ];
  for (const [x, y, z, hue] of giants) {
    splats.pushSplat(c.set(x, y, z), s.setScalar(0.25), quat, 0.8, col.setHSL(hue, 0.8, 0.55));
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.7, 2], orbit: false, spark: { minPixelRadius: 0, maxPixelRadius: 512 } });
  stage.scene.add(new SplatMesh({ constructSplats: (s) => pushScene(s, ctx.preview ? 14000 : 30000) }));
  const label = overlay(el);

  let auto = true;
  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'minPixelRadius', 0, 4, 0.05, 0, (v) => {
      auto = false;
      stage.spark.minPixelRadius = v;
    });
    slider(bar, 'maxPixelRadius', 4, 512, 4, 512, (v) => {
      auto = false;
      stage.spark.maxPixelRadius = v;
    });
  }

  stage.run((time) => {
    if (auto) {
      const t = pingPong(time, 8);
      stage.spark.minPixelRadius = t * 3;
      stage.spark.maxPixelRadius = 512 - t * 490;
    }
    stage.camera.position.x = Math.sin(time * 0.25) * 0.5;
    stage.camera.lookAt(0, 0.3, -6);
    label.textContent = `minPixelRadius ${stage.spark.minPixelRadius.toFixed(2)}  maxPixelRadius ${Math.round(stage.spark.maxPixelRadius)}`;
  });
  return () => stage.dispose();
};

export default mount;
