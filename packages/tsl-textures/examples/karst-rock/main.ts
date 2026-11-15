// Karst rock: a procedural texture on a node material, tuned live
import * as THREE from 'three/webgpu';
import { karstRock } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range, rgb } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  const { u } = params(
    stage,
    {
      scale: range(2, 0, 4),
      color: rgb(0xfff4f0),
      background: rgb(0xd0d0d0),
      seed: range(0, 0, 100, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, color: 16774384, background: 13684944, seed: 0 },
        { scale: 1.04, color: 14860981, background: 10616832, seed: 0 },
        { scale: 1.16, color: 8192200, background: 16777215, seed: 7671 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = karstRock({
    scale: u.scale,
    color: u.color,
    background: u.background,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
