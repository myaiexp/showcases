// Isolines: a procedural texture on a node material, tuned live
import * as THREE from 'three/webgpu';
import { isolines } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range, rgb } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  // The docs' code example spells thinness as "thinnes", which the texture ignores; this passes thinness.

  const { u } = params(
    stage,
    {
      scale: range(2, 0, 4),
      density: range(40, 1, 200),
      blur: range(0.3, 0, 1),
      thinness: range(0.6, 0, 1),
      color: rgb(0xffffff),
      background: rgb(0x000000),
      seed: range(0, 0, 100, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 1, density: 40, blur: 0.3, thinness: 0.6, color: 16777215, background: 0, seed: 0 },
        { scale: 0.2, density: 40, blur: 0.3, thinness: 0.17, color: 14606046, background: 2518686, seed: 0 },
        { scale: 0, density: 14.925, blur: 0.01, thinness: 0.06, color: 12058624, background: 16777215, seed: 0 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = isolines({
    scale: u.scale,
    density: u.density,
    blur: u.blur,
    thinness: u.thinness,
    color: u.color,
    background: u.background,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
