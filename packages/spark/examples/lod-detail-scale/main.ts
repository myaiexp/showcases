// lodSplatScale multiplies the splat budget; lodRenderScale sets the smallest splat size in pixels
import * as THREE from 'three';
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, overlay, slider } from '../../shared/controls.ts';
import { pushTerrain } from '../../shared/subjects.ts';

const mount: Mount = (el, ctx) => {
  const total = ctx.preview ? 60000 : 400000;
  const stage = createStage(el, ctx, {
    position: [0, 0.9, 4.2],
    orbit: 0.1,
    // The platform default (2.5M on desktop) would draw all of this small scene, so
    // pin a small base here; lodSplatScale then scales it, as the docs recommend.
    spark: { lodSplatCount: ctx.preview ? 8000 : 50000, lodSplatScale: 1, lodRenderScale: 1 },
  });
  const status = overlay(el);
  const terrain = new SplatMesh({ constructSplats: (splats) => pushTerrain(splats, total) });
  // lod: true only applies when decoding a file; built-in-the-browser splats get their
  // LoD tree on request, from a background worker.
  terrain.initialized.then(() => terrain.createLodSplats());
  stage.scene.add(terrain);

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'lodSplatScale', 0.1, 4, 0.1, 1, (v) => (stage.spark.lodSplatScale = v));
    slider(bar, 'lodRenderScale', 1, 8, 0.5, 1, (v) => (stage.spark.lodRenderScale = v));
  }

  stage.run((time) => {
    // In a card, breathe the budget between a fifth and twice the base.
    if (ctx.preview) stage.spark.lodSplatScale = 0.2 + 0.9 * (1 + Math.sin(time * 0.8));
    const drawn = (stage.spark.geometry as THREE.InstancedBufferGeometry).instanceCount;
    status.textContent = `lodSplatScale ${stage.spark.lodSplatScale.toFixed(2)} · lodRenderScale ${stage.spark.lodRenderScale} · ${drawn.toLocaleString()} drawn`;
  });
  return () => stage.dispose();
};

export default mount;
