// Edit the original splats, then createLodSplats() rebuilds the LoD tree to match
import * as THREE from 'three';
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, controlBar, overlay } from '../../shared/controls.ts';
import { pushTerrain, rng } from '../../shared/subjects.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    position: [0, 2.2, 4.2],
    orbit: 0.08,
    spark: { lodSplatCount: ctx.preview ? 10000 : 40000 },
  });
  const status = overlay(el, 'building LoD tree…');
  const terrain = new SplatMesh({ constructSplats: (s) => pushTerrain(s, ctx.preview ? 60000 : 250000) });
  // The first tree. createLodSplats() keeps the originals editable next to it.
  terrain.initialized.then(() => terrain.createLodSplats());
  stage.scene.add(terrain);

  const rand = rng(99);
  const scorch = new THREE.Color(0.12, 0.08, 0.05);
  let busy = false;
  const dig = async (): Promise<void> => {
    const splats = terrain.packedSplats;
    if (busy || !splats?.lodSplats) return;
    busy = true;
    const hole = new THREE.Vector3((rand() - 0.5) * 6, 0, (rand() - 0.5) * 6);
    let removed = 0;
    // Hide splats inside the crater and darken a ring around it, in the original data.
    splats.forEachSplat((i, center, scales, quaternion, opacity, color) => {
      const d = Math.hypot(center.x - hole.x, center.z - hole.z);
      if (d < 0.5) {
        splats.setSplat(i, center, scales, quaternion, 0, color);
        removed++;
      } else if (d < 0.8) splats.setSplat(i, center, scales, quaternion, opacity, color.lerp(scorch, 0.7));
    });
    splats.needsUpdate = true;
    status.textContent = `removed ${removed} splats · rebuilding LoD tree…`;
    const started = performance.now();
    await splats.createLodSplats();
    status.textContent = `crater at ${hole.x.toFixed(1)}, ${hole.z.toFixed(1)} · tree rebuilt in ${((performance.now() - started) / 1000).toFixed(1)} s`;
    busy = false;
  };

  let timer = 0;
  if (ctx.preview) timer = window.setInterval(() => void dig(), 3500);
  else button(controlBar(el), 'Dig a crater', () => void dig());

  stage.run(() => {
    if (!busy && terrain.packedSplats?.lodSplats && status.textContent?.startsWith('building')) {
      status.textContent = 'LoD tree ready';
    }
  });
  return () => {
    clearInterval(timer);
    stage.dispose();
  };
};

export default mount;
