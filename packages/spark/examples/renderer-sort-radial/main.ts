// sortRadial true vs false while the camera whips between two pillar rings
import * as THREE from 'three';
import { SplatMesh, type PackedSplats } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, checkbox, slider, overlay } from '../../shared/controls.ts';
import { rng } from '../../shared/subjects.ts';

/**
 * Two rings of 16 pillars around the origin, bright ones at 2.5 units and pale ones at
 * 5.5 between them. A stale sort draws far pillars over near ones, and the sides go bare.
 */
function pushPillars(splats: PackedSplats, perPillar: number): void {
  const rand = rng(13);
  const c = new THREE.Vector3();
  const s = new THREE.Vector3();
  const q = new THREE.Quaternion();
  const col = new THREE.Color();
  for (let ring = 0; ring < 2; ring++) {
    for (let p = 0; p < 16; p++) {
      const a = ((p + ring * 0.5) / 16) * Math.PI * 2;
      const r = ring === 0 ? 2.5 : 5.5;
      const width = ring === 0 ? 0.12 : 0.3;
      for (let n = 0; n < perPillar; n++) {
        c.set(Math.cos(a) * r, (rand() - 0.5) * 3.2, Math.sin(a) * r);
        if (ring === 0) col.setHSL(p / 16, 0.85, 0.5);
        else col.setHSL(p / 16, 0.3, 0.8);
        splats.pushSplat(c, s.setScalar(width * (0.6 + 0.4 * rand())), q, 0.95, col);
      }
    }
  }
}

const mount: Mount = (el, ctx) => {
  // minSortIntervalMs holds the sort back so the lag after a fast turn is easy to catch.
  const stage = createStage(el, ctx, {
    position: [0, 0, 0],
    orbit: false,
    fov: 75,
    spark: { sortRadial: true, minSortIntervalMs: 250 },
  });
  stage.scene.add(new SplatMesh({ constructSplats: (sp) => pushPillars(sp, ctx.preview ? 60 : 120) }));
  const label = overlay(el);

  let auto = true;
  let box: HTMLInputElement | null = null;
  if (!ctx.preview) {
    const bar = controlBar(el);
    box = checkbox(bar, 'sortRadial', true, (v) => {
      auto = false;
      stage.spark.sortRadial = v;
    });
    slider(bar, 'minSortIntervalMs', 0, 1000, 10, 250, (v) => (stage.spark.minSortIntervalMs = v));
  }

  stage.run((time) => {
    // Swing the view quickly: a z-depth sort lags behind and leaves bars at the edges.
    stage.camera.rotation.y = Math.sin(time * 1.4) * 1.6;
    if (auto) {
      stage.spark.sortRadial = Math.floor(time / 5) % 2 === 0;
      if (box) box.checked = stage.spark.sortRadial;
    }
    label.textContent = stage.spark.sortRadial ? 'sortRadial: true (distance)' : 'sortRadial: false (z-depth)';
  });
  return () => stage.dispose();
};

export default mount;
