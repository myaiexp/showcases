// Foveated LoD: full detail in a cone ahead, coarser splats toward the sides and behind
import * as THREE from 'three';
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, overlay, slider } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    position: [0, 0, 0.01],
    orbit: false,
    // A tight budget makes the foveation shape visible; these are the docs' defaults otherwise.
    spark: { lodSplatCount: ctx.preview ? 12000 : 40000, coneFov0: 30, coneFov: 70, coneFoveate: 0.2, behindFoveate: 0.05 },
  });
  const { camera, spark } = stage;
  // A ring of knots around the viewer: some ahead, some to the side, some behind.
  const count = 10;
  for (let i = 0; i < count; i++) {
    const knot = new SplatMesh({ constructSplats: (s) => pushTorusKnot(s, ctx.preview ? 12000 : 30000, i + 1) });
    knot.initialized.then(() => knot.createLodSplats());
    const a = (i / count) * Math.PI * 2;
    knot.position.set(Math.sin(a) * 3, 0, -Math.cos(a) * 3);
    knot.lookAt(0, 0, 0);
    stage.scene.add(knot);
  }
  const status = overlay(el);

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'coneFov0°', 5, 120, 5, spark.coneFov0, (v) => (spark.coneFov0 = v));
    slider(bar, 'coneFov°', 10, 180, 5, spark.coneFov, (v) => (spark.coneFov = v));
    slider(bar, 'coneFoveate', 0.02, 1, 0.02, spark.coneFoveate, (v) => (spark.coneFoveate = v));
    slider(bar, 'behindFoveate', 0.01, 1, 0.01, spark.behindFoveate, (v) => (spark.behindFoveate = v));
  }

  const look = new THREE.Vector3();
  stage.run((time) => {
    // Turn on the spot: the sharp cone follows the view, the LoD update lags slightly.
    const a = time * 0.25;
    camera.lookAt(look.set(Math.sin(a), 0, -Math.cos(a)));
    status.textContent = `cone ${spark.coneFov0}° → ${spark.coneFov}° (×${spark.coneFoveate}) · behind ×${spark.behindFoveate}`;
  });
  return () => stage.dispose();
};

export default mount;
