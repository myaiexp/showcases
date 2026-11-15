// Photosphere: convection cells of a star, hot colour over a cooler background
import * as THREE from 'three/webgpu';
import { photosphere } from 'tsl-textures';
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
      color: rgb(0xffff00),
      background: rgb(0xff0000),
      seed: range(0, 0, 10000, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, color: 16776960, background: 16711680, seed: 0 },
        { scale: 1.044, color: 16777215, background: 4686264, seed: 0 },
        { scale: 2.932, color: 15787747, background: 11141120, seed: 0 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = photosphere({
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
