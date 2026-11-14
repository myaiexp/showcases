// nonLod keeps the original splats next to the LoD tree; enableLod switches between them
import * as THREE from 'three';
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, overlay, select } from '../../shared/controls.ts';
import { pushTerrain } from '../../shared/subjects.ts';

const MODES = { 'auto (undefined)': undefined, 'LoD (true)': true, 'original (false)': false } as const;
type Mode = keyof typeof MODES;

const mount: Mount = (el, ctx) => {
  const total = ctx.preview ? 60000 : 300000;
  const stage = createStage(el, ctx, {
    position: [0, 1.4, 4],
    orbit: 0.1,
    spark: { lodSplatCount: ctx.preview ? 6000 : 25000 },
  });
  const status = overlay(el);
  const terrain = new SplatMesh({ constructSplats: (s) => pushTerrain(s, total) });
  // createLodSplats() keeps both versions, as nonLod: true does for a file: packedSplats
  // holds the originals and packedSplats.lodSplats the tree.
  terrain.initialized.then(() => terrain.createLodSplats());
  stage.scene.add(terrain);

  if (!ctx.preview) {
    const bar = controlBar(el);
    select(bar, 'enableLod', Object.keys(MODES) as Mode[], (v) => (terrain.enableLod = MODES[v]));
  }

  stage.run((time) => {
    // Cards flip between the two versions every two seconds.
    if (ctx.preview) terrain.enableLod = Math.floor(time / 2) % 2 === 0;
    const drawn = (stage.spark.geometry as THREE.InstancedBufferGeometry).instanceCount;
    const hasLod = Boolean(terrain.packedSplats?.lodSplats);
    status.textContent = `enableLod ${String(terrain.enableLod)} · LoD tree ${hasLod ? 'ready' : 'building…'} · ${drawn.toLocaleString()} drawn`;
  });
  return () => stage.dispose();
};

export default mount;
