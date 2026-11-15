// Cave art: a procedural texture on a node material, tuned live
import * as THREE from 'three/webgpu';
import { caveArt } from 'tsl-textures';
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
      thinness: range(2, 0, 10),
      noise: range(0.3, 0, 1),
      color: rgb(0xd34545),
      background: rgb(0xfff8f0),
      seed: range(0, 0, 100, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 1.36, thinness: 2, noise: 0.3, color: 13845829, background: 16775408, seed: 0 },
        { scale: 1.68, thinness: 2.56, noise: 0.73, color: 15523827, background: 17054, seed: 0 },
        { scale: 0.68, thinness: 3.12, noise: 0.31, color: 16711680, background: 16776187, seed: 536 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = caveArt({
    scale: u.scale,
    thinness: u.thinness,
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
