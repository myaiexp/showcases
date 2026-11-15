// Watermelon: stripes mapped by equirectangular uvs, with an int stripes count
import * as THREE from 'three/webgpu';
import { watermelon } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { int, params, range, rgb } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  // The docs' parameters with their documented ranges (seed and any range the docs omit are my pick).
  const { u } = params(
    stage,
    {
      scale: range(2, 0, 4),
      stripes: int(12, 4, 30),
      variation: range(0.5, 0, 1),
      noise: range(0.25, 0, 1),
      color: rgb(0x9acd32),
      background: rgb(0x006400),
      seed: range(0, 0, 10000, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, stripes: 12, variation: 0.5, noise: 0.25, color: 10145074, background: 25600, seed: 0 },
        { scale: 2, stripes: 16, variation: 0.57, noise: 0.36, color: 7970090, background: 12506285, seed: 0 },
        { scale: 0, stripes: 30, variation: 0.55, noise: 0, color: 5472346, background: 14212790, seed: 0 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = watermelon({
    scale: u.scale,
    stripes: u.stripes,
    variation: u.variation,
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
