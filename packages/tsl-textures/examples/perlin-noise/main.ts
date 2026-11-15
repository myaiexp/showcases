// Perlin noise: two colours blended by noise, with balance and contrast
import * as THREE from 'three/webgpu';
import { perlinNoise } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range, rgb } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  // The docs' parameters with their documented ranges (seed and any range the docs omit are my pick).
  const { u } = params(
    stage,
    {
      scale: range(2, 0, 4),
      balance: range(0, -3, 3),
      contrast: range(0, -2, 2),
      color: rgb(0xffffff),
      background: rgb(0x000000),
      seed: range(0, 0, 10000, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, balance: 0, contrast: 0, color: 16777215, background: 0, seed: 0 },
        { scale: 1.76, balance: 1.92, contrast: 2, color: 16766720, background: 0, seed: 0 },
        { scale: 0.48, balance: 0, contrast: 0, color: 57599, background: 15007999, seed: 0 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = perlinNoise({
    scale: u.scale,
    balance: u.balance,
    contrast: u.contrast,
    color: u.color,
    background: u.background,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
