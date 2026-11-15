// Caustics: a procedural texture on a node material, tuned live
import * as THREE from 'three/webgpu';
import { caustics } from 'tsl-textures';
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
      speed: range(0, -2, 2),
      color: rgb(0x50a8c0),
      seed: range(0, 0, 100, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, speed: 0, color: 5286080, seed: 0 },
        { scale: 0.68, speed: 0, color: 12109496, seed: 3388 },
        { scale: 2.8, speed: 0, color: 13275989, seed: 3388 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = caustics({
    scale: u.scale,
    speed: u.speed,
    color: u.color,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
