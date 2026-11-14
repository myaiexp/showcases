// The quick tiny-lod builder against the slower bhatt-lod "quality" builder, same budget
import * as THREE from 'three';
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, overlay, slider } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const mount: Mount = (el, ctx) => {
  const count = ctx.preview ? 30000 : 120000;
  const stage = createStage(el, ctx, {
    position: [0, 0, ctx.preview ? 4.6 : 3.8],
    orbit: false,
    spark: { lodSplatCount: ctx.preview ? 4000 : 12000 },
  });
  const status = overlay(el);
  const timings: Record<string, string> = { quick: 'building…', quality: 'building…' };

  const build = (quality: boolean, x: number, key: string): SplatMesh => {
    const started = performance.now();
    const knot = new SplatMesh({ constructSplats: (splats) => pushTorusKnot(splats, count) });
    // quality: false runs tiny-lod, true runs bhatt-lod (what lod: "quality" picks for a file).
    knot.initialized.then(() => knot.createLodSplats({ quality }));
    knot.position.x = x;
    // The tree is built in a background worker; packedSplats.lodSplats appears when it's done.
    const poll = window.setInterval(() => {
      if (!knot.packedSplats?.lodSplats) return;
      timings[key] = `${((performance.now() - started) / 1000).toFixed(1)} s`;
      clearInterval(poll);
    }, 100);
    polls.push(poll);
    stage.scene.add(knot);
    return knot;
  };
  const polls: number[] = [];
  const quick = build(false, -1.15, 'quick');
  const quality = build(true, 1.15, 'quality');

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'lodSplatCount (k)', 2, 120, 1, 12, (v) => (stage.spark.lodSplatCount = v * 1000));
  }

  stage.run((time) => {
    quick.rotation.y = quality.rotation.y = time * 0.3;
    const drawn = (stage.spark.geometry as THREE.InstancedBufferGeometry).instanceCount;
    status.textContent = `tiny-lod ${timings.quick}     bhatt-lod (quality) ${timings.quality}\n${drawn.toLocaleString()} drawn of ${(2 * count).toLocaleString()}`;
  });
  return () => {
    polls.forEach(clearInterval);
    stage.dispose();
  };
};

export default mount;
