// Circle decor: a procedural texture on a node material, tuned live
import * as THREE from 'three/webgpu';
import { circleDecor } from 'tsl-textures';
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
      grains: range(0.2, 0, 1),
      complexity: range(1, 0, 2),
      blur: range(0.2, 0, 1),
      color: rgb(0x000000),
      background: rgb(0xffffff),
      seed: range(0, 0, 100, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, grains: 0.2, complexity: 1, blur: 0.2, color: 0, background: 16777215, seed: 0 },
        { scale: 0, grains: 1, complexity: 0.2, blur: 0.07, color: 16726958, background: 16777215, seed: 3040 },
        { scale: 4, grains: 1, complexity: 0.2, blur: 0.41, color: 0, background: 16770304, seed: 0 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = circleDecor({
    scale: u.scale,
    grains: u.grains,
    complexity: u.complexity,
    blur: u.blur,
    color: u.color,
    background: u.background,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
