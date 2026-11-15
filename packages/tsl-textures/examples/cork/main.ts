// Cork: a procedural texture on a node material, tuned live
import * as THREE from 'three/webgpu';
import { cork } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range, rgb } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  // The docs' parameter list spells straight as "staight"; the source (and the code template) use straight.

  const { u } = params(
    stage,
    {
      scale: range(1, 0, 4),
      straight: range(1, 0, 3),
      noise: range(0.3, 0, 1),
      color: rgb(0xfff0c0),
      background: rgb(0xd08060),
      seed: range(0, 0, 100, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 1, straight: 1, noise: 0.3, color: 16773312, background: 13664352, seed: 0 },
        { scale: 3.04, straight: 3, noise: 0.81, color: 16513003, background: 15123875, seed: 0 },
        { scale: 0.76, straight: 0, noise: 0.27, color: 15919577, background: 7684667, seed: 0 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = cork({
    scale: u.scale,
    straight: u.straight,
    noise: u.noise,
    color: u.color,
    background: u.background,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
